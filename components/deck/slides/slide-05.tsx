"use client"

import { motion } from "motion/react"
import { SlideBase, WaterDrop, FloatingBubbles } from "../water-primitives"

const NODES = [
  { n: "1", text: "Clean surroundings protect water" },
  { n: "2", text: "Biodiversity depends on healthy ecosystems" },
  { n: "3", text: "Plants influence soil and water cycles" },
  { n: "4", text: "Natural water bodies need protection" },
  { n: "5", text: "Community participation drives conservation" },
]

// positions on a circle (percent of the square stage), starting at top
const POS = NODES.map((_, i) => {
  const a = (-90 + i * 72) * (Math.PI / 180)
  return { x: 50 + 38 * Math.cos(a), y: 50 + 38 * Math.sin(a) }
})

export function Slide05() {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <SlideBase gradient="radial-gradient(90% 90% at 50% 40%, #063b5c 0%, #041b2d 60%, #020f1a 100%)">
        <FloatingBubbles count={8} />
      </SlideBase>

      <div className="relative z-10 flex h-full w-full flex-col px-6 pt-14 pb-24 md:px-14 md:pt-16">
        <motion.h2
          className="font-display text-2xl font-bold tracking-tight text-white md:text-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          FROM FIELDWORK TO <span className="text-turquoise">INSIGHT</span>
        </motion.h2>

        <div className="grid flex-1 grid-cols-1 items-center gap-4 lg:grid-cols-[1.3fr_1fr]">
          {/* Radial diagram */}
          <div className="relative mx-auto aspect-square w-full max-w-[440px]">
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" aria-hidden="true">
              {POS.map((p, i) => (
                <motion.line
                  key={i}
                  x1="50"
                  y1="50"
                  x2={p.x}
                  y2={p.y}
                  stroke="#4de7d2"
                  strokeWidth="0.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.6 }}
                  transition={{ duration: 0.8, delay: 1.1 + i * 0.28 }}
                  style={{ filter: "drop-shadow(0 0 1px rgba(77,231,210,0.8))" }}
                />
              ))}
            </svg>

            {/* Center water */}
            <motion.div
              className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full glass-strong glow-aqua"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <WaterDrop size={30} className="animate-float" />
              <span className="mt-1 font-display text-xs font-bold tracking-[0.25em] text-turquoise uppercase">
                Water
              </span>
            </motion.div>

            {/* Nodes */}
            {NODES.map((node, i) => (
              <motion.div
                key={node.n}
                className="absolute w-28 -translate-x-1/2 -translate-y-1/2 md:w-32"
                style={{ left: `${POS[i].x}%`, top: `${POS[i].y}%` }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.3 + i * 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="glass flex flex-col items-center gap-1 rounded-2xl px-2.5 py-2.5 text-center">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-gradient-to-br from-aqua to-turquoise text-[11px] font-bold text-abyss">
                    {node.n}
                  </span>
                  <p className="text-[10px] leading-snug text-white/80 md:text-[11px]">{node.text}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Reflection */}
          <motion.div
            className="glass-strong rounded-3xl p-6"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 2.6 }}
          >
            <p className="mb-3 text-[11px] tracking-[0.35em] text-turquoise/70 uppercase font-display">
              Our Experience
            </p>
            <p className="text-sm leading-relaxed text-white/75 md:text-base">
              The field visits helped us understand that water conservation is not an isolated
              problem. Water, waste, vegetation, biodiversity and human activity are{" "}
              <span className="text-turquoise">deeply connected.</span>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
