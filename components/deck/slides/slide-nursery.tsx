"use client"

import { LocationSlide } from "./location-slide"
import { LOCATIONS } from "@/lib/location-data"

export function SlideNursery() {
  return <LocationSlide data={LOCATIONS[2]} />
}
