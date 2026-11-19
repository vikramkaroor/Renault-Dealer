import { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { SHOWCASE_ITEMS } from '../data/duster';
import { ResilientImage } from '../components/ResilientImage';

export function GalleryPage() {
  const [filter, setFilter] = useState<'all' | 'exterior' | 'interior'>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const visibleItems =
    filter === 'all'
      ? SHOWCASE_ITEMS
      : SHOWCASE_ITEMS.filter((item) => item.category === filter);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const showNext = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null ? null : (prev + 1) % visibleItems.length
    );
  }, [visibleItems.length]);

  const showPrev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null
        ? null
        : (prev - 1 + visibleItems.length) % visibleItems.length
    );
  }, [visibleItems.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lightboxIndex, closeLightbox, showNext, showPrev]);

  const activeLightboxItem =
    lightboxIndex !== null ? visibleItems[lightboxIndex] : null;

  return (
    <div className="bg-white text-slate-900">
      {/* Header */}
      <section className="bg-[#0B162C] text-white py-14 sm:py-18">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <p className="text-xs font-semibold tracking-wider uppercase text-slate-400">
              Visual Showcase
            </p>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight">
              Renault Duster Gallery
            </h1>
            <p className="text-base text-slate-300 max-w-2xl">
              Browse exterior stance, lighting details, alloy wheels, and cockpit ergonomics. Click any photograph to open full-screen lightbox view.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Gallery category filter"
            className="inline-flex p-1 bg-white/10 rounded-lg self-start"
          >
            {(
              [
                { id: 'all', label: 'All Views' },
                { id: 'exterior', label: 'Exterior' },
                { id: 'interior', label: 'Interior' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={filter === tab.id}
                onClick={() => {
                  setFilter(tab.id);
                  setLightboxIndex(null);
                }}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                  filter === tab.id
                    ? 'bg-white text-[#0B162C]'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Responsive Grid */}
      <section className="py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleItems.map((item, idx) => (
            <article
              key={item.id}
              className="group bg-slate-50 border border-slate-200 rounded-xl overflow-hidden flex flex-col"
            >
              <button
                type="button"
                onClick={() => setLightboxIndex(idx)}
                aria-label={`Open full view of ${item.label}: ${item.title}`}
                className="relative aspect-[4/3] w-full bg-slate-200 overflow-hidden cursor-pointer focus-visible:outline-2 focus-visible:outline-[#0B162C]"
              >
                <ResilientImage
                  src={item.image}
                  alt={`${item.label} — ${item.title}`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
                <span className="absolute bottom-3 right-3 inline-flex items-center justify-center w-9 h-9 rounded-md bg-black/65 text-white opacity-90 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-4 h-4" aria-hidden="true" />
                </span>
              </button>
              <div className="p-5 space-y-1.5">
                <p className="text-xs font-medium text-slate-500 capitalize">
                  {item.category} · {item.label}
                </p>
                <h2 className="text-base font-semibold text-[#0B162C]">
                  {item.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.caption}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Interactive Lightbox Modal */}
      {activeLightboxItem && lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Image lightbox: ${activeLightboxItem.title}`}
          className="fixed inset-0 z-50 bg-black/90 text-white flex flex-col justify-between p-4 sm:p-6"
          onClick={closeLightbox}
        >
          <div
            className="flex items-center justify-between gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <p className="text-xs text-slate-400 tabular-nums">
                {lightboxIndex + 1} / {visibleItems.length} · {activeLightboxItem.label}
              </p>
              <h3 className="text-lg font-semibold text-white">
                {activeLightboxItem.title}
              </h3>
            </div>

            <button
              type="button"
              onClick={closeLightbox}
              aria-label="Close image lightbox"
              className="w-11 h-11 inline-flex items-center justify-center rounded-md bg-white/10 hover:bg-white/20 text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div
            className="relative flex-1 flex items-center justify-center my-4 max-h-[72vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={showPrev}
              aria-label="Previous gallery image"
              className="absolute left-2 sm:left-4 z-10 w-11 h-11 inline-flex items-center justify-center rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/20 cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <ResilientImage
              src={activeLightboxItem.image}
              alt={activeLightboxItem.title}
              loading="eager"
              className="max-h-[70vh] max-w-full w-auto object-contain rounded-lg"
            />

            <button
              type="button"
              onClick={showNext}
              aria-label="Next gallery image"
              className="absolute right-2 sm:right-4 z-10 w-11 h-11 inline-flex items-center justify-center rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/20 cursor-pointer"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          <p
            className="text-center text-sm text-slate-300 max-w-2xl mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {activeLightboxItem.caption}
          </p>
        </div>
      )}
    </div>
  );
}
