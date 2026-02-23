import { Book } from 'lucide-react';

export const Logo = () => {
  return (
    <div className="flex items-center space-x-2">
      <Book className="h-8 w-8 text-white" />
      <span className="font-serif text-2xl font-bold text-white">Book Keeper</span>
    </div>
  );
};
