"use client";

import { useSyncExternalStore } from "react";
import { banglaDate } from "@/lib/bn";

const subscribe = () => () => {};
const getSnapshot = () => banglaDate();
const getServerSnapshot = () => "";

export default function ClientDate({ className }: { className?: string }) {
  const text = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <span className={className} suppressHydrationWarning>
      {text}
    </span>
  );
}
