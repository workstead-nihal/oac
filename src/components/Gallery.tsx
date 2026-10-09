import { useState } from 'react';
import { X, ZoomIn } from 'lucide-react';

interface GalleryItem {
  image: string;
  title: string;
  category: string;
  credit?: string;
  large: string;
}

const images = import.meta.glob<string>('../../images/**/*.{jpg,jpeg,png,JPG}', {
  eager: true,
  query: '?url',
  import: 'default',
});

const imageDetails: Record<string, { title: string; credit?: string }> = {
  '(gojo)agentt_i.png': { title: 'Gojo Fan Art', credit: 'agentt_i' },
  '(phainon) agentt_i.jpg': { title: 'Phainon Fan Art', credit: 'agentt_i' },
  'aashprit _page-0001.jpg': { title: 'Community Artwork', credit: 'aashprit' },
  'aashprit _page-0004.jpg': { title: 'Community Artwork', credit: 'aashprit' },
  'mha @_yendigo.jpg': { title: 'My Hero Academia Fan Art', credit: '_yendigo' },
  'ethane_radd.jpg': { title: 'Community Cosplay', credit: 'ethane_radd' },
  'ethane_radd (1).jpg': { title: 'Community Cosplay', credit: 'ethane_radd' },
  'stfumanishaa-5(2007024118388072).jpg': { title: 'Community Cosplay', credit: 'stfumanishaa' },
  'COSPLAYERS .jpg': { title: 'OAC Cosplayers' },
};

const galleryItems: GalleryItem[] = Object.entries(images).map(([path, image]) => {
  const filename = path.split('/').pop()!;
  const category = path.includes('/art/') ? 'Art' : path.includes('/cosplay/') ? 'Cosplay' : 'Events';
  const details = imageDetails[filename];
  return {
    image,
    large: image,
    category,
    title: details?.title ?? (category === 'Events' ? 'OAC Community Event' : 'Community Cosplay'),
    credit: details?.credit,
  };
});

type FilterType = 'All' | 'Cosplay' | 'Art' | 'Events';
export default function Gallery() {
  const [filter, setFilter] = useState<FilterType>('All');
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

  const filtered = filter === 'All'
    ? galleryItems
    : galleryItems.filter((item) => item.category === filter);

  return (
    <section
      id="gallery"
      className="relative py-24 sm:py-32 bg-gradient-to-b from-[#0C0C0C] via-[#0a0a0a] to-[#0C0C0C] overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-[#F3B334]/5 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section heading */}
        <div className="text-center mb-12">
          <p className="text-[#F3B334] text-sm tracking-[0.3em] uppercase font-medium mb-4">
            Member Creativity
          </p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-white leading-tight">
            Community <span className="text-gradient-gold">Gallery</span>
          </h2>
          <p className="mt-6 text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
            A showcase of the incredible talent within our community — from hand-crafted
            cosplay builds to breathtaking artwork and event memories. This is where passion becomes art.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {(['All', 'Cosplay', 'Art', 'Events'] as FilterType[]).map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                filter === type
                  ? 'bg-[#D91515] text-white glow-red'
                  : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/5'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Masonry grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 sm:gap-5">
          {filtered.map((item) => (
            <button
              key={item.image}
              onClick={() => setLightbox(item)}
              className="group relative w-full mb-4 sm:mb-5 break-inside-avoid rounded-2xl overflow-hidden bg-white/5 border border-white/5 hover:border-[#F3B334]/40 transition-all duration-300 block"
            >
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-white font-semibold text-sm">{item.title}</p>
                    <p className="text-[#F3B334] text-xs mt-0.5">
                      {item.category}{item.credit && <> · by {item.credit}</>}
                    </p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <ZoomIn size={16} className="text-white" />
                  </div>
                </div>
              </div>
              {/* Category badge (always visible) */}
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#0C0C0C]/70 backdrop-blur-sm border border-white/10">
                <span className="text-[10px] font-medium text-[#F3B334] uppercase tracking-wider">
                  {item.category}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* CTA for artists */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">
            Want your work featured here?{' '}
            <span className="text-[#F3B334] font-medium">Join as a creator and collaborate with OAC.</span>
          </p>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm animate-fade-in p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#D91515] transition-colors"
            onClick={() => setLightbox(null)}
            aria-label="Close lightbox"
          >
            <X size={24} />
          </button>
          <div
            className="max-w-4xl w-full animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightbox.large}
              alt={lightbox.title}
              className="w-full max-h-[80vh] object-contain rounded-2xl"
            />
            <div className="mt-4 text-center">
              <p className="text-white font-semibold text-lg">{lightbox.title}</p>
              <p className="text-[#F3B334] text-sm mt-1">
                {lightbox.category}{lightbox.credit && <> · by {lightbox.credit}</>}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
