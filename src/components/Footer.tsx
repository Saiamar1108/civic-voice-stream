import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  ExternalLink
} from "lucide-react";

const departments = [
  { name: "Public Works", phone: "080-12345678", email: "pwd@municipality.gov" },
  { name: "Water Supply", phone: "080-12345679", email: "water@municipality.gov" },
  { name: "Municipal Corp", phone: "080-12345680", email: "municipal@municipality.gov" },
  { name: "Electricity Board", phone: "080-12345681", email: "electricity@municipality.gov" }
];

const quickLinks = [
  { title: "Report Issue", href: "#report" },
  { title: "Track Report", href: "#track" },
  { title: "Dashboard", href: "#dashboard" },
  { title: "About Us", href: "#about" },
  { title: "Contact", href: "#contact" },
  { title: "Privacy Policy", href: "#privacy" },
  { title: "Terms of Service", href: "#terms" },
  { title: "Help Center", href: "#help" }
];

export const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">U</span>
              </div>
              <span className="text-xl font-bold text-background">UrbanX</span>
            </div>
            <p className="text-background/80 text-sm leading-relaxed">
              Bridging the gap between citizens and local government through 
              modern technology. Making civic engagement accessible, transparent, 
              and effective for everyone.
            </p>
            <div className="flex space-x-3">
              <Button size="icon" variant="ghost" className="text-background/60 hover:text-background hover:bg-background/10">
                <Facebook className="w-4 h-4" />
              </Button>
              <Button size="icon" variant="ghost" className="text-background/60 hover:text-background hover:bg-background/10">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button size="icon" variant="ghost" className="text-background/60 hover:text-background hover:bg-background/10">
                <Instagram className="w-4 h-4" />
              </Button>
              <Button size="icon" variant="ghost" className="text-background/60 hover:text-background hover:bg-background/10">
                <Linkedin className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-background mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-background/80 hover:text-background text-sm transition-colors flex items-center group"
                  >
                    {link.title}
                    <ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Departments */}
          <div>
            <h3 className="text-lg font-semibold text-background mb-4">Departments</h3>
            <ul className="space-y-3">
              {departments.map((dept, index) => (
                <li key={index} className="text-sm">
                  <div className="text-background font-medium mb-1">{dept.name}</div>
                  <div className="flex items-center text-background/70 text-xs mb-1">
                    <Phone className="w-3 h-3 mr-1" />
                    {dept.phone}
                  </div>
                  <div className="flex items-center text-background/70 text-xs">
                    <Mail className="w-3 h-3 mr-1" />
                    {dept.email}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-background mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-2 text-sm">
                <MapPin className="w-4 h-4 text-background/60 mt-0.5 shrink-0" />
                <div className="text-background/80">
                  <div>Municipal Corporation Building</div>
                  <div>123 Government Avenue</div>
                  <div>City Center, State 12345</div>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="w-4 h-4 text-background/60" />
                <span className="text-background/80">1-800-CIVIC-HELP</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="w-4 h-4 text-background/60" />
                <span className="text-background/80">support@urbanx.gov</span>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="mt-6">
              <h4 className="text-background font-medium mb-2 text-sm">Stay Updated</h4>
              <div className="flex space-x-2">
                <input 
                  type="email" 
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 text-xs bg-background/10 border border-background/20 rounded text-background placeholder-background/60 focus:outline-none focus:border-background/40"
                />
                <Button size="sm" variant="secondary" className="text-xs">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-background/20" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-background/60">
            © 2024 UrbanX. All rights reserved. Built with ❤️ for better communities.
          </div>
          <div className="flex items-center space-x-4 text-xs text-background/60">
            <span>Emergency: 911</span>
            <span>•</span>
            <span>Non-Emergency: 311</span>
            <span>•</span>
            <span>24/7 Support Available</span>
          </div>
        </div>
      </div>
    </footer>
  );
};