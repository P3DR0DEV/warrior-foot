import { type FormEvent, useState, useTransition } from "react";

type FieldError = { errors: string[] };
type FormErrors = Record<string, FieldError> | undefined;

interface FormState {
  success: boolean;
  message: string | null;
  validationErrors: FormErrors | null;
}

export function useFormState(
  action: (data: FormData) => Promise<FormState>,
  onSuccess?: () => Promise<void> | void,
  initialState?: FormState,
) {
  const [isPending, startTransition] = useTransition();

  const [formState, setFormState] = useState(initialState ?? { success: false, message: null, validationErrors: null });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);

    startTransition(async () => {
      const state = await action(data);

      if (state.success === true && onSuccess) {
        return await onSuccess();
      }

      setFormState(state);
    });
  }

  return [formState, handleSubmit, isPending] as const;
}
