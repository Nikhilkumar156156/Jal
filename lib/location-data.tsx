import type { ComponentType, SVGProps } from "react"

type IconType = ComponentType<SVGProps<SVGSVGElement>>

/* Minimal on-brand SVG icons (stroke = currentColor). */
const LeafIcon: IconType = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M11 20A7 7 0 0 1 4 13c0-6 8-9 15-9 0 7-3 15-9 15Z" />
    <path d="M5 20c3-4 6-6 9-7" />
  </svg>
)
const SproutIcon: IconType = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M12 20v-9" />
    <path d="M12 11c0-3 2-5 6-5 0 3-2 5-6 5Z" />
    <path d="M12 13C12 10 10 8 6 8c0 3 2 5 6 5Z" />
  </svg>
)
const WaterfallIcon: IconType = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M4 4v9M8 4v7M12 4v10M16 4v7M20 4v9" />
    <path d="M4 17c2 0 2 2 4 2s2-2 4-2 2 2 4 2 2-2 4-2" />
  </svg>
)
const TrashIcon: IconType = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M6 7l1 13a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-13" />
    <path d="M10 11v6M14 11v6" />
  </svg>
)

export interface LocationSlideData {
  week: string
  name: string
  activity: string
  lead: string
  Icon: IconType
  focus: string[]
  note: string
  gradient: string
  photos: { label: string; span: "hero" | "half"; src?: string }[]
}

export const LOCATIONS: LocationSlideData[] = [
  {
    week: "01",
    name: "Canary Hill",
    activity: "Cleanup Drive",
    lead: "Clean surroundings protect the water we depend on.",
    Icon: TrashIcon,
    focus: ["Litter removal along trails", "Awareness on surface pollution", "How waste reaches runoff"],
    note: "Initial field observation",
    gradient: "radial-gradient(120% 120% at 15% 10%, #063b5c 0%, #041b2d 55%, #020f1a 100%)",
    photos: [
      { label: "Canary Hill", span: "hero", src: "/images/week-01-canary/hero.jpg" },
      { label: "Cleanup Drive", span: "half", src: "/images/week-01-canary/cleanup.jpg" },
      { label: "Team on Field", span: "half", src: "/images/week-01-canary/team.jpg" },
    ],
  },
  {
    week: "02",
    name: "Biodiversity Park",
    activity: "Ecosystem Study",
    lead: "Biodiversity depends on healthy, connected water systems.",
    Icon: LeafIcon,
    focus: ["Water & biodiversity link", "Habitat and wetland observation", "Native species & vegetation"],
    note: "Initial field observation",
    gradient: "radial-gradient(120% 120% at 85% 10%, #06514a 0%, #063b5c 45%, #041b2d 100%)",
    photos: [
      { label: "Biodiversity Park", span: "hero", src: "/images/week-02-biodiversity/hero.jpg" },
      { label: "Habitat Study", span: "half", src: "/images/week-02-biodiversity/habitat.jpg" },
      { label: "Species Observation", span: "half", src: "/images/week-02-biodiversity/species.jpg" },
    ],
  },
  {
    week: "03",
    name: "Nursery",
    activity: "Plants & Soil",
    lead: "Plants shape the soil and the water cycle around them.",
    Icon: SproutIcon,
    focus: ["Soil moisture & retention", "Vegetation and the water cycle", "Saplings for green cover"],
    note: "Initial field observation",
    gradient: "radial-gradient(120% 120% at 20% 90%, #0a5f4d 0%, #063b5c 50%, #041b2d 100%)",
    photos: [
      { label: "Nursery Visit", span: "hero", src: "/images/week-03-nursery/hero.jpg" },
      { label: "Saplings Care", span: "half", src: "/images/week-03-nursery/saplings.jpg" },
      { label: "Soil & Roots", span: "half", src: "/images/week-03-nursery/soil.jpg" },
    ],
  },
  {
    week: "04",
    name: "Salfarni Waterfall",
    activity: "Wildlife Sanctuary",
    lead: "Natural water bodies and ecosystems need protection.",
    Icon: WaterfallIcon,
    focus: ["Stream flow & catchment", "Natural water body health", "Wildlife sanctuary ecosystem"],
    note: "Initial field observation",
    gradient: "radial-gradient(120% 120% at 80% 90%, #063b5c 0%, #041b2d 55%, #020f1a 100%)",
    photos: [
      { label: "Salfarni Waterfall", span: "hero", src: "/images/week-04-salfarni/hero.jpg" },
      { label: "Sanctuary Trek", span: "half", src: "/images/week-04-salfarni/sanctuary.jpg" },
      { label: "Stream Flow", span: "half", src: "/images/week-04-salfarni/stream.jpg" },
    ],
  },
]
