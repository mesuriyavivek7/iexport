"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

export interface MonthlyViewsChartProps {
  data?: { month: string; views: number }[]
}

const defaultData = MONTHS.map((month, i) => ({
  month,
  views: [42, 58, 45, 72, 65, 88, 92, 78, 85, 95, 102, 98][i] ?? 50,
}))

export function MonthlyViewsChart({ data = defaultData }: MonthlyViewsChartProps) {
  return (
    <div className="h-70 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12 }}
            axisLine={{ stroke: "var(--border)" }}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => String(v)}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius)",
            }}
            formatter={(value) => [value ?? 0, "Views"]}
            labelFormatter={(label) => `Month: ${label}`}
          />
          <Line
            type="monotone"
            dataKey="views"
            stroke="var(--color-primary-purple)"
            strokeWidth={2}
            dot={{ fill: "var(--color-primary-purple)", r: 3 }}
            activeDot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
