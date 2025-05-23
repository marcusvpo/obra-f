
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import Home from "./pages/Home";
import Projetos from "./pages/Index";
import ProjectDetails from "./pages/ProjectDetails";
import NewProject from "./pages/NewProject";
import Equipe from "./pages/Equipe";
import NotFound from "./pages/NotFound";
import ChatLog from "./pages/ChatLog";
import Suporte from "./pages/Suporte";
import Configuracoes from "./pages/Configuracoes";
import PitchDeck from "./pages/PitchDeck";

// Create a new QueryClient instance
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projetos" element={<Projetos />} />
              <Route path="/projeto/:id" element={<ProjectDetails />} />
              <Route path="/novo-projeto" element={<NewProject />} />
              <Route path="/equipe" element={<Equipe />} />
              <Route path="/chatlog" element={<ChatLog />} />
              <Route path="/suporte" element={<Suporte />} />
              <Route path="/configuracoes" element={<Configuracoes />} />
              <Route path="/pitch-deck" element={<PitchDeck />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
