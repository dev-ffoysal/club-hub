'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from './button';
import { ChevronDown } from 'lucide-react';
import { extractId, extractName } from '@/lib/utils/dataTransformers';

interface UniversityDropdownProps {
  selectedUniversities: string[];
  onSelectionChange: (universities: string[]) => void;
  universities: any[]; // Can be array of strings or objects with _id and name
}

/**
 * Enhanced UniversityDropdown component that can handle both string arrays and object arrays
 * This component extracts the ID and name from objects and uses them for value and display
 */
export function UniversityDropdown({ 
  selectedUniversities, 
  onSelectionChange, 
  universities 
}: UniversityDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Ensure universities is an array
  const safeUniversities = Array.isArray(universities) ? universities : [];

  const toggleUniversity = (university: any) => {
    const universityId = extractId(university);
    
    if (selectedUniversities.includes(universityId)) {
      onSelectionChange(selectedUniversities.filter(u => u !== universityId));
    } else {
      onSelectionChange([...selectedUniversities, universityId]);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full justify-between text-left"
      >
        <span className="truncate">
          {selectedUniversities.length === 0
            ? 'Select Universities'
            : `${selectedUniversities.length} selected`}
        </span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </Button>
      
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-background border rounded-md shadow-lg max-h-60 overflow-auto">
          {safeUniversities.map(university => {
            const id = extractId(university);
            const name = extractName(university);
            return (
              <div
                key={id}
                className="flex items-center px-3 py-2 hover:bg-muted cursor-pointer"
                onClick={() => toggleUniversity(university)}
              >
                <input
                  type="checkbox"
                  checked={selectedUniversities.includes(id)}
                  onChange={() => toggleUniversity(university)}
                  className="mr-2"
                />
                <span className="text-sm">{name}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}