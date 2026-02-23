import { Logo } from './Logo';
import { Menu } from 'lucide-react';
import { Button } from './Button';

interface HeaderProps {
  addBookSlot?: React.ReactNode;
  addPublisherSlot?: React.ReactNode;
  addGenreSlot?: React.ReactNode;
  onMenuClick?: () => void;
}

export const Header = ({ addBookSlot, addPublisherSlot, addGenreSlot, onMenuClick }: HeaderProps) => {
  return (
    <header className="bg-[#fdfaf5] py-4 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center">
          <button onClick={onMenuClick} className="lg:hidden mr-4">
            <Menu className="h-6 w-6" />
          </button>
          <Logo />
        </div>
        <div className="flex items-center space-x-2 md:space-x-4">
            <div className="hidden md:block">{addGenreSlot}</div>
            <div className="hidden md:block">{addPublisherSlot}</div>
            {addBookSlot}
          </div>
      </div>
    </header>
  );
};