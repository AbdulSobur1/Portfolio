import { ImageResponse } from "next/og"

export const runtime = "edge"

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "linear-gradient(135deg, #030712 0%, #0a1110 100%)",
          color: "#f8fafc",
          padding: 80,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 28, color: "#34d399", marginBottom: 20 }}>SoburrX</div>
        <div style={{ fontSize: 64, lineHeight: 1.1, fontWeight: 700, maxWidth: 900 }}>
          Junior Full Stack Engineer
        </div>
        <div style={{ fontSize: 30, opacity: 0.85, marginTop: 18 }}>
          Abdullah Oladimeji Abdulsobur
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}

