"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { getStats, updateStats, type StatItem } from "@/services"
import { queryKeys } from "@/lib/query-keys"

export function useStats() {
  return useQuery({
    queryKey: queryKeys.stats.all(),
    queryFn: getStats,
  })
}

export function useUpdateStats() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (stats: StatItem[]) => updateStats(stats),
    onSuccess: () => {
      toast.success("Stats updated successfully.")
      queryClient.invalidateQueries({ queryKey: queryKeys.stats.all() })
    },
    onError: (err: Error) => {
      toast.error(err.message ?? "Something went wrong.")
    },
  })
}
