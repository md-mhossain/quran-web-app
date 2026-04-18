import type { Metadata } from "next";
import "./globals.css";

import { Amiri, Inter } from "next/font/google";
import { SettingsProvider } from "@/context/SettingsContext";
import BodyWrapper from "@/components/layout/BodyWrapper";

const amiri = Amiri({
  subsets: ["arabic"],
  variable: "--font-amiri",
  weight: ["400", "700"],
});


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Quran App",
  description: "Quran Web Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${amiri.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {/* Wrap entire app */}
        <SettingsProvider>
          <BodyWrapper>{children}</BodyWrapper>
        </SettingsProvider>
      </body>
    </html>
  );
}
