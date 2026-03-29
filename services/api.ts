/**
 * Server-side fetch helper for NextAuth and other server-only code.
 * Browser / admin CMS use lib/http-client.ts with NEXT_PUBLIC_BACKEND_URL.
 */
const getBaseUrl = () =>
  process.env.BACKEND_URL ?? process.env.NEXT_PUBLIC_BACKEND_URL ?? "https://api.procureexport.com"

export function apiUrl(path: string): string {
  const base = getBaseUrl().replace(/\/$/, "")
  return `${base}${path.startsWith("/") ? path : `/${path}`}`
}

export async function apiFetch<T = unknown>(
  path: string,
  options: RequestInit = {}
): Promise<{ data: T; ok: boolean; status: number }> {
  const url = apiUrl(path)
  const res = await fetch(url, {
    ...options,
    headers: { "Content-Type": "application/json", ...options.headers },
  })
  const data = (await res.json().catch(() => ({}))) as T
  return { data, ok: res.ok, status: res.status }
}
