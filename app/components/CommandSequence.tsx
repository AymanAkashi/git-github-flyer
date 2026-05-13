'use client'

import { useEffect, useState } from 'react';

type Part = { text: string; className?: string };

type CommandSequenceProps = {
  commands: Part[][];
  speed?: number;
  hold?: number;
  loop?: boolean;
  prompt?: string;
};

function getCommandText(parts: Part[]) {
  return parts.map((part) => part.text).join('');
}

function renderParts(parts: Part[], visibleChars: number) {
  let consumed = 0;

  return parts.map((part, index) => {
    const start = consumed;
    const end = start + part.text.length;
    consumed = end;
    const visible = Math.max(0, Math.min(part.text.length, visibleChars - start));

    return (
      <span key={index} className={part.className ?? ''}>
        {part.text.slice(0, visible)}
      </span>
    );
  });
}

export default function CommandSequence({
  commands,
  speed = 35,
  hold = 900,
  loop = true,
  prompt = '$ ',
}: CommandSequenceProps) {
  const [commandIndex, setCommandIndex] = useState(0);
  const [visibleChars, setVisibleChars] = useState(0);

  useEffect(() => {
    if (commands.length === 0) return;

    const currentParts = commands[commandIndex] ?? [];
    const currentLength = getCommandText(currentParts).length;

    if (!loop && commandIndex === commands.length - 1 && visibleChars >= currentLength) {
      return;
    }

    const timer = setTimeout(() => {
      if (visibleChars < currentLength) {
        setVisibleChars((current) => current + 1);
        return;
      }

      setVisibleChars(0);
      setCommandIndex((current) => {
        const next = current + 1;
        if (next >= commands.length) {
          return loop ? 0 : current;
        }

        return next;
      });
    }, visibleChars < currentLength ? speed : hold);

    return () => clearTimeout(timer);
  }, [commands, commandIndex, hold, loop, speed, visibleChars]);

  return (
    <div className="command-sequence">
      {commands.map((parts, index) => {
        const isComplete = index < commandIndex;
        const isActive = index === commandIndex;
        const visibleCharsForLine = isComplete
          ? getCommandText(parts).length
          : isActive
            ? visibleChars
            : 0;
        const isHidden = index > commandIndex;

        return (
          <div key={index} className="command-line" aria-hidden={isHidden}>
            <span className="prompt">{prompt}</span>
            <span className={isHidden ? 'command-line-hidden' : ''}>
              {renderParts(parts, visibleCharsForLine)}
            </span>
          </div>
        );
      })}
    </div>
  );
}