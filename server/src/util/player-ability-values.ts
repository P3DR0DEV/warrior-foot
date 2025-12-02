export type PlayerAbilityRanges = {
  [k: string]: {
    natural: {
      strength: [number, number]
      agility: [number, number]
      energy: [number, number]
    }
    outfield: {
      kick: [number, number]
      longKick: [number, number]
      pass: [number, number]
      longPass: [number, number]
      dribble: [number, number]
    }
    goalkeeper: {
      kick: [number, number]
      longKick: [number, number]
      pass: [number, number]
      longPass: [number, number]
      jump: [number, number]
      reflexes: [number, number]
    }
  }
}

const chancesToBeAStar = {
  A: 7,
  B: 5,
  C: 3,
  D: 1,
}

export function rollChance(division: 'A' | 'B' | 'C' | 'D'): boolean {
  const percent = chancesToBeAStar[division];
  
  const randomValue = Math.random() * 100;
  return randomValue < percent;
}

export const playerAbilityValues: PlayerAbilityRanges = {
  A: {
    natural: {
      strength: [10, 20],
      agility: [10, 20],
      energy: [10, 20],
    },
    outfield: {
      kick: [15, 40],
      longKick: [15, 40],
      pass: [15, 40],
      longPass: [15, 40],
      dribble: [15, 40],
    },
    goalkeeper: {
      kick: [15, 40],
      longKick: [15, 40],
      pass: [15, 40],
      longPass: [15, 40],
      jump: [15, 40],
      reflexes: [15, 40],
    }
  },
  B: {
    natural: {
      strength: [5, 15],
      agility: [5, 15],
      energy: [5, 15],
    },
    outfield: {
      kick: [10, 30],
      longKick: [10, 30],
      pass: [10, 30],
      longPass: [10, 30],
      dribble: [10, 30],
    },
    goalkeeper: {
      kick: [10, 30],
      longKick: [10, 30],
      pass: [10, 30],
      longPass: [10, 30],
      jump: [10, 30],
      reflexes: [10, 30],
    }
  },
  C: {
    natural: {
      strength: [1, 10],
      agility: [1, 10],
      energy: [1, 10],
    },
    outfield: {
      kick: [5, 20],
      longKick: [5, 20],
      pass: [5, 20],
      longPass: [5, 20],
      dribble: [5, 20],
    },
    goalkeeper: {
      kick: [5, 20],
      longKick: [5, 20],
      pass: [5, 20],
      longPass: [5, 20],
      jump: [5, 20],
      reflexes: [5, 20],
    }
  },
  D: {
    natural: {
      strength: [1, 5],
      agility: [1, 5],
      energy: [1, 5],
    },
    outfield: {
      kick: [1, 10],
      longKick: [1, 10],
      pass: [1, 10],
      longPass: [1, 10],
      dribble: [1, 10],
    },
    goalkeeper: {
      kick: [1, 10],
      longKick: [1, 10],
      pass: [1, 10],
      longPass: [1, 10],
      jump: [1, 10],
      reflexes: [1, 10],
    }
  },
}

export function getRandomValue(minMax: [number, number]): number {
  const [min, max] = minMax;
  
  return Math.floor(Math.random() * (max - min + 1)) + min;
}