"use client";

import { useState } from "react";

interface CaptionInputProps {
  onSubmit: (caption: { text: string; start: number; end: number }) => void;
}

export default function CaptionInput({ onSubmit }: CaptionInputProps) {
  const [text, setText] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({
      text,
      start: parseFloat(start),
      end: parseFloat(end),
    });
    setText("");
    setStart("");
    setEnd("");
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter caption text"
        className="w-full p-2 border rounded text-black"
        required
      />
      <div className="flex gap-2 mt-2">
        <input
          type="number"
          value={start}
          onChange={(e) => setStart(e.target.value)}
          placeholder="Start time (seconds)"
          className="flex-1 p-2 border rounded text-black"
          step="1"
          min="0"
          required
        />
        <input
          type="number"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
          placeholder="End time (seconds)"
          className="flex-1 p-2 border rounded text-black"
          step="1"
          min="0"
          required
        />
      </div>
      <button
        type="submit"
        className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
      >
        Add Caption
      </button>
    </form>
  );
}
