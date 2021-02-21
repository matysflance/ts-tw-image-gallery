import React, { useState, useEffect } from 'react';
import { ImageCard } from './components/ImageCard';
import { ImageInterface } from './components/ImageCard';
import { ImageSearch } from './components/ImageSearch';

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
        setImages(data.hits);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [searchTerm]);

  return (
    <div className="container mx-auto">
      <ImageSearch setSearchTerm={setSearchTerm} />
      {!isLoading && !images.length && (
        <h1 className="text-5xl text-center mx-auto mt-32">No images found</h1>
      )}

      {isLoading ? (
        <h1 className="text-6xl text-center mx-auto mt-32">Loading...</h1>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {images.map((image) => (
            <ImageCard image={image} key={image.id} />
          ))}
        </div>
      )}
    </div>
  );
};
