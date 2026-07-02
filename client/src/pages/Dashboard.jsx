import { useState } from 'react';
import Sidebar from '../components/Sidebar.jsx';
import UploadCard from '../components/UploadCard.jsx';
import IngredientTags from '../components/IngredientTags.jsx';
import RecipeCard from '../components/RecipeCard.jsx';

export default function Dashboard() {
  const [ingredients, setIngredients] = useState([]);
  const [recipe, setRecipe] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleAnalyze = async ({ file, previewUrl }) => {
    setLoading(true);
    setMessage('SmartBite AI is analyzing your fridge...');
    setImageUrl(previewUrl);
    try {
      const form = new FormData();
      form.append('image', file);
      const res = await fetch('/api/images/analyze', { method: 'POST', body: form });
      const json = await res.json();
      if (!json.success) throw new Error(json?.error || 'Analysis failed');
      const data = json.data || {};
      setIngredients(data.ingredients || []);
      setRecipe(data.recipe || null);
    } catch (err) {
      setMessage(err.message || 'Analysis failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-8">
          <h1 className="text-3xl font-semibold">Welcome back!</h1>
          <p className="mt-2 text-lg text-zinc-600">Ready to cook something with what's already in your fridge?</p>

          <section className="mt-8 grid place-items-center">
            <UploadCard onAnalyze={handleAnalyze} loading={loading} />
          </section>

          {loading && (
            <div className="mt-6 text-center text-sm text-zinc-600">{message}</div>
          )}

          {!loading && ingredients && ingredients.length > 0 && (
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <h3 className="text-lg font-semibold">Detected Ingredients</h3>
                <IngredientTags items={ingredients} />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Recommended Recipe</h3>
                <RecipeCard data={recipe} imageUrl={imageUrl} />
              </div>
            </div>
          )}

          {!loading && (!ingredients || ingredients.length === 0) && (
            <div className="mt-12 flex items-center justify-center">
              <div className="max-w-xl rounded-2xl border border-zinc-100 bg-white p-8 text-center shadow-[0_10px_40px_rgba(0,0,0,0.04)]">
                <div className="text-6xl">🧊</div>
                <h4 className="mt-4 text-xl font-semibold">Upload your first fridge photo to get personalized recipes.</h4>
                <p className="mt-2 text-sm text-zinc-600">SmartBite will scan for ingredients and suggest recipes tailored to what you already have.</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
