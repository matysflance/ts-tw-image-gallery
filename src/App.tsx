import React, { useState, useEffect } from 'react';
import { ImageCard } from './components/ImageCard';
import { ImageInterface } from './components/ImageCard';

export const App: React.FC = () => {
  const [images, setImages] = useState<ImageInterface[]>([]);
  const [loading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

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
      <div className="grid grid-cols-3 gap-4">
        {images.map((image: ImageInterface) => (
          <ImageCard image={image} key={image.id} />
        ))}
      </div>
    </div>
  );
};
