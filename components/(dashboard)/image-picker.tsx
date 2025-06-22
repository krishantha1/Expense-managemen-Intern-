"use client";

import { ChangeEvent, useRef, useState } from "react";
import Image from "next/image";
import placeholderImage from "@/public/image-placeholder.jpg";
import { Loader2 } from "lucide-react"; // Add this import

interface ImagePickerProps {
  multiple?: boolean;
  maxImages?: number;
  disabled?: boolean;
  onImagesSelected?: (files: (File & { preview: string })[]) => void;
  existingImages?: string[];
  isUploading?: boolean;
}

export const ImagePicker = ({
  multiple = false,
  maxImages = 1,
  disabled = false,
  onImagesSelected,
  existingImages = [],
  isUploading = false,
}: ImagePickerProps) => {
  const [images, setImages] = useState<(File & { preview: string })[]>(
    existingImages.map((url) =>
      Object.assign(new File([""], "filename"), {
        preview: url,
      })
    )
  );

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) return;

    const selectedFiles = Array.from(event.target.files).map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );

    if (multiple) {
      const newImages = [...images, ...selectedFiles].slice(0, maxImages);
      setImages(newImages);
      onImagesSelected?.(newImages);
    } else {
      setImages([selectedFiles[0]]);
      onImagesSelected?.([selectedFiles[0]]);
    }
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    onImagesSelected?.(newImages);
  };

  const openFilePicker = () => {
    if (!disabled && images.length < maxImages) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div className="flex flex-wrap gap-4">
      {images.map((image, index) => (
        <div key={index} className="relative w-24 h-32 bg-gray-100">
          {!disabled && !isUploading && (
            <button
              className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full text-white flex items-center justify-center"
              onClick={() => removeImage(index)}
            >
              ×
            </button>
          )}
          {isUploading ? (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <Loader2 className="h-6 w-6 animate-spin text-white" />
            </div>
          ) : (
            <Image
              src={image.preview}
              alt={`Selected image ${index + 1}`}
              fill
              className="object-contain"
            />
          )}
        </div>
      ))}

      {images.length < maxImages && (
        <div
          className={`w-24 h-32 border-2 border-dashed flex items-center justify-center cursor-pointer ${
            disabled ? "opacity-50 cursor-not-allowed" : "hover:border-blue-500"
          }`}
          onClick={openFilePicker}
        >
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileSelect}
            accept="image/*"
            multiple={multiple}
            disabled={disabled}
          />
          <Image
            src={placeholderImage}
            alt="Add image"
            width={50}
            height={50}
            className="opacity-50"
          />
        </div>
      )}
    </div>
  );
};
