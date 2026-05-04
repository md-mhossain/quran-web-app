"use client";

import {
  Bookmark,
  BookOpen,
  Copy,
  MoreHorizontal,
  Play,
  Pause,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useState, useRef } from "react";

export default function AyahToolbar({
  arabic,
  translation,
  showTranslation,
  audioUrl,
  onPlayClick, // Added to receive the function from SurahDetails
}: {
  arabic: string;
  translation: string;
  showTranslation: boolean;
  audioUrl?: string;
  onPlayClick?: () => void; // Defined the type for the function
}) {
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = useCallback(() => {
    // If a global player function is provided, use that instead of local audio
    if (onPlayClick) {
      onPlayClick();
      return;
    }

    if (!audioUrl) return;

    if (!audioRef.current) {
      audioRef.current = new Audio(audioUrl);
      audioRef.current.onended = () => setIsPlaying(false);
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch((err) => console.error("Playback error:", err));
      setIsPlaying(true);
    }
  }, [audioUrl, isPlaying, onPlayClick]);

  // ESC close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    if (open) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const copyAyah = useCallback(async () => {
    const text = showTranslation ? `${arabic}\n\n${translation}` : arabic;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  }, [arabic, translation, showTranslation]);

  return (
    <>
      {/* DESKTOP TOOLBAR */}
      <div className="hidden md:flex w-[52px] max-w-[52px] flex-col items-start gap-2">
        <button
          onClick={togglePlay}
          className="rounded-xl text-muted hover:bg-bg-secondary p-2 transition-colors"
        >
          {isPlaying ? (
            <Pause className="h-[18px] w-[18px] text-emerald-600" />
          ) : (
            <Play className="h-[18px] w-[18px]" />
          )}
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
          onClick={() => setOpen(true)}
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

      {/* MOBILE BOTTOM SHEET */}
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50">
            <motion.div
              className="absolute inset-0 bg-black/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            <div className="absolute bottom-0 left-0 right-0 flex justify-center">
              <motion.div
                className="w-full max-w-md rounded-t-2xl bg-bg-secondary p-6"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", stiffness: 260, damping: 28 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-gray-300" />

                <div className="flex flex-col space-y-8">
                  <button 
                    onClick={() => {
                        togglePlay();
                        setOpen(false); // Close sheet on play
                    }} 
                    className="flex gap-2 items-center"
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="h-5 w-5 text-emerald-600" />
                        <span className="text-emerald-600">Pause Ayah</span>
                      </>
                    ) : (
                      <>
                        <Play className="h-5 w-5" />
                        Play Ayah
                      </>
                    )}
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