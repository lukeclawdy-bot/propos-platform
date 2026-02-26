import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["600", "700"],
});

export const metadata: Metadata = {
  title: "einfach verwaltet. — Hausverwaltung, die funktioniert.",
  description:
    "Hausverwaltung in Hamburg. Transparente Preise, 24/7 Erreichbarkeit, Echtzeit-Dashboard. Ihre Immobilie? Einfach verwaltet.",
  keywords:
    "Hausverwaltung Hamburg, WEG-Verwaltung Hamburg, Mietverwaltung Hamburg, einfach verwaltet, Immobilienverwaltung Hamburg",
  robots: "index, follow",
  openGraph: {
    title: "einfach verwaltet. — Hausverwaltung Hamburg",
    description:
      "Hausverwaltung, die funktioniert. Transparente Preise ab €24/Einheit/Monat.",
    url: "https://einfach-verwaltet.de",
    siteName: "einfach verwaltet.",
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "einfach verwaltet. — Hausverwaltung Hamburg",
    description:
      "Hausverwaltung, die funktioniert. Transparente Preise ab €24/Einheit/Monat.",
  },
};

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const GADS_CONVERSION_ID = process.env.NEXT_PUBLIC_GADS_CONVERSION_ID;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="scroll-smooth">
      <head>
        {/* Google Analytics 4 + Google Ads gtag.js */}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="gtag-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');
                ${GADS_CONVERSION_ID ? `gtag('config', '${GADS_CONVERSION_ID}');` : ''}
              `}
            </Script>
          </>
        )}
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-warm-white text-text-main`}
      >
        {children}
      </body>
    </html>
  );
}
