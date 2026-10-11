import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import { Toaster } from "react-hot-toast";
import QueryProvider from "@/providers/QueryProvider";
import Navbar from "@/components/Navbar";
import Ticker from "@/components/Ticker";
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
      <body className="flex min-h-full flex-col antialiased">
        <QueryProvider>
          <Navbar />
          <Ticker />
          <main className="flex-1">{children}</main>
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 3500,
              style: {
                fontFamily: "var(--font-sans)",
                borderRadius: "0.75rem",
              },
            }}
          />
        </QueryProvider>
      </body>
    </html>
  );
}
