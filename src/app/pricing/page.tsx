"use client"

import { useState } from "react"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { SectionHeader } from "@/components/ui/section-header"
import { Button } from "@/components/ui/button"
import { Check, X } from "lucide-react"
import { PlanSelectModal } from "@/components/sections/PlanSelectModal"

const features = [
  "Custom Design",
  "Mobile Responsive",
  "SEO Optimization",
  "Contact Form",
  "CMS Integration",
  "E-commerce",
  "Priority Support",
  "Monthly Maintenance",
]

const plans = [
  { name: "Starter", included: [true, true, true, true, false, false, false, false] },
  { name: "Growth", included: [true, true, true, true, true, false, true, true] },
  { name: "Premium", included: [true, true, true, true, true, true, true, true] },
]

export default function Pricing() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-32">
        <div className="container mx-auto px-4 py-16">
          <SectionHeader
            title="Transparent Pricing"
            subtitle="Choose the plan that fits your business needs. No hidden fees, just premium results."
          />

          <div className="overflow-x-auto mb-24">
            <table className="w-full text-left border-collapse border border-border bg-accent/5 rounded-3xl overflow-hidden">
              <thead>
                <tr className="border-b border-border bg-accent/10">
                  <th className="p-6 text-xl font-bold font-outfit">Feature</th>
                  {plans.map((plan) => (
                    <th key={plan.name} className="p-6 text-xl font-bold font-outfit text-center">
                      {plan.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {features.map((feature, i) => (
                  <tr key={feature} className="border-b border-border/40 hover:bg-primary/5 transition-colors">
                    <td className="p-6 font-medium">{feature}</td>
                    {plans.map((plan) => (
                      <td key={plan.name} className="p-6 text-center">
                        {plan.included[i] ? (
                          <Check className="mx-auto h-6 w-6 text-primary" />
                        ) : (
                          <X className="mx-auto h-6 w-6 text-muted-foreground opacity-20" />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
              <tfoot>
                 <tr>
                    <td className="p-6"></td>
                    {plans.map((plan) => (
                      <td key={plan.name} className="p-6 text-center">
                        <Button
                          className="rounded-full w-full max-w-[150px] font-bold"
                          onClick={() => setSelectedPlan(plan.name)}
                        >
                          Select {plan.name}
                        </Button>
                      </td>
                    ))}
                 </tr>
              </tfoot>
            </table>
          </div>

          <PlanSelectModal
            planName={selectedPlan || ""}
            isOpen={!!selectedPlan}
            onClose={() => setSelectedPlan(null)}
          />

          <div className="text-center space-y-8 bg-primary/5 p-16 rounded-[3rem]">
            <h2 className="text-3xl font-bold font-outfit">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-5xl mx-auto">
               <div className="space-y-2">
                  <h4 className="font-bold text-lg">How long does a project take?</h4>
                  <p className="text-muted-foreground text-sm">Typically 2-4 weeks for Starter/Growth plans, and 6-8 weeks for Premium builds.</p>
               </div>
               <div className="space-y-2">
                  <h4 className="font-bold text-lg">Do you offer payment plans?</h4>
                  <p className="text-muted-foreground text-sm">Yes, we usually split payments into 50% upfront and 50% on completion.</p>
               </div>
               <div className="space-y-2">
                  <h4 className="font-bold text-lg">What about website hosting?</h4>
                  <p className="text-muted-foreground text-sm">We provide managed hosting for R299/month, ensuring your site is always fast and secure.</p>
               </div>
               <div className="space-y-2">
                  <h4 className="font-bold text-lg">Can I update my site later?</h4>
                  <p className="text-muted-foreground text-sm">Absolutely! All Growth and Premium plans include a CMS for easy self-management.</p>
               </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
