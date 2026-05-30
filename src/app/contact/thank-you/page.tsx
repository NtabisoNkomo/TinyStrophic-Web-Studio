"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Button } from "@/components/ui/button"
import { CheckCircle2, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

export default function ThankYou() {
  const router = useRouter()
  const [countdown, setCountdown] = useState(10)

  useEffect(() => {
    if (countdown === 0) {
      router.push("/")
      return
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1)
    }, 1000)

    return () => clearTimeout(timer)
  }, [countdown, router])

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-grow pt-32 flex items-center justify-center">
        <div className="container mx-auto px-4 py-16 flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-xl text-center space-y-8 p-10 md:p-12 rounded-[2.5rem] border border-border/50 bg-background/30 backdrop-blur-md shadow-2xl relative overflow-hidden"
          >
            {/* Ambient Background Glow */}
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

            <div className="flex justify-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
                className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center border border-primary/30"
              >
                <CheckCircle2 className="h-10 w-10 text-primary" />
              </motion.div>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-extrabold font-outfit tracking-tight bg-gradient-to-r from-primary via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                Thank You!
              </h1>
              <p className="text-xl font-bold font-outfit text-foreground/80">
                Your message has been received.
              </p>
              <p className="text-muted-foreground max-w-md mx-auto text-base">
                We appreciate you reaching out. A specialist from Monarch Web Studio will get back to you within 24 hours.
              </p>
            </div>

            <div className="p-6 bg-accent/5 rounded-2xl border border-border/30 max-w-sm mx-auto space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Redirecting to home page in
              </p>
              <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
                {/* SVG Countdown Circle */}
                <svg className="absolute w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-border/30"
                    strokeWidth="2.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <motion.path
                    className="text-primary"
                    strokeWidth="2.5"
                    strokeDasharray="100, 100"
                    animate={{ strokeDasharray: [`${(countdown / 10) * 100}, 100`] }}
                    transition={{ duration: 0.3 }}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <span className="text-2xl font-black font-outfit text-foreground">
                  {countdown}
                </span>
              </div>
            </div>

            <div className="pt-2">
              <Button
                onClick={() => router.push("/")}
                className="rounded-full px-8 py-5 font-bold text-base bg-primary text-primary-foreground group"
              >
                Go Home Now
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
