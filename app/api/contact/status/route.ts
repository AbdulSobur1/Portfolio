import { NextResponse } from "next/server"

export async function GET() {
  const hasResendKey = Boolean(process.env.RESEND_API_KEY)
  const hasResendFrom = Boolean(process.env.RESEND_FROM)

  return NextResponse.json({
    ok: true,
    providers: {
      resend: {
        configured: hasResendKey && hasResendFrom,
      },
    },
  })
}
