
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
  onLoadSuccess?: () => void;
  onLoadError?: () => void;
  loadingComponent?: React.ReactNode;
}

const SafeImage = ({
  src,
  alt,
  className,
  fallbackSrc = "/placeholder.svg",
  onLoadSuccess,
  onLoadError,
  loadingComponent,
  style,
  ...props
}: SafeImageProps) => {
  const [imgSrc, setImgSrc] = useState<string | undefined>(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Preload and validate image
  useEffect(() => {
    if (!src) {
      setHasError(true);
      setIsLoading(false);
      return;
    }

    setImgSrc(src);
    setIsLoading(true);
    setHasError(false);

    const img = new Image();
    img.src = src;
    
    img.onload = () => {
      setIsLoading(false);
      setHasError(false);
      if (onLoadSuccess) onLoadSuccess();
    };
    
    img.onerror = () => {
      setImgSrc(fallbackSrc);
      setIsLoading(false);
      setHasError(true);
      if (onLoadError) onLoadError();
    };

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src, fallbackSrc, onLoadSuccess, onLoadError]);

  return (
    <>
      {isLoading && (
        loadingComponent || (
          <div 
            className={cn("bg-muted animate-pulse w-full h-full", className)} 
            style={style} 
            {...props} 
          />
        )
      )}
      <img
        src={imgSrc}
        alt={alt}
        className={cn("w-full h-full object-cover", className, {
          "hidden": isLoading,
          "opacity-95": hasError
        })}
        style={style}
        onError={() => {
          setImgSrc(fallbackSrc);
          setHasError(true);
          if (onLoadError) onLoadError();
        }}
        {...props}
      />
    </>
  );
};

export default SafeImage;
