"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { authErrorMessage } from "@/lib/auth-errors";
import AuthShell from "@/components/auth/AuthShell";
import SocialButtons from "@/components/auth/SocialButtons";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim() || !password) {
      toast.error("ইমেইল ও পাসওয়ার্ড দিন।");
      return;
    }

    setPending(true);
    const { error } = await authClient.signIn.email({
      email: email.trim(),
      password,
    });
    setPending(false);

    if (error) {
      toast.error(authErrorMessage(error));
      return;
    }

    toast.success("সফলভাবে সাইন ইন করেছেন! 🎉");
    router.push("/");
  }

  return (
    <AuthShell
      title="সাইন ইন"
      subtitle="আপনার অ্যাকাউন্টে প্রবেশ করুন"
    >
      <form onSubmit={onSubmit} className="grid gap-4">
        <label className="text-sm font-medium">
          <span>ইমেইল</span>
          <input
            type="email"
            autoComplete="email"
            required
            placeholder="name@example.com"
            className="input input-bordered mt-1 w-full"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>

        <label className="text-sm font-medium">
          <span>পাসওয়ার্ড</span>
          <input
            type="password"
            autoComplete="current-password"
            required
            minLength={6}
            placeholder="••••••••"
            className="input input-bordered mt-1 w-full"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>

        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={pending}
        >
          {pending && <span className="loading loading-spinner loading-sm" />}
          লগইন করুন
        </button>
      </form>

      <div className="divider my-2 text-xs text-base-content/50">
        অথবা সামাজিক অ্যাকাউন্ট দিয়ে
      </div>

      <SocialButtons />

      <p className="mt-2 text-center text-sm text-base-content/70">
        নতুন ব্যবহারকারী?{" "}
        <Link href="/signup" className="link link-primary font-semibold">
          নিবন্ধন করুন
        </Link>
      </p>
    </AuthShell>
  );
}