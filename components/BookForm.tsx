'use client';

import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Book, Publisher, Genre } from '@/types';
import { Input } from './Input';
import { Textarea } from './Textarea';
import { Button } from './Button';

import { Select } from './Select';
import { FileInput } from './FileInput';

/* const genres = [
  { value: 'fiction', label: 'Fiction' },
  { value: 'non-fiction', label: 'Non-Fiction' },
  { value: 'fantasy', label: 'Fantasy' },
  { value: 'science-fiction', label: 'Science Fiction' },
  { value: 'mystery', label: 'Mystery' },
  { value: 'romance', label: 'Romance' },
  { value: 'horror', label: 'Horror' },
  { value: 'biography', label: 'Biography' },
]; */

const bookSchema = z.object({
  status: z.enum(['wishlist', 'library']),

  title: z.string().min(1, 'Title is required'),
  author: z.string().min(1, 'Author is required'),
  genre: z.string().optional(),
  publisher: z.string().optional(),
  picture: z.string().optional(),
  pages: z.number().positive('Pages must be a positive number'),
  description: z.string().min(1, 'Description is required'),
  comment: z.string().optional(),
});

type BookFormData = z.infer<typeof bookSchema>;

interface BookFormProps {
  onFormSubmit: (data: Omit<Book, 'id'>) => void;
  onCancel: () => void;
  publishers: Publisher[];
  genres: Genre[];
  initialData?: Book | null;
}

export const BookForm = ({ onFormSubmit, onCancel, publishers, genres, initialData }: BookFormProps) => {
  const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm<BookFormData>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      status: 'wishlist',
    },
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const onSubmit = (data: BookFormData) => {
    onFormSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h2 className="font-serif text-3xl font-bold text-center text-[#1a1a1a]">
        {initialData ? 'Edit Book' : 'Add a New Book'}
      </h2>
      {!initialData && (
        <Select
          id="status"
          label="Add to"
          options={[
            { value: 'wishlist', label: 'Wishlist' },
            { value: 'library', label: 'My Library' },
          ]}
          {...register('status')}
          error={errors.status?.message}
        />
      )}
      <Input
        id="title"
        label="Title"
        required
        {...register('title')}
        error={errors.title?.message}
      />
      <Input
        id="author"
        label="Author"
        required
        {...register('author')}
        error={errors.author?.message}
      />
      <Select
        id="genre"
        label="Genre"
        placeholder="Select a genre"
        options={genres.map(g => ({ value: g.name, label: g.name }))}
        {...register('genre')}
        error={errors.genre?.message}
      />
      <Select
        id="publisher"
        label="Publisher"
        placeholder="Select a publisher"
        options={publishers.map(p => ({ value: p.name, label: p.name }))}
        {...register('publisher')}
        error={errors.publisher?.message}
      />
      <Input
        id="pages"
        label="Pages"
        required
        type="number"
        {...register('pages', { valueAsNumber: true })}
        error={errors.pages?.message}
      />
      <Textarea
        id="description"
        label="Description"
        required
        {...register('description')}
        error={errors.description?.message}
      />
      <Textarea
        id="comment"
        label="Comment"
        {...register('comment')}
        error={errors.comment?.message}
      />
      <FileInput
        label="Book picture"
        onFileSelect={(fileData) => setValue('picture', fileData)}
      />
      <div className="flex justify-end space-x-4">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">{initialData ? 'Save Changes' : 'Add Book'}</Button>
      </div>
    </form>
  );
};