import React, { useState, useEffect } from 'react';
import { fetchImages } from './api';
import { ImageCard } from './components/ImageCard';
import { ImageInterface } from './components/ImageCard';
import { ImageSearch } from './components/ImageSearch';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

export const App: React.FC = () => {
  const [images, setImages] = useState<ImageInterface[]>([]);
  const [totalImages, setTotalImages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
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
    console.log(currentPage);
  };

  return (
    <div className="container mx-auto p-4">
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
          <button
            type="submit"
            className="flex-shrink-0 bg-green-500 hover:bg-green-700 border-green-500 hover:border-green-700 text-sm border-4 text-white py-1 px-2 rounded transition ease-in-out duration-200"
            onClick={handleLoadMore}
          >
            {isLoading ? 'Loading' : 'Load More Images'}
          </button>
        </div>
      ) : (
        false
      )}
    </div>
  );
};
