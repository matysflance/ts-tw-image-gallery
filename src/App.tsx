import React, { useState, useEffect } from 'react';
import { ImageCard } from './components/ImageCard';
import { ImageInterface } from './components/ImageCard';
import { ImageSearch } from './components/ImageSearch';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

export const App: React.FC = () => {
  const [images, setImages] = useState<ImageInterface[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    console.log(searchTerm);
  }, [searchTerm]);
  useEffect(() => {
    fetch(
      `https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${searchTerm}&image_type=photo&pretty=true`,
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data.hits);
        setImages(data.hits);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [searchTerm]);

  return (
    <div className="container mx-auto px-4">
      <ImageSearch setSearchTerm={setSearchTerm} />
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
    </div>
  );
};
