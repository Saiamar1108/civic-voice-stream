import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Smartphone, 
  Clock, 
  Shield, 
  BarChart3, 
  MapPin, 
  Bell,
  Users,
  CheckCircle2
} from "lucide-react";
import communityImage from "@/assets/community-reporting.jpg";

const features = [
  {
    icon: Smartphone,
    title: "Easy Reporting",
    description: "Report issues instantly with our user-friendly interface. Upload photos and location automatically.",
    badge: "Mobile First"
  },
  {
    icon: Clock,
    title: "Real-time Tracking",
    description: "Track your report status in real-time. Get updates via email and SMS notifications.",
    badge: "Live Updates"
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your personal information is encrypted and secure. We respect your privacy.",
    badge: "Encrypted"
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "View comprehensive statistics and trends about civic issues in your area.",
    badge: "Data Driven"
  },
  {
    icon: MapPin,
    title: "Location Intelligence",
    description: "GPS-enabled reporting with interactive maps for precise issue location tracking.",
    badge: "GPS Enabled"
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    description: "Receive timely updates about your reports and community issues that matter to you.",
    badge: "Smart Alerts"
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "Join a community of engaged citizens working together to improve local infrastructure.",
    badge: "Community"
  },
  {
    icon: CheckCircle2,
    title: "Verified Updates",
    description: "All status updates are verified by relevant departments for accurate information.",
    badge: "Verified"
  }
];

export const FeaturesSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Powerful Features for
            <span className="block text-primary">Civic Engagement</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            CivicConnect provides modern tools to bridge the gap between citizens and local government, 
            making civic participation easier and more effective than ever.
          </p>
        </div>

        {/* Community Section */}
        <div className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-foreground mb-6">
                Empowering Communities Through Technology
              </h3>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Our platform connects citizens directly with local departments, ensuring every voice is heard 
                and every issue gets the attention it deserves. Join thousands of engaged citizens making 
                a real difference in their communities.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-4 bg-gradient-subtle rounded-lg">
                  <div className="text-2xl font-bold text-primary">2,847</div>
                  <div className="text-sm text-muted-foreground">Issues Resolved</div>
                </div>
                <div className="text-center p-4 bg-gradient-subtle rounded-lg">
                  <div className="text-2xl font-bold text-accent">48hrs</div>
                  <div className="text-sm text-muted-foreground">Avg Response Time</div>
                </div>
                <div className="text-center p-4 bg-gradient-subtle rounded-lg">
                  <div className="text-2xl font-bold text-primary">12</div>
                  <div className="text-sm text-muted-foreground">Connected Departments</div>
                </div>
                <div className="text-center p-4 bg-gradient-subtle rounded-lg">
                  <div className="text-2xl font-bold text-accent">95%</div>
                  <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src={communityImage} 
                alt="Community members using technology to report civic issues"
                className="rounded-2xl shadow-card w-full"
              />
              <div className="absolute -bottom-6 -right-6 bg-accent text-accent-foreground p-4 rounded-xl shadow-elegant">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-6 h-6" />
                  <span className="font-semibold">Trusted Platform</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center group-hover:shadow-glow transition-all duration-300">
                  <feature.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <Badge variant="secondary" className="mb-2 text-xs">
                  {feature.badge}
                </Badge>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-sm leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Process Steps */}
        <div className="mt-20">
          <h3 className="text-3xl font-bold text-center text-foreground mb-12">
            How It Works
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Report Issue", desc: "Submit your civic concern with details and photos" },
              { step: "02", title: "Auto-Route", desc: "System routes to the appropriate department" },
              { step: "03", title: "Track Progress", desc: "Monitor real-time updates on resolution" },
              { step: "04", title: "Resolution", desc: "Issue resolved and you're notified of completion" }
            ].map((item, index) => (
              <div key={index} className="text-center relative">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 text-primary-foreground font-bold text-lg shadow-elegant">
                  {item.step}
                </div>
                <h4 className="font-semibold text-foreground mb-2">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
                {index < 3 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-primary opacity-30 transform -translate-x-1/2"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};