// components/ImageModal/ImageModal.tsx - Versión corregida
import React, { useState } from 'react';
import type { Media } from '@/types/api/products';
import { BiSolidZoomOut, BiSolidZoomIn, BiReset} from "react-icons/bi";
import { MdOutlineRestartAlt } from 'react-icons/md';

interface ImageModalProps {
  images: Media[] | string[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
  productName: string;
}

export const ImageModal: React.FC<ImageModalProps> = ({
  images,
  initialIndex,
  isOpen,
  onClose,
  productName
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });

  if (!isOpen) return null;

  const currentImage = images[currentIndex];
  const imageUrl = typeof currentImage === 'string' 
    ? currentImage 
    : (currentImage as any).secure_url || (currentImage as any).url;

  const handlePrevious = (e: React.MouseEvent) => {
    e.stopPropagation(); // Detener propagación
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    setZoomLevel(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation(); // Detener propagación
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    setZoomLevel(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleZoomIn = (e: React.MouseEvent) => {
    e.stopPropagation(); // ¡ESTO ES LO MÁS IMPORTANTE!
    setZoomLevel((prev) => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = (e: React.MouseEvent) => {
    e.stopPropagation(); // ¡ESTO ES LO MÁS IMPORTANTE!
    setZoomLevel((prev) => Math.max(prev - 0.5, 1));
    if (zoomLevel - 0.5 <= 1) {
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleResetZoom = (e: React.MouseEvent) => {
    e.stopPropagation(); // ¡ESTO ES LO MÁS IMPORTANTE!
    setZoomLevel(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel > 1) {
      setIsDragging(true);
      setStartPosition({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
    e.stopPropagation(); // Detener propagación
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoomLevel > 1) {
      const newX = e.clientX - startPosition.x;
      const newY = e.clientY - startPosition.y;
      
      const maxX = (zoomLevel - 1) * 100;
      const maxY = (zoomLevel - 1) * 100;
      
      setPosition({
        x: Math.max(Math.min(newX, maxX), -maxX),
        y: Math.max(Math.min(newY, maxY), -maxY)
      });
    }
    e.stopPropagation(); // Detener propagación
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    setIsDragging(false);
    e.stopPropagation(); // Detener propagación
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowLeft') handlePrevious(e as any);
    if (e.key === 'ArrowRight') handleNext(e as any);
  };

  // Función para manejar el clic en las miniaturas
  const handleThumbnailClick = (e: React.MouseEvent, index: number) => {
    e.stopPropagation(); // Detener propagación
    setCurrentIndex(index);
    setZoomLevel(1);
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div 
      className="fixed inset-0 bg-primary/90 bg-opacity-90 z-500000 flex items-center justify-center"
      onClick={onClose} // Solo este onClick cierra el modal
      onKeyDown={handleKeyDown}
      tabIndex={0} // Para que pueda recibir eventos de teclado
    >
      {/* Botón cerrar */}
      <button
        className="absolute top-4 right-4 text-tertiary-alt text-2xl z-10 hover:text-gray-300 transition-colors bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center"
        onClick={(e) => {
          e.stopPropagation(); // Detener propagación
          onClose();
        }}
      >
        ✕
      </button>

      {/* Controles de zoom - VERSIÓN CORREGIDA */}
      <div className="absolute top-4 left-4 flex gap-2 z-10">
        <button
          onClick={handleZoomIn}
          className="bg-black bg-opacity-20 text-tertiary-alt p-2 rounded hover:bg-opacity-30 transition-all disabled:opacity-50"
          disabled={zoomLevel >= 3}
          title="Acercar"
        >
            <BiSolidZoomIn className="w-5 h-5" />
        </button>
        <button
          onClick={handleZoomOut}
          className="bg-black bg-opacity-20 text-tertiary-alt p-2 rounded hover:bg-opacity-30 transition-all disabled:opacity-50"
          disabled={zoomLevel <= 1}
          title="Alejar"
        >
            <BiSolidZoomOut className="w-5 h-5" />
        </button>
        {zoomLevel > 1 && (
          <button
            onClick={handleResetZoom}
            className="bg-black bg-opacity-20 text-tertiary-alt p-2 rounded hover:bg-opacity-30 transition-all"
            title="Restablecer zoom"
          >
            <BiReset className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Contador de imágenes */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-tertiary-alt z-10 bg-black bg-opacity-50 px-3 py-1 rounded-full">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Botones de navegación */}
      {images.length > 1 && (
        <>
          <button
            onClick={handlePrevious}
            className="absolute left-4 text-tertiary-alt text-3xl z-10 hover:text-gray-300 transition-colors bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center"
          >
            ‹
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 text-tertiary-alt text-3xl z-10 hover:text-gray-300 transition-colors bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center"
          >
            ›
          </button>
        </>
      )}

      {/* Imagen principal */}
      <div 
        className="relative max-w-4xl max-h-full mx-4"
        onClick={(e) => e.stopPropagation()} // Prevenir que el clic en la imagen cierre el modal
      >
        <div 
          className="overflow-hidden cursor-move"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          style={{
            transform: `scale(${zoomLevel})`,
            transformOrigin: 'center center',
            cursor: zoomLevel > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default'
          }}
        >
          <img
            src={imageUrl}
            alt={productName}
            className="max-w-full max-h-screen object-contain"
            style={{
              transform: `translate(${position.x}px, ${position.y}px)`,
              transition: isDragging ? 'none' : 'transform 0.2s ease'
            }}
          />
        </div>
      </div>

      {/* Miniaturas inferiores */}
      {images.length > 1 && (
        <div 
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10"
          onClick={(e) => e.stopPropagation()} // Prevenir que el clic en miniaturas cierre el modal
        >
          {images.map((image, index) => {
            const thumbUrl = typeof image === 'string' 
              ? image 
              : (image as any).secure_url || (image as any).url;
            
            return (
              <button
                key={index}
                onClick={(e) => handleThumbnailClick(e, index)}
                className={`w-16 h-16 border-2 rounded overflow-hidden transition-all ${
                  index === currentIndex 
                    ? 'border-white scale-110' 
                    : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img
                  src={thumbUrl}
                  alt={`${productName} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};