// src/components/common/table/Pagination.tsx
"use client";
import { useRouter, useSearchParams } from "next/navigation";

function buildPager(current: number, total: number, delta = 1): (number | "…")[] {
  const set = new Set<number>([1, total]);
  for (let p = current - delta; p <= current + delta; p++) if (p >= 1 && p <= total) set.add(p);
  const arr = Array.from(set).sort((a, b) => a - b);
  const out: (number | "…")[] = [];
  for (let i = 0; i < arr.length; i++) {
    out.push(arr[i]);
    if (i < arr.length - 1 && arr[i + 1] - arr[i] > 1) out.push("…");
  }
  return out;
}

export default function Pagination({ page, totalPages }: { page: number; totalPages: number }) {
  const router = useRouter();
  const params = useSearchParams();

  const go = (p: number) => {
    const sp = new URLSearchParams(params);
    sp.set("page", String(p));
    router.push(`?${sp.toString()}`);
  };

  const items = buildPager(page, totalPages);

  return (
    <div className="flex items-center gap-1 text-sm">
      <button disabled={page <= 1} onClick={() => go(page - 1)} className="px-2 py-1 border rounded">Prev</button>
      {items.map((it, idx) => (
        <button
          key={idx}
          disabled={it === "…"}
          onClick={() => typeof it === "number" && go(it)}
          className={`px-2 py-1 border rounded ${it === page ? "bg-emerald-600 text-white" : ""}`}
        >
          {it}
        </button>
      ))}
      <button disabled={page >= totalPages} onClick={() => go(page + 1)} className="px-2 py-1 border rounded">Next</button>
    </div>
  );
}
