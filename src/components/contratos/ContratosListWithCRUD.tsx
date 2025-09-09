import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Contrato } from "@/types";
import { Search, Plus, Edit, Trash2, FileText, Calendar, User } from "lucide-react";
import { FormModal } from "@/components/common/FormModal";
import { ContratoForm } from "./ContratoForm";
import { useFormModal } from "@/hooks/useFormModal";
import { useCRUD } from "@/hooks/useCRUD";
import { ContratoFormData } from "@/schemas";
import { formatCurrency, formatDate } from "@/utils/formatters";
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

interface ContratosListProps {
  contratos: Contrato[];
  onContratoSelect: (contrato: Contrato) => void;
  onNovoContrato: () => void;
}

const getStatusVariant = (status?: string) => {
  switch (status) {
    case "ativo":
      return "default";
    case "pendente":
      return "secondary";
    case "concluido":
      return "outline";
    case "cancelado":
      return "destructive";
    default:
      return "secondary";
  }
};

const getStatusColor = (status?: string) => {
  switch (status) {
    case "ativo":
      return "text-green-600";
    case "pendente":
      return "text-yellow-600";
    case "concluido":
      return "text-blue-600";
    case "cancelado":
      return "text-red-600";
    default:
      return "text-gray-600";
  }
};

export function ContratosListWithCRUD({ contratos, onContratoSelect, onNovoContrato }: ContratosListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [contratoToDelete, setContratoToDelete] = useState<Contrato | null>(null);
  
  const { items, create, update, remove } = useCRUD(contratos, "Contrato");
  
  const {
    isOpen,
    editingItem,
    isLoading,
    openModal,
    openEditModal,
    closeModal,
    handleSubmit,
    isEditing,
  } = useFormModal<ContratoFormData>({
    onSubmit: create,
    onEdit: (data) => update(data.id!, data),
  });

  const filteredContratos = items.filter(contrato => {
    const clienteNome = typeof contrato.cliente === 'object' && 'nome' in contrato.cliente 
      ? contrato.cliente.nome 
      : "";
    
    return clienteNome.toLowerCase().includes(searchTerm.toLowerCase()) ||
           contrato.status?.toLowerCase().includes(searchTerm.toLowerCase()) ||
           contrato.id?.toString().includes(searchTerm);
  });

  const handleDelete = (contrato: Contrato) => {
    setContratoToDelete(contrato);
  };

  const confirmDelete = () => {
    if (contratoToDelete?.id) {
      remove(contratoToDelete.id);
      setContratoToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Contratos</h2>
          <p className="text-muted-foreground">
            Gerencie todos os contratos de serviços
          </p>
        </div>
        <Button onClick={openModal} className="shadow-elegant">
          <FileText className="h-4 w-4 mr-2" />
          Novo Contrato
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Buscar por cliente, status ou ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid gap-4">
        {filteredContratos.map((contrato) => {
          const clienteNome = typeof contrato.cliente === 'object' && 'nome' in contrato.cliente 
            ? contrato.cliente.nome 
            : "Cliente não informado";
            
          return (
            <Card 
              key={contrato.id} 
              className="hover:shadow-elegant transition-all duration-300 cursor-pointer group"
              onClick={() => onContratoSelect(contrato)}
            >
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      Contrato #{contrato.id}
                    </CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {clienteNome}
                      </span>
                    </div>
                  </div>
                  <Badge variant={getStatusVariant(contrato.status)}>
                    {contrato.status || "Pendente"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Início</p>
                        <p className="text-sm font-medium">
                          {formatDate(contrato.dataInicio)}
                        </p>
                      </div>
                    </div>
                    
                    {contrato.dataFim && (
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">Fim</p>
                          <p className="text-sm font-medium">
                            {formatDate(contrato.dataFim)}
                          </p>
                        </div>
                      </div>
                    )}
                    
                    <div>
                      <p className="text-xs text-muted-foreground">Valor Total</p>
                      <p className="text-lg font-semibold text-primary">
                        {formatCurrency(contrato.valorTotal || 0)}
                      </p>
                    </div>
                  </div>

                  {contrato.observacoes && (
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Observações:</p>
                      <p className="text-sm text-muted-foreground">
                        {contrato.observacoes}
                      </p>
                    </div>
                  )}

                  <div className="flex justify-between items-center pt-2">
                    <div className="text-xs text-muted-foreground">
                      {contrato.itens?.length || 0} {contrato.itens?.length === 1 ? 'item' : 'itens'}
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          openEditModal(contrato);
                        }}
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(contrato);
                        }}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredContratos.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground">
              {searchTerm ? "Nenhum contrato encontrado com os critérios de busca." : "Nenhum contrato cadastrado ainda."}
            </p>
            <Button 
              variant="outline" 
              onClick={openModal}
              className="mt-4"
            >
              <Plus className="h-4 w-4 mr-2" />
              Cadastrar Primeiro Contrato
            </Button>
          </CardContent>
        </Card>
      )}

      <FormModal
        isOpen={isOpen}
        onClose={closeModal}
        title={isEditing ? "Editar Contrato" : "Novo Contrato"}
      >
        <ContratoForm
          onSubmit={handleSubmit}
          initialData={editingItem}
          isLoading={isLoading}
        />
      </FormModal>

      <AlertDialog open={!!contratoToDelete} onOpenChange={() => setContratoToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir o contrato #{contratoToDelete?.id}?
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