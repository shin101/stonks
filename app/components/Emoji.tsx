export const EMOJIS: Record<string, string> = {
  ":stonk:": "📈",
  ":lol:": "😂",
  ":moon:": "🌕",
  ":trash:": "🚮",
  ":idk:": "🤷🏻‍♀️",
  ":ded:": "💀",
  ":omg:": "🙀",
  ":look:": "👀",
  ":sad:": "🥲",
  ":heh:": "😈",
  ":pls:": "🥺",
  ":wave:": "👋",
  ":party:": "🥳",
  ":heart:": "💖",
  ":gme:": "🚀",
  ":ape:": "🐵",
};

export const REVERSED_EMOJIS = Object.fromEntries(
  Object.entries(EMOJIS).map(([k, v]) => [v, k])
);

interface EmojiModalProps {
  addSelectedEmoji: (tag: string) => void;
  text: string;
}

export const EmojiModal = ({ addSelectedEmoji, text }: EmojiModalProps) => {
  const idx = text.indexOf(":");
  text = text.slice(idx);

  const filteredEmojis = Object.fromEntries(
    Object.entries(EMOJIS).filter(([k]) => {
      return k.includes(text.toLowerCase());
    })
  );

  return (
    <div className="w-40 h-44 border rounded-md p-2 overflow-scroll ">
      <div className="flex gap-2 flex-wrap ">
        {Object.entries(filteredEmojis).map(([tag, emoji], idx) => (
          <button
            key={idx}
            className="hover:bg-gray-200 p-1 rounded-md"
            onClick={() => addSelectedEmoji(tag)}
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
};
