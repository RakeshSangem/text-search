// wordCountHelper.ts

export const countWords = (text: string): number => {
  const words = text.trim().split(/\s+/);
  return words.filter((word) => word !== "").length;
};
