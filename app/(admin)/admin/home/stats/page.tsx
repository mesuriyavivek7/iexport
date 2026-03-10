"use client"

import React, { useEffect, useState } from "react"
import { toast } from "sonner"
import { getStats, updateStats, type StatItem } from "@/services"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

const sk = "animate-pulse bg-gray-300"

function StatsSkeleton() {
  return (
    <div className="space-y-6">
      <div className={`h-8 w-48 rounded-md ${sk}`} />
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className={`flex gap-4 rounded-lg border border-border bg-card p-4`}>
            <div className={`h-10 w-24 rounded-lg ${sk}`} />
            <div className={`h-10 flex-1 rounded-lg ${sk}`} />
          </div>
        ))}
      </div>
      <div className={`h-10 w-32 rounded-lg ${sk}`} />
    </div>
  )
}

const defaultStats: StatItem[] = [
  { count: "4+", title: "Years of Experience" },
  { count: "85+", title: "Consignment Done" },
  { count: "120+", title: "Happy Buyers" },
]

const inputClass =
  "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-[var(--color-primary-purple)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary-purple)]"

export default function HomeStatsPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [stats, setStats] = useState<StatItem[]>([])

  useEffect(() => {
    let cancelled = false
    async function load() {
      setLoading(true)
      const data = await getStats()
      if (cancelled) return
      setLoading(false)
      const raw = Array.isArray(data) && data.length > 0 ? data : defaultStats
      setStats([...raw, ...defaultStats].slice(0, 3))
    }
    load()
    return () => {
      cancelled = true
    }
  }, [])

  const updateStat = (index: number, field: "count" | "title", value: string) =>
    setStats((prev) => {
      const next = [...prev]
      next[index] = { ...next[index], [field]: value }
      return next
    })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const result = await updateStats(stats)
      if (result.success) {
        toast.success("Stats updated successfully.")
        const updated = await getStats()
        const next = [...(updated ?? []), ...defaultStats].slice(0, 3)
        setStats(next)
      } else {
        toast.error(result.error ?? "Update failed.")
      }
    } catch {
      toast.error("Something went wrong.")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Home – Stats</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage the stats section (e.g. Years of Experience, Consignment Done, Happy Buyers).
          </p>
        </div>
        <StatsSkeleton />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground">Home – Stats</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage the stats section (e.g. Years of Experience, Consignment Done, Happy Buyers).
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <label className="block text-sm font-medium text-foreground">Stats (3 items)</label>

        <div className="space-y-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col gap-3 rounded-lg border border-border bg-card p-4 sm:flex-row sm:items-center sm:gap-4"
            >
              <div className="flex-1 space-y-2 sm:flex sm:flex-1 sm:flex-row sm:gap-4 sm:space-y-0">
                <div className="min-w-0 flex-1">
                  <label className="mb-1 block text-xs font-medium text-muted-foreground">
                    Count
                  </label>
                  <input
                    type="text"
                    value={stat.count}
                    onChange={(e) => updateStat(index, "count", e.target.value)}
                    placeholder="4+"
                    className={inputClass}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <label className="mb-1 block text-xs font-medium text-muted-foreground">
                    Title
                  </label>
                  <input
                    type="text"
                    value={stat.title}
                    onChange={(e) => updateStat(index, "title", e.target.value)}
                    placeholder="Years of Experience"
                    className={inputClass}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs text-muted-foreground">
          These appear on the homepage stats section. Use a short count (e.g. 4+, 85+) and a clear title.
        </p>

        <div className="flex flex-wrap gap-3 border-t border-border pt-6">
          <Button
            type="submit"
            disabled={saving}
            className="gap-2 bg-[var(--color-primary-purple)] hover:bg-[var(--color-primary-purple-hover)]"
          >
            {saving ? (
              <>
                <Loader2 className="size-4 shrink-0 animate-spin" />
                <span>Saving…</span>
              </>
            ) : (
              "Save changes"
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
