import { CreateAccount } from './_components/create-account'

export default function Register() {
  return (
    <div className="p-8 h-screen flex flex-col justify-between">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl">WarriorFoot</h1>
      </div>
      
      <div className="flex flex-col m-auto min-w-2xl justify-center border border-gray-200 rounded-lg p-8 gap-4">
        <div className="space-y-2">
          <h2 className="text-2xl">Registre-se e comece jogar!</h2>
        </div>

        <CreateAccount />
      </div>
      <div className="flex justify-center items-center">
        <p className="text-gray-500">WarriorFoot</p>
      </div>
    </div>
  )
}