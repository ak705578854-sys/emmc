export const BACKEND_URL = "https://emmc-push-backend.onrender.com";

export const apiUrl = (path) => {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${BACKEND_URL}${cleanPath}`;
};
