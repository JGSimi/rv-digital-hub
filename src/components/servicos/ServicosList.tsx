import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Servico } from "@/types";
import { Search, Plus, Package, DollarSign, Tag } from "lucide-react";

interface ServicosListProps {
  servicos: Servico[];
  onServicoSelect: (servico: Servico) => void;
  onNovoServico: () => void;
}

export function ServicosList({ servicos, onServicoSelect, onNovoServico }: ServicosListProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredServicos = servicos.filter(servico =>
    servico.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    servico.categoria.toLowerCase().includes(searchTerm.toLowerCase()) ||
    servico.descricao.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Serviços</h2>
          <p className="text-muted-foreground">
            Gerencie todos os serviços oferecidos
          </p>
        </div>
        <Button onClick={onNovoServico} className="shadow-elegant">
          <Plus className="h-4 w-4 mr-2" />
          Novo Serviço
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Buscar por nome, categoria ou descrição..."
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
                <div className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {servico.nome}
                  </CardTitle>
                </div>
                <Badge variant={servico.ativo ? "default" : "secondary"}>
                  {servico.ativo ? "Ativo" : "Inativo"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {servico.descricao}
              </p>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Tag className="h-3 w-3 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Categoria:</span>
                  </div>
                  <Badge variant="outline">{servico.categoria}</Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-3 w-3 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Valor:</span>
                  </div>
                  <span className="font-semibold text-success">
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    }).format(servico.valor)}
                  </span>
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
              onClick={onNovoServico}
              className="mt-4"
            >
              <Plus className="h-4 w-4 mr-2" />
              Cadastrar Primeiro Serviço
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}