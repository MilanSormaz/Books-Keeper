'use client';

import { twMerge } from 'tailwind-merge';
import { Heart, Library } from 'lucide-react';

const navigation = [
  { name: 'Wishlist', view: 'wishlist', icon: Heart },
  { name: 'My Library', view: 'library', icon: Library },
] as const;

interface SidebarProps {
  activeView: 'wishlist' | 'library';
  setActiveView: (view: 'wishlist' | 'library') => void;
}

export const Sidebar = ({ activeView, setActiveView }: SidebarProps) => {
  return (
    <div className="flex flex-col h-full bg-stone-100 p-4 border-r border-stone-200 lg:bg-transparent lg:border-none">
      <div className="mb-8">
        <h2 className="font-serif text-2xl font-bold text-[#1a1a1a] px-4">My Books</h2>
      </div>
      <nav className="flex flex-col space-y-2">
        {navigation.map((item) => (
          <button
            key={item.name}
            onClick={() => setActiveView(item.view)}
            className={twMerge(
              'flex items-center px-4 py-3 text-base font-medium rounded-lg transition-colors',
              activeView === item.view
                ? 'bg-[#5A5A40] text-white'
                : 'text-stone-700 hover:bg-stone-200'
            )}
          >
            <item.icon className="mr-3 h-5 w-5" />
            <span className={item.name === 'My Library' ? 'font-bold' : ''}>{item.name}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};
