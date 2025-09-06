import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { MapPin, Upload, AlertTriangle, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const issueCategories = [
  { id: "roads", label: "Roads & Potholes", department: "Public Works" },
  { id: "water", label: "Water Supply", department: "Water Board" },
  { id: "waste", label: "Waste Management", department: "Municipal Corp" },
  { id: "electricity", label: "Street Lights", department: "Electricity Board" },
  { id: "drainage", label: "Drainage & Sewage", department: "Drainage Dept" },
  { id: "encroachment", label: "Encroachment", department: "Revenue Dept" },
  { id: "other", label: "Other Issues", department: "General" }
];

const priorityLevels = [
  { value: "low", label: "Low", color: "bg-civic-green" },
  { value: "medium", label: "Medium", color: "bg-civic-orange" },
  { value: "high", label: "High", color: "bg-civic-red" }
];

export const ReportForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    category: "",
    priority: "",
    title: "",
    description: "",
    location: "",
    latitude: "",
    longitude: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLocationCapture = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData(prev => ({
            ...prev,
            latitude: position.coords.latitude.toString(),
            longitude: position.coords.longitude.toString()
          }));
          toast({
            title: "Location captured",
            description: "Your current location has been recorded.",
          });
        },
        (error) => {
          toast({
            title: "Location error",
            description: "Unable to capture location. Please enter manually.",
            variant: "destructive",
          });
        }
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    const complaintId = `CIV${Date.now().toString().slice(-6)}`;
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    toast({
      title: "Report submitted successfully!",
      description: `Your complaint ID is: ${complaintId}`,
    });
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <Card className="text-center shadow-elegant">
          <CardContent className="p-8">
            <div className="mb-6">
              <CheckCircle className="w-16 h-16 text-accent mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-2">Report Submitted!</h3>
              <p className="text-muted-foreground">
                Your complaint has been successfully registered and assigned to the appropriate department.
              </p>
            </div>
            
            <div className="bg-muted p-4 rounded-lg mb-6">
              <p className="font-semibold text-foreground">Complaint ID: <span className="text-primary">CIV{Date.now().toString().slice(-6)}</span></p>
              <p className="text-sm text-muted-foreground mt-1">
                Save this ID to track your complaint status
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="civic" onClick={() => setIsSubmitted(false)}>
                Submit Another Report
              </Button>
              <Button variant="outline">
                Track This Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <section id="report" className="py-16 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">Report a Civic Issue</h2>
            <p className="text-xl text-muted-foreground">
              Help us improve your community by reporting issues that need attention.
            </p>
          </div>

          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-primary" />
                Issue Details
              </CardTitle>
              <CardDescription>
                Please provide detailed information about the issue you want to report.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      required
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      required
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                {/* Issue Category */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Issue Category *</Label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select issue category" />
                      </SelectTrigger>
                      <SelectContent>
                        {issueCategories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            <div className="flex flex-col">
                              <span>{category.label}</span>
                              <span className="text-xs text-muted-foreground">{category.department}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority Level *</Label>
                    <Select value={formData.priority} onValueChange={(value) => handleInputChange("priority", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        {priorityLevels.map((priority) => (
                          <SelectItem key={priority.value} value={priority.value}>
                            <div className="flex items-center gap-2">
                              <div className={`w-3 h-3 rounded-full ${priority.color}`}></div>
                              <span>{priority.label}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Issue Description */}
                <div className="space-y-2">
                  <Label htmlFor="title">Issue Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    required
                    placeholder="Brief summary of the issue"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Detailed Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    required
                    rows={4}
                    placeholder="Please provide detailed information about the issue, including when you noticed it and any other relevant details..."
                  />
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <div className="flex gap-2">
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      required
                      placeholder="Enter the address or landmark"
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleLocationCapture}
                      className="shrink-0"
                    >
                      <MapPin className="w-4 h-4" />
                      Use Current Location
                    </Button>
                  </div>
                  {formData.latitude && formData.longitude && (
                    <div className="text-sm text-muted-foreground">
                      📍 Location captured: {parseFloat(formData.latitude).toFixed(6)}, {parseFloat(formData.longitude).toFixed(6)}
                    </div>
                  )}
                </div>

                {/* File Upload */}
                <div className="space-y-2">
                  <Label htmlFor="attachments">Attachments (Optional)</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                    <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground mb-1">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Images, documents (Max 5 files, 10MB each)
                    </p>
                    <Input
                      id="attachments"
                      type="file"
                      multiple
                      accept="image/*,.pdf,.doc,.docx"
                      className="hidden"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <Button
                    type="submit"
                    variant="civic"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2"></div>
                        Submitting Report...
                      </>
                    ) : (
                      "Submit Report"
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};