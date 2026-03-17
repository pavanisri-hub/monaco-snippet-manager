import { useParams } from 'react-router-dom';

function SnippetSharePage() {
  const { snippetId } = useParams();

  return (
    <div className="h-screen bg-slate-950 text-slate-100 flex flex-col">
      <header className="h-14 border-b border-slate-800 flex items-center px-4">
        <span className="text-sm font-semibold">
          Shared snippet
        </span>
        <span className="ml-2 text-xs text-slate-500">
          ID: {snippetId}
        </span>
      </header>

      <main className="flex-1 bg-slate-900/60 flex items-center justify-center">
        <div className="text-slate-500 text-sm">
          Read-only Monaco editor will appear here.
        </div>
      </main>
    </div>
  );
}

export default SnippetSharePage;
