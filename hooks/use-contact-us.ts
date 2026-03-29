"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { getContactUs, updateContactUs, type ContactUsPayload } from "@/services"
import { queryKeys } from "@/lib/query-keys"

export function useContactUs() {
  return useQuery({
    queryKey: queryKeys.contactUs.all(),
    queryFn: getContactUs,
  })
}

export function useUpdateContactUs() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: ContactUsPayload) => updateContactUs(payload),
    onSuccess: () => {
      toast.success("Contact details updated successfully.")
      queryClient.invalidateQueries({ queryKey: queryKeys.contactUs.all() })
    },
    onError: (err: Error) => {
      toast.error(err.message ?? "Something went wrong.")
    },
  })
}
