import { Users, FileText, Settings, BarChart3, Package, Tag, LogOut, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

interface SidebarProps {
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

export function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const { profile, signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="w-64 bg-card border-r shadow-card h-screen sticky top-0 flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          RV Digital
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Sistema de Gestão
        </p>
      </div>
      
      <nav className="px-4 space-y-2 flex-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <Button
              key={item.id}
              variant={isActive ? "default" : "ghost"}
              className={cn(
                "w-full justify-start gap-3 h-11",
                isActive && "bg-primary shadow-elegant"
              )}
              onClick={() => onSectionChange(item.id)}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </Button>
          );
        })}
      </nav>

      <div className="p-4 border-t">
        <div className="flex items-center gap-3 mb-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary text-primary-foreground text-sm">
              {profile?.nome ? getInitials(profile.nome) : 'U'}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">
              {profile?.nome || 'Usuário'}
            </p>
            <p className="text-xs text-muted-foreground">
              {profile?.role === 'admin' ? 'Administrador' : 'Usuário'}
            </p>
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          Sair
        </Button>
      </div>
    </div>
  );
}