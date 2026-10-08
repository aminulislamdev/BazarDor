// ─── Raw API Market ───
export type RawMarket = {
  market: string;
  division: string;
  min: number;
  max: number;
};

// ─── Raw API Product (যেভাবে API দেয়) ───
export type RawProduct = {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
  markets: RawMarket[];
};


// ─── App-friendly Market ───
export type Market = {
  name: string;
  division: string;
  min: number;
  max: number;
  avg: number;
};

// ─── App-friendly Product ───
export type Product = {
  id: number;
  slug: string;
  name: string;
  category: string;
  categoryName: string;
  categoryIcon: string;
  unit: string;
  emoji: string;
  price: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: number;
  changeDir: "up" | "down" | "flat";
  min: number;
  max: number;
  avg: number;
  markets: Market[];
};