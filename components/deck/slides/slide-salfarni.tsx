"use client"

import { LocationSlide } from "./location-slide"
import { LOCATIONS } from "@/lib/location-data"

export function SlideSalfarni() {
  return <LocationSlide data={LOCATIONS[3]} />
}
