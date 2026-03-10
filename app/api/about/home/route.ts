import { NextResponse } from "next/server"

const getBaseUrl = () =>
  process.env.BACKEND_URL || "http://localhost:5020"

export async function GET() {
  try {
    const baseUrl = getBaseUrl().replace(/\/$/, "")
    const res = await fetch(`${baseUrl}/api/about/home`, { cache: "no-store" })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) {
      return NextResponse.json(data, { status: res.status })
    }
    return NextResponse.json(data)
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch about home" },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const baseUrl = getBaseUrl().replace(/\/$/, "")
    const formData = await request.formData()
    const res = await fetch(`${baseUrl}/api/about/home`, {
      method: "PUT",
      body: formData,
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) {
      return NextResponse.json(data, { status: res.status })
    }
    return NextResponse.json(data)
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "Failed to update about home" },
      { status: 500 }
    )
  }
}
