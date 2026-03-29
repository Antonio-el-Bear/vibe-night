
import { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import VenueCard from '../components/VenueCard';

const CATEGORIES = ['All', 'Club', 'Lounge', 'Rooftop', 'Bar', 'Live Venue'];

export default function Venues() {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('All');

  useEffect(() => {
    async function fetchData() {
      const data = []; // Placeholder for venues
      setVenues(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  const filtered = venues.filter(v => category === 'All' || v.category === category);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 pt-6 pb-8">
      <h1 className="text-2xl font-display font-bold text-foreground mb-4 flex items-center gap-2">
        <MapPin className="w-6 h-6 text-primary" />
        Venues
      </h1>

      <div className="flex gap-2 overflow-x-auto pb-3 mb-6">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              category === cat
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-muted-foreground hover:text-foreground'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {filtered.map((venue, i) => (
          <motion.div
            key={venue.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <VenueCard venue={venue} />
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-muted-foreground">
          <MapPin className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p className="text-sm">No venues found in this category.</p>
        </div>
      )}
    </div>
  );
}