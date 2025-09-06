import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Search, MapPin, Clock, User, AlertCircle, CheckCircle2, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Sample complaint data
const sampleComplaint = {
  id: "CIV240906001",
  title: "Large pothole on Main Street causing vehicle damage",
  category: "Roads & Potholes",
  priority: "High",
  status: "In Progress",
  location: "Main Street, near City Bank",
  submittedBy: "John Smith",
  submittedAt: "2024-09-04T10:30:00Z",
  lastUpdated: "2024-09-06T14:15:00Z",
  department: "Public Works Department",
  assignedTo: "Mike Johnson",
  description: "There's a large pothole approximately 3 feet wide and 1 foot deep on Main Street that's causing damage to vehicles. Multiple cars have hit it today.",
  progress: 65,
  statusHistory: [
    { status: "Submitted", date: "2024-09-04T10:30:00Z", description: "Complaint received and logged" },
    { status: "Acknowledged", date: "2024-09-04T11:45:00Z", description: "Routed to Public Works Department" },
    { status: "In Progress", date: "2024-09-05T09:00:00Z", description: "Inspection completed, materials ordered" },
    { status: "In Progress", date: "2024-09-06T14:15:00Z", description: "Repair crew dispatched to location" }
  ]
};

const statusConfig = {
  "Submitted": { color: "bg-civic-blue", icon: AlertCircle, progress: 25 },
  "Acknowledged": { color: "bg-civic-orange", icon: Eye, progress: 50 },
  "In Progress": { color: "bg-civic-orange", icon: Clock, progress: 75 },
  "Resolved": { color: "bg-civic-green", icon: CheckCircle2, progress: 100 }
};

export const TrackingSection = () => {
  const [complaintId, setComplaintId] = useState("");
  const [complaint, setComplaint] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const { toast } = useToast();

  const handleSearch = async () => {
    if (!complaintId.trim()) {
      toast({
        title: "Please enter a complaint ID",
        description: "Complaint ID is required to track status.",
        variant: "destructive",
      });
      return;
    }

    setIsSearching(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // For demo, return sample data if ID matches pattern
    if (complaintId.toLowerCase().includes("civ") || complaintId === "240906001") {
      setComplaint(sampleComplaint);
      toast({
        title: "Complaint found!",
        description: "Displaying the latest status information.",
      });
    } else {
      setComplaint(null);
      toast({
        title: "Complaint not found",
        description: "Please check the complaint ID and try again.",
        variant: "destructive",
      });
    }
    
    setIsSearching(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <section id="track" className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">Track Your Report</h2>
            <p className="text-xl text-muted-foreground">
              Enter your complaint ID to check the current status and progress.
            </p>
          </div>

          {/* Search Form */}
          <Card className="shadow-elegant mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="w-5 h-5 text-primary" />
                Find Your Report
              </CardTitle>
              <CardDescription>
                Enter the complaint ID you received when submitting your report.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <div className="flex-1">
                  <Label htmlFor="complaint-id" className="sr-only">Complaint ID</Label>
                  <Input
                    id="complaint-id"
                    placeholder="Enter complaint ID (e.g., CIV240906001)"
                    value={complaintId}
                    onChange={(e) => setComplaintId(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  />
                </div>
                <Button 
                  onClick={handleSearch} 
                  disabled={isSearching}
                  variant="civic"
                >
                  {isSearching ? (
                    <>
                      <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2"></div>
                      Searching...
                    </>
                  ) : (
                    <>
                      <Search className="w-4 h-4 mr-2" />
                      Track Report
                    </>
                  )}
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                💡 Try entering "CIV240906001" to see a sample report
              </p>
            </CardContent>
          </Card>

          {/* Complaint Details */}
          {complaint && (
            <div className="space-y-6">
              {/* Status Overview */}
              <Card className="shadow-elegant">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <CardTitle className="text-xl">{complaint.title}</CardTitle>
                      <CardDescription className="text-base">
                        Complaint ID: <span className="font-mono text-primary">{complaint.id}</span>
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant="secondary" 
                        className={`${statusConfig[complaint.status]?.color} text-white`}
                      >
                        {complaint.status}
                      </Badge>
                      <Badge variant="outline" className={
                        complaint.priority === 'High' ? 'border-civic-red text-civic-red' :
                        complaint.priority === 'Medium' ? 'border-civic-orange text-civic-orange' :
                        'border-civic-green text-civic-green'
                      }>
                        {complaint.priority} Priority
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Progress Bar */}
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-semibold">{complaint.progress}%</span>
                      </div>
                      <Progress value={complaint.progress} className="h-2" />
                    </div>

                    {/* Key Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Location:</span>
                        <span>{complaint.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Department:</span>
                        <span>{complaint.department}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Submitted:</span>
                        <span>{formatDate(complaint.submittedAt)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Last Update:</span>
                        <span>{formatDate(complaint.lastUpdated)}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Description</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {complaint.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Status History */}
              <Card className="shadow-elegant">
                <CardHeader>
                  <CardTitle>Status History</CardTitle>
                  <CardDescription>
                    Track the progress of your complaint from submission to resolution.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {complaint.statusHistory.map((entry, index) => {
                      const config = statusConfig[entry.status];
                      const IconComponent = config?.icon || AlertCircle;
                      
                      return (
                        <div key={index} className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <div className={`w-10 h-10 rounded-full ${config?.color || 'bg-muted'} flex items-center justify-center`}>
                              <IconComponent className="w-5 h-5 text-white" />
                            </div>
                            {index < complaint.statusHistory.length - 1 && (
                              <div className="w-0.5 h-8 bg-border mt-2"></div>
                            )}
                          </div>
                          <div className="flex-1 pb-4">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                              <h4 className="font-semibold text-foreground">{entry.status}</h4>
                              <span className="text-sm text-muted-foreground">
                                {formatDate(entry.date)}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              {entry.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};