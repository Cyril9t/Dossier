import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cyril — Software & Web Developer",
  description: "Portfolio of Cyril, a software and web developer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="min-h-full flex flex-col bg-background text-foreground font-sans">
      <body>{children}</body>
    </html>
  );
}
