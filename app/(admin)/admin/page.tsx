import React from "react"
import { Eye, Package, FolderTree, Users } from "lucide-react"
import { MonthlyViewsChart } from "@/components/cms/monthly-views-chart"
import { CountryViewsList } from "@/components/cms/country-views-list"
import { cn } from "@/lib/utils"

const stats = [
  {
    label: "Total Views",
    value: "12.5K",
    change: "+4.2%",
    trend: "up" as const,
    icon: Eye,
    iconBg: "bg-emerald-500/15",
    iconColor: "text-emerald-600",
  },
  {
    label: "Total Products",
    value: "48",
    change: "+2",
    trend: "up" as const,
    icon: Package,
    iconBg: "bg-[var(--color-primary-purple)]/15",
    iconColor: "text-[var(--color-primary-purple)]",
  },
  {
    label: "Total Categories",
    value: "6",
    change: "0%",
    trend: "neutral" as const,
    icon: FolderTree,
    iconBg: "bg-amber-500/15",
    iconColor: "text-amber-600",
  },
  {
    label: "Total Leads",
    value: "156",
    change: "-1.2%",
    trend: "down" as const,
    icon: Users,
    iconBg: "bg-blue-500/15",
    iconColor: "text-blue-600",
  },
]

export default function AdminPage() {
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
        {stats.map((item) => {
          const Icon = item.icon
          return (
            <div
              key={item.label}
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
                <span
                  className={cn(
                    "text-xs font-medium tabular-nums",
                    item.trend === "up" && "text-emerald-600",
                    item.trend === "down" && "text-red-600",
                    item.trend === "neutral" && "text-muted-foreground"
                  )}
                >
                  {item.change}
                  {item.trend === "up" && " ↑"}
                  {item.trend === "down" && " ↓"}
                </span>
              </div>
              <p className="mt-3 text-2xl font-bold text-foreground">{item.value}</p>
              <p className="mt-0.5 text-sm text-muted-foreground">{item.label}</p>
            </div>
          )
        })}
      </div>

      {/* Chart + Country views */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground">Website views (monthly)</h3>
            <span className="text-xs text-muted-foreground">Monthly</span>
          </div>
          <div className="mt-4">
            <MonthlyViewsChart />
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <h3 className="font-semibold text-foreground">Views by country</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Most traffic by country
          </p>
          <div className="mt-5">
            <CountryViewsList />
          </div>
        </div>
      </div>
    </div>
  )
}
