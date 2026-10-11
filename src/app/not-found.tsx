import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-4 text-center">
      <div className="text-6xl sm:text-7xl" aria-hidden>
        😕
      </div>
      <h1 className="mt-6 text-3xl font-extrabold tracking-tight sm:text-4xl">
        পেজটি খুঁজে পাওয়া যায়নি
      </h1>
      <p className="mt-2 max-w-md text-base leading-relaxed text-base-content/70">
        আপনি যে পেজটি খুঁজছেন সেটি অস্তিত্ব নেই, সরিয়ে ফেলা হয়েছে অথবা URL
        পরিবর্তিত হয়েছে।
      </p>
      <Link href="/" className="btn btn-primary mt-6">
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}