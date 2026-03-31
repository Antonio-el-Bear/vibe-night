import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { ArrowLeft, MapPin, Star, Clock, Share2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import EventCard from '../components/EventCard';

export default function VenueDetail() {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const [allVenues, allEvents] = await Promise.all([
        [], // Placeholder for venues
        [], // Placeholder for events
      ]);
      const foundVenue = allVenues.find(v => v.id === id);
      setVenue(foundVenue);
      if (foundVenue) {
        setEvents(allEvents.filter(e => e.venue_id === id || e.venue_name === foundVenue.name));
      }
      setLoading(false);
    }
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (!venue) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground">Venue not found</p>
        <Link to="/venues" className="text-primary mt-2 inline-block">Back to Venues</Link>
      </div>
    );
  }

  const priceLevel = venue.price_level || 2;

  return (
    <div className="max-w-3xl mx-auto pb-8">
      {/* Hero */}
      <div className="relative h-56 md:h-80 overflow-hidden">
        <img
          src={venue.image_url || 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=1200&q=80'}
          alt={venue.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
        <Link
          to="/venues"
          className="absolute top-4 left-4 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/60 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/60 transition-colors">
          <Share2 className="w-5 h-5" />
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-4 -mt-12 relative z-10"
      >
        {/* Badge requires a 'variant' prop. Use 'default' for category. */}
        {venue.category && (
          <Badge variant="default" className="bg-primary/80 text-white border-0 mb-3">{venue.category}</Badge>
        )}
        <h1 className="text-3xl font-display font-bold text-foreground mb-2">{venue.name}</h1>

        <div className="flex items-center gap-4 mb-4 text-sm">
          <span className="flex items-center gap-1 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            {venue.location}
          </span>
          <span className="flex items-center gap-1 text-foreground">
            <Star className="w-4 h-4 fill-accent text-accent" />
            {venue.rating || '4.5'} ({venue.review_count || 0})
          </span>
          <span className="text-accent font-medium">
            {'R'.repeat(priceLevel)}
            <span className="text-muted-foreground/30">{'R'.repeat(4 - priceLevel)}</span>
          </span>
        </div>

        {venue.opening_hours && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Clock className="w-4 h-4" />
            {venue.opening_hours}
          </div>
        )}

        {venue.description && (
          <p className="text-sm text-muted-foreground leading-relaxed mb-6">{venue.description}</p>
        )}

        {venue.vibe_tags && venue.vibe_tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {venue.vibe_tags.map(tag => (
              <span key={tag} className="text-xs px-3 py-1 rounded-full bg-secondary text-muted-foreground">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Upcoming events at this venue */}
        {events.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-3">Upcoming at {venue.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}