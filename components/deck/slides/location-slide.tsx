"use client"

import { motion } from "motion/react"
import { SlideBase, FloatingBubbles, WaterDrop } from "../water-primitives"
import { PhotoPlaceholder } from "../photo-placeholder"
import type { LocationSlideData } from "@/lib/location-data"

export function LocationSlide({ data }: { data: LocationSlideData }) {
  const { week, name, activity, lead, Icon, focus, note, gradient, photos } = data
  const hero = photos.find((p) => p.span === "hero") ?? photos[0]
  const halves = photos.filter((p) => p.span === "half")

  return (
    <div className="relative h-full w-full overflow-hidden">
      <SlideBase gradient={gradient}>
        <FloatingBubbles count={8} />
      </SlideBase>

      <div className="relative z-10 grid h-full w-full grid-cols-1 gap-6 px-6 pt-14 pb-24 md:px-14 md:pt-16 lg:grid-cols-[1fr_1.15fr] lg:items-center lg:gap-10">
        {/* Left — narrative column */}
        <div className="flex flex-col">
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="glass rounded-full px-3 py-1 font-display text-[11px] tracking-[0.3em] text-turquoise/90 uppercase">
              Week {week}
            </span>
            <span className="text-[11px] tracking-[0.3em] text-white/45 uppercase font-display">{activity}</span>
          </motion.div>

          <motion.h2
            className="mt-4 font-display text-3xl font-bold leading-[1.05] tracking-tight text-white md:text-5xl"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            {name}
          </motion.h2>

          <motion.p
            className="mt-3 max-w-md text-sm leading-relaxed text-white/65 md:text-base"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.35 }}
          >
            {lead}
          </motion.p>

          <div className="mt-6 flex flex-col gap-2.5">
            {focus.map((f, i) => (
              <motion.div
                key={f}
                className="glass flex items-center gap-3 rounded-xl px-3.5 py-2.5"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full glass-strong text-turquoise glow-aqua">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="text-sm text-white/85">{f}</span>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-6 flex items-center gap-2 text-[11px] tracking-[0.25em] text-aqua/70 uppercase font-display"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            <WaterDrop size={14} />
            {note}
          </motion.div>
        </div>

        {/* Right — layered photo composition */}
        <div className="grid h-[68vh] max-h-[580px] w-full grid-cols-2 grid-rows-[1.4fr_1fr] gap-3 md:gap-4">
          <motion.div
            className="col-span-2 h-full w-full min-h-0 overflow-hidden"
            initial={{ opacity: 0, y: 30, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <PhotoPlaceholder label={hero.label} src={hero.src} className="h-full w-full" />
          </motion.div>

          {halves.map((h, i) => (
            <motion.div
              key={h.label}
              className="h-full w-full min-h-0 overflow-hidden"
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.7 + i * 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <PhotoPlaceholder label={h.label} src={h.src} rotate={i === 0 ? -1.5 : 1.5} className="h-full w-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
