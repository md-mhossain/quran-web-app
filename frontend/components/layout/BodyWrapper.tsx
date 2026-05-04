"use client";

export default function BodyWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-text-secondary antialiased font-inter">
      {children}
    </div>
  );
}