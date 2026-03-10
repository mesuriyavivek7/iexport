"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import { toast } from "sonner"
import { getAboutPage, updateAboutPage, type AboutPageData } from "@/services"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

const sk = "animate-pulse bg-gray-300"

function AboutPageSkeleton() {
  return (
    <div className="space-y-6">
      <div className={`h-8 w-48 rounded-md ${sk}`} />
      <div className="space-y-4">
        <div className={`h-4 w-28 rounded ${sk}`} />
        <div className={`h-10 w-full rounded-lg ${sk}`} />
        <div className={`h-4 w-32 rounded ${sk}`} />
        <div className={`h-20 w-full rounded-lg ${sk}`} />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <div className={`h-4 w-24 rounded ${sk}`} />
          <div className={`aspect-[4/3] w-full rounded-xl ${sk}`} />
        </div>
        <div className="space-y-4">
          <div className={`h-4 w-28 rounded ${sk}`} />
          <div className={`h-10 w-full rounded-lg ${sk}`} />
          <div className={`h-4 w-32 rounded ${sk}`} />
          <div className={`h-24 w-full rounded-lg ${sk}`} />
          <div className={`h-24 w-full rounded-lg ${sk}`} />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className={`rounded-lg border border-border p-4 ${sk}`}>
            <div className={`mb-3 h-4 w-20 rounded ${sk}`} />
            <div className={`h-16 w-full rounded ${sk}`} />
          </div>
        ))}
      </div>
      <div className={`h-10 w-32 rounded-lg ${sk}`} />
    </div>
  )
}

const inputClass =
  "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-[var(--color-primary-purple)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary-purple)]"
const labelClass = "block text-sm font-medium text-foreground"

