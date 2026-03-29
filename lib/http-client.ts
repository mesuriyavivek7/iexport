/**
 * Client-side HTTP client for direct backend calls (browser + TanStack Query).
 * Uses NEXT_PUBLIC_BACKEND_URL. Server-only code uses services/api.ts (BACKEND_URL).
 */

const getBaseUrl = () =>
  process.env.NEXT_PUBLIC_BACKEND_URL ?? "https://api.procureexport.com"

interface HttpResult<T> {
  data: T
  ok: boolean
  status: number
}

export async function httpClient<T = unknown>(
  path: string,
  options: RequestInit = {}
): Promise<HttpResult<T>> {
  const base = getBaseUrl().replace(/\/$/, "")
  const url = `${base}${path.startsWith("/") ? path : `/${path}`}`

  const isFormData = options.body instanceof FormData

  const res = await fetch(url, {
    ...options,
    headers: isFormData
      ? options.headers
      : { "Content-Type": "application/json", ...options.headers },
  })

  const data = (await res.json().catch(() => ({}))) as T
  return { data, ok: res.ok, status: res.status }
}
