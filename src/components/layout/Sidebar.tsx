
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, MessageSquare, LogOut, Menu, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface SidebarProps {
  isMobile?: boolean;
}

export default function Sidebar({ isMobile = false }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const handleLogout = () => {
    toast.success("Logout realizado com sucesso");
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    { 
      path: "/", 
      label: "Home", 
      icon: <Home size={20} /> 
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
    }
  ];

  return (
    <>
      {/* Hamburger button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50"
        onClick={toggleSidebar}
        aria-label="Toggle menu"
      >
        <Menu size={24} />
      </Button>

      {/* Sidebar que abre à esquerda */}
      <div
        className={`fixed top-0 left-0 h-screen bg-[#333333] text-white z-40 transition-all duration-300 ease-in-out ${
          isOpen ? "w-64 translate-x-0" : "w-16 -translate-x-14"
        } flex flex-col`}
      >
        {/* Logo area */}
        <div className={`px-5 py-6 flex items-center ${isOpen ? "" : "justify-center"}`}>
          <h1 className={`text-xl font-bold ${!isOpen && "hidden"}`}>ObraFácil</h1>
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
                        ? "bg-primary text-white"
                        : "text-gray-300 hover:bg-secondary/50"
                    } ${!isOpen && "justify-center"}`
                  }
                >
                  <span className="mr-3">{item.icon}</span>
                  {isOpen && <span>{item.label}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout button */}
        <div className="p-4">
          <Button
            onClick={handleLogout}
            variant="ghost"
            className={`w-full flex items-center p-3 text-gray-300 hover:bg-secondary/50 rounded-md ${
              !isOpen && "justify-center"
            }`}
          >
            <LogOut size={20} className="mr-3" />
            {isOpen && <span>Sair</span>}
          </Button>
        </div>
      </div>
    </>
  );
}
