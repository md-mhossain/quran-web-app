"use client";

import { useState, useId } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

import { useSettings } from "@/context/SettingsContext";

type ReadingMode = "reading" | "translation";

type ModeItem = {
  key: ReadingMode;
  label: string;
};

export default function SettingsPanelContent() {
  const { settings, setSettings } = useSettings();

  const [readingOpen, setReadingOpen] = useState(true);
  const [fontOpen, setFontOpen] = useState(true);

  const fontSelectId = useId();

  const modes: ModeItem[] = [
    { key: "translation", label: "Translation" },
    { key: "reading", label: "Reading" },
  ];

  const updateSettings = (payload: Partial<typeof settings>) => {
    setSettings({ ...settings, ...payload });
  };

  return (
    <>
      {/* Mode Switch */}
      <div className="mb-6 inline-flex w-full rounded-full bg-bg-secondary p-1">
        {modes.map((item) => {
          const active = settings.readingMode === item.key;

          return (
            <button
              key={item.key}
              type="button"
              onClick={() => updateSettings({ readingMode: item.key })}
              className={`
                flex-1 rounded-full px-3 py-2 text-sm font-semibold tracking-wide transition-all duration-200 sm:px-4
                ${active ? "bg-white text-text-secondary" : "text-text-secondary"}
              `}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {/* Sections */}
      <div className="flex flex-col gap-2">
        {/* Reading Settings */}
        <button
          type="button"
          onClick={() => setReadingOpen((o) => !o)}
          className="flex w-full items-center justify-between rounded-xl py-3 text-left text-sm font-semibold text-text-secondary"
        >
          Reading settings
          <ChevronDown
            className={`h-5 w-5 shrink-0 text-muted transition-transform duration-200 ${
              readingOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {readingOpen && (
          <div className="rounded-xl border border-gray-200 bg-bg-secondary px-4 py-4 text-sm leading-relaxed text-text-secondary">
            Translation mode shows ayah translations; Reading mode hides them
            for focused Arabic recitation.
          </div>
        )}

        {/* Font Settings */}
        <button
          type="button"
          onClick={() => setFontOpen((o) => !o)}
          className="flex w-full items-center justify-between rounded-xl py-3 text-left text-sm font-semibold text-text-secondary"
        >
          Font settings
          <ChevronDown
            className={`h-5 w-5 shrink-0 text-muted transition-transform duration-200 ${
              fontOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {fontOpen && (
          <div className="flex flex-col gap-6 rounded-xl">
            {/* Arabic Font */}
            <div>
              <label
                htmlFor={fontSelectId}
                className="text-sm font-semibold tracking-wide text-text-secondary"
              >
                Arabic Font Face
              </label>

              <select
                id={fontSelectId}
                value={settings.font}
                onChange={(e) =>
                  updateSettings({ font: e.target.value })
                }
                className="mt-2 w-full rounded-md bg-bg-secondary px-4 py-3.5 text-sm text-text-secondary focus:outline-none"
              >
                <option value="amiri">Amiri</option>
                <option value="scheherazade">Scheherazade New</option>
              </select>
            </div>

            {/* Arabic Font Size */}
            <div>
              <label className="flex justify-between text-xs font-semibold tracking-wide text-muted">
                <span>Arabic font size</span>
                <span className="tabular-nums text-primary">
                  {settings.arabicSize}
                </span>
              </label>

              <input
                type="range"
                min={18}
                max={100}
                value={settings.arabicSize}
                onChange={(e) =>
                  updateSettings({
                    arabicSize: Number(e.target.value),
                  })
                }
                className="mt-3 w-full cursor-pointer appearance-none bg-transparent
                [&::-webkit-slider-runnable-track]:h-1.5
                [&::-webkit-slider-runnable-track]:w-full
                [&::-webkit-slider-runnable-track]:rounded-full
                [&::-webkit-slider-runnable-track]:bg-gray-100/80

                [&::-webkit-slider-thumb]:mt-[-6px]
                [&::-webkit-slider-thumb]:h-[16px]
                [&::-webkit-slider-thumb]:w-[16px]
                [&::-webkit-slider-thumb]:appearance-none
                [&::-webkit-slider-thumb]:rounded-full
                [&::-webkit-slider-thumb]:bg-[var(--color-primary)]
                [&::-webkit-slider-thumb]:transition-transform
                [&::-webkit-slider-thumb]:duration-100
                [&::-webkit-slider-thumb]:active:scale-95

                [&::-moz-range-track]:h-1.5
                [&::-moz-range-track]:rounded-full
                [&::-moz-range-track]:bg-gray-100/80

                [&::-moz-range-progress]:h-1.5
                [&::-moz-range-progress]:rounded-full
                [&::-moz-range-progress]:bg-[var(--color-primary)]

                [&::-moz-range-thumb]:h-[14px]
                [&::-moz-range-thumb]:w-[14px]
                [&::-moz-range-thumb]:border-0
                [&::-moz-range-thumb]:rounded-full
                [&::-moz-range-thumb]:bg-[var(--color-primary)]"
              />
            </div>

            {/* Translation Font Size */}
            <div>
              <label className="flex justify-between text-xs font-semibold tracking-wide text-muted">
                <span>Translation font size</span>
                <span className="tabular-nums text-primary">
                  {settings.translationSize}
                </span>
              </label>

              <input
                type="range"
                min={14}
                max={44}
                value={settings.translationSize}
                onChange={(e) =>
                  updateSettings({
                    translationSize: Number(e.target.value),
                  })
                }
                className="mt-3 w-full cursor-pointer appearance-none bg-transparent
                [&::-webkit-slider-runnable-track]:h-1.5
                [&::-webkit-slider-runnable-track]:w-full
                [&::-webkit-slider-runnable-track]:rounded-full
                [&::-webkit-slider-runnable-track]:bg-gray-100/80

                [&::-webkit-slider-thumb]:mt-[-6px]
                [&::-webkit-slider-thumb]:h-[16px]
                [&::-webkit-slider-thumb]:w-[16px]
                [&::-webkit-slider-thumb]:appearance-none
                [&::-webkit-slider-thumb]:rounded-full
                [&::-webkit-slider-thumb]:bg-[var(--color-primary)]
                [&::-webkit-slider-thumb]:transition-transform
                [&::-webkit-slider-thumb]:duration-100
                [&::-webkit-slider-thumb]:active:scale-95

                [&::-moz-range-track]:h-1.5
                [&::-moz-range-track]:rounded-full
                [&::-moz-range-track]:bg-gray-100/80

                [&::-moz-range-progress]:h-1.5
                [&::-moz-range-progress]:rounded-full
                [&::-moz-range-progress]:bg-[var(--color-primary)]

                [&::-moz-range-thumb]:h-[14px]
                [&::-moz-range-thumb]:w-[14px]
                [&::-moz-range-thumb]:border-0
                [&::-moz-range-thumb]:rounded-full
                [&::-moz-range-thumb]:bg-[var(--color-primary)]"
              />
            </div>
          </div>
        )}
      </div>

      {/* Support Section */}
      <div className="mt-8 block rounded-xl border border-gray-200 bg-primary/10 p-4">
        <h1 className="text-start text-lg font-semibold text-text-secondary">
          Help spread the knowledge of Islam
        </h1>

        <p className="text-sm text-muted">
          Your regular support helps us reach our religious brothers and sisters
          with the message of Islam. Join our mission and be part of the big change.
        </p>

        <div className="mt-4 flex justify-center">
          <Link
            href="#support"
            className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2 text-white"
          >
            Support Us
          </Link>
        </div>
      </div>
    </>
  );
}