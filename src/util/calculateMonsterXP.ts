type crToXPMap = {
  [key: string]: number;
};

type inputData = {
  count: number;
  CR: string;
};

export interface DataByInput {
  [inputId: string]: inputData;
}

const CR_TO_XP: crToXPMap = {
  '0': 0,
  '1/8': 25,
  '1/4': 50,
  '1/2': 100,
  '1': 200,
  '2': 450,
  '3': 700,
  '4': 1100,
  '5': 1800,
  '6': 2300,
  '7': 2900,
  '8': 3900,
  '9': 5000,
  '10': 5900,
  '11': 7200,
  '12': 8400,
  '13': 10000,
  '14': 11500,
  '15': 13000,
  '16': 15000,
  '17': 18000,
  '18': 20000,
  '19': 22000,
  '20': 25000,
};

export const calculateMonsterXP = (count: number, CR: string): number => {
  const xpPerPmonster = CR_TO_XP[CR];
  return xpPerPmonster * count;
};

export const getMonsterMultiplier = (dataByInput: DataByInput): number => {
  const totalMonsterCount = Object.keys(dataByInput).reduce(
    (acc: number, key: string) => {
      return acc + dataByInput[key].count;
    },
    0,
  );

  if (totalMonsterCount < 1) {
    return 0;
  }
  if (totalMonsterCount === 1) {
    return 1;
  }
  if (totalMonsterCount === 2) {
    return 1.5;
  }
  if (3 <= totalMonsterCount && totalMonsterCount <= 6) {
    return 2;
  }
  if (7 <= totalMonsterCount && totalMonsterCount <= 10) {
    return 2.5;
  }
  if (11 <= totalMonsterCount && totalMonsterCount <= 14) {
    return 3;
  } else {
    return 4;
  }
};
