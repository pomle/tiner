export const emoji = [
  "🍔",
  "🥔",
  "🥕",
  "🌽",
  "🥬",
  "🥦",
  "🧄",
  "🧅",
  "🍞",
  "🥐",
  "🥖",
  "🧇",
  "🍗",
  "🥩",
  "🥓",
  "🍕",
  "🌮",
  "🥚",
  "🍳",
  "🥘",
  "🍲",
  "🍚",
  "🍜",
  "🍤",
  "🥠",
];

export function random() {
  const index = Math.floor(Math.random() * emoji.length);
  return emoji[index];
}
