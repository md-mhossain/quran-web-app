import type { Metadata } from "next";
import "./globals.css";

import { Amiri, Inter, Scheherazade_New } from "next/font/google";
import { ThemeProvider } from "@/context/ThemeContext";
import { SettingsProvider } from "@/context/SettingsContext";
import BodyWrapper from "@/components/layout/BodyWrapper";
import { THEME_BOOT_SCRIPT } from "@/lib/theme";

const amiri = Amiri({
  subsets: ["arabic"],
  variable: "--font-amiri",
  weight: ["400", "700"],
});

export const scheherazade = Scheherazade_New({
  subsets: ["arabic"],
  variable: "--font-scheherazade",
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
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${amiri.variable} ${scheherazade.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOT_SCRIPT }} />
        <ThemeProvider>
          <SettingsProvider>
            <BodyWrapper>{children}</BodyWrapper>
          </SettingsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
