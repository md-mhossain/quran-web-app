"use client";

import {
  Bookmark,
  BookOpen,
  Copy,
  MoreHorizontal,
  Play,
  X,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

import { useCallback, useEffect, useState } from "react";

export default function AyahToolbar({
  arabic,
  translation,
  showTranslation,
}: {
  arabic: string;
  translation: string;
  showTranslation: boolean;
}) {
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);

  const copyAyah = useCallback(async () => {
    const text = showTranslation ? `${arabic}\n\n${translation}` : arabic;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  }, [arabic, translation, showTranslation]);

  // ESC close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    if (open) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);



  return (
    <>
      {/* DESKTOP TOOLBAR */}
      <div className="hidden md:flex w-[52px] max-w-[52px] flex-col items-start gap-2">
        <button
          disabled
          className="cursor-not-allowed rounded-xl text-muted opacity-50 p-2"
        >
          <Play className="h-[18px] w-[18px]" />
        </button>

        <button className="rounded-full p-2 text-muted hover:bg-bg-secondary">
          <BookOpen className="h-[18px] w-[18px]" />
        </button>

        <button className="rounded-full p-2 text-muted hover:bg-bg-secondary">
          <Bookmark className="h-[18px] w-[18px]" />
        </button>

        <button
          onClick={copyAyah}
          className="rounded-full p-2 text-muted hover:bg-bg-secondary"
        >
          <Copy className="h-[18px] w-[18px]" />
        </button>

        <button
          onClick={copyAyah}
          className="rounded-full p-2 text-muted hover:bg-bg-secondary"
        >
          <MoreHorizontal className="h-[18px] w-[18px]" />
        </button>
      </div>

      {/* MOBILE MORE BUTTON */}
      <div className="flex md:hidden w-full justify-end">
        <button
          onClick={() => setOpen(true)}
          className="rounded-full p-2 text-muted hover:bg-bg-secondary"
        >
          <MoreHorizontal className="h-[20px] w-[20px]" />
        </button>
      </div>

      {/* MOBILE BOTTOM SHEET (FRAMER MOTION) */}
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50">
            {/* BACKDROP */}
            <motion.div
              className="absolute inset-0 bg-black/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            {/* SHEET WRAPPER */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-center">
              <motion.div
                className="w-full max-w-md rounded-t-2xl bg-white p-6 shadow-2xl"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 28,
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* HANDLE */}
                <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-gray-300" />

                {/* ACTIONS */}
                <div className="flex flex-col space-y-8">
                  <button disabled className="opacity-50 flex gap-2">
                    <Play className="h-5 w-5" />
                    Play (coming soon)
                  </button>

                  <button className="flex gap-2">
                    <BookOpen className="h-5 w-5" />
                    Tafsir
                  </button>

                  <button className="flex gap-2">
                    <Bookmark className="h-5 w-5" />
                    Bookmark
                  </button>

                  <button onClick={copyAyah} className="flex gap-2">
                    <Copy className="h-5 w-5" />
                    {copied ? "Copied" : "Copy Ayah"}
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
