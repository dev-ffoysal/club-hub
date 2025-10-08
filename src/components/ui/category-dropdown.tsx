'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from './button';
import { ChevronDown } from 'lucide-react';
import { extractId, extractName } from '@/lib/utils/dataTransformers';

interface CategoryDropdownProps {
  selectedCategories: string[];
  onSelectionChange: (categories: string[]) => void;
  categories: any[]; // Can be array of strings or objects with _id and title/name
}

/**
 * Enhanced CategoryDropdown component that can handle both string arrays and object arrays
 * This component extracts the ID and name from objects and uses them for value and display
 */
export function CategoryDropdown({ 
  selectedCategories, 
  onSelectionChange, 
  categories 
}: CategoryDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Ensure categories is an array
  const safeCategories = Array.isArray(categories) ? categories : [];

  const toggleCategory = (category: any) => {
    const categoryId = extractId(category);
    
    if (selectedCategories.includes(categoryId)) {
      onSelectionChange(selectedCategories.filter(c => c !== categoryId));
    } else {
      onSelectionChange([...selectedCategories, categoryId]);
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
          {selectedCategories.length === 0
            ? 'Select Categories'
            : `${selectedCategories.length} selected`}
        </span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </Button>
      
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-background border rounded-md shadow-lg max-h-60 overflow-auto">
          {safeCategories.map(category => {
            const id = extractId(category);
            const name = extractName(category);
            return (
              <div
                key={id}
                className="flex items-center px-3 py-2 hover:bg-muted cursor-pointer"
                onClick={() => toggleCategory(category)}
              >
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(id)}
                  onChange={() => toggleCategory(category)}
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