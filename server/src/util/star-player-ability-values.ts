import type { PlayerAbilityRanges } from "./player-ability-values.ts";

export const starPlayerAbilityValues: PlayerAbilityRanges = {
  A: {
    natural: {
      strength: [15, 20],
      agility: [15, 20],
      energy: [15, 20],
    },
    outfield: {
      kick: [25, 40],
      longKick: [25, 40],
      pass: [25, 40],
      longPass: [25, 40],
      dribble: [25, 40],
    },
    goalkeeper: {
      kick: [25, 40],
      longKick: [25, 40],
      pass: [25, 40],
      longPass: [25, 40],
      jump: [25, 40],
      reflexes: [25, 40],
    }
  },
  B: {
    natural: {
      strength: [10, 15],
      agility: [10, 15],
      energy: [10, 15],
    },
    outfield: {
      kick: [18, 30],
      longKick: [18, 30],
      pass: [18, 30],
      longPass: [18, 30],
      dribble: [18, 30],
    },
    goalkeeper: {
      kick: [18, 30],
      longKick: [18, 30],
      pass: [18, 30],
      longPass: [18, 30],
      jump: [18, 30],
      reflexes: [18, 30],
    }
  },
  C: {
    natural: {
      strength: [6, 10],
      agility: [6, 10],
      energy: [6, 10],
    },
    outfield: {
      kick: [12, 20],
      longKick: [12, 20],
      pass: [12, 20],
      longPass: [12, 20],
      dribble: [12, 20],
    },
    goalkeeper: {
      kick: [12, 20],
      longKick: [12, 20],
      pass: [12, 20],
      longPass: [12, 20],
      jump: [12, 20],
      reflexes: [12, 20],
    }
  },
  D: {
    natural: {
      strength: [3, 5],
      agility: [3, 5],
      energy: [3, 5],
    },
    outfield: {
      kick: [5, 10],
      longKick: [5, 10],
      pass: [5, 10],
      longPass: [5, 10],
      dribble: [5, 10],
    },
    goalkeeper: {
      kick: [5, 10],
      longKick: [5, 10],
      pass: [5, 10],
      longPass: [5, 10],
      jump: [5, 10],
      reflexes: [5, 10],
    }
  },
}