import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  Plus, 
  Edit, 
  Eye, 
  Package, 
  AlertTriangle,
  Star,
  Search,
  Filter,
  MoreVertical,
  TrendingUp,
  DollarSign
} from "lucide-react";

interface ProductVariant {
  id: string;
  name: string;
  sku: string;
  price: number;
  inventory: number;
  lowStockThreshold: number;
  weight: number;
  dimensions: { length: number; width: number; height: number };
}

interface Product {
  id: string;
  name: string;
  description: string;
  category: 'honey' | 'beeswax' | 'pollen' | 'equipment';
  basePrice: number;
  variants: ProductVariant[];
  images: string[];
  isActive: boolean;
  totalSales: number;
  rating: number;
  reviewCount: number;
  createdAt: string;
}

const ProductCatalog = () => {
  const [products] = useState<Product[]>([
    {
      id: '1',
      name: 'Wildflower Honey',
      description: 'Pure wildflower honey from our meadow hives',
      category: 'honey',
      basePrice: 12.99,
      variants: [
        {
          id: '1a',
          name: '8oz Jar',
          sku: 'WH-8OZ-001',
          price: 12.99,
          inventory: 45,
          lowStockThreshold: 10,
          weight: 0.5,
          dimensions: { length: 3, width: 3, height: 4 }
        },
        {
          id: '1b',
          name: '16oz Jar',
          sku: 'WH-16OZ-001',
          price: 22.99,
          inventory: 3,
          lowStockThreshold: 5,
          weight: 1,
          dimensions: { length: 4, width: 4, height: 5 }
        }
      ],
      images: ['/api/placeholder/400/300'],
      isActive: true,
      totalSales: 156,
      rating: 4.8,
      reviewCount: 24,
      createdAt: '2024-01-15'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAddProduct, setShowAddProduct] = useState(false);

  const categoryColors = {
    honey: 'bg-honey text-dark-brown',
    beeswax: 'bg-amber text-amber-dark',
    pollen: 'bg-sage text-sage-dark',
    equipment: 'bg-sky text-sky-dark'
  };

  const getStockStatus = (inventory: number, threshold: number) => {
    if (inventory === 0) return { text: 'Out of Stock', color: 'bg-destructive text-destructive-foreground' };
    if (inventory <= threshold) return { text: 'Low Stock', color: 'bg-amber text-amber-dark' };
    return { text: 'In Stock', color: 'bg-sage text-sage-dark' };
  };

  return (
    <div className="space-y-6">
      {/* Header & Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-2">Product Catalog</h2>
          <p className="text-muted-foreground">Manage your products and inventory</p>
        </div>
        <Button 
          onClick={() => setShowAddProduct(true)}
          className="bg-honey text-dark-brown hover:bg-honey-dark hover:text-cream"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 text-center">
          <Package className="w-6 h-6 mx-auto mb-2 text-honey-dark" />
          <div className="text-2xl font-bold text-foreground">{products.length}</div>
          <div className="text-sm text-muted-foreground">Total Products</div>
        </Card>
        <Card className="p-4 text-center">
          <TrendingUp className="w-6 h-6 mx-auto mb-2 text-sage" />
          <div className="text-2xl font-bold text-foreground">
            {products.filter(p => p.isActive).length}
          </div>
          <div className="text-sm text-muted-foreground">Active Products</div>
        </Card>
        <Card className="p-4 text-center">
          <AlertTriangle className="w-6 h-6 mx-auto mb-2 text-amber" />
          <div className="text-2xl font-bold text-foreground">
            {products.reduce((count, p) => 
              count + p.variants.filter(v => v.inventory <= v.lowStockThreshold).length, 0
            )}
          </div>
          <div className="text-sm text-muted-foreground">Low Stock Items</div>
        </Card>
        <Card className="p-4 text-center">
          <DollarSign className="w-6 h-6 mx-auto mb-2 text-sky" />
          <div className="text-2xl font-bold text-foreground">
            ${products.reduce((sum, p) => sum + (p.totalSales * p.basePrice), 0).toLocaleString()}
          </div>
          <div className="text-sm text-muted-foreground">Total Revenue</div>
        </Card>
      </div>

      {/* Search & Filters */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button 
              variant={selectedCategory === 'all' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setSelectedCategory('all')}
            >
              All
            </Button>
            <Button 
              variant={selectedCategory === 'honey' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setSelectedCategory('honey')}
            >
              Honey
            </Button>
            <Button 
              variant={selectedCategory === 'beeswax' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setSelectedCategory('beeswax')}
            >
              Beeswax
            </Button>
            <Button 
              variant={selectedCategory === 'pollen' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setSelectedCategory('pollen')}
            >
              Pollen
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>
        </div>
      </Card>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="overflow-hidden hover-lift transition-all duration-300">
            {/* Product Image */}
            <div className="relative h-48 overflow-hidden">
              <img 
                src={product.images[0] || '/api/placeholder/400/300'} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 flex gap-2">
                <Badge className={categoryColors[product.category]}>
                  {product.category.toUpperCase()}
                </Badge>
                {!product.isActive && (
                  <Badge variant="secondary">DRAFT</Badge>
                )}
              </div>
              <div className="absolute top-3 right-3">
                <Button variant="ghost" size="sm" className="bg-white/80 backdrop-blur-sm">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Product Details */}
            <div className="p-4 space-y-4">
              <div>
                <h3 className="font-semibold text-lg text-foreground mb-1">
                  {product.name}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {product.description}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-amber text-amber" />
                    <span className="text-sm font-medium">{product.rating}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    ({product.reviewCount} reviews)
                  </span>
                </div>
              </div>

              {/* Variants */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-foreground">Variants:</h4>
                {product.variants.map((variant) => {
                  const stockStatus = getStockStatus(variant.inventory, variant.lowStockThreshold);
                  return (
                    <div key={variant.id} className="flex items-center justify-between text-sm p-2 bg-muted/50 rounded">
                      <div>
                        <span className="font-medium">{variant.name}</span>
                        <div className="text-xs text-muted-foreground">
                          SKU: {variant.sku}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">${variant.price}</div>
                        <Badge className={`text-xs ${stockStatus.color}`}>
                          {variant.inventory} left
                        </Badge>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Performance Stats */}
              <div className="flex justify-between text-sm">
                <div>
                  <span className="text-muted-foreground">Sales: </span>
                  <span className="font-medium">{product.totalSales}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Revenue: </span>
                  <span className="font-medium text-sage">
                    ${(product.totalSales * product.basePrice).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="w-4 h-4 mr-2" />
                  View
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Add Product Form Modal would go here */}
      {showAddProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-semibold">Add New Product</h3>
                <Button 
                  variant="ghost" 
                  onClick={() => setShowAddProduct(false)}
                >
                  ✕
                </Button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Product Name</label>
                  <Input placeholder="e.g., Wildflower Honey" />
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Description</label>
                  <Textarea placeholder="Describe your product..." rows={3} />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Category</label>
                    <select className="w-full p-2 border rounded-md">
                      <option value="honey">Honey</option>
                      <option value="beeswax">Beeswax</option>
                      <option value="pollen">Pollen</option>
                      <option value="equipment">Equipment</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Base Price</label>
                    <Input type="number" placeholder="0.00" />
                  </div>
                </div>
                
                <div className="flex justify-end gap-3">
                  <Button 
                    variant="outline"
                    onClick={() => setShowAddProduct(false)}
                  >
                    Cancel
                  </Button>
                  <Button className="bg-sage text-white hover:bg-sage-dark">
                    Create Product
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ProductCatalog;