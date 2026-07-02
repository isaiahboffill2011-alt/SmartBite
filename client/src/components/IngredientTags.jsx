export default function IngredientTags({ items = [] }) {
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {items.map((it, idx) => (
        <span key={idx} className="rounded-full bg-zinc-100 px-3 py-1 text-sm text-zinc-800">{it}</span>
      ))}
    </div>
  );
}
