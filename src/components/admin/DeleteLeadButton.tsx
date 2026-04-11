"use client"

import { useState } from "react"
import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { deleteLead } from "@/lib/actions/leads"
import { toast } from "sonner"

export function DeleteLeadButton({ id }: { id: string }) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this lead? This action cannot be undone.")) return
    
    setIsDeleting(true)
    const result = await deleteLead(id)
    setIsDeleting(false)

    if (result.success) {
      toast.success("Lead deleted successfully")
    } else {
      toast.error(result.error || "Failed to delete lead")
    }
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="text-destructive hover:text-destructive hover:bg-destructive/10 -mr-2"
      disabled={isDeleting}
      onClick={handleDelete}
      title="Delete Lead"
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  )
}
