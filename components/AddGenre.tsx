'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Modal } from './Modal';
import { Button } from './Button';
import { GenreManager } from './GenreManager';
import { Genre } from '@/types';

interface AddGenreProps {
  onGenreAdd: (genre: Omit<Genre, 'id'>) => void;
  genres: Genre[];
}

export const AddGenre = ({ onGenreAdd, genres }: AddGenreProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleGenreAdd = (genre: Omit<Genre, 'id'>) => {
    onGenreAdd(genre);
  };

  return (
    <>
      <Button variant="secondary" onClick={() => setIsModalOpen(true)}>
        <Plus className="-ml-1 mr-2 h-5 w-5" />
        Manage Genres
      </Button>
      <Modal open={isModalOpen} onOpenChange={setIsModalOpen} title="Manage Genres">
        <GenreManager onGenreAdd={handleGenreAdd} genres={genres} />
      </Modal>
    </>
  );
};
