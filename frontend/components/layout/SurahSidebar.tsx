"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";

import { Surah } from "@/types";
import QuranLogo from "./QuranLogo";

type TabKey = "surah" | "juz" | "page";

type Props = {
  surahs: Surah[];
  currentSurahId?: number;
  mobileOpen: boolean;
  onMobileClose: () => void;
};

const TABS = [
  { id: "surah" as const, label: "Surah" },
  { id: "juz" as const, label: "Juz" },
  { id: "page" as const, label: "Page" },
];

export default function SurahSidebar({
  surahs,
  currentSurahId,
  mobileOpen,
  onMobileClose,
}: Props) {
  const [tab, setTab] = useState<TabKey>("surah");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return surahs;

    return surahs.filter((s) =>
      [
        String(s.id),
        s.transliteration?.toLowerCase() ?? "",
        s.translation?.toLowerCase() ?? "",
        s.name ?? "",
      ]
        .join(" ")
        .includes(q)
    );
  }, [surahs, query]);

  return (
    <>
      {/* Overlay */}
      <button
        type="button"
        onClick={onMobileClose}
        aria-label="Close navigation overlay"
        className={`
          fixed inset-0 z-40 bg-black/55 backdrop-blur-[2px]
          transition-opacity duration-300 ease-out
          lg:hidden
          ${
            mobileOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }
        `}
      />

      {/* Sidebar */}
      <aside
        aria-label="Browse surahs"
        className={`
          fixed left-0 top-0 z-50 flex h-full w-full flex-col
          border-r border-accent

          transform transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
          will-change-transform

          ${mobileOpen ? "translate-x-0 bg-background" : "-translate-x-full"}
          
          lg:static lg:translate-x-0 lg:w-[min(100%,300px)]
          2xl:w-[min(100%,340px)]
        `}
      >
        {/* Mobile Header */}
        <div className="flex items-center justify-between gap-3 px-4 py-3.5 lg:hidden">
          <div className="flex items-center gap-3">
            <QuranLogo className="h-6 w-6 text-white" />

            <Link href={"/"} onClick={onMobileClose} className="flex flex-col leading-tight">
              <h2 className="text-lg font-bold text-text-secondary">
                Quran Mazid
              </h2>
              <p className="text-[10px] text-text-secondary">
                Read, Study, and Learn The Quran
              </p>
            </Link>
          </div>

          <button
            type="button"
            onClick={onMobileClose}
            aria-label="Close menu"
            className="text-text-secondary"
          >
            <X className="h-6 w-6" strokeWidth={1.75} />
          </button>
        </div>

        {/* Tabs + Search */}
        <div className="px-4 pb-2 pt-5 md:px-5 lg:px-6 lg:pt-6">
          <div className="flex rounded-full bg-bg-secondary p-1">
            {TABS.map(({ id, label }) => {
              const disabled = id !== "surah";
              const active = tab === id && id === "surah";

              return (
                <button
                  key={id}
                  type="button"
                  disabled={disabled}
                  onClick={() => !disabled && setTab(id)}
                  className={`
                    flex-1 rounded-full px-3 py-2 text-xs font-semibold
                    capitalize tracking-wide transition-all duration-200
                    ${
                      active
                        ? "bg-background text-text-secondary"
                        : "text-muted hover:text-text-secondary"
                    }
                    ${disabled ? "opacity-40 cursor-not-allowed text-text-secondary" : ""}
                  `}
                >
                  {label}
                </button>
              );
            })}
          </div>

          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />

            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Surah"
              className="w-full rounded-full bg-bg-secondary py-2.5 pl-10 pr-3 text-sm text-text-secondary focus-visible:ring-0 focus-visible:outline-0"
            />
          </div>
        </div>

        {/* List */}
        <nav className="min-h-0 flex-1 overflow-y-auto px-4 py-3 md:px-5 lg:px-6">
          {filtered.length === 0 ? (
            <p className="text-center text-sm text-muted">
              No results found
            </p>
          ) : (
            <ul className="flex flex-col gap-2">
              {filtered.map((surah) => {
                const active = currentSurahId === surah.id;

                return (
                  <li key={surah.id}>
                    <Link
                      href={`/surah/${surah.id}`}
                      onClick={onMobileClose}
                      className={`
                        flex items-center gap-3 rounded-xl border p-4
                        transition-all duration-200
                        border-accent group
                        ${
                          active
                            ? "bg-sidebar-hover "
                            : "hover:bg-sidebar-hover"
                        }
                      `}
                    >
                      <div
                        className={`
                          flex h-10 w-10 rotate-45 items-center justify-center
                          rounded-md bg-bg-secondary text-text-secondary group-hover:bg-primary group-hover:text-white transition duration-300
                          ${active ? "bg-primary text-white" : ""}
                        `}
                      >
                        <span className="-rotate-45 text-xs font-bold">
                          {surah.id}
                        </span>
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold">
                          {surah.transliteration}
                        </p>
                        <p className="truncate text-xs text-text-secondary">
                          {surah.translation}
                        </p>
                      </div>

                      <p className="arabic-font max-w-[40%] truncate text-right text-[15px] text-muted">
                        {surah.name}
                      </p>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </nav>
      </aside>
    </>
  );
}