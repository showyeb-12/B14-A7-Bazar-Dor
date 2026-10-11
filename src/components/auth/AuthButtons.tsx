"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function AuthButtons() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  async function handleSignOut() {
    await authClient.signOut();
    toast.success("সাইন আউট হয়েছে।");
    router.push("/");
    router.refresh();
  }

  if (isPending) {
    return (
      <div className="flex items-center gap-1.5 sm:gap-2">
        <span className="skeleton h-8 w-16 rounded-full" />
        <span className="skeleton h-8 w-16 rounded-full" />
      </div>
    );
  }

  if (!session) {
    return (
      <nav className="flex items-center gap-1.5 sm:gap-2">
        <Link href="/signin" className="btn btn-ghost btn-sm sm:btn-md">
          সাইন ইন
        </Link>
        <Link href="/signup" className="btn btn-primary btn-sm sm:btn-md">
          সাইন আপ
        </Link>
      </nav>
    );
  }

  const firstName = session.user.name?.split(" ")[0] ?? "ব্যবহারকারী";
  const initial = session.user.name?.charAt(0) ?? "ব";

  return (
    <div className="dropdown dropdown-end">
      <button
        tabIndex={0}
        className="btn btn-ghost btn-sm sm:btn-md gap-2 normal-case"
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-content">
          {initial}
        </span>
        <span className="max-w-24 truncate">{firstName}</span>
        <span aria-hidden>▾</span>
      </button>

      <ul
        tabIndex={0}
        className="dropdown-content menu z-50 mt-2 w-56 rounded-2xl border border-base-300 bg-base-100 p-2 shadow-lg"
      >
        <li>
          <span className="truncate text-xs text-base-content/60" aria-disabled>
            {session.user.email}
          </span>
        </li>
        <li>
          <Link href="/profile">আমার প্রোফাইল</Link>
        </li>
        <li>
          <Link href="/profile/update">তথ্য হালনাগাদ</Link>
        </li>
        <li className="border-t border-base-200">
          <button type="button" onClick={handleSignOut}>
            সাইন আউট
          </button>
        </li>
      </ul>
    </div>
  );
}