import { SectionHeader } from "@/components/ui/section-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Layout, Code2, Search, Settings } from "lucide-react"

const services = [
  {
    title: "Starter Presence",
    description: "Get your business online fast with professional, mobile-friendly starter packages.",
    icon: Layout,
  },
  {
    title: "Pro Business Sites",
    description: "Custom UI designs and advanced functionality for growing South African brands.",
    icon: Code2,
  },
  {
    title: "Business Automation",
    description: "High-end custom web apps and API integrations to automate your business operations.",
    icon: Settings,
  },
  {
    title: "Growth SEO",
    description: "Outcome-driven SEO strategies to increase reach, drive leads, and scale your growth.",
    icon: Search,
  },
]

export function ServicesPreview() {
  return (
    <section className="py-24 bg-accent/5">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="Premium Services for Ambitious Businesses"
          subtitle="We offer a comprehensive suite of digital services designed to scale your South African business in the digital age."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="border-border/50 bg-background/50 backdrop-blur hover:border-primary/50 transition-all duration-300 group">
              <CardHeader>
                <div className="mb-4 p-3 rounded-2xl bg-primary/10 w-fit group-hover:bg-primary/20 transition-colors">
                  <service.icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl font-outfit">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm md:text-base leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
