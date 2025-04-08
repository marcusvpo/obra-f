
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import Home from "./pages/Home";
import PrjetosEmAndamento from "./pages/Index";
import ProjectDetails from "./pages/ProjectDetails";
import ChatLog from "./pages/ChatLog";
import NewProject from "./pages/NewProject";
import Relatorios from "./pages/Relatorios";
import Equipe from "./pages/Equipe";
import NotFound from "./pages/NotFound";
import NotificationsPanel from "./components/notifications/NotificationsPanel";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider defaultTheme="dark">
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <NotificationsPanel />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projetos" element={<PrjetosEmAndamento />} />
            <Route path="/projeto/:id" element={<ProjectDetails />} />
            <Route path="/chatlog" element={<ChatLog />} />
            <Route path="/novo-projeto" element={<NewProject />} />
            <Route path="/relatorios" element={<Relatorios />} />
            <Route path="/equipe" element={<Equipe />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
