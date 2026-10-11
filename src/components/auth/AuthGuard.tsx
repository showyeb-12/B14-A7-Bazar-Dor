"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

let redirected = false;

export default function AuthGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { data: session, isPending, error } = authClient.useSession();

  useEffect(() => {
    if (isPending || session || redirected) return;
    redirected = true;
    toast.error("এই পেজটি দেখতে সাইন ইন করতে হবে।");
    router.replace("/signin");
  }, [isPending, session, router]);

  if (isPending) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center gap-4 px-4 text-center">
        <span className="loading loading-spinner loading-lg text-primary" />
        <p className="text-sm text-base-content/60">চেক করা হচ্ছে...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h2 className="text-lg font-bold">অ্যাক্সেস চেক করা যায়নি</h2>
        <p className="mt-2 text-sm text-base-content/60">
          ইন্টারনেট সংযোগ দেখে আবার চেষ্টা করুন।
        </p>
        <Link href="/" className="btn btn-primary mt-4">
          হোমে যান
        </Link>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return <>{children}</>;
}