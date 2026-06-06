import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/lib/LenisProvider";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Samosa King | Empanadas de la India",
  description:
    "Premium Indian samosas crafted with royal spices. Experience the Kingdom of Samosas — where tradition meets modern street food culture.",
  keywords: ["samosa", "indian food", "empanadas", "street food", "samosa king"],
  icons: {
    icon: "/Fotos Samosas/Branding/favicon-square.png",
    apple: "/Fotos Samosas/Branding/favicon-square.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen antialiased">
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
