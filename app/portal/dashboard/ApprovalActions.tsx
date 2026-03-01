"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Approval {
  id: string;
  type: string;
  title: string;
  description: string;
  amountCents: number | null;
  approveLabel: string;
  rejectLabel: string;
  urgency: number;
}

// ─── Toast ────────────────────────────────────────────────────────────────────
function Toast({ message, kind }: { message: string; kind: "success" | "error" }) {
  return (
    <div
      className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl shadow-xl text-sm font-medium text-white transition-all
        ${kind === "success" ? "bg-teal" : "bg-red-500"}`}
    >
      {message}
    </div>
  );
}

// ─── One-Click Confirmation Banner ───────────────────────────────────────────
function OneClickConfirmation({
  action,
  approvalId,
  timestamp,
}: {
  action: "approved" | "rejected";
  approvalId: string;
  timestamp: string;
}) {
  const isApproved = action === "approved";
  return (
    <div
      className={`rounded-xl border p-5 mb-4 text-sm font-medium flex items-center gap-3 ${
        isApproved
          ? "bg-green-50 border-green-200 text-green-800"
          : "bg-red-50 border-red-200 text-red-800"
      }`}
    >
      <span className="text-2xl">{isApproved ? "✓" : "✗"}</span>
      <div>
        <p className="font-bold text-base">
          {isApproved ? "Genehmigt ✓" : "Abgelehnt ✗"}
        </p>
        <p className="text-xs opacity-75 mt-0.5">
          {new Date(timestamp).toLocaleString("de-DE", {
            dateStyle: "medium",
            timeStyle: "short",
          })}
          {" — "}
          ID: {approvalId.slice(0, 8)}…
        </p>
      </div>
    </div>
  );
}

// ─── Approval Type Badges ─────────────────────────────────────────────────────
const APPROVAL_TYPE_LABEL: Record<string, string> = {
  repair_cost: "Reparatur",
  rent_increase: "Mieterhöhung",
  investment: "Abrechnung",
  tenant_change: "Mieterwechsel",
  eviction: "Kündigung",
  contractor_hire: "Handwerker",
  legal_action: "Rechtliche Maßnahme",
};

const APPROVAL_TYPE_COLOR: Record<string, string> = {
  repair_cost: "bg-amber-50 text-amber-700 border-amber-200",
  rent_increase: "bg-blue-50 text-blue-700 border-blue-200",
  investment: "bg-purple-50 text-purple-700 border-purple-200",
  tenant_change: "bg-orange-50 text-orange-700 border-orange-200",
  eviction: "bg-red-50 text-red-700 border-red-200",
  contractor_hire: "bg-teal-50 text-teal-700 border-teal-200",
  legal_action: "bg-red-50 text-red-700 border-red-200",
};

const URGENCY_COLOR: Record<number, string> = {
  5: "bg-red-500",
  4: "bg-red-400",
  3: "bg-amber-400",
  2: "bg-green-500",
  1: "bg-gray-300",
};

// ─── Single Approval Card ────────────────────────────────────────────────────
function ApprovalCard({
  approval,
  onAction,
  loading,
}: {
  approval: Approval;
  onAction: (id: string, action: "approve" | "reject") => void;
  loading: boolean;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3 mb-3">
        <span
          className={`inline-block w-2.5 h-2.5 rounded-full mt-1 flex-shrink-0 ${URGENCY_COLOR[approval.urgency] || "bg-gray-300"}`}
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span
              className={`text-xs px-2 py-0.5 rounded-full border font-medium ${APPROVAL_TYPE_COLOR[approval.type] || "bg-gray-50 text-gray-600 border-gray-200"}`}
            >
              {APPROVAL_TYPE_LABEL[approval.type] || approval.type}
            </span>
            {approval.amountCents !== null && (
              <span className="text-xs font-semibold text-navy">
                {(approval.amountCents / 100).toLocaleString("de-DE", {
                  style: "currency",
                  currency: "EUR",
                })}
              </span>
            )}
          </div>
          <p className="font-semibold text-navy text-sm leading-snug">
            {approval.title}
          </p>
          <p className="text-sm text-text-light mt-0.5">{approval.description}</p>
        </div>
      </div>
      <div className="flex gap-2 justify-end">
        <button
          disabled={loading}
          onClick={() => onAction(approval.id, "reject")}
          className="px-3 py-1.5 text-xs font-semibold bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {approval.rejectLabel}
        </button>
        <button
          disabled={loading}
          onClick={() => onAction(approval.id, "approve")}
          className="px-3 py-1.5 text-xs font-semibold bg-teal text-white rounded-lg hover:bg-teal/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {approval.approveLabel}
        </button>
      </div>
    </div>
  );
}

// ─── Approvals List (interactive) ────────────────────────────────────────────
export function ApprovalsSection({
  initialApprovals,
}: {
  initialApprovals: Approval[];
}) {
  const [approvals, setApprovals] = useState<Approval[]>(initialApprovals);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; kind: "success" | "error" } | null>(null);

  // One-click from email URL params
  const [oneClick, setOneClick] = useState<{
    action: "approved" | "rejected";
    approvalId: string;
    timestamp: string;
  } | null>(null);

  const searchParams = useSearchParams();

  useEffect(() => {
    const approveId = searchParams.get("approve");
    const rejectId = searchParams.get("reject");
    const actionId = approveId ?? rejectId;
    const actionType = approveId ? "approve" : rejectId ? "reject" : null;

    if (!actionId || !actionType) return;

    // Clean URL params immediately (no reload)
    const url = new URL(window.location.href);
    url.searchParams.delete("approve");
    url.searchParams.delete("reject");
    url.searchParams.delete("token");
    window.history.replaceState({}, "", url.toString());

    // Fire the approval/reject action
    void (async () => {
      setLoadingId(actionId);
      try {
        const res = await fetch(`/api/portal/approvals/${actionId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: actionType }),
        });

        const resultAction = actionType === "approve" ? "approved" : "rejected";

        if (res.ok) {
          // Remove from list if present
          setApprovals((cur) => cur.filter((a) => a.id !== actionId));
          setOneClick({
            action: resultAction,
            approvalId: actionId,
            timestamp: new Date().toISOString(),
          });
        } else {
          const data = await res.json().catch(() => ({}));
          // If already decided, still show confirmation (idempotent)
          if (res.status === 409) {
            setOneClick({
              action: resultAction,
              approvalId: actionId,
              timestamp: new Date().toISOString(),
            });
          } else {
            showToast(data.error ?? "Fehler beim Verarbeiten", "error");
          }
        }
      } catch {
        showToast("Fehler beim Verarbeiten der Aktion aus der E-Mail", "error");
      } finally {
        setLoadingId(null);
      }
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function showToast(message: string, kind: "success" | "error") {
    setToast({ message, kind });
    setTimeout(() => setToast(null), 3500);
  }

  async function handleAction(id: string, action: "approve" | "reject") {
    // Optimistic: remove the card immediately
    const prev = [...approvals];
    setApprovals((cur) => cur.filter((a) => a.id !== id));
    setLoadingId(id);

    try {
      const res = await fetch(`/api/portal/approvals/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Fehler beim Speichern");
      }

      showToast(
        action === "approve" ? "Genehmigt ✓" : "Abgelehnt ✗",
        "success"
      );
    } catch (err) {
      // Restore card on error
      setApprovals(prev);
      showToast(
        err instanceof Error ? err.message : "Fehler — bitte erneut versuchen",
        "error"
      );
    } finally {
      setLoadingId(null);
    }
  }

  return (
    <>
      {/* One-click confirmation from email link */}
      {oneClick && (
        <OneClickConfirmation
          action={oneClick.action}
          approvalId={oneClick.approvalId}
          timestamp={oneClick.timestamp}
        />
      )}

      {approvals.length === 0 && !oneClick ? (
        <div className="bg-green-50 border border-green-100 rounded-xl p-5 text-sm text-green-700 font-medium text-center">
          Keine ausstehenden Genehmigungen — alles erledigt ✅
        </div>
      ) : approvals.length === 0 ? null : (
        <div className="space-y-3">
          {approvals.map((approval) => (
            <ApprovalCard
              key={approval.id}
              approval={approval}
              onAction={handleAction}
              loading={loadingId === approval.id}
            />
          ))}
        </div>
      )}

      {toast && <Toast message={toast.message} kind={toast.kind} />}
    </>
  );
}
