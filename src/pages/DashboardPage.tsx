import { useState } from 'react';
import type { FormEvent } from 'react';
import EditorPane from '../components/Editorpane';
import { useSnippetStore } from '../store/snippetStore';
import type { SnippetLanguage } from '../types/snippet';

function DashboardPage() {
  const createSnippet = useSnippetStore(state => state.createSnippet);
  const [title, setTitle] = useState('');
  const [language, setLanguage] = useState<SnippetLanguage>('javascript');
  const [tags, setTags] = useState('');

  const handleCreate = (e: FormEvent) => {
    e.preventDefault();
    createSnippet({
      title,
      content: '// New snippet',
      language,
      tags: tags.split(','),
    });
    setTitle('');
    setTags('');
  };

  return (
    <div className="h-full flex flex-col">
      {/* Temporary simple form to test CRUD */}
      <form
        className="border-b border-slate-800 px-4 py-3 flex items-center gap-3 text-xs bg-slate-900"
        onSubmit={handleCreate}
      >
        <input
          data-testid="snippet-title-input"
          type="text"
          placeholder="Snippet title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="h-8 w-40 rounded-md bg-slate-950 border border-slate-700 px-2 focus:outline-none focus:ring-1 focus:ring-emerald-500/70"
        />
        <select
          data-testid="snippet-language-input"
          value={language}
          onChange={e => setLanguage(e.target.value as SnippetLanguage)}
          className="h-8 rounded-md bg-slate-950 border border-slate-700 px-2 focus:outline-none focus:ring-1 focus:ring-emerald-500/70"
        >
          <option value="javascript">javascript</option>
          <option value="typescript">typescript</option>
          <option value="python">python</option>
          <option value="go">go</option>
          <option value="java">java</option>
          <option value="csharp">csharp</option>
          <option value="rust">rust</option>
          <option value="css">css</option>
          <option value="html">html</option>
          <option value="json">json</option>
        </select>
        <input
          data-testid="snippet-tags-input"
          type="text"
          placeholder="tags (comma separated)"
          value={tags}
          onChange={e => setTags(e.target.value)}
          className="h-8 w-56 rounded-md bg-slate-950 border border-slate-700 px-2 focus:outline-none focus:ring-1 focus:ring-emerald-500/70"
        />
        <button
          data-testid="save-snippet-button"
          type="submit"
          className="h-8 px-3 rounded-md bg-emerald-500 text-slate-950 font-semibold hover:bg-emerald-400 transition"
        >
          Save snippet
        </button>
      </form>

      <div className="flex-1">
        <EditorPane />
      </div>
    </div>
  );
}

export default DashboardPage;
