import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, FileText, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">U</span>
            </div>
            <span className="text-xl font-bold text-foreground">UrbanX</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#report" className="text-muted-foreground hover:text-primary transition-smooth">
              Report Issue
            </a>
            <a href="#track" className="text-muted-foreground hover:text-primary transition-smooth">
              Track Status
            </a>
            <a href="#dashboard" className="text-muted-foreground hover:text-primary transition-smooth">
              Dashboard
            </a>
            <a href="#about" className="text-muted-foreground hover:text-primary transition-smooth">
              About
            </a>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-3">
            <Button variant="outline" size="sm">
              <BarChart3 className="w-4 h-4" />
              Dashboard
            </Button>
            <Button variant="civic" size="sm">
              <FileText className="w-4 h-4" />
              Report Issue
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className={cn(
          "md:hidden mt-4 space-y-3 transition-all duration-300",
          isMenuOpen ? "block opacity-100" : "hidden opacity-0"
        )}>
          <nav className="flex flex-col space-y-3">
            <a href="#report" className="text-muted-foreground hover:text-primary py-2 transition-smooth">
              Report Issue
            </a>
            <a href="#track" className="text-muted-foreground hover:text-primary py-2 transition-smooth">
              Track Status
            </a>
            <a href="#dashboard" className="text-muted-foreground hover:text-primary py-2 transition-smooth">
              Dashboard
            </a>
            <a href="#about" className="text-muted-foreground hover:text-primary py-2 transition-smooth">
              About
            </a>
          </nav>
          <div className="flex flex-col space-y-2 pt-3 border-t border-border">
            <Button variant="outline" size="sm" className="w-full">
              <BarChart3 className="w-4 h-4" />
              Dashboard
            </Button>
            <Button variant="civic" size="sm" className="w-full">
              <FileText className="w-4 h-4" />
              Report Issue
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};