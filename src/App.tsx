import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import PollutionPage from "./pages/PollutionPage";
import DeforestationPage from "./pages/DeforestationPage";
import WaterPage from "./pages/WaterPage";
import LearnPage from "./pages/LearnPage";
import AIAssistantPage from "./pages/AIAssistantPage";
import NASAEventsPage from "./pages/NASAEventsPage";
import CarbonCalculatorPage from "./pages/CarbonCalculatorPage";
import ComparePage from "./pages/ComparePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout><HomePage /></AppLayout>} />
          <Route path="/dashboard" element={<AppLayout><DashboardPage /></AppLayout>} />
          <Route path="/pollution" element={<AppLayout><PollutionPage /></AppLayout>} />
          <Route path="/deforestation" element={<AppLayout><DeforestationPage /></AppLayout>} />
          <Route path="/water" element={<AppLayout><WaterPage /></AppLayout>} />
          <Route path="/learn" element={<AppLayout><LearnPage /></AppLayout>} />
          <Route path="/ai-assistant" element={<AppLayout><AIAssistantPage /></AppLayout>} />
          <Route path="/events" element={<AppLayout><NASAEventsPage /></AppLayout>} />
          <Route path="/carbon-calculator" element={<AppLayout><CarbonCalculatorPage /></AppLayout>} />
          <Route path="/compare" element={<AppLayout><ComparePage /></AppLayout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
