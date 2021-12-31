export const newestFirst = (a, b) => {
  return new Date(a.rawDate) - new Date(b.rawDate);
};

export const isBrowser = typeof window !== "undefined";

