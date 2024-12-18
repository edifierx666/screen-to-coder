import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import type { ImageUploadProps } from '../types';
import LoadingSpinner from './LoadingSpinner';

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelect, isLoading }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onImageSelect(acceptedFiles[0]);
    }
  }, [onImageSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    disabled: isLoading,
    multiple: false
  });

  return (
    <div
      {...getRootProps()}
      className={`p-8 border-2 border-dashed rounded-lg text-center cursor-pointer transition-all duration-200
        ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}
        ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:border-blue-500 hover:bg-gray-50'}`}
    >
      <input {...getInputProps()} />
      {isLoading ? (
        <LoadingSpinner />
      ) : isDragActive ? (
        <div className="space-y-2">
          <div className="text-blue-500 text-xl">放开以上传图片</div>
          <p className="text-blue-400">我们将立即开始分析</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="text-gray-600">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="flex text-sm text-gray-600 flex-col space-y-1">
            <p className="text-base">点击上传或拖放图片到这里</p>
            <p className="text-gray-500">支持 PNG, JPG, JPEG, GIF 格式</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;