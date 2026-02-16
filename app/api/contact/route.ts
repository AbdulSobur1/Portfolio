import { NextResponse } from "next/server"

const CONTACT_EMAIL = "abdullahabdulsobur@gmail.com"

export async function POST(request: Request) {
  try {
    const { name, email, message } = (await request.json()) as {
      name?: string
      email?: string
      message?: string
    }

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { success: false, message: "All fields are required." },
        { status: 400 }
      )
    }

    const origin = request.headers.get("origin") ?? ""
    const referer = request.headers.get("referer") ?? origin

    const response = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "User-Agent": "PortfolioContact/1.0",
        ...(origin ? { Origin: origin } : {}),
        ...(referer ? { Referer: referer } : {}),
      },
      body: JSON.stringify({
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
        _subject: "New portfolio contact message",
        _captcha: "false",
      }),
      cache: "no-store",
    })

    const raw = await response.text()
    let data: {
      success?: string | boolean
      message?: string
    } = {}

    try {
      data = JSON.parse(raw) as {
        success?: string | boolean
        message?: string
      }
    } catch {
      data = {
        message: raw.slice(0, 240),
      }
    }

    if (!response.ok || (data.success !== true && data.success !== "true")) {
      return NextResponse.json(
        {
          success: false,
          message:
            data.message ||
            `Contact provider error (${response.status} ${response.statusText}).`,
        },
        { status: 502 }
      )
    }

    return NextResponse.json({
      success: true,
      message: "The form was submitted successfully.",
    })
  } catch {
    return NextResponse.json(
      { success: false, message: "Unexpected error while sending message." },
      { status: 500 }
    )
  }
}
