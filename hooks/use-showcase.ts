"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { getShowcase, updateShowcase } from "@/services"
import { queryKeys } from "@/lib/query-keys"

export function useShowcase() {
  return useQuery({
    queryKey: queryKeys.showcase.all(),
    queryFn: getShowcase,
  })
}

export function useUpdateShowcase() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateShowcase,
    onSuccess: () => {
      toast.success("Showcase updated successfully.")
      queryClient.invalidateQueries({ queryKey: queryKeys.showcase.all() })
    },
    onError: (err: Error) => {
      toast.error(err.message ?? "Something went wrong.")
    },
  })
}
