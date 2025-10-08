'use client';

import React, { useState, useMemo } from 'react';
import DOMPurify from 'dompurify';
import { Button } from './button';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ExpandableTextProps {
  text: string;
  wordLimit?: number;
  className?: string;
}

export function ExpandableText({
  text,
  wordLimit = 100,
  className = '',
}: ExpandableTextProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const { truncatedText, needsTruncation, wordCount } = useMemo(() => {
    // Convert to plain text *only* for counting and truncating
    const plainText = text.replace(/<[^>]+>/g, '').trim();
    const words = plainText.split(/\s+/).filter(Boolean);

    const needsTruncation = words.length > wordLimit;
    const truncatedText = needsTruncation
      ? words.slice(0, wordLimit).join(' ') + '…'
      : plainText;

    return { truncatedText, needsTruncation, wordCount: words.length };
  }, [text, wordLimit]);

  if (!text || text.trim() === '') return null;

  return (
    <div className={className}>
      <div
        className="text-gray-700 leading-relaxed prose"
        // When expanded, render sanitized HTML.
        // When collapsed, show plain truncated text.
        dangerouslySetInnerHTML={{
          __html: isExpanded
            ? DOMPurify.sanitize(text)
            : DOMPurify.sanitize(truncatedText),
        }}
      />

      {needsTruncation && (
        <div className="mt-2 flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded((prev) => !prev)}
            className="h-auto p-0 text-blue-600 hover:text-blue-800 font-medium"
          >
            {isExpanded ? (
              <>
                Show less <ChevronUp className="ml-1 h-4 w-4" />
              </>
            ) : (
              <>
                Show more ({wordCount - wordLimit} more words)
                <ChevronDown className="ml-1 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
