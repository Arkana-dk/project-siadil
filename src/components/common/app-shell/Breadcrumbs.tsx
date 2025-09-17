"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconFolderLine, IconDocumentLine } from "@/components/common/icons";

type CrumbType = "folder" | "doc";
type Crumb = { name: string; href: string; type: CrumbType };

const ICON_SM = "h-4 w-4";

// Label untuk nama yang lebih mudah dibaca
const LABELS: Record<string, string> = {
  siadil: "SIADIL",
  documents: "Dokumen Arsip",
};

// Perbaikan #3: Konfigurasi untuk tipe path agar lebih fleksibel
const PATH_CONFIG: Record<string, CrumbType> = {
  documents: "doc",
  // Anda bisa tambahkan path lain di sini, contoh:
  // "laporan-tahunan": "doc",
};

export default function Breadcrumbs() {
  const pathname = usePathname();
  const parts = pathname.split("/").filter(Boolean);

  const crumbs: Crumb[] = [{ name: "Root", href: "/", type: "folder" }];

  parts.forEach((part, i) => {
    const href = "/" + parts.slice(0, i + 1).join("/");
    const key = part.toLowerCase();
    const name =
      LABELS[key] ??
      decodeURIComponent(part)
        .replace(/-/g, " ")
        .replace(/\b\w/g, (m) => m.toUpperCase());
        
    // Perbaikan #3: Menggunakan PATH_CONFIG untuk menentukan tipe
    const type: CrumbType = PATH_CONFIG[key] ?? "folder";
    crumbs.push({ name, href, type });
  });

  return (
    <nav aria-label="Breadcrumb" className="mt-2">
      <ol className="flex items-center gap-2 text-sm text-neutral-600">
        {crumbs.map((c, idx) => {
          const isLast = idx === crumbs.length - 1;
          const Icon = c.type === "doc" ? IconDocumentLine : IconFolderLine;

          return (
            // Perbaikan #1: Menggunakan c.href sebagai key yang unik
            <li key={c.href} className="flex items-center gap-2">
              {idx > 0 && <span aria-hidden="true" className="text-neutral-400">›</span>}
              {isLast ? (
                <span
                  className="inline-flex items-center gap-1.5 rounded-lg border bg-neutral-100 px-2.5 py-1.5"
                  // Perbaikan #2: Menambahkan aria-current untuk aksesibilitas
                  aria-current="page"
                >
                  <Icon className={ICON_SM} />
                  <span>{c.name}</span>
                </span>
              ) : (
                <Link
                  href={{ pathname: c.href }}
                  className="inline-flex items-center gap-1.5 rounded-lg border bg-white px-2.5 py-1.5 hover:bg-neutral-50"
                >
                  <Icon className={ICON_SM} />
                  <span>{c.name}</span>
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}