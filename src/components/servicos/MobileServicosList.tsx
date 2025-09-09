import { Servico } from "@/types";
import { MobileCard } from "@/components/ui/mobile-card";
import { Button } from "@/components/ui/button";
import { Plus, DollarSign, Edit, Trash2, Tag } from "lucide-react";
import { formatCurrency } from "@/utils/formatters";

interface MobileServicosListProps {
  servicos: Servico[];
  onServicoSelect: (servico: Servico) => void;
  onNovoServico: () => void;
  onEditServico?: (servico: Servico) => void;
  onDeleteServico?: (servico: Servico) => void;
}

export function MobileServicosList({
  servicos,
  onServicoSelect,
  onNovoServico,
  onEditServico,
  onDeleteServico,
}: MobileServicosListProps) {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Serviços</h1>
          <p className="text-sm text-muted-foreground">
            {servicos.length} serviço{servicos.length !== 1 ? 's' : ''} cadastrado{servicos.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Button onClick={onNovoServico} size="icon" className="h-12 w-12">
          <Plus className="h-5 w-5" />
        </Button>
      </div>

      {/* Lista de serviços */}
      <div className="space-y-3">
        {servicos.map((servico) => {
          const actions = [
            ...(onEditServico ? [{
              label: "Editar",
              onClick: () => onEditServico(servico),
              icon: Edit,
            }] : []),
            ...(onDeleteServico ? [{
              label: "Excluir",
              onClick: () => onDeleteServico(servico),
              variant: "destructive" as const,
              icon: Trash2,
            }] : []),
          ];

          return (
            <MobileCard
              key={servico.id}
              title={servico.nome}
              subtitle={servico.descricao}
              actions={actions}
              className="cursor-pointer"
              onClick={() => onServicoSelect(servico)}
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                  <DollarSign className="h-4 w-4" />
                  {formatCurrency(servico.valor)}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Tag className="h-3 w-3" />
                    {servico.categoria}
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    servico.ativo 
                      ? 'bg-success/10 text-success' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {servico.ativo ? 'Ativo' : 'Inativo'}
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