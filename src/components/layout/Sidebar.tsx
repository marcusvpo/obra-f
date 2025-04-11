
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, MessageSquare, LogOut, Construction, FileText, Users, Plus, User, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";

export default function Sidebar() {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState<string>("/");

  useEffect(() => {
    setActiveItem(location.pathname);
  }, [location.pathname]);

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
    },
    {
      path: "/chatlog",
      label: "ChatLog",
      icon: <MessageCircle size={20} />
    }
  ];

  const menuItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({ 
      opacity: 1, 
      x: 0, 
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <motion.div 
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="h-screen w-64 fixed left-0 top-0 bg-[#333333] text-white z-40 flex flex-col border-r-4 border-[#FF6200] rounded-r-md overflow-hidden"
    >
      {/* Logo area */}
      <div className="px-5 py-6 flex items-center">
        <motion.h1 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-xl font-bold"
        >
          ObraFácil
        </motion.h1>
      </div>

      {/* Menu items */}
      <nav className="flex-1 px-2">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <motion.li 
              key={item.path}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={menuItemVariants}
            >
              <Link
                to={item.path}
                className={`flex items-center p-3 rounded-md transition-all duration-300 
                  ${location.pathname === item.path
                      ? "bg-[#FF6200] text-white shadow-md border border-[#FF7D33]"
                      : "text-gray-300 hover:bg-secondary/50 hover:translate-x-1"
                  }`
                }
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.label}</span>
                {item.path === "/chatlog" && (
                  <span className="ml-auto bg-[#FF6200] text-white text-xs font-medium rounded-full px-1.5 py-0.5 animate-pulse">
                    Novo
                  </span>
                )}
              </Link>
            </motion.li>
          ))}
        </ul>
      </nav>

      {/* Profile section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="p-4 bg-[#2A2A2A] mt-2"
      >
        <div className="flex items-center space-x-3 mb-3">
          <Avatar className="border-2 border-primary/20">
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
          className="w-full flex items-center p-3 text-gray-300 hover:bg-secondary/50 hover:text-white rounded-md transition-all duration-300"
        >
          <LogOut size={20} className="mr-3" />
          <span>Sair</span>
        </Button>
      </motion.div>
    </motion.div>
  );
}
