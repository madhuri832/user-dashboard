import { useEffect, useState } from "react";

export default function SearchBar({ onSearch }) {
  const [text, setText] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(text);
    }, 300);

    return () => clearTimeout(timer);
  }, [text, onSearch]);

  return (
    <div className="relative w-full">
      <span className="absolute left-3 top-3">🔍</span>

      <input
        type="text"
        placeholder="Search by name or email..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full border rounded-lg py-2 pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {text && (
        <button
          onClick={() => {
            setText("");
            onSearch("");
          }}
          className="absolute right-3 top-2"
        >
          ✖
        </button>
      )}
    </div>
  );
}