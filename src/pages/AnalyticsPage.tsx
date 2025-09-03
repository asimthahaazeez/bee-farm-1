import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AnalyticsDashboard from "@/components/analytics/AnalyticsDashboard";
import HiveHealthScore from "@/components/analytics/HiveHealthScore";
import PLReportGenerator from "@/components/financial/PLReportGenerator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import KPICards from "@/components/analytics/KPICards";
import SalesChart from "@/components/analytics/SalesChart";
import ConversionFunnel from "@/components/analytics/ConversionFunnel";
import CustomerAnalytics from "@/components/analytics/CustomerAnalytics";

const AnalyticsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-20">
        {/* Header */}
        <section className="py-12 bg-gradient-to-br from-primary/10 to-accent/10">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-center mb-4">Business Analytics</h1>
            <p className="text-xl text-muted-foreground text-center max-w-2xl mx-auto">
              Track your performance, understand your customers, and grow your beekeeping business
            </p>
          </div>
        </section>

        {/* Analytics Dashboard */}
        <div className="container mx-auto px-4 py-8">
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="sales">Sales</TabsTrigger>
              <TabsTrigger value="customers">Customers</TabsTrigger>
              <TabsTrigger value="products">Products</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <KPICards />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <SalesChart />
                <ConversionFunnel />
              </div>
              <AnalyticsDashboard />
            </TabsContent>

            <TabsContent value="sales" className="space-y-6">
              <SalesChart />
              <AnalyticsDashboard />
            </TabsContent>

            <TabsContent value="customers" className="space-y-6">
              <CustomerAnalytics />
            </TabsContent>

            <TabsContent value="products" className="space-y-6">
              {/* Product analytics components would go here */}
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold mb-4">Product Analytics</h3>
                <p className="text-muted-foreground">Product performance metrics coming soon...</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AnalyticsPage;