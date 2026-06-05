const BASE_URL = "http://localhost:5000/api";

/* ================= GET API ================= */
export async function apiGet(path) {
  try {
    const res = await fetch(BASE_URL + path, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // if backend error
    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "Failed to fetch");
    }

    const data = await res.json();

    // backend returns {items: []} OR array
    return data?.items ? data.items : data;
  } catch (error) {
    console.error("GET API ERROR:", error.message);
    throw error;
  }
}

/* ================= POST API ================= */
export async function apiPost(path, payload = {}) {
  try {
    const res = await fetch(BASE_URL + path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "Request failed");
    }

    return await res.json();
  } catch (error) {
    console.error("POST API ERROR:", error.message);
    throw error;
  }
}