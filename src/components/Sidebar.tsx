import { useSnippetStore } from '../store/snippetStore';
import { useDebouncedValue } from '../hooks/useDebouncedValue';

function Sidebar() {
  const snippets = useSnippetStore(state => state.snippets);
  const selectedSnippetId = useSnippetStore(state => state.selectedSnippetId);
  const filter = useSnippetStore(state => state.filter);
  const selectSnippet = useSnippetStore(state => state.selectSnippet);
  const deleteSnippet = useSnippetStore(state => state.deleteSnippet);
  const setTagFilter = useSnippetStore(state => state.setTagFilter);
  const createSnippet = useSnippetStore(state => state.createSnippet);
  
  const debouncedSearch = useDebouncedValue(filter.search, 300);

  const filtered = snippets.filter(snippet => {
    const search = debouncedSearch.trim().toLowerCase();
    const tagFilter = filter.tag?.toLowerCase() ?? null;

    const matchesSearch =
      !search ||
      snippet.title.toLowerCase().includes(search) ||
      snippet.content.toLowerCase().includes(search) ||
      snippet.tags.some(tag => tag.includes(search));

    const matchesTag = !tagFilter || snippet.tags.includes(tagFilter);

    return matchesSearch && matchesTag;
  });

  return (
    <div className="h-full flex flex-col">
      <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between gap-2">
        <div className="flex flex-col">
          <span className="text-xs uppercase tracking-wide text-slate-500">
            Snippets
          </span>
          {filter.tag && (
            <button
              type="button"
              onClick={() => setTagFilter(null)}
              className="mt-1 inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/20"
            >
              <span>Tag: #{filter.tag}</span>
              <span>✕</span>
            </button>
          )}
        </div>

        {/* New Snippet button */}
        <button
          type="button"
          data-testid="create-snippet-button"
          className="h-7 px-2 rounded-md bg-emerald-500 text-[11px] font-medium text-slate-950 hover:bg-emerald-400 transition"
          onClick={() =>
            createSnippet({
              title: 'New snippet',
              content: '// New snippet',
              language: 'javascript',
              tags: [],
            })
          }
        >
          New Snippet
        </button>
      </div>

      {/* (optional) if you want a visible search input in sidebar; remove if you already have one elsewhere */}
      {/* 
      <div className="px-3 py-2 border-b border-slate-800">
        <input
          data-testid="search-input"
          type="text"
          placeholder="Search..."
          value={filter.search}
          onChange={e => setSearch(e.target.value)}
          className="w-full h-7 rounded-md bg-slate-950 border border-slate-700 px-2 text-[11px] text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500/70"
        />
      </div>
      */}

      <div
        data-testid="snippet-list"
        className="flex-1 overflow-y-auto px-2 py-3 space-y-2"
      >
        {filtered.length === 0 ? (
          <div className="rounded-md border border-dashed border-slate-700/80 bg-slate-900/40 px-3 py-4 text-xs text-slate-500 text-center">
            No snippets yet. Click <span className="text-emerald-400">New Snippet</span> to create one.
          </div>
        ) : (
          filtered.map(snippet => {
            const isSelected = snippet.id === selectedSnippetId;

            return (
              <div
                key={snippet.id}
                className={`group rounded-md border px-3 py-2 text-xs cursor-pointer transition ${
                  isSelected
                    ? 'border-emerald-500 bg-emerald-500/10'
                    : 'border-slate-700 bg-slate-900/40 hover:border-slate-500'
                }`}
                onClick={() => selectSnippet(snippet.id)}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex flex-col">
                    <span className="font-medium text-slate-100 truncate">
                      {snippet.title}
                    </span>
                    <span className="text-[10px] text-slate-500">
                      {snippet.language}
                    </span>
                  </div>

                  <button
                    data-testid="delete-snippet-button"
                    className="opacity-0 group-hover:opacity-100 text-[10px] text-slate-400 hover:text-rose-400"
                    onClick={e => {
                      e.stopPropagation();
                      deleteSnippet(snippet.id);
                    }}
                  >
                    ✕
                  </button>
                </div>

                {snippet.tags.length > 0 && (
                  <div className="mt-1 flex flex-wrap gap-1">
                    {snippet.tags.map(tag => (
                      <button
                        key={tag}
                        data-testid="snippet-tag"
                        type="button"
                        className="px-1.5 py-0.5 rounded-full bg-slate-800 text-[10px] text-slate-300 hover:bg-emerald-600/30 hover:text-emerald-200"
                        onClick={e => {
                          e.stopPropagation();
                          setTagFilter(tag);
                        }}
                      >
                        #{tag}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Sidebar;
