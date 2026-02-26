import { inngest } from "../client";
import { db } from "@/lib/db";
import { units, financialTransactions, aiActions } from "@/lib/db/schema";
import { eq, and, gte, lt, isNull } from "drizzle-orm";

export const rentMonitoring = inngest.createFunction(
  { id: "rent-monitoring", name: "Rent Monitoring & Mahnwesen" },
  { cron: "0 8 * * *" }, // Daily at 08:00
  async ({ step }) => {
    const today = new Date();
    const firstOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    // Step 1: Check all units for overdue rent
    const overdueUnits = await step.run("check-overdue", async () => {
      try {
        // Get all active units
        const allUnits = await db
          .select()
          .from(units)
          .where(eq(units.occupied, true));

        const overdue: Array<{
          unitId: string;
          propertyId: string;
          landlordId: string;
          tenantId: string;
          coldRentCents: number;
          daysOverdue: number;
        }> = [];

        for (const unit of allUnits) {
          // Check if rent was received this month for this unit
          const rentReceived = await db
            .select()
            .from(financialTransactions)
            .where(
              and(
                eq(financialTransactions.unitId, unit.id),
                eq(financialTransactions.type, "rent_received"),
                gte(financialTransactions.paidAt, firstOfMonth)
              )
            )
            .limit(1);

          if (rentReceived.length === 0) {
            // Check when the rent was due (typically 3rd of month)
            const dueDate = new Date(today.getFullYear(), today.getMonth(), 3);
            const daysOverdue = Math.floor((today.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24));

            // Only consider overdue if past due date
            if (daysOverdue > 0) {
              // Get the landlordId from the property - we'll need to join with properties
              // For now, this is simplified - in production we'd query the property relationship
              overdue.push({
                unitId: unit.id,
                propertyId: unit.propertyId,
                landlordId: "", // Will be populated from property lookup
                tenantId: "", // Will be populated from tenant lookup
                coldRentCents: unit.coldRentCents || 0,
                daysOverdue: daysOverdue,
              });
            }
          }
        }

        return overdue;
      } catch (error) {
        console.error("Database error checking overdue rent:", error);
        return [];
      }
    });

    // Step 2: Send Zahlungserinnerung (day 4)
    await step.run("send-erinnerung", async () => {
      const unitsDay4 = overdueUnits.filter((u) => u.daysOverdue === 4);
      // TODO: Send email reminder
      return { sent: unitsDay4.length };
    });

    // Step 3: Send formal Mahnung (day 10) and create actions
    const mahnungResult = await step.run("send-mahnung", async () => {
      const unitsDay10 = overdueUnits.filter((u) => u.daysOverdue >= 10);
      
      try {
        for (const unit of unitsDay10) {
          // Create financial transaction for Mahnung
          await db.insert(financialTransactions).values({
            landlordId: (unit as any).landlordId || "00000000-0000-0000-0000-000000000000",
            unitId: unit.unitId,
            propertyId: unit.propertyId,
            type: "mahnung",
            amountCents: unit.coldRentCents || 0,
            currency: "EUR",
            status: "pending",
            description: `Mahnung für Miete - ${unit.daysOverdue} Tage überfällig`,
            dueDate: new Date(),
          });

          // Create AI action for landlord
          // Note: We need the landlordId which should come from the property
          // This is a simplified version - in production we'd look up the property's landlord
        }

        return { sent: unitsDay10.length };
      } catch (error) {
        console.error("Database error creating Mahnung:", error);
        return { sent: 0, error: error instanceof Error ? error.message : "Unknown DB error" };
      }
    });

    // Step 4: Create AI actions for overdue payments
    await step.run("create-ai-actions", async () => {
      const unitsOverdue7Days = overdueUnits.filter((u) => u.daysOverdue >= 7);
      
      try {
        for (const unit of unitsOverdue7Days) {
          await db.insert(aiActions).values({
            landlordId: (unit as any).landlordId || "00000000-0000-0000-0000-000000000000",
            propertyId: unit.propertyId,
            unitId: unit.unitId,
            type: "mahnung",
            title: `Mietrückstand - ${unit.daysOverdue} Tage überfällig`,
            body: `Die Miete für Einheit ${unit.unitId} ist seit ${unit.daysOverdue} Tagen überfällig. Betrag: ${(unit.coldRentCents / 100).toFixed(2)} €`,
            actionLabel: "Mahnung senden",
            urgency: unit.daysOverdue >= 14 ? 5 : 4,
            status: "pending",
          });
        }
        return { actionsCreated: unitsOverdue7Days.length };
      } catch (error) {
        console.error("Database error creating AI actions:", error);
        return { actionsCreated: 0, error: error instanceof Error ? error.message : "Unknown DB error" };
      }
    });

    // Step 5: Escalate to landlord (day 20)
    await step.run("escalate", async () => {
      const unitsDay20 = overdueUnits.filter((u) => u.daysOverdue >= 20);
      // TODO: Flag for Rechtsanwalt intervention, notify landlord
      return { escalated: unitsDay20.length };
    });

    return { checkedAt: today.toISOString(), overdue: overdueUnits.length };
  }
);
