import { useState } from "react";
import { Cliente } from "@/types";
import { MobileCard } from "@/components/ui/mobile-card";
import { Button } from "@/components/ui/button";
import { Plus, Phone, Mail, Edit, Trash2 } from "lucide-react";
import { formatCPF, formatPhone } from "@/utils/formatters";
import { mockClientes } from "@/data/mockData";
import { useMobile } from "@/hooks/use-mobile";

export function ClientesListWithCRUD() {
  const [clientes] = useState<Cliente[]>(mockClientes);
  const isMobile = useMobile();

  if (isMobile) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Clientes</h1>
            <p className="text-sm text-muted-foreground">
              {clientes.length} clientes cadastrados
            </p>
          </div>
          <Button size="icon" className="h-12 w-12">
            <Plus className="h-5 w-5" />
          </Button>
        </div>

        <div className="space-y-3">
          {clientes.map((cliente) => (
            <MobileCard
              key={cliente.id}
              title={cliente.nome}
              subtitle={`CPF: ${formatCPF(cliente.cpf)}`}
              actions={[
                {
                  label: "Editar",
                  onClick: () => {},
                  icon: Edit,
                },
                {
                  label: "Excluir",
                  onClick: () => {},
                  variant: "destructive" as const,
                  icon: Trash2,
                },
              ]}
            >
              <div className="space-y-2">
                {cliente.email && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    {cliente.email}
                  </div>
                )}
                {cliente.telefone && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    {formatPhone(cliente.telefone)}
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    Categoria: {cliente.categoria?.nome || 'N/A'}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    cliente.ativo 
                      ? 'bg-success/10 text-success' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {cliente.ativo ? 'Ativo' : 'Inativo'}
                  </span>
                </div>
              </div>
            </MobileCard>
          ))}
        </div>
      </div>
    );
  }

  // Desktop fallback
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Clientes</h1>
          <p className="text-muted-foreground">Gerencie os clientes do sistema</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Novo Cliente
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clientes.map((cliente) => (
          <MobileCard
            key={cliente.id}
            title={cliente.nome}
            subtitle={`CPF: ${formatCPF(cliente.cpf)}`}
          >
            <div className="space-y-2">
              {cliente.email && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  {cliente.email}
                </div>
              )}
            </div>
          </MobileCard>
        ))}
      </div>
    </div>
  );
}