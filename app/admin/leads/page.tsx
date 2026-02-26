import { db, hasDatabase } from "@/app/db";
import { leads } from "@/app/db/schema";
import { desc } from "drizzle-orm";
import { redirect } from "next/navigation";
import { Lead, LeadTable } from "./LeadTable";

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{ key?: string }>;
}

export default async function AdminLeadsPage({ searchParams }: PageProps) {
  const { key } = await searchParams;
  
  // Check admin key
  const adminKey = process.env.ADMIN_SECRET_KEY;
  if (!adminKey || key !== adminKey) {
    redirect("/?error=unauthorized");
  }

  // Fetch leads from database
  let leadsData: Lead[] = [];
  let dbError = false;

  if (hasDatabase && db) {
    try {
      leadsData = await db.query.leads.findMany({
        orderBy: desc(leads.createdAt),
      });
    } catch (error) {
      console.error("Failed to fetch leads:", error);
      dbError = true;
    }
  } else {
    dbError = true;
  }

  return (
    <div className="min-h-screen bg-warm-white">
      <div className="bg-navy py-6">
        <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white font-serif">Lead Dashboard</h1>
            <p className="text-white/60 text-sm mt-1">einfach verwaltet. — Alle Anfragen auf einen Blick</p>
          </div>
          <a 
            href="/" 
            className="text-white/70 hover:text-white text-sm transition-colors"
          >
            ← Zurück zur Website
          </a>
        </div>
      </div>

      <main className="max-w-[1400px] mx-auto px-6 py-8">
        {dbError ? (
          <div className="bg-amber/10 border border-amber/30 rounded-xl p-6 text-center">
            <p className="text-amber font-medium">Keine Verbindung zur Datenbank</p>
            <p className="text-text-light text-sm mt-2">
              Bitte überprüfen Sie die DATABASE_URL Umgebungsvariable.
            </p>
          </div>
        ) : (
          <LeadTable leads={leadsData} />
        )}
      </main>
    </div>
  );
}
