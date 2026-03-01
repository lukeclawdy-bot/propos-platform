"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface MieteFiltersProps {
  properties: string[];
  statusFilter: string;
  propertyFilter: string;
}

export function MieteFilters({ properties, statusFilter, propertyFilter }: MieteFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function updateFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    // preserve demo param if present
    router.push(`/portal/miete?${params.toString()}`);
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 mb-6">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <label className="text-sm text-text-light">Status:</label>
          <select
            className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm bg-white"
            value={statusFilter}
            onChange={(e) => updateFilter("filter", e.target.value)}
          >
            <option value="all">Alle</option>
            <option value="paid">Bezahlt</option>
            <option value="pending">Ausstehend</option>
            <option value="overdue">Überfällig</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm text-text-light">Objekt:</label>
          <select
            className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm bg-white"
            value={propertyFilter}
            onChange={(e) => updateFilter("property", e.target.value)}
          >
            <option value="all">Alle Objekte</option>
            {properties.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
