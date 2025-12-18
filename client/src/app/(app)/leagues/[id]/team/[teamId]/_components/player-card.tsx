import { Star } from "lucide-react";

interface Player {
  id: string;
  name: string;
  position: "goalkeeper" | "outfield";
  isStar: boolean;
  strength: number;
  agility: number;
  energy: number;
  kick: number;
  longKick: number;
  pass: number;
  longPass: number;
  value: number;
  stamina: number;
  dribble: number | null;
  jump: number | null;
  reflexes: number | null;
}

export function PlayerCard({ player }: { player: Player }) {
  const positionLabel = player.position === "goalkeeper" ? "GK" : "OF";
  let overallRating = 0;
  if (player.position === "goalkeeper") {
    overallRating =
      (player.strength +
        player.agility +
        player.energy +
        player.kick +
        player.longKick +
        player.pass +
        player.longPass +
        (player.jump ?? 0) +
        (player.reflexes ?? 0)) /
      9;
  }

  if (player.position === "outfield") {
    overallRating =
      (player.strength +
        player.agility +
        player.energy +
        player.kick +
        player.longKick +
        player.pass +
        player.longPass +
        (player.dribble ?? 0)) /
      8;
  }

  const getRelevantStats = () => {
    const baseStats = [
      { label: "STR", value: player.strength },
      { label: "AGI", value: player.agility },
      { label: "ENE", value: player.energy },
      { label: "PAS", value: player.pass },
      { label: "KIC", value: player.kick },
      { label: "LKIC", value: player.longKick },
      { label: "PASS", value: player.pass },
      { label: "LPAS", value: player.longPass },
    ];

    if (player.position === "goalkeeper") {
      return baseStats.concat([
        { label: "JUMP", value: player.jump ?? 0 },
        { label: "REFL", value: player.reflexes ?? 0 },
      ]);
    }

    return baseStats.concat([{ label: "DRIB", value: player.dribble ?? 0 }]);
  };
  const stats = getRelevantStats();

  return (
    <div className="w-64">
      {/* Card Container */}
      <div className="bg-linear-to-br from-amber-50 to-amber-100 rounded-lg shadow-2xl overflow-hidden border-2 border-amber-200">
        {/* Header */}
        <div className="bg-linear-to-r from-blue-600 to-blue-700 px-6 py-4 text-white flex justify-between items-start">
          <div>
            <div className="text-sm font-semibold opacity-90">POSITION</div>
            <div className="text-xl font-bold">{positionLabel}</div>
          </div>
          <div className="text-right relative">
            <div className="text-3xl font-bold">{overallRating.toFixed(1)}</div>
            {player.isStar && (
              <div className="flex gap-2 items-center absolute right-0">
                <Star className="fill-yellow-300 text-yellow-300" />
                <p>CRAQUE!</p>
              </div>
            )}
          </div>
        </div>

        {/* Player Info */}
        <div className="px-6 py-4 border-b border-amber-200">
          <h2 className="text-xl font-bold text-slate-900">{player.name}</h2>
          <div className="flex justify-between items-center mt-2 text-xs text-slate-600">
            <span className="font-semibold text-blue-600">${player.value.toFixed(2)}</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="px-6 py-4">
          <div className="grid grid-cols-5 gap-2">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-xs font-bold text-slate-700 mb-1">{stat.label}</div>
                <div className="bg-white rounded border border-amber-200">
                  <div className="font-bold text-blue-600">{stat.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
