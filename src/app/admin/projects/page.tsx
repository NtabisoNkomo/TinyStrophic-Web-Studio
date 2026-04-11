import { Crown, LayoutGrid, Plus, Trash2 } from "lucide-react"
export const dynamic = "force-dynamic"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getProjects } from "@/lib/actions/projects"
import Image from "next/image"
import Link from "next/link"

export default async function AdminProjects() {
  const projects = await getProjects()

  return (
    <div className="flex flex-col min-h-screen bg-accent/5">
      <header className="bg-background border-b border-border p-4 sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Crown className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold font-outfit uppercase">Monarch Admin</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-sm" render={<Link href="/admin/dashboard">Dashboard</Link>} />
            <Button variant="ghost" className="text-sm" render={<Link href="/">View Website</Link>} />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold font-outfit mb-2">Portfolio Management</h1>
            <p className="text-muted-foreground">Manage your featured projects and case studies.</p>
          </div>
          <Button className="bg-primary text-primary-foreground rounded-full h-10 px-6 font-bold">
            <Plus className="mr-2 h-4 w-4" /> Add Project
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Card key={project.id} className="overflow-hidden border-border/50 group flex flex-col">
              <div className="relative aspect-video overflow-hidden bg-accent/20">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                  unoptimized={project.image.startsWith("http") || !project.image.startsWith("/")}
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-4">
                  {project.url && (
                    <a href={project.url} target="_blank" rel="noopener noreferrer">
                      <Button variant="secondary" size="sm">
                        View
                      </Button>
                    </a>
                  )}
                  <Button variant="destructive" size="icon" className="rounded-full">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardHeader className="pb-4">
                <CardDescription className="font-bold uppercase tracking-widest text-primary text-xs">
                  {project.category}
                </CardDescription>
                <CardTitle className="font-outfit text-xl">{project.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.split(',').map((tag: string) => (
                    <span key={tag} className="text-[10px] font-bold uppercase tracking-wide px-2 py-1 rounded bg-secondary text-secondary-foreground">
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
          {projects.length === 0 && (
            <div className="col-span-full py-20 text-center border-2 border-dashed border-border rounded-xl">
              <LayoutGrid className="h-12 w-12 mx-auto text-muted-foreground opacity-20 mb-4" />
              <h3 className="text-xl font-bold font-outfit mb-2">No projects found</h3>
              <p className="text-muted-foreground">Get started by adding your first portfolio piece.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
