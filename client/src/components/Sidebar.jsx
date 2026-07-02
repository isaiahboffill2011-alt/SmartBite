import { useNavigate, useLocation } from 'react-router-dom';

const items = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'My Recipes', to: '/recipes' },
  { label: 'Favorites', to: '/favorites' },
  { label: 'Shopping Lists', to: '/shopping' },
  { label: 'Settings', to: '/settings' },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('sb_user');
    navigate('/login');
  };

  return (
    <aside className="w-72 border-r border-zinc-100 bg-white px-6 py-8">
      <div className="flex items-center gap-3">
        <img src="/SmartBite.png" alt="SmartBite" className="h-10 w-10 rounded-md object-cover" />
        <div>
          <div className="text-lg font-semibold">SmartBite</div>
          <div className="text-sm text-zinc-500">Smarter meals. Less waste.</div>
        </div>
      </div>

      <nav className="mt-8 flex flex-col gap-2">
        {items.map((it) => {
          const active = location.pathname === it.to;
          return (
            <button
              key={it.to}
              onClick={() => navigate(it.to)}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-left transition ${
                active ? 'bg-yellow-50 text-black shadow-[0_6px_18px_rgba(250,204,21,0.12)]' : 'text-zinc-700 hover:bg-zinc-50'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-zinc-200" />
              <span className="font-medium">{it.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="mt-8">
        <button onClick={handleLogout} className="w-full rounded-full bg-black px-4 py-3 text-sm font-semibold text-white">Logout</button>
      </div>
    </aside>
  );
}
