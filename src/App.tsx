import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Gallery from '@/components/Gallery';
import Events from '@/components/Events';
import Footer from '@/components/Footer';
import JoinModal from '@/components/JoinModal';

export default function App() {
  const [joinOpen, setJoinOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0C0C0C] text-white">
      <Navbar onJoinClick={() => setJoinOpen(true)} />
      <main>
        <Hero onJoinClick={() => setJoinOpen(true)} />
        <About />
        <Gallery />
        <Events onJoinClick={() => setJoinOpen(true)} />
      </main>
      <Footer onJoinClick={() => setJoinOpen(true)} />
      <JoinModal isOpen={joinOpen} onClose={() => setJoinOpen(false)} />
    </div>
  );
}
