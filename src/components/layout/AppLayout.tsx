
import { ReactNode } from "react";
import Navbar from "./Navbar";

interface AppLayoutProps {
  children: ReactNode;
  title?: string;
  showBackButton?: boolean;
  onBackClick?: () => void;
}

export default function AppLayout({ 
  children, 
  title,
  showBackButton = false,
  onBackClick
}: AppLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Navbar 
        title={title} 
        showBackButton={showBackButton}
        onBackClick={onBackClick}
      />
      <main className="flex-1 p-4 md:p-6 overflow-auto">
        {children}
      </main>
    </div>
  );
}
