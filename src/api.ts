export const fetchImages = async (searchTerm: string, page: number = 1) => {
  try {
    const response = await fetch(
      `https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${searchTerm}&image_type=photo&pretty=true&page=${page}`,
    );
    return response.json();
  } catch (error) {
    return error;
  }
};
