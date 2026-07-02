import { useState } from 'react';
import UploadCard from '../components/UploadCard.jsx';
import IngredientTags from '../components/IngredientTags.jsx';
import RecipeCard from '../components/RecipeCard.jsx';
import MobileHeader from '../components/MobileHeader.jsx';
import BottomNav from '../components/BottomNav.jsx';

export default function Dashboard() {
  const [ingredients, setIngredients] = useState([]);
  const [recipe, setRecipe] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleAnalyze = async ({ file, previewUrl }) => {
    if (!file) {
      setMessage('Please choose a photo first');
      return;
    }

    setLoading(true);
    setMessage('SmartBite AI is analyzing your fridge...');
    setImageUrl(previewUrl);

    try {
      // upload to Supabase Storage from the client
      const { data: uploadData, error: uploadError } = await (await import('../utils/supabaseClient')).supabase.storage
        .from('images')
        .upload(`fridge-uploads/${Date.now()}-${file.name}`, file, { cacheControl: '3600', upsert: false });

      if (uploadError) throw new Error(uploadError.message || 'Upload failed');

      const { data: publicData } = await (await import('../utils/supabaseClient')).supabase.storage.from('images').getPublicUrl(uploadData.path);
      const publicUrl = publicData.publicUrl;

      // call backend to analyze the image url
      const axios = (await import('axios')).default;
      const resp = await axios.post('/api/analyze/fridge', { imageUrl: publicUrl });
      if (!resp.data?.success) throw new Error(resp.data?.error || 'Analysis failed');

      const result = resp.data.data || {};
      setIngredients(result.ingredients || []);
      setRecipe(result.recipe || null);
      setMessage('Analysis complete');
    } catch (err) {
      console.error(err);
      setMessage(err?.message || 'Analysis failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mobile-root safe-bottom text-black">
      <MobileHeader />

      <main className="pt-4 pb-24">
        <UploadCard onAnalyze={handleAnalyze} loading={loading} />

        {loading && (
          <div className="mt-4 px-4 text-center text-sm text-zinc-600">{message}</div>
        )}

        {!loading && ingredients && ingredients.length > 0 && (
          <div className="mt-4 space-y-4 px-4">
            <div>
              <h3 className="text-sm font-semibold">Detected Ingredients</h3>
              <IngredientTags items={ingredients} />
            </div>

            <div>
              <h3 className="text-sm font-semibold">Recommended Recipe</h3>
              <RecipeCard data={recipe} imageUrl={imageUrl} />
            </div>
          </div>
        )}

        {!loading && (!ingredients || ingredients.length === 0) && (
          <div className="mt-6 px-4">
            <div className="card p-6 text-center">
              <div className="text-5xl">🧊</div>
              <h4 className="mt-4 text-lg font-semibold">Upload your first fridge photo to get personalized recipes.</h4>
              <p className="mt-2 text-sm text-zinc-600">SmartBite will scan for ingredients and suggest recipes tailored to what you already have.</p>
            </div>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
