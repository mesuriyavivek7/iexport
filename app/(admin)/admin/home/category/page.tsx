"use client"

import React, { useEffect, useState } from "react"
import { toast } from "sonner"
import {
  getCategorySection,
  updateCategorySection,
  type CategorySectionData,
} from "@/services"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

const sk = "animate-pulse bg-gray-300"

function CategorySectionSkeleton() {
  return (
    <div className="space-y-6">
      <div className={`h-8 w-48 rounded-md ${sk}`} />
      <div className="space-y-4">
        <div className={`h-4 w-24 rounded ${sk}`} />
        <div className={`h-10 w-full rounded-lg ${sk}`} />
        <div className={`h-4 w-28 rounded ${sk}`} />
        <div className={`h-24 w-full rounded-lg ${sk}`} />
        <div className={`h-10 w-32 rounded-lg ${sk}`} />
      </div>
    </div>
  )
}

const inputClass =
  "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-[var(--color-primary-purple)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary-purple)]"
const labelClass = "block text-sm font-medium text-foreground"

export default function HomeCategorySectionPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [heading, setHeading] = useState("")
  const [subheading, setSubheading] = useState("")

  useEffect(() => {
    let cancelled = false
    async function load() {
      setLoading(true)
      const data = await getCategorySection()
      if (cancelled) return
      setLoading(false)
      if (data) {
        setHeading(data.heading ?? "")
        setSubheading(data.subheading ?? "")
      } else {
        setHeading("")
        setSubheading("")
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const payload: CategorySectionData = {
        heading: heading.trim(),
        subheading: subheading.trim(),
      }
      const result = await updateCategorySection(payload)
      if (result.success) {
        toast.success("Category section updated successfully.")
      } else {
        toast.error(result.error ?? "Update failed.")
      }
    } catch {
      toast.error("Something went wrong.")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground">
            Home – Category Section
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage the category section heading and subheading on the home page.
          </p>
        </div>
        <CategorySectionSkeleton />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground">
          Home – Category Section
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage the category section heading and subheading on the home page.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-5">
          <div className="space-y-2">
            <label htmlFor="category-heading" className={labelClass}>
              Heading
            </label>
            <input
              id="category-heading"
              type="text"
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
              placeholder="Crafted by Nature, Delivered with Care"
              className={inputClass}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="category-subheading" className={labelClass}>
              Subheading
            </label>
            <textarea
              id="category-subheading"
              value={subheading}
              onChange={(e) => setSubheading(e.target.value)}
              rows={3}
              placeholder="Experience the finest products, sourced responsibly and delivered with uncompromising quality."
              className={inputClass}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-3 border-t border-border pt-6">
          <Button
            type="submit"
            disabled={saving}
            className="gap-2 bg-[var(--color-primary-purple)] hover:bg-[var(--color-primary-purple-hover)]"
          >
            {saving ? (
              <>
                <Loader2 className="size-4 shrink-0 animate-spin" />
                <span>Saving…</span>
              </>
            ) : (
              "Save changes"
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
