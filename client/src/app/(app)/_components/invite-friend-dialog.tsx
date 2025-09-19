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
import { inviteFriendsAction } from "../leagues/actions";

export function InviteFriendDialog() {
  const [formState, handleSubmit, isPending] = useFormState(inviteFriendsAction, onSuccess);

  function onSuccess() {
    toast.success("Convite enviado com sucesso!");
  }

  useEffect(() => {
    if (formState.success === false && formState.message) {
      toast.error(formState.message ?? "Ocorreu um erro ao efetuar o convite");
    }
  }, [formState]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Convidar um amigo</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Convide um amigo para a sua liga</DialogTitle>
          <DialogDescription>Convide um amigo e jogue juntos em uma de suas ligas!</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name">Nome</Label>
              <Input id="name" name="name" placeholder="Nome do seu amigo" />
              {formState.validationErrors?.name && (
                <p className="text-xs font-medium text-red-500 dark:text-red-400">
                  {formState.validationErrors.name.errors[0]}
                </p>
              )}
            </div>
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" placeholder="email@example.com" type="email" />
              {formState.validationErrors?.email && (
                <p className="text-xs font-medium text-red-500 dark:text-red-400">
                  {formState.validationErrors.email.errors[0]}
                </p>
              )}
            </div>

            {/* TODO SELECT LEAGUE */}

            {/* <div className="grid gap-3">
              <Label htmlFor="email">Liga</Label>
              <Input id="email" />
            </div> */}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>

            <Button className="cursor-pointer" disabled={isPending}>
              Enviar convite
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
