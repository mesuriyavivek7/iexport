"use client"

import React, { useEffect, useState } from "react"
import { useCategoriesPage, useUpdateCategoriesPage } from "@/hooks"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

const sk = "animate-pulse bg-gray-300"
const inputClass =
  "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-[var(--color-primary-purple)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary-purple)]"
const labelClass = "block text-sm font-medium text-foreground"

function CategoriesPageSkeleton() {
  return (
    <div className="space-y-4">
      <div className={`h-4 w-24 rounded ${sk}`} />
      <div className={`h-10 w-full rounded-lg ${sk}`} />
      <div className={`h-4 w-28 rounded ${sk}`} />
      <div className={`h-24 w-full rounded-lg ${sk}`} />
      <div className={`h-10 w-32 rounded-lg ${sk}`} />
    </div>
  )
}

export default function CategorySectionPage() {
  const { data, isLoading } = useCategoriesPage()
  const updateCategoriesPage = useUpdateCategoriesPage()
  const [heading, setHeading] = useState("")
  const [subheading, setSubheading] = useState("")

  useEffect(() => {
    if (!data) return
    setHeading(data.heading ?? "")
    setSubheading(data.subheading ?? "")
  }, [data])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateCategoriesPage.mutate({ heading: heading.trim(), subheading: subheading.trim() })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground">Category – Section</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage heading and subheading for the categories page.
        </p>
      </div>

      {isLoading ? (
        <CategoriesPageSkeleton />
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="categories-heading" className={labelClass}>Heading</label>
              <input id="categories-heading" type="text" value={heading} onChange={(e) => setHeading(e.target.value)} placeholder="Our Categories" className={inputClass} />
            </div>
            <div className="space-y-2">
              <label htmlFor="categories-subheading" className={labelClass}>Subheading</label>
              <textarea id="categories-subheading" value={subheading} onChange={(e) => setSubheading(e.target.value)} rows={3} placeholder="Browse our range of premium products by category." className={inputClass} />
            </div>
          </div>
          <div className="flex flex-wrap gap-3 border-t border-border pt-6">
            <Button type="submit" disabled={updateCategoriesPage.isPending} className="gap-2 bg-[var(--color-primary-purple)] hover:bg-[var(--color-primary-purple-hover)]">
              {updateCategoriesPage.isPending ? <><Loader2 className="size-4 shrink-0 animate-spin" /><span>Saving…</span></> : "Save changes"}
            </Button>
          </div>
        </form>
      )}
    </div>
  )
}
