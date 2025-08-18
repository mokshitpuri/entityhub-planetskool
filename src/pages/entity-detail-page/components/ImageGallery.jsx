import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ImageGallery = ({ images = [], entityName }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images?.length === 0) {
    return null;
  }

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setSelectedImage(images?.[index]);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction) => {
    const newIndex = direction === 'next' 
      ? (currentIndex + 1) % images?.length
      : (currentIndex - 1 + images?.length) % images?.length;
    
    setCurrentIndex(newIndex);
    setSelectedImage(images?.[newIndex]);
  };

  const handleKeyDown = (e) => {
    if (e?.key === 'Escape') {
      closeLightbox();
    } else if (e?.key === 'ArrowRight') {
      navigateImage('next');
    } else if (e?.key === 'ArrowLeft') {
      navigateImage('prev');
    }
  };

  return (
    <>
      <div className="bg-surface rounded-lg border border-border p-6">
        <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Images" size={20} className="mr-2 text-primary" />
          Gallery
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images?.map((image, index) => (
            <div
              key={index}
              className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group"
              onClick={() => openLightbox(index)}
            >
              <Image
                src={image?.url}
                alt={image?.caption || `${entityName} gallery image ${index + 1}`}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <Icon 
                  name="ZoomIn" 
                  size={24} 
                  className="text-white opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </div>
              
              {/* Caption Preview */}
              {image?.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                  <p className="text-white text-xs truncate">{image?.caption}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-1200 bg-black/90 flex items-center justify-center p-4"
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          tabIndex={-1}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-1210 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
          >
            <Icon name="X" size={20} className="text-white" />
          </button>

          {/* Navigation Buttons */}
          {images?.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e?.stopPropagation();
                  navigateImage('prev');
                }}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-1210 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
              >
                <Icon name="ChevronLeft" size={24} className="text-white" />
              </button>
              
              <button
                onClick={(e) => {
                  e?.stopPropagation();
                  navigateImage('next');
                }}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-1210 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
              >
                <Icon name="ChevronRight" size={24} className="text-white" />
              </button>
            </>
          )}

          {/* Image Container */}
          <div 
            className="relative max-w-4xl max-h-full"
            onClick={(e) => e?.stopPropagation()}
          >
            <Image
              src={selectedImage?.url}
              alt={selectedImage?.caption || `${entityName} gallery image`}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />
            
            {/* Image Info */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 rounded-b-lg">
              {selectedImage?.caption && (
                <p className="text-white text-sm mb-1">{selectedImage?.caption}</p>
              )}
              <div className="flex items-center justify-between text-white/80 text-xs">
                <span>Image {currentIndex + 1} of {images?.length}</span>
                {selectedImage?.date && (
                  <span>{new Date(selectedImage.date)?.toLocaleDateString()}</span>
                )}
              </div>
            </div>
          </div>

          {/* Thumbnail Strip */}
          {images?.length > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 bg-black/50 rounded-lg p-2">
              {images?.map((image, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e?.stopPropagation();
                    openLightbox(index);
                  }}
                  className={`w-12 h-12 rounded overflow-hidden transition-opacity ${
                    index === currentIndex ? 'opacity-100 ring-2 ring-white' : 'opacity-60 hover:opacity-80'
                  }`}
                >
                  <Image
                    src={image?.url}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ImageGallery;