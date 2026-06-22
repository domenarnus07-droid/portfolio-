"use client";

// Preprost "typewriter" učinek — tipka in briše besede iz seznama v zanki.
import { useEffect, useState } from "react";

export function Typewriter({
  words,
  className = "",
}: {
  words: string[];
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[index % words.length];
    // Hitrost: tipkanje 90ms, brisanje 45ms, premor na koncu besede.
    let delay = deleting ? 45 : 90;

    if (!deleting && text === current) {
      delay = 1400; // premor, ko je beseda izpisana
    } else if (deleting && text === "") {
      setDeleting(false);
      setIndex((i) => i + 1);
      delay = 250;
    }

    const t = setTimeout(() => {
      if (!deleting && text === current) {
        setDeleting(true);
      } else {
        const next = deleting
          ? current.slice(0, text.length - 1)
          : current.slice(0, text.length + 1);
        setText(next);
      }
    }, delay);

    return () => clearTimeout(t);
  }, [text, deleting, index, words]);

  return (
    <span className={className} aria-live="polite">
      {text}
      <span className="ml-0.5 inline-block w-0.5 animate-pulse bg-current align-middle" style={{ height: "1em" }} />
    </span>
  );
}
