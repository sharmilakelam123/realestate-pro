const DEFAULT_API_URL = "http://localhost:5000";
const DEFAULT_API_URL_ALT = "http://127.0.0.1:5000";

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
  const primaryUrl = `${API_URL}${path}`; // usually "/api/..." in dev
  try {
    return await doGet(primaryUrl);
  } catch (e) {
    const err1 = e;
    // If proxy/relative request fails for any reason, try direct backend.
    const fallbackUrl = `${DEFAULT_API_URL}${path}`;
    try {
      if (primaryUrl !== fallbackUrl) return await doGet(fallbackUrl);
    } catch (e2) {
      const fallbackUrlAlt = `${DEFAULT_API_URL_ALT}${path}`;
      try {
        if (primaryUrl !== fallbackUrlAlt) return await doGet(fallbackUrlAlt);
      } catch (e3) {
        throw new Error(
          `Failed to reach API. Tried: ${primaryUrl}, ${fallbackUrl}, ${fallbackUrlAlt}. ` +
            `Errors: ${err1?.message || err1}; ${e2?.message || e2}; ${e3?.message || e3}`
        );
      }
    }
    throw err1;
  }
}

export async function apiPost(path, body, token) {
  const primaryUrl = `${API_URL}${path}`;
  try {
    return await doJson("POST", primaryUrl, body, token);
  } catch (e) {
    const err1 = e;
    const fallbackUrl = `${DEFAULT_API_URL}${path}`;
    try {
      if (primaryUrl !== fallbackUrl) return await doJson("POST", fallbackUrl, body, token);
    } catch (e2) {
      const fallbackUrlAlt = `${DEFAULT_API_URL_ALT}${path}`;
      try {
        if (primaryUrl !== fallbackUrlAlt) return await doJson("POST", fallbackUrlAlt, body, token);
      } catch (e3) {
        throw new Error(
          `Failed to reach API. Tried: ${primaryUrl}, ${fallbackUrl}, ${fallbackUrlAlt}. ` +
            `Errors: ${err1?.message || err1}; ${e2?.message || e2}; ${e3?.message || e3}`
        );
      }
    }
    throw err1;
  }
}

