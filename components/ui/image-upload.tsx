"use client";

import React, { useCallback, useState } from "react";
import Image from "next/image";
import { UploadCloud, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  value?: File | string | null;
  onChange: (file: File | null) => void;
  className?: string;
  
  maxSizeKB?: number;
  
  exactDimensions?: { width: number; height: number };
  
  maxDimensions?: { width: number; height: number };
}

export function ImageUpload({
  value,
  onChange,
  className,
  maxSizeKB,
  exactDimensions,
  maxDimensions,
}: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);

  const onDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFile = useCallback(
    (file: File) => {
      onChange(file);
    },
    [onChange]
  );

  const onDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files?.[0];
      if (file && file.type.startsWith("image/")) {
        handleFile(file);
      }
    },
    [handleFile]
  );

  const onFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        handleFile(file);
      }
      e.target.value = "";
    },
    [handleFile]
  );

  const handleRemove = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onChange(null);
    },
    [onChange]
  );

  const getPreviewUrl = () => {
    if (!value) return null;
    if (typeof value === "string") return value;
    return URL.createObjectURL(value);
  };

  const previewUrl = getPreviewUrl();

  const hints: string[] = [];
  if (exactDimensions) {
    hints.push(`${exactDimensions.width}×${exactDimensions.height}px`);
  } else if (maxDimensions) {
    hints.push(`max ${maxDimensions.width}×${maxDimensions.height}px`);
  }

  hints.push(maxSizeKB ? `max ${maxSizeKB}KB` : "max 2MB");

  const recommendationText = `Recommended: ${hints.join(", ")}`;

  return (
    <div className="flex flex-col gap-1.5">
      <div
        className={cn(
          "relative flex flex-col items-center justify-center w-full min-h-40 rounded-2xl border-2 border-dashed transition-colors overflow-hidden group",
          isDragging
            ? "border-brand bg-brand/5"
            : "border-gray-200 bg-gray-50 hover:bg-gray-100 hover:border-gray-300",
          previewUrl ? "border-solid border-gray-200" : "",
          className
        )}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={() => document.getElementById("image-upload-input")?.click()}
      >
        <input
          id="image-upload-input"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={onFileChange}
        />

        {previewUrl ? (
          <div className="relative w-full h-full min-h-40 flex items-center justify-center bg-gray-100">
            <Image
              src={previewUrl}
              alt="Preview"
              fill
              className="object-contain p-4"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button
                type="button"
                onClick={handleRemove}
                className="bg-red-500 text-white p-2.5 rounded-full hover:bg-red-600 transition-colors shadow-sm transform scale-90 group-hover:scale-100 duration-200 cursor-pointer"
                title="Remove Image"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-500 p-6 text-center cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm mb-3 text-brand">
              <UploadCloud size={24} />
            </div>
            <p className="text-sm font-semibold text-gray-700 mb-1">
              Click or drag image to upload
            </p>
            <p className="text-xs text-gray-400">SVG, PNG, JPG or GIF</p>
          </div>
        )}
      </div>

      {recommendationText && (
        <p className="text-xs text-gray-400">{recommendationText}</p>
      )}
    </div>
  );
}
