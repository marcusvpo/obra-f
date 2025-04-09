
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, MessageSquare, LogOut, Construction, FileText, Users, Bell, Plus, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNotifications } from "@/hooks/useNotifications";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

export default function Sidebar() {
  const location = useLocation();
  const { openNotificationsPanel } = useNotifications();

  const handleLogout = () => {
    toast.success("Logout realizado com sucesso");
  };

  const menuItems = [
    { 
      path: "/", 
      label: "Home", 
      icon: <Home size={20} /> 
    },
    { 
      path: "/projetos", 
      label: "Projetos", 
      icon: <Construction size={20} /> 
    },
    {
      path: "/novo-projeto",
      label: "Novo Projeto",
      icon: <Plus size={20} />
    },
    {
      path: "/equipe",
      label: "Equipe",
      icon: <Users size={20} />
    }
  ];

  return (
    <div className="h-screen w-64 fixed left-0 top-0 bg-[#333333] text-white z-40 flex flex-col border-r border-[#FF6200] shadow-[0_0_15px_rgba(255,98,0,0.3)] rounded-r-md overflow-hidden">
      {/* Logo area */}
      <div className="px-5 py-6 flex items-center">
        <h1 className="text-xl font-bold">ObraFácil</h1>
      </div>

      {/* Menu items */}
      <nav className="flex-1 px-2">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center p-3 rounded-md transition-colors 
                  ${location.pathname === item.path
                      ? "bg-[#FF6200] text-white shadow-lg border border-[#FF7D33] drop-shadow-[0_0_8px_rgba(255,98,0,0.5)]"
                      : "text-gray-300 hover:bg-secondary/50"
                  }`
                }
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
          <li>
            <button
              onClick={openNotificationsPanel}
              className="flex items-center w-full p-3 rounded-md transition-colors text-gray-300 hover:bg-secondary/50"
            >
              <span className="mr-3"><Bell size={20} /></span>
              <span>Notificações</span>
            </button>
          </li>
        </ul>
      </nav>

      {/* Profile section */}
      <div className="p-4 bg-[#2A2A2A] mt-2">
        <div className="flex items-center space-x-3 mb-3">
          <Avatar>
            <AvatarImage src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=150" />
            <AvatarFallback>FD</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-sm">Fulano</p>
            <p className="text-xs text-gray-400">fulano@example.com</p>
          </div>
        </div>
        <Separator className="my-2 bg-gray-600" />
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="w-full flex items-center p-3 text-gray-300 hover:bg-secondary/50 rounded-md"
        >
          <LogOut size={20} className="mr-3" />
          <span>Sair</span>
        </Button>
      </div>
    </div>
  );
}
