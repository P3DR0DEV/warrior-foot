'use client'
import { Button } from "@/components/ui/button";
import { InviteFriendDialog } from "./invite-friend-dialog";

export function Navbar() {
  return (
    <div className="flex justify-between items-center p-4 w-full">
      <h1 className="text-2xl">WarriorFoot</h1>

      <div className="flex gap-4">
        <InviteFriendDialog />
        <Button variant={"secondary"} className="cursor-pointer" onClick={() => console.log("LogOut")}>
          LogOut
        </Button>
      </div>
    </div>
  );
}
