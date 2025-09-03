import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Marketplace from "@/components/marketplace/Marketplace";

const MarketplacePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <Marketplace />
      </main>
      <Footer />
    </div>
  );
};

export default MarketplacePage;