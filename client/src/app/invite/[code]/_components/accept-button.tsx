"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useFormState } from "@/hooks/use-form-state";
import { acceptInviteAction } from "../actions";

interface AcceptButtonProps {
  user: {
    id: string;
    name: string;
    email: string;
  };
  inviter: {
    id: string;
    name: string;
  };
  code: string;
}

export function AcceptButton({ user, inviter, code }: AcceptButtonProps) {
  const [formState, handleSubmit, isPending] = useFormState(acceptInviteAction, onSuccess);
  const router = useRouter();

  function onSuccess() {
    toast.success("Convite aceito com sucesso!");
    router.push(`/leagues`);
  }

  useEffect(() => {
    if (formState.success === false && formState.message) {
      toast.error(formState.message ?? "Ocorreu um erro ao aceitar o convite");
    }
  }, [formState]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="cursor-pointer mt-2 self-end">
          Aceitar convite
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Aceitar convite?</DialogTitle>
          <DialogDescription>
            Ao clicar em aceitar, sua conta com <strong>email: {user.email}</strong> será associada à liga de seu amigo{" "}
            <strong>{inviter.name}</strong>.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <input type="text" name="userId" value={user.id} hidden readOnly />
          <input type="text" name="code" value={code} hidden readOnly />
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>

            <Button className="cursor-pointer" disabled={isPending}>
              Aceitar convite
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
