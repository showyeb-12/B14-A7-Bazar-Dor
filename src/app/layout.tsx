import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import "./globals.css";

const hind = Hind_Siliguri({
  variable: "--font-hind",
  subsets: ["bengali", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে",
    template: "%s | বাজার দর",
  },
  description:
    "বাজার দর — প্রতিদিনের নিত্যপ্রয়োজনীয় পণ্যের আজকের বাজারদর, দাম বাড়া-কমা ও বাজারভিত্তিক তথ্য এক জায়গায়।",
  keywords: [
    "বাজার দর",
    "আজকের বাজারদর",
    "BazarDor",
    "নিত্যপণ্যের দাম",
    "কাঁচাবাজার",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="bn" data-theme="bazardor" className={`${hind.variable} h-full`}>
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
