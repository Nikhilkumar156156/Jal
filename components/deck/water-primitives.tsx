"use client"

import { motion } from "motion/react"
import type { CSSProperties } from "react"

/* A single stylized 3D-style water droplet (SVG). */
export function WaterDrop({
  size = 24,
  className = "",
  style,
}: {
  size?: number
  className?: string
  style?: CSSProperties
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 52"
      fill="none"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="dropFill" cx="38%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#e8feff" />
          <stop offset="35%" stopColor="#4de7d2" />
          <stop offset="75%" stopColor="#00a9c7" />
          <stop offset="100%" stopColor="#063b5c" />
        </radialGradient>
      </defs>
      <path
        d="M20 1C20 1 3 22 3 33.5C3 43.7 10.6 51 20 51C29.4 51 37 43.7 37 33.5C37 22 20 1 20 1Z"
        fill="url(#dropFill)"
      />
      <ellipse cx="14" cy="30" rx="5" ry="8" fill="#ffffff" opacity="0.55" />
    </svg>
  )
}

/* Expanding concentric ripple rings. */
export function Ripple({
  className = "",
  count = 3,
  color = "rgba(77,231,210,0.5)",
}: {
  className?: string
  count?: number
  color?: string
}) {
  return (
    <div className={`pointer-events-none ${className}`} aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border"
          style={{
            borderColor: color,
            animation: `ripple-expand 4s ease-out ${i * 1.3}s infinite`,
          }}
        />
      ))}
    </div>
  )
}

/* A layered animated wave ribbon — the recurring visual motif. */
export function WaveRibbon({
  className = "",
  opacity = 1,
}: {
  className?: string
  opacity?: number
}) {
  return (
    <div
      className={`pointer-events-none overflow-hidden ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      <div className="animate-wave-drift flex w-[200%]">
        <WaveSvg />
        <WaveSvg />
      </div>
    </div>
  )
}

function WaveSvg() {
  return (
    <svg viewBox="0 0 1200 120" className="h-full w-1/2 shrink-0" preserveAspectRatio="none">
      <defs>
        <linearGradient id="waveGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#00a9c7" stopOpacity="0.55" />
          <stop offset="50%" stopColor="#4de7d2" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#00a9c7" stopOpacity="0.55" />
        </linearGradient>
      </defs>
      <path
        d="M0,60 C150,20 300,100 450,60 C600,20 750,100 900,60 C1050,20 1200,100 1200,60 L1200,120 L0,120 Z"
        fill="url(#waveGrad)"
      />
    </svg>
  )
}

/* Ambient floating bubbles that drift up the slide. */
export function FloatingBubbles({ count = 14 }: { count?: number }) {
  const bubbles = Array.from({ length: count }).map((_, i) => ({
    id: i,
    left: `${(i * 37) % 100}%`,
    size: 4 + ((i * 7) % 14),
    delay: (i % 6) * 1.5,
    duration: 10 + ((i * 3) % 12),
  }))
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {bubbles.map((b) => (
        <motion.span
          key={b.id}
          className="absolute rounded-full"
          style={{
            left: b.left,
            width: b.size,
            height: b.size,
            background: "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.8), rgba(77,231,210,0.15))",
            boxShadow: "0 0 8px rgba(77,231,210,0.4)",
          }}
          initial={{ y: "110%", opacity: 0 }}
          animate={{ y: "-15%", opacity: [0, 0.7, 0] }}
          transition={{
            duration: b.duration,
            delay: b.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

/* Full-slide gradient + noise base shared by every slide. */
export function SlideBase({
  children,
  gradient = "radial-gradient(120% 120% at 20% 0%, #063b5c 0%, #041b2d 55%, #020f1a 100%)",
}: {
  children?: React.ReactNode
  gradient?: string
}) {
  return (
    <div className="absolute inset-0" style={{ background: gradient }}>
      {children}
      <div className="noise" />
    </div>
  )
}
