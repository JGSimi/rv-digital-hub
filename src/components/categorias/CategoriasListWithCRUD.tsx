import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Categoria } from "@/types";
import { Search, Plus, Edit, Trash2, Tag } from "lucide-react";
import { FormModal } from "@/components/common/FormModal";
import { CategoriaForm } from "./CategoriaForm";
import { useFormModal } from "@/hooks/useFormModal";
import { useCRUD } from "@/hooks/useCRUD";
import { CategoriaFormData } from "@/schemas";
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

interface CategoriasListProps {
  categorias: Categoria[];
  onCategoriaSelect: (categoria: Categoria) => void;
  onNovaCategoria: () => void;
}

export function CategoriasListWithCRUD({ categorias, onCategoriaSelect, onNovaCategoria }: CategoriasListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoriaToDelete, setCategoriaToDelete] = useState<Categoria | null>(null);
  
  const { items, create, update, remove } = useCRUD(categorias, "Categoria");
  
  const {
    isOpen,
    editingItem,
    isLoading,
    openModal,
    openEditModal,
    closeModal,
    handleSubmit,
    isEditing,
  } = useFormModal<CategoriaFormData>({
    onSubmit: create,
    onEdit: (data) => update(data.id!, data),
  });

  const filteredCategorias = items.filter(categoria =>
    categoria.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    categoria.descricao.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (categoria: Categoria) => {
    setCategoriaToDelete(categoria);
  };

  const confirmDelete = () => {
    if (categoriaToDelete?.id) {
      remove(categoriaToDelete.id);
      setCategoriaToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Categorias</h2>
          <p className="text-muted-foreground">
            Gerencie as categorias de clientes
          </p>
        </div>
        <Button onClick={openModal} className="shadow-elegant">
          <Tag className="h-4 w-4 mr-2" />
          Nova Categoria
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Buscar por nome ou descrição..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {filteredCategorias.map((categoria) => (
          <Card 
            key={categoria.id} 
            className="hover:shadow-elegant transition-all duration-300 cursor-pointer group"
            onClick={() => onCategoriaSelect(categoria)}
          >
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {categoria.nome}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {categoria.descricao}
                  </p>
                </div>
                <Badge variant={categoria.ativo ? "default" : "secondary"}>
                  {categoria.ativo ? "Ativa" : "Inativa"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              {categoria.beneficios && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium mb-2">Benefícios:</h4>
                  <p className="text-sm text-muted-foreground">
                    {categoria.beneficios}
                  </p>
                </div>
              )}
              <div className="flex justify-end gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    openEditModal(categoria);
                  }}
                >
                  <Edit className="h-3 w-3" />
                </Button>
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(categoria);
                  }}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCategorias.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground">
              {searchTerm ? "Nenhuma categoria encontrada com os critérios de busca." : "Nenhuma categoria cadastrada ainda."}
            </p>
            <Button 
              variant="outline" 
              onClick={openModal}
              className="mt-4"
            >
              <Plus className="h-4 w-4 mr-2" />
              Cadastrar Primeira Categoria
            </Button>
          </CardContent>
        </Card>
      )}

      <FormModal
        isOpen={isOpen}
        onClose={closeModal}
        title={isEditing ? "Editar Categoria" : "Nova Categoria"}
      >
        <CategoriaForm
          onSubmit={handleSubmit}
          initialData={editingItem}
          isLoading={isLoading}
        />
      </FormModal>

      <AlertDialog open={!!categoriaToDelete} onOpenChange={() => setCategoriaToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir a categoria "{categoriaToDelete?.nome}"?
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