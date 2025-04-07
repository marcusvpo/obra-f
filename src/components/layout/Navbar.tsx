
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface NavbarProps {
  title?: string;
  showBackButton?: boolean;
  onBackClick?: () => void;
}

export default function Navbar({ title, showBackButton = false, onBackClick }: NavbarProps) {
  const handleLogout = () => {
    toast.success("Logout realizado com sucesso");
  };

  return (
    <nav className="bg-background border-b border-b-border px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-4">
        {showBackButton && (
          <Button 
            variant="ghost" 
            onClick={onBackClick}
            className="hover:bg-secondary text-foreground"
          >
            ← Voltar
          </Button>
        )}
        <h1 className="text-xl font-semibold">
          {title || "ObraFácil"}
        </h1>
      </div>
      <Button 
        variant="ghost" 
        size="sm" 
        className="flex items-center gap-2 hover:bg-secondary text-foreground"
        onClick={handleLogout}
      >
        <LogOut size={16} />
        <span>Sair</span>
      </Button>
    </nav>
  );
}
