import { Link } from 'react-router-dom';
import { CalendarDays, MapPin, Users, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import moment from 'moment';

export default function EventCard({ event, featured = false }) {
  const eventDate = moment(event.date);
  const isLive = event.status === 'live';
  const isSoldOut = event.status === 'sold_out';

  return (
    <Link
      to={`/events/${event.id}`}
      className={`group block rounded-2xl overflow-hidden bg-card border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 ${
        featured ? 'col-span-full md:col-span-2' : ''
      }`}
    >
      <div className={`relative overflow-hidden ${featured ? 'h-64 md:h-80' : 'h-44'}`}>
        <img
          src={event.image_url || 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&q=80'}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        {/* Status badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {isLive && (
            <Badge className="bg-red-500/90 text-white border-0 animate-pulse-glow">
              <Zap className="w-3 h-3 mr-1" />
              LIVE
            </Badge>
          )}
          {isSoldOut && (
            <Badge className="bg-muted/90 text-foreground border-0">SOLD OUT</Badge>
          )}
          {event.genre && (
            <Badge className="bg-primary/80 text-white border-0 text-xs">{event.genre}</Badge>
          )}
        </div>

        {/* Date pill */}
        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md rounded-xl px-3 py-1.5 text-center">
          <div className="text-xs font-bold text-accent uppercase">{eventDate.format('MMM')}</div>
          <div className="text-lg font-bold text-white leading-tight">{eventDate.format('DD')}</div>
        </div>

        {/* Bottom info */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className={`font-bold text-white mb-1 group-hover:text-primary transition-colors ${featured ? 'text-2xl font-display' : 'text-base'}`}>
            {event.title}
          </h3>
          <div className="flex items-center gap-3 text-white/70 text-sm">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              {event.venue_name}
            </span>
            <span className="flex items-center gap-1">
              <CalendarDays className="w-3.5 h-3.5" />
              {event.time || eventDate.format('h:mm A')}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users className="w-4 h-4" />
          <span>{event.rsvp_count || 0} going</span>
        </div>
        {event.price ? (
          <span className="text-sm font-semibold text-accent">R{event.price}</span>
        ) : (
          <Badge variant="outline" className="text-emerald-400 border-emerald-400/30 text-xs">FREE</Badge>
        )}
      </div>
    </Link>
  );
}