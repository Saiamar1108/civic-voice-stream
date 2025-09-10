import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BarChart3, Activity, AlertTriangle, Clock, CheckCircle2 } from "lucide-react";

const mockStats = {
  total: 1240,
  open: 312,
  inProgress: 188,
  resolved: 740,
  slaBreaches: 24,
};

const mockByCategory = [
  { name: "Roads", open: 120, predicted: 0.72 },
  { name: "Sanitation", open: 86, predicted: 0.64 },
  { name: "Water", open: 54, predicted: 0.58 },
  { name: "Streetlights", open: 32, predicted: 0.41 },
];

const mockUrgent = [
  { id: "UX-1021", title: "Major potholes on MG Road", risk: 0.91 },
  { id: "UX-1044", title: "Sewage overflow in Sector 14", risk: 0.87 },
  { id: "UX-1077", title: "Broken water pipeline - Indiranagar", risk: 0.81 },
];

export default function Dashboard() {
  const slaResolvedPct = Math.round((mockStats.resolved / mockStats.total) * 100);
  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Authority Dashboard</h1>
        <Badge variant="secondary" className="gap-2"><BarChart3 className="w-4 h-4" /> Live</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Total Reports</CardTitle></CardHeader>
          <CardContent className="text-2xl font-bold">{mockStats.total}</CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Open</CardTitle></CardHeader>
          <CardContent className="text-2xl font-bold flex items-center gap-2"><AlertTriangle className="w-5 h-5 text-amber-500" />{mockStats.open}</CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">In Progress</CardTitle></CardHeader>
          <CardContent className="text-2xl font-bold flex items-center gap-2"><Clock className="w-5 h-5 text-blue-500" />{mockStats.inProgress}</CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Resolved</CardTitle></CardHeader>
          <CardContent className="text-2xl font-bold flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-green-600" />{mockStats.resolved}</CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Category Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockByCategory.map((c) => (
              <div key={c.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{c.name}</span>
                  <span className="text-sm text-muted-foreground">Open: {c.open}</span>
                </div>
                <Progress value={c.predicted * 100} />
                <div className="text-xs text-muted-foreground">AI predicted urgency: {Math.round(c.predicted * 100)}%</div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Urgent — AI Priority</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockUrgent.map((u) => (
              <div key={u.id} className="p-3 rounded-md border flex items-start gap-3">
                <Activity className="w-4 h-4 text-red-500 mt-1" />
                <div>
                  <div className="text-sm font-medium">{u.title}</div>
                  <div className="text-xs text-muted-foreground">Ref {u.id} • Risk {Math.round(u.risk * 100)}%</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="sla">
        <TabsList>
          <TabsTrigger value="sla">SLA & Throughput</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>
        <TabsContent value="sla">
          <Card>
            <CardHeader><CardTitle>SLA Adherence</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Resolved within SLA</span>
                  <span>{slaResolvedPct}%</span>
                </div>
                <Progress value={slaResolvedPct} />
                <div className="text-xs text-muted-foreground">Breaches this month: {mockStats.slaBreaches}</div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="trends">
          <Card>
            <CardHeader><CardTitle>Trends</CardTitle></CardHeader>
            <CardContent className="text-sm text-muted-foreground">Connect real data later. This view will show week-over-week inflow, resolution time, and backlog.</CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}


