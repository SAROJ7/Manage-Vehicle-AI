"use client";
import { useState } from "react";

import { useDeleteConversationMutation } from "@/query/conversation.query";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@repo/ui/components/alert-dialog";
import { Input } from "@repo/ui/components/input";
import { toast } from "sonner";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  conversationId: string;
}

const DeleteConversationDialog = ({ open, setOpen, conversationId }: Props) => {
  const [confirmText, setConfirmText] = useState("");
  const { mutateAsync: deleteConversation } = useDeleteConversationMutation();

  const handleDelete = async () => {
    await deleteConversation(conversationId, {
      onSuccess: () => {
        toast.success(`Conversation Deleted Successfully`, {
          id: conversationId,
        });
        setConfirmText("");
      },
      onError: () => {
        toast.error(`Something went wrong`, { id: conversationId });
      },
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            If you delete this conversation, you will not be able to recover it.
            <div className="flex flex-col py-4 gap-2">
              <p>
                If you are sure, enter <b>{conversationId}</b> to confirm:
              </p>
              <Input
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
              />
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => {
              setConfirmText("");
            }}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={confirmText !== conversationId}
            className="text-destructive-foreground bg-destructive hover:bg-destructive/90"
            onClick={() => {
              toast.loading("Deleting conversation...", { id: conversationId });
              handleDelete();
            }}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteConversationDialog;
