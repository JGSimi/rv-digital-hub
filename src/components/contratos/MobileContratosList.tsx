import { Contrato } from "@/types";
import { MobileCard } from "@/components/ui/mobile-card";
import { Button } from "@/components/ui/button";
import { Plus, Calendar, DollarSign, Edit, Trash2, User } from "lucide-react";
import { formatCurrency, formatDate } from "@/utils/formatters";

interface MobileContratosListProps {
  contratos: Contrato[];
  onContratoSelect: (contrato: Contrato) => void;
  onNovoContrato: () => void;
  onEditContrato?: (contrato: Contrato) => void;
  onDeleteContrato?: (contrato: Contrato) => void;
}

export function MobileContratosList({
  contratos,
  onContratoSelect,
  onNovoContrato,
  onEditContrato,
  onDeleteContrato,
}: MobileContratosListProps) {
  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'ativo':
        return 'bg-success/10 text-success';
      case 'pendente':
        return 'bg-warning/10 text-warning';
      case 'cancelado':
        return 'bg-destructive/10 text-destructive';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Contratos</h1>
          <p className="text-sm text-muted-foreground">
            {contratos.length} contrato{contratos.length !== 1 ? 's' : ''} cadastrado{contratos.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Button onClick={onNovoContrato} size="icon" className="h-12 w-12">
          <Plus className="h-5 w-5" />
        </Button>
      </div>

      {/* Lista de contratos */}
      <div className="space-y-3">
        {contratos.map((contrato) => {
          const actions = [
            ...(onEditContrato ? [{
              label: "Editar",
              onClick: () => onEditContrato(contrato),
              icon: Edit,
            }] : []),
            ...(onDeleteContrato ? [{
              label: "Excluir",
              onClick: () => onDeleteContrato(contrato),
              variant: "destructive" as const,
              icon: Trash2,
            }] : []),
          ];

          const clienteNome = typeof contrato.cliente === 'object' && 'nome' in contrato.cliente 
            ? contrato.cliente.nome 
            : `Cliente #${typeof contrato.cliente === 'object' ? contrato.cliente.id : contrato.cliente}`;

          return (
            <MobileCard
              key={contrato.id}
              title={`Contrato #${contrato.id}`}
              subtitle={clienteNome}
              actions={actions}
              className="cursor-pointer"
              onClick={() => onContratoSelect(contrato)}
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  {formatDate(contrato.dataInicio)} {contrato.dataFim && `- ${formatDate(contrato.dataFim)}`}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <DollarSign className="h-4 w-4" />
                  {formatCurrency(contrato.valorTotal || 0)}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {contrato.itens?.length || 0} item{(contrato.itens?.length || 0) !== 1 ? 's' : ''}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(contrato.status || 'ativo')}`}>
                    {contrato.status || 'Ativo'}
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