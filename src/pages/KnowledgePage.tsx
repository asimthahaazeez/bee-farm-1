import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import KnowledgeHero from "@/components/knowledge/KnowledgeHero";
import FeaturedArticles from "@/components/knowledge/FeaturedArticles";
import CategoryGrid from "@/components/knowledge/CategoryGrid";
import ArticleSearch from "@/components/knowledge/ArticleSearch";

const KnowledgePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-20">
        <KnowledgeHero />
        
        {/* Search Section */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <ArticleSearch />
          </div>
        </section>

        {/* Featured Articles */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Featured Articles</h2>
            <FeaturedArticles />
          </div>
        </section>

        {/* Categories */}
        <section className="py-16 bg-muted/20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Browse by Category</h2>
            <CategoryGrid />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default KnowledgePage;