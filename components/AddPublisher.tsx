'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Modal } from './Modal';
import { Button } from './Button';
import { PublisherManager } from './PublisherManager';
import { Publisher } from '@/types';

interface AddPublisherProps {
  onPublisherAdd: (publisher: Omit<Publisher, 'id'>) => void;
  publishers: Publisher[];
}

export const AddPublisher = ({ onPublisherAdd, publishers }: AddPublisherProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePublisherAdd = (publisher: Omit<Publisher, 'id'>) => {
    onPublisherAdd(publisher);
    // Keep modal open to add more
  };

  return (
    <>
      <Button variant="secondary" onClick={() => setIsModalOpen(true)}>
        <Plus className="-ml-1 mr-2 h-5 w-5" />
        Manage Publishers
      </Button>
      <Modal open={isModalOpen} onOpenChange={setIsModalOpen} title="Manage Publishers">
        <PublisherManager onPublisherAdd={handlePublisherAdd} publishers={publishers} />
      </Modal>
    </>
  );
};
