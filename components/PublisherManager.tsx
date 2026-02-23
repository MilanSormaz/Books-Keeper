'use client';

import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Publisher } from '@/types';
import { Input } from './Input';
import { Button } from './Button';

interface PublisherManagerProps {
  onPublisherAdd: (publisher: Omit<Publisher, 'id'>) => void;
  publishers: Publisher[];
}

export const PublisherManager = ({ onPublisherAdd, publishers }: PublisherManagerProps) => {
  const [newPublisher, setNewPublisher] = useState('');

  const handleAddPublisher = () => {
    if (newPublisher.trim() !== '') {
      onPublisherAdd({ name: newPublisher.trim() });
      setNewPublisher('');
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="font-serif text-3xl font-bold text-center text-[#1a1a1a]">Manage Publishers</h2>
      <div className="flex items-center space-x-4">
        <Input
          id="new-publisher"
          label="New Publisher"
          value={newPublisher}
          onChange={(e) => setNewPublisher(e.target.value)}
        />
        <Button onClick={handleAddPublisher}>Add</Button>
      </div>
      <div className="space-y-2">
        <h3 className="font-semibold text-gray-800">Existing Publishers</h3>
        <ul className="list-disc list-inside">
          {publishers.map((publisher) => (
            <li key={publisher.id}>{publisher.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
