"use client";

import SettingsPanelContent from "@/components/settings/SettingsPanelContent";

export default function SettingsAside() {
  return (
    <aside
      aria-label="Reading settings"
      className="relative hidden min-h-0 w-[min(100%,340px)] shrink-0 flex-col border-l border-gray-200 2xl:flex"
    >
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain px-5 py-5">
        <SettingsPanelContent />
      </div>
    </aside>
  );
}