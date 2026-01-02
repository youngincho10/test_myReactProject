import React, { useCallback } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { UploadedImage } from '../types';

interface FileUploadProps {
  label: string;
  image: UploadedImage | null;
  onImageSelect: (image: UploadedImage) => void;
  onRemove: () => void;
  accept?: string;
  id: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({ 
  label, 
  image, 
  onImageSelect, 
  onRemove, 
  accept = "image/*",
  id
}) => {
  const handleFileChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      // Remove data URL prefix for API usage (e.g., "data:image/jpeg;base64,")
      const base64Data = base64String.split(',')[1];
      
      onImageSelect({
        file,
        previewUrl: base64String,
        base64: base64Data,
        mimeType: file.type
      });
    };
    reader.readAsDataURL(file);
    // Reset input value to allow re-selecting the same file if needed
    event.target.value = '';
  }, [onImageSelect]);

  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-sm font-semibold text-gray-300 ml-1">
        {label}
      </label>
      
      {image ? (
        <div className="relative group w-full aspect-square rounded-2xl overflow-hidden border-2 border-red-900/30 bg-gray-900">
          <img 
            src={image.previewUrl} 
            alt={label} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button 
              onClick={onRemove}
              className="p-2 bg-red-600 rounded-full text-white hover:bg-red-700 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      ) : (
        <label 
          htmlFor={id}
          className="w-full aspect-square flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-600 bg-gray-800/50 hover:bg-gray-800 hover:border-red-500 transition-all cursor-pointer group"
        >
          <div className="p-4 rounded-full bg-gray-700 group-hover:bg-gray-600 mb-3 transition-colors">
            <Upload className="text-gray-400 group-hover:text-red-400" size={24} />
          </div>
          <span className="text-sm text-gray-400 font-medium group-hover:text-gray-300">
            이미지 업로드
          </span>
          <span className="text-xs text-gray-500 mt-1">
            PNG, JPG, WEBP
          </span>
          <input 
            type="file" 
            id={id} 
            className="hidden" 
            accept={accept} 
            onChange={handleFileChange} 
          />
        </label>
      )}
    </div>
  );
};