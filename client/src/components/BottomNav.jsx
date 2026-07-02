import { NavLink } from 'react-router-dom';

const tabs = [
  { to: '/dashboard', label: 'Home', emoji: '🏠' },
  { to: '/recipes', label: 'Recipes', emoji: '📖' },
  { to: '/favorites', label: 'Favorites', emoji: '❤️' },
  { to: '/settings', label: 'Settings', emoji: '⚙️' },
];

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-zinc-100 bg-white">
      <div className="mx-auto flex max-w-[430px] items-center justify-between px-4 py-2 safe-bottom">
        {tabs.map((t) => (
          <NavLink key={t.to} to={t.to} className={({ isActive }) => `flex w-full flex-col items-center gap-1 py-2 text-xs ${isActive ? 'text-black' : 'text-zinc-500'}`}>
            <div className={`text-lg ${' '}`}>{t.emoji}</div>
            <div className={`text-[11px] ${' '}`}>{t.label}</div>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
