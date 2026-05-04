"use client";

import { useState } from "react";

import Navbar from "@/components/layout/Navbar";
import Footer from "./Footer";
import IconPanel from "@/components/layout/IconPanel";
import SurahSidebar from "@/components/layout/SurahSidebar";
import SettingsAside from "@/components/layout/SettingsAside";
import SettingsModal from "@/components/modal/SettingsModal";

import { Surah } from "@/types";

type Props = {
  children: React.ReactNode;
  surahs?: Surah[];
  currentSurahId?: number;
};

export default function MasterLayout({
  children,
  surahs = [],
  currentSurahId,
}: Props) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <div className="flex h-screen w-full flex-row overflow-hidden bg-white">
      {/* Left Icon Panel */}
      <IconPanel />

      {/* Main Layout */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="w-full shrink-0 border-b border-gray-100">
          <Navbar
            onMenuClick={() => setMobileNavOpen(true)}
            onOpenSettings={() => setSettingsOpen(true)}
          />
        </header>

        {/* Body */}
        <div className="flex min-h-0 flex-1 overflow-hidden">
          {/* Sidebar */}
          <SurahSidebar
            surahs={surahs}
            currentSurahId={currentSurahId}
            mobileOpen={mobileNavOpen}
            onMobileClose={() => setMobileNavOpen(false)}
          />

          {/* Content */}
          <main
            id="reader-main"
            className="flex min-w-0 flex-1 flex-col overflow-y-auto scroll-smooth overscroll-contain bg-white"
          >
            <div className="flex-1">{children}</div>
            <Footer />
          </main>

          {/* Settings Desktop Panel */}
          <SettingsAside />
        </div>
      </div>

      {/* Mobile Settings Modal */}
      {settingsOpen && (
        <SettingsModal onClose={() => setSettingsOpen(false)} />
      )}
    </div>
  );
}