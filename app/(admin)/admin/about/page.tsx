"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import { useAboutPage, useUpdateAboutPage } from "@/hooks"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

const sk = "animate-pulse bg-gray-300"
const inputClass =
  "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-[var(--color-primary-purple)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary-purple)]"
const labelClass = "block text-sm font-medium text-foreground"

function AboutPageSkeleton() {
  return (
    <div className="space-y-6">
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
          {[1, 2, 3, 4].map((i) => <div key={i} className={`h-10 w-full rounded-lg ${sk}`} />)}
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className={`rounded-lg border border-border p-4 h-40 ${sk}`} />
        ))}
      </div>
    </div>
  )
}

export default function AboutPageAdmin() {
  const { data, isLoading } = useAboutPage()
  const updateAboutPage = useUpdateAboutPage()

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
    if (!data) return
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
  }, [data])

  useEffect(() => {
    if (updateAboutPage.isSuccess) setSectionImageFile(null)
  }, [updateAboutPage.isSuccess])

  const handleSectionImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) { setSectionImageFile(file); setSectionImagePreview(URL.createObjectURL(file)) }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
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
    updateAboutPage.mutate(formData)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground">About Us Page</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage banner, section image & content, and Vision, Mission, Ambition cards.
        </p>
      </div>

      {isLoading ? (
        <AboutPageSkeleton />
      ) : (
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Banner */}
          <div className="space-y-4 rounded-lg border border-border bg-card p-4">
            <h3 className="text-sm font-semibold text-foreground">Banner</h3>
            <div className="space-y-2">
              <label htmlFor="banner-heading" className={labelClass}>Banner heading</label>
              <input id="banner-heading" type="text" value={bannerHeading} onChange={(e) => setBannerHeading(e.target.value)} placeholder="About Procure Export" className={inputClass} />
            </div>
            <div className="space-y-2">
              <label htmlFor="banner-subheading" className={labelClass}>Banner subheading</label>
              <textarea id="banner-subheading" value={bannerSubheading} onChange={(e) => setBannerSubheading(e.target.value)} rows={2} placeholder="We are a trusted import-export company..." className={inputClass} />
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
                    <Image src={sectionImagePreview} alt="Section preview" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" unoptimized={sectionImagePreview.startsWith("blob:") || sectionImagePreview.includes("localhost")} />
                  ) : (
                    <div className="flex h-full items-center justify-center text-muted-foreground">No image</div>
                  )}
                </div>
                <input type="file" accept="image/*" onChange={handleSectionImageChange} className="block w-full text-sm text-foreground file:mr-3 file:rounded-md file:border-0 file:bg-[var(--color-primary-purple)] file:px-4 file:py-2 file:text-sm file:font-medium file:text-white file:hover:bg-[var(--color-primary-purple-hover)]" />
                <p className="text-xs text-muted-foreground">Leave empty to keep the current image.</p>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="section-heading" className={labelClass}>Section heading</label>
                  <input id="section-heading" type="text" value={sectionHeading} onChange={(e) => setSectionHeading(e.target.value)} placeholder="About Procure Export" className={inputClass} />
                </div>
                <div className="space-y-2">
                  <label htmlFor="section-p1" className={labelClass}>Content (paragraph 1)</label>
                  <textarea id="section-p1" value={sectionContentParagraph1} onChange={(e) => setSectionContentParagraph1(e.target.value)} rows={4} placeholder="Procure Export connects global buyers..." className={inputClass} />
                </div>
                <div className="space-y-2">
                  <label htmlFor="section-p2" className={labelClass}>Content (paragraph 2)</label>
                  <textarea id="section-p2" value={sectionContentParagraph2} onChange={(e) => setSectionContentParagraph2(e.target.value)} rows={4} placeholder="Built on trust and transparency..." className={inputClass} />
                </div>
              </div>
            </div>
          </div>

          {/* Vision, Mission, Ambition */}
          <div className="space-y-4 rounded-lg border border-border bg-card p-4">
            <h3 className="text-sm font-semibold text-foreground">Vision, Mission & Ambition (3 cards)</h3>
            <div className="grid gap-6 sm:grid-cols-3">
              {[
                { key: "vision", title: visionTitle, setTitle: setVisionTitle, content: visionContent, setContent: setVisionContent, placeholder: "Vision", contentPlaceholder: "To redefine agricultural exports..." },
                { key: "mission", title: missionTitle, setTitle: setMissionTitle, content: missionContent, setContent: setMissionContent, placeholder: "Mission", contentPlaceholder: "To provide reliable export solutions..." },
                { key: "ambition", title: ambitionTitle, setTitle: setAmbitionTitle, content: ambitionContent, setContent: setAmbitionContent, placeholder: "Ambition", contentPlaceholder: "To rapidly expand our global export footprint..." },
              ].map(({ key, title, setTitle, content, setContent, placeholder, contentPlaceholder }) => (
                <div key={key} className="space-y-3 rounded-lg border border-border bg-muted/30 p-4">
                  <label htmlFor={`${key}-title`} className={labelClass}>{placeholder} title</label>
                  <input id={`${key}-title`} type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder={placeholder} className={inputClass} />
                  <label htmlFor={`${key}-content`} className={labelClass}>{placeholder} content</label>
                  <textarea id={`${key}-content`} value={content} onChange={(e) => setContent(e.target.value)} rows={3} placeholder={contentPlaceholder} className={inputClass} />
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-3 border-t border-border pt-6">
            <Button type="submit" disabled={updateAboutPage.isPending} className="gap-2 bg-[var(--color-primary-purple)] hover:bg-[var(--color-primary-purple-hover)]">
              {updateAboutPage.isPending ? <><Loader2 className="size-4 shrink-0 animate-spin" /><span>Saving…</span></> : "Save changes"}
            </Button>
          </div>
        </form>
      )}
    </div>
  )
}
