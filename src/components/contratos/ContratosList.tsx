import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Contrato } from "@/types";
import { Search, Plus, FileText, Calendar, DollarSign } from "lucide-react";

interface ContratosListProps {
  contratos: Contrato[];
  onContratoSelect: (contrato: Contrato) => void;
  onNovoContrato: () => void;
}

const statusColors = {
  "ativo": "default",
  "pendente": "secondary",
  "concluido": "outline",
  "cancelado": "destructive",
} as const;

export function ContratosList({ contratos, onContratoSelect, onNovoContrato }: ContratosListProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredContratos = contratos.filter(contrato => {
    const cliente = typeof contrato.cliente === 'object' && 'nome' in contrato.cliente 
      ? contrato.cliente.nome 
      : '';
    return cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
           contrato.status?.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Contratos</h2>
          <p className="text-muted-foreground">
            Gerencie todos os contratos e acordos
          </p>
        </div>
        <Button onClick={onNovoContrato} className="shadow-elegant">
          <Plus className="h-4 w-4 mr-2" />
          Novo Contrato
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Buscar por cliente ou status..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid gap-4">
        {filteredContratos.map((contrato) => {
          const cliente = typeof contrato.cliente === 'object' && 'nome' in contrato.cliente 
            ? contrato.cliente 
            : null;

          return (
            <Card 
              key={contrato.id} 
              className="hover:shadow-elegant transition-all duration-300 cursor-pointer group"
              onClick={() => onContratoSelect(contrato)}
            >
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Contrato #{contrato.id}
                    </CardTitle>
                    {cliente && (
                      <p className="text-sm text-muted-foreground">
                        Cliente: {cliente.nome}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {contrato.status && (
                      <Badge variant={statusColors[contrato.status as keyof typeof statusColors] || "outline"}>
                        {contrato.status.charAt(0).toUpperCase() + contrato.status.slice(1)}
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-3 w-3 text-muted-foreground" />
                    <span className="text-muted-foreground">Início:</span>
                    <span>{new Date(contrato.dataInicio).toLocaleDateString('pt-BR')}</span>
                  </div>
                  {contrato.dataFim && (
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3 w-3 text-muted-foreground" />
                      <span className="text-muted-foreground">Fim:</span>
                      <span>{new Date(contrato.dataFim).toLocaleDateString('pt-BR')}</span>
                    </div>
                  )}
                  {contrato.valorTotal && (
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-3 w-3 text-muted-foreground" />
                      <span className="text-muted-foreground">Valor:</span>
                      <span className="font-medium text-success">
                        {new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL'
                        }).format(contrato.valorTotal)}
                      </span>
                    </div>
                  )}
                </div>
                {contrato.observacoes && (
                  <div className="mt-3 p-2 bg-muted rounded text-sm">
                    <p className="text-muted-foreground line-clamp-2">
                      {contrato.observacoes}
                    </p>
                  </div>
                )}
                {contrato.itens && contrato.itens.length > 0 && (
                  <div className="mt-3">
                    <p className="text-xs text-muted-foreground">
                      {contrato.itens.length} {contrato.itens.length === 1 ? 'item' : 'itens'} neste contrato
                    </p>
                  </div>
                )}
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
              onClick={onNovoContrato}
              className="mt-4"
            >
              <Plus className="h-4 w-4 mr-2" />
              Criar Primeiro Contrato
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}