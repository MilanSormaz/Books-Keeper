import { Book } from '@/types';
import { BookCard } from './BookCard';

import { Trash2 } from 'lucide-react';

interface BookListProps {
  books: Book[];
  onBookEdit: (book: Book) => void;
  onBookDelete: (bookId: string) => void;
  onMoveToLibrary?: (bookId: string) => void;
}

export const BookList = ({ books, onBookEdit, onMoveToLibrary, onBookDelete }: BookListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {books.map((book) => (
        <BookCard key={book.id} book={book} onEdit={onBookEdit} onMoveToLibrary={onMoveToLibrary} onBookDelete={onBookDelete} />
      ))}
    </div>
  );
};