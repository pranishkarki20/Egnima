const API_BASE_URL = import.meta.env.PROD
  ? (import.meta.env.VITE_API_BASE_URL || "https://egneema.onrender.com")
  : "";

export function apiFetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  const url = typeof input === "string" && input.startsWith("/")
    ? `${API_BASE_URL}${input}`
    : input;
  return fetch(url, init);
}
