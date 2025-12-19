'use client'

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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormState } from "@/hooks/use-form-state";
import { changeLeagueNameAction } from "../actions";

export function ChangeLeagueNameDialog({ leagueId }: { leagueId: string }) {
  const [formState, handleSubmit, isPending] = useFormState(changeLeagueNameAction, onSuccess);

  function onSuccess() {
    toast.success("Liga atualizada com sucesso!");
  }

  useEffect(() => {
    if (formState.success === false && formState.message) {
      toast.error(formState.message ?? "Ocorreu um erro ao efetuar a alteração");
    }
  }, [formState]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Trocar nome</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Alterar nome da liga</DialogTitle>
          <DialogDescription>Altere o nome da sua liga para que ela se destaque e tenha a sua cara!</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="name">Nome</Label>
            <Input id="name" name="name" placeholder="Liga de fulano" />
            {formState.validationErrors?.name && (
              <p className="text-xs font-medium text-red-500 dark:text-red-400">
                {formState.validationErrors.name.errors[0]}
              </p>
            )}
          </div>

          <input type="text" name="leagueId" value={leagueId} hidden readOnly/>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>

            <Button className="cursor-pointer" disabled={isPending}>
              Confirmar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
