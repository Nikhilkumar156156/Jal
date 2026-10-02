"use client"

import { motion } from "motion/react"
import { WEEKS } from "@/lib/deck-data"
import { SlideBase, WaterDrop, FloatingBubbles } from "../water-primitives"

const ICONS = ["mountain", "leaf", "sprout", "waterfall"] as const

export function Slide03() {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <SlideBase gradient="linear-gradient(160deg, #041b2d 0%, #063b5c 55%, #041b2d 100%)">
        <FloatingBubbles count={8} />
      </SlideBase>

      <div className="relative z-10 flex h-full w-full flex-col px-6 pt-14 pb-24 md:px-14 md:pt-16">
        <motion.h2
          className="font-display text-2xl font-bold tracking-tight text-white md:text-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          4 WEEKS. 4 EXPERIENCES. <span className="text-turquoise">1 CONNECTED STORY.</span>
        </motion.h2>

        <div className="relative mt-6 flex flex-1 items-center">
          {/* Flowing river path */}
          <svg
            className="absolute inset-x-0 top-1/2 -z-0 h-40 w-full -translate-y-1/2"
            viewBox="0 0 1200 200"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="river" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#063b5c" />
                <stop offset="50%" stopColor="#00a9c7" />
                <stop offset="100%" stopColor="#4de7d2" />
              </linearGradient>
            </defs>
            <path
              d="M0,100 C150,40 250,160 400,100 C550,40 650,160 800,100 C950,40 1050,160 1200,100"
              fill="none"
              stroke="url(#river)"
              strokeWidth="14"
              strokeLinecap="round"
              opacity="0.28"
            />
            <motion.path
              d="M0,100 C150,40 250,160 400,100 C550,40 650,160 800,100 C950,40 1050,160 1200,100"
              fill="none"
              stroke="url(#river)"
              strokeWidth="6"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 4, ease: "easeInOut", delay: 0.4 }}
              style={{ filter: "drop-shadow(0 0 8px rgba(77,231,210,0.7))" }}
            />
          </svg>

          {/* Week cards */}
          <div className="relative z-10 grid w-full grid-cols-2 gap-4 md:grid-cols-4">
            {WEEKS.map((wk, i) => (
              <motion.div
                key={wk.week}
                className={`flex flex-col ${i % 2 === 0 ? "md:mt-0" : "md:mt-28"}`}
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.8 + i * 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Node marker on the river */}
                <div className="mx-auto mb-3 grid h-11 w-11 place-items-center rounded-full glass-strong glow-aqua">
                  <WaterDrop size={20} />
                </div>

                <div className="glass overflow-hidden rounded-2xl">
                  {/* image / demo strip */}
                  <div className="relative h-20 w-full overflow-hidden bg-gradient-to-br from-deep to-abyss">
                    <div
                      className="absolute inset-0 opacity-40"
                      style={{
                        background:
                          "radial-gradient(circle at 30% 30%, rgba(0,169,199,0.6), transparent 60%)",
                      }}
                    />
                    <span className="absolute left-3 top-2 font-display text-3xl font-bold text-white/25">
                      W{wk.week}
                    </span>
                    <WeekIcon kind={ICONS[i]} />
                  </div>
                  <div className="p-3.5">
                    <p className="text-[10px] tracking-[0.3em] text-turquoise/80 uppercase font-display">
                      Week {wk.week}
                    </p>
                    <p className="mt-1 text-sm font-semibold leading-tight text-white">{wk.title}</p>
                    <p className="text-xs text-white/55">{wk.activity}</p>
                    <p className="mt-2 text-[11px] leading-snug text-white/45">{wk.purpose}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function WeekIcon({ kind }: { kind: (typeof ICONS)[number] }) {
  const common = "absolute right-3 bottom-2 h-8 w-8 text-turquoise/80"
  const paths: Record<string, React.ReactNode> = {
    mountain: <path d="M3 20 L9 8 L13 15 L17 6 L21 20 Z" />,
    leaf: <path d="M4 20 C4 10 12 4 20 4 C20 14 12 20 4 20 Z M4 20 L14 10" />,
    sprout: <path d="M12 20 V11 M12 11 C12 7 8 5 5 6 C6 10 9 12 12 11 M12 11 C12 8 15 5 19 6 C18 10 15 12 12 11" />,
    waterfall: <path d="M6 3 V21 M12 3 V21 M18 3 V21 M4 21 H20" />,
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className={common}>
      {paths[kind]}
    </svg>
  )
}
