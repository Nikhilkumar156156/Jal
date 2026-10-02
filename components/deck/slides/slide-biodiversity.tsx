"use client"

import { LocationSlide } from "./location-slide"
import { LOCATIONS } from "@/lib/location-data"

export function SlideBiodiversity() {
  return <LocationSlide data={LOCATIONS[1]} />
}
