import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";
import Database from "better-sqlite3";

const globalForMongo = globalThis as unknown as {
  mongoClient?: MongoClient;
};

function getMongoClient(uri: string) {
  if (!globalForMongo.mongoClient) {
    globalForMongo.mongoClient = new MongoClient(uri);
  }
  return globalForMongo.mongoClient;
}

function resolveDatabase() {
  const uri = process.env.MONGODB_URI;
  if (uri) {
    const db = getMongoClient(uri).db(process.env.MONGODB_DB ?? "bazardor");
    return mongodbAdapter(db);
  }
  return new Database(process.env.DATABASE_URL ?? "./bazardor.db");
}

export const auth = betterAuth({
  secret:
    process.env.BETTER_AUTH_SECRET ??
    "dev-only-secret-change-this-in-production",
  database: resolveDatabase(),
  trustedOrigins: [
    "http://localhost:3000",
    "http://localhost:3111",
    "https://bazardor-ruddy.vercel.app",
    "https://*.vercel.app",
  ],
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
