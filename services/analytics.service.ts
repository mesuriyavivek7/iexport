import { httpClient } from "@/lib/http-client"

export interface MonthlyViewsItem {
  month: string
  views: number
}

export interface CountryViewsItem {
  country: string
  views: number
}

export interface AnalyticsDashboardData {
  totalViews: number
  monthlyViews: MonthlyViewsItem[]
  countryViews: CountryViewsItem[]
  totalProducts: number
  totalCategories: number
  totalLeads: number
}

interface AnalyticsDashboardResponse {
  message?: string
  success: boolean
  data?: AnalyticsDashboardData
}

export async function getAnalyticsDashboard(): Promise<AnalyticsDashboardData | null> {
  const { data, ok } = await httpClient<AnalyticsDashboardResponse>(
    "/api/analytics/dashboard"
  )
  if (!ok || !data?.success || !data?.data) return null
  return data.data
}
