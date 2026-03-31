import { useState, useEffect } from 'react';
// Removed base44 import (legacy)
import { Search, TrendingUp, Flame } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import EventCard from '../components/EventCard';
import VenueCard from '../components/VenueCard';

const GENRES = ['All', 'House', 'Afrobeats', 'Hip Hop', 'Amapiano', 'Techno', 'R&B', 'Jazz'];

export default function Explore() {
  const [events, setEvents] = useState([]);
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeGenre, setActiveGenre] = useState('All');

  useEffect(() => {
    async function fetchData() {
      const [ev, ve] = await Promise.all([
        [], // Placeholder for events
        [], // Placeholder for venues
      ]);
      setEvents(ev);
      setVenues(ve);
      setLoading(false);
    }
    fetchData();
  }, []);

  const filteredEvents = events.filter(e => {
    const matchesSearch = !search || e.title?.toLowerCase().includes(search.toLowerCase()) || e.venue_name?.toLowerCase().includes(search.toLowerCase());
    const matchesGenre = activeGenre === 'All' || e.genre === activeGenre;
    return matchesSearch && matchesGenre;
  });

  const filteredVenues = venues.filter(v => {
    return !search || v.name?.toLowerCase().includes(search.toLowerCase()) || v.location?.toLowerCase().includes(search.toLowerCase());
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 pt-6 pb-8">
      {/* Search */}
      <div className="mb-6">
        <h1 className="text-2xl font-display font-bold text-foreground mb-4 flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-primary" />
          Explore
        </h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search events, venues, genres..."
            className="pl-10 bg-card border-border/50 rounded-xl h-11"
          />
        </div>
      </div>

      {/* Genre Filter */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-6 scrollbar-hide">
        {GENRES.map((genre) => (
          <button
            key={genre}
            onClick={() => setActiveGenre(genre)}
            className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              activeGenre === genre
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-muted-foreground hover:text-foreground'
            }`}
          >
            {genre}
          </button>
        ))}
      </div>

      {/* Trending Events */}
      {filteredEvents.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
            <Flame className="w-5 h-5 text-orange-400" />
            Trending Events
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredEvents.map((event, i) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <EventCard event={event} />
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Venues */}
      {filteredVenues.length > 0 && activeGenre === 'All' && (
        <section>
          <h2 className="text-lg font-bold text-foreground mb-3">Venues Near You</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {filteredVenues.map((venue, i) => (
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
        </section>
      )}

      {filteredEvents.length === 0 && filteredVenues.length === 0 && (
        <div className="text-center py-20 text-muted-foreground">
          <Search className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p className="text-sm">No results found. Try a different search.</p>
        </div>
      )}
    </div>
  );
}