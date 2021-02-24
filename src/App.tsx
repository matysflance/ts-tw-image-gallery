import React, { useState, useEffect } from 'react';
import { fetchImages } from './api';
import { ImageCard } from './components/ImageCard';
import { ImageInterface } from './components/ImageCard';
import { ImageSearch } from './components/ImageSearch';
import { Button } from './components/Button';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

export const App: React.FC = () => {
  const [images, setImages] = useState<ImageInterface[]>([]);
  const [totalImages, setTotalImages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const getImages = async () => {
      try {
        const data = await fetchImages(searchTerm, currentPage);
        setImages(images.concat(data.hits));
        setTotalImages(data.totalHits);
      } catch (error) {
        console.error(error);
      }

      setIsLoading(false);
    };

    getImages();
  }, [searchTerm, currentPage]);

  const handleLoadMore = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl text-center my-2">ImgFinder</h1>
      <ImageSearch
        setSearchTerm={setSearchTerm}
        setCurrentPage={setCurrentPage}
        setImages={setImages}
      />
      {!isLoading && !images.length && (
        <h1 className="text-5xl text-center mx-auto mt-32">No images found</h1>
      )}

      {isLoading ? (
        <h1 className="text-6xl text-center mx-auto mt-32">Loading...</h1>
      ) : (
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 640: 2, 1024: 3, 1280: 4 }}>
          <Masonry gutter={10}>
            {images.map((image) => (
              <ImageCard image={image} key={image.id} />
            ))}
          </Masonry>
        </ResponsiveMasonry>
      )}

      {images.length && images.length < totalImages ? (
        <div className="text-center mt-5">
          <Button type="submit" onClick={handleLoadMore}>
            {isLoading ? 'Loading' : 'Load More Images'}
          </Button>
        </div>
      ) : (
        false
      )}
    </div>
  );
};
