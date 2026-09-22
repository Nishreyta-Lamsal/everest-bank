export function getCurrentBsYear() {
  const now = new Date();

  const offset = now.getMonth() >= 3 ? 57 : 56;

  return now.getFullYear() + offset;
}
