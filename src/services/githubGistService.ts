const GIST_API_BASE = 'https://api.github.com/gists';

const GITHUB_TOKEN = (import.meta as any).env?.VITE_GITHUB_TOKEN || '';

function getAuthHeaders() {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };

  if (GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${GITHUB_TOKEN}`;
  }

  return headers;
}

export function parseGistIdFromUrl(url: string): string | null {
  try {
    const u = new URL(url.trim());
    if (!u.hostname.includes('gist.github.com')) return null;
    const parts = u.pathname.split('/').filter(Boolean);
    const id = parts[parts.length - 1];
    return id || null;
  } catch {
    return null;
  }
}

export async function fetchGistById(gistId: string) {
  const res = await fetch(`${GIST_API_BASE}/${gistId}`, {
    method: 'GET',
    headers: getAuthHeaders(),
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch gist: ${res.status}`);
  }

  const data = await res.json();
  return data as any;
}

export type CreateGistPayload = {
  description: string;
  public: boolean;
  files: Record<string, { content: string }>;
};

export async function createGist(payload: CreateGistPayload) {
  const res = await fetch(GIST_API_BASE, {
    method: 'POST',
    headers: {
      ...getAuthHeaders(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorBody = await res.text();
    console.error('Gist create error:', res.status, errorBody);
    throw new Error(`Failed to create gist: ${res.status}`);
  }

  const data = await res.json();
  return data as any;
}
