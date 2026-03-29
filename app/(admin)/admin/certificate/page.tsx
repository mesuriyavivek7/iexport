"use client"

import React, { useState } from "react"
import Image from "next/image"
import { useCertificates, useCreateCertificate, useDeleteCertificate } from "@/hooks"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Loader2, Plus, Trash2 } from "lucide-react"
import type { CertificateItem } from "@/services"

const sk = "animate-pulse bg-gray-300"
const labelClass = "block text-sm font-medium text-foreground"

function CertificatesListSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className={`aspect-[4/3] rounded-xl border border-border bg-card ${sk}`} />
      ))}
    </div>
  )
}

export default function CertificatePage() {
  const { data: certificates = [], isLoading } = useCertificates()
  const createCertificate = useCreateCertificate()
  const deleteCertificate = useDeleteCertificate()

  const [certificateToDelete, setCertificateToDelete] = useState<CertificateItem | null>(null)
  const [newImageFile, setNewImageFile] = useState<File | null>(null)
  const [newImagePreview, setNewImagePreview] = useState<string | null>(null)

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newImageFile) return
    const formData = new FormData()
    formData.append("image", newImageFile)
    createCertificate.mutate(formData, {
      onSuccess: () => {
        setNewImageFile(null)
        setNewImagePreview(null)
      },
    })
  }

  const handleDeleteConfirm = () => {
    if (!certificateToDelete) return
    deleteCertificate.mutate(certificateToDelete._id, {
      onSuccess: () => setCertificateToDelete(null),
    })
  }

  const onNewImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) { setNewImageFile(file); setNewImagePreview(URL.createObjectURL(file)) }
  }

  return (
    <div className="space-y-6">
      <AlertDialog
        open={!!certificateToDelete}
        onOpenChange={(open) => !open && setCertificateToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete certificate?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this certificate? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => { e.preventDefault(); handleDeleteConfirm() }}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={deleteCertificate.isPending}
            >
              {deleteCertificate.isPending ? <Loader2 className="size-4 animate-spin" /> : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div>
        <h2 className="text-xl font-semibold text-foreground">Certificate</h2>
        <p className="mt-1 text-sm text-muted-foreground">Add and manage certificate images.</p>
      </div>

      <form onSubmit={handleCreate} className="rounded-lg border border-border bg-card p-4 shadow-sm">
        <h3 className="mb-4 text-sm font-semibold text-foreground">Add new certificate</h3>
        <div className="space-y-2">
          <label className={labelClass}>Image</label>
          <div className="flex flex-wrap items-center gap-3">
            {newImagePreview && (
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-border bg-muted">
                <Image src={newImagePreview} alt="Preview" fill className="object-cover" unoptimized={newImagePreview.startsWith("blob:")} />
              </div>
            )}
            <div className="flex min-w-0 flex-wrap items-center gap-2">
              <input id="new-certificate-image" type="file" accept="image/*" onChange={onNewImageChange} className="hidden" />
              <label htmlFor="new-certificate-image" className="cursor-pointer rounded-md border-0 bg-[var(--color-primary-purple)] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[var(--color-primary-purple-hover)]">
                Choose file
              </label>
              {newImageFile && <span className="truncate text-sm text-muted-foreground">{newImageFile.name}</span>}
            </div>
            <Button type="submit" disabled={createCertificate.isPending || !newImageFile} className="gap-2 bg-[var(--color-primary-purple)] hover:bg-[var(--color-primary-purple-hover)]">
              {createCertificate.isPending ? <Loader2 className="size-4 animate-spin" /> : <><Plus className="size-4" />Add certificate</>}
            </Button>
          </div>
        </div>
      </form>

      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-foreground">All certificates</h3>
        {isLoading ? (
          <CertificatesListSkeleton />
        ) : certificates.length === 0 ? (
          <p className="rounded-lg border border-dashed border-border bg-muted/30 py-8 text-center text-sm text-muted-foreground">
            No certificates yet. Add one above.
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {certificates.map((cert) => (
              <div key={cert._id} className="relative overflow-hidden rounded-xl border border-border bg-card shadow-sm">
                <div className="relative aspect-[4/3] w-full bg-muted">
                  {cert.image ? (
                    <Image src={cert.image} alt="Certificate" fill className="object-contain" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" unoptimized={cert.image.includes("localhost")} />
                  ) : (
                    <div className="flex h-full items-center justify-center text-muted-foreground">No image</div>
                  )}
                </div>
                <div className="absolute right-2 top-2">
                  <Button type="button" variant="destructive" size="icon" onClick={() => setCertificateToDelete(cert)} disabled={deleteCertificate.isPending && certificateToDelete?._id === cert._id} aria-label="Delete certificate">
                    {deleteCertificate.isPending && certificateToDelete?._id === cert._id ? <Loader2 className="size-4 animate-spin" /> : <Trash2 className="size-4" />}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
