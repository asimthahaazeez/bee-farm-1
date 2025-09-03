import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  ShoppingCart as CartIcon,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  Gift,
  Truck,
  Shield,
  Tag
} from "lucide-react";

interface CartItem {
  id: string;
  productId: string;
  variantId: string;
  name: string;
  variantName: string;
  price: number;
  quantity: number;
  image: string;
  seller: {
    id: string;
    name: string;
    location: string;
  };
  weight: number;
  inStock: boolean;
  maxQuantity: number;
}

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      productId: 'prod1',
      variantId: 'var1',
      name: 'Wildflower Honey',
      variantName: '16oz Jar',
      price: 24.99,
      quantity: 2,
      image: '/api/placeholder/300/200',
      seller: {
        id: 'seller1',
        name: 'Mountain View Apiary',
        location: 'Colorado Springs, CO'
      },
      weight: 1.0,
      inStock: true,
      maxQuantity: 10
    },
    {
      id: '2',
      productId: 'prod2',
      variantId: 'var2',
      name: 'Beeswax Candles',
      variantName: 'Set of 3',
      price: 18.50,
      quantity: 1,
      image: '/api/placeholder/300/200',
      seller: {
        id: 'seller2',
        name: 'Golden Hive Co.',
        location: 'Austin, TX'
      },
      weight: 0.5,
      inStock: true,
      maxQuantity: 5
    }
  ]);

  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(prev =>
      prev.map(item =>
        item.id === itemId
          ? { ...item, quantity: Math.min(newQuantity, item.maxQuantity) }
          : item
      )
    );
  };

  const removeItem = (itemId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };

  const applyPromoCode = () => {
    // Mock promo code validation
    if (promoCode === 'HONEY10') {
      setAppliedPromo(promoCode);
      setPromoCode('');
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const promoDiscount = appliedPromo === 'HONEY10' ? subtotal * 0.1 : 0;
  const shipping = subtotal > 50 ? 0 : 8.99;
  const tax = (subtotal - promoDiscount) * 0.08;
  const total = subtotal - promoDiscount + shipping + tax;

  const groupedBySeller = cartItems.reduce((groups, item) => {
    const sellerId = item.seller.id;
    if (!groups[sellerId]) {
      groups[sellerId] = {
        seller: item.seller,
        items: []
      };
    }
    groups[sellerId].items.push(item);
    return groups;
  }, {} as Record<string, { seller: CartItem['seller'], items: CartItem[] }>);

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card className="text-center py-16">
          <CartIcon className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">
            Discover amazing honey and bee products from our marketplace
          </p>
          <Button className="bg-honey text-dark-brown hover:bg-honey-dark hover:text-cream">
            <ArrowRight className="w-4 h-4 mr-2" />
            Browse Products
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">Shopping Cart</h1>
        <p className="text-muted-foreground">
          {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {Object.entries(groupedBySeller).map(([sellerId, group]) => (
            <Card key={sellerId} className="p-6">
              <div className="mb-4 pb-4 border-b">
                <h3 className="font-semibold text-foreground">{group.seller.name}</h3>
                <p className="text-sm text-muted-foreground">{group.seller.location}</p>
              </div>

              <div className="space-y-4">
                {group.items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-24 h-20 rounded-lg overflow-hidden flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-foreground truncate">
                        {item.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {item.variantName}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline" className="text-xs">
                          {item.weight}lb each
                        </Badge>
                        {!item.inStock && (
                          <Badge variant="destructive" className="text-xs">
                            Out of Stock
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Quantity Controls */}
                      <div className="flex items-center border rounded-lg">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="h-8 w-8 p-0"
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="px-3 py-1 text-sm font-medium min-w-[2rem] text-center">
                          {item.quantity}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={item.quantity >= item.maxQuantity}
                          className="h-8 w-8 p-0"
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>

                      {/* Price */}
                      <div className="text-right min-w-[4rem]">
                        <div className="font-semibold text-foreground">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          ${item.price} each
                        </div>
                      </div>

                      {/* Remove Button */}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ))}

          {/* Promo Code */}
          <Card className="p-4">
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  placeholder="Enter promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                />
              </div>
              <Button 
                variant="outline" 
                onClick={applyPromoCode}
                disabled={!promoCode}
              >
                <Tag className="w-4 h-4 mr-2" />
                Apply
              </Button>
            </div>
            {appliedPromo && (
              <div className="mt-3 p-3 bg-sage/20 rounded-lg">
                <div className="flex items-center gap-2 text-sm text-sage-dark">
                  <Gift className="w-4 h-4" />
                  <span>Promo code "{appliedPromo}" applied - 10% off!</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setAppliedPromo(null)}
                    className="ml-auto h-6 w-6 p-0"
                  >
                    ✕
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Order Summary */}
        <div className="space-y-4">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              
              {promoDiscount > 0 && (
                <div className="flex justify-between text-sage">
                  <span>Discount ({appliedPromo})</span>
                  <span>-${promoDiscount.toFixed(2)}</span>
                </div>
              )}
              
              <div className="flex justify-between">
                <span className="flex items-center gap-2">
                  Shipping
                  {shipping === 0 && (
                    <Badge className="bg-sage text-sage-dark text-xs">FREE</Badge>
                  )}
                </span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              
              <div className="border-t pt-3">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <Button className="w-full mt-6 bg-honey text-dark-brown hover:bg-honey-dark hover:text-cream">
              <ArrowRight className="w-4 h-4 mr-2" />
              Proceed to Checkout
            </Button>
          </Card>

          {/* Trust Signals */}
          <Card className="p-4">
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <Shield className="w-4 h-4 text-sage" />
                <span>Secure & encrypted checkout</span>
              </div>
              <div className="flex items-center gap-3">
                <Truck className="w-4 h-4 text-sage" />
                <span>Free shipping on orders over $50</span>
              </div>
              <div className="flex items-center gap-3">
                <Gift className="w-4 h-4 text-sage" />
                <span>30-day satisfaction guarantee</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;