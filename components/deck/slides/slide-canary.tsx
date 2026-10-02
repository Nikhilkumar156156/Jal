"use client"

import { LocationSlide } from "./location-slide"
import { LOCATIONS } from "@/lib/location-data"

export function SlideCanary() {
  return <LocationSlide data={LOCATIONS[0]} />
}
