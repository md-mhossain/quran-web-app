"use client";

import { useSettings } from "@/context/SettingsContext";
import { X } from "lucide-react";

export default function SettingsModal({ onClose }: { onClose: () => void }) {
  const { settings, setSettings } = useSettings();

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/40 z-50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed bottom-0 sm:top-1/2 sm:-translate-y-1/2 left-1/2 -translate-x-1/2 w-full sm:w-[400px] bg-white z-50 rounded-t-2xl sm:rounded-xl shadow-lg p-5">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Settings</h2>
          <X
            className="w-5 h-5 cursor-pointer"
            onClick={onClose}
          />
        </div>

        {/* Content */}
        <div className="flex flex-col gap-5">
          
          {/* Arabic Font */}
          <div>
            <label className="text-sm font-medium">Arabic Font</label>
            <select
              value={settings.font}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  font: e.target.value,
                })
              }
              className="w-full mt-2 p-2 border rounded"
            >
              <option value="amiri">Amiri</option>
              <option value="inter">Inter</option>
            </select>
          </div>

          {/* Arabic Size */}
          <div>
            <label className="text-sm font-medium">
              Arabic Font Size: {settings.arabicSize}px
            </label>
            <input
              type="range"
              min={18}
              max={40}
              value={settings.arabicSize}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  arabicSize: Number(e.target.value),
                })
              }
              className="w-full"
            />
          </div>

          {/* Translation Size */}
          <div>
            <label className="text-sm font-medium">
              Translation Size: {settings.translationSize}px
            </label>
            <input
              type="range"
              min={12}
              max={28}
              value={settings.translationSize}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  translationSize: Number(e.target.value),
                })
              }
              className="w-full"
            />
          </div>
        </div>
      </div>
    </>
  );
}