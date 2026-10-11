import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import Database from "better-sqlite3";

function getDatabase() {
  const url = process.env.DATABASE_URL ?? "./bazardor.db";
  return new Database(url);
}

export const auth = betterAuth({
  secret:
    process.env.BETTER_AUTH_SECRET ??
    "dev-only-secret-change-this-in-production",
  database: getDatabase(),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
    maxPasswordLength: 128,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID ?? "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
    },
  },
  plugins: [nextCookies()],
});