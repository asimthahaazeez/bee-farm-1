import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ShoppingCart from "@/components/marketplace/ShoppingCart";

const CartPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="py-8">
        <ShoppingCart />
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;