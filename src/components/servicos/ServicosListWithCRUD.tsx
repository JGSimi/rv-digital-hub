import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Servico } from "@/types";
import { Search, Plus, Edit, Trash2, Briefcase } from "lucide-react";
import { FormModal } from "@/components/common/FormModal";
import { ServicoForm } from "./ServicoForm";
import { useFormModal } from "@/hooks/useFormModal";
import { useCRUD } from "@/hooks/useCRUD";
import { ServicoFormData } from "@/schemas";
import { formatCurrency } from "@/utils/formatters";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface ServicosListProps {
  servicos: Servico[];
  onServicoSelect: (servico: Servico) => void;
  onNovoServico: () => void;
}

export function ServicosListWithCRUD({ servicos, onServicoSelect, onNovoServico }: ServicosListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [servicoToDelete, setServicoToDelete] = useState<Servico | null>(null);
  
  const { items, create, update, remove } = useCRUD(servicos, "Serviço");
  
  const {
    isOpen,
    editingItem,
    isLoading,
    openModal,
    openEditModal,
    closeModal,
    handleSubmit,
    isEditing,
  } = useFormModal<ServicoFormData>({
    onSubmit: create,
    onEdit: (data) => update(data.id!, data),
  });

  const filteredServicos = items.filter(servico =>
    servico.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    servico.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
    servico.categoria.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (servico: Servico) => {
    setServicoToDelete(servico);
  };

  const confirmDelete = () => {
    if (servicoToDelete?.id) {
      remove(servicoToDelete.id);
      setServicoToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Serviços</h2>
          <p className="text-muted-foreground">
            Gerencie todos os serviços oferecidos
          </p>
        </div>
        <Button onClick={openModal} className="shadow-elegant">
          <Briefcase className="h-4 w-4 mr-2" />
          Novo Serviço
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Buscar por nome, descrição ou categoria..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredServicos.map((servico) => (
          <Card 
            key={servico.id} 
            className="hover:shadow-elegant transition-all duration-300 cursor-pointer group"
            onClick={() => onServicoSelect(servico)}
          >
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {servico.nome}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {servico.descricao}
                  </p>
                </div>
                <Badge variant={servico.ativo ? "default" : "secondary"}>
                  {servico.ativo ? "Ativo" : "Inativo"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Valor:</span>
                  <span className="text-lg font-semibold text-primary">
                    {formatCurrency(servico.valor)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Categoria:</span>
                  <Badge variant="outline">{servico.categoria}</Badge>
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      openEditModal(servico);
                    }}
                  >
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(servico);
                    }}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredServicos.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground">
              {searchTerm ? "Nenhum serviço encontrado com os critérios de busca." : "Nenhum serviço cadastrado ainda."}
            </p>
            <Button 
              variant="outline" 
              onClick={openModal}
              className="mt-4"
            >
              <Plus className="h-4 w-4 mr-2" />
              Cadastrar Primeiro Serviço
            </Button>
          </CardContent>
        </Card>
      )}

      <FormModal
        isOpen={isOpen}
        onClose={closeModal}
        title={isEditing ? "Editar Serviço" : "Novo Serviço"}
      >
        <ServicoForm
          onSubmit={handleSubmit}
          initialData={editingItem}
          isLoading={isLoading}
        />
      </FormModal>

      <AlertDialog open={!!servicoToDelete} onOpenChange={() => setServicoToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir o serviço "{servicoToDelete?.nome}"?
              Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}