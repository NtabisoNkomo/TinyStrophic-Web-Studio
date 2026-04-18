"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Check, ChevronRight, ChevronLeft, Download, Send } from "lucide-react"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"
import { submitQuote } from "@/lib/actions/quotes"
import { toast } from "sonner"

const availableServices = [
  { id: "web-design", name: "Website Design", basePrice: 3000 },
  { id: "web-dev", name: "Web Development", basePrice: 8000 },
  { id: "seo", name: "SEO Optimization", basePrice: 3000 },
  { id: "maintenance", name: "Maintenance", basePrice: 1500 },
]

const availableFeatures = [
  { id: "none", name: "No Additions", price: 0 },
  { id: "pages", name: "Up to 10 Pages", price: 2000 },
  { id: "blog", name: "Blog / CMS", price: 3500 },
  { id: "contact", name: "Advanced Forms", price: 1000 },
  { id: "admin", name: "Custom Admin Panel", price: 6000 },
  { id: "animation", name: "Premium Animations", price: 4000 },
]

export function EstimatorWizard({ initialPlan }: { initialPlan?: string | null }) {
  // Map pricing plans to pre-selected services and features
  const planServiceMap: Record<string, string[]> = {
    Starter: ["web-design"],
    Growth: ["web-design", "web-dev", "seo"],
    Premium: ["web-design", "web-dev", "seo", "maintenance"],
  }
  const planFeatureMap: Record<string, string[]> = {
    Starter: ["none"],
    Growth: ["pages", "contact"],
    Premium: ["pages", "blog", "contact", "admin", "animation"],
  }

  const initialServices = initialPlan ? planServiceMap[initialPlan] || [] : []
  const initialFeatures = initialPlan ? planFeatureMap[initialPlan] || [] : []

  const [step, setStep] = useState(1)
  const [selectedServices, setSelectedServices] = useState<string[]>(initialServices)
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(initialFeatures)
  const [clientName, setClientName] = useState("")
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const toggleService = (id: string) => {
    setSelectedServices(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id])
  }

  const toggleFeature = (id: string) => {
    if (id === "none") {
      setSelectedFeatures(["none"])
      return
    }
    setSelectedFeatures(prev => {
      const next = prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
      return next.filter(f => f !== "none")
    })
  }

  const calculateTotal = () => {
    let total = 0
    selectedServices.forEach(id => {
      total += availableServices.find(s => s.id === id)?.basePrice || 0
    })
    selectedFeatures.forEach(id => {
      total += availableFeatures.find(f => f.id === id)?.price || 0
    })
    return total
  }

  const generatePDF = () => {
    const doc = new jsPDF()
    const pageWidth = doc.internal.pageSize.getWidth()
    const pageHeight = doc.internal.pageSize.getHeight()
    
    // Background
    doc.setFillColor(15, 15, 15)
    doc.rect(0, 0, pageWidth, pageHeight, "F")

    // Header
    doc.setTextColor(255, 255, 255)
    doc.setFont("helvetica", "bold")
    doc.setFontSize(24)
    doc.text("PROJECT QUOTE", 14, 25)
    
    doc.setFont("helvetica", "normal")
    doc.setFontSize(8)
    doc.setTextColor(150, 150, 150)
    doc.text("TINYSTROPHIC WEB STUDIO", 14, 32)

    // Date
    doc.setFontSize(8)
    doc.setTextColor(100, 100, 100)
    doc.text("GENERATED ON", pageWidth - 14, 25, { align: "right" })
    doc.setFontSize(12)
    doc.setTextColor(255, 255, 255)
    doc.text(new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }), pageWidth - 14, 32, { align: "right" })

    // Header Line
    doc.setDrawColor(40, 40, 40)
    doc.line(14, 40, pageWidth - 14, 40)

    // Configuration Section
    doc.setFontSize(8)
    doc.setTextColor(100, 100, 100)
    doc.text("PROJECT CONFIGURATION", 14, 52)

    doc.text("Client Name", 14, 62)
    doc.setFontSize(10)
    doc.setTextColor(255, 255, 255)
    doc.setFont("helvetica", "bold")
    doc.text(clientName ? clientName.toUpperCase() : "VALUED CLIENT", 14, 68)

    doc.setFont("helvetica", "normal")
    doc.setFontSize(8)
    doc.setTextColor(100, 100, 100)
    doc.text("Email", 14, 78)
    doc.setFontSize(10)
    doc.setTextColor(255, 255, 255)
    doc.setFont("helvetica", "bold")
    doc.text(email ? email.toUpperCase() : "NOT PROVIDED", 14, 84)

    // Right-side box for Primary Service
    const primaryService = selectedServices.length > 0 ? availableServices.find(s => s.id === selectedServices[0])?.name : "Custom Development"
    
    doc.setFillColor(30, 30, 30)
    doc.roundedRect(pageWidth / 2, 52, (pageWidth / 2) - 14, 34, 3, 3, "F")
    
    doc.setFont("helvetica", "normal")
    doc.setFontSize(8)
    doc.setTextColor(150, 150, 150)
    doc.text("PRIMARY DELIVERABLE", pageWidth / 2 + ((pageWidth / 2 - 14) / 2), 64, { align: "center" })
    
    doc.setFontSize(11)
    doc.setTextColor(255, 255, 255)
    doc.setFont("helvetica", "bold")
    doc.text(primaryService ? primaryService.toUpperCase() : "CUSTOM", pageWidth / 2 + ((pageWidth / 2 - 14) / 2), 72, { align: "center" })

    // Line separator
    doc.setDrawColor(40, 40, 40)
    doc.line(14, 100, pageWidth - 14, 100)

    // Breakdown Section
    doc.setFont("helvetica", "bold")
    doc.setFontSize(8)
    doc.setTextColor(100, 100, 100)
    doc.text("INVESTMENT BREAKDOWN", 14, 112)

    const tableData: [string, string][] = []
    selectedServices.forEach(id => {
      const s = availableServices.find(x => x.id === id)
      if (s) tableData.push([s.name, `R ${s.basePrice.toLocaleString()}`])
    })
    selectedFeatures.forEach(id => {
      if (id === "none") return
      const f = availableFeatures.find(x => x.id === id)
      if (f) tableData.push([f.name, `R ${f.price.toLocaleString()}`])
    })

    if (tableData.length === 0) {
       tableData.push(["No Selection", "R 0"])
    }

    autoTable(doc, {
      startY: 120,
      body: tableData,
      theme: 'plain',
      styles: {
        fillColor: [15, 15, 15],
        textColor: [200, 200, 200],
        fontSize: 10,
        cellPadding: 5,
        font: "helvetica",
      },
      columnStyles: {
        0: { halign: 'left' },
        1: { halign: 'right', fontStyle: 'bold', textColor: [255, 255, 255] }
      },
      didDrawCell: (data) => {
        if (data.row.index < tableData.length && data.column.index === 0) {
          doc.setDrawColor(40, 40, 40)
          doc.line(data.cell.x, data.cell.y + data.cell.height, data.cell.x + 182, data.cell.y + data.cell.height)
        }
      }
    })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const finalY = (doc as any).lastAutoTable.finalY + 15

    // Total Box
    doc.setFillColor(240, 240, 240)
    doc.roundedRect(14, finalY, pageWidth - 28, 40, 4, 4, "F")

    doc.setFontSize(8)
    doc.setTextColor(150, 150, 150)
    doc.setFont("helvetica", "bold")
    doc.text("TOTAL ESTIMATED INVESTMENT", 22, finalY + 12)

    doc.setFontSize(28)
    doc.setTextColor(30, 215, 96) // bright green
    doc.text(`R ${calculateTotal().toLocaleString()}`, 22, finalY + 30)

    doc.setFontSize(7)
    doc.setTextColor(180, 180, 180)
    doc.setFont("helvetica", "normal")
    doc.text("VERIFIED AUTOMATED SIMULATION\nBASED ON CURRENT MARKET\nCOEFFICIENTS.", pageWidth - 22, finalY + 20, { align: "right" })

    // Footer
    doc.setFontSize(6)
    doc.setTextColor(80, 80, 80)
    doc.text("THIS DOCUMENT IS AN AUTOMATED ESTIMATION AND IS SUBJECT TO FINAL TECHNICAL REVIEW AND SPECIFIC SITE CONDITIONS.", pageWidth / 2, pageHeight - 20, { align: "center" })
    doc.text("© " + new Date().getFullYear() + " TINYSTROPHIC WEB STUDIO. ALL RIGHTS RESERVED.", pageWidth / 2, pageHeight - 15, { align: "center" })

    doc.save("TinyStrophic_Estimate.pdf")
  }

  const handleSubmit = async () => {
    if (!clientName || !email) {
      toast.error("Please enter your name and email.")
      return
    }
    setIsSubmitting(true)

    const srv = selectedServices.map(id => availableServices.find(x => x.id === id)?.name).join(", ")
    const feat = selectedFeatures.map(id => availableFeatures.find(x => x.id === id)?.name).join(", ")

    const result = await submitQuote({
      clientName,
      email,
      services: srv || "None",
      features: feat || "None",
      estimatedCost: calculateTotal(),
    })

    setIsSubmitting(false)

    if (result.success) {
      toast.success("Quote request sent successfully!")
      setStep(4)
    } else {
      toast.error(result.error || "Failed to send.")
    }
  }

  return (
    <div className="space-y-8">
      {/* Progress */}
      <div className="flex justify-between items-center mb-8 bg-accent/10 p-4 rounded-full">
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= s ? 'bg-primary text-primary-foreground' : 'bg-background text-muted-foreground border border-border'}`}>
              {step > s ? <Check className="w-5 h-5" /> : s}
            </div>
            {s < 4 && <div className={`w-8 md:w-24 h-1 mx-2 ${step > s ? 'bg-primary' : 'bg-border'}`} />}
          </div>
        ))}
      </div>

      {step === 1 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold font-outfit">Select Required Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {availableServices.map(service => (
              <Card key={service.id} className={`cursor-pointer transition-all ${selectedServices.includes(service.id) ? 'border-primary ring-2 ring-primary/20 bg-primary/5' : 'hover:border-primary/50'}`} onClick={() => toggleService(service.id)}>
                <CardContent className="p-6 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold">{service.name}</h3>
                    <p className="text-sm text-muted-foreground">Starting from R{service.basePrice}</p>
                  </div>
                  <div className={`w-6 h-6 rounded-full border flex items-center justify-center ${selectedServices.includes(service.id) ? 'bg-primary border-primary text-primary-foreground' : 'border-border'}`}>
                    {selectedServices.includes(service.id) && <Check className="w-4 h-4" />}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold font-outfit">Select Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {availableFeatures.map(feature => (
              <Card key={feature.id} className={`cursor-pointer transition-all ${selectedFeatures.includes(feature.id) ? 'border-primary ring-2 ring-primary/20 bg-primary/5' : 'hover:border-primary/50'}`} onClick={() => toggleFeature(feature.id)}>
                <CardContent className="p-6 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold">{feature.name}</h3>
                    <p className="text-sm text-muted-foreground">+ R{feature.price}</p>
                  </div>
                  <div className={`w-6 h-6 rounded-full border flex items-center justify-center ${selectedFeatures.includes(feature.id) ? 'bg-primary border-primary text-primary-foreground' : 'border-border'}`}>
                    {selectedFeatures.includes(feature.id) && <Check className="w-4 h-4" />}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold font-outfit">Your Details</h2>
          <div className="grid gap-6 bg-accent/5 p-8 rounded-2xl border border-border/50">
            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-widest opacity-60">Full Name</label>
              <Input value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="John Doe" className="bg-background" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-widest opacity-60">Email Address</label>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="john@example.com" className="bg-background" />
            </div>
            
            <div className="pt-6 border-t border-border mt-6">
              <h3 className="text-xl font-bold font-outfit mb-4">Estimate Summary</h3>
              <div className="flex justify-between items-center text-lg font-bold text-primary">
                <span>Total Estimated Cost:</span>
                <span>R{calculateTotal()}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="text-center py-16 space-y-6 bg-accent/5 rounded-3xl border border-border">
          <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto text-primary">
            <Check className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-bold font-outfit">Quote Requested Successfully!</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Your quote estimate of <strong>R{calculateTotal()}</strong> has been submitted. Our team will review your requirements and reach out to you within 24 hours to discuss the details.
          </p>
          <div className="flex justify-center mt-8">
            <Button onClick={generatePDF} className="rounded-full px-8" variant="secondary">
              <Download className="w-4 h-4 mr-2" /> Download Quote PDF
            </Button>
          </div>
        </div>
      )}

      {step < 4 && (
        <div className="flex justify-between pt-6 border-t border-border mt-8">
          <Button disabled={step === 1} onClick={() => setStep(prev => prev - 1)} variant="outline" className="rounded-full">
            <ChevronLeft className="w-4 h-4 mr-2" /> Back
          </Button>
          
          {step < 3 ? (
            <Button onClick={() => setStep(prev => prev + 1)} className="rounded-full px-8">
              Next Step <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <div className="flex space-x-4">
              <Button onClick={generatePDF} variant="outline" className="rounded-full">
                <Download className="w-4 h-4 mr-2" /> Download PDF
              </Button>
              <Button onClick={handleSubmit} disabled={isSubmitting} className="rounded-full px-8">
                {isSubmitting ? "Sending..." : "Send Request"} <Send className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
