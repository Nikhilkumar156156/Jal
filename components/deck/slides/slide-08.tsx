"use client"

import { motion } from "motion/react"
import Image from "next/image"
import { TEAM } from "@/lib/deck-data"
import { WaterDrop, Ripple, WaveRibbon } from "../water-primitives"

const LINES = ["PROTECT WATER.", "RESTORE NATURE.", "BUILD THE FUTURE."]

export function Slide08() {
  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* nature/water background */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <Image src="/images/final-nature.png" alt="Serene natural water body at dawn" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-abyss/70 via-abyss/40 to-abyss/85" />
      </motion.div>

      {/* Falling droplet */}
      <motion.div
        className="absolute left-1/2 top-0 -translate-x-1/2"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: ["-10%", "38vh"], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 1.6, delay: 0.4, ease: "easeIn" }}
      >
        <WaterDrop size={26} />
      </motion.div>

      {/* Ripple at impact point */}
      <motion.div
        className="absolute left-1/2 top-[42%] h-40 w-40 -translate-x-1/2 -translate-y-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <Ripple count={4} />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6 text-center">
        <div className="mb-6 space-y-1">
          {LINES.map((line, i) => (
            <motion.h1
              key={line}
              className="font-display text-4xl font-bold tracking-tight text-gradient-aqua md:text-7xl"
              initial={{ opacity: 0, y: 26, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.9, delay: 2.3 + i * 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {line}
            </motion.h1>
          ))}
        </div>

        <motion.div
          className="glass-strong flex flex-col items-center rounded-3xl px-10 py-5"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 4.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center gap-2">
            <WaterDrop size={26} className="animate-float" />
            <span className="font-display text-5xl font-bold text-gradient-aqua">JAL</span>
            <span className="font-deva text-2xl text-white/70">जल</span>
          </div>
          <p className="mt-1 text-xs tracking-[0.3em] text-turquoise/80 uppercase font-display">
            4-Week Environmental Leadership Program
          </p>
        </motion.div>

        {/* Team footer */}
        <motion.p
          className="mt-6 max-w-3xl text-[11px] leading-relaxed text-white/45"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 5, duration: 1.2 }}
        >
          {TEAM.map((m) => m.name).join("  ·  ")}
        </motion.p>

        <motion.p
          className="mt-5 text-xs tracking-[0.45em] text-white/60 uppercase font-display"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 5.4, duration: 1 }}
        >
          UCET | Hazaribag
        </motion.p>
      </div>

      <WaveRibbon className="absolute bottom-0 left-0 h-20 w-full" opacity={0.6} />
    </div>
  )
}
