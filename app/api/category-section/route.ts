import { NextResponse } from "next/server"

const getBaseUrl = () =>
  process.env.BACKEND_URL || "http://localhost:5020"

export async function GET() {
  try {
    const baseUrl = getBaseUrl().replace(/\/$/, "")
    const res = await fetch(`${baseUrl}/api/category-section`, { cache: "no-store" })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) {
      return NextResponse.json(data, { status: res.status })
    }
    return NextResponse.json(data)
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch category section" },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const baseUrl = getBaseUrl().replace(/\/$/, "")
    const body = await request.json()
    const res = await fetch(`${baseUrl}/api/category-section`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) {
      return NextResponse.json(data, { status: res.status })
    }
    return NextResponse.json(data)
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "Failed to update category section" },
      { status: 500 }
    )
  }
}
