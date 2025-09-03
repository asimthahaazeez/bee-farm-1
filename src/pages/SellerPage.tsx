import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SellerDashboard from "@/components/seller/SellerDashboard";
import ProductCatalog from "@/components/marketplace/ProductCatalog";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BarChart3,
  Package,
  ShoppingBag,
  Settings,
  CreditCard,
  Bell
} from "lucide-react";

const SellerPage = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const navigation = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
    { id: 'payouts', label: 'Payouts', icon: CreditCard },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <SellerDashboard />;
      case 'products':
        return <ProductCatalog />;
      case 'orders':
        return (
          <Card className="p-8 text-center">
            <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-2xl font-semibold mb-2">Order Management</h3>
            <p className="text-muted-foreground mb-4">
              Manage your orders, track shipments, and handle customer communications
            </p>
            <p className="text-sm text-muted-foreground">
              This feature will be implemented in the backend integration phase
            </p>
          </Card>
        );
      case 'payouts':
        return (
          <Card className="p-8 text-center">
            <CreditCard className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-2xl font-semibold mb-2">Payout Management</h3>
            <p className="text-muted-foreground mb-4">
              View your earnings, manage payout methods, and track payment history
            </p>
            <p className="text-sm text-muted-foreground">
              This feature will be implemented in the backend integration phase
            </p>
          </Card>
        );
      case 'notifications':
        return (
          <Card className="p-8 text-center">
            <Bell className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-2xl font-semibold mb-2">Notifications</h3>
            <p className="text-muted-foreground mb-4">
              Stay updated with order notifications, customer messages, and platform updates
            </p>
            <p className="text-sm text-muted-foreground">
              This feature will be implemented in the backend integration phase
            </p>
          </Card>
        );
      case 'settings':
        return (
          <Card className="p-8 text-center">
            <Settings className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-2xl font-semibold mb-2">Store Settings</h3>
            <p className="text-muted-foreground mb-4">
              Configure your store details, shipping settings, and business information
            </p>
            <p className="text-sm text-muted-foreground">
              This feature will be implemented in the backend integration phase
            </p>
          </Card>
        );
      default:
        return <SellerDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card className="p-4">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Seller Center
              </h2>
              <nav className="space-y-2">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Button
                      key={item.id}
                      variant={activeTab === item.id ? 'default' : 'ghost'}
                      className="w-full justify-start"
                      onClick={() => setActiveTab(item.id)}
                    >
                      <Icon className="w-4 h-4 mr-3" />
                      {item.label}
                    </Button>
                  );
                })}
              </nav>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-4">
            {renderContent()}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SellerPage;