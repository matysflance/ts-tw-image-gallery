import React, { useState } from 'react';
import { ImageInterface } from './ImageCard';

export const ImageSearch: React.FC<{
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setImages: React.Dispatch<React.SetStateAction<ImageInterface[]>>;
}> = ({ setSearchTerm, setCurrentPage, setImages }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
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
        <div className="flex items-center border-b-2 border-teal-500 py-2">
          <input
            type="text"
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 leading-tight focus:outline-none"
            value={searchValue}
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className="flex-shrink-0 bg-green-500 hover:bg-green-700 border-green-500 hover:border-green-700 text-sm border-4 text-white py-1 px-2 rounded transition ease-in-out duration-200"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};
