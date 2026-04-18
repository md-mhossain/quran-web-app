"use client";

import Link from "next/link";
import { BookOpen, Settings, X } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function Sidebar({ open, onClose }: Props) {
  return (
    <>
      {/* Overlay */}
      {open && (
        <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white z-50 shadow-xl transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4.5 shadow">
          <h2 className="text-lg font-semibold">Menu</h2>
          <X className="w-5 h-5 cursor-pointer" onClick={onClose} />
        </div>

        {/* Menu Items */}
        <div className="p-4 flex flex-col gap-3">
          {/* Quran Link */}
          <Link href="/" onClick={onClose}>
            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 cursor-pointer transition">
              <BookOpen className="w-5 h-5 text-primary" />
              <span className="font-medium">Quran</span>
            </div>
          </Link>

          {/* Settings Link */}
          <Link href="/settings" onClick={onClose}>
            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 cursor-pointer transition">
              <Settings className="w-5 h-5 text-primary" />
              <span className="font-medium">Settings</span>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
