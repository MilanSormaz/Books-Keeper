export interface Genre {
  id: string;
  name: string;
}

export interface Publisher {
  id: string;
  name: string;
}

export type BookStatus = 'wishlist' | 'library';

export type SortKey = 'title' | 'author' | 'genre';
export type SortDirection = 'asc' | 'desc';

export interface Book {
  id: string;
  title: string;
  author: string;
  genre?: string;
  publisher?: string;
  picture?: string;
  description: string;
  pages: number;
  comment?: string;
  status: BookStatus;
}
