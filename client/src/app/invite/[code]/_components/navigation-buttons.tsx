"use client";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

interface NavigationButtonsProps {
  code: string;
  inviter: {
    id: string;
    name: string;
  };
}

export function NavigationButtons({ code, inviter }: NavigationButtonsProps) {
  return (
    <div className="flex gap-2 self-end mt-2">
      <Link
        className={buttonVariants({ variant: "outline" })}
        href={`/sign-up?redirect=/invite/${code}&invitedBy=${inviter.id}`}
      >
        Ainda não tenho conta
      </Link>
      <Link className={buttonVariants({ variant: "default" })} href={`/sign-in?redirect=/invite/${code}`}>
        Já tenho uma conta
      </Link>
    </div>
  );
}
