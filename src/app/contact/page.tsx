"use client"

import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { SectionHeader } from "@/components/ui/section-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone, MapPin, MessageSquare, Send } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { submitLead } from "@/lib/actions/leads"
import { useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  businessName: z.string().min(2, "Business name is required"),
  budget: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

type ContactFormValues = z.infer<typeof contactFormSchema>

function ContactContent() {
  const searchParams = useSearchParams()
  const plan = searchParams.get("plan")

  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      budget: plan ? `${plan} Plan` : "",
      message: plan ? `Hi, I'm interested in the ${plan} plan. ` : "",
    },
  })

  const onSubmit = async (data: ContactFormValues) => {
    setError("")
    setIsSuccess(false)
    
    try {
      const result = await submitLead(data)
      if (result.success) {
        setIsSuccess(true)
        reset()
      } else {
        setError(result.error || "Failed to send message")
      }
    } catch {
      setError("An unexpected error occurred")
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
      {/* Contact Form */}
      <div className="space-y-8">
        <h3 className="text-3xl font-bold font-outfit">Send us a message</h3>
        
        {isSuccess ? (
          <div className="p-10 rounded-3xl bg-primary/10 border border-primary/20 text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
              <Send className="h-8 w-8 text-primary" />
            </div>
            <h4 className="text-2xl font-bold font-outfit">Message Received!</h4>
            <p className="text-muted-foreground">Thank you for reaching out. A TinyStrophic specialist will contact you within 24 hours.</p>
            <Button onClick={() => setIsSuccess(false)} variant="outline" className="rounded-full">Send Another Message</Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {error && (
              <div className="p-4 bg-destructive/10 border border-destructive/20 text-destructive text-sm rounded-xl">
                {error}
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-widest opacity-60">Full Name</label>
                <Input {...register("name")} placeholder="John Doe" className="bg-accent/5 border-border/50" />
                {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-widest opacity-60">Email Address</label>
                <Input {...register("email")} placeholder="john@example.com" className="bg-accent/5 border-border/50" />
                {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-widest opacity-60">Phone Number</label>
                <Input {...register("phone")} placeholder="+27 82 000 0000" className="bg-accent/5 border-border/50" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-widest opacity-60">Business Name</label>
                <Input {...register("businessName")} placeholder="Acme Corp" className="bg-accent/5 border-border/50" />
                {errors.businessName && <p className="text-xs text-destructive">{errors.businessName.message}</p>}
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-widest opacity-60">Budget Range</label>
                <Input {...register("budget")} placeholder="e.g. R5,000 - R10,000" className="bg-accent/5 border-border/50" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-widest opacity-60">Your Message</label>
              <Textarea 
                {...register("message")} 
                placeholder="Tell us about your project goals..." 
                className="min-h-[150px] bg-accent/5 border-border/50" 
              />
              {errors.message && <p className="text-xs text-destructive">{errors.message.message}</p>}
            </div>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full sm:w-auto bg-primary text-primary-foreground rounded-full px-12 py-6 font-bold text-lg"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
              <Send className="ml-2 h-5 w-5" />
            </Button>
          </form>
        )}
      </div>

      {/* Contact Info & WhatsApp */}
      <div className="space-y-12">
        <div className="grid grid-cols-1 gap-6">
          {[
            { title: "Direct Email", value: "hello@tinystrophic.co.za", icon: Mail },
            { title: "Phone Support", value: "+27 12 345 6789", icon: Phone },
            { title: "Main Studio", value: "Johannesburg, South Africa", icon: MapPin },
          ].map((item, i) => (
            <Card key={i} className="border-border/50 bg-accent/5 overflow-hidden">
              <CardContent className="p-6 flex items-center space-x-6">
                 <div className="p-3 bg-primary/10 rounded-xl">
                   <item.icon className="h-6 w-6 text-primary" />
                 </div>
                 <div>
                   <h4 className="text-xs font-bold uppercase tracking-widest opacity-60">{item.title}</h4>
                   <p className="text-lg font-bold font-outfit">{item.value}</p>
                 </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="p-10 rounded-[3rem] bg-primary text-primary-foreground space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
            <div className="flex items-center space-x-3">
              <MessageSquare className="h-8 w-8" />
              <h3 className="text-2xl font-bold font-outfit">Quick Chat</h3>
            </div>
            <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest w-fit">
              Coming Soon
            </span>
          </div>
          <p className="opacity-90 leading-relaxed text-lg">
            Need a response within minutes? Reach out on WhatsApp. We&apos;re online during business hours (GMT+2).
          </p>
          <Button disabled className="w-full bg-white opacity-50 text-primary cursor-not-allowed rounded-full py-6 font-bold text-lg">
            Chat on WhatsApp
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function Contact() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-32">
        <div className="container mx-auto px-4 py-16">
          <SectionHeader
            title="Get In Touch"
            subtitle="Ready to build your masterpiece? Fill out the form below or reach out via WhatsApp for a faster response."
          />
          <Suspense>
            <ContactContent />
          </Suspense>
        </div>
      </main>
      <Footer />
    </div>
  )
}

