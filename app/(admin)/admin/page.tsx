import React from "react"
import { Eye, Package, FolderTree, Users } from "lucide-react"
import { MonthlyViewsChart } from "@/components/cms/monthly-views-chart"
import { CountryViewsList } from "@/components/cms/country-views-list"
import { getAnalyticsDashboard } from "@/services"
import { cn } from "@/lib/utils"

const STAT_CARD_CONFIG = [
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

export default async function AdminPage() {
  const analytics = await getAnalyticsDashboard()

  const totalViews = analytics?.totalViews ?? 0
  const totalProducts = analytics?.totalProducts ?? 0
  const totalCategories = analytics?.totalCategories ?? 0
  const totalLeads = analytics?.totalLeads ?? 0

  const statValues = {
    views: totalViews.toLocaleString(),
    products: String(totalProducts),
    categories: String(totalCategories),
    leads: String(totalLeads),
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground">Dashboard</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Overview of your website and content.
        </p>
      </div>

      {/* 4 stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STAT_CARD_CONFIG.map((item) => {
          const Icon = item.icon
          return (
            <div
              key={item.key}
              className="rounded-xl border border-border bg-card p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div
                  className={cn(
                    "flex size-10 shrink-0 items-center justify-center rounded-lg",
                    item.iconBg,
                    item.iconColor
                  )}
                >
                  <Icon className="size-5" />
                </div>
              </div>
              <p className="mt-3 text-2xl font-bold text-foreground tabular-nums">
                {statValues[item.key]}
              </p>
              <p className="mt-0.5 text-sm text-muted-foreground">{item.label}</p>
            </div>
          )
        })}
      </div>

      {/* Chart + Country views */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground">
              Website views (monthly)
            </h3>
            <span className="text-xs text-muted-foreground">Monthly</span>
          </div>
          <div className="mt-4">
            <MonthlyViewsChart
              data={
                analytics?.monthlyViews?.length
                  ? analytics.monthlyViews
                  : undefined
              }
            />
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <h3 className="font-semibold text-foreground">Views by country</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Most traffic by country
          </p>
          <div className="mt-5">
            <CountryViewsList
              data={
                analytics?.countryViews?.length
                  ? analytics.countryViews
                  : undefined
              }
            />
          </div>
        </div>
      </div>
    </div>
  )
}
