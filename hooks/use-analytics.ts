"use client"

import { useQuery } from "@tanstack/react-query"
import { getAnalyticsDashboard } from "@/services"
import { queryKeys } from "@/lib/query-keys"

export function useAnalyticsDashboard() {
  return useQuery({
    queryKey: queryKeys.analytics.dashboard(),
    queryFn: getAnalyticsDashboard,
  })
}
