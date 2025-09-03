import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  MapPin, 
  Star, 
  Heart,
  ShoppingCart,
  Grid3X3,
  List,
  TrendingUp,
  Award
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  seller: {
    id: string;
    name: string;
    location: string;
    rating: number;
    verified: boolean;
  };
  images: string[];
  rating: number;
  reviewCount: number;
  category: string;
  isOnSale: boolean;
  isFavorited: boolean;
  inStock: boolean;
}

const Marketplace = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('relevance');
  
  const [products] = useState<Product[]>([
    {
      id: '1',
      name: 'Raw Wildflower Honey',
      description: 'Pure, unprocessed wildflower honey from our mountain hives',
      price: 24.99,
      originalPrice: 29.99,
      seller: {
        id: 'seller1',
        name: 'Mountain View Apiary',
        location: 'Colorado Springs, CO',
        rating: 4.9,
        verified: true
      },
      images: ['/api/placeholder/400/300'],
      rating: 4.8,
      reviewCount: 156,
      category: 'honey',
      isOnSale: true,
      isFavorited: false,
      inStock: true
    },
    {
      id: '2',
      name: 'Organic Beeswax Candles',
      description: 'Hand-poured beeswax candles with natural lavender scent',
      price: 18.50,
      seller: {
        id: 'seller2',
        name: 'Golden Hive Co.',
        location: 'Austin, TX',
        rating: 4.7,
        verified: true
      },
      images: ['/api/placeholder/400/300'],
      rating: 4.9,
      reviewCount: 89,
      category: 'beeswax',
      isOnSale: false,
      isFavorited: true,
      inStock: true
    }
  ]);

  const [cartItems, setCartItems] = useState<string[]>([]);
  const [favoriteItems, setFavoriteItems] = useState<string[]>(['2']);

  const addToCart = (productId: string) => {
    setCartItems(prev => [...prev, productId]);
  };

  const toggleFavorite = (productId: string) => {
    setFavoriteItems(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const categories = [
    { id: 'all', name: 'All Products', count: products.length },
    { id: 'honey', name: 'Honey', count: products.filter(p => p.category === 'honey').length },
    { id: 'beeswax', name: 'Beeswax', count: products.filter(p => p.category === 'beeswax').length },
    { id: 'pollen', name: 'Pollen', count: products.filter(p => p.category === 'pollen').length },
    { id: 'equipment', name: 'Equipment', count: products.filter(p => p.category === 'equipment').length }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">Honey Marketplace</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover artisanal honey and bee products from verified beekeepers around the world
        </p>
      </div>

      {/* Search & Filters */}
      <Card className="p-6">
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search for honey, beeswax, pollen..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-12 text-lg"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="flex items-center gap-2"
              >
                {category.name}
                <Badge variant="secondary" className="text-xs">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>

          {/* Advanced Filters & View Options */}
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Location
              </Button>
              <Button variant="outline" size="sm">
                <Award className="w-4 h-4 mr-2" />
                Verified Only
              </Button>
              <select 
                className="px-3 py-1 text-sm border rounded-md"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="relevance">Sort by Relevance</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest</option>
              </select>
            </div>
            
            <div className="flex gap-1">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Products Grid/List */}
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-4'}>
        {products.map((product) => (
          <Card 
            key={product.id} 
            className={`overflow-hidden hover-lift transition-all duration-300 group ${
              viewMode === 'list' ? 'flex' : ''
            }`}
          >
            {/* Product Image */}
            <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-48 h-32' : 'h-48'}`}>
              <img 
                src={product.images[0]} 
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              
              {/* Badges & Actions */}
              <div className="absolute top-3 left-3 flex flex-col gap-2">
                {product.isOnSale && (
                  <Badge className="bg-destructive text-destructive-foreground">
                    SALE
                  </Badge>
                )}
                {product.seller.verified && (
                  <Badge className="bg-sage text-sage-dark">
                    <Award className="w-3 h-3 mr-1" />
                    VERIFIED
                  </Badge>
                )}
              </div>
              
              <div className="absolute top-3 right-3">
                <Button
                  variant="ghost"
                  size="sm"
                  className="bg-white/80 backdrop-blur-sm p-2"
                  onClick={() => toggleFavorite(product.id)}
                >
                  <Heart 
                    className={`w-4 h-4 ${
                      favoriteItems.includes(product.id) 
                        ? 'fill-red-500 text-red-500' 
                        : 'text-gray-600'
                    }`} 
                  />
                </Button>
              </div>
              
              {!product.inStock && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <Badge className="bg-destructive text-destructive-foreground">
                    OUT OF STOCK
                  </Badge>
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className={`p-4 space-y-3 ${viewMode === 'list' ? 'flex-1' : ''}`}>
              <div>
                <h3 className="font-semibold text-lg text-foreground mb-1 line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {product.description}
                </p>
              </div>

              {/* Seller Info */}
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">by</span>
                <span className="font-medium text-foreground">{product.seller.name}</span>
                {product.seller.verified && (
                  <Award className="w-3 h-3 text-sage" />
                )}
              </div>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-3 h-3" />
                <span>{product.seller.location}</span>
              </div>

              {/* Rating & Reviews */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-amber text-amber" />
                  <span className="text-sm font-medium">{product.rating}</span>
                </div>
                <span className="text-xs text-muted-foreground">
                  ({product.reviewCount} reviews)
                </span>
              </div>

              {/* Price & Actions */}
              <div className="flex items-center justify-between pt-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-foreground">
                      ${product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                  {product.isOnSale && product.originalPrice && (
                    <div className="text-xs text-sage font-medium">
                      Save ${(product.originalPrice - product.price).toFixed(2)}
                    </div>
                  )}
                </div>
                
                <Button
                  onClick={() => addToCart(product.id)}
                  disabled={!product.inStock}
                  className="bg-honey text-dark-brown hover:bg-honey-dark hover:text-cream"
                  size="sm"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <Button variant="outline" size="lg">
          <TrendingUp className="w-4 h-4 mr-2" />
          Load More Products
        </Button>
      </div>
    </div>
  );
};

export default Marketplace;