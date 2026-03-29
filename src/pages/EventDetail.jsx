import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CalendarDays, MapPin, Clock, Users, Share2, Heart, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';
import moment from 'moment';

export default function EventDetail() {
  const { id } = useParams();
  const { toast } = useToast();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rsvpStatus, setRsvpStatus] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchData() {
      // TODO: Replace with new API calls
      setEvent(null); // Placeholder
      setUser(null); // Placeholder
      // setRsvpStatus(null); // Placeholder
      setLoading(false);
    }
    fetchData();
  }, [id]);

  async function handleRSVP(status) {
    if (!user) return;
    // TODO: Replace with new RSVP logic
    setRsvpStatus(status);
    toast({ title: status === 'going' ? "You're going! 🎉" : "Marked as interested" });
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground">Event not found</p>
        <Link to="/events" className="text-primary mt-2 inline-block">Back to Events</Link>
      </div>
    );
  }

  const eventDate = moment(event.date);

  return (
    <div className="max-w-3xl mx-auto pb-8">
      {/* Hero Image */}
      <div className="relative h-64 md:h-96 overflow-hidden">
        <img
          src={event.image_url || 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200&q=80'}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
        
        {/* Back button */}
        <Link
          to="/events"
          className="absolute top-4 left-4 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/60 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>

        {/* Share */}
        <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/60 transition-colors">
          <Share2 className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-4 -mt-16 relative z-10"
      >
        <div className="flex gap-2 mb-3">
          {event.genre && <Badge className="bg-primary/80 text-white border-0">{event.genre}</Badge>}
          {event.status === 'live' && <Badge className="bg-red-500 text-white border-0 animate-pulse">LIVE</Badge>}
        </div>

        <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">{event.title}</h1>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-card rounded-xl p-3 border border-border/50">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <CalendarDays className="w-4 h-4 text-primary" />
              <span className="text-xs">Date</span>
            </div>
            <p className="text-sm font-medium text-foreground">{eventDate.format('ddd, MMM DD, YYYY')}</p>
          </div>
          <div className="bg-card rounded-xl p-3 border border-border/50">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Clock className="w-4 h-4 text-primary" />
              <span className="text-xs">Time</span>
            </div>
            <p className="text-sm font-medium text-foreground">{event.time || 'TBA'}</p>
          </div>
          <div className="bg-card rounded-xl p-3 border border-border/50">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="text-xs">Venue</span>
            </div>
            <p className="text-sm font-medium text-foreground">{event.venue_name}</p>
          </div>
          <div className="bg-card rounded-xl p-3 border border-border/50">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Users className="w-4 h-4 text-primary" />
              <span className="text-xs">Attending</span>
            </div>
            <p className="text-sm font-medium text-foreground">{event.rsvp_count || 0} people</p>
          </div>
        </div>

        {/* Description */}
        {event.description && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-foreground mb-2">About</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{event.description}</p>
          </div>
        )}

        {/* Tags */}
        {event.tags && event.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {event.tags.map(tag => (
              <span key={tag} className="text-xs px-3 py-1 rounded-full bg-secondary text-muted-foreground">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* RSVP Actions */}
        <div className="flex gap-3">
          <Button
            onClick={() => handleRSVP('going')}
            className={`flex-1 rounded-xl h-12 font-semibold text-base ${
              rsvpStatus === 'going'
                ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
                : 'bg-primary hover:bg-primary/90 text-primary-foreground'
            }`}
          >
            {rsvpStatus === 'going' ? (
              <>
                <Check className="w-5 h-5 mr-2" />
                Going
              </>
            ) : (
              event.price ? `RSVP · R${event.price}` : 'RSVP — Free'
            )}
          </Button>
          <Button
            onClick={() => handleRSVP('interested')}
            variant="outline"
            className={`rounded-xl h-12 px-4 ${
              rsvpStatus === 'interested' ? 'border-pink-400 text-pink-400' : ''
            }`}
          >
            <Heart className={`w-5 h-5 ${rsvpStatus === 'interested' ? 'fill-pink-400 text-pink-400' : ''}`} />
          </Button>
        </div>
      </motion.div>
    </div>
  );
}