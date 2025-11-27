import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { getLeagues } from "@/http/leagues/get-leagues";

export default async function Leagues() {
  const result = await getLeagues();

  if (!result.success) {
    return <p>Ocorreu um erro: {result.message}</p>;
  }

  const { leagues, otherLeagues } = result.data;

  return (
    <div className="h-[calc(100vh-96px)] border-2 border-gray-200 rounded-lg px-8 py-4 gap-4 m-4 flex">
      <div className="w-full">
        <h1 className="text-2xl">Minhas Ligas:</h1>
        <ul>
          {leagues.map((league) => (
            <li key={league.id} className={buttonVariants({ variant: "link" })}>
              <Link href={`/leagues/${league.id}`}>{league.name}</Link>
            </li>
          ))}
        </ul>
      </div>

      {otherLeagues.length > 0 && (
        <div className="w-full">
          <h2 className="text-2xl mt-2">Outras ligas:</h2>
          <ul>
            {otherLeagues.map((league) => (
              <li key={league.id} className={buttonVariants({ variant: "link" })}>
                <Link href={`/leagues/${league.id}`}>{league.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
