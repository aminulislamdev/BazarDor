const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

export const toBn = (n: number | string): string =>
  String(n).replace(/\d/g, (d) => bnDigits[+d]);

export const formatPrice = (n: number | undefined | null): string => {
  const v = Number(n);
  if (!isFinite(v)) return "— টাকা";
  return toBn(v.toLocaleString("en-IN")) + " টাকা";
};

export const formatChange = (
  pct: number | undefined | null,
  dir?: "up" | "down" | "flat"
): { text: string; dir: "up" | "down" | "flat" } => {
  const v = Number(pct);
  if (!isFinite(v) || Math.abs(v) < 0.05) {
    return { text: `— ${toBn("0.0")}%`, dir: "flat" };
  }
  // dir দেওয়া থাকলে সেটাই ব্যবহার, নাহলে pct থেকে বের করো
  const direction = dir ?? (v > 0 ? "up" : v < 0 ? "down" : "flat");
  const arrow = direction === "up" ? "▲" : direction === "down" ? "▼" : "—";
  return {
    text: `${arrow} ${toBn(Math.abs(v).toFixed(1))}%`,
    dir: direction,
  };
};

export const formatBnDate = (date = new Date()): string =>
  toBn(
    date.toLocaleDateString("bn-BD", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  );