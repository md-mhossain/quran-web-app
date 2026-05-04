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
      <div className="sticky top-0 z-40 w-full">
        <div className="mx-auto flex w-full max-w-[100vw] items-center justify-between gap-3 px-4 py-3 sm:gap-4 md:px-5 lg:px-6">
          {/* Left Section */}
          <div className="flex min-w-0 flex-1 items-center gap-2.5">
            <button
              type="button"
              onClick={onMenuClick}
              aria-label="Open surah navigation"
              className="rounded-full bg-bg-secondary p-2 text-primary transition-colors duration-200 focus-visible:outline-none lg:hidden"
            >
              <Menu
                className="h-5 w-5 sm:h-[19px] sm:w-[19px]"
                strokeWidth={1.75}
              />
            </button>

            <Link href={"/"} className="flex flex-col items-start justify-center leading-tight">
              <h2 className="text-[15px] font-bold text-text-secondary sm:text-lg">
                Quran Mazid
              </h2>

              <p className="hidden text-[10px] text-text-secondary md:block">
                Read, Study, and Learn The Quran
              </p>
            </Link>
          </div>

          {/* Right Section */}
          <div className="flex shrink-0 items-center gap-3.5 sm:gap-5">
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search"
              className="rounded-full bg-bg-secondary p-2 text-primary transition-colors duration-200 outline-0"
            >
              <Search
                className="h-5 w-5 sm:h-[19px] sm:w-[19px]"
                strokeWidth={1.75}
              />
            </button>

            <ThemeToggle />

            <button
              type="button"
              onClick={onOpenSettings}
              aria-label="Open settings"
              className="rounded-full bg-bg-secondary p-2 text-primary lg:hidden"
            >
              <Settings
                className="h-5 w-5 sm:h-[19px] sm:w-[19px]"
                strokeWidth={1.75}
              />
            </button>

            <Link
              href="#support"
              className="ml-1 hidden items-center gap-2 rounded-full bg-primary px-3.5 py-2 text-xs font-normal text-white sm:px-4 sm:text-sm lg:inline-flex"
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