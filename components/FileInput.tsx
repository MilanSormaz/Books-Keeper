'use client';

import { ChangeEvent, useState } from 'react';
import { Button } from './Button';
import Image from 'next/image';

interface FileInputProps {
  onFileSelect: (fileData: string) => void;
  label: string;
}

export const FileInput = ({ onFileSelect, label }: FileInputProps) => {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreview(result);
        onFileSelect(result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="mt-1 flex items-center space-x-4">
        <input
          type="file"
          id="file-upload"
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
        <label htmlFor="file-upload">
          <Button type="button" variant="secondary" asChild>
            <span>Browse</span>
          </Button>
        </label>
        {preview && (
          <Image src={preview} alt="Preview" width={64} height={64} className="rounded-md object-cover" />
        )}
      </div>
    </div>
  );
};


