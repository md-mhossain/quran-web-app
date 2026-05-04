import Link from "next/link";
import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer
      id="support"
      className="mt-auto border-t border-accent bg-background"
    >
      <div className="mx-auto max-w-[1600px] px-4 py-10 md:px-6 md:py-12">
        <p className="mt-8 text-center text-xs text-muted">
          © {new Date().getFullYear()} NoorQuran · Built for reflection and learning
        </p>
      </div>
    </footer>
  );
}
