"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { getAboutPage, updateAboutPage } from "@/services"
import { queryKeys } from "@/lib/query-keys"

export function useAboutPage() {
  return useQuery({
    queryKey: queryKeys.about.page(),
    queryFn: getAboutPage,
  })
}

export function useUpdateAboutPage() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateAboutPage,
    onSuccess: () => {
      toast.success("About page updated successfully.")
      queryClient.invalidateQueries({ queryKey: queryKeys.about.page() })
    },
    onError: (err: Error) => {
      toast.error(err.message ?? "Something went wrong.")
    },
  })
}
