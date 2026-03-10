"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import { toast } from "sonner"
import { getHero, updateHero, type HeroData } from "@/services"
import { Button } from "@/components/ui/button"
import { Plus, Trash2, Loader2 } from "lucide-react"

const sk = "animate-pulse bg-gray-300"

function HeroSkeleton() {
  return (
    <div className="space-y-6">
      <div className={`h-8 w-48 rounded-md ${sk}`} />
      <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
        <div className="space-y-4">
          <div className={`h-4 w-24 rounded ${sk}`} />
          <div className={`aspect-video w-full rounded-xl ${sk}`} />
        </div>
        <div className="space-y-4">
          <div className={`h-4 w-20 rounded ${sk}`} />
          <div className={`h-24 w-full rounded-lg ${sk}`} />
          <div className={`h-4 w-24 rounded ${sk}`} />
          <div className={`h-10 w-full rounded-lg ${sk}`} />
          <div className={`h-4 w-16 rounded ${sk}`} />
          <div className={`h-10 w-full rounded-lg ${sk}`} />
          <div className={`h-10 w-32 rounded-lg ${sk}`} />
        </div>
      </div>
    </div>
  )
}

function normalizeHeading(value: string): string {
  return value.replace(/\\n/g, "\n").trim()
}

function serializeHeading(value: string): string {
  return value.trim().replace(/\n/g, "\\n")
}

export default function HomeHeroPage() {
  const [data, setData] = useState<HeroData | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [heading, setHeading] = useState("")
  const [subheading, setSubheading] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [heroImageFile, setHeroImageFile] = useState<File | null>(null)
  const [heroImagePreview, setHeroImagePreview] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    async function load() {
      setLoading(true)
      const hero = await getHero()
      if (cancelled) return
      setLoading(false)
      if (hero) {
        setData(hero)
        setHeading(normalizeHeading(hero.heading))
        setSubheading(hero.subheading ?? "")
        setTags(Array.isArray(hero.tags) ? [...hero.tags] : [])
        setHeroImagePreview(hero.heroImage || null)
      } else {
        setHeading("")
        setSubheading("")
        setTags([""])
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setHeroImageFile(file)
      setHeroImagePreview(URL.createObjectURL(file))
    }
  }

  const addTag = () => setTags((prev) => [...prev, ""])
  const removeTag = (index: number) =>
    setTags((prev) => prev.filter((_, i) => i !== index))
  const setTag = (index: number, value: string) =>
    setTags((prev) => {
      const next = [...prev]
      next[index] = value
      return next
    })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const formData = new FormData()
      formData.append("heading", serializeHeading(heading))
      formData.append("subheading", subheading.trim())
      formData.append("tags", JSON.stringify(tags.filter(Boolean)))
      if (heroImageFile) formData.append("heroImage", heroImageFile)
      const result = await updateHero(formData)
      if (result.success) {
        toast.success("Hero updated successfully.")
        setHeroImageFile(null)
        const updated = await getHero()
        if (updated) {
          setData(updated)
          setHeroImagePreview(updated.heroImage || null)
        }
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
          <h2 className="text-xl font-semibold text-foreground">Home – Hero</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage hero image, heading, subheading and tags.
          </p>
        </div>
        <HeroSkeleton />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground">Home – Hero</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage hero image, heading, subheading and tags.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Hero image */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-foreground">
              Hero image
            </label>
            <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-border bg-muted">
              {heroImagePreview ? (
                <Image
                  src={heroImagePreview}
                  alt="Hero preview"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  unoptimized={heroImagePreview.startsWith("blob:") || heroImagePreview.includes("localhost")}
                />
              ) : (
                <div className="flex h-full items-center justify-center text-muted-foreground">
                  No image
                </div>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-foreground file:mr-3 file:rounded-md file:border-0 file:bg-[var(--color-primary-purple)] file:px-4 file:py-2 file:text-sm file:font-medium file:text-white file:hover:bg-[var(--color-primary-purple-hover)]"
            />
            <p className="text-xs text-muted-foreground">
              Leave empty to keep the current image.
            </p>
          </div>

          <div className="space-y-5">
            {/* Heading */}
            <div className="space-y-2">
              <label htmlFor="hero-heading" className="block text-sm font-medium text-foreground">
                Heading
              </label>
              <textarea
                id="hero-heading"
                value={heading}
                onChange={(e) => setHeading(e.target.value)}
                rows={3}
                placeholder={"PREMIUM SEEDS\nFOR GLOBAL AGRICULTURE"}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-[var(--color-primary-purple)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary-purple)]"
              />
              <p className="text-xs text-muted-foreground">
                Use a new line for the second part of the heading.
              </p>
            </div>

            {/* Subheading */}
            <div className="space-y-2">
              <label htmlFor="hero-subheading" className="block text-sm font-medium text-foreground">
                Subheading
              </label>
              <input
                id="hero-subheading"
                type="text"
                value={subheading}
                onChange={(e) => setSubheading(e.target.value)}
                placeholder="Import export of speciality finest quality agricultural and food products"
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-[var(--color-primary-purple)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary-purple)]"
              />
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-foreground">
                  Tags
                </label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addTag}
                  className="gap-1"
                >
                  <Plus className="size-4" />
                  Add tag
                </Button>
              </div>
              <div className="flex flex-col gap-2">
                {(tags.length ? tags : [""]).map((tag, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={tag}
                      onChange={(e) => setTag(index, e.target.value)}
                      placeholder="#Import"
                      className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-[var(--color-primary-purple)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary-purple)]"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeTag(index)}
                      aria-label="Remove tag"
                      className="shrink-0"
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                e.g. #Import, #Export. Add one per line.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 border-t border-border pt-6">
          <Button
            type="submit"
            disabled={saving}
            className="bg-[var(--color-primary-purple)] hover:bg-[var(--color-primary-purple-hover)]"
          >
            {saving ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Saving…
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
