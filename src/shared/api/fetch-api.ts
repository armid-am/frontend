const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is not defined");
}

export const fetchApi = async (path: string, options?: RequestInit) =>
  (await fetch(API_URL + path, options)).json();
