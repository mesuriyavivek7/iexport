import { cn } from "@/lib/utils"

export interface CountryView {
  country: string
  views: number
}

const defaultCountries: CountryView[] = [
  { country: "India", views: 12450 },
  { country: "USA", views: 8920 },
  { country: "UK", views: 4520 },
  { country: "UAE", views: 2100 },
  { country: "Others", views: 3890 },
]

export interface CountryViewsListProps {
  data?: CountryView[]
  className?: string
}

export function CountryViewsList({ data = defaultCountries, className }: CountryViewsListProps) {
  const maxViews = Math.max(...data.map((d) => d.views))

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {data.map((item) => {
        const widthPercent = maxViews > 0 ? (item.views / maxViews) * 100 : 0
        return (
          <div key={item.country} className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-foreground">{item.country}</span>
              <span className="text-muted-foreground tabular-nums">{item.views.toLocaleString()} views</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-[var(--color-primary-purple)] transition-all duration-500"
                style={{ width: `${widthPercent}%` }}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}
