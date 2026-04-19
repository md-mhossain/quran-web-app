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
    >
      {children}
    </div>
  );
}