import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export function useCRUD<T extends { id?: number }>(
  data: T[],
  entityName: string
) {
  const [items, setItems] = useState<T[]>(data);
  const { toast } = useToast();

  const create = (newItem: any) => {
    const item = {
      ...newItem,
      id: Math.max(...items.map(i => i.id || 0), 0) + 1,
    } as T;
    
    setItems(prev => [...prev, item]);
    
    toast({
      title: "Sucesso",
      description: `${entityName} criado com sucesso!`,
    });
  };

  const update = (id: number, updatedItem: any) => {
    setItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, ...updatedItem } : item
      )
    );
    
    toast({
      title: "Sucesso",
      description: `${entityName} atualizado com sucesso!`,
    });
  };

  const remove = (id: number) => {
    setItems(prev => prev.filter(item => item.id !== id));
    
    toast({
      title: "Sucesso",
      description: `${entityName} removido com sucesso!`,
    });
  };

  const getById = (id: number) => {
    return items.find(item => item.id === id);
  };

  return {
    items,
    create,
    update,
    remove,
    getById,
  };
}