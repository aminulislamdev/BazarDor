// ─── Raw API Category ───
export type RawCategory = {
  id: string;
  nameBn: string;
  icon?: string;
  count?: number;
};

// ─── App-friendly Category ───
export type Category = {
  id: string;
  name: string;
  icon?: string;
};