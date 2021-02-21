import React from 'react';
import { getUserProfileURL } from '../util';
import { FaEye, FaDownload, FaHeart, FaExternalLinkAlt } from 'react-icons/fa';

export const ImageCard: React.FC<Props> = ({ image }) => {
  const tags = image.tags.split(', ');

  return (
    <div className="max-w-sm xs:max-w-none rounded overflow-hidden shadow-lg relative">
      <img src={image.webformatURL} alt="" className="w-full" />
      <div className="absolute top-0 left-0 right-0 flex justify-between">
        <a
          href={image.pageURL}
          className="px-3 py-1 bg-green-500 hover:bg-green-700 text-white rounded-br transition ease-in-out duration-200"
        >
          <span className="sr-only">View on Pixabay:</span>
          <FaExternalLinkAlt />
        </a>
        <div className="bg-green-500 hover:bg-green-700 text-white text-sm rounded-bl transition ease-in-out duration-200">
          <a
            href={getUserProfileURL(image.user, image.user_id)}
            className="flex items-center px-3 py-1"
          >
            <img
              src={image.userImageURL}
              alt={`Avatar of ${image.user}`}
              className="w-5 h-5 rounded-full border-white mr-2"
            />
            <span className="sr-only">Visit author's page on Pixabay:</span>
            {image.user}
          </a>
        </div>
      </div>

      <div className="absolute left-0 bottom-0 w-full h-2/3 flex flex-col justify-end bg-gradient-to-t from-gray-900 to-transparent bg-opacity-10 text-gray-50">
        <div className="px-6 py-3">
          <ul className="flex mt-2">
            <li className="flex-1 flex flex-col justify-center items-center">
              <span className="sr-only">Views:</span> <FaEye />
              <span className="text-shadow-sm">{image.views}</span>
            </li>
            <li className="flex-1 flex flex-col justify-center items-center">
              <span className="sr-only">Downloads:</span> <FaDownload />
              <span className="text-shadow-sm">{image.downloads}</span>
            </li>
            <li className="flex-1 flex flex-col justify-center items-center">
              <span className="sr-only">Likes:</span> <FaHeart />
              <span className="text-shadow-sm">{image.likes}</span>
            </li>
          </ul>

          {tags.length ? (
            <ul className="mt-3">
              {tags.map((tag, index) => (
                <li
                  key={index}
                  className="inline-block text-gray-200 rounded-full px-1 py-1 text-sm font-semibold mr-2"
                >
                  #{tag}
                </li>
              ))}
            </ul>
          ) : (
            false
          )}
        </div>
      </div>
    </div>
  );
};

export interface ImageInterface {
  comments: number;
  downloads: number;
  favorites: number;
  id: number;
  imageHeight: number;
  imageSize: number;
  imageWidth: number;
  largeImageURL: string;
  likes: number;
  pageURL: string;
  previewHeight: number;
  previewURL: string;
  previewWidth: number;
  tags: string;
  type: string;
  user: string;
  userImageURL: string;
  user_id: number;
  views: number;
  webformatHeight: number;
  webformatURL: string;
  webformatWidth: number;
}

interface Props {
  image: ImageInterface;
  key: number;
}
