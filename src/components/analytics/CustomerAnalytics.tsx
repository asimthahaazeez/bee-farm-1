import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const customerData = [
  { month: "Jan", new: 24, returning: 18, total: 42 },
  { month: "Feb", new: 18, returning: 22, total: 40 },
  { month: "Mar", new: 32, returning: 28, total: 60 },
  { month: "Apr", new: 28, returning: 35, total: 63 },
  { month: "May", new: 35, returning: 42, total: 77 },
  { month: "Jun", new: 41, returning: 48, total: 89 }
];

const segmentData = [
  { name: "New Customers", value: 45, color: "hsl(var(--primary))" },
  { name: "Returning", value: 35, color: "hsl(var(--amber))" },
  { name: "VIP", value: 15, color: "hsl(var(--sage))" },
  { name: "Inactive", value: 5, color: "hsl(var(--muted))" }
];

const lifetimeData = [
  { range: "$0-$50", customers: 125 },
  { range: "$51-$100", customers: 89 },
  { range: "$101-$250", customers: 67 },
  { range: "$251-$500", customers: 43 },
  { range: "$500+", customers: 28 }
];

const CustomerAnalytics = () => {
  return (
    <div className="space-y-6">
      {/* Customer Acquisition */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Customer Acquisition</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={customerData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "6px"
                  }}
                />
                <Bar dataKey="new" fill="hsl(var(--primary))" name="New Customers" radius={[2, 2, 0, 0]} />
                <Bar dataKey="returning" fill="hsl(var(--amber))" name="Returning" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Customer Segments</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={segmentData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                  labelLine={false}
                >
                  {segmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Customer Lifetime Value */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Customer Lifetime Value Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={lifetimeData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
              <YAxis dataKey="range" type="category" stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))", 
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "6px"
                }}
              />
              <Bar dataKey="customers" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Customer Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-base">Average CLV</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary mb-2">$186.40</div>
            <p className="text-sm text-muted-foreground">Customer lifetime value</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-base">Repeat Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber mb-2">34.8%</div>
            <p className="text-sm text-muted-foreground">Customers who return</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-base">Avg. Order Freq.</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-sage mb-2">2.3</div>
            <p className="text-sm text-muted-foreground">Orders per customer</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CustomerAnalytics;