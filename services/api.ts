/**
 * Base API client for backend requests.
 * Set BACKEND_URL in .env (e.g. http://localhost:5020).
 */
const getBaseUrl = () =>
  process.env.BACKEND_URL || "http://localhost:5020"

export function apiUrl(path: string): string {
  const base = getBaseUrl().replace(/\/$/, "")
  const normalizedPath = path.startsWith("/") ? path : `/${path}`
  return `${base}${normalizedPath}`
}

export async function apiFetch<T = unknown>(
  path: string,
  options: RequestInit = {}
): Promise<{ data: T; ok: boolean; status: number }> {
  const url = apiUrl(path)
  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  })
  const data = (await res.json().catch(() => ({}))) as T
  return { data, ok: res.ok, status: res.status }
}
