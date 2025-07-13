const config = {
  BE_URL: import.meta.env.VITE_BE_URL,

  API_URL: import.meta.env.VITE_BE_URL + "/api",
};

export const getFileUrl = (url: string) => {
  if (url?.startsWith("http")) return url;

  if (!url) return "https://placehold.co/400?text=NA";

  return `${config.BE_URL}/${url}`;
};

export const fileSizes = {
  // in MB
  profileImage: 2,
  coverImage: 2,
  cv: 2,
  attachment: 2,
};

export default config;
