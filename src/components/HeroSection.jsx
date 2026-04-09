import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function HeroSection() {
  return (
    <div className="relative overflow-hidden rounded-3xl mx-4 mt-4 mb-8">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&q=80"
          alt="Nightlife"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-primary/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative px-6 py-12 md:py-20 md:px-10"
      >
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-accent" />
          <span className="text-xs font-medium text-accent uppercase tracking-wider">Tonight's Picks</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-display font-bold text-white leading-tight mb-3">
          Your Night,<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-pink-400">
            Elevated.
          </span>
        </h1>
        <p className="text-white/60 text-sm md:text-base max-w-md leading-relaxed">
          Discover the hottest events, connect with your crew, and never miss a vibe again.
        </p>
      </motion.div>
    </div>
  );
}