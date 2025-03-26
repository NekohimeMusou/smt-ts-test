declare global {
  type CharacterStat = keyof typeof characterStats;
}

const characterClasses = {
  fiend: "TYPES.Actor.fiend",
  demon: "TYPES.Actor.demon",
  human: "TYPES.Actor.human",
} as const;

const itemClasses = {
  skill: "TYPES.Item.skill",
  inventoryItem: "TYPES.Item.inventoryItem",
} as const;

const characterStats = {
  st: "SMT.stats.st",
  ma: "SMT.stats.ma",
  vi: "SMT.stats.vi",
  ag: "SMT.stats.ag",
  lu: "SMT.stats.lu",
} as const;

// Class constants
const hpMpMultipliers = {
  fiend: {
    hp: 6,
    mp: 3,
  },
  demon: {
    hp: 6,
    mp: 3,
  },
  human: {
    hp: 4,
    mp: 2,
  },
} as const;

const derivedTNs = {
  st: "phys",
  ma: "mag",
  vi: "save",
  ag: "dodge",
  lu: "negotiation",
} as const;

export const SMT = {
  characterClasses,
  itemClasses,
  characterStats,
  derivedTNs,
  hpMpMultipliers,
} as const;
