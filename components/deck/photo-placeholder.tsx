"use client"

import { useState, useMemo } from "react"
import { Camera } from "lucide-react"

/* Generates candidate URLs to handle Windows hidden extensions (.jpg.jpeg, .jpeg, .png, etc.) */
function getCandidateUrls(baseSrc?: string): string[] {
  if (!baseSrc) return []
  const withoutExt = baseSrc.replace(/\.(jpe?g|png|webp|avif)(\.jpe?g|\.png)?$/i, "")
  return Array.from(
    new Set([
      baseSrc,
      `${withoutExt}.jpg`,
      `${withoutExt}.jpeg`,
      `${withoutExt}.jpg.jpeg`,
      `${withoutExt}.jpeg.jpg`,
      `${withoutExt}.png`,
      `${withoutExt}.webp`,
      `${withoutExt}.JPG`,
      `${withoutExt}.JPEG`,
      `${withoutExt}.PNG`,
    ])
  )
}

/* A stylish, on-brand field-photo placeholder — a glass frame that gracefully displays real photos or camera placeholder */
export function PhotoPlaceholder({
  label,
  caption,
  src,
  className = "",
  rotate = 0,
}: {
  label: string
  caption?: string
  src?: string
  className?: string
  rotate?: number
}) {
  const candidateUrls = useMemo(() => getCandidateUrls(src), [src])
  const [candidateIdx, setCandidateIdx] = useState(0)
  const [hasError, setHasError] = useState(false)

  const currentUrl = candidateUrls[candidateIdx]
  const showImage = Boolean(currentUrl && !hasError)

  const handleImageError = () => {
    if (candidateIdx < candidateUrls.length - 1) {
      setCandidateIdx((prev) => prev + 1)
    } else {
      setHasError(true)
    }
  }

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl glass-strong border border-border-aqua/50 shadow-lg transition-transform duration-300 ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {showImage ? (
        /* Real Photo View */
        <div className="relative h-full w-full overflow-hidden">
          <img
            src={currentUrl}
            alt={label}
            onError={handleImageError}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Subtle gradient overlay for readability and tone */}
          <div className="absolute inset-0 bg-gradient-to-t from-abyss/85 via-abyss/20 to-transparent pointer-events-none" />

          {/* Bottom badge */}
          <div className="absolute bottom-3 left-3 right-3 z-10">
            <p className="font-display text-[11px] font-bold tracking-[0.2em] text-white uppercase drop-shadow-md">
              {label}
            </p>
            {caption ? (
              <p className="text-[10px] leading-tight text-white/70 drop-shadow-sm">{caption}</p>
            ) : null}
          </div>
        </div>
      ) : (
        /* Camera Placeholder View */
        <>
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(120% 120% at 20% 10%, rgba(0,169,199,0.28), transparent 55%), linear-gradient(160deg, rgba(6,59,92,0.5), rgba(4,27,45,0.75))",
            }}
          />
          <div className="relative flex h-full w-full flex-col items-center justify-center gap-2 p-4 text-center">
            <div className="grid h-11 w-11 place-items-center rounded-full glass glow-aqua transition group-hover:scale-110">
              <Camera className="h-5 w-5 text-turquoise" />
            </div>
            <p className="font-display text-[11px] font-semibold tracking-[0.25em] text-white/90 uppercase">
              {label}
            </p>
            <p className="text-[10px] tracking-[0.3em] text-turquoise/70 uppercase">Insert Field Photo</p>
            {caption ? <p className="mt-1 max-w-[16ch] text-[11px] leading-snug text-white/50">{caption}</p> : null}
          </div>
        </>
      )}

      {/* corner ticks like a camera viewfinder */}
      {["left-3 top-3", "right-3 top-3", "left-3 bottom-3", "right-3 bottom-3"].map((pos, i) => (
        <span
          key={i}
          className={`pointer-events-none absolute ${pos} h-4 w-4 border-turquoise/60`}
          style={{
            borderTopWidth: pos.includes("top") ? 2 : 0,
            borderBottomWidth: pos.includes("bottom") ? 2 : 0,
            borderLeftWidth: pos.includes("left") ? 2 : 0,
            borderRightWidth: pos.includes("right") ? 2 : 0,
          }}
        />
      ))}
    </div>
  )
}
