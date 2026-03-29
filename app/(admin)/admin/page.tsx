"use client"

import React from "react"
import { Eye, Package, FolderTree, Users } from "lucide-react"
import { MonthlyViewsChart } from "@/components/cms/monthly-views-chart"
import { CountryViewsList } from "@/components/cms/country-views-list"
import { useAnalyticsDashboard } from "@/hooks"
import { cn } from "@/lib/utils"

const sk = "animate-pulse bg-gray-300"

function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className={`rounded-xl border border-border bg-card p-5 h-28 ${sk}`} />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className={`rounded-xl border border-border bg-card p-5 h-64 lg:col-span-2 ${sk}`} />
        <div className={`rounded-xl border border-border bg-card p-5 h-64 ${sk}`} />
      </div>
    </div>
  )
}

const STAT_CARDS = [
  {
    key: "views" as const,
    label: "Total Views",
    icon: Eye,
    iconBg: "bg-emerald-500/15",
    iconColor: "text-emerald-600",
  },
  {
    key: "products" as const,
    label: "Total Products",
    icon: Package,
    iconBg: "bg-[var(--color-primary-purple)]/15",
    iconColor: "text-[var(--color-primary-purple)]",
  },
  {
    key: "categories" as const,
    label: "Total Categories",
    icon: FolderTree,
    iconBg: "bg-amber-500/15",
    iconColor: "text-amber-600",
  },
  {
    key: "leads" as const,
    label: "Total Leads",
    icon: Users,
    iconBg: "bg-blue-500/15",
    iconColor: "text-blue-600",
  },
] as const

export default function AdminPage() {
  const { data: analytics, isLoading } = useAnalyticsDashboard()

  const statValues: Record<"views" | "products" | "categories" | "leads", string> = {
    views: (analytics?.totalViews ?? 0).toLocaleString(),
    products: String(analytics?.totalProducts ?? 0),
    categories: String(analytics?.totalCategories ?? 0),
    leads: String(analytics?.totalLeads ?? 0),
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground">Dashboard</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Overview of your website and content.
        </p>
      </div>

      {isLoading ? (
        <DashboardSkeleton />
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STAT_CARDS.map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.key}
                  className="rounded-xl border border-border bg-card p-5 shadow-sm"
                >
                  <div
                    className={cn(
                      "flex size-10 shrink-0 items-center justify-center rounded-lg",
                      item.iconBg,
                      item.iconColor
                    )}
                  >
                    <Icon className="size-5" />
                  </div>
                  <p className="mt-3 text-2xl font-bold text-foreground tabular-nums">
                    {statValues[item.key]}
                  </p>
                  <p className="mt-0.5 text-sm text-muted-foreground">{item.label}</p>
                </div>
              )
            })}
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="rounded-xl border border-border bg-card p-5 shadow-sm lg:col-span-2">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-foreground">Website views (monthly)</h3>
                <span className="text-xs text-muted-foreground">Monthly</span>
              </div>
              <div className="mt-4">
                <MonthlyViewsChart
                  data={analytics?.monthlyViews?.length ? analytics.monthlyViews : undefined}
                />
              </div>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
              <h3 className="font-semibold text-foreground">Views by country</h3>
              <p className="mt-1 text-sm text-muted-foreground">Most traffic by country</p>
              <div className="mt-5">
                <CountryViewsList
                  data={analytics?.countryViews?.length ? analytics.countryViews : undefined}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
