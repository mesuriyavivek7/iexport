"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { getAboutHome, updateAboutHome } from "@/services"
import { queryKeys } from "@/lib/query-keys"

export function useAboutHome() {
  return useQuery({
    queryKey: queryKeys.about.home(),
    queryFn: getAboutHome,
  })
}

export function useUpdateAboutHome() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateAboutHome,
    onSuccess: () => {
      toast.success("About section updated successfully.")
      queryClient.invalidateQueries({ queryKey: queryKeys.about.home() })
    },
    onError: (err: Error) => {
      toast.error(err.message ?? "Something went wrong.")
    },
  })
}
