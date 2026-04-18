import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { SectionHeader } from "@/components/ui/section-header"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

const tiers = [
  {
    name: "Starter",
    price: "R3,000",
    description: "Get your business online fast with a professional presence.",
    features: [
      "1–3 Custom Pages",
      "Basic Responsive Design",
      "Contact Form Integration",
      "Basic SEO Setup",
      "Template-Based Design",
      "2 Revision Rounds"
    ],
    cta: "Start Your Project",
    popular: false
  },
  {
    name: "Growth",
    price: "R7,000",
    description: "Empowering growing businesses with advanced functionality.",
    features: [
      "5–10 Custom Pages",
      "Custom UI Design",
      "Advanced Animations",
      "CMS / Editable Content",
      "WhatsApp & Chat Integration",
      "Performance Optimization",
      "Blog & Email Marketing"
    ],
    cta: "Scale Your Business",
    popular: true
  },
  {
    name: "Premium",
    price: "R16,000+",
    description: "High-end solutions for business automation and scale.",
    features: [
      "Fully Custom UI/UX Strategy",
      "Unlimited or High Page Count",
      "Admin Dashboard & Leads Management",
      "Advanced API & Payment Integrations",
      "Technical SEO & Core Web Vitals",
      "Enhanced Security Setup",
      "Outcome-Driven Automation"
    ],
    cta: "Go Premium",
    popular: false
  }
]

export default function Services() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-32">
        <div className="container mx-auto px-4 py-16">
          <SectionHeader
            title="Premium Web Services"
            subtitle="Transparent pricing and results-driven solutions for every stage of your business growth."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
            {tiers.map((tier, i) => (
              <Card key={i} className={`relative border-border/50 flex flex-col ${tier.popular ? "border-primary shadow-lg scale-105" : ""}`}>
                {tier.popular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest px-4 py-1 rounded-full">
                    Most Popular
                  </div>
                )}
                <CardHeader className="text-center pb-8 border-b border-border/40">
                  <CardTitle className="text-2xl font-outfit font-bold">{tier.name}</CardTitle>
                  <p className="text-muted-foreground text-sm">{tier.description}</p>
                  <div className="mt-6 flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold font-outfit">{tier.price}</span>
                    <span className="text-muted-foreground text-sm font-medium">starting at</span>
                  </div>
                </CardHeader>
                <CardContent className="pt-8 flex-grow">
                  <ul className="space-y-4">
                    {tier.features.map((feature, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-primary shrink-0" />
                        <span className="text-sm text-foreground/80">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="pb-8 pt-4">
                  <Button className={`w-full rounded-full font-bold ${tier.popular ? "bg-primary text-primary-foreground hover:bg-primary/90" : "bg-accent/10 border border-primary/20 hover:bg-primary/10"}`} variant={tier.popular ? "default" : "outline"} render={<Link href={`/contact?plan=${encodeURIComponent(tier.name)}`} />}>
                    {tier.cta}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="bg-accent/5 rounded-[3rem] p-12 md:p-24">
             <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
               <div className="space-y-6">
                 <h2 className="text-3xl font-bold font-outfit uppercase tracking-tighter">Additional Add-ons</h2>
                 <p className="text-muted-foreground">Tailor your project with our specialized add-on services to maximize your online impact.</p>
                 <ul className="space-y-3">
                    <li className="flex justify-between border-b border-border pb-2"><span className="font-bold">Hosting & Maintenance</span> <span>R150 – R500/mo</span></li>
                    <li className="flex justify-between border-b border-border pb-2"><span className="font-bold">SEO & Content Updates</span> <span>R500 – R2,000/mo</span></li>
                    <li className="flex justify-between border-b border-border pb-2"><span className="font-bold">Booking System Integration</span> <span>R1,500 – R3,000</span></li>
                    <li className="flex justify-between border-b border-border pb-2"><span className="font-bold">Content Writing</span> <span>R500/page</span></li>
                    <li className="flex justify-between border-b border-border pb-2"><span className="font-bold">Logo & Branding Package</span> <span>R1,500</span></li>
                 </ul>
               </div>
               <div className="p-8 bg-background border border-border rounded-3xl shadow-sm text-center space-y-4">
                 <h3 className="text-xl font-bold font-outfit">Need something custom?</h3>
                 <p className="text-muted-foreground">If none of these tiers fit your specific needs, let&apos;s talk about a bespoke solution.</p>
                 <Button className="w-full rounded-full bg-primary text-primary-foreground font-bold" render={<Link href="/estimator" />}>Request Custom Quote</Button>
               </div>
             </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
