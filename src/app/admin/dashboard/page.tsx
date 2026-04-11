import { Sun, Users, FileText, CheckCircle, TrendingUp, LogOut, MessageSquare } from "lucide-react"
export const dynamic = "force-dynamic"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getLeads } from "@/lib/actions/leads"
import { getDashboardStats } from "@/lib/actions/analytics"
import { LeadStatusDropdown } from "@/components/admin/LeadStatusDropdown"
import { DashboardRefresher } from "@/components/admin/DashboardRefresher"
import { DeleteQuoteButton } from "@/components/admin/DeleteQuoteButton"
import { DeleteLeadButton } from "@/components/admin/DeleteLeadButton"
import { ViewDetailsDialog } from "@/components/admin/ViewDetailsDialog"
import { auth, signOut } from "@/auth"
import { getQuotes } from "@/lib/actions/quotes"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function AdminDashboard() {
  const session = await auth()
  
  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/login")
  }

  const allLeads = await getLeads()
  const activeLeads = allLeads.filter(l => l.status !== "CLOSED")
  const closedLeads = allLeads.filter(l => l.status === "CLOSED")
  
  const totalLeads = allLeads.length
  const newLeadsCount = allLeads.filter(l => l.status === "NEW").length
  
  const dashboardStats = await getDashboardStats()
  const quotes = await getQuotes()

  const stats = [
    { title: "Total Leads", value: totalLeads.toString(), icon: Users, change: `${newLeadsCount} new leads` },
    { title: "Active Projects", value: dashboardStats.activeProjects.toString(), icon: CheckCircle, change: "Live portfolio pieces" },
    { title: "Quote Requests", value: dashboardStats.totalAudits.toString(), icon: FileText, change: "Through estimator" },
    { title: "Conversion Rate", value: `${dashboardStats.conversionRate}%`, icon: TrendingUp, change: "Real-time" },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-accent/5">
      <DashboardRefresher intervalMs={3000} />
      {/* Admin Sidebar/Navbar */}
      <header className="bg-background border-b border-border p-4 sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Sun className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold font-outfit uppercase">Sola Admin</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-sm" render={<Link href="/" target="_blank" />}>View Website</Button>
            <form action={async () => {
              "use server"
              await signOut({ redirectTo: "/login" })
            }}>
              <Button type="submit" className="rounded-full bg-primary text-primary-foreground group">
                Logout
                <LogOut className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </form>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold font-outfit mb-2">Dashboard Overview</h1>
          <p className="text-muted-foreground">Welcome back. Here is what&apos;s happening with Sola Web Studio projects.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <Card key={i} className="border-border/50">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium opacity-60 uppercase tracking-widest">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold font-outfit">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Leads Table */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="font-outfit text-xl">Active Leads (New & Contacted)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-border text-sm opacity-60 uppercase tracking-widest">
                    <th className="pb-4 font-bold">Contact Name</th>
                    <th className="pb-4 font-bold">Business</th>
                    <th className="pb-4 font-bold">Date Received</th>
                    <th className="pb-4 font-bold">Status</th>
                    <th className="pb-4 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {activeLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-primary/5 transition-colors group">
                      <td className="py-4 font-medium">
                        <div>{lead.name}</div>
                        <div className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                          {lead.email}
                        </div>
                      </td>
                      <td className="py-4 text-muted-foreground">{lead.businessName}</td>
                      <td className="py-4 text-muted-foreground">
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-4">
                        <LeadStatusDropdown leadId={lead.id} currentStatus={lead.status} />
                      </td>
                      <td className="py-4 text-right flex items-center justify-end space-x-1">
                        <ViewDetailsDialog 
                          title={lead.name}
                          subtitle={`${lead.businessName} | ${lead.email}`}
                          date={new Date(lead.createdAt).toLocaleString()}
                          content={
                            <div className="space-y-4">
                              <div>
                                <h4 className="text-primary font-bold mb-1 flex items-center">
                                  <MessageSquare className="h-4 w-4 mr-2" />
                                  User Message
                                </h4>
                                <p className="leading-relaxed">{lead.message}</p>
                              </div>
                              {lead.phone && (
                                <div>
                                  <h4 className="text-primary font-bold mb-1">Contact Phone</h4>
                                  <p>{lead.phone}</p>
                                </div>
                              )}
                              {lead.budget && (
                                <div>
                                  <h4 className="text-primary font-bold mb-1">Project Budget</h4>
                                  <p>{lead.budget}</p>
                                </div>
                              )}
                            </div>
                          }
                        />
                        <DeleteLeadButton id={lead.id} />
                      </td>
                    </tr>
                  ))}
                  {activeLeads.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-muted-foreground">
                        No active leads found. 
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Closed Leads Table */}
        <Card className="border-border/50 mt-8">
          <CardHeader>
            <CardTitle className="font-outfit text-xl">Closed Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-border text-sm opacity-60 uppercase tracking-widest">
                    <th className="pb-4 font-bold">Contact Name</th>
                    <th className="pb-4 font-bold">Business</th>
                    <th className="pb-4 font-bold">Date Received</th>
                    <th className="pb-4 font-bold">Status</th>
                    <th className="pb-4 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {closedLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-primary/5 transition-colors group opacity-70">
                      <td className="py-4 font-medium">
                        <div>{lead.name}</div>
                        <div className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                          {lead.email}
                        </div>
                      </td>
                      <td className="py-4 text-muted-foreground">{lead.businessName}</td>
                      <td className="py-4 text-muted-foreground">
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-4">
                        <LeadStatusDropdown leadId={lead.id} currentStatus={lead.status} />
                      </td>
                      <td className="py-4 text-right flex items-center justify-end space-x-1">
                        <ViewDetailsDialog 
                          title={lead.name}
                          subtitle={`${lead.businessName} | ${lead.email}`}
                          date={new Date(lead.createdAt).toLocaleString()}
                          content={
                            <div className="space-y-4">
                              <div>
                                <h4 className="text-primary font-bold mb-1 flex items-center">
                                  <MessageSquare className="h-4 w-4 mr-2" />
                                  User Message
                                </h4>
                                <p className="leading-relaxed">{lead.message}</p>
                              </div>
                              {lead.phone && (
                                <div>
                                  <h4 className="text-primary font-bold mb-1">Contact Phone</h4>
                                  <p>{lead.phone}</p>
                                </div>
                              )}
                              {lead.budget && (
                                <div>
                                  <h4 className="text-primary font-bold mb-1">Project Budget</h4>
                                  <p>{lead.budget}</p>
                                </div>
                              )}
                            </div>
                          }
                        />
                        <DeleteLeadButton id={lead.id} />
                      </td>
                    </tr>
                  ))}
                  {closedLeads.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-muted-foreground">
                        No closed leads found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Quote Requests Table */}
        <Card className="border-border/50 mt-8">
          <CardHeader>
            <CardTitle className="font-outfit text-xl">Quote Estimator Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-border text-sm opacity-60 uppercase tracking-widest">
                    <th className="pb-4 font-bold">Client Name</th>
                    <th className="pb-4 font-bold">Services & Features</th>
                    <th className="pb-4 font-bold">Date Received</th>
                    <th className="pb-4 font-bold text-right">Estimated Cost</th>
                    <th className="pb-4 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {quotes.map((quote) => (
                    <tr key={quote.id} className="hover:bg-primary/5 transition-colors group">
                      <td className="py-4 font-medium">
                        <div>{quote.clientName}</div>
                        <div className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                          {quote.email}
                        </div>
                      </td>
                      <td className="py-4 text-muted-foreground">
                        <div className="text-sm truncate w-64 whitespace-normal" title={`Services: ${quote.services} | Features: ${quote.features}`}>
                          <span className="font-bold">S:</span> {quote.services} <br />
                          <span className="font-bold">F:</span> {quote.features}
                        </div>
                      </td>
                      <td className="py-4 text-muted-foreground">
                        {new Date(quote.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-4 text-right font-bold text-primary">
                        R{quote.estimatedCost.toLocaleString()}
                      </td>
                      <td className="py-4 text-right flex items-center justify-end space-x-1">
                        <ViewDetailsDialog 
                          title={quote.clientName}
                          subtitle={quote.email}
                          date={new Date(quote.createdAt).toLocaleString()}
                          content={
                            <div className="space-y-4">
                              <div>
                                <h4 className="text-primary font-bold mb-1 underline">Selected Services</h4>
                                <p className="leading-relaxed">{quote.services}</p>
                              </div>
                              <div>
                                <h4 className="text-primary font-bold mb-1 underline">Selected Features</h4>
                                <p className="leading-relaxed">{quote.features}</p>
                              </div>
                              <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                                <h4 className="font-bold">Total Estimated Cost</h4>
                                <p className="text-2xl font-bold text-primary">R{quote.estimatedCost.toLocaleString()}</p>
                              </div>
                            </div>
                          }
                        />
                        <DeleteQuoteButton id={quote.id} />
                      </td>
                    </tr>
                  ))}
                  {quotes.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-muted-foreground">
                        No quote requests found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
