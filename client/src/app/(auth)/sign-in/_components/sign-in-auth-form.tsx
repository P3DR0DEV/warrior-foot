"use client";

import { Label } from "@radix-ui/react-label";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFormState } from "@/hooks/use-form-state";
import { signInAction } from "../actions";

export function SignInAuthForm() {
  const router = useRouter();

  const [formState, handleSubmit, isPending] = useFormState(signInAction, onSuccess);

  function onSuccess() {
    toast.success("Autenticado com sucesso!");
    router.push("/leagues");
  }

  useEffect(() => {
    if (formState.success === false && formState.message) {
      toast.error(formState.message ?? "Ocorreu um erro ao tentar autenticar");
    }
  }, [formState]);

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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

      <Button type="submit" variant={"outline"} className="cursor-pointer" disabled={isPending}>
        Entrar
      </Button>
    </form>
  );
}
