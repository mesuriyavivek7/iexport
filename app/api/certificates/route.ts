import { NextResponse } from "next/server"

const getBaseUrl = () =>
  process.env.BACKEND_URL || "http://localhost:5020"

export async function GET() {
  try {
    const baseUrl = getBaseUrl().replace(/\/$/, "")
    const res = await fetch(`${baseUrl}/api/certificates`, { cache: "no-store" })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) {
      return NextResponse.json(data, { status: res.status })
    }
    return NextResponse.json(data)
  } catch {
    return NextResponse.json(
      { success: false, message: "Failed to fetch certificates" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const baseUrl = getBaseUrl().replace(/\/$/, "")
    const formData = await request.formData()
    const res = await fetch(`${baseUrl}/api/certificates`, {
      method: "POST",
      body: formData,
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) {
      return NextResponse.json(data, { status: res.status })
    }
    return NextResponse.json(data)
  } catch {
    return NextResponse.json(
      { success: false, message: "Failed to create certificate" },
      { status: 500 }
    )
  }
}
