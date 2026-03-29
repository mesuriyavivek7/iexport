"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { getCategoriesPage, updateCategoriesPage } from "@/services"
import { queryKeys } from "@/lib/query-keys"

export function useCategoriesPage() {
  return useQuery({
    queryKey: queryKeys.categoriesPage.all(),
    queryFn: getCategoriesPage,
  })
}

export function useUpdateCategoriesPage() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: { heading: string; subheading: string }) =>
      updateCategoriesPage(payload),
    onSuccess: () => {
      toast.success("Categories page updated successfully.")
      queryClient.invalidateQueries({ queryKey: queryKeys.categoriesPage.all() })
    },
    onError: (err: Error) => {
      toast.error(err.message ?? "Something went wrong.")
    },
  })
}
