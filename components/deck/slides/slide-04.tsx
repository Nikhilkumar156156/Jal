"use client"

import { motion } from "motion/react"
import { SlideBase, FloatingBubbles } from "../water-primitives"
import { PhotoPlaceholder } from "../photo-placeholder"

const PANELS: { label: string; caption: string; rotate: number; src: string }[] = [
  { label: "Canary Hill", caption: "Cleanup & environmental awareness", rotate: -2, src: "/images/slide-04/canary.jpg" },
  { label: "Biodiversity Park", caption: "Water + biodiversity", rotate: 1.5, src: "/images/slide-04/biodiversity.jpg" },
  { label: "Nursery", caption: "Plants + soil + water", rotate: -1.5, src: "/images/slide-04/nursery.jpg" },
  { label: "Salfarni", caption: "Natural water bodies + ecosystem", rotate: 2, src: "/images/slide-04/salfarni.jpg" },
]

export function Slide04() {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <SlideBase gradient="radial-gradient(120% 120% at 50% 100%, #063b5c 0%, #041b2d 55%, #020f1a 100%)">
        <FloatingBubbles count={9} />
      </SlideBase>

      <div className="relative z-10 flex h-full w-full flex-col px-6 pt-14 pb-24 md:px-14 md:pt-16">
        <motion.h2
          className="font-display text-2xl font-bold tracking-tight text-white md:text-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          WE WENT <span className="text-turquoise">BEYOND THE CLASSROOM</span>
        </motion.h2>

        <div className="mt-6 grid flex-1 grid-cols-2 gap-4 lg:grid-cols-4">
          {PANELS.map((p, i) => (
            <motion.div
              key={p.label}
              className="relative"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3 + i * 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="absolute -top-3 left-1 z-10 font-display text-[11px] tracking-[0.3em] text-turquoise/70 uppercase">
                Panel 0{i + 1}
              </span>
              <PhotoPlaceholder
                label={p.label}
                caption={p.caption}
                src={p.src}
                rotate={p.rotate}
                className="aspect-[3/4] w-full"
              />
            </motion.div>
          ))}
        </div>

        {/* Central statement + wildlife sanctuary chip */}
        <div className="mt-5 flex flex-col items-center gap-4 lg:flex-row lg:justify-between">
          <motion.p
            className="max-w-xl text-center text-sm italic leading-relaxed text-white/70 lg:text-left md:text-base"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 1 }}
          >
            &ldquo;Seeing environmental problems firsthand changed how we understood them.&rdquo;
          </motion.p>

          <motion.div
            className="glass flex items-center gap-3 rounded-2xl px-4 py-2.5"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5, duration: 0.7 }}
          >
            <div className="grid h-9 w-9 place-items-center rounded-full glass-strong">
              <svg viewBox="0 0 24 24" fill="none" stroke="#4de7d2" strokeWidth="1.4" className="h-5 w-5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 15 C4 9 8 6 12 6 C16 6 20 9 20 15 M8 15 v4 M16 15 v4 M9 11 h.01 M15 11 h.01" />
              </svg>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.25em] text-turquoise/70 uppercase font-display">Ecosystem</p>
              <p className="text-sm font-semibold text-white">Wildlife Sanctuary</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
