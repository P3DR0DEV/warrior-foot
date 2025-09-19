"use client";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { InviteFriendDialog } from "./invite-friend-dialog";

export function Navbar() {
  return (
    <div className="flex justify-between items-center p-4 w-full">
      <h1 className="text-2xl">WarriorFoot</h1>

      <div className="flex gap-4">
        <InviteFriendDialog />
        <Link className={buttonVariants({ variant: "outline" })} href="/api/auth/sign-out">
          LogOut
        </Link>
      </div>
    </div>
  );
}
