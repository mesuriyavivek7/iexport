import { httpClient } from "@/lib/http-client"

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

export async function getStats(): Promise<StatItem[] | null> {
  const { data, ok } = await httpClient<StatsResponse>("/api/stats")
  if (!ok) return null
  const stats = data?.data?.stats ?? data?.stats
  return Array.isArray(stats) ? stats : null
}

export async function updateStats(stats: StatItem[]): Promise<void> {
  const { data, ok } = await httpClient<{ success?: boolean; message?: string }>(
    "/api/stats",
    { method: "PUT", body: JSON.stringify({ stats }) }
  )
  if (!ok) throw new Error(data?.message ?? "Failed to update stats")
}
