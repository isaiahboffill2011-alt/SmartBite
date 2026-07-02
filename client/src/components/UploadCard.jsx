import { useRef, useState } from 'react';

export default function UploadCard({ onAnalyze, loading }) {
  const fileRef = useRef();
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);

  const handleChoose = () => fileRef.current?.click();

  const handleFile = (f) => {
    if (!f) return;
    const url = URL.createObjectURL(f);
    setPreview(url);
    setFile(f);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0];
    if (f && /image\/(png|jpe?g)/i.test(f.type)) handleFile(f);
  };

  const handleBrowse = (e) => {
    const f = e.target.files?.[0];
    if (f && /image\/(png|jpe?g)/i.test(f.type)) handleFile(f);
  };

  const handleAnalyze = () => {
    if (!file) return;
    onAnalyze({ file, previewUrl: preview });
  };

  return (
    <div className="w-full max-w-3xl">
      <div className="rounded-3xl border border-zinc-100 bg-white p-8 shadow-[0_20px_60px_rgba(0,0,0,0.04)]">
        <h2 className="text-2xl font-semibold">Upload a Picture of Your Fridge</h2>
        <p className="mt-2 text-sm text-zinc-600">Take a clear picture of your fridge or pantry and let SmartBite's AI find ingredients and create a recipe.</p>

        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="mt-6 flex flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed border-zinc-200 p-8"
        >
          {!preview ? (
            <>
              <div className="text-6xl">📷</div>
              <p className="text-sm text-zinc-600">Drag & drop an image here, or</p>
              <input ref={fileRef} type="file" accept="image/png,image/jpg,image/jpeg" onChange={handleBrowse} className="hidden" />
              <button onClick={handleChoose} className="rounded-full bg-yellow-400 px-4 py-2 font-semibold text-black">Choose Image</button>
            </>
          ) : (
            <div className="w-full">
              <img src={preview} alt="preview" className="mx-auto max-h-72 w-auto rounded-lg object-cover" />
            </div>
          )}
        </div>

        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            onClick={handleAnalyze}
            disabled={!file || loading}
            className="rounded-full bg-yellow-400 px-6 py-3 text-sm font-semibold text-black disabled:opacity-60"
          >
            {loading ? 'Analyzing...' : 'Analyze My Fridge'}
          </button>
        </div>
      </div>
    </div>
  );
}
