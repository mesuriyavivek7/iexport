"use client"

import React, { useState } from "react"
import Image from "next/image"
import {
  useCategories,
  useCreateCategory,
  useUpdateCategory,
  useDeleteCategory,
} from "@/hooks"
import type { CategoryItem } from "@/services"
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
import { Loader2, Plus, Pencil, Trash2, X } from "lucide-react"

const sk = "animate-pulse bg-gray-300"
const inputClass =
  "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-[var(--color-primary-purple)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary-purple)]"
const labelClass = "block text-sm font-medium text-foreground"

function CategoriesListSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className={`rounded-xl border border-border bg-card p-4 ${sk}`}>
          <div className="aspect-square w-full rounded-lg" />
          <div className="mt-3 h-5 w-24 rounded" />
        </div>
      ))}
    </div>
  )
}

export default function CategoryCategoriesPage() {
  const { data: categories = [], isLoading } = useCategories()
  const createCategory = useCreateCategory()
  const updateCategory = useUpdateCategory()
  const deleteCategory = useDeleteCategory()

  const [categoryToDelete, setCategoryToDelete] = useState<CategoryItem | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editName, setEditName] = useState("")
  const [editImageFile, setEditImageFile] = useState<File | null>(null)
  const [editImagePreview, setEditImagePreview] = useState<string | null>(null)
  const [newName, setNewName] = useState("")
  const [newImageFile, setNewImageFile] = useState<File | null>(null)
  const [newImagePreview, setNewImagePreview] = useState<string | null>(null)

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault()
    const name = newName.trim()
    if (!name || !newImageFile) return
    const formData = new FormData()
    formData.append("name", name)
    formData.append("image", newImageFile)
    createCategory.mutate(formData, {
      onSuccess: () => {
        setNewName("")
        setNewImageFile(null)
        setNewImagePreview(null)
      },
    })
  }

  const startEdit = (cat: CategoryItem) => {
    setEditingId(cat._id)
    setEditName(cat.name)
    setEditImageFile(null)
    setEditImagePreview(cat.image || null)
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditName("")
    setEditImageFile(null)
    setEditImagePreview(null)
  }

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingId || !editName.trim()) return
    const formData = new FormData()
    formData.append("name", editName.trim())
    if (editImageFile) formData.append("image", editImageFile)
    updateCategory.mutate({ id: editingId, formData }, { onSuccess: cancelEdit })
  }

  const handleDeleteConfirm = () => {
    if (!categoryToDelete) return
    deleteCategory.mutate(categoryToDelete._id, {
      onSuccess: () => setCategoryToDelete(null),
    })
  }

  return (
    <div className="space-y-6">
      <AlertDialog
        open={!!categoryToDelete}
        onOpenChange={(open) => !open && setCategoryToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete category?</AlertDialogTitle>
            <AlertDialogDescription>
              By deleting this category, all products inside this category will also be deleted. Are you sure you want to delete this category?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => { e.preventDefault(); handleDeleteConfirm() }}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={deleteCategory.isPending}
            >
              {deleteCategory.isPending ? <Loader2 className="size-4 animate-spin" /> : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div>
        <h2 className="text-xl font-semibold text-foreground">Category – Categories</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Add, edit, and delete categories. Each category has a name and an image.
        </p>
      </div>

      <form onSubmit={handleCreate} className="rounded-lg border border-border bg-card p-4 shadow-sm">
        <h3 className="mb-4 text-sm font-semibold text-foreground">Add new category</h3>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:gap-6">
          <div className="flex-1 space-y-2">
            <label htmlFor="new-name" className={labelClass}>Name</label>
            <input id="new-name" type="text" value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="e.g. Peanut" className={inputClass} />
          </div>
          <div className="flex-1 space-y-2">
            <label className={labelClass}>Image</label>
            <div className="flex flex-wrap items-center gap-3">
              {newImagePreview && (
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-border bg-muted">
                  <Image src={newImagePreview} alt="Preview" fill className="object-cover" unoptimized={newImagePreview.startsWith("blob:")} />
                </div>
              )}
              <input type="file" accept="image/*" onChange={(e) => { const f = e.target.files?.[0]; if (f) { setNewImageFile(f); setNewImagePreview(URL.createObjectURL(f)) } }} className="block w-full max-w-xs text-sm text-foreground file:mr-3 file:rounded-md file:border-0 file:bg-[var(--color-primary-purple)] file:px-4 file:py-2 file:text-sm file:font-medium file:text-white file:hover:bg-[var(--color-primary-purple-hover)]" />
            </div>
          </div>
          <Button type="submit" disabled={createCategory.isPending || !newName.trim() || !newImageFile} className="gap-2 bg-[var(--color-primary-purple)] hover:bg-[var(--color-primary-purple-hover)]">
            {createCategory.isPending ? <Loader2 className="size-4 animate-spin" /> : <><Plus className="size-4" />Add category</>}
          </Button>
        </div>
      </form>

      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-foreground">All categories</h3>
        {isLoading ? (
          <CategoriesListSkeleton />
        ) : categories.length === 0 ? (
          <p className="rounded-lg border border-dashed border-border bg-muted/30 py-8 text-center text-sm text-muted-foreground">
            No categories yet. Add one above.
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat) => (
              <div key={cat._id} className="rounded-xl border border-border bg-card p-4 shadow-sm">
                {editingId === cat._id ? (
                  <form onSubmit={handleUpdate} className="space-y-4">
                    <div className="space-y-2">
                      <label className={labelClass}>Name</label>
                      <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} className={inputClass} placeholder="Category name" />
                    </div>
                    <div className="space-y-2">
                      <label className={labelClass}>Image (optional, leave empty to keep current)</label>
                      <div className="flex items-center gap-3">
                        {editImagePreview && (
                          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-border bg-muted">
                            <Image src={editImagePreview} alt="Preview" fill className="object-cover" sizes="64px" unoptimized={editImagePreview.startsWith("blob:") || editImagePreview.includes("localhost")} />
                          </div>
                        )}
                        <input type="file" accept="image/*" onChange={(e) => { const f = e.target.files?.[0]; if (f) { setEditImageFile(f); setEditImagePreview(URL.createObjectURL(f)) } }} className="block text-sm text-foreground file:mr-2 file:rounded file:border-0 file:bg-[var(--color-primary-purple)] file:px-3 file:py-1.5 file:text-xs file:text-white" />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button type="submit" disabled={updateCategory.isPending} size="sm" className="gap-1 bg-[var(--color-primary-purple)] hover:bg-[var(--color-primary-purple-hover)]">
                        {updateCategory.isPending ? <Loader2 className="size-4 animate-spin" /> : "Save"}
                      </Button>
                      <Button type="button" variant="outline" size="sm" onClick={cancelEdit}>
                        <X className="size-4" />Cancel
                      </Button>
                    </div>
                  </form>
                ) : (
                  <>
                    <div className="relative aspect-square w-full overflow-hidden rounded-lg border border-border bg-muted">
                      {cat.image ? (
                        <Image src={cat.image} alt={cat.name} fill className="object-cover" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" unoptimized={cat.image.includes("localhost")} />
                      ) : (
                        <div className="flex h-full items-center justify-center text-muted-foreground">No image</div>
                      )}
                    </div>
                    <div className="mt-3 flex items-center justify-between gap-2">
                      <div>
                        <p className="font-medium text-foreground">{cat.name}</p>
                        {cat.productCount != null && (
                          <p className="text-xs text-muted-foreground">{cat.productCount} product{cat.productCount !== 1 ? "s" : ""}</p>
                        )}
                      </div>
                      <div className="flex gap-1">
                        <Button type="button" variant="outline" size="icon" onClick={() => startEdit(cat)} aria-label="Edit category">
                          <Pencil className="size-4" />
                        </Button>
                        <Button type="button" variant="outline" size="icon" onClick={() => setCategoryToDelete(cat)} aria-label="Delete category" className="text-destructive hover:bg-destructive/10 hover:text-destructive">
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
