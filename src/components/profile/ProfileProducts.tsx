import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart, Heart } from "lucide-react";

interface ProfileProductsProps {
  profileId?: string;
}

const mockProducts = [
  {
    id: "1",
    name: "Vermont Wildflower Honey",
    description: "Pure, raw wildflower honey harvested from our Vermont apiaries. Rich in flavor with floral notes.",
    price: 24.99,
    originalPrice: null,
    image: "/placeholder.svg",
    rating: 4.9,
    reviewCount: 47,
    inStock: true,
    variants: ["500ml", "1kg", "2kg"],
    category: "Raw Honey"
  },
  {
    id: "2",
    name: "Organic Clover Honey",
    description: "Certified organic clover honey with a mild, sweet taste perfect for everyday use.",
    price: 29.99,
    originalPrice: 34.99,
    image: "/placeholder.svg",
    rating: 4.8,
    reviewCount: 32,
    inStock: true,
    variants: ["500ml", "1kg"],
    category: "Organic Honey"
  },
  {
    id: "3",
    name: "Raw Honeycomb",
    description: "Fresh honeycomb straight from the hive. Perfect for cheese boards and gourmet presentations.",
    price: 18.99,
    originalPrice: null,
    image: "/placeholder.svg",
    rating: 4.7,
    reviewCount: 23,
    inStock: true,
    variants: ["Small", "Large"],
    category: "Specialty"
  },
  {
    id: "4",
    name: "Beeswax Candles Set",
    description: "Hand-crafted pure beeswax candles. Natural, long-burning with a subtle honey scent.",
    price: 45.00,
    originalPrice: null,
    image: "/placeholder.svg",
    rating: 4.6,
    reviewCount: 18,
    inStock: false,
    variants: ["3-pack", "6-pack"],
    category: "Beeswax Products"
  },
  {
    id: "5",
    name: "Bee Pollen Granules",
    description: "Fresh bee pollen granules packed with nutrients. Great for smoothies and health supplements.",
    price: 32.99,
    originalPrice: null,
    image: "/placeholder.svg",
    rating: 4.8,
    reviewCount: 29,
    inStock: true,
    variants: ["250g", "500g"],
    category: "Bee Products"
  },
  {
    id: "6",
    name: "Propolis Tincture",
    description: "Pure propolis extract for natural immune support. Made from high-quality Vermont propolis.",
    price: 19.99,
    originalPrice: null,
    image: "/placeholder.svg",
    rating: 4.9,
    reviewCount: 15,
    inStock: true,
    variants: ["30ml", "60ml"],
    category: "Health Products"
  }
];

const ProfileProducts = ({ profileId }: ProfileProductsProps) => {
  return (
    <div className="space-y-6">
      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockProducts.map((product) => (
          <Card key={product.id} className="bg-card border-border hover-lift group">
            <div className="relative">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              {product.originalPrice && (
                <Badge className="absolute top-3 left-3 bg-destructive text-destructive-foreground">
                  Sale
                </Badge>
              )}
              {!product.inStock && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-t-lg">
                  <Badge variant="outline" className="bg-background">Out of Stock</Badge>
                </div>
              )}
              <Button 
                variant="outline" 
                size="sm" 
                className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Heart className="h-4 w-4" />
              </Button>
            </div>

            <CardHeader className="pb-3">
              <div className="space-y-2">
                <Badge variant="secondary" className="text-xs w-fit">
                  {product.category}
                </Badge>
                <h3 className="font-semibold text-foreground line-clamp-2">{product.name}</h3>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-amber fill-current" />
                    <span className="ml-1 text-sm font-medium">{product.rating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">({product.reviewCount})</span>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground line-clamp-2">
                {product.description}
              </p>

              {/* Variants */}
              <div className="flex flex-wrap gap-1">
                {product.variants.slice(0, 2).map((variant, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {variant}
                  </Badge>
                ))}
                {product.variants.length > 2 && (
                  <Badge variant="outline" className="text-xs">
                    +{product.variants.length - 2} more
                  </Badge>
                )}
              </div>

              {/* Price and Action */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold text-primary">${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>
                <Button 
                  size="sm" 
                  disabled={!product.inStock}
                  className="bg-primary hover:bg-primary/90"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <Button variant="outline">View All Products</Button>
      </div>
    </div>
  );
};

export default ProfileProducts;