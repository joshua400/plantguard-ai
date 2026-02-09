import { useState, useRef, DragEvent, ChangeEvent } from "react";
import { Upload, Image, X } from "lucide-react";

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
  selectedImage: File | null;
  imagePreview: string | null;
  onClear: () => void;
}

const ImageUploader = ({
  onImageSelect,
  selectedImage,
  imagePreview,
  onClear,
}: ImageUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type.startsWith("image/")) {
      onImageSelect(files[0]);
    }
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onImageSelect(files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept="image/*"
        className="hidden"
      />

      {!selectedImage ? (
        <div
          onClick={handleClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center cursor-pointer transition-all duration-300 ${
            isDragging
              ? "border-primary bg-primary/5 scale-[1.02]"
              : "border-border hover:border-primary/50 hover:bg-muted/50"
          }`}
        >
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-2xl gradient-hero flex items-center justify-center">
              <Upload className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <p className="text-lg font-semibold text-foreground mb-1">
                Drag and drop your image here
              </p>
              <p className="text-muted-foreground">
                or click to browse from your device
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Image className="w-4 h-4" />
              <span>Supports: JPG, PNG, WEBP</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative rounded-2xl overflow-hidden bg-muted animate-scale-in">
          <img
            src={imagePreview || ""}
            alt="Selected plant"
            className="w-full h-64 sm:h-80 object-contain bg-foreground/5"
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClear();
            }}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-foreground/80 text-background flex items-center justify-center hover:bg-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/80 to-transparent p-4">
            <p className="text-sm text-background truncate font-medium">
              {selectedImage.name}
            </p>
            <p className="text-xs text-background/70">
              {(selectedImage.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
