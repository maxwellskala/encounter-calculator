type crToXPMap = {
  [key: string]: number;
};

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
  '20': 25000
};

export default (count: number, CR: string) => {
  const xpPerPmonster = CR_TO_XP[CR];
  return xpPerPmonster * count;
};
