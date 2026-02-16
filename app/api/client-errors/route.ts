import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const payload = await request.json()
    console.error("ClientError", payload)
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ success: false }, { status: 400 })
  }
}

