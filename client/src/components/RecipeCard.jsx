export default function RecipeCard({ data, imageUrl }) {
  if (!data) {
    return (
      <div className="mt-4 rounded-2xl border border-zinc-100 bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
        <p className="text-zinc-600">No recipe generated yet. Try analyzing your fridge.</p>
      </div>
    );
  }

  // `data` may be a parsed object or a text blob from the AI
  const recipe = typeof data === 'string' ? { title: 'Suggested Recipe', body: data } : data;

  return (
    <div className="mt-4 rounded-2xl border border-zinc-100 bg-white p-4 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
      <div className="flex items-start gap-3">
        <div className="h-28 w-28 flex-shrink-0 overflow-hidden rounded-lg bg-zinc-100">
          {imageUrl ? <img src={imageUrl} alt="food" className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center">🍲</div>}
        </div>
        <div className="flex-1">
          <h4 className="text-base font-semibold">{recipe.title || 'Recommended Recipe'}</h4>
          <p className="mt-2 text-sm text-zinc-600">{recipe.description || recipe.body || ''}</p>
        </div>
      </div>

      <div className="mt-4 grid gap-2">
        <div className="flex gap-2">
          <button className="flex-1 rounded-full border px-3 py-2 text-sm">❤️ Save Recipe</button>
          <button className="flex-1 rounded-full border px-3 py-2 text-sm">🔄 Generate</button>
        </div>
        <button className="w-full rounded-full bg-black px-3 py-2 text-sm text-white">🛒 Create Shopping List</button>
      </div>
    </div>
  );
}
