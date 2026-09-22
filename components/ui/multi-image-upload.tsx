"use client";

import React, { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { UploadCloud, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface MultiImageUploadProps {
  value?: (File | string)[];
  onChange: (files: (File | string)[]) => void;
  className?: string;
  maxSizeKB?: number;
  maxFiles?: number;
}

export function MultiImageUpload({
  value = [],
  onChange,
  className,
  maxSizeKB,
  maxFiles,
}: MultiImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const onDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFiles = useCallback(
    (newFiles: File[]) => {
      let filesToAdd = newFiles.filter((file) => file.type.startsWith("image/"));

      if (maxSizeKB) {
        filesToAdd = filesToAdd.filter((file) => file.size <= maxSizeKB * 1024);
      }

      if (maxFiles && value.length + filesToAdd.length > maxFiles) {
        filesToAdd = filesToAdd.slice(0, maxFiles - value.length);
      }

      if (filesToAdd.length > 0) {
        onChange([...value, ...filesToAdd]);
      }
    },
    [onChange, value, maxSizeKB, maxFiles],
  );

  const onDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);
      if (e.dataTransfer.files?.length) {
        handleFiles(Array.from(e.dataTransfer.files));
      }
    },
    [handleFiles],
  );

  const onFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files?.length) {
        handleFiles(Array.from(e.target.files));
      }
      e.target.value = "";
    },
    [handleFiles],
  );

  const handleRemove = useCallback(
    (indexToRemove: number) => {
      onChange(value.filter((_, idx) => idx !== indexToRemove));
    },
    [onChange, value],
  );

  const getPreviewUrl = (file: File | string) => {
    if (typeof file === "string") return file;
    return URL.createObjectURL(file);
  };

  const hints: string[] = [];
  if (maxFiles) hints.push(`max ${maxFiles} files`);
  if (maxSizeKB) hints.push(`max ${maxSizeKB}KB per file`);
  const recommendationText = hints.length > 0 ? `Restrictions: ${hints.join(", ")}` : "";

  return (
    <div className="flex flex-col gap-3">
      {value.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {value.map((file, idx) => (
            <div
              key={idx}
              className="relative group aspect-square rounded-xl overflow-hidden border border-gray-200 bg-gray-50"
            >
              <Image
                src={getPreviewUrl(file)}
                alt={`Preview ${idx + 1}`}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => handleRemove(idx)}
                  className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors shadow-sm transform scale-90 group-hover:scale-100 duration-200 cursor-pointer"
                  title="Remove Image"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {(!maxFiles || value.length < maxFiles) && (
        <div
          className={cn(
            "relative flex flex-col items-center justify-center w-full min-h-32 rounded-2xl border-2 border-dashed transition-colors overflow-hidden group cursor-pointer",
            isDragging
              ? "border-brand bg-brand/5"
              : "border-gray-200 bg-gray-50 hover:bg-gray-100 hover:border-gray-300",
            className,
          )}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          onClick={() => inputRef.current?.click()}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={onFileChange}
          />
          <div className="flex flex-col items-center justify-center text-gray-500 p-4 text-center">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm mb-2 text-brand">
              <UploadCloud size={20} />
            </div>
            <p className="text-sm font-semibold text-gray-700 mb-1">
              Click or drag images to upload
            </p>
            <p className="text-xs text-gray-400">SVG, PNG, JPG or GIF</p>
          </div>
        </div>
      )}

      {recommendationText && <p className="text-xs text-gray-400">{recommendationText}</p>}
    </div>
  );
}
