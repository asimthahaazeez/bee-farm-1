import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Bell, 
  Home, 
  Activity, 
  ShoppingCart, 
  Menu, 
  X, 
  User, 
  Settings, 
  Store,
  ShoppingBag,
  Users,
  MapPin,
  BookOpen,
  BarChart3,
  Megaphone,
  LogOut,
  Key,
  Shield
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { useAuth } from "@/components/auth/AuthProvider";
import beeMascot from "@/assets/bee-mascot.png";

const Navigation = () => {
  const { user, signOut, loading } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Mock data for notification counts
  const pendingAnalyses = 2;
  const cartItems = 3;

  const navItems = [
    { 
      icon: Home, 
      label: "Dashboard", 
      href: "/",
      notifications: 0
    },
    { 
      icon: Activity, 
      label: "Diagnostics", 
      href: "/diagnostics",
      notifications: pendingAnalyses
    },
    { 
      icon: Users, 
      label: "Community", 
      href: "/community",
      notifications: 0
    },
    {
      icon: MapPin,
      label: "Directory",
      href: "/directory", 
      notifications: 0
    },
    {
      icon: BookOpen,
      label: "Knowledge",
      href: "/knowledge",
      notifications: 0
    },
    { 
      icon: ShoppingCart, 
      label: "Marketplace", 
      href: "/marketplace",
      notifications: 0
    },
    { 
      icon: Store, 
      label: "Seller Hub", 
      href: "/seller",
      notifications: 2
    },
    { 
      icon: BarChart3, 
      label: "Analytics", 
      href: "/analytics",
      notifications: 0
    },
    {
      icon: Megaphone,
      label: "Ads",
      href: "/ads",
      notifications: 0
    },
    { 
      icon: ShoppingBag, 
      label: "Cart", 
      href: "/cart",
      notifications: cartItems
    }
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-warm-gray/30 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img 
              src={beeMascot} 
              alt="BeeWise Logo" 
              className="w-8 h-8 bee-trail"
            />
            <span className="text-2xl font-bold text-dark-brown">BeeWise</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.slice(0, 6).map((item, index) => (
              <Link key={index} to={item.href}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="relative flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-300 text-dark-brown/70 hover:text-dark-brown hover:bg-honey-light/20"
                >
                  <item.icon className="w-4 h-4" />
                  <span className="font-medium">{item.label}</span>
                  {item.notifications > 0 && (
                    <Badge className="ml-1 bg-amber text-dark-brown text-xs px-1.5 py-0.5 min-w-[20px] h-5">
                      {item.notifications}
                    </Badge>
                  )}
                </Button>
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="relative p-2 rounded-xl">
              <Bell className="w-5 h-5 text-dark-brown/70" />
              <Badge className="absolute -top-1 -right-1 bg-amber text-dark-brown text-xs px-1.5 py-0.5 min-w-[20px] h-5">
                3
              </Badge>
            </Button>
            
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden p-2 rounded-xl"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-dark-brown" />
              ) : (
                <Menu className="w-5 h-5 text-dark-brown" />
              )}
            </Button>

            {/* Profile */}
            <div className="hidden md:flex items-center gap-3 ml-4 pl-4 border-l border-warm-gray/30">
              <div className="w-8 h-8 hexagon bg-gradient-to-br from-honey to-amber flex items-center justify-center">
                <span className="text-sm font-bold text-dark-brown">JD</span>
              </div>
              <div className="text-sm">
                <p className="font-medium text-dark-brown">John Doe</p>
                <p className="text-dark-brown/60">Beekeeper</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-warm-gray/30 bg-white/95 backdrop-blur-md">
            <div className="space-y-2">
              {navItems.map((item, index) => (
                <Link key={index} to={item.href}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start gap-3 px-4 py-3 rounded-xl text-dark-brown/70 hover:text-dark-brown hover:bg-honey-light/20"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                    {item.notifications > 0 && (
                      <Badge className="ml-auto bg-amber text-dark-brown text-xs">
                        {item.notifications}
                      </Badge>
                    )}
                  </Button>
                </Link>
              ))}
            </div>
            
            {/* Mobile Profile */}
            <div className="flex items-center gap-3 mt-4 pt-4 border-t border-warm-gray/30">
              <div className="w-10 h-10 hexagon bg-gradient-to-br from-honey to-amber flex items-center justify-center">
                <span className="text-sm font-bold text-dark-brown">JD</span>
              </div>
              <div>
                <p className="font-medium text-dark-brown">John Doe</p>
                <p className="text-sm text-dark-brown/60">Beekeeper</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;