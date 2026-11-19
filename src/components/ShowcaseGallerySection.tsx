import { useState } from 'react';
import { Maximize2, ArrowRight } from 'lucide-react';
import { SHOWCASE_ITEMS } from '../data/duster';
import { ResilientImage } from './ResilientImage';

interface ShowcaseGallerySectionProps {
  onOpenFullGallery: () => void;
}

export function ShowcaseGallerySection({
  onOpenFullGallery,
}: ShowcaseGallerySectionProps) {
  const [category, setCategory] = useState<'exterior' | 'interior'>('exterior');

  const filteredItems = SHOWCASE_ITEMS.filter(
    (item) => item.category === category
  );
  const [activeId, setActiveId] = useState<string>(filteredItems[0].id);

  const activeItem =
    filteredItems.find((item) => item.id === activeId) || filteredItems[0];

  const handleCategorySwitch = (nextCat: 'exterior' | 'interior') => {
    setCategory(nextCat);
    const firstInCat = SHOWCASE_ITEMS.find((item) => item.category === nextCat);
    if (firstInCat) setActiveId(firstInCat.id);
  };

  return (
    <section
      id="showcase"
      className="bg-[#0B162C] text-white py-16 sm:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <p className="text-xs font-semibold tracking-wider uppercase text-slate-400">
              Design & Cabin Craft
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Exterior & Interior Showcase
            </h2>
            <p className="text-base text-slate-300 leading-relaxed">
              Switch between exterior architecture and interior ergonomics to inspect key design details up close.
            </p>
          </div>

          {/* Interactive Segmented Control */}
          <div
            role="tablist"
            aria-label="Showcase category"
            className="inline-flex items-center p-1 bg-white/10 rounded-lg self-start"
          >
            <button
              type="button"
              role="tab"
              aria-selected={category === 'exterior'}
              onClick={() => handleCategorySwitch('exterior')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                category === 'exterior'
                  ? 'bg-white text-[#0B162C]'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Exterior Design
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={category === 'interior'}
              onClick={() => handleCategorySwitch('interior')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                category === 'interior'
                  ? 'bg-white text-[#0B162C]'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Interior & Space
            </button>
          </div>
        </div>

        {/* Angle Selector Buttons */}
        <div className="flex flex-wrap gap-2">
          {filteredItems.map((item) => {
            const active = item.id === activeItem.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveId(item.id)}
                aria-pressed={active}
                className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-md border transition-colors cursor-pointer whitespace-nowrap ${
                  active
                    ? 'bg-[#D9232E] text-white border-[#D9232E]'
                    : 'bg-transparent text-slate-300 border-white/20 hover:border-white/50 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Interactive Feature Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-[#112240] border border-white/10 rounded-xl overflow-hidden">
          <div className="lg:col-span-7 relative aspect-video lg:aspect-auto min-h-[280px] sm:min-h-[360px] bg-black">
            <ResilientImage
              src={activeItem.image}
              alt={`${activeItem.label} — ${activeItem.title}`}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <p className="text-xs font-medium text-slate-400">
                {category === 'exterior' ? 'Exterior Detail' : 'Interior Detail'} · {activeItem.label}
              </p>
              <h3 className="text-2xl font-semibold text-white">
                {activeItem.title}
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {activeItem.caption}
              </p>

              <ul className="pt-4 border-t border-white/15 space-y-2.5 text-sm text-slate-200">
                {activeItem.specs.map((spec) => (
                  <li key={spec} className="flex items-center gap-2.5">
                    <span
                      aria-hidden="true"
                      className="w-1.5 h-1.5 rounded-full bg-[#D9232E] shrink-0"
                    />
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-white/15 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={onOpenFullGallery}
                className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-slate-200 transition-colors cursor-pointer"
              >
                <Maximize2 className="w-4 h-4" aria-hidden="true" />
                <span>Open Full Gallery</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
