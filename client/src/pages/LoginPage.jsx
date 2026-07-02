import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data } = await axios.post('/api/auth/login', {
        email: form.email,
        password: form.password,
      });

      if (data?.success) {
        // store minimal session info for route guard
        try { localStorage.setItem('sb_user', JSON.stringify(data.data.user || data.data)); } catch(e) {}
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err?.response?.data?.error || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white px-6 py-10 text-black sm:px-8 lg:px-10">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <Link to="/" className="text-lg font-semibold tracking-tight">SmartBite</Link>
      </div>

      <div className="mx-auto flex min-h-[calc(100vh-120px)] max-w-5xl items-center justify-center">
        <div className="w-full max-w-md rounded-3xl border border-zinc-200 bg-white p-8 shadow-[0_20px_60px_rgba(0,0,0,0.06)]">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-zinc-500">Welcome back</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight">Log in to SmartBite</h1>
          <p className="mt-3 text-sm leading-6 text-zinc-600">Sign in to keep planning meals and reducing food waste.</p>

          <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
            <label className="block text-sm font-medium text-zinc-700">
              Email
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                type="email"
                placeholder="you@example.com"
                className="mt-2 w-full rounded-2xl border border-zinc-300 px-4 py-3 outline-none transition focus:border-black"
              />
            </label>
            <label className="block text-sm font-medium text-zinc-700">
              Password
              <input
                name="password"
                value={form.password}
                onChange={handleChange}
                type="password"
                placeholder="••••••••"
                className="mt-2 w-full rounded-2xl border border-zinc-300 px-4 py-3 outline-none transition focus:border-black"
              />
            </label>

            {error ? <p className="text-sm text-red-600">{error}</p> : null}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full rounded-full bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? 'Signing in...' : 'Log in'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-zinc-600">
            New here?{' '}
            <Link to="/signup" className="font-semibold text-black">Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
