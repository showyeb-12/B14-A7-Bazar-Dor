"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { authErrorMessage } from "@/lib/auth-errors";
import AuthShell from "@/components/auth/AuthShell";
import SocialButtons from "@/components/auth/SocialButtons";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name.trim() || !email.trim() || !password) {
      toast.error("নাম, ইমেইল ও পাসওয়ার্ড দিন।");
      return;
    }

    setPending(true);
    const { error } = await authClient.signUp.email({
      name: name.trim(),
      email: email.trim(),
      password,
    });
    setPending(false);

    if (error) {
      toast.error(authErrorMessage(error));
      return;
    }

    toast.success("নিবন্ধন সফল হয়েছে! এখন সাইন ইন করুন।");
    router.push("/signin");
  }

  return (
    <AuthShell
      title="নিবন্ধন করুন"
      subtitle="নতুন অ্যাকাউন্ট খুলুন"
    >
      <form onSubmit={onSubmit} className="grid gap-4">
        <label className="text-sm font-medium">
          <span>নাম</span>
          <input
            type="text"
            autoComplete="name"
            required
            placeholder="আপনার নাম"
            className="input input-bordered mt-1 w-full"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>

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
            autoComplete="new-password"
            required
            minLength={6}
            placeholder="কমপক্ষে ৬ অক্ষর"
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
          নিবন্ধন করুন
        </button>
      </form>

      <div className="divider my-2 text-xs text-base-content/50">
        অথবা সামাজিক অ্যাকাউন্ট দিয়ে
      </div>

      <SocialButtons />

      <p className="mt-2 text-center text-sm text-base-content/70">
        ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
        <Link href="/signin" className="link link-primary font-semibold">
          সাইন ইন করুন
        </Link>
      </p>
    </AuthShell>
  );
}