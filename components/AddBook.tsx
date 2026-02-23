'use client';

import { useState } from 'react';
import { Book, Publisher, Genre } from '@/types';
import { Modal } from './Modal';
import { BookForm } from './BookForm';
import { Button } from './Button';

interface AddBookProps {
  onBookAdd: (book: Omit<Book, 'id'>) => void;
  publishers: Publisher[];
  genres: Genre[];
}

export const AddBook = ({ onBookAdd, publishers, genres }: AddBookProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFormSubmit = (data: Omit<Book, 'id'>) => {
    onBookAdd(data);
    setIsModalOpen(false);
  };

  return (
    <div>
      <Button onClick={() => setIsModalOpen(true)}>Add Book</Button>
      <Modal open={isModalOpen} onOpenChange={setIsModalOpen}>
        <BookForm onFormSubmit={handleFormSubmit} onCancel={() => setIsModalOpen(false)} publishers={publishers} genres={genres} />
      </Modal>
    </div>
  );
};
