import { useState } from "react";

export interface UseFormModalProps<T> {
  onSubmit: (data: T) => void | Promise<void>;
  onEdit?: (data: any) => void | Promise<void>;
}

export function useFormModal<T extends Record<string, any>>({ onSubmit, onEdit }: UseFormModalProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const openModal = () => {
    setEditingItem(null);
    setIsOpen(true);
  };

  const openEditModal = (item: any) => {
    setEditingItem(item);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setEditingItem(null);
  };

  const handleSubmit = async (data: T) => {
    setIsLoading(true);
    try {
      if (editingItem && onEdit) {
        await onEdit({ ...data, id: editingItem.id } as any);
      } else {
        await onSubmit(data);
      }
      closeModal();
    } catch (error) {
      console.error("Erro ao salvar:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isOpen,
    editingItem,
    isLoading,
    openModal,
    openEditModal,
    closeModal,
    handleSubmit,
    isEditing: !!editingItem,
  };
}