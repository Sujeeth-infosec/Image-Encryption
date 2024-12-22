import React from 'react';
import { Upload } from 'lucide-react';

interface FileUploadProps {
  label: string;
  accept: string;
  onChange: (file: File | null) => void;
  file: File | null;
}

export default function FileUpload({ label, accept, onChange, file }: FileUploadProps) {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    onChange(selectedFile);
  };

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <label className="flex flex-col items-center justify-center h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <Upload className="w-6 h-6 mb-2 text-gray-400" />
          {file ? (
            <p className="text-sm text-gray-600">{file.name}</p>
          ) : (
            <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
          )}
        </div>
        <input
          type="file"
          className="hidden"
          accept={accept}
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
}