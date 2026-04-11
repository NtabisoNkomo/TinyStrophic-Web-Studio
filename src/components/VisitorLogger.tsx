"use client"

import { useEffect } from "react"
import { logVisit } from "@/lib/actions/analytics"

export function VisitorLogger() {
  useEffect(() => {
    logVisit()
  }, [])
  return null
}
