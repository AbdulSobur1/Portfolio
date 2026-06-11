import { cn } from '@/lib/utils'

interface AmbientOrbsProps {
  variant?: 'default' | 'subtle'
}

export function AmbientOrbs({ variant = 'default' }: AmbientOrbsProps) {
  const opacity = variant === 'subtle' ? 'opacity-[0.04]' : 'opacity-[0.07]'
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div className={cn(
        'orb-1 absolute -top-32 -left-32 w-96 h-96 bg-emerald-300 rounded-full blur-3xl',
        opacity
      )} />
      <div className={cn(
        'orb-2 absolute top-1/2 -right-48 w-80 h-80 bg-emerald-400 rounded-full blur-3xl',
        opacity
      )} />
      <div className={cn(
        'orb-3 absolute -bottom-24 left-1/3 w-72 h-72 bg-teal-300 rounded-full blur-3xl',
        'opacity-[0.04]'
      )} />
    </div>
  )
}
