import Link from "next/link"
import { Sun, Mail, Phone, MapPin, Globe, MessageCircle, Camera, X } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-background border-t border-border pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center space-x-2">
              <Sun className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold font-outfit uppercase tracking-tighter">Sola</span>
            </Link>
            <p className="text-muted-foreground leading-relaxed">
              Crafting premium digital experiences for forward-thinking South African businesses. We build more than websites; we build growth.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="p-2 rounded-full bg-accent/50 hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                <Globe className="h-5 w-5" />
              </Link>
              <Link href="#" className="p-2 rounded-full bg-accent/50 hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                <MessageCircle className="h-5 w-5" />
              </Link>
              <Link href="#" className="p-2 rounded-full bg-accent/50 hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                <Camera className="h-5 w-5" />
              </Link>
              <Link href="#" className="p-2 rounded-full bg-accent/50 hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                <X className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-outfit font-bold text-lg mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/services" className="text-muted-foreground hover:text-primary transition-colors">Website Design</Link></li>
              <li><Link href="/services" className="text-muted-foreground hover:text-primary transition-colors">Custom Development</Link></li>
              <li><Link href="/services" className="text-muted-foreground hover:text-primary transition-colors">SEO Optimization</Link></li>
              <li><Link href="/services" className="text-muted-foreground hover:text-primary transition-colors">Maintenance & Support</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-outfit font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/pricing" className="text-muted-foreground hover:text-primary transition-colors">Pricing</Link></li>
              <li><Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
              <li><Link href="/login" className="text-muted-foreground hover:text-primary transition-colors">Admin Login</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-outfit font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start space-x-3 text-muted-foreground">
                <MapPin className="h-5 w-5 text-primary shrink-0" />
                <span>Johannesburg, South Africa</span>
              </li>
              <li className="flex items-center space-x-3 text-muted-foreground">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <span>hello@solawebstudio.co.za</span>
              </li>
              <li className="flex items-center space-x-3 text-muted-foreground">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <span>+27 12 345 6789</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Sola Web Studio. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
