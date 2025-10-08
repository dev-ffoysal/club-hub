'use client';

import React from 'react';
import { extractId, extractName } from '@/lib/utils/dataTransformers';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';

interface SelectWrapperProps {
  value: string;
  onValueChange: (value: string) => void;
  placeholder: string;
  items: any[];
  className?: string;
  disabled?: boolean;
}

/**
 * A wrapper around the Select component that handles objects with _id properties
 * This component extracts the ID and name from objects and uses them for value and display
 */
export function SelectWrapper({
  value,
  onValueChange,
  placeholder,
  items,
  className,
  disabled
}: SelectWrapperProps) {
  // Ensure items is an array
  const safeItems = Array.isArray(items) ? items : [];
  
  return (
    <Select
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
    >
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {safeItems.map((item) => {
          const id = extractId(item);
          const name = extractName(item);
          return (
            <SelectItem key={id} value={id}>
              {name}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}

interface MultiSelectWrapperProps {
  selectedValues: string[];
  onSelectionChange: (values: string[]) => void;
  placeholder: string;
  items: any[];
  className?: string;
  disabled?: boolean;
}

/**
 * A wrapper for multi-select functionality that handles objects with _id properties
 * This component extracts the ID and name from objects and uses them for value and display
 */
export function MultiSelectWrapper({
  selectedValues,
  onSelectionChange,
  placeholder,
  items,
  className,
  disabled
}: MultiSelectWrapperProps) {
  // Ensure items is an array
  const safeItems = Array.isArray(items) ? items : [];
  
  // Function to toggle selection of an item
  const toggleSelection = (id: string) => {
    if (selectedValues.includes(id)) {
      onSelectionChange(selectedValues.filter(v => v !== id));
    } else {
      onSelectionChange([...selectedValues, id]);
    }
  };
  
  return (
    <div className={`relative ${className || ''}`}>
      <button
        type="button"
        className="w-full px-3 py-2 text-left border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={() => {}}
        disabled={disabled}
      >
        {selectedValues.length === 0 ? placeholder : `${selectedValues.length} selected`}
      </button>
      
      <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
        {safeItems.map((item) => {
          const id = extractId(item);
          const name = extractName(item);
          return (
            <div
              key={id}
              className="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => toggleSelection(id)}
            >
              <input
                type="checkbox"
                checked={selectedValues.includes(id)}
                onChange={() => toggleSelection(id)}
                className="mr-2"
              />
              <span>{name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}