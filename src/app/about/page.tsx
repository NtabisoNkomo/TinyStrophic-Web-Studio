import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { SectionHeader } from "@/components/ui/section-header"
import { Crown, Heart, Target, Users } from "lucide-react"

export default function About() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-32">
        <div className="container mx-auto px-4 py-16">
          <SectionHeader
            title="The Monarch Story"
            subtitle="Based in Johannesburg, we are a small but mighty team of creators dedicated to elevating South African businesses through premium digital design."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
            <div className="space-y-6">
              <h3 className="text-3xl font-bold font-outfit">Our Mission</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                At Monarch Web Studio, we believe that every local business deserves a world-class online presence. We noticed a gap in the market: small businesses were either stuck with DIY sites that didn&apos;t convert, or priced out of high-end corporate agencies.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                We bridge that gap by providing premium, bespoke web solutions at accessible price points. Our goal is to help you establish trust, showcase your excellence, and ultimately grow your business in the competitive South African landscape.
              </p>
            </div>
            <div className="relative aspect-video rounded-3xl bg-accent overflow-hidden border border-primary/20 flex items-center justify-center p-12">
               <Crown className="h-24 w-24 text-primary opacity-20" />
               <p className="absolute bottom-8 left-8 right-8 text-sm font-medium italic opacity-60">
                 &quot;Excellence is not an act, but a habit. We make excellence the standard for every project we touch.&quot;
               </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
            {[
              { title: "Integrity", icon: Heart, desc: "We are honest, transparent, and dedicated to your success." },
              { title: "Growth", icon: Target, desc: "Everything we build is designed to drive results and business growth." },
              { title: "Community", icon: Users, desc: "We are proud South Africans supporting the local economy." }
            ].map((v, i) => (
              <div key={i} className="p-8 rounded-2xl border border-border bg-accent/5 space-y-4">
                <v.icon className="h-10 w-10 text-primary" />
                <h4 className="text-xl font-bold font-outfit">{v.title}</h4>
                <p className="text-muted-foreground">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-primary/5 rounded-[3rem] p-12 md:p-24 text-center space-y-8">
            <SectionHeader
              title="Meet the Founder"
              subtitle="Driven by a passion for design and local entrepreneurship."
              className="mb-0"
            />
            <div className="max-w-3xl mx-auto space-y-6">
              <p className="text-xl text-muted-foreground italic">
                &quot;I started Monarch Web Studio to give South African founders the digital tools they need to compete on a global stage. We treat every project as if it were our own business.&quot;
              </p>
              <div>
                <h4 className="text-2xl font-bold font-outfit text-primary">Ntabiso Sola Nkomo</h4>
                <p className="text-sm uppercase tracking-widest font-bold opacity-60">Founder, Lead Designer & Developer</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
