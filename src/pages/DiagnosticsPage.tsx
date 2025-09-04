import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import HiveAnalysis from "@/components/diagnostics/HiveAnalysis";
import HiveManagement from "@/components/HiveManagement";
import WeatherWidget from "@/components/weather/WeatherWidget";
import { useHives } from "@/hooks/useHives";
import { supabase } from "@/integrations/supabase/client";
import { formatDistanceToNow } from "date-fns";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Activity,
  Camera,
  TrendingUp,
  AlertTriangle,
  Eye,
  Download,
  Settings,
  Brain
} from "lucide-react";

interface HiveWithAnalysis {
  id: string;
  name: string;
  location: string;
  lastAnalysis?: string;
  analysisCount: number;
  healthTrend: 'improving' | 'stable' | 'declining';
}

const DiagnosticsPage = () => {
  const [selectedHive, setSelectedHive] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("analysis");
  const [hivesWithAnalysis, setHivesWithAnalysis] = useState<HiveWithAnalysis[]>([]);
  const { hives, loading } = useHives();

  // Fetch analysis data for each hive
  useEffect(() => {
    const fetchAnalysisData = async () => {
      if (!hives.length) return;

      const hivesData = await Promise.all(
        hives.map(async (hive) => {
          // Get latest analysis and count
          const { data: analyses } = await supabase
            .from('hive_analyses')
            .select('analysis_date, health_score')
            .eq('hive_id', hive.id)
            .order('analysis_date', { ascending: false });

          const analysisCount = analyses?.length || 0;
          const lastAnalysis = analyses?.[0]?.analysis_date
            ? formatDistanceToNow(new Date(analyses[0].analysis_date), { addSuffix: true })
            : undefined;

          // Calculate health trend based on recent analyses
          let healthTrend: 'improving' | 'stable' | 'declining' = 'stable';
          if (analyses && analyses.length >= 2) {
            const recent = analyses[0].health_score;
            const previous = analyses[1].health_score;
            if (recent > previous + 5) healthTrend = 'improving';
            else if (recent < previous - 5) healthTrend = 'declining';
          }

          return {
            id: hive.id,
            name: hive.name,
            location: hive.location || 'Unknown Location',
            lastAnalysis,
            analysisCount,
            healthTrend
          } as HiveWithAnalysis;
        })
      );

      setHivesWithAnalysis(hivesData);
    };

    fetchAnalysisData();
  }, [hives]);

  const mockAnalysisHistory = [
    {
      id: '1',
      imageUrl: '/api/placeholder/400/300',
      healthScore: 85,
      populationEstimate: 42000,
      issuesDetected: [
        {
          type: 'Queen Cells',
          severity: 'low' as const,
          confidence: 0.78,
          coordinates: { x: 150, y: 200, width: 60, height: 80 },
          description: 'Natural queen cells detected - normal behavior'
        }
      ],
      analysisDate: '2024-01-13T10:00:00Z',
      status: 'completed' as const,
      progress: 100
    }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving': return <TrendingUp className="w-4 h-4 text-sage" />;
      case 'declining': return <AlertTriangle className="w-4 h-4 text-destructive" />;
      default: return <Activity className="w-4 h-4 text-amber" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'improving': return 'text-sage';
      case 'declining': return 'text-destructive';
      default: return 'text-amber';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">
                Hive Management & Diagnostics
              </h1>
              <p className="text-lg text-muted-foreground">
                Complete hive monitoring, AI analysis, and management tools
              </p>
            </div>
            <TabsList className="grid w-fit grid-cols-2">
              <TabsTrigger value="analysis" className="flex items-center gap-2">
                <Brain className="w-4 h-4" />
                AI Analysis
              </TabsTrigger>
              <TabsTrigger value="management" className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Hive Management
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="analysis" className="space-y-6">
            {!selectedHive ? (
          <div className="space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold text-foreground">
                AI Hive Diagnostics
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Upload photos of your hive combs for advanced AI analysis. 
                Get detailed insights on hive health, population estimates, and potential issues.
              </p>
            </div>

            {/* Features Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6 text-center">
                <div className="p-4 bg-sage/20 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Camera className="w-8 h-8 text-sage" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Photo Analysis</h3>
                <p className="text-muted-foreground">
                  Upload clear photos of your comb for comprehensive AI analysis
                </p>
              </Card>
              <Card className="p-6 text-center">
                <div className="p-4 bg-honey/20 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Activity className="w-8 h-8 text-honey-dark" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Real-time Results</h3>
                <p className="text-muted-foreground">
                  Get instant health scores and population estimates with detailed breakdowns
                </p>
              </Card>
              <Card className="p-6 text-center">
                <div className="p-4 bg-sky/20 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <TrendingUp className="w-8 h-8 text-sky" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
                <p className="text-muted-foreground">
                  Monitor hive health trends over time with detailed history tracking
                </p>
              </Card>
            </div>

            {/* Hive Selection */}
            <div className="space-y-6">
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold text-foreground mb-6">
                    Select a Hive to Analyze
                  </h2>
                  {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="p-6 border rounded-xl animate-pulse">
                          <div className="h-6 bg-muted rounded mb-2"></div>
                          <div className="h-4 bg-muted rounded w-1/2 mb-4"></div>
                          <div className="space-y-2">
                            <div className="h-3 bg-muted rounded"></div>
                            <div className="h-3 bg-muted rounded w-3/4"></div>
                          </div>
                          <div className="h-10 bg-muted rounded mt-4"></div>
                        </div>
                      ))}
                    </div>
                  ) : hivesWithAnalysis.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground mb-4">No hives found. Create your first hive to get started!</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {hivesWithAnalysis.map((hive) => (
                      <Card 
                        key={hive.id} 
                        className="p-6 hover-lift cursor-pointer transition-all duration-300"
                        onClick={() => setSelectedHive(hive.id)}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-semibold text-foreground mb-1">
                              {hive.name}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {hive.location}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            {getTrendIcon(hive.healthTrend)}
                            <span className={`text-sm font-medium ${getTrendColor(hive.healthTrend)}`}>
                              {hive.healthTrend}
                            </span>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Last Analysis:</span>
                            <span className="font-medium">
                              {hive.lastAnalysis || 'Never'}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Total Analyses:</span>
                            <span className="font-medium">{hive.analysisCount}</span>
                          </div>
                        </div>

                        <Button 
                          className="w-full mt-4 bg-honey text-dark-brown hover:bg-honey-dark hover:text-cream"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedHive(hive.id);
                          }}
                        >
                          <Camera className="w-4 h-4 mr-2" />
                          Analyze This Hive
                        </Button>
                      </Card>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Weather Widget Sidebar */}
                <div className="lg:w-80">
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Current Conditions
                  </h3>
                  <WeatherWidget compact={false} showRecommendation={true} />
                  <Card className="mt-4 p-4 bg-honey-light/10 border-honey/20">
                    <div className="text-sm space-y-2">
                      <h4 className="font-semibold text-honey-dark">Analysis Tips:</h4>
                      <ul className="text-muted-foreground space-y-1">
                        <li>• Best lighting: Natural daylight</li>
                        <li>• Avoid shadows on combs</li>
                        <li>• Include frame edges for scale</li>
                        <li>• Multiple angles help accuracy</li>
                      </ul>
                    </div>
                  </Card>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold text-foreground">
                  Recent Analysis Activity
                </h2>
                <Button variant="outline">
                  <Eye className="w-4 h-4 mr-2" />
                  View All
                </Button>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 border rounded-xl">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-sage/20 rounded-lg flex items-center justify-center">
                      <Camera className="w-6 h-6 text-sage" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">
                        Hive Alpha - Analysis Complete
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Health Score: 85% • Population: 42K bees • 1 issue found
                      </div>
                      <div className="text-xs text-muted-foreground">
                        2 days ago
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Report
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-xl">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-amber/20 rounded-lg flex items-center justify-center">
                      <Camera className="w-6 h-6 text-amber" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">
                        Hive Beta - Analysis Complete
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Health Score: 78% • Population: 35K bees • 2 issues found
                      </div>
                      <div className="text-xs text-muted-foreground">
                        1 week ago
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Report
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Back Navigation */}
            <Button 
              variant="outline" 
              onClick={() => setSelectedHive(null)}
              className="mb-4"
            >
              ← Back to Hive Selection
            </Button>
            
            {/* Hive Analysis Component */}
            <HiveAnalysis
              hiveId={selectedHive}
              hiveName={hivesWithAnalysis.find(h => h.id === selectedHive)?.name || 'Unknown Hive'}
              analysisHistory={mockAnalysisHistory}
            />
            </div>
          )}
          </TabsContent>

          <TabsContent value="management" className="space-y-6">
            <HiveManagement />
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default DiagnosticsPage;