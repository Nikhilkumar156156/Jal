"use client"

import { motion } from "motion/react"
import { SlideBase, WaterDrop, FloatingBubbles } from "../water-primitives"
import { PhotoPlaceholder } from "../photo-placeholder"
import { Award, Sparkles, Presentation, CheckCircle2, ChevronRight } from "lucide-react"

const HIGHLIGHTS = [
  {
    step: "01 · DRAMA & ADVOCACY",
    title: "Street Play (Nukkad Natak)",
    subtitle: "Personifying Devi Ganga & Community Action",
    desc: "A high-impact theatrical performance highlighting everyday urban water wastage habits and dramatizing river preservation to awaken public consciousness.",
    src: "/images/closing-ceremony/skit-play.jpg",
    icon: Sparkles,
    keyPoints: [
      "Dramatized river Ganga and human conservation duties",
      "Creative character props engaging campus spectators",
      "Spread practical everyday water-saving awareness",
    ],
    highlights: ["Public Advocacy", "Street Theatrics", "River Reverence"],
    rotate: -1.2,
  },
  {
    step: "02 · TECHNICAL PITCH",
    title: "Project Presentation",
    subtitle: "Synthesizing 4 Weeks of Field Research",
    desc: "Delivering the complete ecological observations, rainwater catchment models, and circular filtration architecture at the podium to mentors and peers.",
    src: "/images/closing-ceremony/presentation.jpg",
    icon: Presentation,
    keyPoints: [
      "Synthesized data from all 4 field touchpoints",
      "Engineered multi-stage filtration & recharge design",
      "Addressed mentor queries on real-world feasibility",
    ],
    highlights: ["Field Data Synthesis", "Engineered System", "Faculty Review"],
    rotate: 0.8,
  },
  {
    step: "03 · RECOGNITION",
    title: "Certificate & Felicitation",
    subtitle: "Honoring 21 Environmental Ambassadors",
    desc: "Formal certificate distribution and felicitation on stage with organizers and faculty, celebrating 4 weeks of dedicated field immersion and leadership.",
    src: "/images/closing-ceremony/certificates.jpg",
    icon: Award,
    keyPoints: [
      "Official certificates awarded to all 21 members",
      "Faculty appreciation for fieldwork & dedication",
      "United team milestone for lasting ecological impact",
    ],
    highlights: ["21 Ambassadors", "Official Honor", "UCET Hazaribag"],
    rotate: -0.8,
  },
]

export function SlideClosing() {
  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Background with theme-matching deep ocean glow and ambient floating bubbles */}
      <SlideBase gradient="radial-gradient(120% 120% at 50% 10%, #06456b 0%, #041b2d 55%, #020f1a 100%)">
        <FloatingBubbles count={9} />
      </SlideBase>

      <div className="relative z-10 flex h-full w-full flex-col px-6 pt-10 pb-18 md:px-12 md:pt-12 lg:px-14 lg:pt-13">
        {/* Slide Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-2">
          <div>
            <motion.div
              className="flex items-center gap-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="glass rounded-full px-3 py-1 font-display text-[10px] tracking-[0.3em] text-turquoise/90 uppercase border border-turquoise/30">
                Valedictory &amp; Culmination
              </span>
              <span className="text-[10px] tracking-[0.3em] text-white/45 uppercase font-display hidden sm:inline">
                Drama · Synthesis · Recognition
              </span>
            </motion.div>

            <motion.h2
              className="mt-1 font-display text-2xl font-bold tracking-tight text-white md:text-4xl"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              CLOSING CEREMONY &amp; <span className="text-turquoise">FELICITATION</span>
            </motion.h2>
          </div>

          <motion.p
            className="text-xs text-white/60 max-w-md hidden md:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Translating weeks of fieldwork into public awareness drama, formal technical pitch, and celebrated leadership.
          </motion.p>
        </div>

        {/* 3 Interactive Photo Showcase Cards */}
        <div className="mt-4 grid flex-1 grid-cols-1 gap-4 md:grid-cols-3">
          {HIGHLIGHTS.map((item, i) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.title}
                className="glass-strong group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border-aqua/50 p-4 transition-all duration-300 hover:border-turquoise/60 hover:shadow-[0_0_25px_rgba(77,231,210,0.2)]"
                initial={{ opacity: 0, y: 35, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.7,
                  delay: 0.35 + i * 0.18,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div>
                  {/* Card Header Tag & Icon */}
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-display text-[10px] font-semibold tracking-[0.22em] text-turquoise/90 uppercase">
                      {item.step}
                    </span>
                    <div className="grid h-7 w-7 place-items-center rounded-lg glass text-turquoise glow-aqua transition-transform group-hover:scale-110">
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                  </div>

                  {/* Photo Frame using PhotoPlaceholder for seamless basePath and error handling */}
                  <PhotoPlaceholder
                    label={item.title}
                    src={item.src}
                    rotate={item.rotate}
                    showOverlay={false}
                    className="aspect-[16/10] w-full"
                  />

                  {/* Card Title & Subtitle */}
                  <h3 className="mt-2.5 text-base font-bold text-white leading-snug group-hover:text-turquoise transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[11px] font-medium text-turquoise/80 mt-0.5">
                    {item.subtitle}
                  </p>

                  {/* Description */}
                  <p className="mt-1.5 text-xs leading-relaxed text-white/70">
                    {item.desc}
                  </p>

                  {/* Key Takeaway Bullet Points */}
                  <div className="mt-2.5 space-y-1 rounded-lg bg-black/20 p-2 border border-white/5">
                    {item.keyPoints.map((pt) => (
                      <div key={pt} className="flex items-start gap-1.5 text-[11px] text-white/80 leading-tight">
                        <ChevronRight className="h-3 w-3 shrink-0 text-turquoise mt-0.5" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Highlights / Badges */}
                <div className="mt-2.5 pt-2.5 border-t border-white/10 flex flex-wrap gap-1.5">
                  {item.highlights.map((h) => (
                    <span
                      key={h}
                      className="inline-flex items-center gap-1 rounded-md bg-deep/80 px-2 py-0.5 text-[10px] font-medium text-turquoise/90 border border-turquoise/20"
                    >
                      <CheckCircle2 className="h-2.5 w-2.5 text-aqua" />
                      {h}
                    </span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom Synthesis Line */}
        <motion.div
          className="mt-3 rounded-xl bg-deep/60 px-4 py-2 text-center border border-turquoise/25 flex items-center justify-center gap-2"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.7 }}
        >
          <WaterDrop size={14} className="animate-float" />
          <p className="text-xs md:text-sm font-medium text-white/90">
            <span className="text-white">Awareness through Action.</span>{" "}
            <span className="text-turquoise">Confidence through Presentation.</span>{" "}
            <span className="text-leaf">Honored through Dedication.</span>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
