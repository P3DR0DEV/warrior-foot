import { verifyInviteCode } from "@/http/leagues/verify-invite-code";
import { AcceptButton } from "./_components/accept-button";
import { NavigationButtons } from "./_components/navigation-buttons";
import { verifyIfUserIsLoggedIn } from "./actions";

export default async function AcceptInvitePage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const result = await verifyInviteCode(code);

  const { isLoggedIn, user } = await verifyIfUserIsLoggedIn();

  if (!result.success) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="flex flex-col items-center justify-center w-full">
          <h1>Ocorreu um erro: {result.message}</h1>
          <p>Seu convite parece ter expirado, e não é mais válido, ou não foi encontrado.</p>
          <p>Tente pedir para a pessoa que te convidou novamente e tente mais tarde.</p>
        </div>
      </div>
    );
  }

  const { data } = result.data;
  const { name, inviter } = data;

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center w-full">
        <div className="flex flex-col">
          <h1>
            Olá, <strong>{name}</strong>!!
          </h1>
          <p>
            Você foi convidado por <strong>{inviter.name}</strong> para participar de sua liga no WarriorFoot.
          </p>
          <p>Para aceitar o convite, clique no botão abaixo.</p>
          {isLoggedIn ? <AcceptButton user={user} inviter={inviter} code={code} /> : <NavigationButtons code={code} inviter={inviter} />}
        </div>
      </div>
    </div>
  );
}
