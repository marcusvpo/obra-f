
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, MessageSquare, LogOut, Construction, FileText, Users, Bell, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNotifications } from "@/hooks/useNotifications";

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
      path: "/chatlog", 
      label: "ChatLog", 
      icon: <MessageSquare size={20} /> 
    },
    {
      path: "/novo-projeto",
      label: "Novo Projeto",
      icon: <Plus size={20} />
    },
    {
      path: "/relatorios",
      label: "Relatórios",
      icon: <FileText size={20} />
    },
    {
      path: "/equipe",
      label: "Equipe",
      icon: <Users size={20} />
    }
  ];

  return (
    <div className="h-screen w-64 fixed left-0 top-0 bg-[#333333] text-white z-40 flex flex-col">
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
                      ? "bg-[#FF6200] text-white shadow-[0_0_10px_rgba(255,98,0,0.5)] border border-[#FF7D33]"
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

      {/* Logout button */}
      <div className="p-4">
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
