import type { ChangeDir, Unit } from "./types";

const BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

const BN_WEEKDAYS = [
  "রবিবার",
  "সোমবার",
  "মঙ্গলবার",
  "বুধবার",
  "বৃহস্পতিবার",
  "শুক্রবার",
  "শনিবার",
];

const BN_MONTHS = [
  "বৈশাখ",
  "জ্যৈষ্ঠ",
  "আষাঢ়",
  "শ্রাবণ",
  "ভাদ্র",
  "আশ্বিন",
  "কার্তিক",
  "অগ্রহায়ণ",
  "পৌষ",
  "মাঘ",
  "ফাল্গুন",
  "চৈত্র",
];

/** Convert every ASCII digit in a string/number to Bengali digits. */
export function toBn(value: number | string): string {
  return String(value).replace(/[0-9]/g, (digit) => BN_DIGITS[Number(digit)]);
}

/** Group a number with thousands separators, then convert to Bengali digits. */
export function bnNumber(value: number, fractionDigits = 0): string {
  const formatted = value.toLocaleString("en-US", {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  });
  return toBn(formatted);
}

/** e.g. 148 -> "১৪৮ টাকা", 1850 -> "১,৮৫০ টাকা" */
export function formatTaka(value: number): string {
  return `${bnNumber(value)} টাকা`;
}

/** e.g. 2.1 -> "২.১%" */
export function formatPercent(value: number): string {
  return `${bnNumber(Math.abs(value), Math.abs(value) % 1 === 0 ? 0 : 1)}%`;
}

const UNIT_LABELS: Record<Unit, string> = {
  kg: "প্রতি কেজি",
  litre: "প্রতি লিটার",
  dozen: "প্রতি ডজন",
  piece: "প্রতি পিস",
};

export function unitLabel(unit: Unit): string {
  return UNIT_LABELS[unit] ?? `প্রতি ${unit}`;
}

export interface ChangeView {
  dir: ChangeDir;
  symbol: string;
  text: string;
  tone: "up" | "down" | "flat";
  colorClass: string;
  bgClass: string;
  label: string;
}

export function changeView(change: {
  dir: ChangeDir;
  pct: number;
}): ChangeView {
  const pct = formatPercent(change.pct);
  if (change.dir === "up") {
    return {
      dir: "up",
      symbol: "▲",
      text: `${pct}`,
      tone: "up",
      colorClass: "text-success",
      bgClass: "bg-success/10 text-success border-success/20",
      label: `দাম বেড়েছে ${pct}`,
    };
  }
  if (change.dir === "down") {
    return {
      dir: "down",
      symbol: "▼",
      text: `${pct}`,
      tone: "down",
      colorClass: "text-error",
      bgClass: "bg-error/10 text-error border-error/20",
      label: `দাম কমেছে ${pct}`,
    };
  }
  return {
    dir: "flat",
    symbol: "—",
    text: `${pct}`,
    tone: "flat",
    colorClass: "text-base-content/50",
    bgClass: "bg-base-200 text-base-content/60 border-base-300",
    label: `দাম অপরিবর্তিত ${pct}`,
  };
}

function isGregorianLeap(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

/**
 * Modern Bangladesh Bangla (Bongabdo) date, anchored to 14 April (Pohela Boishakh).
 * Returns e.g. "১৪ কার্তিক ১৪৩১, সোমবার".
 */
export function banglaDate(date: Date = new Date()): string {
  const g = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  let anchorYear = g.getFullYear();
  const thisYearAnchor = new Date(anchorYear, 3, 14);
  if (g < thisYearAnchor) anchorYear -= 1;

  const start = new Date(anchorYear, 3, 14);
  const banglaYear = anchorYear - 593;
  const dayOfYear = Math.round(
    (g.getTime() - start.getTime()) / 86_400_000,
  );

  const falgunLength = isGregorianLeap(anchorYear) ? 30 : 29;
  const lengths = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, falgunLength, 30];

  let remaining = dayOfYear;
  let monthIndex = 0;
  while (monthIndex < lengths.length && remaining >= lengths[monthIndex]) {
    remaining -= lengths[monthIndex];
    monthIndex += 1;
  }
  if (monthIndex >= lengths.length) monthIndex = lengths.length - 1;

  const day = remaining + 1;
  const weekday = BN_WEEKDAYS[g.getDay()];

  return `${toBn(day)} ${BN_MONTHS[monthIndex]} ${toBn(banglaYear)}, ${weekday}`;
}

/** e.g. "সোমবার" */
export function banglaWeekday(date: Date = new Date()): string {
  return BN_WEEKDAYS[date.getDay()];
}
