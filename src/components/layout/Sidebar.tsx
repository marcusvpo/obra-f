
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, LogOut, Construction, Users } from "lucide-react";
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
      path: "/equipe",
      label: "Equipe",
      icon: <Users size={20} />
    }
  ];

  return (
    <div className="h-screen w-64 fixed left-0 top-0 bg-[#333333] text-white z-40 flex flex-col border-r border-[#444444] shadow-lg">
      {/* Logo area */}
      <div className="px-5 py-6 flex items-center">
        <h1 className="text-xl font-bold">ObraFácil</h1>
      </div>

      {/* Menu items */}
      <nav className="flex-1 px-2">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center p-2.5 rounded-md transition-colors 
                  ${location.pathname === item.path
                      ? "bg-[#FF6200] text-white shadow-md border border-[#FF7D33] drop-shadow-[0_0_8px_rgba(255,98,0,0.5)]"
                      : "text-gray-300 hover:bg-secondary/50"
                  }`
                }
              >
                <span className="mr-2.5">{item.icon}</span>
                <span className="text-sm">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout button */}
      <div className="p-2 mb-4">
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="w-full flex items-center p-2.5 text-gray-300 hover:bg-secondary/50 rounded-md"
        >
          <LogOut size={20} className="mr-2.5" />
          <span className="text-sm">Sair</span>
        </Button>
      </div>
    </div>
  );
}
