import Link from "next/link";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { getLeagueById } from "@/http/leagues/get-league-by-id";
import TeamCard from "./_components/team-card";

interface Team {
  id: string;
  name: string;
  division: string;
  primaryColor: string;
  secondaryColor: string;
}

export default async function League({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const result = await getLeagueById(id);

  if (!result.success) {
    return <p>Ocorreu um erro: {result.message}</p>;
  }

  const { league } = result.data;

  const divisions = league.teams.reduce<Record<string, Team[]>>((acc, team) => {
    if (!acc[team.division]) {
      acc[team.division] = [];
    }
    acc[team.division].push(team);
    return acc;
  }, {});

  return (
    <div className="h-[calc(100vh-96px)] border-2 border-gray-200 rounded-lg px-8 py-4 gap-4 m-4 flex overflow-auto">
      <div className="flex flex-col gap-4 w-full">
        <h1 className="text-2xl text-gray-600">
          Liga: <span className="text-gray-900">{league.name}</span>
        </h1>

        <Accordion type="single" className="w-full" collapsible defaultValue="item-1">
          <AccordionItem value="item-1">
            <AccordionTrigger>Primeira Divisão</AccordionTrigger>
            <AccordionContent className="flex flex-wrap gap-4">
              {divisions.A.map((team) => (
                <Link href={`/leagues/${league.id}/team/${team.id}`} key={team.name}>
                  <TeamCard key={team.name} team={team} />
                </Link>
              ))}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>Segunda Divisão</AccordionTrigger>
            <AccordionContent className="flex flex-wrap gap-4">
              {divisions.B.map((team) => (
                <Link href={`/leagues/${league.id}/team/${team.id}`} key={team.name}>
                  <TeamCard key={team.name} team={team} />
                </Link>
              ))}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>Terceira Divisão</AccordionTrigger>
            <AccordionContent className="flex flex-wrap gap-4">
              {divisions.C.map((team) => (
                <Link href={`/leagues/${league.id}/team/${team.id}`} key={team.name}>
                  <TeamCard key={team.name} team={team} />
                </Link>
              ))}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger>Quarta Divisão</AccordionTrigger>
            <AccordionContent className="flex flex-wrap gap-4">
              {divisions.D.map((team) => (
                <Link href={`/leagues/${league.id}/team/${team.id}`} key={team.name}>
                  <TeamCard key={team.name} team={team} />
                </Link>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
