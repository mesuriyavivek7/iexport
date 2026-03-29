"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { getCertificates, createCertificate, deleteCertificate } from "@/services"
import { queryKeys } from "@/lib/query-keys"

export function useCertificates() {
  return useQuery({
    queryKey: queryKeys.certificates.list(),
    queryFn: getCertificates,
  })
}

export function useCreateCertificate() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (formData: FormData) => createCertificate(formData),
    onSuccess: () => {
      toast.success("Certificate added successfully.")
      queryClient.invalidateQueries({ queryKey: queryKeys.certificates.all() })
    },
    onError: (err: Error) => {
      toast.error(err.message ?? "Failed to add certificate.")
    },
  })
}

export function useDeleteCertificate() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteCertificate(id),
    onSuccess: () => {
      toast.success("Certificate deleted.")
      queryClient.invalidateQueries({ queryKey: queryKeys.certificates.all() })
    },
    onError: (err: Error) => {
      toast.error(err.message ?? "Failed to delete certificate.")
    },
  })
}
