'use client';

import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Header } from '@/components/Header';
import { Container } from '@/components/Container';
import { BookList } from '@/components/BookList';
import { AddBook } from '@/components/AddBook';
import { AddPublisher } from '@/components/AddPublisher';
import { AddGenre } from '@/components/AddGenre';
import { Book, Publisher, Genre, SortKey, SortDirection } from '@/types';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Book as BookIcon, Heart as HeartIcon } from 'lucide-react';
import { Sidebar } from '@/components/Sidebar';
import { Modal } from '@/components/Modal';
import { BookForm } from '@/components/BookForm';
import { SortControl } from '@/components/SortControl';

export default function DashboardPage() {
  const [books, setBooks] = useLocalStorage<Book[]>('books', []);
  const [publishers, setPublishers] = useLocalStorage<Publisher[]>('publishers', []);
  const [genres, setGenres] = useLocalStorage<Genre[]>('genres', []);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [activeView, setActiveView] = useState<'wishlist' | 'library'>('wishlist');
  const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: SortDirection }>({ key: 'title', direction: 'asc' });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleGenreAdd = (genre: Omit<Genre, 'id'>) => {
    const newGenre = { ...genre, id: uuidv4() };
    setGenres([newGenre, ...genres]);
  };

  const handlePublisherAdd = (publisher: Omit<Publisher, 'id'>) => {
    const newPublisher = { ...publisher, id: uuidv4() };
    setPublishers([newPublisher, ...publishers]);
  };

  const handleBookAdd = (book: Omit<Book, 'id'>) => {
    const newBook = { ...book, id: uuidv4() };
    setBooks([newBook, ...books]);
  };

  const handleBookUpdate = (updatedBook: Omit<Book, 'id'>) => {
    if (!editingBook) return;
    setBooks(
      books.map((book) => (book.id === editingBook.id ? { ...editingBook, ...updatedBook } : book))
    );
    setEditingBook(null);
  };

  const handleBookDelete = async (bookId: string) => {
    try {
      const response = await fetch(`/api/books/${bookId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setBooks(books.filter((book) => book.id !== bookId));
      } else {
        // Handle error - maybe show a toast notification
        console.error('Failed to delete book');
      }
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const handleMoveToLibrary = (bookId: string) => {
    setBooks(
      books.map((book) => (book.id === bookId ? { ...book, status: 'library' } : book))
    );
  };

  const wishlistBooks = books.filter((book) => book.status === 'wishlist');
  const libraryBooks = books.filter((book) => book.status === 'library');

  const sortedBooks = (bookList: Book[]) => {
    return [...bookList].sort((a, b) => {
      const aValue = a[sortConfig.key] || '';
      const bValue = b[sortConfig.key] || '';

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  };

  const sortedWishlistBooks = sortedBooks(wishlistBooks);
  const sortedLibraryBooks = sortedBooks(libraryBooks);

  return (
    <div className="flex min-h-screen bg-stone-50">
      <div className="hidden lg:block w-1/5 h-screen fixed top-0 left-0">
        <Sidebar activeView={activeView} setActiveView={setActiveView} />
      </div>

      <main className="w-full lg:w-4/5 lg:ml-[20%]">
        <Header
          addBookSlot={<AddBook onBookAdd={handleBookAdd} publishers={publishers} genres={genres} />}
          addPublisherSlot={<AddPublisher onPublisherAdd={handlePublisherAdd} publishers={publishers} />}
          addGenreSlot={<AddGenre onGenreAdd={handleGenreAdd} genres={genres} />}
          onMenuClick={() => setIsSidebarOpen(true)}
        />
        <Container>
          <div className="py-12">
            {activeView === 'wishlist' && (
              <div>
                <div className="flex flex-col md:flex-row justify-between md:items-center mb-6">
                  <h2 className="font-serif text-3xl font-bold text-[#1a1a1a]">Wishlist</h2>
                  <SortControl 
                    sortKey={sortConfig.key}
                    sortDirection={sortConfig.direction}
                    onSortKeyChange={(key) => setSortConfig({ ...sortConfig, key })}
                    onSortDirectionChange={(direction) => setSortConfig({ ...sortConfig, direction })}
                  />
                </div>
                {wishlistBooks.length > 0 ? (
                  <BookList books={sortedWishlistBooks} onBookEdit={setEditingBook} onMoveToLibrary={handleMoveToLibrary} onBookDelete={handleBookDelete} />
                ) : (
                  <div className="text-center py-24">
                    <HeartIcon className="mx-auto h-24 w-24 text-gray-300" />
                    <h2 className="mt-6 text-2xl font-semibold text-gray-800">Your wishlist is empty</h2>
                    <p className="mt-2 text-lg text-gray-600">Add a book to your wishlist to get started.</p>
                  </div>
                )}
              </div>
            )}

            {activeView === 'library' && (
              <div>
                <div className="flex flex-col md:flex-row justify-between md:items-center mb-6">
                  <h2 className="font-serif text-3xl font-bold text-[#1a1a1a]">My Library</h2>
                  <SortControl 
                    sortKey={sortConfig.key}
                    sortDirection={sortConfig.direction}
                    onSortKeyChange={(key) => setSortConfig({ ...sortConfig, key })}
                    onSortDirectionChange={(direction) => setSortConfig({ ...sortConfig, direction })}
                  />
                </div>
                {libraryBooks.length > 0 ? (
                  <BookList books={sortedLibraryBooks} onBookEdit={setEditingBook} onBookDelete={handleBookDelete} />
                ) : (
                  <div className="text-center py-24">
                    <BookIcon className="mx-auto h-24 w-24 text-gray-300" />
                    <h2 className="mt-6 text-2xl font-semibold text-gray-800">Your library is empty</h2>
                    <p className="mt-2 text-lg text-gray-600">Add your first book to get started.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </Container>
        {editingBook && (
          <Modal open={!!editingBook} onOpenChange={() => setEditingBook(null)} title="Edit Book">
            <BookForm
              onFormSubmit={handleBookUpdate}
              onCancel={() => setEditingBook(null)}
              publishers={publishers}
              genres={genres}
              initialData={editingBook}
            />
          </Modal>
        )}
      {isSidebarOpen && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsSidebarOpen(false)}></div>
      )}
      <div
        className={`lg:hidden fixed top-0 left-0 h-full w-4/5 max-w-sm bg-white z-50 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <Sidebar activeView={activeView} setActiveView={(view) => {
          setActiveView(view);
          setIsSidebarOpen(false);
        }} />
      </div>
      </main>
    </div>
  );
}
