import Link from "next/link";
import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer
      id="support"
      className="mt-auto border-t border-[var(--color-border)] bg-[var(--color-surface)]"
    >
      <div className="mx-auto max-w-[1600px] px-4 py-10 md:px-6 md:py-12">
        <div className="rounded-[var(--reader-radius)] border border-[var(--color-border)] bg-[color-mix(in_oklab,var(--color-primary)_10%,var(--color-surface-alt))] p-6 md:flex md:items-center md:justify-between md:gap-8 md:p-8">
          <div className="max-w-xl">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-[var(--foreground)]">
              <Heart className="h-5 w-5 text-[var(--color-primary)]" aria-hidden />
              Support this project
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">
              Consistent translations and typography matter for everyday Quran reading. If this site helps your routine,
              share it with others or contribute improvements where you can.
            </p>
          </div>
          <div className="mt-6 shrink-0 md:mt-0">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-[var(--color-primary-foreground)] shadow-sm transition-all duration-200 hover:bg-[var(--color-secondary)] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-surface)]"
            >
              Browse surahs
            </Link>
          </div>
        </div>
        <p className="mt-8 text-center text-xs text-[var(--color-muted)]">
          © {new Date().getFullYear()} NoorQuran · Built for reflection and learning
        </p>
      </div>
    </footer>
  );
}
