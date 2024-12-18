import React from 'react';

interface ImagePreviewProps {
  imageUrl: string | null;
  onRemove: () => void;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ imageUrl, onRemove }) => {
  if (!imageUrl) return null;

  return (
    <div className="mt-4 relative">
      <div className="relative rounded-lg overflow-hidden shadow-md max-w-md mx-auto">
        <img
          src={imageUrl}
          alt="预览图"
          className="w-full h-auto object-contain"
        />
        <button
          onClick={onRemove}
          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors"
          aria-label="删除图片"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ImagePreview;