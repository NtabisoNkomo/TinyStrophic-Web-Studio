"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { Menu, Crown, Sun } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const navItems = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Pricing", href: "/pricing" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="relative h-10 w-10 overflow-hidden rounded-xl border border-primary/20 bg-white transition-transform group-hover:scale-110">
            <Image
              src="/logo.png"
              alt="TinyStrophic Logo"
              fill
              className="object-cover"
            />
          </div>
          <span className="text-2xl font-bold tracking-tighter text-foreground font-outfit uppercase">
            TINYSTROPHIC<span className="text-primary">.</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === item.href ? "text-primary" : "text-muted-foreground"
              )}
            >
              {item.name}
            </Link>
          ))}
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6" render={<Link href="/contact" />}>
            Get Started
          </Button>
        </nav>

        {/* Mobile Navigation */}
        <div className="flex items-center space-x-4 md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger
              render={
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              }
            />
            <SheetContent side="right" className="w-full sm:max-w-md bg-background/95 border-l border-border/40 backdrop-blur-xl p-8 flex flex-col justify-between h-full font-outfit">
              <div>
                <SheetHeader className="pb-6 border-b border-border/40">
                  <SheetTitle className="text-left font-outfit text-2xl font-bold tracking-tighter uppercase">
                    TINYSTROPHIC<span className="text-primary">.</span>
                  </SheetTitle>
                </SheetHeader>
                
                <nav className="flex flex-col space-y-6 mt-12">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "text-3xl font-bold tracking-tight transition-all duration-300 hover:text-primary flex items-center justify-between group",
                        pathname === item.href ? "text-primary pl-2" : "text-foreground/90"
                      )}
                    >
                      <span>{item.name}</span>
                      {pathname === item.href ? (
                        <span className="h-2 w-2 rounded-full bg-primary" />
                      ) : (
                        <span className="h-2 w-2 rounded-full bg-primary scale-0 group-hover:scale-100 transition-transform duration-300" />
                      )}
                    </Link>
                  ))}
                </nav>
              </div>

              <div className="space-y-8 mt-auto">
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full py-6 font-bold text-lg shadow-lg shadow-primary/20" render={<Link href="/contact" onClick={() => setIsOpen(false)} />}>
                  Get Started
                </Button>

                {/* Footer Info inside Menu */}
                <div className="pt-6 border-t border-border/40 space-y-3 text-sm text-muted-foreground">
                  <p className="font-semibold text-foreground">TinyStrophic Web Studios</p>
                  <p>tinystrophic@gmail.com</p>
                  <p>075 977 7983</p>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
