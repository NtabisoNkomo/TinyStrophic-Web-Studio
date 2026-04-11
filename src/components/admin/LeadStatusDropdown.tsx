"use client"

import { useState } from "react"
import { updateLeadStatus } from "@/lib/actions/leads"

export function LeadStatusDropdown({ leadId, currentStatus }: { leadId: string; currentStatus: string }) {
  const [status, setStatus] = useState(currentStatus)
  const [isUpdating, setIsUpdating] = useState(false)

  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value
    setIsUpdating(true)
    const result = await updateLeadStatus(leadId, newStatus)
    if (result.success) {
      setStatus(newStatus)
    }
    setIsUpdating(false)
  }

  return (
    <select 
      value={status} 
      onChange={handleStatusChange} 
      disabled={isUpdating}
      className={`w-[120px] h-8 text-xs font-bold rounded-full border-none px-3 outline-none cursor-pointer appearance-none text-center
        ${status === "NEW" ? "bg-primary/20 text-primary" : 
          status === "CONTACTED" ? "bg-blue-500/10 text-blue-500" :
          "bg-green-500/10 text-green-500"}`}
    >
      <option value="NEW" className="text-black bg-white">New</option>
      <option value="CONTACTED" className="text-black bg-white">Contacted</option>
      <option value="CLOSED" className="text-black bg-white">Closed</option>
    </select>
  )
}
