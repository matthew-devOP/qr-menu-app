import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

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
        {children}
      </body>
    </html>
  );
}
