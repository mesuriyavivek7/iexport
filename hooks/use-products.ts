"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "@/services"
import { queryKeys } from "@/lib/query-keys"

export function useProducts() {
  return useQuery({
    queryKey: queryKeys.products.list(),
    queryFn: getProducts,
  })
}

export function useCreateProduct() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (formData: FormData) => createProduct(formData),
    onSuccess: () => {
      toast.success("Product created successfully.")
      queryClient.invalidateQueries({ queryKey: queryKeys.products.all() })
    },
    onError: (err: Error) => {
      toast.error(err.message ?? "Failed to create product.")
    },
  })
}

export function useUpdateProduct() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: FormData }) =>
      updateProduct(id, formData),
    onSuccess: () => {
      toast.success("Product updated successfully.")
      queryClient.invalidateQueries({ queryKey: queryKeys.products.all() })
    },
    onError: (err: Error) => {
      toast.error(err.message ?? "Failed to update product.")
    },
  })
}

export function useDeleteProduct() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteProduct(id),
    onSuccess: () => {
      toast.success("Product deleted.")
      queryClient.invalidateQueries({ queryKey: queryKeys.products.all() })
    },
    onError: (err: Error) => {
      toast.error(err.message ?? "Failed to delete product.")
    },
  })
}
