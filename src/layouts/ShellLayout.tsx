import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

function ShellLayout() {
  return (
    <div className="h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-80 border-r border-slate-800 bg-slate-900/60 backdrop-blur">
          <Sidebar />
        </aside>

        <main className="flex-1 bg-slate-900/40">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default ShellLayout;
