
import { ReactNode, useEffect, useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const isMobile = useIsMobile();
  
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar isMobile={isMobile} />
      
      <div className={`flex flex-col flex-1 transition-all duration-300 ${isMobile ? "ml-0" : "ml-16 md:ml-64"}`}>
        <Navbar 
          title={title} 
          showBackButton={showBackButton}
          onBackClick={onBackClick}
        />
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
