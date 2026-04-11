"use client"

import { Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface ViewDetailsDialogProps {
  title: string
  subtitle?: string
  date: string
  content: React.ReactNode
  trigger?: React.ReactElement
}

export function ViewDetailsDialog({ title, subtitle, date, content, trigger }: ViewDetailsDialogProps) {
  return (
    <Dialog>
      <DialogTrigger 
        render={trigger || (
          <Button variant="ghost" size="icon" className="hover:bg-primary/10" title="View Details">
            <Eye className="h-4 w-4" />
          </Button>
        )}
      />
      <DialogContent className="max-w-2xl bg-background/95 backdrop-blur-md border-border/50">
        <DialogHeader>
          <div className="flex justify-between items-start">
            <div>
              <DialogTitle className="text-2xl font-bold font-outfit">{title}</DialogTitle>
              {subtitle && <p className="text-muted-foreground mt-1">{subtitle}</p>}
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground uppercase tracking-widest">{date}</p>
            </div>
          </div>
        </DialogHeader>
        <div className="mt-6 p-4 rounded-xl bg-accent/5 border border-border/20 whitespace-pre-wrap font-outfit">
          {content}
        </div>
      </DialogContent>
    </Dialog>
  )
}
