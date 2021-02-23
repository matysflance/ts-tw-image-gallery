import React, { useState } from 'react';
import { ImageInterface } from './ImageCard';
import { Button } from './Button';

export const ImageSearch: React.FC<{
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setImages: React.Dispatch<React.SetStateAction<ImageInterface[]>>;
}> = ({ setSearchTerm, setCurrentPage, setImages }) => {
  const [searchValue, setSearchValue] = useState('');
  const [hasError, serHasError] = useState(false);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    serHasError(false);
    if (!searchValue) {
      serHasError(true);
      return;
    }
    setCurrentPage(1);
    setImages([]);
    setSearchTerm(searchValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="max-w-sm rounded overflow-hidden my-10 mx-auto">
      <form className="w-full max-w-sm" onSubmit={handleSearch}>
        <div
          className={`flex items-center border-b-2 ${
            hasError ? 'border-red-500' : 'border-green-500'
          } p-2`}
        >
          <label htmlFor="searchValue" className="sr-only">
            Input search phrase
          </label>
          <input
            type="text"
            id="searchValue"
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 p-2 leading-tight focus:outline-none focus:border-green-300"
            placeholder="Start typing..."
            value={searchValue}
            onChange={handleInputChange}
          />
          <Button type="submit">Search</Button>
        </div>
        <p className={`text-red-600 font-bold ${!hasError && 'opacity-0'}`} aria-hidden={!hasError}>
          Search value is required
        </p>
      </form>
    </div>
  );
};
