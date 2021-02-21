export const getUserProfileURL = (username: string, userId: number): string => {
  return `https://pixabay.com/users/${username}-${userId}`;
};
