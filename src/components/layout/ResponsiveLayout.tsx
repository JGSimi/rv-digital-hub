import { useState } from "react";
import { useMobile } from "@/hooks/use-mobile";
import { Sidebar } from "./Sidebar";
import { MobileHeader } from "./MobileHeader";
import { MobileSidebar } from "./MobileSidebar";
import { cn } from "@/lib/utils";

interface ResponsiveLayoutProps {
  children: React.ReactNode;
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function ResponsiveLayout({ 
  children, 
  activeSection, 
  onSectionChange 
}: ResponsiveLayoutProps) {
  const isMobile = useMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (isMobile) {
    return (
      <div className="min-h-screen bg-background">
        <MobileHeader 
          onMenuClick={() => setMobileMenuOpen(true)}
          currentSection={activeSection}
        />
        <MobileSidebar
          isOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
          activeSection={activeSection}
          onSectionChange={onSectionChange}
        />
        <main className="pt-14 px-4 pb-6">
          {children}
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar 
        activeSection={activeSection} 
        onSectionChange={onSectionChange} 
      />
      <main className="flex-1 p-6 overflow-auto">
        {children}
      </main>
    </div>
  );
}