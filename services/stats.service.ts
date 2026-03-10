export interface StatItem {
  count: string
  title: string
}

export interface StatsData {
  stats: StatItem[]
}

export interface StatsResponse {
  success: boolean
  data?: StatsData
  stats?: StatItem[]
}

/** GET stats (call from client: fetch /api/stats) */
export async function getStats(): Promise<StatItem[] | null> {
  const res = await fetch("/api/stats", { cache: "no-store" })
  if (!res.ok) return null
  const json = (await res.json()) as StatsResponse
  const stats = json?.data?.stats ?? json?.stats
  if (!Array.isArray(stats)) return null
  return stats
}

/** PUT stats (call from client: { stats: StatItem[] }) */
export async function updateStats(
  stats: StatItem[]
): Promise<{ success: boolean; error?: string }> {
  const res = await fetch("/api/stats", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ stats }),
  })
  const data = (await res.json().catch(() => ({}))) as { success?: boolean; message?: string }
  if (!res.ok) {
    return { success: false, error: data?.message ?? "Failed to update stats" }
  }
  return { success: data?.success ?? true }
}
