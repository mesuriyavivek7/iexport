import { NextResponse } from "next/server"

const getBaseUrl = () =>
  process.env.BACKEND_URL || "http://localhost:5020"

export async function GET() {
  try {
    const baseUrl = getBaseUrl().replace(/\/$/, "")
    const res = await fetch(`${baseUrl}/api/categories`, { cache: "no-store" })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) {
      return NextResponse.json(data, { status: res.status })
    }
    return NextResponse.json(data)
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch categories" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const baseUrl = getBaseUrl().replace(/\/$/, "")
    const formData = await request.formData()
    const res = await fetch(`${baseUrl}/api/categories`, {
      method: "POST",
      body: formData,
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) {
      return NextResponse.json(data, { status: res.status })
    }
    return NextResponse.json(data)
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "Failed to create category" },
      { status: 500 }
    )
  }
}
