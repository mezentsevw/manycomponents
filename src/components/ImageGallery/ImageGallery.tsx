import React, { useState, useCallback } from 'react';
import './ImageGallery.css';

interface Image {
  id: string;
  src: string;
  alt: string;
  thumbnail?: string;
}

interface ImageGalleryProps {
  images: Image[];
  showThumbnails?: boolean;
  autoPlay?: boolean;
  interval?: number;
  className?: string;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  showThumbnails = true,
  autoPlay = false,
  interval = 3000,
  className = '',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  }, [images.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const togglePlay = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(nextSlide, interval);
    }
    return () => clearInterval(timer);
  }, [isPlaying, interval, nextSlide]);

  return (
    <div className={`image-gallery ${className}`}>
      <div className="image-gallery__main">
        <button
          className="image-gallery__button image-gallery__button--prev"
          onClick={prevSlide}
          aria-label="Предыдущее изображение"
        >
          &lt;
        </button>
        
        <div className="image-gallery__slide">
          <img
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            className="image-gallery__image"
          />
        </div>

        <button
          className="image-gallery__button image-gallery__button--next"
          onClick={nextSlide}
          aria-label="Следующее изображение"
        >
          &gt;
        </button>

        <button
          className="image-gallery__play-button"
          onClick={togglePlay}
          aria-label={isPlaying ? 'Пауза' : 'Воспроизведение'}
        >
          {isPlaying ? '⏸' : '▶'}
        </button>
      </div>

      {showThumbnails && (
        <div className="image-gallery__thumbnails">
          {images.map((image, index) => (
            <button
              key={image.id}
              className={`image-gallery__thumbnail ${
                index === currentIndex ? 'image-gallery__thumbnail--active' : ''
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Перейти к изображению ${index + 1}`}
            >
              <img
                src={image.thumbnail || image.src}
                alt={`Миниатюра ${image.alt}`}
                className="image-gallery__thumbnail-image"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// Демо-компонент
export const ImageGalleryDemo: React.FC = () => {
  const images = [
    {
      id: '1',
      src: 'https://picsum.photos/800/600?random=1',
      alt: 'Изображение 1',
      thumbnail: 'https://picsum.photos/200/150?random=1',
    },
    {
      id: '2',
      src: 'https://picsum.photos/800/600?random=2',
      alt: 'Изображение 2',
      thumbnail: 'https://picsum.photos/200/150?random=2',
    },
    {
      id: '3',
      src: 'https://picsum.photos/800/600?random=3',
      alt: 'Изображение 3',
      thumbnail: 'https://picsum.photos/200/150?random=3',
    },
  ];

  return (
    <div className="image-gallery-demo">
      <h2>Пример использования ImageGallery</h2>
      <ImageGallery
        images={images}
        showThumbnails={true}
        autoPlay={true}
        interval={3000}
      />
    </div>
  );
};

export default ImageGallery; 