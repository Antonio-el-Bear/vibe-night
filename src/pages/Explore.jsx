import { useState, useEffect } from 'react';
import { demoEvents } from '../lib/query-clients';
// Removed base44 import (legacy)
import { Search, TrendingUp, Flame } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import EventCard from '../components/EventCard';
import VenueCard from '../components/VenueCard';

const GENRES = ['All', 'House', 'Afrobeats', 'Hip Hop', 'Amapiano', 'Techno', 'R&B', 'Jazz', 'Live Performances'];




export default function Explore() {
  const [events] = useState(demoEvents);
  const [venues] = useState([]);
  const [loading] = useState(false);
  const [search, setSearch] = useState('');
  const [activeGenre, setActiveGenre] = useState('All');
  const [modal, setModal] = useState(null);

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
                <div className="bg-[#23232a] rounded-2xl overflow-hidden shadow hover:shadow-pink-500/20 transition cursor-pointer" onClick={() => setModal(event)}>
                  <img src={event.image_url} alt={event.title} className="w-full h-48 object-cover" />
                  <div className="p-5 flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <span className="bg-pink-500 text-white text-xs font-semibold rounded-full px-3 py-1">{event.genre}</span>
                      <span className="bg-white/10 text-white/80 text-xs rounded-full px-3 py-1">{event.venue_name}</span>
                    </div>
                    <div className="font-bold text-lg text-white">{event.title}</div>
                    <div className="text-white/70 text-sm">{event.description}</div>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-white/80 text-xs">{event.date} {event.time}</span>
                      <span className="bg-pink-500/20 text-pink-500 text-xs font-semibold rounded-full px-3 py-1 capitalize">{event.status}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Demo event modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-[#18181b] rounded-2xl p-8 w-full max-w-md text-white relative">
            <button onClick={() => setModal(null)} className="absolute top-3 right-3 text-white/60 hover:text-white text-xl">&times;</button>
            <img src={modal.image_url} alt={modal.title} className="w-full h-48 object-cover rounded-xl mb-4" />
            <div className="font-bold text-2xl mb-1">{modal.title}</div>
            <div className="flex gap-2 mb-2">
              <span className="bg-pink-500 text-white text-xs font-semibold rounded-full px-3 py-1">{modal.genre}</span>
              <span className="bg-white/10 text-white/80 text-xs rounded-full px-3 py-1">{modal.venue_name}</span>
            </div>
            <div className="text-white/70 mb-2">{modal.description}</div>
            <div className="text-white/80 text-sm mb-2">{modal.date} {modal.time}</div>
            <div className="flex gap-2 mb-4">
              <span className="bg-pink-500/20 text-pink-500 text-xs font-semibold rounded-full px-3 py-1 capitalize">{modal.status}</span>
            </div>
            <button className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-xl px-4 py-2 transition">RSVP (Demo)</button>
          </div>
        </div>
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