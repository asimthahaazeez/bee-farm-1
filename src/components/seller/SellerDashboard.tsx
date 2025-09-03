import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  DollarSign,
  Package,
  ShoppingBag,
  TrendingUp,
  Eye,
  Star,
  Calendar,
  ArrowUp,
  ArrowDown,
  MoreVertical,
  Download,
  Bell
} from "lucide-react";

interface SalesStat {
  label: string;
  value: string;
  change: number;
  icon: React.ComponentType<any>;
}

interface Order {
  id: string;
  orderNumber: string;
  customer: string;
  items: Array<{
    name: string;
    variant: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  date: string;
  commission: number;
  payout: number;
}

interface TopProduct {
  id: string;
  name: string;
  sales: number;
  revenue: number;
  growth: number;
  image: string;
}

const SellerDashboard = () => {
  const [timeframe, setTimeframe] = useState('30d');
  
  const salesStats: SalesStat[] = [
    {
      label: 'Total Revenue',
      value: '$4,256.78',
      change: 12.5,
      icon: DollarSign
    },
    {
      label: 'Orders',
      value: '89',
      change: 8.2,
      icon: ShoppingBag
    },
    {
      label: 'Products Sold',
      value: '156',
      change: -2.1,
      icon: Package
    },
    {
      label: 'Avg. Order Value',
      value: '$47.83',
      change: 15.3,
      icon: TrendingUp
    }
  ];

  const recentOrders: Order[] = [
    {
      id: '1',
      orderNumber: 'ORD-2024-001',
      customer: 'Sarah Johnson',
      items: [
        { name: 'Wildflower Honey', variant: '16oz Jar', quantity: 2, price: 24.99 }
      ],
      total: 49.98,
      status: 'processing',
      date: '2024-01-15',
      commission: 2.50,
      payout: 47.48
    },
    {
      id: '2',
      orderNumber: 'ORD-2024-002',
      customer: 'Mike Chen',
      items: [
        { name: 'Beeswax Candles', variant: 'Set of 3', quantity: 1, price: 18.50 }
      ],
      total: 18.50,
      status: 'shipped',
      date: '2024-01-14',
      commission: 0.93,
      payout: 17.57
    }
  ];

  const topProducts: TopProduct[] = [
    {
      id: '1',
      name: 'Wildflower Honey 16oz',
      sales: 45,
      revenue: 1124.55,
      growth: 18.5,
      image: '/api/placeholder/300/200'
    },
    {
      id: '2',
      name: 'Raw Clover Honey 8oz',
      sales: 32,
      revenue: 415.68,
      growth: 12.3,
      image: '/api/placeholder/300/200'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-amber text-amber-dark';
      case 'processing': return 'bg-sky text-sky-dark';
      case 'shipped': return 'bg-sage text-sage-dark';
      case 'delivered': return 'bg-sage text-sage-dark';
      default: return 'bg-muted';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Seller Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's how your business is performing.
          </p>
        </div>
        <div className="flex gap-3">
          <select 
            className="px-3 py-2 border rounded-lg text-sm"
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 3 months</option>
            <option value="1y">Last year</option>
          </select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
          <Package className="w-5 h-5 text-honey-dark" />
          <span className="text-sm">Add Product</span>
        </Button>
        <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
          <Eye className="w-5 h-5 text-sage" />
          <span className="text-sm">View Store</span>
        </Button>
        <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
          <Bell className="w-5 h-5 text-sky" />
          <span className="text-sm">Notifications</span>
        </Button>
        <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
          <DollarSign className="w-5 h-5 text-amber" />
          <span className="text-sm">Payouts</span>
        </Button>
      </div>

      {/* Sales Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {salesStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-honey/20 rounded-full">
                  <Icon className="w-6 h-6 text-honey-dark" />
                </div>
                <div className={`flex items-center gap-1 text-sm ${
                  stat.change >= 0 ? 'text-sage' : 'text-destructive'
                }`}>
                  {stat.change >= 0 ? (
                    <ArrowUp className="w-4 h-4" />
                  ) : (
                    <ArrowDown className="w-4 h-4" />
                  )}
                  {Math.abs(stat.change)}%
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-foreground">Recent Orders</h3>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
            
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="p-4 border rounded-xl">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-semibold text-foreground">
                          {order.orderNumber}
                        </span>
                        <Badge className={getStatusColor(order.status)}>
                          {order.status.toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Customer: {order.customer}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(order.date).toLocaleDateString()}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="space-y-2 mb-3">
                    {order.items.map((item, index) => (
                      <div key={index} className="text-sm">
                        <span className="font-medium">{item.name}</span>
                        <span className="text-muted-foreground"> - {item.variant}</span>
                        <span className="text-muted-foreground"> × {item.quantity}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center text-sm">
                    <div>
                      <span className="text-muted-foreground">Total: </span>
                      <span className="font-semibold">${order.total.toFixed(2)}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Your payout: </span>
                      <span className="font-semibold text-sage">${order.payout.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Top Products & Analytics */}
        <div className="space-y-6">
          {/* Top Products */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold text-foreground mb-4">Top Products</h3>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.id} className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-muted-foreground">
                        #{index + 1}
                      </span>
                      <span className="font-medium text-foreground truncate">
                        {product.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{product.sales} sold</span>
                      <span>${product.revenue.toFixed(2)} revenue</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-sage">
                      <TrendingUp className="w-3 h-3" />
                      <span>{product.growth}% growth</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Monthly Goal */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold text-foreground mb-4">Monthly Goal</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Revenue Progress</span>
                  <span>$4,256 / $6,000</span>
                </div>
                <Progress value={71} className="h-3" />
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-sage mb-1">71%</div>
                <div className="text-sm text-muted-foreground">
                  $1,744 left to reach your goal
                </div>
              </div>
            </div>
          </Card>

          {/* Store Rating */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold text-foreground mb-4">Store Performance</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Average Rating</span>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-amber text-amber" />
                  <span className="font-semibold">4.8</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Reviews</span>
                <span className="font-semibold">147</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Response Rate</span>
                <span className="font-semibold text-sage">98%</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;