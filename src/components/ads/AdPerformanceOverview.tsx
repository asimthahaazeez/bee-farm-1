import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp, Eye, MousePointer, ShoppingCart, DollarSign } from "lucide-react";

const performanceData = [
  { date: "Jan 15", impressions: 1240, clicks: 87, conversions: 5, spend: 45.50 },
  { date: "Jan 16", impressions: 1890, clicks: 124, conversions: 8, spend: 68.20 },
  { date: "Jan 17", impressions: 2100, clicks: 156, conversions: 12, spend: 85.40 },
  { date: "Jan 18", impressions: 1650, clicks: 98, conversions: 6, spend: 54.30 },
  { date: "Jan 19", impressions: 2400, clicks: 187, conversions: 15, spend: 102.50 },
  { date: "Jan 20", impressions: 2850, clicks: 234, conversions: 18, spend: 128.70 },
  { date: "Jan 21", impressions: 2200, clicks: 165, conversions: 11, spend: 90.75 }
];

const overviewStats = [
  {
    title: "Total Impressions",
    value: "14.3K",
    change: "+12.5%",
    icon: Eye,
    color: "text-sky"
  },
  {
    title: "Total Clicks", 
    value: "1,051",
    change: "+8.3%",
    icon: MousePointer,
    color: "text-primary"
  },
  {
    title: "Conversions",
    value: "75",
    change: "+15.7%",
    icon: ShoppingCart,
    color: "text-sage"
  },
  {
    title: "Total Spend",
    value: "$575.37",
    change: "+9.2%",
    icon: DollarSign,
    color: "text-amber"
  }
];

const AdPerformanceOverview = () => {
  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewStats.map((stat, index) => (
          <Card key={index} className="bg-card border-border hover-lift">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground mb-1">
                {stat.value}
              </div>
              <div className="flex items-center space-x-1 text-sm">
                <TrendingUp className="h-3 w-3 text-sage" />
                <span className="text-sage">{stat.change}</span>
                <span className="text-muted-foreground">vs last week</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Impressions & Clicks</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "6px"
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="impressions" 
                  stroke="hsl(var(--sky))" 
                  strokeWidth={2}
                  name="Impressions"
                />
                <Line 
                  type="monotone" 
                  dataKey="clicks" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  name="Clicks"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Conversions & Spend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "6px"
                  }}
                />
                <Bar dataKey="conversions" fill="hsl(var(--sage))" name="Conversions" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Campaign Performance Table */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Top Performing Campaigns</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: "Wildflower Honey Promotion", impressions: 8234, clicks: 234, ctr: 2.84, conversions: 18, cost: 128.70 },
              { name: "Organic Beeswax Candles", impressions: 4567, clicks: 123, ctr: 2.69, conversions: 12, cost: 89.25 },
              { name: "Premium Raw Honey", impressions: 2845, clicks: 87, ctr: 3.06, conversions: 8, cost: 67.40 }
            ].map((campaign, index) => (
              <div key={index} className="grid grid-cols-2 md:grid-cols-6 gap-4 p-4 rounded-lg border border-border hover:bg-muted/30 transition-colors">
                <div className="md:col-span-2">
                  <p className="font-medium text-foreground">{campaign.name}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Impressions</p>
                  <p className="font-semibold text-foreground">{campaign.impressions.toLocaleString()}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Clicks</p>
                  <p className="font-semibold text-foreground">{campaign.clicks}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">CTR</p>
                  <p className="font-semibold text-primary">{campaign.ctr}%</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Cost</p>
                  <p className="font-semibold text-foreground">${campaign.cost}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdPerformanceOverview;