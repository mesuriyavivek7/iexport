"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import { toast } from "sonner"
import {
  getProducts,
  getCategories,
  createProduct,
  updateProduct,
  deleteProduct,
  type ProductItem,
  type CategoryItem,
} from "@/services"
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

function ProductsListSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className={`rounded-xl border border-border bg-card p-4 ${sk}`}>
          <div className="aspect-square w-full rounded-lg" />
          <div className="mt-3 h-5 w-32 rounded" />
          <div className="mt-1 h-4 w-20 rounded" />
        </div>
      ))}
    </div>
  )
}

const inputClass =
  "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-[var(--color-primary-purple)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary-purple)]"
const labelClass = "block text-sm font-medium text-foreground"

const DELETE_CONFIRM_MESSAGE = "Are you sure you want to delete this product? This action cannot be undone."

export default function ProductsPage() {
  const [products, setProducts] = useState<ProductItem[]>([])
  const [categories, setCategories] = useState<CategoryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [productToDelete, setProductToDelete] = useState<ProductItem | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editName, setEditName] = useState("")
  const [editCategoryId, setEditCategoryId] = useState("")
  const [editImageFile, setEditImageFile] = useState<File | null>(null)
  const [editImagePreview, setEditImagePreview] = useState<string | null>(null)
  const [newName, setNewName] = useState("")
  const [newCategoryId, setNewCategoryId] = useState("")
  const [newImageFile, setNewImageFile] = useState<File | null>(null)
  const [newImagePreview, setNewImagePreview] = useState<string | null>(null)

  const loadData = async () => {
    setLoading(true)
    const [productsData, categoriesData] = await Promise.all([
      getProducts(),
      getCategories(),
    ])
    setProducts(productsData)
    setCategories(categoriesData)
    setLoading(false)
  }

  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    if (categories.length > 0 && !newCategoryId) setNewCategoryId(categories[0]._id)
  }, [categories, newCategoryId])

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    const name = newName.trim()
    if (!name) {
      toast.error("Please enter a product name.")
      return
    }
    if (!newCategoryId) {
      toast.error("Please select a category.")
      return
    }
    if (!newImageFile) {
      toast.error("Please select an image.")
      return
    }
    setSaving(true)
    try {
      const formData = new FormData()
      formData.append("name", name)
      formData.append("category", newCategoryId)
      formData.append("image", newImageFile)
      const result = await createProduct(formData)
      if (result.success) {
        toast.success("Product created successfully.")
        setNewName("")
        setNewCategoryId(categories[0]?._id ?? "")
        setNewImageFile(null)
        setNewImagePreview(null)
        await loadData()
      } else {
        toast.error(result.error ?? "Failed to create product.")
      }
    } catch {
      toast.error("Something went wrong.")
    } finally {
      setSaving(false)
    }
  }

  const startEdit = (product: ProductItem) => {
    setEditingId(product._id)
    setEditName(product.name)
    setEditCategoryId(product.category?._id ?? "")
    setEditImageFile(null)
    setEditImagePreview(product.image || null)
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditName("")
    setEditCategoryId("")
    setEditImageFile(null)
    setEditImagePreview(null)
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingId) return
    const name = editName.trim()
    if (!name) {
      toast.error("Please enter a product name.")
      return
    }
    if (!editCategoryId) {
      toast.error("Please select a category.")
      return
    }
    setSaving(true)
    try {
      const formData = new FormData()
      formData.append("name", name)
      formData.append("category", editCategoryId)
      if (editImageFile) formData.append("image", editImageFile)
      const result = await updateProduct(editingId, formData)
      if (result.success) {
        toast.success("Product updated successfully.")
        cancelEdit()
        await loadData()
      } else {
        toast.error(result.error ?? "Failed to update product.")
      }
    } catch {
      toast.error("Something went wrong.")
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteClick = (product: ProductItem) => {
    setProductToDelete(product)
  }

  const handleDeleteConfirm = async () => {
    if (!productToDelete) return
    setDeletingId(productToDelete._id)
    try {
      const result = await deleteProduct(productToDelete._id)
      if (result.success) {
        toast.success("Product deleted.")
        setProductToDelete(null)
        await loadData()
      } else {
        toast.error(result.error ?? "Failed to delete product.")
      }
    } catch {
      toast.error("Something went wrong.")
    } finally {
      setDeletingId(null)
    }
  }

  const onNewImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setNewImageFile(file)
      setNewImagePreview(URL.createObjectURL(file))
    }
  }

  const onEditImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setEditImageFile(file)
      setEditImagePreview(URL.createObjectURL(file))
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Products</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Create and manage products under any category.
          </p>
        </div>
        <ProductsListSkeleton />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <AlertDialog
        open={!!productToDelete}
        onOpenChange={(open) => !open && setProductToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete product?</AlertDialogTitle>
            <AlertDialogDescription>{DELETE_CONFIRM_MESSAGE}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault()
                handleDeleteConfirm()
              }}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={!!deletingId}
            >
              {deletingId ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div>
        <h2 className="text-xl font-semibold text-foreground">Products</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Create and manage products under any category.
        </p>
      </div>

      {/* Add new product */}
      <form
        onSubmit={handleCreate}
        className="rounded-lg border border-border bg-card p-4 shadow-sm"
      >
        <h3 className="mb-4 text-sm font-semibold text-foreground">Add new product</h3>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:gap-6">
          <div className="min-w-0 flex-1 space-y-2">
            <label htmlFor="new-name" className={labelClass}>
              Name
            </label>
            <input
              id="new-name"
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="e.g. Roasted Peanuts"
              className={inputClass}
            />
          </div>
          <div className="min-w-0 flex-1 space-y-2">
            <label htmlFor="new-category" className={labelClass}>
              Category
            </label>
            <select
              id="new-category"
              value={newCategoryId}
              onChange={(e) => setNewCategoryId(e.target.value)}
              className={inputClass}
            >
              {categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
              {categories.length === 0 && (
                <option value="">No categories — add one first</option>
              )}
            </select>
          </div>
          <div className="min-w-0 flex-1 space-y-2">
            <label className={labelClass}>Image</label>
            <div className="flex items-center gap-3">
              {newImagePreview && (
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-border bg-muted">
                  <Image
                    src={newImagePreview}
                    alt="Preview"
                    fill
                    className="object-cover"
                    unoptimized={newImagePreview.startsWith("blob:")}
                  />
                </div>
              )}
              <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
                <input
                  id="new-product-image"
                  type="file"
                  accept="image/*"
                  onChange={onNewImageChange}
                  className="hidden"
                />
                <label
                  htmlFor="new-product-image"
                  className="cursor-pointer rounded-md border-0 bg-[var(--color-primary-purple)] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[var(--color-primary-purple-hover)]"
                >
                  Choose file
                </label>
                {newImageFile && (
                  <span className="truncate text-sm text-muted-foreground">
                    {newImageFile.name}
                  </span>
                )}
              </div>
            </div>
          </div>
          <Button
            type="submit"
            disabled={saving || categories.length === 0}
            className="gap-2 bg-[var(--color-primary-purple)] hover:bg-[var(--color-primary-purple-hover)]"
          >
            {saving ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <>
                <Plus className="size-4" />
                Add product
              </>
            )}
          </Button>
        </div>
      </form>

      {/* List products */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-foreground">All products</h3>
        {products.length === 0 ? (
          <p className="rounded-lg border border-dashed border-border bg-muted/30 py-8 text-center text-sm text-muted-foreground">
            No products yet. Add one above.
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <div
                key={product._id}
                className="rounded-xl border border-border bg-card p-4 shadow-sm"
              >
                {editingId === product._id ? (
                  <form onSubmit={handleUpdate} className="space-y-4">
                    <div className="space-y-2">
                      <label className={labelClass}>Name</label>
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className={inputClass}
                        placeholder="Product name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className={labelClass}>Category</label>
                      <select
                        value={editCategoryId}
                        onChange={(e) => setEditCategoryId(e.target.value)}
                        className={inputClass}
                      >
                        {categories.map((c) => (
                          <option key={c._id} value={c._id}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className={labelClass}>Image (optional)</label>
                      <div className="flex items-center gap-2">
                        {editImagePreview && (
                          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-border bg-muted">
                            <Image
                              src={editImagePreview}
                              alt="Preview"
                              fill
                              className="object-cover"
                              sizes="48px"
                              unoptimized={
                                editImagePreview.startsWith("blob:") ||
                                editImagePreview.includes("localhost")
                              }
                            />
                          </div>
                        )}
                        <div className="flex min-w-0 flex-wrap items-center gap-2">
                          <input
                            id={`edit-product-image-${product._id}`}
                            type="file"
                            accept="image/*"
                            onChange={onEditImageChange}
                            className="hidden"
                          />
                          <label
                            htmlFor={`edit-product-image-${product._id}`}
                            className="cursor-pointer rounded-md border-0 bg-[var(--color-primary-purple)] px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-[var(--color-primary-purple-hover)]"
                          >
                            Choose file
                          </label>
                          {editImageFile && (
                            <span className="truncate text-xs text-muted-foreground">
                              {editImageFile.name}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        type="submit"
                        disabled={saving}
                        size="sm"
                        className="gap-1 bg-[var(--color-primary-purple)] hover:bg-[var(--color-primary-purple-hover)]"
                      >
                        {saving ? <Loader2 className="size-4 animate-spin" /> : "Save"}
                      </Button>
                      <Button type="button" variant="outline" size="sm" onClick={cancelEdit}>
                        <X className="size-4" />
                        Cancel
                      </Button>
                    </div>
                  </form>
                ) : (
                  <>
                    <div className="relative aspect-square w-full overflow-hidden rounded-lg border border-border bg-muted">
                      {product.image ? (
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          unoptimized={product.image.includes("localhost")}
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-muted-foreground">
                          No image
                        </div>
                      )}
                    </div>
                    <div className="mt-3 flex items-center justify-between gap-2">
                      <div>
                        <p className="font-medium text-foreground">{product.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {product.category?.name ?? "—"}
                        </p>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => startEdit(product)}
                          aria-label="Edit product"
                        >
                          <Pencil className="size-4" />
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => handleDeleteClick(product)}
                          disabled={deletingId === product._id}
                          aria-label="Delete product"
                          className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                        >
                          {deletingId === product._id ? (
                            <Loader2 className="size-4 animate-spin" />
                          ) : (
                            <Trash2 className="size-4" />
                          )}
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
