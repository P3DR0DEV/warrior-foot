'use client'

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function LoginNavigationButton() {
  const router = useRouter();

  function handleClick() {
    router.push("/sign-in");
  }
  return (
    <Button variant={"ghost"} className="cursor-pointer" onClick={handleClick}>
      Entrar
    </Button>
  );
}
