import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vermieterportal — einfach verwaltet.",
  description:
    "Ihr persönliches Vermieter-Dashboard für Immobilienverwaltung, Mieterkommunikation und KI-gestützte Automatisierung.",
  keywords:
    "Vermieterportal, Immobilienverwaltung, Mieterkommunikation, Hausverwaltung Hamburg",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#1B3A5C",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased bg-warm-white text-text-main min-h-screen">
        {children}
      </body>
    </html>
  );
}