import { Hero } from "@/components/sections/Hero"
import { ServicesPreview } from "@/components/sections/ServicesPreview"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { getProjects } from "@/lib/actions/projects"

export default async function Home() {
  const allProjects = await getProjects()

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Hero projectsCount={allProjects.length} />
        <ServicesPreview />

        {/* Final CTA Section */}
        <section className="py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center space-y-8">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter font-outfit max-w-4xl mx-auto">
              Ready to Build Your Premium Online Presence?
            </h2>
            <p className="max-w-[700px] mx-auto opacity-90 md:text-xl">
              Join dozens of South African businesses that have grown with Sola Web Studio. Get a free website audit today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" variant="secondary" className="rounded-full px-10 text-lg font-bold group" render={<Link href="/estimator" />}>
                Get Your Free Audit
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent border-white hover:bg-white/10 rounded-full px-10 text-lg font-bold" render={<Link href="/contact" />}>
                Contact Us
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
