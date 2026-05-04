"use client";

import { useEffect, useState, useCallback } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import SettingsPanelContent from "@/components/settings/SettingsPanelContent";

export default function SettingsModal({
  onClose,
}: {
  onClose: () => void;
}) {
  const [isOpen, setIsOpen] = useState(true);

  
  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleClose]);

  return (
    <AnimatePresence
      onExitComplete={() => {
        onClose();
      }}
    >
      {isOpen && (
        <div className="fixed inset-0 z-[80] 2xl:hidden">
          {/* Overlay */}
          <motion.button
            type="button"
            aria-label="Close settings overlay"
            onClick={handleClose}
            className="absolute inset-0 bg-black/55 backdrop-blur-[2px] "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          />

          {/* Panel */}
          <motion.aside
            role="dialog"
            aria-modal="true"
            className="absolute right-0 top-0 flex h-full w-full md:max-w-xs flex-col bg-background md:rounded-tl-2xl md:rounded-bl-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "tween",
              ease: [0.22, 1, 0.36, 1],
              duration: 0.45,
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4">
              <h2 className="text-lg font-semibold text-text-secondary">
                Settings
              </h2>

              <button
                type="button"
                onClick={handleClose}
                aria-label="Close settings"
                className="text-text-secondary"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-5 py-5">
              <SettingsPanelContent />
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}