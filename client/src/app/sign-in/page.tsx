import { SignInAuthForm } from "./_components/sign-in-auth-form";

export default function SignIn() {
  return (
    <div className="p-8 h-screen flex flex-col justify-between">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl">WarriorFoot</h1>
      </div>

      <div className="flex flex-col m-auto min-w-2xl justify-center border border-gray-200 rounded-lg p-8 gap-4">
        <div className="space-y-2">
          <h2 className="text-2xl">
            Entre com suas credenciais para começar a jogar!
          </h2>
        </div>

        <SignInAuthForm />
        
      </div>
    </div>
  );
}
