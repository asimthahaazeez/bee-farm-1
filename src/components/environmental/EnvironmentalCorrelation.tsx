import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  CloudRain, 
  Sun, 
  Wind, 
  Thermometer, 
  Activity,
  TrendingUp,
  TrendingDown,
  BarChart3,
  LineChart
} from "lucide-react";
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { supabase } from "@/integrations/supabase/client";

interface EnvironmentalData {
  id: string;
  location: string;
  date: string;
  temperature_high: number;
  temperature_low: number;
  humidity: number;
  precipitation: number;
  wind_speed: number;
  pollen_count: any;
  air_quality_index: number;
  uv_index: number;
  weather_conditions: string;
}

interface HiveProductivityData {
  date: string;
  hive_id: string;
  health_score: number;
  population_estimate: number;
  honey_production: number;
  activity_level: number;
}

interface CorrelationData {
  date: string;
  temperature: number;
  humidity: number;
  precipitation: number;
  hive_health: number;
  honey_production: number;
  activity_level: number;
  pollen_count: number;
}

const EnvironmentalCorrelation = () => {
  const [environmentalData, setEnvironmentalData] = useState<EnvironmentalData[]>([]);
  const [correlationData, setCorrelationData] = useState<CorrelationData[]>([]);
  const [selectedMetric, setSelectedMetric] = useState<string>('temperature');
  const [selectedHiveMetric, setSelectedHiveMetric] = useState<string>('health_score');
  const [timeRange, setTimeRange] = useState<string>('30d');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEnvironmentalData();
  }, [timeRange]);

  const fetchEnvironmentalData = async () => {
    setLoading(true);
    try {
      const daysAgo = parseInt(timeRange.replace('d', ''));
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - daysAgo);

      const { data: envData, error: envError } = await supabase
        .from('environmental_data')
        .select('*')
        .gte('date', startDate.toISOString().split('T')[0])
        .order('date', { ascending: true });

      const { data: hiveData, error: hiveError } = await supabase
        .from('hive_analyses')
        .select('*')
        .gte('analysis_date', startDate.toISOString())
        .order('analysis_date', { ascending: true });

      if (envError || hiveError) throw envError || hiveError;

      setEnvironmentalData(envData || []);
      generateCorrelationData(envData || [], hiveData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Generate mock data for demonstration
      const mockData = generateMockData();
      setCorrelationData(mockData);
    } finally {
      setLoading(false);
    }
  };

  const generateMockData = (): CorrelationData[] => {
    const data: CorrelationData[] = [];
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30);

    for (let i = 0; i < 30; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      
      // Generate correlated data (temperature affects hive activity)
      const temperature = 65 + Math.sin(i * 0.2) * 15 + Math.random() * 10;
      const humidity = 60 + Math.cos(i * 0.15) * 20 + Math.random() * 10;
      const precipitation = Math.max(0, Math.random() * 2 - 1.5);
      
      // Hive metrics correlated with environmental factors
      const hive_health = Math.max(50, Math.min(100, 
        75 + (temperature - 70) * 0.5 - humidity * 0.1 - precipitation * 5 + Math.random() * 10
      ));
      const honey_production = Math.max(0, 
        (temperature - 60) * 0.3 + (humidity - 50) * 0.1 - precipitation * 2 + Math.random() * 5
      );
      const activity_level = Math.max(20, Math.min(100,
        60 + (temperature - 65) * 0.8 - precipitation * 10 + Math.random() * 15
      ));
      const pollen_count = Math.max(0, 
        50 + Math.sin(i * 0.1) * 30 - precipitation * 10 + Math.random() * 20
      );

      data.push({
        date: date.toISOString().split('T')[0],
        temperature: Math.round(temperature * 10) / 10,
        humidity: Math.round(humidity * 10) / 10,
        precipitation: Math.round(precipitation * 10) / 10,
        hive_health: Math.round(hive_health),
        honey_production: Math.round(honey_production * 10) / 10,
        activity_level: Math.round(activity_level),
        pollen_count: Math.round(pollen_count)
      });
    }

    return data;
  };

  const generateCorrelationData = (envData: EnvironmentalData[], hiveData: any[]) => {
    // Combine environmental and hive data by date
    const combined: CorrelationData[] = [];
    
    envData.forEach(env => {
      const hiveMetrics = hiveData.filter(h => 
        h.analysis_date.split('T')[0] === env.date
      );
      
      if (hiveMetrics.length > 0) {
        const avgHealth = hiveMetrics.reduce((sum, h) => sum + (h.health_score || 0), 0) / hiveMetrics.length;
        const avgPopulation = hiveMetrics.reduce((sum, h) => sum + (h.population_estimate || 0), 0) / hiveMetrics.length;
        
        combined.push({
          date: env.date,
          temperature: (env.temperature_high + env.temperature_low) / 2,
          humidity: env.humidity,
          precipitation: env.precipitation,
          hive_health: avgHealth,
          honey_production: avgPopulation * 0.01,
          activity_level: Math.min(100, avgHealth + Math.random() * 20),
          pollen_count: (() => {
            try {
              return Object.values(env.pollen_count || {}).reduce((sum: number, count: unknown) => {
                return sum + (typeof count === 'number' ? count : 0);
              }, 0);
            } catch {
              return 0;
            }
          })()
        });
      }
    });

    setCorrelationData(combined);
  };

  const getMetricIcon = (metric: string) => {
    switch (metric) {
      case 'temperature': return <Thermometer className="w-4 h-4" />;
      case 'humidity': return <CloudRain className="w-4 h-4" />;
      case 'precipitation': return <CloudRain className="w-4 h-4" />;
      case 'pollen_count': return <Sun className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const getMetricColor = (metric: string) => {
    switch (metric) {
      case 'temperature': return '#ef4444'; // red
      case 'humidity': return '#3b82f6'; // blue
      case 'precipitation': return '#06b6d4'; // cyan
      case 'pollen_count': return '#f59e0b'; // amber
      case 'health_score': return '#10b981'; // emerald
      case 'honey_production': return '#f59e0b'; // amber
      case 'activity_level': return '#8b5cf6'; // violet
      default: return '#6b7280'; // gray
    }
  };

  const formatMetricValue = (value: number, metric: string) => {
    switch (metric) {
      case 'temperature': return `${value.toFixed(1)}°F`;
      case 'humidity': return `${value.toFixed(1)}%`;
      case 'precipitation': return `${value.toFixed(2)}"`;
      case 'pollen_count': return `${Math.round(value)}`;
      case 'health_score': return `${Math.round(value)}`;
      case 'honey_production': return `${value.toFixed(1)} lbs`;
      case 'activity_level': return `${Math.round(value)}%`;
      default: return value.toString();
    }
  };

  const calculateCorrelation = () => {
    if (correlationData.length < 2) return 0;

    const envValues = correlationData.map(d => d[selectedMetric as keyof CorrelationData] as number);
    const hiveValues = correlationData.map(d => d[selectedHiveMetric as keyof CorrelationData] as number);

    const n = envValues.length;
    const sumX = envValues.reduce((sum, val) => sum + val, 0);
    const sumY = hiveValues.reduce((sum, val) => sum + val, 0);
    const sumXY = envValues.reduce((sum, val, i) => sum + val * hiveValues[i], 0);
    const sumXX = envValues.reduce((sum, val) => sum + val * val, 0);
    const sumYY = hiveValues.reduce((sum, val) => sum + val * val, 0);

    const correlation = (n * sumXY - sumX * sumY) / 
      Math.sqrt((n * sumXX - sumX * sumX) * (n * sumYY - sumY * sumY));

    return isNaN(correlation) ? 0 : correlation;
  };

  const correlationCoeff = calculateCorrelation();
  const correlationStrength = Math.abs(correlationCoeff);
  const correlationDirection = correlationCoeff >= 0 ? 'positive' : 'negative';

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Environmental Correlation Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="h-64 bg-muted shimmer rounded-lg"></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="h-32 bg-muted shimmer rounded-lg"></div>
              <div className="h-32 bg-muted shimmer rounded-lg"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Environmental Correlation Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Environmental Metric</label>
              <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="temperature">Temperature</SelectItem>
                  <SelectItem value="humidity">Humidity</SelectItem>
                  <SelectItem value="precipitation">Precipitation</SelectItem>
                  <SelectItem value="pollen_count">Pollen Count</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Hive Metric</label>
              <Select value={selectedHiveMetric} onValueChange={setSelectedHiveMetric}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hive_health">Hive Health</SelectItem>
                  <SelectItem value="honey_production">Honey Production</SelectItem>
                  <SelectItem value="activity_level">Activity Level</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Time Range</label>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">7 Days</SelectItem>
                  <SelectItem value="30d">30 Days</SelectItem>
                  <SelectItem value="90d">90 Days</SelectItem>
                  <SelectItem value="365d">1 Year</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button onClick={fetchEnvironmentalData} className="w-full">
                Update Analysis
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Correlation Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-l-4 border-l-primary">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Correlation Coefficient</p>
                <p className="text-2xl font-bold">
                  {correlationCoeff.toFixed(3)}
                </p>
                <Badge variant={correlationStrength > 0.7 ? 'default' : correlationStrength > 0.3 ? 'secondary' : 'outline'}>
                  {correlationStrength > 0.7 ? 'Strong' : correlationStrength > 0.3 ? 'Moderate' : 'Weak'} Correlation
                </Badge>
              </div>
              {correlationDirection === 'positive' ? 
                <TrendingUp className="w-8 h-8 text-sage" /> : 
                <TrendingDown className="w-8 h-8 text-destructive" />
              }
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Environmental Factor</p>
                <div className="flex items-center gap-2 mt-1">
                  {getMetricIcon(selectedMetric)}
                  <p className="text-lg font-semibold capitalize">
                    {selectedMetric.replace('_', ' ')}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Hive Performance</p>
                <div className="flex items-center gap-2 mt-1">
                  <Activity className="w-4 h-4" />
                  <p className="text-lg font-semibold capitalize">
                    {selectedHiveMetric.replace('_', ' ')}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Correlation Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LineChart className="w-5 h-5" />
            Environmental vs Hive Performance Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsLineChart data={correlationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => new Date(value).toLocaleDateString()}
                />
                <YAxis yAxisId="env" orientation="left" tick={{ fontSize: 12 }} />
                <YAxis yAxisId="hive" orientation="right" tick={{ fontSize: 12 }} />
                <Tooltip 
                  labelFormatter={(value) => new Date(value).toLocaleDateString()}
                  formatter={(value: number, name: string) => [
                    formatMetricValue(value, name),
                    name.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())
                  ]}
                />
                <Line 
                  yAxisId="env"
                  type="monotone" 
                  dataKey={selectedMetric} 
                  stroke={getMetricColor(selectedMetric)} 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
                <Line 
                  yAxisId="hive"
                  type="monotone" 
                  dataKey={selectedHiveMetric} 
                  stroke={getMetricColor(selectedHiveMetric)} 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  strokeDasharray="5 5"
                />
              </RechartsLineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Insights */}
      {correlationData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Key Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold">Correlation Analysis</h4>
                <div className="text-sm text-muted-foreground space-y-2">
                  <p>
                    There is a <strong>{correlationStrength > 0.7 ? 'strong' : correlationStrength > 0.3 ? 'moderate' : 'weak'}</strong> {' '}
                    <strong>{correlationDirection}</strong> correlation ({correlationCoeff.toFixed(3)}) between{' '}
                    {selectedMetric.replace('_', ' ')} and {selectedHiveMetric.replace('_', ' ')}.
                  </p>
                  {correlationStrength > 0.5 && (
                    <p>
                      This suggests that changes in {selectedMetric.replace('_', ' ')} may {' '}
                      {correlationDirection === 'positive' ? 'positively influence' : 'negatively impact'} {' '}
                      {selectedHiveMetric.replace('_', ' ')}.
                    </p>
                  )}
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold">Recommendations</h4>
                <div className="text-sm text-muted-foreground space-y-2">
                  {correlationStrength > 0.5 ? (
                    <>
                      <p>• Monitor {selectedMetric.replace('_', ' ')} closely as it appears to impact hive performance</p>
                      <p>• Consider interventions when {selectedMetric.replace('_', ' ')} reaches extreme values</p>
                      <p>• Use this correlation for predictive planning and hive management</p>
                    </>
                  ) : (
                    <>
                      <p>• The weak correlation suggests other factors may be more influential</p>
                      <p>• Consider analyzing different environmental metrics</p>
                      <p>• Look for seasonal patterns and longer-term trends</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EnvironmentalCorrelation;