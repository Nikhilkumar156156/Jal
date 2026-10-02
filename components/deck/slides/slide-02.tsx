"use client"

import { motion } from "motion/react"
import { TEAM, FOCUS_AREAS } from "@/lib/deck-data"
import { SlideBase, WaterDrop, FloatingBubbles } from "../water-primitives"

export function Slide02() {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <SlideBase gradient="radial-gradient(120% 120% at 85% 10%, #063b5c 0%, #041b2d 60%, #020f1a 100%)">
        <FloatingBubbles count={10} />
      </SlideBase>

      <div className="relative z-10 flex h-full w-full flex-col px-6 pt-14 pb-24 md:px-14 md:pt-16">
        <motion.h2
          className="font-display text-2xl font-bold tracking-tight text-white md:text-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          ONE TEAM. <span className="text-turquoise">ONE ELEMENT.</span> ONE MISSION.
        </motion.h2>

        <div className="mt-8 grid flex-1 grid-cols-1 gap-8 lg:grid-cols-[1.5fr_1fr]">
          {/* Team wall */}
          <div className="flex flex-col">
            <motion.p
              className="mb-4 text-[11px] tracking-[0.35em] text-turquoise/70 uppercase font-display"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              The Team
            </motion.p>
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4">
              {TEAM.map((member, i) => (
                <motion.div
                  key={member.name}
                  className="glass flex items-center gap-2 rounded-xl px-3 py-2"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.35 + i * 0.045,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <WaterDrop size={15} className="shrink-0 animate-float" style={{ animationDelay: `${i * 0.2}s` }} />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-white/90">{member.name}</p>
                    {"role" in member && member.role ? (
                      <p className="truncate text-[10px] tracking-wide text-turquoise/80 uppercase">
                        {member.role}
                      </p>
                    ) : null}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mission */}
          <motion.div
            className="glass-strong relative flex flex-col justify-center overflow-hidden rounded-3xl p-8"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-4 flex items-center gap-3">
              <WaterDrop size={34} className="animate-float" />
              <span className="font-display text-6xl font-bold text-gradient-aqua md:text-7xl">JAL</span>
            </div>
            <p className="text-sm text-white/70">Water Conservation & Water Bodies Revival</p>

            <p className="mt-7 mb-3 text-[11px] tracking-[0.35em] text-turquoise/70 uppercase font-display">
              Our Focus
            </p>
            <div className="flex flex-wrap gap-2">
              {FOCUS_AREAS.map((area, i) => (
                <motion.span
                  key={area}
                  className="glass rounded-full px-3 py-1.5 text-xs text-white/85"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + i * 0.12, duration: 0.5 }}
                >
                  {area}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
