import { Users, FileText, Settings, BarChart3, Package, Tag, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: BarChart3 },
  { id: "clientes", label: "Clientes", icon: Users },
  { id: "contratos", label: "Contratos", icon: FileText },
  { id: "servicos", label: "Serviços", icon: Package },
  { id: "categorias", label: "Categorias", icon: Tag },
  { id: "configuracoes", label: "Configurações", icon: Settings },
];

export function MobileSidebar({ 
  isOpen, 
  onClose, 
  activeSection, 
  onSectionChange 
}: MobileSidebarProps) {
  const handleSectionChange = (section: string) => {
    onSectionChange(section);
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="w-80 p-0">
        <SheetHeader className="p-6 pb-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                RV Digital
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Sistema de Gestão
              </p>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </SheetHeader>
        
        <nav className="px-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <Button
                key={item.id}
                variant={isActive ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3 h-12",
                  isActive && "bg-primary shadow-elegant"
                )}
                onClick={() => handleSectionChange(item.id)}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Button>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
}