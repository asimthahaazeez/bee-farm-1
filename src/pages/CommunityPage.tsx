import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SocialFeed from "@/components/community/SocialFeed";
import CreatePostCard from "@/components/community/CreatePostCard";
import TrendingTopics from "@/components/community/TrendingTopics";
import CommunityStats from "@/components/community/CommunityStats";

const CommunityPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-16 bg-gradient-to-br from-honey-light/20 to-amber/20">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Join the Beekeeping Community
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Connect with fellow beekeepers, share your journey, and learn from experts worldwide
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <CommunityStats />
                <TrendingTopics />
              </div>
            </div>

            {/* Main Feed */}
            <div className="lg:col-span-2 space-y-6">
              <CreatePostCard />
              <SocialFeed />
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                {/* Additional widgets can go here */}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CommunityPage;