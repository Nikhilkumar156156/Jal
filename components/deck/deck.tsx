"use client"

import { useCallback, useEffect, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { TOTAL_SLIDES } from "@/lib/deck-data"
import { WaveRibbon } from "./water-primitives"
import { Slide01 } from "./slides/slide-01"
import { Slide02 } from "./slides/slide-02"
import { Slide03 } from "./slides/slide-03"
import { Slide04 } from "./slides/slide-04"
import { SlideCanary } from "./slides/slide-canary"
import { SlideBiodiversity } from "./slides/slide-biodiversity"
import { SlideNursery } from "./slides/slide-nursery"
import { SlideSalfarni } from "./slides/slide-salfarni"
import { Slide05 } from "./slides/slide-05"
import { Slide06 } from "./slides/slide-06"
import { Slide07 } from "./slides/slide-07"
import { Slide08 } from "./slides/slide-08"

const SLIDES = [
  Slide01,
  Slide02,
  Slide03,
  Slide04,
  SlideCanary,
  SlideBiodiversity,
  SlideNursery,
  SlideSalfarni,
  Slide05,
  Slide06,
  Slide07,
  Slide08,
]

const SLIDE_LABELS = [
  "Opening",
  "Team & Mission",
  "The Journey",
  "Field Experience",
  "Canary Hill",
  "Biodiversity Park",
  "Nursery",
  "Salfarni Waterfall",
  "Insights",
  "The Problem",
  "The Solution",
  "Commitment",
]

export function Deck() {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)

  const go = useCallback(
    (next: number) => {
      setIndex((cur) => {
        const clamped = Math.max(0, Math.min(TOTAL_SLIDES - 1, next))
        setDirection(clamped >= cur ? 1 : -1)
        return clamped
      })
    },
    [],
  )

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
        e.preventDefault()
        go(index + 1)
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault()
        go(index - 1)
      } else if (e.key === "Home") {
        go(0)
      } else if (e.key === "End") {
        go(TOTAL_SLIDES - 1)
      }
    }
    window.addEventListener("keydown", onKey)
    ;(window as any).__goToSlide = (n: number) => go(n)
    return () => {
      window.removeEventListener("keydown", onKey)
      delete (window as any).__goToSlide
    }
  }, [index, go])

  const ActiveSlide = SLIDES[index]

  return (
    <main className="relative h-[100dvh] w-screen overflow-hidden bg-abyss text-white select-none">
      {/* Slide stage */}
      <AnimatePresence mode="popLayout" custom={direction} initial={false}>
        <motion.section
          key={index}
          custom={direction}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.06, filter: "blur(12px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 0.96, filter: "blur(12px)" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <ActiveSlide />
        </motion.section>
      </AnimatePresence>

      {/* Persistent water-flow motif connecting every slide */}
      <WaveRibbon
        className="absolute bottom-0 left-0 h-16 w-full md:h-20"
        opacity={0.5}
      />

      {/* Progress rail */}
      <div className="pointer-events-none absolute left-0 right-0 top-0 z-30 flex items-center gap-1.5 px-4 pt-4 md:px-8">
        {SLIDES.map((_, i) => (
          <div key={i} className="h-1 flex-1 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-aqua to-turquoise"
              initial={false}
              animate={{ width: i <= index ? "100%" : "0%" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          </div>
        ))}
      </div>

      {/* Bottom-right control cluster */}
      <div className="absolute bottom-5 right-4 z-30 flex items-center gap-3 md:bottom-7 md:right-8">
        <div className="glass hidden rounded-full px-4 py-2 text-xs tracking-[0.25em] text-turquoise/90 uppercase sm:block font-display">
          {String(index + 1).padStart(2, "0")} / {String(TOTAL_SLIDES).padStart(2, "0")}
          <span className="mx-2 text-white/30">·</span>
          <span className="text-white/70">{SLIDE_LABELS[index]}</span>
        </div>
        <button
          onClick={() => go(index - 1)}
          disabled={index === 0}
          aria-label="Previous slide"
          className="glass grid h-11 w-11 place-items-center rounded-full text-white/90 transition hover:text-turquoise disabled:opacity-30"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={() => go(index + 1)}
          disabled={index === TOTAL_SLIDES - 1}
          aria-label="Next slide"
          className="glass grid h-11 w-11 place-items-center rounded-full text-white/90 transition hover:text-turquoise disabled:opacity-30 glow-aqua"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Left hint */}
      <div className="pointer-events-none absolute bottom-6 left-6 z-30 hidden text-[10px] tracking-[0.3em] text-white/35 uppercase md:block font-display">
        Use ← → or Space to navigate
      </div>
    </main>
  )
}
