import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/lib/auth";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Services from "./pages/Services";
import ProviderProfile from "./pages/ProviderProfile";
import Booking from "./pages/Booking";
import CustomerDashboard from "./pages/dashboard/CustomerDashboard";
import ProviderDashboard from "./pages/dashboard/ProviderDashboard";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import BecomeProvider from "./pages/BecomeProvider";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:category" element={<Services />} />
            <Route path="/provider/:id" element={<ProviderProfile />} />
            <Route path="/book/:id" element={<Booking />} />
            <Route path="/dashboard" element={<CustomerDashboard />} />
            <Route path="/provider/dashboard" element={<ProviderDashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/become-provider" element={<BecomeProvider />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
