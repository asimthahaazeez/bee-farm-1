import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  AlertTriangle, 
  Shield, 
  Eye,
  ChevronRight
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface HiveHealthData {
  id: string;
  hive_id: string;
  overall_score: number;
  population_score: number;
  queen_score: number;
  brood_score: number;
  health_trend: string;
  risk_level: string;
  predictions: any[];
  contributing_factors: any;
  score_date: string;
}

interface PredictiveAlert {
  id: string;
  alert_type: string;
  severity: string;
  title: string;
  description: string;
  predicted_date: string;
  confidence_score: number;
  recommendations: string[];
}

interface HiveHealthScoreProps {
  hiveId?: string;
  onDrillDown?: (hiveId: string) => void;
}

const HiveHealthScore = ({ hiveId, onDrillDown }: HiveHealthScoreProps) => {
  const [healthData, setHealthData] = useState<HiveHealthData[]>([]);
  const [alerts, setAlerts] = useState<PredictiveAlert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHealthData();
    fetchPredictiveAlerts();
  }, [hiveId]);

  const fetchHealthData = async () => {
    try {
      let query = supabase
        .from('hive_health_scores')
        .select('*')
        .order('score_date', { ascending: false });

      if (hiveId) {
        query = query.eq('hive_id', hiveId).limit(1);
      } else {
        query = query.limit(5);
      }

      const { data, error } = await query;

      if (error) throw error;
      setHealthData((data || []).map(item => ({
        ...item,
        predictions: Array.isArray(item.predictions) ? item.predictions : []
      })));
    } catch (error) {
      console.error('Error fetching health data:', error);
      // Mock data for demonstration
      setHealthData([
        {
          id: '1',
          hive_id: 'hive-1',
          overall_score: 87,
          population_score: 92,
          queen_score: 85,
          brood_score: 83,
          health_trend: 'improving',
          risk_level: 'low',
          predictions: [
            { type: 'honey_flow', date: '2024-02-15', probability: 0.78 },
            { type: 'swarm_risk', date: '2024-02-28', probability: 0.23 }
          ],
          contributing_factors: {
            weather: 'favorable',
            inspection_frequency: 'optimal',
            queen_age: 'young'
          },
          score_date: '2024-01-15T10:00:00Z'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const fetchPredictiveAlerts = async () => {
    try {
      let query = supabase
        .from('predictive_alerts')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (hiveId) {
        query = query.eq('hive_id', hiveId);
      }

      const { data, error } = await query.limit(3);

      if (error) throw error;
      setAlerts((data || []).map(item => ({
        ...item,
        recommendations: Array.isArray(item.recommendations) ? item.recommendations : []
      })));
    } catch (error) {
      console.error('Error fetching alerts:', error);
      // Mock data for demonstration
      setAlerts([
        {
          id: '1',
          alert_type: 'disease_risk',
          severity: 'medium',
          title: 'Varroa Mite Risk Elevated',
          description: 'Environmental conditions suggest increased varroa mite activity in your area.',
          predicted_date: '2024-02-20T00:00:00Z',
          confidence_score: 0.73,
          recommendations: ['Increase monitoring frequency', 'Consider mite treatment options']
        }
      ]);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-sage';
    if (score >= 60) return 'text-amber';
    return 'text-destructive';
  };

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'low': return 'bg-sage text-sage-foreground';
      case 'medium': return 'bg-amber text-amber-foreground';
      case 'high': return 'bg-orange text-orange-foreground';
      case 'critical': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving': return <TrendingUp className="w-4 h-4 text-sage" />;
      case 'declining': case 'critical': return <TrendingDown className="w-4 h-4 text-destructive" />;
      default: return <Activity className="w-4 h-4 text-amber" />;
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': case 'high': return <AlertTriangle className="w-4 h-4 text-destructive" />;
      case 'medium': return <Shield className="w-4 h-4 text-amber" />;
      default: return <Activity className="w-4 h-4 text-sage" />;
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Hive Health Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-muted shimmer rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-muted shimmer rounded w-32"></div>
                  <div className="h-3 bg-muted shimmer rounded w-48"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const mainHealthData = healthData[0];

  return (
    <div className="space-y-6">
      {/* Main Health Score Card */}
      {mainHealthData && (
        <Card className="border-l-4 border-l-sage">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-sage" />
                Hive Health Score
              </CardTitle>
              <div className="flex items-center gap-2">
                {getTrendIcon(mainHealthData.health_trend)}
                <Badge variant="secondary" className={getRiskLevelColor(mainHealthData.risk_level)}>
                  {mainHealthData.risk_level.toUpperCase()} RISK
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Overall Score */}
            <div className="text-center">
              <div className={`text-6xl font-bold ${getScoreColor(mainHealthData.overall_score)}`}>
                {mainHealthData.overall_score}
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                Overall Health Score
              </div>
            </div>

            {/* Component Scores */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center space-y-2">
                <div className="text-sm font-medium text-muted-foreground">Population</div>
                <div className={`text-2xl font-bold ${getScoreColor(mainHealthData.population_score)}`}>
                  {mainHealthData.population_score}
                </div>
                <Progress value={mainHealthData.population_score} className="h-2" />
              </div>
              <div className="text-center space-y-2">
                <div className="text-sm font-medium text-muted-foreground">Queen</div>
                <div className={`text-2xl font-bold ${getScoreColor(mainHealthData.queen_score)}`}>
                  {mainHealthData.queen_score}
                </div>
                <Progress value={mainHealthData.queen_score} className="h-2" />
              </div>
              <div className="text-center space-y-2">
                <div className="text-sm font-medium text-muted-foreground">Brood</div>
                <div className={`text-2xl font-bold ${getScoreColor(mainHealthData.brood_score)}`}>
                  {mainHealthData.brood_score}
                </div>
                <Progress value={mainHealthData.brood_score} className="h-2" />
              </div>
            </div>

            {/* Predictions */}
            {mainHealthData.predictions?.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground">7-Day Predictions</h4>
                <div className="space-y-2">
                  {mainHealthData.predictions.slice(0, 2).map((prediction, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div>
                        <div className="font-medium capitalize">
                          {prediction.type.replace('_', ' ')}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Expected: {new Date(prediction.date).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">
                          {Math.round(prediction.probability * 100)}%
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Confidence
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Button */}
            {onDrillDown && (
              <Button 
                onClick={() => onDrillDown(mainHealthData.hive_id)}
                className="w-full"
                variant="outline"
              >
                <Eye className="w-4 h-4 mr-2" />
                View Detailed Analysis
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      {/* Predictive Alerts */}
      {alerts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber" />
              Predictive Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div key={alert.id} className="p-4 border rounded-lg space-y-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      {getSeverityIcon(alert.severity)}
                      <h4 className="font-semibold text-foreground">{alert.title}</h4>
                    </div>
                    <Badge variant="secondary" className={getRiskLevelColor(alert.severity)}>
                      {alert.severity.toUpperCase()}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{alert.description}</p>
                  <div className="text-xs text-muted-foreground">
                    Expected: {new Date(alert.predicted_date).toLocaleDateString()} • 
                    Confidence: {Math.round(alert.confidence_score * 100)}%
                  </div>
                  {alert.recommendations?.length > 0 && (
                    <div className="mt-2">
                      <div className="text-xs font-medium text-foreground mb-1">Recommendations:</div>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        {alert.recommendations.map((rec, index) => (
                          <li key={index} className="flex items-start gap-1">
                            <span>•</span>
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default HiveHealthScore;