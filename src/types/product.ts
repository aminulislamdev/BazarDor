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