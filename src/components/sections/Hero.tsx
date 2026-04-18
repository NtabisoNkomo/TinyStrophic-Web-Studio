"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import Link from "next/link"

export function Hero({ projectsCount = 5 }: { projectsCount?: number }) {
  return (
    <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
      <div className="container relative z-10 px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4"
          >
            <CheckCircle2 className="h-4 w-4" />
            <span>South Africa&apos;s Premium Web Studio</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl font-bold tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl font-outfit max-w-5xl"
          >
            We Build Websites That <span className="text-primary italic">Grow</span> Your Business
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-[800px] text-muted-foreground md:text-xl lg:text-2xl"
          >
            TinyStrophic Web Studio creates high-converting, premium digital experiences for South African small-to-medium businesses. Establish your presence, engage your audience, and scale your growth.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 text-lg font-bold group" render={<Link href="/estimator" />}>
              Get a Free Website Audit
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8 text-lg font-bold" render={<Link href="/services" />}>
              View Our Work
            </Button>
          </motion.div>

          {/* Stats/Trust Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-8 pt-12 mt-12 border-t border-border/50 w-full max-w-4xl"
          >
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-primary">{Math.max(5, projectsCount)}+</span>
              <span className="text-sm text-muted-foreground uppercase tracking-widest">Projects Done</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-primary">99%</span>
              <span className="text-sm text-muted-foreground uppercase tracking-widest">Client Success</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-primary">24/7</span>
              <span className="text-sm text-muted-foreground uppercase tracking-widest">Expert Support</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
