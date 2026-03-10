"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import { toast } from "sonner"
import { getShowcase, updateShowcase, type ShowcaseData } from "@/services"
import { Button } from "@/components/ui/button"
import { Loader2, Plus, Trash2 } from "lucide-react"

const sk = "animate-pulse bg-gray-300"

function ShowcaseSkeleton() {
  return (
    <div className="space-y-6">
      <div className={`h-8 w-48 rounded-md ${sk}`} />
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <div className={`h-4 w-24 rounded ${sk}`} />
          <div className={`aspect-[3/4] w-full max-w-xs rounded-xl ${sk}`} />
          <div className={`h-4 w-28 rounded ${sk}`} />
          <div className={`aspect-video w-full rounded-xl ${sk}`} />
          <div className={`h-4 w-28 rounded ${sk}`} />
          <div className={`aspect-video w-full rounded-xl ${sk}`} />
        </div>
        <div className="space-y-4">
          <div className={`h-4 w-20 rounded ${sk}`} />
          <div className={`h-12 w-full rounded-lg ${sk}`} />
          <div className={`h-4 w-24 rounded ${sk}`} />
          <div className={`h-24 w-full rounded-lg ${sk}`} />
          <div className={`h-4 w-20 rounded ${sk}`} />
          <div className={`h-10 w-full rounded-lg ${sk}`} />
          <div className={`h-10 w-full rounded-lg ${sk}`} />
          <div className={`h-10 w-32 rounded-lg ${sk}`} />
        </div>
      </div>
    </div>
  )
}

const inputClass =
  "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-[var(--color-primary-purple)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary-purple)]"
const labelClass = "block text-sm font-medium text-foreground"

