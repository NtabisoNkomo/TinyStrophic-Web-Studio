"use client"

import { useState } from "react"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { SectionHeader } from "@/components/ui/section-header"
import { Button } from "@/components/ui/button"
import { Check, X } from "lucide-react"
import { PlanSelectModal } from "@/components/sections/PlanSelectModal"

const features = [
  "1–3 Pages",
  "5–10 Pages",
  "Unlimited Pages",
  "Mobile Responsive",
  "Template-Based Design",
  "Custom UI Design",
  "Contact Form",
  "CMS / Blog Integration",
  "WhatsApp / Chat Integration",
  "Basic SEO Optimization",
  "Technical SEO & Performance",
  "Admin Dashboard",
  "Priority Support",
]

const plans = [
  { name: "Starter", included: [true, false, false, true, true, false, true, false, false, true, false, false, false] },
  { name: "Growth", included: [false, true, false, true, false, true, true, true, true, true, true, false, false] },
  { name: "Premium", included: [false, false, true, true, false, true, true, true, true, true, true, true, true] },
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
                   <p className="text-muted-foreground text-sm">Typically 7–14 days for Starter and Growth packages. Premium automation projects take 21+ days depending on complexity.</p>
                </div>
                <div className="space-y-2">
                   <h4 className="font-bold text-lg">How many revisions do I get?</h4>
                   <p className="text-muted-foreground text-sm">We provide 2–3 rounds of revisions for every project to ensure the final result aligns perfectly with your vision.</p>
                </div>
                <div className="space-y-2">
                   <h4 className="font-bold text-lg">What about website hosting?</h4>
                   <p className="text-muted-foreground text-sm">Hosting and domain are not included in build costs. We offer Managed Hosting & Maintenance starting from R150/month.</p>
                </div>
                <div className="space-y-2">
                   <h4 className="font-bold text-lg">Can I update my site later?</h4>
                   <p className="text-muted-foreground text-sm">Absolutely! Growth and Premium plans include a CMS (like Sanity or Payload) for easy content management.</p>
                </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
