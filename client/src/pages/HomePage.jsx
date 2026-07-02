import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <header className="mb-10 flex flex-col gap-4 text-center">
        <h1 className="text-4xl font-bold text-white">MealMind AI</h1>
        <p className="max-w-2xl mx-auto text-slate-300">Smart meal planning, recipe generation, and grocery management powered by AI and Supabase.</p>
      </header>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-xl shadow-slate-950/20">
          <h2 className="text-2xl font-semibold">AI-powered cooking</h2>
          <p className="mt-4 text-slate-400">Upload food photos, detect ingredients, and craft meals from what you already have.</p>
        </div>
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-xl shadow-slate-950/20">
          <h2 className="text-2xl font-semibold">Meal planning</h2>
          <p className="mt-4 text-slate-400">Generate meal plans, shopping lists, and reminders tailored to your preferences.</p>
        </div>
      </section>

      <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <Link to="/login" className="rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400">Log in</Link>
        <Link to="/register" className="rounded-full border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-slate-500">Create account</Link>
      </div>
    </main>
  );
}
