"use client";

import { useSettings } from "@/context/SettingsContext";

export default function BodyWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { settings } = useSettings();


  return (
    <div
      className={`
        min-h-full flex flex-col
        ${settings.font === "amiri" ? "font-amiri" : "font-inter"}
      `}
      style={
        {
          "--arabic-size": `text-[${settings.arabicSize}px]`,
          "--translation-size": `text-[${settings.translationSize}px]`,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}