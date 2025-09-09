import { ReactNode } from "react";
import { ResponsiveModal } from "@/components/common/ResponsiveModal";

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export function FormModal({ isOpen, onClose, title, children }: FormModalProps) {
  return (
    <ResponsiveModal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={title} 
      className="max-w-2xl max-h-[90vh] overflow-y-auto"
    >
      {children}
    </ResponsiveModal>
  );
}