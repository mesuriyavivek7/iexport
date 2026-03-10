import { NextResponse } from "next/server"

const getBaseUrl = () =>
  process.env.BACKEND_URL || "http://localhost:5020"

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const baseUrl = getBaseUrl().replace(/\/$/, "")
    const formData = await request.formData()
    const res = await fetch(`${baseUrl}/api/products/${id}`, {
      method: "PUT",
      body: formData,
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) {
      return NextResponse.json(data, { status: res.status })
    }
    return NextResponse.json(data)
  } catch {
    return NextResponse.json(
      { success: false, message: "Failed to update product" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const baseUrl = getBaseUrl().replace(/\/$/, "")
    const res = await fetch(`${baseUrl}/api/products/${id}`, {
      method: "DELETE",
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) {
      return NextResponse.json(data, { status: res.status })
    }
    return NextResponse.json(data)
  } catch {
    return NextResponse.json(
      { success: false, message: "Failed to delete product" },
      { status: 500 }
    )
  }
}
