'use client'

import React, { useEffect, useState } from 'react';

type Part = { text: string; className?: string };

interface TypewriterProps {
  parts: Part[];
  speed?: number; // ms per character
  loop?: boolean;
}

export default function Typewriter({ parts, speed = 35, loop = false }: TypewriterProps) {
  const fullText = parts.map((p) => p.text).join('');
  const [pos, setPos] = useState(0);

  useEffect(() => {
    let mounted = true;
    if (!mounted) return;
    if (pos >= fullText.length && !loop) return;

    const timer = setInterval(() => {
      setPos((prev) => {
        if (prev >= fullText.length) {
          if (loop) return 0;
          clearInterval(timer);
          return prev;
        }
        return prev + 1;
      });
    }, speed);

    return () => {
      mounted = false;
      clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fullText, speed, loop]);

  // Render each part with only the portion that should be visible
  let acc = 0;
  const rendered = parts.map((part, idx) => {
    const start = acc;
    const end = acc + part.text.length;
    acc = end;
    const visible = Math.max(0, Math.min(part.text.length, pos - start));
    const textToShow = part.text.slice(0, visible);
    return (
      <span key={idx} className={part.className ?? ''}>
        {textToShow}
      </span>
    );
  });

  return (
    <span className="typewriter" aria-live="polite">
      {rendered}
      <span className="caret" aria-hidden="true" />
    </span>
  );
}
