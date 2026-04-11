"use client"

import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { SectionHeader } from "@/components/ui/section-header"
import { EstimatorWizard } from "@/components/sections/EstimatorWizard"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"

function EstimatorContent() {
  const searchParams = useSearchParams()
  const plan = searchParams.get("plan")

  return <EstimatorWizard initialPlan={plan} />
}

export default function EstimatorPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-32">
        <div className="container mx-auto px-4 py-16">
          <SectionHeader
            title="Project Estimator"
            subtitle="Build a custom quote for your project in minutes. Select your required services, features, and budget to get an instant estimate."
          />
          <div className="max-w-4xl mx-auto">
            <Suspense>
              <EstimatorContent />
            </Suspense>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

