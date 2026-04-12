import { useRef, useEffect } from 'react';
import ClipCard from './ClipCard';

export default function ReelsViewer({ clips, initialIndex = 0, onClose }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: initialIndex * window.innerHeight,
        behavior: 'auto',
      });
    }
  }, [initialIndex]);

  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-95 flex flex-col overflow-y-scroll snap-y snap-mandatory"
      ref={containerRef}
      style={{ height: '100vh' }}
    >
      {clips.map((clip, i) => (
        <div
          key={clip.id}
          className="flex flex-col items-center justify-center w-full h-screen snap-center"
          style={{ minHeight: '100vh' }}
        >
          <div className="w-full max-w-md mx-auto">
            <ClipCard clip={clip} />
          </div>
        </div>
      ))}
      <button
        className="absolute top-4 right-4 bg-black/60 text-white rounded-full px-3 py-1 text-sm hover:bg-black/80 transition"
        onClick={onClose}
      >
        Close
      </button>
    </div>
  );
}
