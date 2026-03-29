"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { getHero, updateHero } from "@/services"
import { queryKeys } from "@/lib/query-keys"

export function useHero() {
  return useQuery({
    queryKey: queryKeys.hero.all(),
    queryFn: getHero,
  })
}

export function useUpdateHero() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateHero,
    onSuccess: () => {
      toast.success("Hero updated successfully.")
      queryClient.invalidateQueries({ queryKey: queryKeys.hero.all() })
    },
    onError: (err: Error) => {
      toast.error(err.message ?? "Something went wrong.")
    },
  })
}
