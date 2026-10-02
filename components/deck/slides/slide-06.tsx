"use client"

import { motion } from "motion/react"
import { SlideBase } from "../water-primitives"

const PROBLEM = [
  { label: "Rainfall", sub: "Intense, short bursts" },
  { label: "Surface Runoff", sub: "Water sheets off hard ground" },
  { label: "Water Lost", sub: "Carried away, unused" },
  { label: "Low Recharge", sub: "Aquifers barely refill" },
  { label: "Water Stress", sub: "Scarcity builds over time" },
]

const OPPORTUNITY = ["Capture", "Filter", "Store", "Recharge", "Monitor"]

export function Slide06() {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <SlideBase gradient="linear-gradient(180deg, #052a44 0%, #041b2d 55%, #020f1a 100%)" />
      <Rain />

      <div className="relative z-10 flex h-full w-full flex-col px-6 pt-14 pb-24 md:px-14 md:pt-16">
        <motion.h2
          className="font-display text-2xl font-bold tracking-tight text-white md:text-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          THE PROBLEM WE SAW — <span className="text-turquoise">UNMANAGED RAINWATER RUNOFF</span>
        </motion.h2>

        <div className="mt-6 grid flex-1 grid-cols-1 gap-6 lg:grid-cols-[1.1fr_1fr]">
          {/* Problem cascade */}
          <div className="flex flex-col justify-center gap-2">
            {PROBLEM.map((step, i) => (
              <motion.div key={step.label} className="flex flex-col items-center">
                <motion.div
                  className="glass flex w-full max-w-md items-center gap-3 rounded-xl px-4 py-2.5"
                  initial={{ opacity: 0, y: -16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.5 }}
                >
                  <motion.span
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-bold text-abyss"
                    style={{ background: "linear-gradient(135deg,#00a9c7,#4de7d2)" }}
                    initial={{ boxShadow: "0 0 0 rgba(77,231,210,0)" }}
                    animate={{ boxShadow: "0 0 16px rgba(77,231,210,0.7)" }}
                    transition={{ delay: 0.5 + i * 0.5, duration: 0.6 }}
                  >
                    {i + 1}
                  </motion.span>
                  <div>
                    <p className="text-sm font-semibold text-white">{step.label}</p>
                    <p className="text-[11px] text-white/50">{step.sub}</p>
                  </div>
                </motion.div>
                {i < PROBLEM.length - 1 && (
                  <motion.svg
                    width="18"
                    height="22"
                    viewBox="0 0 18 22"
                    className="my-0.5 text-turquoise"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 + i * 0.5 }}
                  >
                    <path d="M9 0 V16 M9 16 L3 10 M9 16 L15 10" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </motion.svg>
                )}
              </motion.div>
            ))}
          </div>

          {/* Opportunity */}
          <div className="flex flex-col justify-center gap-5">
            <motion.div
              className="glass-strong rounded-3xl p-6"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 2.8 }}
            >
              <p className="mb-4 text-[11px] tracking-[0.35em] text-turquoise/80 uppercase font-display">
                The Opportunity
              </p>
              <div className="flex flex-wrap items-center gap-2">
                {OPPORTUNITY.map((o, i) => (
                  <motion.div key={o} className="flex items-center gap-2"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 3 + i * 0.18 }}
                  >
                    <span className="glass rounded-full px-3.5 py-1.5 text-sm font-medium text-white">{o}</span>
                    {i < OPPORTUNITY.length - 1 && <span className="text-turquoise">→</span>}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.p
              className="text-sm italic leading-relaxed text-white/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.6, duration: 1 }}
            >
              &ldquo;Field observations helped us connect environmental awareness with an
              engineering problem.&rdquo;
            </motion.p>

            <motion.div
              className="inline-flex w-fit items-center gap-2 rounded-full border border-dashed border-turquoise/40 px-4 py-1.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.9 }}
            >
              <span className="h-2 w-2 animate-pulse-glow rounded-full bg-turquoise" />
              <span className="text-[11px] tracking-[0.25em] text-turquoise/80 uppercase font-display">
                Field Data: To Be Added
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Rain() {
  const drops = Array.from({ length: 26 }).map((_, i) => ({
    id: i,
    left: `${(i * 53) % 100}%`,
    delay: (i % 10) * 0.28,
    duration: 1.4 + ((i * 7) % 10) / 10,
    height: 12 + ((i * 5) % 20),
  }))
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {drops.map((d) => (
        <motion.span
          key={d.id}
          className="absolute w-px"
          style={{
            left: d.left,
            height: d.height,
            background: "linear-gradient(to bottom, transparent, rgba(77,231,210,0.7))",
          }}
          initial={{ y: "-10%", opacity: 0 }}
          animate={{ y: "110%", opacity: [0, 0.8, 0] }}
          transition={{ duration: d.duration, delay: d.delay, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
      ))}
    </div>
  )
}
