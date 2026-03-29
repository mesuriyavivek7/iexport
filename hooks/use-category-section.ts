"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { getCategorySection, updateCategorySection, type CategorySectionData } from "@/services"
import { queryKeys } from "@/lib/query-keys"

export function useCategorySection() {
  return useQuery({
    queryKey: queryKeys.categorySection.all(),
    queryFn: getCategorySection,
  })
}

export function useUpdateCategorySection() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: CategorySectionData) => updateCategorySection(payload),
    onSuccess: () => {
      toast.success("Category section updated successfully.")
      queryClient.invalidateQueries({ queryKey: queryKeys.categorySection.all() })
    },
    onError: (err: Error) => {
      toast.error(err.message ?? "Something went wrong.")
    },
  })
}
