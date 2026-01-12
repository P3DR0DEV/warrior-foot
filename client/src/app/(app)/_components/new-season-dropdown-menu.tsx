import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function NewSeasonDropdownMenu() {
  const items = [
    { name: "Nova Temporada", id: "1" },
    { name: "Ranking", id: "2" },
    { name: "Calendário de Jogos", id: "3" },
    { name: "Artilheiros", id: "4" },
  ]
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Temporada</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuGroup>
          {items.map((item) => (
            <DropdownMenuItem key={item.id}>
              {item.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
