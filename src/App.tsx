import React, { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Founder from "./pages/Founder";
import NotFound from "./pages/NotFound";
import { DataProvider } from "./context/DataContext";
import HelloWorldDashboard from './components/Dashboard/HelloWorldDashboard';

// Create a custom ScrollToTop component to reset scroll position on navigation
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <DataProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <div className="min-h-screen bg-neutral-900 text-neutral-100 font-sans antialiased">
            <main className="space-y-24 py-12">
              <Routes>
                <Route path="/" element={
                  <div style={{ backgroundColor: '#000000', minHeight: '100vh' }}>
                    <Index />
                  </div>
                } />
                <Route path="/founder" element={<Founder />} />
                <Route path="/services" element={<Navigate to="/#services" replace />} />
                <Route path="/info" element={<Navigate to="/#charts" replace />} />
                <Route path="/contact" element={<Navigate to="/#contact" replace />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </DataProvider>
  </QueryClientProvider>
);

export { App };
export default App;
