import { getLeagueById } from "@/http/leagues/get-league-by-id";

export default async function League({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;

  const result = await getLeagueById(id);

  if (!result.success) {
    return <p>Ocorreu um erro: {result.message}</p>;
  }

  const { league } = result.data;
  return <div>
    <pre>{JSON.stringify(league, null, 2)}</pre>
  </div>;
}
