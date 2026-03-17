import type { Snippet } from '../types/snippet';
import { SNIPPETS_STORAGE_KEY, THEME_STORAGE_KEY } from '../constants/storageKeys';
import type { ThemeMode } from '../store/snippetStore';

export function loadSnippetsFromStorage(): Snippet[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(SNIPPETS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Snippet[];
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch (err) {
    console.warn('Failed to parse snippets from localStorage', err);
    return [];
  }
}

export function saveSnippetsToStorage(snippets: Snippet[]): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(
      SNIPPETS_STORAGE_KEY,
      JSON.stringify(snippets),
    );
  } catch (err) {
    console.warn('Failed to save snippets to localStorage', err);
  }
}

export function loadThemeFromStorage(): ThemeMode | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (!raw) return null;
    if (raw === 'light' || raw === 'dark') return raw;
    return null;
  } catch {
    return null;
  }
}

export function saveThemeToStorage(theme: ThemeMode): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // ignore
  }
}
