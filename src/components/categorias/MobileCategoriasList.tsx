import { Categoria } from "@/types";
import { MobileCard } from "@/components/ui/mobile-card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Star } from "lucide-react";

interface MobileCategoriasListProps {
  categorias: Categoria[];
  onCategoriaSelect: (categoria: Categoria) => void;
  onNovaCategoria: () => void;
  onEditCategoria?: (categoria: Categoria) => void;
  onDeleteCategoria?: (categoria: Categoria) => void;
}

export function MobileCategoriasList({
  categorias,
  onCategoriaSelect,
  onNovaCategoria,
  onEditCategoria,
  onDeleteCategoria,
}: MobileCategoriasListProps) {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Categorias</h1>
          <p className="text-sm text-muted-foreground">
            {categorias.length} categoria{categorias.length !== 1 ? 's' : ''} cadastrada{categorias.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Button onClick={onNovaCategoria} size="icon" className="h-12 w-12">
          <Plus className="h-5 w-5" />
        </Button>
      </div>

      {/* Lista de categorias */}
      <div className="space-y-3">
        {categorias.map((categoria) => {
          const actions = [
            ...(onEditCategoria ? [{
              label: "Editar",
              onClick: () => onEditCategoria(categoria),
              icon: Edit,
            }] : []),
            ...(onDeleteCategoria ? [{
              label: "Excluir",
              onClick: () => onDeleteCategoria(categoria),
              variant: "destructive" as const,
              icon: Trash2,
            }] : []),
          ];

          return (
            <MobileCard
              key={categoria.id}
              title={categoria.nome}
              subtitle={categoria.descricao}
              actions={actions}
              className="cursor-pointer"
              onClick={() => onCategoriaSelect(categoria)}
            >
              <div className="space-y-2">
                {categoria.beneficios && (
                  <div className="text-sm text-muted-foreground">
                    <div className="flex items-start gap-2">
                      <Star className="h-4 w-4 mt-0.5 text-warning shrink-0" />
                      <span>{categoria.beneficios}</span>
                    </div>
                  </div>
                )}
                <div className="flex justify-end">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    categoria.ativo 
                      ? 'bg-success/10 text-success' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {categoria.ativo ? 'Ativo' : 'Inativo'}
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