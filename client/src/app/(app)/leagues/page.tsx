import Link from "next/link";
import { getLeagues } from "@/http/leagues/get-leagues";

export default async function Leagues() {
  const result = await getLeagues();

  if (!result.success) {
    return <p>Ocorreu um erro: {result.message}</p>;
  }

  const { leagues, otherLeagues } = result.data;

  return (
    <div>
      <ul>
        {leagues.map((league) => (
          <li key={league.id}>
            <Link href={`/leagues/${league.id}`}>{league.name}</Link>
          </li>
        ))}
      </ul>

      <h2 className="text-2xl mt-2">Outras ligas:</h2>
      <ul>
        {otherLeagues.map((league) => (
          <li key={league.id}>
            <Link href={`/leagues/${league.id}`}>{league.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
