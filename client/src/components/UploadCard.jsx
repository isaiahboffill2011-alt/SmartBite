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
    // auto-start analyze on selection is optional; keep manual
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
    <div className="w-full px-4">
      <div className="card p-4">
        <h2 className="text-lg font-semibold">Upload Your Fridge</h2>
        <p className="mt-2 text-sm text-zinc-600">Take a picture of your fridge or pantry and let SmartBite AI create a recipe using what you already have.</p>

        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="mt-4 flex w-full flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-zinc-200 p-4"
        >
          {!preview ? (
            <>
              <div className="text-4xl">📸</div>
              <p className="text-sm text-zinc-600">Use camera or choose from gallery</p>
              <input ref={fileRef} type="file" accept="image/*" capture="environment" onChange={handleBrowse} className="hidden" />
              <div className="flex w-full gap-3">
                <button onClick={handleChoose} className="btn-primary touch-large w-full">Choose Photo</button>
              </div>
            </>
          ) : (
            <div className="w-full">
              <img src={preview} alt="preview" className="mx-auto h-60 w-full rounded-lg object-cover" />
            </div>
          )}
        </div>

        <div className="mt-4">
          <button
            onClick={handleAnalyze}
            disabled={!file || loading}
            className="btn-primary touch-large w-full text-center font-semibold disabled:opacity-60"
          >
            {loading ? 'Analyzing...' : 'Analyze My Fridge'}
          </button>
        </div>
      </div>
    </div>
  );
}
