import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AdCampaignList from "@/components/ads/AdCampaignList";
import CreateAdButton from "@/components/ads/CreateAdButton";
import AdPerformanceOverview from "@/components/ads/AdPerformanceOverview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-20">
        {/* Header */}
        <section className="py-12 bg-gradient-to-br from-amber/10 to-honey/10">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h1 className="text-4xl font-bold mb-4">Advertisement Manager</h1>
                <p className="text-xl text-muted-foreground max-w-2xl">
                  Create and manage your advertising campaigns to reach more customers
                </p>
              </div>
              <CreateAdButton />
            </div>
          </div>
        </section>

        {/* Ad Management Dashboard */}
        <div className="container mx-auto px-4 py-8">
          <Tabs defaultValue="campaigns" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="billing">Billing</TabsTrigger>
            </TabsList>

            <TabsContent value="campaigns" className="space-y-6">
              <AdCampaignList />
            </TabsContent>

            <TabsContent value="performance" className="space-y-6">
              <AdPerformanceOverview />
            </TabsContent>

            <TabsContent value="billing" className="space-y-6">
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold mb-4">Billing Overview</h3>
                <p className="text-muted-foreground">Ad spending and billing details coming soon...</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdsPage;