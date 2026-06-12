export function AmbientOrbs({ opacity = '0.06' }: { opacity?: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div className="orb-1 absolute -top-32 -left-32 w-96 h-96 bg-emerald-300 rounded-full blur-3xl"
        style={{ opacity }} />
      <div className="orb-2 absolute top-1/2 -right-48 w-80 h-80 bg-emerald-400 rounded-full blur-3xl"
        style={{ opacity }} />
      <div className="orb-3 absolute -bottom-24 left-1/3 w-64 h-64 bg-teal-300 rounded-full blur-3xl"
        style={{ opacity: String(Number(opacity) * 0.6) }} />
    </div>
  )
}
