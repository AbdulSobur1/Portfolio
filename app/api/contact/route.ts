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

    const response = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
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

    const data = (await response.json()) as {
      success?: string | boolean
      message?: string
    }

    if (!response.ok || (data.success !== true && data.success !== "true")) {
      return NextResponse.json(
        {
          success: false,
          message: data.message || "Could not send message right now.",
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

