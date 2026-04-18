"use client";

import Link from "next/link";
import { BookOpen, Settings, X } from "lucide-react";
import { useState } from "react";
import SettingsModal from "@/components/modal/SettingsModal";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function Sidebar({ open, onClose }: Props) {
  const [openSettings, setOpenSettings] = useState(false);

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-[85%] lg:w-[20%] max-w-xs bg-white z-50 shadow-xl transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 shadow">
          <h2 className="text-base sm:text-lg font-semibold">Menu</h2>
          <X className="w-5 h-5 cursor-pointer" onClick={onClose} />
        </div>

        {/* Menu Items */}
        <div className="p-4 flex flex-col gap-2 sm:gap-3">
          
          {/* Quran Link */}
          <Link href="/" onClick={onClose}>
            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition">
              <BookOpen className="w-5 h-5 text-primary" />
              <span className="text-sm sm:text-base font-medium">
                Quran
              </span>
            </div>
          </Link>

          {/* Settings Button (NO LINK) */}
          <div
            onClick={() => setOpenSettings(true)}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 cursor-pointer transition"
          >
            <Settings className="w-5 h-5 text-primary" />
            <span className="text-sm sm:text-base font-medium">
              Settings
            </span>
          </div>
        </div>
      </div>

      {/* Settings Modal */}
      {openSettings && (
        <SettingsModal onClose={() => setOpenSettings(false)} />
      )}
    </>
  );
}