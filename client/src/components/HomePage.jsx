import { Link } from 'react-router-dom';
import { Button } from './ui/button';

const illustrations = [
  { emoji: '🥕', className: 'left-[8%] top-[12%] animate-float-slow' },
  { emoji: '🍎', className: 'right-[10%] top-[18%] animate-float' },
  { emoji: '🥚', className: 'left-[15%] bottom-[18%] animate-float' },
  { emoji: '🧀', className: 'right-[16%] bottom-[16%] animate-float-slow' },
  { emoji: '🍞', className: 'left-[50%] top-[8%] animate-float-slow' },
  { emoji: '🥛', className: 'right-[40%] bottom-[12%] animate-float' }
];

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-white text-black">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-12 top-16 h-56 w-56 rounded-full bg-yellow-400/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-yellow-300/20 blur-3xl" />
      </div>

      <header className="relative z-20 mx-auto flex max-w-7xl items-center justify-between px-6 py-6 sm:px-8 lg:px-10">
        <div className="flex items-center gap-3">
          <img src="/SmartBite.png" alt="SmartBite" className="h-10 w-10 rounded-md object-cover" />
          <div className="text-lg font-semibold tracking-tight">SmartBite</div>
        </div>
        <nav className="flex items-center gap-3">
          <Link to="/login">
            <Button variant="outline" className="px-5 py-2.5">Login</Button>
          </Link>
          <Link to="/signup">
            <Button variant="accent" className="px-5 py-2.5">Sign Up</Button>
          </Link>
        </nav>
      </header>

      <main className="relative z-10 flex min-h-[calc(100vh-112px)] items-center justify-center px-6 pb-20 pt-8 sm:px-8 lg:px-10">
        <div className="w-full max-w-4xl text-center">
          <div className="mx-auto mb-8 flex max-w-2xl flex-col gap-4 animate-[fadeIn_600ms_ease-out]">
            <p className="text-sm font-medium uppercase tracking-[0.35em] text-zinc-500">Smarter meals. Less waste.</p>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-7xl">Welcome to SmartBite</h1>
            <p className="mx-auto max-w-2xl text-base leading-8 text-zinc-600 sm:text-lg">
              Scan your fridge, discover recipes, reduce food waste, and cook smarter with AI.
            </p>
          </div>

          <div className="mx-auto flex flex-col justify-center gap-4 sm:flex-row">
            <Link to="/login" className="animate-[fadeIn_800ms_ease-out]">
              <Button variant="default" className="min-w-[170px] px-7 py-4 text-base">Login</Button>
            </Link>
            <Link to="/signup" className="animate-[fadeIn_900ms_ease-out]">
              <Button variant="accent" className="min-w-[180px] px-7 py-4 text-base shadow-[0_10px_30px_rgba(250,204,21,0.25)]">Sign Up</Button>
            </Link>
          </div>
        </div>
      </main>

      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-20">
        {illustrations.map((item, index) => (
          <div key={index} className={`absolute text-4xl sm:text-5xl ${item.className}`}>
            {item.emoji}
          </div>
        ))}
      </div>

      <footer className="relative z-10 pb-8 text-center text-sm text-zinc-500">
        © 2026 SmartBite • Smarter meals. Less waste.
      </footer>
    </div>
  );
}
