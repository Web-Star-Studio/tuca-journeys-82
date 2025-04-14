
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { UserForm } from "./UserForm";

interface UserFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId?: string;
  onSuccess: () => void;
}

const UserFormDialog: React.FC<UserFormDialogProps> = ({
  open,
  onOpenChange,
  userId,
  onSuccess,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {userId ? "Editar Usuário" : "Novo Usuário"}
          </DialogTitle>
          <DialogDescription>
            {userId
              ? "Edite os detalhes do usuário abaixo."
              : "Preencha os detalhes do novo usuário abaixo."}
          </DialogDescription>
        </DialogHeader>
        <UserForm
          userId={userId}
          onCancel={() => onOpenChange(false)}
          onSuccess={() => {
            onSuccess();
            onOpenChange(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default UserFormDialog;
