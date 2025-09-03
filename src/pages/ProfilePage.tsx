import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BeekeeperProfile from "@/components/profile/BeekeeperProfile";
import ProfileReviews from "@/components/profile/ProfileReviews";
import ProfileProducts from "@/components/profile/ProfileProducts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParams } from "react-router-dom";

const ProfilePage = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-8">
          <BeekeeperProfile profileId={id} />
          
          <div className="mt-12">
            <Tabs defaultValue="products" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="products">Products</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="about">About</TabsTrigger>
              </TabsList>

              <TabsContent value="products">
                <ProfileProducts profileId={id} />
              </TabsContent>

              <TabsContent value="reviews">
                <ProfileReviews profileId={id} />
              </TabsContent>

              <TabsContent value="about">
                <div className="text-center py-12">
                  <h3 className="text-xl font-semibold mb-4">About This Beekeeper</h3>
                  <p className="text-muted-foreground">Extended profile information coming soon...</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProfilePage;