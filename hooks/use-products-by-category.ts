"use client"

import { useQuery } from "@tanstack/react-query"
import { getProductsByCategory } from "@/services"
import { queryKeys } from "@/lib/query-keys"

export function useProductsByCategory(categoryId: string) {
  return useQuery({
    queryKey: queryKeys.products.byCategory(categoryId),
    queryFn: () => getProductsByCategory(categoryId),
    enabled: Boolean(categoryId),
  })
}
