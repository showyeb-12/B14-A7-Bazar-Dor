"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import AuthGuard from "@/components/auth/AuthGuard";

function ProfileSkeleton() {
  return (
    <div className="mx-auto max-w-3xl space-y-4 px-4 py-8">
      <div className="skeleton h-9 w-48 rounded" />
      <div className="skeleton h-28 w-full rounded-3xl" />
      <div className="skeleton h-10 w-40 rounded-full" />
    </div>
  );
}

function ProfileContent() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending || !session) {
    return <ProfileSkeleton />;
  }

  const createdAt = session.user.createdAt
    ? new Date(session.user.createdAt)
    : null;
  const joined = createdAt
    ? createdAt.toLocaleDateString("bn-BD", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "—";

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
        আমার প্রোফাইল
      </h1>
      <p className="mt-1 text-sm text-base-content/60">
        আপনার অ্যাকাউন্ট সম্পর্কিত তথ্য
      </p>

      <section className="mt-6 overflow-hidden rounded-3xl border border-base-300 bg-base-100 shadow-sm">
        <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:p-6">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-3xl font-bold text-primary">
            {session.user.name?.charAt(0) ?? "ব"}
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="truncate text-xl font-bold">
              {session.user.name}
            </h2>
            <p className="truncate text-sm text-base-content/60">
              {session.user.email}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="badge badge-ghost">
                যোগদান: {joined}
              </span>
              <span className="badge badge-primary badge-outline">
                প্রমাণীকৃত: {session.user.emailVerified ? "হ্যাঁ" : "না"}
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-6 flex flex-wrap gap-2">
        <Link href="/profile/update" className="btn btn-primary">
          তথ্য হালনাগাদ করুন
        </Link>
        <Link href="/" className="btn btn-ghost">
          হোমে ফিরে যান
        </Link>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <AuthGuard>
      <ProfileContent />
    </AuthGuard>
  );
}