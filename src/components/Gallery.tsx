import { useState } from 'react';
import { X, ZoomIn } from 'lucide-react';

interface GalleryItem {
  image: string;
  title: string;
  category: string;
  credit: string;
  large: string;
}

const galleryItems: GalleryItem[] = [
  {
    image: 'https://images.pexels.com/photos/39594025/pexels-photo-39594025.jpeg?auto=compress&cs=tinysrgb&w=600',
    large: 'https://images.pexels.com/photos/39594025/pexels-photo-39594025.jpeg?auto=compress&cs=tinysrgb&w=1200',
    title: 'Convention Cosplay',
    category: 'Cosplay',
    credit: 'Quyet Nguyen',
  },
  {
    image: 'https://images.pexels.com/photos/34479190/pexels-photo-34479190.jpeg?auto=compress&cs=tinysrgb&w=600',
    large: 'https://images.pexels.com/photos/34479190/pexels-photo-34479190.jpeg?auto=compress&cs=tinysrgb&w=1200',
    title: 'Purple Warrior',
    category: 'Cosplay',
    credit: 'Ken Taro',
  },
  {
    image: 'https://images.pexels.com/photos/33651541/pexels-photo-33651541.jpeg?auto=compress&cs=tinysrgb&w=600',
    large: 'https://images.pexels.com/photos/33651541/pexels-photo-33651541.jpeg?auto=compress&cs=tinysrgb&w=1200',
    title: 'Blue Armor Build',
    category: 'Cosplay',
    credit: 'Steven Susilo',
  },
  {
    image: 'https://images.pexels.com/photos/6002182/pexels-photo-6002182.jpeg?auto=compress&cs=tinysrgb&w=600',
    large: 'https://images.pexels.com/photos/6002182/pexels-photo-6002182.jpeg?auto=compress&cs=tinysrgb&w=1200',
    title: 'Sketchbook Eyes',
    category: 'Art',
    credit: 'Sutej Arts',
  },
  {
    image: 'https://images.pexels.com/photos/39797616/pexels-photo-39797616.jpeg?auto=compress&cs=tinysrgb&w=600',
    large: 'https://images.pexels.com/photos/39797616/pexels-photo-39797616.jpeg?auto=compress&cs=tinysrgb&w=1200',
    title: 'Azure Elf',
    category: 'Cosplay',
    credit: 'Quyet Nguyen',
  },
  {
    image: 'https://images.pexels.com/photos/4006615/pexels-photo-4006615.jpeg?auto=compress&cs=tinysrgb&w=600',
    large: 'https://images.pexels.com/photos/4006615/pexels-photo-4006615.jpeg?auto=compress&cs=tinysrgb&w=1200',
    title: 'Portrait Colors',
    category: 'Art',
    credit: 'Verend',
  },
  {
    image: 'https://images.pexels.com/photos/30486833/pexels-photo-30486833.jpeg?auto=compress&cs=tinysrgb&w=600',
    large: 'https://images.pexels.com/photos/30486833/pexels-photo-30486833.jpeg?auto=compress&cs=tinysrgb&w=1200',
    title: 'Pink Hair Poser',
    category: 'Cosplay',
    credit: 'Mo On',
  },
  {
    image: 'https://images.pexels.com/photos/11584919/pexels-photo-11584919.jpeg?auto=compress&cs=tinysrgb&w=600',
    large: 'https://images.pexels.com/photos/11584919/pexels-photo-11584919.jpeg?auto=compress&cs=tinysrgb&w=1200',
    title: 'Framed Illustration',
    category: 'Art',
    credit: 'Kristina Snowasp',
  },
  {
    image: 'https://images.pexels.com/photos/13190380/pexels-photo-13190380.jpeg?auto=compress&cs=tinysrgb&w=600',
    large: 'https://images.pexels.com/photos/13190380/pexels-photo-13190380.jpeg?auto=compress&cs=tinysrgb&w=1200',
    title: 'Fantasy Smoke',
    category: 'Cosplay',
    credit: 'Rodrigo Zarate',
  },
  {
    image: 'https://images.pexels.com/photos/1340905/pexels-photo-1340905.jpeg?auto=compress&cs=tinysrgb&w=600',
    large: 'https://images.pexels.com/photos/1340905/pexels-photo-1340905.jpeg?auto=compress&cs=tinysrgb&w=1200',
    title: 'Sword Bearer',
    category: 'Cosplay',
    credit: 'meijii',
  },
  {
    image: 'https://images.pexels.com/photos/2716895/pexels-photo-2716895.jpeg?auto=compress&cs=tinysrgb&w=600',
    large: 'https://images.pexels.com/photos/2716895/pexels-photo-2716895.jpeg?auto=compress&cs=tinysrgb&w=1200',
    title: 'Street Art Portrait',
    category: 'Art',
    credit: 'Two Dreamers',
  },
  {
    image: 'https://images.pexels.com/photos/37905259/pexels-photo-37905259.jpeg?auto=compress&cs=tinysrgb&w=600',
    large: 'https://images.pexels.com/photos/37905259/pexels-photo-37905259.jpeg?auto=compress&cs=tinysrgb&w=1200',
    title: 'Warrior Spirit',
    category: 'Cosplay',
    credit: 'Malcoln Oliveira',
  },
];

type FilterType = 'All' | 'Cosplay' | 'Art';

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
            Art & Cosplay <span className="text-gradient-gold">Gallery</span>
          </h2>
          <p className="mt-6 text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
            A showcase of the incredible talent within our community — from hand-crafted
            cosplay builds to breathtaking artwork. This is where passion becomes art.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex justify-center gap-3 mb-10">
          {(['All', 'Cosplay', 'Art'] as FilterType[]).map((type) => (
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
              key={item.title + item.credit}
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
                      {item.category} · by {item.credit}
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
              className="w-full rounded-2xl"
            />
            <div className="mt-4 text-center">
              <p className="text-white font-semibold text-lg">{lightbox.title}</p>
              <p className="text-[#F3B334] text-sm mt-1">
                {lightbox.category} · by {lightbox.credit}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
