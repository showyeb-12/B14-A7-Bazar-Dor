"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};
const getSnapshot = () => new Date().getFullYear();
const getServerSnapshot = () => 2026;

export default function Footer() {
  const year = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <footer className="border-t border-base-300 bg-base-100/80">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
        <div>
          <p className="text-lg font-extrabold text-primary">
            🛒 বাজার দর
          </p>
          <p className="mt-1 text-sm text-base-content/70">
            প্রয়োজনীয় পণ্যের দাম এক নজরে।
          </p>
        </div>

        <div className="text-sm text-base-content/70">
          <p>সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।</p>
        </div>
      </div>

      <div className="border-t border-base-300/80 bg-base-100/90">
        <div className="mx-auto max-w-6xl px-4 py-3 text-center text-xs text-base-content/60">
          © {year} বাজার দর — সাম্প্রতিক বাজার তথ্য সংকলিত।
        </div>
      </div>
    </footer>
  );
}