import { useState } from 'react';
import { useSnippetStore } from '../store/snippetStore';
import { parseGistIdFromUrl, fetchGistById } from '../services/githubGistService';
import type { SnippetLanguage } from '../types/snippet';

function detectLanguageFromGistFile(file: any): SnippetLanguage {
  const lang = (file.language || '').toLowerCase();

  if (lang.includes('typescript')) return 'typescript';
  if (lang.includes('javascript')) return 'javascript';
  if (lang.includes('python')) return 'python';
  if (lang.includes('go')) return 'go';
  if (lang.includes('java')) return 'java';
  if (lang.includes('c#') || lang.includes('csharp')) return 'csharp';
  if (lang.includes('rust')) return 'rust';
  if (lang.includes('css')) return 'css';
  if (lang.includes('html')) return 'html';
  if (lang.includes('json')) return 'json';
  if (lang.includes('sql')) return 'sql';


  return 'javascript';
}

function Header() {
  const search = useSnippetStore(state => state.filter.search);
  const setSearch = useSnippetStore(state => state.setSearch);
  const theme = useSnippetStore(state => state.theme);
  const setTheme = useSnippetStore(state => state.setTheme);
  const createSnippet = useSnippetStore(state => state.createSnippet);

  const [gistUrl, setGistUrl] = useState('');
  const [isImporting, setIsImporting] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleImportGist = async () => {
    const id = parseGistIdFromUrl(gistUrl);
    if (!id) {
      console.error('Invalid Gist URL');
      return;
    }

    try {
      setIsImporting(true);
      const gist = await fetchGistById(id);

      const description: string = gist.description || 'Imported Gist';
      const files = gist.files || {};
      const fileEntries = Object.values<any>(files);

      if (fileEntries.length === 0) {
        console.error('Gist has no files');
        return;
      }

      const mainFile = fileEntries[0];
      const content: string = mainFile.content || '';
      const language: SnippetLanguage = detectLanguageFromGistFile(mainFile);
      const tags: string[] = ['gist', gist.owner?.login || 'github'];

      createSnippet({
        title: description,
        content,
        language,
        tags,
      });

      setGistUrl('');
    } catch (err) {
      console.error('Failed to import gist', err);
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <header className="h-14 border-b border-slate-800 bg-slate-900/80 backdrop-blur flex items-center justify-between px-4 gap-4">
      {/* left brand block */}
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-lg bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center">
          <span className="text-emerald-300 text-sm font-semibold">MS</span>
        </div>
        <div className="flex flex-col">
  <span className="text-lg font-semibold tracking-tight text-slate-50">
    <span className="bg-gradient-to-r from-emerald-400 via-sky-400 to-indigo-400 bg-clip-text text-transparent">
      Monaco Snippet Manager
    </span>
  </span>
  <span className="mt-0.5 text-[11px] uppercase tracking-[0.16em] text-slate-400">
    Your personal code vault
  </span>
</div>

      </div>

      {/* center: search + gist import */}
      <div className="flex-1 flex items-center gap-2 max-w-2xl">
        <input
          data-testid="search-input"
          type="text"
          placeholder="Search snippets…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="h-8 flex-1 rounded-md bg-slate-900 border border-slate-700 px-3 text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/60 focus:border-emerald-500/60"
        />

        <input
          data-testid="gist-import-input"
          type="text"
          placeholder="Gist URL"
          value={gistUrl}
          onChange={e => setGistUrl(e.target.value)}
          className="h-8 w-60 rounded-md bg-slate-900 border border-slate-700 px-3 text-xs placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/60 focus:border-emerald-500/60"
        />

        <button
          data-testid="gist-import-button"
          type="button"
          onClick={handleImportGist}
          disabled={isImporting}
          className="h-8 px-3 rounded-md bg-sky-500 text-slate-950 text-xs font-semibold hover:bg-sky-400 disabled:opacity-60 disabled:cursor-not-allowed transition"
        >
          {isImporting ? 'Importing…' : 'Import Gist'}
        </button>
      </div>

      {/* right: theme + create */}
      <div className="flex items-center gap-3">
        <button
          data-testid="theme-toggle-button"
          onClick={toggleTheme}
          className="h-8 w-8 rounded-md border border-slate-700 flex items-center justify-center hover:bg-slate-800 transition"
        >
          <span className="text-slate-300 text-xs">
            {theme === 'dark' ? '☾' : '☼'}
          </span>
        </button>

      </div>
    </header>
  );
}

export default Header;
