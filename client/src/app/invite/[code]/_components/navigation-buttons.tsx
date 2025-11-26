"use client";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export function NavigationButtons({ code }: { code: string }) {
  return (
    <div className="flex gap-2 self-end mt-2">
      <Link className={buttonVariants({ variant: "outline" })} href={`/sign-up?redirect=/invite/${code}&invited=true`}>
        Ainda não tenho conta
      </Link>
      <Link className={buttonVariants({ variant: "default" })} href={`/sign-in?redirect=/invite/${code}`}>
        Já tenho uma conta
      </Link>
    </div>
  );
}
