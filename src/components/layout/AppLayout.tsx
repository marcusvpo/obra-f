
import {
  ChevronLeft,
  ChevronsLeft,
  Menu,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "@/components/theme-provider";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";

interface AppLayoutProps {
  children: React.ReactNode;
  title: string;
  showBackButton?: boolean;
  onBackClick?: () => void;
}

const AppLayout = ({
  children,
  title,
  showBackButton = false,
  onBackClick,
}: AppLayoutProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="h-screen flex">
      {/* Sidebar fixa para todas as páginas */}
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <header className="bg-background border-b border-border h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            {showBackButton ? (
              <Button variant="ghost" size="sm" onClick={onBackClick}>
                <ChevronLeft className="mr-2 h-4 w-4" />
                Voltar
              </Button>
            ) : (
              <h1 className="text-lg font-semibold">{title}</h1>
            )}
          </div>
          
          {/* Área reservada para botões específicos de cada página */}
          <div className="flex items-center space-x-4" id="page-specific-buttons">
            {/* Os botões específicos serão inseridos aqui quando necessário */}
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default AppLayout;
