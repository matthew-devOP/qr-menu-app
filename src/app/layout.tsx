import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { Header } from "@/components/menu";
import { QRScanTracker } from "@/components/tracking/QRScanTracker";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "INFINITY LOUNGE - Meniu Digital",
  description: "Meniu digital interactiv pentru INFINITY LOUNGE. Scanează codul QR pentru a vedea meniul complet.",
  keywords: ["meniu digital", "restaurant", "lounge", "QR menu", "INFINITY LOUNGE"],
  authors: [{ name: "INFINITY LOUNGE" }],
  openGraph: {
    title: "INFINITY LOUNGE - Meniu Digital",
    description: "Descoperă meniul nostru interactiv",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        {/* QR Scan Tracker - reads ?qr= param and tracks scans */}
        <Suspense fallback={null}>
          <QRScanTracker />
        </Suspense>
        <Header showBack />
        <main className="min-h-screen">
          {children}
        </main>
        <footer className="border-t border-border-light bg-white mt-auto">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center text-sm text-text-muted">
              <p className="mb-2">&copy; {new Date().getFullYear()} INFINITY LOUNGE. All rights reserved.</p>
              <p className="text-xs">Meniu digital interactiv</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

