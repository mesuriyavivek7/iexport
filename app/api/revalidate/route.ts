import { revalidatePath, revalidateTag } from "next/cache"
import { NextResponse } from "next/server"

type RevalidateBody = {
  secret: string
  path?: string
  tag?: string
}

/**
 * On-demand revalidation. Call from your backend when CMS content changes.
 *
 * POST /api/revalidate
 * Body: { secret: string, path?: string, tag?: string }
 *
 * - path: revalidate a route (e.g. "/", "/about", "/categories", "/contact")
 * - tag: revalidate all fetches with that tag (e.g. "home", "contact", "categories", "about")
 * - Provide path and/or tag; at least one required.
 */
export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => null)) as RevalidateBody | null
    if (!body || typeof body !== "object" || !body.secret) {
      return NextResponse.json(
        { message: "Missing or invalid body; secret is required." },
        { status: 400 }
      )
    }

    const { secret, path: pathToRevalidate, tag } = body
    const expectedSecret = process.env.REVALIDATE_SECRET

    if (!expectedSecret) {
      return NextResponse.json(
        { message: "Revalidation is not configured (REVALIDATE_SECRET missing)." },
        { status: 503 }
      )
    }

    if (secret !== expectedSecret) {
      return NextResponse.json({ message: "Invalid secret" }, { status: 401 })
    }

    if (!pathToRevalidate && !tag) {
      return NextResponse.json(
        { message: "Provide at least one of path or tag." },
        { status: 400 }
      )
    }

    if (pathToRevalidate) {
      revalidatePath(pathToRevalidate)
    }
    if (tag) {
      revalidateTag(tag)
    }

    return NextResponse.json({
      revalidated: true,
      ...(pathToRevalidate && { path: pathToRevalidate }),
      ...(tag && { tag }),
    })
  } catch {
    return NextResponse.json(
      { message: "Revalidation failed" },
      { status: 500 }
    )
  }
}
