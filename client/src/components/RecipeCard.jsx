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
    <div className="mt-4 rounded-2xl border border-zinc-100 bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
      <h4 className="text-xl font-semibold">{recipe.title || 'Recommended Recipe'}</h4>
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="col-span-1 md:col-span-1">
          <div className="h-40 w-full overflow-hidden rounded-lg bg-zinc-100">
            {imageUrl ? <img src={imageUrl} alt="food" className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center">🍲</div>}
          </div>
        </div>
        <div className="col-span-2 md:col-span-2">
          <p className="text-sm text-zinc-600">{recipe.description || recipe.body || ''}</p>
        </div>
      </div>

      <div className="mt-4 flex gap-3">
        <button className="rounded-full bg-white border px-4 py-2 text-sm">❤️ Save Recipe</button>
        <button className="rounded-full bg-white border px-4 py-2 text-sm">🔄 Generate Another Recipe</button>
        <button className="rounded-full bg-black px-4 py-2 text-sm text-white">🛒 Create Shopping List</button>
      </div>
    </div>
  );
}
