import { Link } from 'react-router-dom';

export default function MobileHeader({ title = 'Welcome back!', avatarUrl }) {
  return (
    <header className="w-full border-b border-zinc-100 bg-white px-4 py-3">
      <div className="mx-auto flex max-w-[430px] items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/SmartBite.png" alt="SmartBite" className="h-9 w-9 rounded-md object-cover" />
          <div>
            <div className="text-sm font-medium">{title}</div>
            <div className="text-xs text-zinc-500">Smarter meals. Less waste.</div>
          </div>
        </div>
        <div>
          <Link to="/user">
            <img src={avatarUrl || '/SmartBite.png'} alt="profile" className="h-9 w-9 rounded-full object-cover" />
          </Link>
        </div>
      </div>
    </header>
  );
}
