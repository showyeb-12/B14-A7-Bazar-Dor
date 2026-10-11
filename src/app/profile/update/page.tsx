"use client";

import { useEffect, useRef, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import AuthGuard from "@/components/auth/AuthGuard";

function UpdateSkeleton() {
  return (
    <div className="mx-auto max-w-2xl space-y-4 px-4 py-8">
      <div className="skeleton h-9 w-56 rounded" />
      <div className="skeleton h-40 w-full rounded-3xl" />
      <div className="skeleton h-10 w-36 rounded-full" />
    </div>
  );
}

function UpdateContent() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (session?.user.name && nameRef.current) {
      nameRef.current.value = session.user.name;
    }
  }, [session?.user.name]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const input = nameRef.current;
    const trimmed = input?.value.trim() ?? "";
    if (!trimmed) {
      toast.error("নাম দিতে হবে।");
      return;
    }
    if (trimmed === session?.user.name) {
      toast("কোনো পরিবর্তন হয়নি।");
      return;
    }

    const { error } = await authClient.updateUser({ name: trimmed });
    if (error) {
      toast.error("তথ্য হালনাগাদ করতে ব্যর্থ হয়েছে।");
      return;
    }

    toast.success("তথ্য সফলভাবে হালনাগাদ হয়েছে।");
    router.push("/profile");
  }

  if (isPending) {
    return <UpdateSkeleton />;
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
        তথ্য হালনাগাদ
      </h1>
      <p className="mt-1 text-sm text-base-content/60">
        আপনার প্রোফাইলে প্রদর্শিত নাম পরিবর্তন করতে পারেন
      </p>

      <form
        onSubmit={onSubmit}
        className="mt-6 grid gap-5 rounded-3xl border border-base-300 bg-base-100 p-5 shadow-sm sm:p-6"
      >
        <label className="text-sm font-medium">
          <span>পূর্ণ নাম</span>
          <input
            ref={nameRef}
            type="text"
            autoComplete="name"
            required
            placeholder="আপনার নাম লিখুন"
            className="input input-bordered mt-1 w-full"
            maxLength={100}
          />
        </label>

        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs text-base-content/50">
            BetterAuth — update-user API অনুসারে
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => router.back()}
              className="btn btn-ghost"
            >
              বাতিল
            </button>
            <button type="submit" className="btn btn-primary">
              তথ্য হালনাগাদ
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default function ProfileUpdatePage() {
  return (
    <AuthGuard>
      <UpdateContent />
    </AuthGuard>
  );
}