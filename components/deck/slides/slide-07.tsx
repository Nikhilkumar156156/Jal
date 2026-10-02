"use client"

import { motion } from "motion/react"
import { SlideBase, WaterDrop, FloatingBubbles } from "../water-primitives"
import { ShieldCheck, Filter, ArrowDownToLine, Droplets, Activity } from "lucide-react"

const STAGES = [
  { num: "01", title: "Rainwater Catchment", icon: Droplets, desc: "Roof & surface capture" },
  { num: "02", title: "First-Flush Separation", icon: ShieldCheck, desc: "Bypassing initial debris" },
  { num: "03", title: "Multi-Stage Filtration", icon: Filter, desc: "Sand, gravel & bio-filter" },
  { num: "04", title: "Aquifer Recharge", icon: ArrowDownToLine, desc: "Direct groundwater injection" },
  { num: "05", title: "Smart Ecosystem", icon: Activity, desc: "Telemetry & level sensing" },
]

const EXPLANATION_PILLARS = [
  {
    step: "STEP 01 — CAPTURE & DIVERT",
    title: "Preventing Runoff at the Source",
    icon: Droplets,
    summary: "Rooftop and ground contours intercept rainfall immediately. A mechanical first-flush diverter isolates the initial dust and contaminants, ensuring only clean runoff enters the treatment stream.",
    highlights: ["Reduces surface erosion", "Isolates early pollutants"],
  },
  {
    step: "STEP 02 — PURIFY & FILTER",
    title: "Natural Multi-Layer Filtration",
    icon: Filter,
    summary: "Water cascades through stratified gravel, coarse sand, and activated carbon layers to remove suspended particulates, turbidity, and organic matter without requiring chemical additives.",
    highlights: ["Low maintenance design", "Chemical-free purification"],
  },
  {
    step: "STEP 03 — RECHARGE & REVIVE",
    title: "Rebuilding Groundwater Aquifers",
    icon: ArrowDownToLine,
    summary: "Purified water is channeled into deep recharge shafts and infiltration pits, directly replenishing local aquifers and feeding surrounding water bodies rather than draining away unused.",
    highlights: ["Restores water table", "Sustains community greenery"],
  },
]

export function Slide07() {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <SlideBase gradient="radial-gradient(110% 110% at 50% 0%, #063b5c 0%, #041b2d 55%, #020f1a 100%)">
        <FloatingBubbles count={8} />
      </SlideBase>

      <div className="relative z-10 flex h-full w-full flex-col px-6 pt-12 pb-20 md:px-14 md:pt-14">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-2">
          <div>
            <motion.p
              className="text-[11px] font-display font-semibold tracking-[0.3em] text-turquoise/90 uppercase"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              The Solution Architecture
            </motion.p>
            <motion.h2
              className="mt-1 font-display text-2xl font-bold tracking-tight text-white md:text-4xl"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              TURNING WATER INTO <span className="text-turquoise">A SYSTEM</span>
            </motion.h2>
          </div>
          <motion.p
            className="text-xs text-white/60 max-w-md hidden md:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Transforming unmanaged rainwater runoff into an engineered, circular water replenishment cycle.
          </motion.p>
        </div>

        {/* 5-Step Process Pipeline */}
        <div className="relative mt-6">
          {/* connecting rail */}
          <div className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-aqua/20 via-turquoise/50 to-aqua/20 md:block" />
          {/* traveling droplet along the rail */}
          <motion.div
            className="absolute top-7 hidden -translate-y-1/2 md:block"
            initial={{ left: "0%", opacity: 0 }}
            animate={{ left: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 3.5, delay: 1, repeat: Number.POSITIVE_INFINITY, repeatDelay: 1 }}
          >
            <WaterDrop size={16} className="glow-aqua rounded-full" />
          </motion.div>

          <div className="grid grid-cols-2 gap-2.5 md:grid-cols-5">
            {STAGES.map((s, i) => {
              const Icon = s.icon
              return (
                <motion.div
                  key={s.title}
                  className="glass flex flex-col items-center gap-1.5 rounded-xl px-2.5 py-3 text-center border border-white/5 hover:border-turquoise/30 transition-colors"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="grid h-8 w-8 place-items-center rounded-full glass-strong text-turquoise glow-aqua">
                    <Icon className="h-4 w-4" />
                  </div>
                  <p className="text-[10px] tracking-[0.2em] text-turquoise/70 font-display">
                    {s.num}
                  </p>
                  <p className="text-xs font-semibold leading-tight text-white">{s.title}</p>
                  <p className="text-[10px] leading-tight text-white/50">{s.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Deep Explanation of the Idea — 3 Architectural Cards */}
        <div className="mt-5 grid flex-1 grid-cols-1 gap-3.5 md:grid-cols-3">
          {EXPLANATION_PILLARS.map((p, i) => {
            const Icon = p.icon
            return (
              <motion.div
                key={p.title}
                className="glass relative flex flex-col justify-between rounded-2xl p-4 md:p-5 border border-border-aqua/40 hover:border-turquoise/60 transition-all duration-300"
                initial={{ opacity: 0, y: 35 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + i * 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-display font-semibold tracking-[0.2em] text-turquoise uppercase">
                      {p.step}
                    </span>
                    <div className="grid h-7 w-7 place-items-center rounded-lg glass-strong text-turquoise">
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                  </div>

                  <h3 className="mt-2 text-sm font-bold text-white md:text-base leading-snug">
                    {p.title}
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-white/70">
                    {p.summary}
                  </p>
                </div>

                <div className="mt-3.5 pt-3 border-t border-white/10 flex flex-wrap gap-1.5">
                  {p.highlights.map((h) => (
                    <span
                      key={h}
                      className="rounded-md bg-deep/80 px-2 py-0.5 text-[10px] font-medium text-turquoise/90 border border-turquoise/20"
                    >
                      ✓ {h}
                    </span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom Synthesis Line */}
        <motion.div
          className="mt-4 rounded-xl bg-deep/50 px-4 py-2 text-center border border-turquoise/20 flex items-center justify-center gap-2"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <WaterDrop size={14} />
          <p className="text-xs md:text-sm font-medium text-white/90">
            <span className="text-white">Collect what falls.</span>{" "}
            <span className="text-turquoise">Filter what flows.</span>{" "}
            <span className="text-leaf">Recharge what we can.</span>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
