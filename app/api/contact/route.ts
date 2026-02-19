import { NextResponse } from "next/server"

const CONTACT_EMAIL = "abdullahabdulsobur@gmail.com"
const RESEND_API_URL = "https://api.resend.com/emails"

function createReferenceId() {
  const rand = Math.random().toString(36).slice(2, 8).toUpperCase()
  return `MSG-${Date.now().toString().slice(-6)}-${rand}`
}

async function sendWithResend({
  name,
  email,
  message,
  referenceId,
}: {
  name: string
  email: string
  message: string
  referenceId: string
}) {
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.RESEND_FROM

  if (!apiKey || !from) {
    return { ok: false as const, message: "Resend is not configured on this deployment." }
  }

  const response = await fetch(RESEND_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [CONTACT_EMAIL],
      subject: `New portfolio message (${referenceId})`,
      reply_to: email,
      text: [
        `Reference ID: ${referenceId}`,
        `Name: ${name}`,
        `Email: ${email}`,
        "",
        "Message:",
        message,
      ].join("\n"),
      html: `
        <div>
          <p><strong>Reference ID:</strong> ${referenceId}</p>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, "<br />")}</p>
        </div>
      `,
    }),
    cache: "no-store",
  })

  if (response.ok) {
    return { ok: true as const }
  }

  const raw = await response.text()
  return { ok: false as const, message: raw.slice(0, 240) }
}

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

    const referenceId = createReferenceId()
    const trimmed = {
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
    }

    const resend = await sendWithResend({ ...trimmed, referenceId })
    if (!resend.ok) {
      return NextResponse.json(
        {
          success: false,
          message:
            resend.message ||
            "Resend delivery failed. Confirm RESEND_API_KEY and RESEND_FROM.",
        },
        { status: 502 }
      )
    }

    return NextResponse.json({
      success: true,
      message: "The form was submitted successfully.",
      referenceId,
      delivery: "resend",
    })
  } catch {
    return NextResponse.json(
      { success: false, message: "Unexpected error while sending message." },
      { status: 500 }
    )
  }
}
