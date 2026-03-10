"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import { toast } from "sonner"
import { getAboutHome, updateAboutHome, type AboutHomeData } from "@/services"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

const sk = "animate-pulse bg-gray-300"

function AboutSkeleton() {
  return (
    <div className="space-y-6">
      <div className={`h-8 w-48 rounded-md ${sk}`} />
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <div className={`h-4 w-28 rounded ${sk}`} />
          <div className={`aspect-[4/3] w-full rounded-xl ${sk}`} />
        </div>
        <div className="space-y-4">
          <div className={`h-4 w-20 rounded ${sk}`} />
          <div className={`h-10 w-full rounded-lg ${sk}`} />
          <div className={`h-4 w-24 rounded ${sk}`} />
          <div className={`h-10 w-full rounded-lg ${sk}`} />
          <div className={`h-4 w-32 rounded ${sk}`} />
          <div className={`h-24 w-full rounded-lg ${sk}`} />
          <div className={`h-4 w-32 rounded ${sk}`} />
          <div className={`h-24 w-full rounded-lg ${sk}`} />
          <div className={`h-10 w-32 rounded-lg ${sk}`} />
        </div>
      </div>
    </div>
  )
}

const inputClass =
  "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-[var(--color-primary-purple)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary-purple)]"
const labelClass = "block text-sm font-medium text-foreground"

export default function HomeAboutPage() {
  const [data, setData] = useState<AboutHomeData | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [heading, setHeading] = useState("")
  const [subheading, setSubheading] = useState("")
  const [contentParagraph1, setContentParagraph1] = useState("")
  const [contentParagraph2, setContentParagraph2] = useState("")
  const [aboutImageFile, setAboutImageFile] = useState<File | null>(null)
  const [aboutImagePreview, setAboutImagePreview] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    async function load() {
      setLoading(true)
      const about = await getAboutHome()
      if (cancelled) return
      setLoading(false)
      if (about) {
        setData(about)
        setHeading(about.heading ?? "")
        setSubheading(about.subheading ?? "")
        setContentParagraph1(about.contentParagraph1 ?? "")
        setContentParagraph2(about.contentParagraph2 ?? "")
        setAboutImagePreview(about.aboutImage || null)
      } else {
        setHeading("")
        setSubheading("")
        setContentParagraph1("")
        setContentParagraph2("")
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
      setAboutImageFile(file)
      setAboutImagePreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const formData = new FormData()
      formData.append("heading", heading.trim())
      formData.append("subheading", subheading.trim())
      formData.append("contentParagraph1", contentParagraph1.trim())
      formData.append("contentParagraph2", contentParagraph2.trim())
      if (aboutImageFile) formData.append("aboutImage", aboutImageFile)
      const result = await updateAboutHome(formData)
      if (result.success) {
        toast.success("About section updated successfully.")
        setAboutImageFile(null)
        const updated = await getAboutHome()
        if (updated) {
          setData(updated)
          setAboutImagePreview(updated.aboutImage || null)
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
          <h2 className="text-xl font-semibold text-foreground">Home – About</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage about section image, heading, subheading and content.
          </p>
        </div>
        <AboutSkeleton />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground">Home – About</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage about section image, heading, subheading and content.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* About image */}
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
                  unoptimized={
                    aboutImagePreview.startsWith("blob:") ||
                    aboutImagePreview.includes("localhost")
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
              onChange={handleImageChange}
              className="block w-full text-sm text-foreground file:mr-3 file:rounded-md file:border-0 file:bg-[var(--color-primary-purple)] file:px-4 file:py-2 file:text-sm file:font-medium file:text-white file:hover:bg-[var(--color-primary-purple-hover)]"
            />
            <p className="text-xs text-muted-foreground">
              Leave empty to keep the current image.
            </p>
          </div>

          <div className="space-y-5">
            {/* Subheading */}
            <div className="space-y-2">
              <label htmlFor="about-subheading" className={labelClass}>
                Subheading
              </label>
              <input
                id="about-subheading"
                type="text"
                value={subheading}
                onChange={(e) => setSubheading(e.target.value)}
                placeholder="ABOUT PROCURE EXPORT"
                className={inputClass}
              />
            </div>

            {/* Heading */}
            <div className="space-y-2">
              <label htmlFor="about-heading" className={labelClass}>
                Heading
              </label>
              <input
                id="about-heading"
                type="text"
                value={heading}
                onChange={(e) => setHeading(e.target.value)}
                placeholder="Your Trusted Partner in International Trade."
                className={inputClass}
              />
            </div>

            {/* Content paragraph 1 */}
            <div className="space-y-2">
              <label htmlFor="about-p1" className={labelClass}>
                Content (paragraph 1)
              </label>
              <textarea
                id="about-p1"
                value={contentParagraph1}
                onChange={(e) => setContentParagraph1(e.target.value)}
                rows={4}
                placeholder="Welcome to Procure Exports..."
                className={inputClass}
              />
            </div>

            {/* Content paragraph 2 */}
            <div className="space-y-2">
              <label htmlFor="about-p2" className={labelClass}>
                Content (paragraph 2)
              </label>
              <textarea
                id="about-p2"
                value={contentParagraph2}
                onChange={(e) => setContentParagraph2(e.target.value)}
                rows={4}
                placeholder="At Procure Exports, we believe..."
                className={inputClass}
              />
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
