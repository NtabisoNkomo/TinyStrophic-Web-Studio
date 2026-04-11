"use client"

import { useState } from "react"
import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { deleteQuote } from "@/lib/actions/quotes"
import { toast } from "sonner"

export function DeleteQuoteButton({ id }: { id: string }) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this quote request?")) return
    
    setIsDeleting(true)
    const result = await deleteQuote(id)
    setIsDeleting(false)

    if (result.success) {
      toast.success("Quote request deleted")
    } else {
      toast.error(result.error || "Failed to delete quote")
    }
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="text-destructive hover:text-destructive hover:bg-destructive/10 -mr-2"
      disabled={isDeleting}
      onClick={handleDelete}
      title="Delete Quote"
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  )
}
