"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import { toast } from "sonner"
import { useShowcase, useUpdateShowcase } from "@/hooks"
import { Button } from "@/components/ui/button"
import { Loader2, Plus, Trash2 } from "lucide-react"

const sk = "animate-pulse bg-gray-300"
const inputClass =
  "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-[var(--color-primary-purple)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary-purple)]"
const labelClass = "block text-sm font-medium text-foreground"

function ShowcaseSkeleton() {
  return (
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
        {[1, 2, 3, 4].map((i) => <div key={i} className={`h-12 w-full rounded-lg ${sk}`} />)}
      </div>
    </div>
  )
}

function ImagePicker({
  label,
  description,
  aspectClass,
  preview,
  file,
  onChange,
}: {
  label: string
  description: string
  aspectClass: string
  preview: string | null
  file: File | null
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <div className="space-y-3">
      <label className={labelClass}>{label}</label>
      <p className="text-xs text-muted-foreground">{description}</p>
      <div className={`relative ${aspectClass} w-full overflow-hidden rounded-xl border border-border bg-muted`}>
        {preview ? (
          <Image src={preview} alt={label} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" unoptimized={preview.startsWith("blob:") || preview.includes("localhost")} />
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground">No image</div>
        )}
      </div>
      <input type="file" accept="image/*" onChange={onChange} className="block w-full text-sm text-foreground file:mr-3 file:rounded-md file:border-0 file:bg-[var(--color-primary-purple)] file:px-4 file:py-2 file:text-sm file:font-medium file:text-white file:hover:bg-[var(--color-primary-purple-hover)]" />
      {file && <p className="text-xs text-muted-foreground truncate">{file.name} selected</p>}
    </div>
  )
}

export default function HomeShowcasePage() {
  const { data, isLoading } = useShowcase()
  const updateShowcase = useUpdateShowcase()

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
    if (!data) return
    setHeading(data.heading ?? "")
    setParagraph(data.paragraph ?? "")
    setPoints(Array.isArray(data.points) ? [...data.points] : [])
    setImage1Preview(data.image1 || null)
    setImage2Preview(data.image2 || null)
    setImage3Preview(data.image3 || null)
  }, [data])

  useEffect(() => {
    if (updateShowcase.isSuccess) {
      setImage1File(null)
      setImage2File(null)
      setImage3File(null)
    }
  }, [updateShowcase.isSuccess])

  const makeImageHandler = (
    setFile: (f: File) => void,
    setPreview: (p: string) => void
  ) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) { setFile(file); setPreview(URL.createObjectURL(file)) }
  }

  const addPoint = () => setPoints((prev) => [...prev, ""])
  const removePoint = (i: number) => setPoints((prev) => prev.filter((_, idx) => idx !== i))
  const updatePoint = (i: number, value: string) =>
    setPoints((prev) => { const next = [...prev]; next[i] = value; return next })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (points.length % 2 !== 0) {
      toast.error("Points must be an even number (e.g. 2, 4, 6, 8). Add or remove one to fix.")
      return
    }
    const formData = new FormData()
    formData.append("heading", heading.trim())
    formData.append("paragraph", paragraph.trim())
    points.forEach((p) => { if (p.trim()) formData.append("points", p.trim()) })
    if (image1File) formData.append("image1", image1File)
    if (image2File) formData.append("image2", image2File)
    if (image3File) formData.append("image3", image3File)
    updateShowcase.mutate(formData)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground">Home – Showcase</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage showcase section: 3 images (1 vertical, 2 horizontal), heading, paragraph and points.
        </p>
      </div>

      {isLoading ? (
        <ShowcaseSkeleton />
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-6">
              <ImagePicker label="Image 1 (vertical / portrait)" description="Use a vertical or portrait image for the left side." aspectClass="aspect-[3/4] max-w-sm" preview={image1Preview} file={image1File} onChange={makeImageHandler(setImage1File, setImage1Preview)} />
              <ImagePicker label="Image 2 (horizontal / landscape)" description="Use a horizontal or landscape image." aspectClass="aspect-video" preview={image2Preview} file={image2File} onChange={makeImageHandler(setImage2File, setImage2Preview)} />
              <ImagePicker label="Image 3 (horizontal / landscape)" description="Use a horizontal or landscape image." aspectClass="aspect-video" preview={image3Preview} file={image3File} onChange={makeImageHandler(setImage3File, setImage3Preview)} />
            </div>

            <div className="space-y-5">
              <div className="space-y-2">
                <label htmlFor="showcase-heading" className={labelClass}>Heading</label>
                <textarea id="showcase-heading" value={heading} onChange={(e) => setHeading(e.target.value)} rows={2} placeholder="Excellence in Every Trade, Trust in Every Deal" className={inputClass} />
              </div>
              <div className="space-y-2">
                <label htmlFor="showcase-paragraph" className={labelClass}>Paragraph</label>
                <textarea id="showcase-paragraph" value={paragraph} onChange={(e) => setParagraph(e.target.value)} rows={4} placeholder="Partner with us for unmatched quality..." className={inputClass} />
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <label className={labelClass}>Points (even number only)</label>
                  <Button type="button" variant="outline" size="sm" onClick={addPoint} className="gap-1">
                    <Plus className="size-4" />Add
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">Add points in pairs so the total is always even (e.g. 2, 4, 6, 8).</p>
                <div className="space-y-2">
                  {points.map((point, i) => (
                    <div key={i} className="flex gap-2">
                      <input type="text" value={point} onChange={(e) => updatePoint(i, e.target.value)} placeholder={`Point ${i + 1}`} className={inputClass} />
                      <Button type="button" variant="outline" size="icon" onClick={() => removePoint(i)} aria-label="Remove point" className="shrink-0">
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
            <Button type="submit" disabled={updateShowcase.isPending || points.length % 2 !== 0} className="gap-2 bg-[var(--color-primary-purple)] hover:bg-[var(--color-primary-purple-hover)]">
              {updateShowcase.isPending ? <><Loader2 className="size-4 shrink-0 animate-spin" /><span>Saving…</span></> : "Save changes"}
            </Button>
          </div>
        </form>
      )}
    </div>
  )
}
