"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import { useAboutHome, useUpdateAboutHome } from "@/hooks"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

const sk = "animate-pulse bg-gray-300"
const inputClass =
  "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-[var(--color-primary-purple)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary-purple)]"
const labelClass = "block text-sm font-medium text-foreground"

function AboutSkeleton() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-4">
        <div className={`h-4 w-28 rounded ${sk}`} />
        <div className={`aspect-[4/3] w-full rounded-xl ${sk}`} />
      </div>
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => <div key={i} className={`h-10 w-full rounded-lg ${sk}`} />)}
      </div>
    </div>
  )
}

export default function HomeAboutPage() {
  const { data, isLoading } = useAboutHome()
  const updateAboutHome = useUpdateAboutHome()

  const [heading, setHeading] = useState("")
  const [subheading, setSubheading] = useState("")
  const [contentParagraph1, setContentParagraph1] = useState("")
  const [contentParagraph2, setContentParagraph2] = useState("")
  const [aboutImageFile, setAboutImageFile] = useState<File | null>(null)
  const [aboutImagePreview, setAboutImagePreview] = useState<string | null>(null)

  useEffect(() => {
    if (!data) return
    setHeading(data.heading ?? "")
    setSubheading(data.subheading ?? "")
    setContentParagraph1(data.contentParagraph1 ?? "")
    setContentParagraph2(data.contentParagraph2 ?? "")
    setAboutImagePreview(data.aboutImage || null)
  }, [data])

  useEffect(() => {
    if (updateAboutHome.isSuccess) setAboutImageFile(null)
  }, [updateAboutHome.isSuccess])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) { setAboutImageFile(file); setAboutImagePreview(URL.createObjectURL(file)) }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("heading", heading.trim())
    formData.append("subheading", subheading.trim())
    formData.append("contentParagraph1", contentParagraph1.trim())
    formData.append("contentParagraph2", contentParagraph2.trim())
    if (aboutImageFile) formData.append("aboutImage", aboutImageFile)
    updateAboutHome.mutate(formData)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground">Home – About</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage about section image, heading, subheading and content.
        </p>
      </div>

      {isLoading ? (
        <AboutSkeleton />
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-3">
              <label className={labelClass}>About image</label>
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-border bg-muted">
                {aboutImagePreview ? (
                  <Image
                    src={aboutImagePreview}
                    alt="About preview"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    unoptimized={aboutImagePreview.startsWith("blob:") || aboutImagePreview.includes("localhost")}
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-muted-foreground">No image</div>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-sm text-foreground file:mr-3 file:rounded-md file:border-0 file:bg-[var(--color-primary-purple)] file:px-4 file:py-2 file:text-sm file:font-medium file:text-white file:hover:bg-[var(--color-primary-purple-hover)]"
              />
              <p className="text-xs text-muted-foreground">Leave empty to keep the current image.</p>
            </div>

            <div className="space-y-5">
              <div className="space-y-2">
                <label htmlFor="about-subheading" className={labelClass}>Subheading</label>
                <input id="about-subheading" type="text" value={subheading} onChange={(e) => setSubheading(e.target.value)} placeholder="ABOUT PROCURE EXPORT" className={inputClass} />
              </div>
              <div className="space-y-2">
                <label htmlFor="about-heading" className={labelClass}>Heading</label>
                <input id="about-heading" type="text" value={heading} onChange={(e) => setHeading(e.target.value)} placeholder="Your Trusted Partner in International Trade." className={inputClass} />
              </div>
              <div className="space-y-2">
                <label htmlFor="about-p1" className={labelClass}>Content (paragraph 1)</label>
                <textarea id="about-p1" value={contentParagraph1} onChange={(e) => setContentParagraph1(e.target.value)} rows={4} placeholder="Welcome to Procure Exports..." className={inputClass} />
              </div>
              <div className="space-y-2">
                <label htmlFor="about-p2" className={labelClass}>Content (paragraph 2)</label>
                <textarea id="about-p2" value={contentParagraph2} onChange={(e) => setContentParagraph2(e.target.value)} rows={4} placeholder="At Procure Exports, we believe..." className={inputClass} />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 border-t border-border pt-6">
            <Button type="submit" disabled={updateAboutHome.isPending} className="gap-2 bg-[var(--color-primary-purple)] hover:bg-[var(--color-primary-purple-hover)]">
              {updateAboutHome.isPending ? <><Loader2 className="size-4 animate-spin" />Saving…</> : "Save changes"}
            </Button>
          </div>
        </form>
      )}
    </div>
  )
}
