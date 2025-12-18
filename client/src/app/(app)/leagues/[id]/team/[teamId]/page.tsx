import { getTeamById } from "@/http/teams/get-team-by-id";
import { PlayerCard } from "./_components/player-card";

export default async function Team({ params }: { params: Promise<{ teamId: string }> }) {
  const { teamId } = await params;

  const result = await getTeamById(teamId);

  if (!result.success) {
    return <p>Ocorreu um erro: {result.message}</p>;
  }

  const { team } = result.data;

  return (
    <div className="h-[calc(100vh-96px)] border-2 border-gray-200 rounded-lg px-8 py-4 gap-4 m-4 flex flex-col overflow-auto">
      <div className="flex items-center gap-2">
        <div>
          <h1>Equipe: <span className="text-gray-900 font-bold">{team.name}</span></h1>
          <p>Divisão: <span className="text-gray-900 font-bold">{team.division}</span></p>
        </div>

        <div className="flex h-10 w-10 border-b border-gray-200">
          <div className="flex-1" style={{ backgroundColor: team.primaryColor }} />
          <div className="flex-1" style={{ backgroundColor: team.secondaryColor }} />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-4 ">
          {team.players.map((player) => (
            <PlayerCard key={player.id} player={player} />
          ))}
        </div>
      </div>
    </div>
  )
}