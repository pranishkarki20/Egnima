const API_BASE_URL = import.meta.env.PROD
  ? (import.meta.env.VITE_API_BASE_URL || "https://egnima.onrender.com")
  : "";

export function apiUrl(input: string): string {
  return input.startsWith("/api/") ? `${API_BASE_URL}${input}` : input;
}

export function apiFetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  const url = typeof input === "string" && input.startsWith("/")
    ? apiUrl(input)
    : input;
  return fetch(url, init);
}
