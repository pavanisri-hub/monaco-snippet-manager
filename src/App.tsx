import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import ShellLayout from './layouts/ShellLayout';
import DashboardPage from './pages/DashboardPage';
import SnippetSharePage from './pages/SnippetSharePage';
import { useSnippetStore } from './store/snippetStore';

function App() {
  const initialize = useSnippetStore(state => state.initialize);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-200">

      <main className="flex-1 flex flex-col">
        <Routes>
          <Route path="/" element={<ShellLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="snippets/:snippetId" element={<DashboardPage />} />
          </Route>

          <Route path="/snippets/view/:snippetId" element={<SnippetSharePage />} />
          <Route path="*" element={<div className="p-6">Not Found</div>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
