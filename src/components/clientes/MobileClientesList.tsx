import { Cliente } from "@/types";
import { MobileCard } from "@/components/ui/mobile-card";
import { Button } from "@/components/ui/button";
import { Plus, Phone, Mail, Edit, Trash2 } from "lucide-react";
import { formatCPF, formatPhone } from "@/utils/formatters";

interface MobileClientesListProps {
  clientes: Cliente[];
  onClienteSelect: (cliente: Cliente) => void;
  onNovoCliente: () => void;
  onEditCliente?: (cliente: Cliente) => void;
  onDeleteCliente?: (cliente: Cliente) => void;
}

export function MobileClientesList({
  clientes,
  onClienteSelect,
  onNovoCliente,
  onEditCliente,
  onDeleteCliente,
}: MobileClientesListProps) {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Clientes</h1>
          <p className="text-sm text-muted-foreground">
            {clientes.length} cliente{clientes.length !== 1 ? 's' : ''} cadastrado{clientes.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Button onClick={onNovoCliente} size="icon" className="h-12 w-12">
          <Plus className="h-5 w-5" />
        </Button>
      </div>

      {/* Lista de clientes */}
      <div className="space-y-3">
        {clientes.map((cliente) => {
          const actions = [
            ...(onEditCliente ? [{
              label: "Editar",
              onClick: () => onEditCliente(cliente),
              icon: Edit,
            }] : []),
            ...(onDeleteCliente ? [{
              label: "Excluir",
              onClick: () => onDeleteCliente(cliente),
              variant: "destructive" as const,
              icon: Trash2,
            }] : []),
          ];

          return (
            <MobileCard
              key={cliente.id}
              title={cliente.nome}
              subtitle={`CPF: ${formatCPF(cliente.cpf)}`}
              actions={actions}
              className="cursor-pointer"
              onClick={() => onClienteSelect(cliente)}
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  {cliente.email}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  {formatPhone(cliente.telefone)}
                </div>
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
          );
        })}
      </div>
    </div>
  );
}