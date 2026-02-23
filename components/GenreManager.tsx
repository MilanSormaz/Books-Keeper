'use client';

import { useState } from 'react';
import { Genre } from '@/types';
import { Input } from './Input';
import { Button } from './Button';

interface GenreManagerProps {
  onGenreAdd: (genre: Omit<Genre, 'id'>) => void;
  genres: Genre[];
}

export const GenreManager = ({ onGenreAdd, genres }: GenreManagerProps) => {
  const [newGenre, setNewGenre] = useState('');

  const handleAddGenre = () => {
    if (newGenre.trim() !== '') {
      onGenreAdd({ name: newGenre.trim() });
      setNewGenre('');
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="font-serif text-3xl font-bold text-center text-[#1a1a1a]">Manage Genres</h2>
      <div className="flex items-center space-x-4">
        <Input
          id="new-genre"
          label="New Genre"
          value={newGenre}
          onChange={(e) => setNewGenre(e.target.value)}
        />
        <Button onClick={handleAddGenre}>Add</Button>
      </div>
      <div className="space-y-2">
        <h3 className="font-semibold text-gray-800">Existing Genres</h3>
        <ul className="list-disc list-inside">
          {genres.map((genre) => (
            <li key={genre.id}>{genre.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
