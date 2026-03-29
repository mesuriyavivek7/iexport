"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "@/services"
import { queryKeys } from "@/lib/query-keys"

export function useCategories() {
  return useQuery({
    queryKey: queryKeys.categories.list(),
    queryFn: getCategories,
  })
}

export function useCreateCategory() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (formData: FormData) => createCategory(formData),
    onSuccess: () => {
      toast.success("Category created successfully.")
      queryClient.invalidateQueries({ queryKey: queryKeys.categories.all() })
    },
    onError: (err: Error) => {
      toast.error(err.message ?? "Failed to create category.")
    },
  })
}

export function useUpdateCategory() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: FormData }) =>
      updateCategory(id, formData),
    onSuccess: () => {
      toast.success("Category updated successfully.")
      queryClient.invalidateQueries({ queryKey: queryKeys.categories.all() })
    },
    onError: (err: Error) => {
      toast.error(err.message ?? "Failed to update category.")
    },
  })
}

export function useDeleteCategory() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteCategory(id),
    onSuccess: () => {
      toast.success("Category deleted.")
      queryClient.invalidateQueries({ queryKey: queryKeys.categories.all() })
    },
    onError: (err: Error) => {
      toast.error(err.message ?? "Failed to delete category.")
    },
  })
}
