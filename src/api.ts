import { ImageInterface } from './components/ImageCard';

type APIresponse = {
  total: number;
  totalHits: number;
  hits: ImageInterface[];
};

export const fetchImages = async (searchTerm: string, page: number = 1): Promise<APIresponse> => {
  try {
    const response = await fetch(
      `https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${searchTerm}&image_type=photo&pretty=true&page=${page}`,
    );
    return response.json();
  } catch (error) {
    return error;
  }
};
