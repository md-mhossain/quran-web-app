"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, Menu, Search, Settings } from "lucide-react";

import ThemeToggle from "@/components/theme/ThemeToggle";
import SearchModal from "../modal/SearchModal";

type Props = {
  onMenuClick: () => void;
  onOpenSettings: () => void;
};

export default function Navbar({
  onMenuClick,
  onOpenSettings,
}: Props) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <div className="sticky top-0 z-40 w-full border-b border-accent bg-bg-primary">
        <div className="mx-auto flex w-full items-center justify-between px-3 py-3 sm:px-4 md:px-5 lg:px-6">
          {/* Left */}
          <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={onMenuClick}
              aria-label="Open surah navigation"
              className="rounded-full bg-bg-secondary p-2 text-primary lg:hidden"
            >
              <Menu className="h-5 w-5" strokeWidth={1.75} />
            </button>

            <Link
              href="/"
              className="min-w-0 flex flex-col justify-center leading-tight mx-auto md:mx-0"
            >
              <h2 className="truncate text-sm font-bold text-text-secondary sm:text-lg">
                Quran Mazid
              </h2>

              <p className="hidden text-[10px] text-text-secondary md:block lg:text-xs">
                Read, Study, and Learn The Quran
              </p>
            </Link>
          </div>

          {/* Right */}
          <div className="flex shrink-0 items-center gap-2 sm:gap-3 md:gap-4">
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search"
              className="rounded-full bg-bg-secondary p-2 text-primary"
            >
              <Search className="h-5 w-5" strokeWidth={1.75} />
            </button>

            <ThemeToggle />

            <button
              type="button"
              onClick={onOpenSettings}
              aria-label="Open settings"
              className="rounded-full bg-bg-secondary p-2 text-primary 2xl:hidden"
            >
              <Settings className="h-5 w-5" strokeWidth={1.75} />
            </button>

            <Link
              href="#support"
              className="hidden items-center gap-2 rounded-full bg-primary px-3 py-2 text-sm font-normal text-white sm:inline-flex"
            >
              <Heart
                className="h-4 w-4 shrink-0 fill-current opacity-90"
                aria-hidden
              />
              Support us
            </Link>
          </div>
        </div>
      </div>

      {isSearchOpen && (
        <SearchModal onClose={() => setIsSearchOpen(false)} />
      )}
    </>
  );
}