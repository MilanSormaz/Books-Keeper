'use client';

import { SortKey, SortDirection } from '@/types';
import { Select } from './Select';
import { Button } from './Button';
import { ArrowDown, ArrowUp } from 'lucide-react';

interface SortControlProps {
  sortKey: SortKey;
  sortDirection: SortDirection;
  onSortKeyChange: (key: SortKey) => void;
  onSortDirectionChange: (direction: SortDirection) => void;
}

const sortOptions = [
  { value: 'title', label: 'Title' },
  { value: 'author', label: 'Author' },
];

export const SortControl = ({ sortKey, sortDirection, onSortKeyChange, onSortDirectionChange }: SortControlProps) => {
  const toggleDirection = () => {
    onSortDirectionChange(sortDirection === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="flex flex-col md:flex-row items-stretch md:items-center space-y-4 md:space-y-0 md:space-x-4 mb-6">
      <Select
        id="sort-key"
        label="Sort by"
        options={sortOptions}
        value={sortKey}
        onChange={(e) => onSortKeyChange(e.target.value as SortKey)}
        className="w-48"
      />
      <Button variant="secondary" onClick={toggleDirection} className="flex items-center">
        {sortDirection === 'asc' ? <ArrowUp className="h-5 w-5" /> : <ArrowDown className="h-5 w-5" />}
        <span className="ml-2">{sortDirection === 'asc' ? 'Asc' : 'Desc'}</span>
      </Button>
    </div>
  );
};
