import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BeekeeperGrid from "@/components/directory/BeekeeperGrid";
import DirectoryFilters from "@/components/directory/DirectoryFilters";
import DirectoryMap from "@/components/directory/DirectoryMap";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const DirectoryPage = () => {
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-16 bg-gradient-to-br from-sage/20 to-honey-light/20">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 hexagon-border p-8 inline-block">
                Beekeeper Directory
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Discover verified beekeepers in your area and connect with experts worldwide
              </p>
            </div>
          </div>
        </section>

        {/* Search and Filters */}
        <div className="container mx-auto px-4 py-8">
          <DirectoryFilters />
          
          {/* View Toggle */}
          <div className="flex justify-center mb-8">
            <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as "grid" | "map")} className="w-auto">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="grid">Grid View</TabsTrigger>
                <TabsTrigger value="map">Map View</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Content */}
          <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as "grid" | "map")}>
            <TabsContent value="grid" className="mt-0">
              <BeekeeperGrid />
            </TabsContent>
            <TabsContent value="map" className="mt-0">
              <DirectoryMap />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DirectoryPage;