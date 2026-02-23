'use client';

import { Book, BookStatus } from '@/types';
import { motion } from 'motion/react';
import Image from 'next/image';
import { Button } from './Button';
import { Pencil, ArrowRight, Trash2 } from 'lucide-react';

interface BookCardProps {
  book: Book;
  onEdit: (book: Book) => void;
  onBookDelete: (bookId: string) => void;
  onMoveToLibrary?: (bookId: string) => void;
}

export const BookCard = ({ book, onEdit, onMoveToLibrary, onBookDelete }: BookCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-3xl shadow-sm overflow-hidden flex flex-col"
    >
      {book.picture && (
        <div className="h-48 w-full relative">
          <Image src={book.picture} alt={book.title} layout="fill" className="object-cover" />
        </div>
      )}
      <div className="p-6 space-y-4 flex-grow flex flex-col">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="font-serif text-2xl font-semibold text-[#1a1a1a]">{book.title}</h2>
            <p className="text-lg text-[#5A5A40]">{book.author}</p>
            {book.genre && <p className="text-sm text-gray-500">{book.genre}</p>}
            {book.publisher && <p className="text-sm text-gray-500">{book.publisher}</p>}
          </div>
          <div className="flex space-x-2">
            <Button variant="secondary" onClick={() => onBookDelete(book.id)} className="shrink-0">
              <Trash2 className="h-5 w-5" />
            </Button>
            <Button variant="secondary" onClick={() => onEdit(book)} className="shrink-0">
              <Pencil className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <div className="flex-grow space-y-4">
          <div>
            <h3 className="font-semibold text-gray-800">Pages</h3>
            <p className="text-gray-600">{book.pages} pages</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">Description</h3>
            <p className="text-gray-600 line-clamp-3">{book.description}</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">Comment</h3>
            <p className="text-gray-600 italic">{book.comment}</p>
          </div>
        </div>
        {book.status === 'wishlist' && onMoveToLibrary && (
          <div className="mt-auto pt-4">
            <Button onClick={() => onMoveToLibrary(book.id)} className="w-full" variant="success">
              <ArrowRight className="-ml-1 mr-2 h-5 w-5" />
              Move to My Library
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );
};