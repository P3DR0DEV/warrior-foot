"use client";

import { useParams } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { initiateSeasonAction } from "../leagues/[id]/actions";

export function NewSeasonDropdownMenu() {
  const { id } = useParams<{ id: string }>();

  console.log(id);
  const items = [
    {
      name: "Nova Temporada",
      id: "1",
      action: async () => {
        const result = await initiateSeasonAction({ id });

        if (!result.success) {
          toast.error(result.message);
        }

        toast.success("Nova temporada iniciada com sucesso!");
      },
    },
    { name: "Ranking", id: "2" },
    { name: "Calendário de Jogos", id: "3" },
    { name: "Artilheiros", id: "4" },
  ];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Temporada</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuGroup>
          {items.map((item) => (
            <DropdownMenuItem key={item.id} onClick={item.action}>
              {item.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
