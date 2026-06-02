const DEFAULT_API_URL = "http://localhost:5000";

// In dev, prefer Vite proxy (relative /api) to avoid CORS/network issues.
export const API_URL = import.meta?.env?.DEV
  ? ""
  : import.meta?.env?.VITE_API_URL || DEFAULT_API_URL;

async function doGet(url) {
  const res = await fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `Request failed: ${res.status}`);
  }
  return res.json();
}

async function doJson(method, url, body, token) {
  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `Request failed: ${res.status}`);
  }
  return res.json();
}

export async function apiGet(path) {
  const primaryUrl = `${API_URL}${path}`;
  try {
    return await doGet(primaryUrl);
  } catch (e) {
    // If proxy/relative request fails for any reason, try direct backend.
    // This avoids "Failed to fetch" when the environment doesn't honor Vite proxy.
    const fallbackUrl = `${DEFAULT_API_URL}${path}`;
    if (primaryUrl === fallbackUrl) throw e;
    return await doGet(fallbackUrl);
  }
}

export async function apiPost(path, body, token) {
  const primaryUrl = `${API_URL}${path}`;
  try {
    return await doJson("POST", primaryUrl, body, token);
  } catch (e) {
    const fallbackUrl = `${DEFAULT_API_URL}${path}`;
    if (primaryUrl === fallbackUrl) throw e;
    return await doJson("POST", fallbackUrl, body, token);
  }
}

