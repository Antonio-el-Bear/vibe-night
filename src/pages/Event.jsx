import { useState, useEffect } from 'react';
import { CalendarDays } from 'lucide-react';
import { motion } from 'framer-motion';
import EventCard from '../components/EventCard';


const fakeEvents = [
  {
    id: 1,
    title: "Jazz & Cocktails Evening",
    genre: "Jazz",
    venue_name: "The Botanical Bar",
    date: "2026-03-29",
    time: "20:00",
    image_url: "https://images.unsplash.com/photo-1464983953574-0892a716854b?w=600&q=80",
    status: "upcoming",
    description: "A night of smooth jazz and signature cocktails at The Botanical Bar."
  },
  {
    id: 2,
    title: "House Party",
    genre: "House",
    venue_name: "Velvet Lounge",
    date: "2026-04-02",
    time: "22:00",
    image_url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&q=80",
    status: "upcoming",
    description: "Dance all night to the best house music in town!"
  },
  {
    id: 3,
    title: "Amapiano Night",
    genre: "Amapiano",
    venue_name: "Club Nova",
    date: "2026-04-05",
    time: "21:00",
    image_url: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&q=80",
    status: "upcoming",
    description: "Experience the hottest Amapiano tracks with live DJs."
  },
  {
    id: 4,
    title: "Hip Hop Bash",
    genre: "Hip Hop",
    venue_name: "Jazz Bar",
    date: "2026-04-08",
    time: "20:30",
    image_url: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=600&q=80",
    status: "upcoming",
    description: "Hip hop artists and DJs take over the Jazz Bar."
  },
  {
    id: 5,
    title: "RnB Vibes",
    genre: "R&B",
    venue_name: "Velvet Lounge",
    date: "2026-04-12",
    time: "19:00",
    image_url: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=600&q=80",
    status: "upcoming",
    description: "Smooth R&B and chill vibes all night."
  },
  {
    id: 6,
    title: "Live DJ Set",
    genre: "House",
    venue_name: "Club Nova",
    date: "2026-04-15",
    time: "23:00",
    image_url: "https://images.unsplash.com/photo-1465101178521-c1a9136a3c8b?w=600&q=80",
    status: "live",
    description: "Don't miss the hottest DJ set of the month!"
  },
  {
    id: 7,
    title: "VIP Night",
    genre: "Jazz",
    venue_name: "The Botanical Bar",
    date: "2026-04-20",
    time: "20:00",
    image_url: "https://images.unsplash.com/photo-1464983953574-0892a716854b?w=600&q=80",
    status: "sold_out",
    description: "Exclusive VIP event. Tickets sold out!"
  },
];

export default function Events() {
  const [filter, setFilter] = useState('all');
  const filteredEvents = fakeEvents.filter(e => filter === 'all' ? true : e.status === filter);

  return (
    <div className="max-w-3xl mx-auto px-4 pt-6 pb-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
          <CalendarDays className="w-6 h-6 text-primary" />
          Events
        </h1>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        {[
          { key: 'all', label: 'All' },
          { key: 'upcoming', label: 'Upcoming' },
          { key: 'live', label: 'Live Now' },
          { key: 'sold_out', label: 'Sold Out' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              filter === tab.key
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

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

      {filteredEvents.length === 0 && (
        <div className="text-center py-20 text-muted-foreground">
          <CalendarDays className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p className="text-sm">No events found for this filter.</p>
        </div>
      )}
    </div>
  );
}