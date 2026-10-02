"use client"

import { motion } from "motion/react"
import Image from "next/image"
import { Ripple, FloatingBubbles, WaveRibbon } from "../water-primitives"

export function Slide01() {
  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Full-screen cinematic water background, revealed as aqua light spreads */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0, scale: 1.15 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 3.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <Image
          src="/images/hero-water.png"
          alt="Deep ocean water with a shaft of aqua light"
          fill
          priority
          className="object-cover"
        />
      </motion.div>

      {/* Darkness that lifts to reveal the scene */}
      <motion.div
        className="absolute inset-0 bg-abyss"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0.35 }}
        transition={{ duration: 3, ease: "easeInOut" }}
      />
      {/* Aqua light spreading from center */}
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 45%, rgba(0,169,199,0.35), transparent 70%)",
        }}
        initial={{ opacity: 0, scale: 0.3 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2.6, delay: 0.6, ease: "easeOut" }}
      />

      <FloatingBubbles count={16} />

      {/* Center glass panel */}
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6">
        <Ripple className="absolute left-1/2 top-[42%] h-40 w-40 -translate-x-1/2 -translate-y-1/2" count={4} />

        <motion.div
          className="glass-strong relative flex flex-col items-center rounded-[2.5rem] px-10 py-12 md:px-20 md:py-16"
          initial={{ opacity: 0, y: 30, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.4, delay: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.p
            className="mb-4 text-[11px] tracking-[0.5em] text-turquoise/80 uppercase font-display"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.4, duration: 1 }}
          >
            UCET · Hazaribag
          </motion.p>

          <motion.h1
            className="font-display text-8xl font-bold leading-none tracking-tight text-gradient-aqua md:text-[11rem]"
            initial={{ opacity: 0, scale: 0.6, letterSpacing: "0.3em" }}
            animate={{ opacity: 1, scale: 1, letterSpacing: "0em" }}
            transition={{ duration: 1.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            JAL
          </motion.h1>
          <motion.p
            className="font-deva text-3xl text-white/80 md:text-5xl"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.9 }}
          >
            जल
          </motion.p>

          <motion.p
            className="mt-6 max-w-md text-center text-base text-white/70 md:text-lg"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2.2 }}
          >
            Water Conservation & Water Bodies Revival
          </motion.p>
          <motion.p
            className="mt-2 text-sm text-turquoise/70 md:text-base"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2.5 }}
          >
            4-Week Environmental Leadership Program
          </motion.p>
        </motion.div>

        <motion.p
          className="mt-10 text-xs tracking-[0.4em] text-white/50 uppercase font-display md:text-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 3 }}
        >
          Observe. Understand. Act. Restore.
        </motion.p>
      </div>

      {/* Flowing water line moving toward the bottom */}
      <WaveRibbon className="absolute bottom-0 left-0 h-24 w-full" opacity={0.7} />
    </div>
  )
}
