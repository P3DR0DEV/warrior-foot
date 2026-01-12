"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import { InviteFriendDialog } from "./invite-friend-dialog";
import { NewSeasonDropdownMenu } from "./new-season-dropdown-menu";

export function Navbar() {
  const pathname = usePathname();

  // testa se é a rota /leagues/[id]
  const isLeagueDetailPage = /^\/leagues\/[^/]+/.test(pathname);

  return (
    <div className="flex justify-between items-center p-4 w-full">
      <h1 className="text-2xl">WarriorFoot</h1>

      <div className="flex gap-4">
        {isLeagueDetailPage &&  <NewSeasonDropdownMenu />}
        <InviteFriendDialog />
        <Link className={buttonVariants({ variant: "outline" })} href="/api/auth/sign-out">
          LogOut
        </Link>
      </div>
    </div>
  );
}
