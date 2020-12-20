export const emoji = ["🥔", "🥦", "🍞", "🍗", "🥩", "🥚", "🍚"];

let count = 0;

export function random() {
  const index = count++ % emoji.length;
  return emoji[index];
}
