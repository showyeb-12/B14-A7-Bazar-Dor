export interface AuthErrorLike {
  code?: string;
  message?: string;
  status?: number;
}

const KNOWN: Record<string, string> = {
  USER_ALREADY_EXISTS: "এই ইমেইলে ইতিমধ্যে একটি অ্যাকাউন্ট আছে।",
  INVALID_EMAIL: "সঠিক ইমেইল ঠিকানা দিন।",
  EMAIL_NOT_FOUND: "এই ইমেইলে কোনো অ্যাকাউন্ট পাওয়া যায়নি।",
  INVALID_PASSWORD: "পাসওয়ার্ড সঠিক নয়।",
  PASSWORD_TOO_SHORT: "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।",
  PASSWORD_TOO_LONG: "পাসওয়ার্ড অনেক দীর্ঘ।",
  NAME_REQUIRED: "নাম দেওয়া আবশ্যক।",
  SOCIAL_ACCOUNT_ALREADY_LINKED: "সামাজিক অ্যাকাউন্টটি ইতিমধ্যে যুক্ত।",
};

export function authErrorMessage(error: AuthErrorLike | null): string {
  if (!error) return "একটি অজানা সমস্যা হয়েছে। আবার চেষ্টা করুন।";
  if (error.code && KNOWN[error.code]) return KNOWN[error.code];
  if (error.message) return error.message;
  return "একটি অজানা সমস্যা হয়েছে। আবার চেষ্টা করুন।";
}