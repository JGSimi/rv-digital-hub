import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Categoria } from "@/types";
import { Search, Plus, Tag, Star } from "lucide-react";

interface CategoriasListProps {
  categorias: Categoria[];
  onCategoriaSelect: (categoria: Categoria) => void;
  onNovaCategoria: () => void;
}

export function CategoriasList({ categorias, onCategoriaSelect, onNovaCategoria }: CategoriasListProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCategorias = categorias.filter(categoria =>
    categoria.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    categoria.descricao.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Categorias</h2>
          <p className="text-muted-foreground">
            Gerencie as categorias de clientes e benefícios
          </p>
        </div>
        <Button onClick={onNovaCategoria} className="shadow-elegant">
          <Plus className="h-4 w-4 mr-2" />
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

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredCategorias.map((categoria) => (
          <Card 
            key={categoria.id} 
            className="hover:shadow-elegant transition-all duration-300 cursor-pointer group"
            onClick={() => onCategoriaSelect(categoria)}
          >
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <Tag className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {categoria.nome}
                  </CardTitle>
                </div>
                <Badge variant={categoria.ativo ? "default" : "secondary"}>
                  {categoria.ativo ? "Ativa" : "Inativa"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground mb-4">
                {categoria.descricao}
              </p>
              
              {categoria.beneficios && (
                <div className="space-y-2">
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 text-primary" />
                    <span className="text-sm font-medium">Benefícios:</span>
                  </div>
                  <p className="text-xs text-muted-foreground bg-muted p-2 rounded">
                    {categoria.beneficios}
                  </p>
                </div>
              )}
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
              onClick={onNovaCategoria}
              className="mt-4"
            >
              <Plus className="h-4 w-4 mr-2" />
              Criar Primeira Categoria
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}