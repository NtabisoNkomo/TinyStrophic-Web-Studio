"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, Send, Calculator, MessageSquare, Check, Crown } from "lucide-react"
import { submitLead } from "@/lib/actions/leads"
import { toast } from "sonner"

interface PlanSelectModalProps {
  planName: string
  isOpen: boolean
  onClose: () => void
}

export function PlanSelectModal({ planName, isOpen, onClose }: PlanSelectModalProps) {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  if (!isOpen) return null

  const handleQuickSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email) {
      toast.error("Please fill in your name and email.")
      return
    }
    setIsSubmitting(true)

    const result = await submitLead({
      name,
      email,
      businessName: "—",
      message: `Interested in the ${planName} plan via pricing page.`,
      budget: planName,
    })

    setIsSubmitting(false)

    if (result.success) {
      setIsSuccess(true)
      toast.success("We've received your interest!")
    } else {
      toast.error(result.error || "Something went wrong.")
    }
  }

  const handleGoToContact = () => {
    onClose()
    router.push(`/contact?plan=${encodeURIComponent(planName)}`)
  }

  const handleGoToEstimator = () => {
    onClose()
    router.push(`/estimator?plan=${encodeURIComponent(planName)}`)
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-background border border-border rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="relative bg-primary/10 p-8 text-center border-b border-border/50">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-background/50 transition-colors text-muted-foreground hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="mx-auto w-14 h-14 bg-primary/20 rounded-2xl flex items-center justify-center border border-primary/30 mb-4">
            <Crown className="h-7 w-7 text-primary" />
          </div>
          <h2 className="text-2xl font-bold font-outfit">{planName} Plan</h2>
          <p className="text-sm text-muted-foreground mt-1">Choose how you&apos;d like to proceed</p>
        </div>

        {/* Body */}
        <div className="p-8 space-y-6">
          {isSuccess ? (
            <div className="text-center space-y-4 py-4">
              <div className="mx-auto w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                <Check className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold font-outfit">Thank You!</h3>
              <p className="text-muted-foreground text-sm">
                We&apos;ve received your interest in the <strong>{planName}</strong> plan. A Monarch specialist will reach out within 24 hours.
              </p>
              <Button onClick={onClose} variant="outline" className="rounded-full mt-2">
                Close
              </Button>
            </div>
          ) : (
            <>
              {/* Quick Lead Capture */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-widest opacity-60">Quick Interest Form</h3>
                <form onSubmit={handleQuickSubmit} className="space-y-3">
                  <Input
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-accent/5 border-border/50"
                  />
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-accent/5 border-border/50"
                  />
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-full font-bold"
                  >
                    {isSubmitting ? "Sending..." : "I'm Interested"}
                    <Send className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-border" />
                <span className="text-xs text-muted-foreground uppercase tracking-widest font-bold">or</span>
                <div className="h-px flex-1 bg-border" />
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className="rounded-full h-auto py-4 flex-col items-center gap-2 hover:border-primary/50 hover:bg-primary/5 transition-all"
                  onClick={handleGoToEstimator}
                >
                  <Calculator className="h-5 w-5 text-primary" />
                  <span className="text-xs font-bold">Get Detailed Quote</span>
                </Button>
                <Button
                  variant="outline"
                  className="rounded-full h-auto py-4 flex-col items-center gap-2 hover:border-primary/50 hover:bg-primary/5 transition-all"
                  onClick={handleGoToContact}
                >
                  <MessageSquare className="h-5 w-5 text-primary" />
                  <span className="text-xs font-bold">Send a Message</span>
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
