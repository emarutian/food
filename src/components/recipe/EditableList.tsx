"use client";

import { Plus, Trash2, GripVertical } from "lucide-react";

interface EditableListProps {
  items: string[];
  onChange: (items: string[]) => void;
  placeholder?: string;
  numbered?: boolean;
}

export function EditableList({
  items,
  onChange,
  placeholder = "Enter item...",
  numbered = false,
}: EditableListProps) {
  const handleItemChange = (index: number, value: string) => {
    const newItems = [...items];
    newItems[index] = value;
    onChange(newItems);
  };

  const handleAddItem = () => {
    onChange([...items, ""]);
  };

  const handleRemoveItem = (index: number) => {
    if (items.length <= 1) return; // Keep at least one item
    const newItems = items.filter((_, i) => i !== index);
    onChange(newItems);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLTextAreaElement>,
    index: number
  ) => {
    // Enter adds a new item below
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const newItems = [...items];
      newItems.splice(index + 1, 0, "");
      onChange(newItems);
      // Focus the new item after render
      setTimeout(() => {
        const inputs = document.querySelectorAll<HTMLTextAreaElement>(
          '[data-editable-list-item]'
        );
        inputs[index + 1]?.focus();
      }, 0);
    }
    // Backspace on empty item removes it
    if (e.key === "Backspace" && items[index] === "" && items.length > 1) {
      e.preventDefault();
      handleRemoveItem(index);
      // Focus the previous item
      setTimeout(() => {
        const inputs = document.querySelectorAll<HTMLTextAreaElement>(
          '[data-editable-list-item]'
        );
        inputs[Math.max(0, index - 1)]?.focus();
      }, 0);
    }
  };

  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div key={index} className="flex items-start gap-2 group">
          {/* Drag handle (visual only for now) */}
          <div className="mt-3 text-charcoal-light opacity-0 group-hover:opacity-50 cursor-grab">
            <GripVertical className="h-4 w-4" />
          </div>

          {/* Number or bullet */}
          {numbered ? (
            <span className="flex-shrink-0 w-7 h-7 mt-2 rounded-full bg-primary text-white text-sm font-semibold flex items-center justify-center">
              {index + 1}
            </span>
          ) : (
            <span className="w-2 h-2 rounded-full bg-primary mt-4 flex-shrink-0" />
          )}

          {/* Text input */}
          <textarea
            data-editable-list-item
            value={item}
            onChange={(e) => handleItemChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            placeholder={placeholder}
            rows={1}
            className="flex-1 px-3 py-2 rounded-lg border border-parchment-dark bg-white
                       focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                       resize-none overflow-hidden text-charcoal"
            style={{ minHeight: "40px" }}
            onInput={(e) => {
              // Auto-resize textarea
              const target = e.target as HTMLTextAreaElement;
              target.style.height = "auto";
              target.style.height = target.scrollHeight + "px";
            }}
          />

          {/* Remove button */}
          <button
            type="button"
            onClick={() => handleRemoveItem(index)}
            disabled={items.length <= 1}
            className="mt-2 p-2 text-charcoal-light hover:text-primary disabled:opacity-30
                       disabled:cursor-not-allowed transition-colors"
            title="Remove item"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ))}

      {/* Add button */}
      <button
        type="button"
        onClick={handleAddItem}
        className="flex items-center gap-2 px-4 py-2 text-sm text-primary hover:text-primary-dark
                   hover:bg-primary/5 rounded-lg transition-colors"
      >
        <Plus className="h-4 w-4" />
        Add {numbered ? "step" : "item"}
      </button>
    </div>
  );
}
