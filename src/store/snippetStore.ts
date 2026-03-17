import { create } from 'zustand';
import { nanoid } from 'nanoid';
import type { Snippet, SnippetLanguage } from '../types/snippet';
import {
  loadSnippetsFromStorage,
  saveSnippetsToStorage,
  loadThemeFromStorage,
  saveThemeToStorage,
} from '../services/localStorageService';

export type SnippetFilter = {
  search: string;
  tag: string | null;
};

export type ThemeMode = 'light' | 'dark';

interface SnippetState {
  snippets: Snippet[];
  selectedSnippetId: string | null;
  filter: SnippetFilter;
  theme: ThemeMode;

  initialize: () => void;
  createSnippet: (data: {
    title: string;
    content: string;
    language: SnippetLanguage;
    tags: string[];
  }) => void;
  updateSnippet: (id: string, updates: Partial<Omit<Snippet, 'id'>>) => void;
  deleteSnippet: (id: string) => void;
  selectSnippet: (id: string | null) => void;
  setSearch: (search: string) => void;
  setTagFilter: (tag: string | null) => void;
  setTheme: (mode: ThemeMode) => void;
}

export const useSnippetStore = create<SnippetState>((set, get) => ({
  snippets: [],
  selectedSnippetId: null,
  filter: {
    search: '',
    tag: null,
  },
  theme: 'dark',

  initialize: () => {
    const storedSnippets = loadSnippetsFromStorage();
    const storedTheme = loadThemeFromStorage();

    set({
      snippets: storedSnippets,
      theme: storedTheme ?? 'dark',
    });

    if (storedSnippets.length > 0) {
      set({ selectedSnippetId: storedSnippets[0].id });
    }
  },

  createSnippet: ({ title, content, language, tags }) => {
    const now = new Date().toISOString();
    const normalizedTags = tags
      .map((t) => t.trim().toLowerCase())
      .filter(Boolean);

    const newSnippet: Snippet = {
      id: nanoid(),
      title: title.trim() || 'Untitled snippet',
      content,
      language,
      tags: normalizedTags,
      createdAt: now,
      updatedAt: now,
    };

    const next = [...get().snippets, newSnippet];
    saveSnippetsToStorage(next);
    set({
      snippets: next,
      selectedSnippetId: newSnippet.id,
    });
  },

  updateSnippet: (id, updates) => {
    const now = new Date().toISOString();
    const next = get().snippets.map((snippet) =>
      snippet.id === id
        ? {
            ...snippet,
            ...updates,
            updatedAt: now,
            tags: updates.tags
              ? updates.tags.map((t) => t.trim().toLowerCase()).filter(Boolean)
              : snippet.tags,
          }
        : snippet,
    );
    saveSnippetsToStorage(next);
    set({ snippets: next });
  },

  deleteSnippet: (id) => {
    const next = get().snippets.filter((s) => s.id !== id);
    saveSnippetsToStorage(next);

    const { selectedSnippetId } = get();
    let newSelected: string | null = selectedSnippetId;
    if (selectedSnippetId === id) {
      newSelected = next.length > 0 ? next[0].id : null;
    }

    set({
      snippets: next,
      selectedSnippetId: newSelected,
    });
  },

  selectSnippet: (id) => {
    set({ selectedSnippetId: id });
  },

  setSearch: (search) => {
    set((state) => ({
      filter: { ...state.filter, search },
    }));
  },

  setTagFilter: (tag) => {
    set((state) => ({
      filter: { ...state.filter, tag },
    }));
  },

  setTheme: (mode) => {
    saveThemeToStorage(mode);
    set({ theme: mode });
  },
}));
