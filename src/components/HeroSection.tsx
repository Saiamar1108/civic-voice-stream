import { Button } from "@/components/ui/button";
import { AlertCircle, MapPin, Clock } from "lucide-react";
import heroImage from "@/assets/civic-hero.jpg";

export const HeroSection = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Modern civic building" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-3xl text-primary-foreground">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
            Your Voice,
            <span className="block text-accent-glow">Your City</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 leading-relaxed">
            Report civic issues instantly and track their resolution. 
            Together, we're building a better community.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-6 mb-10">
            <div className="flex items-center space-x-2 bg-primary-foreground/10 rounded-lg px-4 py-2">
              <AlertCircle className="w-5 h-5 text-accent-glow" />
              <span className="font-semibold">2,847 Issues Resolved</span>
            </div>
            <div className="flex items-center space-x-2 bg-primary-foreground/10 rounded-lg px-4 py-2">
              <Clock className="w-5 h-5 text-accent-glow" />
              <span className="font-semibold">48h Average Resolution</span>
            </div>
            <div className="flex items-center space-x-2 bg-primary-foreground/10 rounded-lg px-4 py-2">
              <MapPin className="w-5 h-5 text-accent-glow" />
              <span className="font-semibold">12 Departments Connected</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="hero" size="lg" className="text-lg px-8 py-4">
              Report an Issue
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-8 py-4 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-primary"
            >
              Track Existing Report
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-32 h-32 bg-accent-glow/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-48 h-48 bg-primary-glow/20 rounded-full blur-3xl"></div>
    </section>
  );
};