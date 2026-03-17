import { Suspense, lazy, useCallback } from 'react';
import { useSnippetStore } from '../store/snippetStore';
import { createGist } from '../services/githubGistService';

const MonacoEditor = lazy(() => import('@monaco-editor/react'));

function getFileExtension(lang: string): string {
  const l = lang.toLowerCase();
  if (l === 'typescript') return 'ts';
  if (l === 'javascript') return 'js';
  if (l === 'python') return 'py';
  if (l === 'go') return 'go';
  if (l === 'java') return 'java';
  if (l === 'csharp') return 'cs';
  if (l === 'rust') return 'rs';
  if (l === 'css') return 'css';
  if (l === 'html') return 'html';
  if (l === 'json') return 'json';
  return 'txt';
}

function safeFileName(title: string): string {
  return (
    title
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'snippet'
  );
}

function downloadSnippetsAsJson(snippets: unknown[]) {
  const data = JSON.stringify(snippets, null, 2);
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');

  a.href = url;
  a.download = `snippets-backup-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function EditorPane() {
  const snippets = useSnippetStore(state => state.snippets);
  const selectedSnippetId = useSnippetStore(state => state.selectedSnippetId);
  const theme = useSnippetStore(state => state.theme);
  const updateSnippet = useSnippetStore(state => state.updateSnippet);

  const selectedSnippet = snippets.find(s => s.id === selectedSnippetId) ?? null;

  const handleChange = useCallback(
    (value: string | undefined) => {
      if (!selectedSnippet) return;
      updateSnippet(selectedSnippet.id, { content: value ?? '' });
    },
    [selectedSnippet, updateSnippet],
  );

  const handleCopy = async () => {
    if (!selectedSnippet) return;
    try {
      await navigator.clipboard.writeText(selectedSnippet.content);
      console.log('Snippet copied to clipboard');
    } catch (err) {
      console.error('Failed to copy snippet', err);
    }
  };

  const handleExportGist = async () => {
    if (!selectedSnippet) return;
    try {
      const ext = getFileExtension(selectedSnippet.language);
      const baseName = safeFileName(selectedSnippet.title);
      const filename = `${baseName}.${ext}`;

      const payload = {
        description: selectedSnippet.title,
        public: true,
        files: {
          [filename]: {
            content: selectedSnippet.content,
          },
        },
      };

      const gist = await createGist(payload);
      console.log('Gist created:', gist.html_url || gist.url);
      // optional: toast with gist.html_url
    } catch (err) {
      console.error('Failed to export gist', err);
    }
  };

  const handleBackup = () => {
    if (!snippets || snippets.length === 0) return;
    downloadSnippetsAsJson(snippets);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800">
        <div className="flex flex-col">
          <span className="text-sm font-medium text-slate-100">
            {selectedSnippet ? selectedSnippet.title : 'No snippet selected'}
          </span>
          <span className="text-xs text-slate-500">
            {selectedSnippet
              ? `${selectedSnippet.language} · ${
                  selectedSnippet.tags.join(', ') || 'no tags'
                }`
              : 'Choose a snippet from the left or create a new one.'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            data-testid="copy-snippet-button"
            onClick={handleCopy}
            className="h-8 px-3 rounded-md border border-slate-700 text-xs text-slate-300 hover:bg-slate-800 transition"
          >
            Copy
          </button>
          <button
            data-testid="gist-export-button"
            onClick={handleExportGist}
            className="h-8 px-3 rounded-md border border-slate-700 text-xs text-slate-300 hover:bg-slate-800 transition"
          >
            Export Gist
          </button>
          <button
            data-testid="backup-button"
            onClick={handleBackup}
            className="h-8 px-3 rounded-md border border-slate-700 text-xs text-slate-300 hover:bg-slate-800 transition"
          >
            Backup
          </button>
        </div>
      </div>

      <div className="flex-1 bg-slate-950/60 border-t border-slate-900">
        {!selectedSnippet ? (
          <div className="h-full flex items-center justify-center text-slate-500 text-sm">
            Editor will appear here once you select a snippet.
          </div>
        ) : (
          <div
            data-testid="monaco-editor-container"
            className="h-full"
          >
            <Suspense
              fallback={
                <div className="h-full flex items-center justify-center text-slate-500 text-sm">
                  Loading editor…
                </div>
              }
            >
              <MonacoEditor
                height="100%"
                language={selectedSnippet.language}
                theme={theme === 'dark' ? 'vs-dark' : 'vs'}
                value={selectedSnippet.content}
                onChange={handleChange}
                options={{
                  fontSize: 14,
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  wordWrap: 'on',
                  automaticLayout: true,
                }}
              />
            </Suspense>
          </div>
        )}
      </div>
    </div>
  );
}

export default EditorPane;
