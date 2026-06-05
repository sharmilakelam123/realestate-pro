const BASE_URL = "http://127.0.0.1:5000";

export async function apiGet(path) {
  const url = BASE_URL + path;

  const res = await fetch(url);

  // If backend error page comes, show real error
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text);
  }

  return await res.json();
}

export async function apiPost(path, data = {}) {
  const res = await fetch(BASE_URL + path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text);
  }

  return res.json();
}