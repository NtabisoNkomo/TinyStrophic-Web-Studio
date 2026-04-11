import { SectionHeader } from "@/components/ui/section-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Layout, Code2, Search, Settings } from "lucide-react"

const services = [
  {
    title: "Website Design",
    description: "Stunning, bespoke designs tailored to your brand identity and target audience.",
    icon: Layout,
  },
  {
    title: "Website Development",
    description: "High-performance, responsive websites built with the latest technologies.",
    icon: Code2,
  },
  {
    title: "SEO Optimization",
    description: "Rank higher on Google and drive organic traffic to your business.",
    icon: Search,
  },
  {
    title: "Website Maintenance",
    description: "Ongoing support and updates to keep your site secure and performing.",
    icon: Settings,
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
