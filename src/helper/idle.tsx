export const idle = (ms: number) => {
  return new Promise((resolve) => setTimeout(() => resolve(""), ms));
}