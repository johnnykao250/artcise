'use client';

import { useState } from 'react';

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_SIZE_MB = 5;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

export function SubmitForm() {
  const [image, setImage] = useState<File | null>(null);
  const [height, setHeight] = useState('');
  const [width, setWidth] = useState('');
  const [length, setLength] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setImage(null);
      return;
    }
    if (!ALLOWED_TYPES.includes(file.type)) {
      setMessage('Please use a JPEG, PNG, or WebP image.');
      setImage(null);
      return;
    }
    if (file.size > MAX_SIZE_BYTES) {
      setMessage(`Image must be under ${MAX_SIZE_MB} MB.`);
      setImage(null);
      return;
    }
    setMessage('');
    setImage(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) {
      setMessage('Please select one image.');
      return;
    }
    setStatus('sending');
    setMessage('');
    try {
      const formData = new FormData();
      formData.append('image', image);
      formData.append('height', height.trim());
      formData.append('width', width.trim());
      formData.append('length', length.trim());
      const res = await fetch('/api/submit', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus('error');
        setMessage(data.error ?? 'Submission failed.');
        return;
      }
      setStatus('success');
      setMessage('Thank you. Your item was submitted.');
      setImage(null);
      setHeight('');
      setWidth('');
      setLength('');
      const input = document.getElementById('image-input') as HTMLInputElement;
      if (input) input.value = '';
    } catch {
      setStatus('error');
      setMessage('Network error. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-6 rounded-xl border border-[var(--border)] bg-white p-6">
      <div>
        <label htmlFor="image-input" className="block text-sm font-medium text-ink">
          Image (one only, JPEG/PNG/WebP, max {MAX_SIZE_MB} MB)
        </label>
        <input
          id="image-input"
          type="file"
          accept={ALLOWED_TYPES.join(',')}
          onChange={handleImageChange}
          className="mt-2 block w-full text-sm text-graphite file:mr-4 file:rounded file:border-0 file:bg-cream file:px-3 file:py-2 file:text-ink"
        />
        {image && (
          <p className="mt-1 text-xs text-graphite/70">
            Selected: {image.name}
          </p>
        )}
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label htmlFor="height" className="block text-sm font-medium text-ink">
            Height
          </label>
          <input
            id="height"
            type="text"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="e.g. 12 in"
            className="mt-1 w-full rounded-lg border border-[var(--border)] bg-white px-3 py-2 text-ink placeholder:text-graphite/50"
          />
        </div>
        <div>
          <label htmlFor="width" className="block text-sm font-medium text-ink">
            Width
          </label>
          <input
            id="width"
            type="text"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            placeholder="e.g. 8 in"
            className="mt-1 w-full rounded-lg border border-[var(--border)] bg-white px-3 py-2 text-ink placeholder:text-graphite/50"
          />
        </div>
        <div>
          <label htmlFor="length" className="block text-sm font-medium text-ink">
            Length
          </label>
          <input
            id="length"
            type="text"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            placeholder="e.g. 6 in"
            className="mt-1 w-full rounded-lg border border-[var(--border)] bg-white px-3 py-2 text-ink placeholder:text-graphite/50"
          />
        </div>
      </div>

      {message && (
        <p className={`text-sm ${status === 'error' ? 'text-red-600' : 'text-graphite'}`}>
          {message}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full rounded-lg bg-sage px-4 py-3 font-medium text-white hover:bg-sage/90 disabled:opacity-50"
      >
        {status === 'sending' ? 'Submitting…' : 'Submit'}
      </button>
    </form>
  );
}
