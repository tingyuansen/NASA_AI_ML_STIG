import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "NASA Cosmic Origins AI/ML STIG",
    template: "%s | NASA AI/ML STIG",
  },
  description:
    "The NASA Cosmic Origins Program AI/ML Science and Technology Interest Group provides structured, domain-specific AI education for astronomical research.",
  keywords: [
    "NASA",
    "AI",
    "Machine Learning",
    "Astronomy",
    "Cosmic Origins",
    "COPAG",
    "Deep Learning",
    "Transformers",
    "LLM",
  ],
  authors: [{ name: "Yuan-Sen Ting" }],
  creator: "NASA Cosmic Origins AI/ML STIG",
  openGraph: {
    title: "NASA Cosmic Origins AI/ML STIG",
    description:
      "Building AI literacy for astronomical research through stackable, modular training.",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
