"use client";

interface DifficultyFilterProps {
  selected: string | null;
  onSelect: (difficulty: string | null) => void;
}

const difficulties = [
  { value: "Easy", color: "bg-sage hover:bg-sage-dark" },
  { value: "Medium", color: "bg-honey hover:bg-honey-dark" },
  { value: "Hard", color: "bg-terracotta hover:bg-terracotta-dark" },
];

export function DifficultyFilter({ selected, onSelect }: DifficultyFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onSelect(null)}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          selected === null
            ? "bg-charcoal text-white"
            : "bg-parchment-dark text-charcoal hover:bg-charcoal hover:text-white"
        }`}
      >
        All
      </button>
      {difficulties.map((diff) => (
        <button
          key={diff.value}
          onClick={() => onSelect(diff.value)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selected === diff.value
              ? `${diff.color} text-white`
              : "bg-parchment-dark text-charcoal hover:bg-charcoal hover:text-white"
          }`}
        >
          {diff.value}
        </button>
      ))}
    </div>
  );
}
