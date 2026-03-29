"use client"

import { useQuery } from "@tanstack/react-query"
import { getLeads } from "@/services"
import { queryKeys } from "@/lib/query-keys"

export function useLeads() {
  return useQuery({
    queryKey: queryKeys.leads.list(),
    queryFn: getLeads,
  })
}
