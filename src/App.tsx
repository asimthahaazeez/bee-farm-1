import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DiagnosticsPage from "./pages/DiagnosticsPage";
import MarketplacePage from "./pages/MarketplacePage";
import SellerPage from "./pages/SellerPage";
import CartPage from "./pages/CartPage";
import CommunityPage from "./pages/CommunityPage";
import DirectoryPage from "./pages/DirectoryPage";
import KnowledgePage from "./pages/KnowledgePage";
import AnalyticsPage from "./pages/AnalyticsPage";
import AdsPage from "./pages/AdsPage";
import ProfilePage from "./pages/ProfilePage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/diagnostics" element={<DiagnosticsPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/directory" element={<DirectoryPage />} />
          <Route path="/knowledge" element={<KnowledgePage />} />
          <Route path="/marketplace" element={<MarketplacePage />} />
          <Route path="/seller" element={<SellerPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/ads" element={<AdsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/beekeeper/:id" element={<ProfilePage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
