
import React, { useState, useRef, useEffect } from "react";
import { X, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";

interface TagInputProps {
  tags?: string[];
  onTagsChange?: (tags: string[]) => void;
  placeholder?: string;
  suggestions?: string[];
  value?: string;
  onChange?: (value: string) => void;
}

const TagInput: React.FC<TagInputProps> = ({
  tags: propTags,
  onTagsChange,
  placeholder = "Adicione um item e pressione Enter",
  suggestions = [],
  value = "",
  onChange
}) => {
  const [tags, setTags] = useState<string[]>(propTags || []);
  const [inputValue, setInputValue] = useState(value || "");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Handle direct value/onChange props (string-based usage)
  useEffect(() => {
    if (value !== undefined && value !== inputValue) {
      setInputValue(value);
    }
  }, [value]);

  // Handle tags prop changes
  useEffect(() => {
    if (propTags) {
      setTags(propTags);
    }
  }, [propTags]);

  // Filter suggestions based on input
  useEffect(() => {
    if (inputValue.trim() === "") {
      setFilteredSuggestions([]);
      return;
    }

    const filtered = suggestions.filter(
      (suggestion) =>
        suggestion.toLowerCase().includes(inputValue.toLowerCase()) &&
        !tags.includes(suggestion)
    );
    
    setFilteredSuggestions(filtered);
  }, [inputValue, suggestions, tags]);

  // Handle click outside suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current !== event.target
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    setShowSuggestions(true);
    
    if (onChange) {
      onChange(newValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      e.preventDefault();
      addTag(inputValue.trim());
    } else if (e.key === "Backspace" && inputValue === "" && tags.length > 0) {
      // Remove last tag when backspace is pressed and input is empty
      const newTags = [...tags];
      newTags.pop();
      updateTags(newTags);
    }
  };

  const addTag = (tag: string) => {
    const normalizedTag = tag.trim();
    
    if (normalizedTag === "" || tags.includes(normalizedTag)) {
      return;
    }
    
    const newTags = [...tags, normalizedTag];
    updateTags(newTags);
    setInputValue("");
    setShowSuggestions(false);
  };

  const removeTag = (tagToRemove: string) => {
    const newTags = tags.filter((tag) => tag !== tagToRemove);
    updateTags(newTags);
  };

  const updateTags = (newTags: string[]) => {
    setTags(newTags);
    if (onTagsChange) {
      onTagsChange(newTags);
    }
    
    if (onChange) {
      onChange(newTags.join(','));
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    addTag(suggestion);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-2 p-2 border rounded-md bg-background min-h-10">
        {tags.map((tag) => (
          <div
            key={tag}
            className="flex items-center gap-1 bg-secondary text-secondary-foreground px-2 py-1 rounded-md"
          >
            <span className="text-sm">{tag}</span>
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="text-secondary-foreground/70 hover:text-secondary-foreground"
            >
              <X size={14} />
            </button>
          </div>
        ))}
        <div className="relative flex-1 min-w-[120px]">
          <Input
            ref={inputRef}
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setShowSuggestions(true)}
            className="border-0 shadow-none focus-visible:ring-0 min-w-[120px] h-8 p-1"
            placeholder={tags.length > 0 ? "" : placeholder}
          />
          
          {/* Suggestions dropdown */}
          {showSuggestions && filteredSuggestions.length > 0 && (
            <div
              ref={suggestionsRef}
              className="absolute z-10 mt-1 w-full bg-popover border rounded-md shadow-md"
            >
              {filteredSuggestions.map((suggestion) => (
                <div
                  key={suggestion}
                  className="px-3 py-2 cursor-pointer hover:bg-accent text-sm flex items-center gap-1"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <Plus size={14} />
                  {suggestion}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TagInput;