export default function AboutPageAdmin() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [bannerHeading, setBannerHeading] = useState("")
  const [bannerSubheading, setBannerSubheading] = useState("")
  const [sectionImageFile, setSectionImageFile] = useState<File | null>(null)
  const [sectionImagePreview, setSectionImagePreview] = useState<string | null>(null)
  const [sectionHeading, setSectionHeading] = useState("")
  const [sectionContentParagraph1, setSectionContentParagraph1] = useState("")
  const [sectionContentParagraph2, setSectionContentParagraph2] = useState("")
  const [visionTitle, setVisionTitle] = useState("")
  const [visionContent, setVisionContent] = useState("")
  const [missionTitle, setMissionTitle] = useState("")
  const [missionContent, setMissionContent] = useState("")
  const [ambitionTitle, setAmbitionTitle] = useState("")
  const [ambitionContent, setAmbitionContent] = useState("")

  useEffect(() => {
    let cancelled = false
    async function load() {
      setLoading(true)
      const data = await getAboutPage()
      if (cancelled) return
      setLoading(false)
      if (data) {
        setBannerHeading(data.bannerHeading ?? "")
        setBannerSubheading(data.bannerSubheading ?? "")
        setSectionImagePreview(data.sectionImage || null)
        setSectionHeading(data.sectionHeading ?? "")
        setSectionContentParagraph1(data.sectionContentParagraph1 ?? "")
        setSectionContentParagraph2(data.sectionContentParagraph2 ?? "")
        setVisionTitle(data.visionTitle ?? "")
        setVisionContent(data.visionContent ?? "")
        setMissionTitle(data.missionTitle ?? "")
        setMissionContent(data.missionContent ?? "")
        setAmbitionTitle(data.ambitionTitle ?? "")
        setAmbitionContent(data.ambitionContent ?? "")
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [])

  const handleSectionImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSectionImageFile(file)
      setSectionImagePreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const formData = new FormData()
      formData.append("bannerHeading", bannerHeading.trim())
      formData.append("bannerSubheading", bannerSubheading.trim())
      formData.append("sectionHeading", sectionHeading.trim())
      formData.append("sectionContentParagraph1", sectionContentParagraph1.trim())
      formData.append("sectionContentParagraph2", sectionContentParagraph2.trim())
      formData.append("visionTitle", visionTitle.trim())
      formData.append("visionContent", visionContent.trim())
      formData.append("missionTitle", missionTitle.trim())
      formData.append("missionContent", missionContent.trim())
      formData.append("ambitionTitle", ambitionTitle.trim())
      formData.append("ambitionContent", ambitionContent.trim())
      if (sectionImageFile) formData.append("sectionImage", sectionImageFile)

      const result = await updateAboutPage(formData)
      if (result.success) {
        toast.success("About page updated successfully.")
        setSectionImageFile(null)
        const updated = await getAboutPage()
        if (updated) {
          setBannerHeading(updated.bannerHeading ?? "")
          setBannerSubheading(updated.bannerSubheading ?? "")
          setSectionImagePreview(updated.sectionImage || null)
          setSectionHeading(updated.sectionHeading ?? "")
          setSectionContentParagraph1(updated.sectionContentParagraph1 ?? "")
          setSectionContentParagraph2(updated.sectionContentParagraph2 ?? "")
          setVisionTitle(updated.visionTitle ?? "")
          setVisionContent(updated.visionContent ?? "")
          setMissionTitle(updated.missionTitle ?? "")
          setMissionContent(updated.missionContent ?? "")
          setAmbitionTitle(updated.ambitionTitle ?? "")
          setAmbitionContent(updated.ambitionContent ?? "")
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
          <h2 className="text-xl font-semibold text-foreground">About Us Page</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage banner, section image & content, and Vision, Mission, Ambition cards.
          </p>
        </div>
        <AboutPageSkeleton />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground">About Us Page</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage banner, section image & content, and Vision, Mission, Ambition cards.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Banner */}
        <div className="space-y-4 rounded-lg border border-border bg-card p-4">
          <h3 className="text-sm font-semibold text-foreground">Banner</h3>
          <div className="space-y-2">
            <label htmlFor="banner-heading" className={labelClass}>
              Banner heading
            </label>
            <input
              id="banner-heading"
              type="text"
              value={bannerHeading}
              onChange={(e) => setBannerHeading(e.target.value)}
              placeholder="About Procure Export"
              className={inputClass}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="banner-subheading" className={labelClass}>
              Banner subheading
            </label>
            <textarea
              id="banner-subheading"
              value={bannerSubheading}
              onChange={(e) => setBannerSubheading(e.target.value)}
              rows={2}
              placeholder="We are a trusted import-export company..."
              className={inputClass}
            />
          </div>
        </div>

        {/* Section: image + content */}
        <div className="space-y-4 rounded-lg border border-border bg-card p-4">
          <h3 className="text-sm font-semibold text-foreground">Main section (image & content)</h3>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-3">
              <label className={labelClass}>Section image (left)</label>
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-border bg-muted">
                {sectionImagePreview ? (
                  <Image
                    src={sectionImagePreview}
                    alt="Section preview"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    unoptimized={
                      sectionImagePreview.startsWith("blob:") ||
                      sectionImagePreview.includes("localhost")
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
                onChange={handleSectionImageChange}
                className="block w-full text-sm text-foreground file:mr-3 file:rounded-md file:border-0 file:bg-[var(--color-primary-purple)] file:px-4 file:py-2 file:text-sm file:font-medium file:text-white file:hover:bg-[var(--color-primary-purple-hover)]"
              />
              <p className="text-xs text-muted-foreground">Leave empty to keep the current image.</p>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="section-heading" className={labelClass}>
                  Section heading
                </label>
                <input
                  id="section-heading"
                  type="text"
                  value={sectionHeading}
                  onChange={(e) => setSectionHeading(e.target.value)}
                  placeholder="About Procure Export"
                  className={inputClass}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="section-p1" className={labelClass}>
                  Content (paragraph 1)
                </label>
                <textarea
                  id="section-p1"
                  value={sectionContentParagraph1}
                  onChange={(e) => setSectionContentParagraph1(e.target.value)}
                  rows={4}
                  placeholder="Procure Export connects global buyers..."
                  className={inputClass}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="section-p2" className={labelClass}>
                  Content (paragraph 2)
                </label>
                <textarea
                  id="section-p2"
                  value={sectionContentParagraph2}
                  onChange={(e) => setSectionContentParagraph2(e.target.value)}
                  rows={4}
                  placeholder="Built on trust and transparency..."
                  className={inputClass}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Vision, Mission, Ambition cards */}
        <div className="space-y-4 rounded-lg border border-border bg-card p-4">
          <h3 className="text-sm font-semibold text-foreground">Vision, Mission & Ambition (3 cards)</h3>
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="space-y-3 rounded-lg border border-border bg-muted/30 p-4">
              <label htmlFor="vision-title" className={labelClass}>Vision title</label>
              <input
                id="vision-title"
                type="text"
                value={visionTitle}
                onChange={(e) => setVisionTitle(e.target.value)}
                placeholder="Vision"
                className={inputClass}
              />
              <label htmlFor="vision-content" className={labelClass}>Vision content</label>
              <textarea
                id="vision-content"
                value={visionContent}
                onChange={(e) => setVisionContent(e.target.value)}
                rows={3}
                placeholder="To redefine agricultural exports..."
                className={inputClass}
              />
            </div>
            <div className="space-y-3 rounded-lg border border-border bg-muted/30 p-4">
              <label htmlFor="mission-title" className={labelClass}>Mission title</label>
              <input
                id="mission-title"
                type="text"
                value={missionTitle}
                onChange={(e) => setMissionTitle(e.target.value)}
                placeholder="Mission"
                className={inputClass}
              />
              <label htmlFor="mission-content" className={labelClass}>Mission content</label>
              <textarea
                id="mission-content"
                value={missionContent}
                onChange={(e) => setMissionContent(e.target.value)}
                rows={3}
                placeholder="To provide reliable export solutions..."
                className={inputClass}
              />
            </div>
            <div className="space-y-3 rounded-lg border border-border bg-muted/30 p-4">
              <label htmlFor="ambition-title" className={labelClass}>Ambition title</label>
              <input
                id="ambition-title"
                type="text"
                value={ambitionTitle}
                onChange={(e) => setAmbitionTitle(e.target.value)}
                placeholder="Ambition"
                className={inputClass}
              />
              <label htmlFor="ambition-content" className={labelClass}>Ambition content</label>
              <textarea
                id="ambition-content"
                value={ambitionContent}
                onChange={(e) => setAmbitionContent(e.target.value)}
                rows={3}
                placeholder="To rapidly expand our global export footprint..."
                className={inputClass}
              />
            </div>
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
