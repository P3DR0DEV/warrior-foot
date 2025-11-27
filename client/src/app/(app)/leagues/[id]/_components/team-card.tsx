interface TeamCardProps {
  team: {
    name: string;
    division: string;
    primaryColor: string;
    secondaryColor: string;
  };
}

export default function TeamCard({ team }: TeamCardProps) {
  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-full max-w-xs bg-white rounded-lg shadow-md overflow-hidden border">
        {/* Header with colors */}
        <div className="flex h-10 border-b border-gray-200">
          <div className="flex-1" style={{ backgroundColor: team.primaryColor }} />
          <div className="flex-1" style={{ backgroundColor: team.secondaryColor }} />
        </div>

        {/* Content */}
        <div className="p-5">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">{team.name}</h2>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center gap-2">
              <span className="text-gray-600">Divisão:</span>
              <span className="font-semibold text-gray-900 underline uppercase">{team.division}</span>
            </div>
            <div className="flex justify-between items-center gap-2">
              <span className="text-gray-600">Cor Primária:</span>
              <span className="font-mono text-gray-900 underline uppercase">{team.primaryColor}</span>
            </div>
            <div className="flex justify-between items-center gap-2">
              <span className="text-gray-600">Cor Secundária:</span>
              <span className="font-mono text-gray-900 underline uppercase">{team.secondaryColor}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
