import {
  ChevronLeft,
  ChevronsLeft,
  Github,
  Menu,
  Moon,
  Sun,
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEffect, useState } from "react";

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
  const { setTheme } = useTheme();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="h-screen flex flex-col">
      <header className="bg-background border-b border-border h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          {showBackButton ? (
            <Button variant="ghost" size="sm" onClick={onBackClick}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Voltar
            </Button>
          ) : (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="mr-2 h-4 w-4" />
                  Menu
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:w-64">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                  <SheetDescription>
                    Navegue pelas opções do sistema.
                  </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                  <Link to="/" className="flex items-center space-x-2">
                    <ChevronsLeft className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          )}
          <h1 className="text-lg font-semibold">{title}</h1>
        </div>

        <div className="flex items-center space-x-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.open("https://github.com/luizov")}
                >
                  <Github className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>GitHub</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://github.com/luizov.png" alt="Luiz Oliveira" />
                  <AvatarFallback>LO</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" forceMount>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link to="/novo-projeto">Novo Projeto</Link>
                <DropdownMenuShortcut>⌘+N</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/chatlog">Chat Log</Link>
                <DropdownMenuShortcut>⌘+C</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <TooltipProvider>
                  <div className="flex items-center justify-between space-x-2">
                    <span>Tema</span>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Switch
                          checked={isMounted}
                          onCheckedChange={(checked) =>
                            checked ? setTheme("dark") : setTheme("light")
                          }
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        Mudar tema da aplicação
                      </TooltipContent>
                    </Tooltip>
                    {isMounted ? (
                      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    ) : null}
                    {isMounted ? (
                      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    ) : null}
                  </div>
                </TooltipProvider>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
    </div>
  );
};

export default AppLayout;
