"use client";

import Link from "next/link";
import {
  BookMarked,
  Home,
  LayoutGrid,
  Send,
} from "lucide-react";

import QuranLogo from "./QuranLogo";

type IconButtonProps = {
  href: string;
  label: string;
  children: React.ReactNode;
};

function IconButton({
  href,
  label,
  children,
}: IconButtonProps) {
  return (
    <Link
      href={href}
      title={label}
      aria-label={label}
      className="flex h-[52px] w-full shrink-0 items-center justify-center text-text-secondary"
    >
      {children}
    </Link>
  );
}

export default function IconPanel() {

  return (
    <>
      <div
        aria-hidden
        className="hidden w-[56px] shrink-0 lg:block"
      />

      <aside
        aria-label="Primary navigation"
        className="fixed bottom-0 left-0 top-0 z-[45] hidden w-[56px] flex-col items-stretch bg-bg-secondary lg:flex"
      >
        {/* Logo */}
        <div className="flex shrink-0 items-center justify-center p-3">
          <Link
            href="/"
            aria-label="Home"
            className="flex items-center justify-center rounded-lg bg-primary"
          >
            <QuranLogo className="h-10 w-10 text-white" />
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex min-h-0 flex-1 flex-col items-center justify-center py-2">
          <IconButton href="/" label="Home">
            <Home className="h-[22px] w-[22px] stroke-[1.75]" />
          </IconButton>

          <IconButton href="/surah/1" label="Read Quran">
            <LayoutGrid className="h-[22px] w-[22px] stroke-[1.75]" />
          </IconButton>

          <IconButton href="#reader-main" label="Bookmarks">
            <BookMarked className="h-[22px] w-[22px] stroke-[1.75]" />
          </IconButton>

          <IconButton href="#reader-main" label="Go to ayah">
            <Send className="h-[22px] w-[22px] stroke-[1.75]" />
          </IconButton>
        </nav>
      </aside>
    </>
  );
}