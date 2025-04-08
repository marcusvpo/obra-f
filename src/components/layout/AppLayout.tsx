
import {
  ChevronLeft,
  Bell
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import NotificationsPanel from "@/components/notifications/NotificationsPanel";
import { useNotifications } from "@/hooks/useNotifications";

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
  const { openNotificationsPanel, getUnreadCount } = useNotifications();
  const unreadCount = getUnreadCount();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="h-screen flex">
      {/* Sidebar fixa para todas as páginas */}
      <Sidebar />
      <NotificationsPanel />
      
      <div className="flex-1 flex flex-col ml-64">
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
          
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={openNotificationsPanel}
              className="relative"
            >
              <Bell size={20} className="text-[#FF6200]" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#FF6200] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </Button>
            
            {/* Área reservada para botões específicos de cada página */}
            <div className="flex items-center space-x-4" id="page-specific-buttons">
              {/* Os botões específicos serão inseridos aqui quando necessário */}
            </div>
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default AppLayout;