export default function HomeShowcasePage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [data, setData] = useState<ShowcaseData | null>(null)
  const [heading, setHeading] = useState("")
  const [paragraph, setParagraph] = useState("")
  const [points, setPoints] = useState<string[]>([])
  const [image1File, setImage1File] = useState<File | null>(null)
  const [image2File, setImage2File] = useState<File | null>(null)
  const [image3File, setImage3File] = useState<File | null>(null)
  const [image1Preview, setImage1Preview] = useState<string | null>(null)
  const [image2Preview, setImage2Preview] = useState<string | null>(null)
  const [image3Preview, setImage3Preview] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    async function load() {
      setLoading(true)
      const showcase = await getShowcase()
      if (cancelled) return
      setLoading(false)
      if (showcase) {
        setData(showcase)
        setHeading(showcase.heading ?? "")
        setParagraph(showcase.paragraph ?? "")
        setPoints(Array.isArray(showcase.points) ? [...showcase.points] : [])
        setImage1Preview(showcase.image1 || null)
        setImage2Preview(showcase.image2 || null)
        setImage3Preview(showcase.image3 || null)
      } else {
        setHeading("")
        setParagraph("")
        setPoints([])
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [])

  const handleImage1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImage1File(file)
      setImage1Preview(URL.createObjectURL(file))
    }
  }
  const handleImage2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImage2File(file)
      setImage2Preview(URL.createObjectURL(file))
    }
  }
  const handleImage3Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImage3File(file)
      setImage3Preview(URL.createObjectURL(file))
    }
  }

  const addPoint = () => setPoints((prev) => [...prev, ""])
  const removePoint = (index: number) => setPoints((prev) => prev.filter((_, i) => i !== index))
  const updatePoint = (index: number, value: string) =>
    setPoints((prev) => {
      const next = [...prev]
      next[index] = value
      return next
    })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (points.length % 2 !== 0) {
      toast.error("Points must be an even number (e.g. 2, 4, 6, 8). Add or remove one to fix.")
      return
    }
    setSaving(true)
    try {
      const formData = new FormData()
      formData.append("heading", heading.trim())
      formData.append("paragraph", paragraph.trim())
      points.forEach((p) => {
        if (p.trim()) formData.append("points", p.trim())
      })
      if (image1File) formData.append("image1", image1File)
      if (image2File) formData.append("image2", image2File)
      if (image3File) formData.append("image3", image3File)
      const result = await updateShowcase(formData)
      if (result.success) {
        toast.success("Showcase updated successfully.")
        setImage1File(null)
        setImage2File(null)
        setImage3File(null)
        const updated = await getShowcase()
        if (updated) {
          setData(updated)
          setHeading(updated.heading ?? "")
          setParagraph(updated.paragraph ?? "")
          setPoints(Array.isArray(updated.points) ? [...updated.points] : [])
          setImage1Preview(updated.image1 || null)
          setImage2Preview(updated.image2 || null)
          setImage3Preview(updated.image3 || null)
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
          <h2 className="text-xl font-semibold text-foreground">Home – Showcase</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage showcase section: 3 images (1 vertical, 2 horizontal), heading, paragraph and points.
          </p>
        </div>
        <ShowcaseSkeleton />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground">Home – Showcase</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage showcase section: 3 images (1 vertical, 2 horizontal), heading, paragraph and points.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Images */}
          <div className="space-y-6">
            <div className="space-y-3">
              <label className={labelClass}>Image 1 (vertical / portrait)</label>
              <p className="text-xs text-muted-foreground">
                Use a vertical or portrait image for the left side.
              </p>
              <div className="relative aspect-[3/4] w-full max-w-sm overflow-hidden rounded-xl border border-border bg-muted">
                {image1Preview ? (
                  <Image
                    src={image1Preview}
                    alt="Showcase 1"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    unoptimized={
                      image1Preview.startsWith("blob:") || image1Preview.includes("localhost")
                    }
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
                onChange={handleImage1Change}
                className="block w-full text-sm text-foreground file:mr-3 file:rounded-md file:border-0 file:bg-[var(--color-primary-purple)] file:px-4 file:py-2 file:text-sm file:font-medium file:text-white file:hover:bg-[var(--color-primary-purple-hover)]"
              />
            </div>

            <div className="space-y-3">
              <label className={labelClass}>Image 2 (horizontal / landscape)</label>
              <p className="text-xs text-muted-foreground">
                Use a horizontal or landscape image.
              </p>
              <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-border bg-muted">
                {image2Preview ? (
                  <Image
                    src={image2Preview}
                    alt="Showcase 2"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    unoptimized={
                      image2Preview.startsWith("blob:") || image2Preview.includes("localhost")
                    }
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
                onChange={handleImage2Change}
                className="block w-full text-sm text-foreground file:mr-3 file:rounded-md file:border-0 file:bg-[var(--color-primary-purple)] file:px-4 file:py-2 file:text-sm file:font-medium file:text-white file:hover:bg-[var(--color-primary-purple-hover)]"
              />
            </div>

            <div className="space-y-3">
              <label className={labelClass}>Image 3 (horizontal / landscape)</label>
              <p className="text-xs text-muted-foreground">
                Use a horizontal or landscape image.
              </p>
              <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-border bg-muted">
                {image3Preview ? (
                  <Image
                    src={image3Preview}
                    alt="Showcase 3"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    unoptimized={
                      image3Preview.startsWith("blob:") || image3Preview.includes("localhost")
                    }
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
                onChange={handleImage3Change}
                className="block w-full text-sm text-foreground file:mr-3 file:rounded-md file:border-0 file:bg-[var(--color-primary-purple)] file:px-4 file:py-2 file:text-sm file:font-medium file:text-white file:hover:bg-[var(--color-primary-purple-hover)]"
              />
            </div>
          </div>

          {/* Text & points */}
          <div className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="showcase-heading" className={labelClass}>
                Heading
              </label>
              <textarea
                id="showcase-heading"
                value={heading}
                onChange={(e) => setHeading(e.target.value)}
                rows={2}
                placeholder="Excellence in Every Trade, Trust in Every Deal"
                className={inputClass}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="showcase-paragraph" className={labelClass}>
                Paragraph
              </label>
              <textarea
                id="showcase-paragraph"
                value={paragraph}
                onChange={(e) => setParagraph(e.target.value)}
                rows={4}
                placeholder="Partner with us for unmatched quality..."
                className={inputClass}
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <label className={labelClass}>Points (even number only)</label>
                <Button type="button" variant="outline" size="sm" onClick={addPoint} className="gap-1">
                  <Plus className="size-4" />
                  Add
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Add points in pairs so the total is always even (e.g. 2, 4, 6, 8).
              </p>
              <div className="space-y-2">
                {points.map((point, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={point}
                      onChange={(e) => updatePoint(index, e.target.value)}
                      placeholder={`Point ${index + 1}`}
                      className={inputClass}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removePoint(index)}
                      aria-label="Remove point"
                      className="shrink-0"
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                ))}
              </div>
              {points.length > 0 && points.length % 2 !== 0 && (
                <p className="text-xs text-amber-600 dark:text-amber-400">
                  You have {points.length} point(s). Add or remove one so the count is even.
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 border-t border-border pt-6">
          <Button
            type="submit"
            disabled={saving || points.length % 2 !== 0}
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
