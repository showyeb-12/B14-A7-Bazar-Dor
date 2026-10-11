import type { Category, PriceSummary, Product } from "./types";

const PRIMARY =
  process.env.NEXT_PUBLIC_API_URL ??
  "https://openapi.programming-hero.com/api/bazardor";
const ALT =
  process.env.NEXT_PUBLIC_API_URL_ALT ??
  "https://api.api-store.workers.dev/api/bazardor";

const BASES = Array.from(new Set([PRIMARY, ALT].filter(Boolean)));

export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function fetchJson<T>(path: string, signal?: AbortSignal): Promise<T> {
  let lastError: unknown;

  for (const base of BASES) {
    try {
      const res = await fetch(`${base}${path}`, {
        signal,
        cache: "no-store",
        headers: { Accept: "application/json" },
      });
      if (res.status === 404) {
        throw new ApiError("Not found", 404);
      }
      if (!res.ok) {
        throw new ApiError(`Request failed (${res.status})`, res.status);
      }
      return (await res.json()) as T;
    } catch (error) {
      if (error instanceof ApiError && error.status === 404) throw error;
      if (signal?.aborted) throw error;
      lastError = error;
    }
  }

  throw lastError instanceof Error
    ? lastError
    : new ApiError("Unable to reach the market data service");
}

export function getProducts(signal?: AbortSignal) {
  return fetchJson<Product[]>("/products", signal);
}

export function getProductsByCategory(slug: string, signal?: AbortSignal) {
  return fetchJson<Product[]>(
    `/products?category=${encodeURIComponent(slug)}`,
    signal,
  );
}

export function getCategories(signal?: AbortSignal) {
  return fetchJson<Category[]>("/categories", signal);
}

export async function getProductBySlug(
  slug: string,
  signal?: AbortSignal,
): Promise<Product | null> {
  const products = await getProducts(signal);
  return products.find((product) => product.slug === slug) ?? null;
}

export async function getCategoryBySlug(
  slug: string,
  signal?: AbortSignal,
): Promise<Category | null> {
  const categories = await getCategories(signal);
  return categories.find((category) => category.slug === slug) ?? null;
}

export function summarizePrices(product: Product): PriceSummary {
  if (!product.markets.length) {
    return { min: product.today, max: product.today, avg: product.today };
  }
  const mins = product.markets.map((m) => m.min);
  const maxes = product.markets.map((m) => m.max);
  const min = Math.min(...mins);
  const max = Math.max(...maxes);
  const avg = Math.round(
    product.markets.reduce((sum, m) => sum + (m.min + m.max) / 2, 0) /
      product.markets.length,
  );
  return { min, max, avg };
}
