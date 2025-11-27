"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormState } from "@/hooks/use-form-state";
import { createAccountAction } from "../actions";

export function CreateAccount() {
  const router = useRouter();
  const params = useSearchParams();

  const redirect = params.get("redirect");
  const invited = params.get("invitedBy");

  const [formState, handleSubmit, isPending] = useFormState(createAccountAction, onSuccess);

  function onSuccess() {
    toast.success("Conta criada com sucesso!");

    if (redirect) {
      return router.push(redirect);
    }

    return router.push("/sign-in");
  }

  useEffect(() => {
    if (formState.success === false && formState.message) {
      console.log(formState.message);
      toast.error(formState.message ?? "Ocorreu um erro ao criar a conta");
    }
  }, [formState]);

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <Label htmlFor="name">Nome completo:</Label>
        <Input type="text" placeholder="Fulano da Silva" name="name" id="name" />
        {formState.validationErrors?.name && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {formState.validationErrors.name.errors[0]}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email:</Label>
        <Input type="email" placeholder="email@example.com" name="email" id="email" />
        {formState.validationErrors?.email && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {formState.validationErrors.email.errors[0]}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Senha:</Label>
        <Input type="password" placeholder="Senha" name="password" id="password" />
        {formState.validationErrors?.password && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {formState.validationErrors.password.errors[0]}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirmar senha:</Label>
        <Input type="password" placeholder="Repetir senha" name="confirmPassword" id="confirmPassword" />
        {formState.validationErrors?.confirmPassword && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {formState.validationErrors.confirmPassword.errors[0]}
          </p>
        )}
      </div>

      <input type="text" name="invitedBy" value={invited ?? undefined} readOnly hidden />

      <Button type="submit" variant={"outline"} className="cursor-pointer" disabled={isPending}>
        {isPending ? "Criando conta..." : "Criar conta"}
      </Button>
    </form>
  );
}
