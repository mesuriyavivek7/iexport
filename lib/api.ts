/**
 * Production-ready API fetch utility for CMS-driven server components.
 * Uses Next.js fetch cache and on-demand revalidation.
 *
 * - Server-only: use BACKEND_URL (not NEXT_PUBLIC_) so the API URL is not exposed.
 * - Default revalidate: 1h; when CMS updates, backend should call POST /api/revalidate so users see changes immediately.
 */

export type FetchCacheOptions = {
  /** Revalidate after N seconds. Default 3600 (1h). Use false to opt out of cache. */
  revalidate?: number | false
  /** Cache tags for granular revalidation via revalidateTag(tag). */
  tags?: readonly string[]
}

function getBaseUrl(): string {
  const url =
    process.env.BACKEND_URL ??
    process.env.NEXT_PUBLIC_BACKEND_URL ??
    "http://localhost:5020"
  return url.replace(/\/$/, "")
}

/**
 * Fetch JSON from the backend API with Next.js caching.
 * Use in Server Components only.
 */
export async function fetchFromBackend<T = unknown>(
  path: string,
  options: FetchCacheOptions = {}
): Promise<T> {
  const { revalidate = 3600, tags } = options
  const url = `${getBaseUrl()}${path.startsWith("/") ? path : `/${path}`}`

  const next =
    revalidate === false
      ? { revalidate: false as const }
      : { revalidate, ...(tags?.length ? { tags: [...tags] } : {}) }

  const res = await fetch(url, {
    next,
    headers: { "Content-Type": "application/json" },
  })

  if (!res.ok) {
    throw new Error(
      `Backend API error: ${res.status} ${res.statusText} (${path})`
    )
  }

  return res.json() as Promise<T>
}

/**
 * Fetch and return the .data field from a standard API response { success, data }.
 * Returns null on missing data or non-OK response (use when you want fallbacks).
 */
export async function fetchApiData<T>(
  path: string,
  options: FetchCacheOptions = {}
): Promise<T | null> {
  try {
    const json = (await fetchFromBackend(
      path,
      options
    )) as { success?: boolean; data?: T }
    return json?.data ?? null
  } catch {
    return null
  }
}

/**
 * Generic page data fetcher (e.g. for a future /api/pages/:slug endpoint).
 * Example: const data = await getPageData('home')
 */
export async function getPageData<T = { title?: string; description?: string }>(
  slug: string,
  options: FetchCacheOptions = {}
): Promise<T | null> {
  return fetchApiData<T>(`/api/pages/${slug}`, options)
}

export { getBaseUrl }
