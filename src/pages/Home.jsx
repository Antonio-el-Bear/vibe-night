import { useState, useEffect } from 'react';
import { demoEvents } from '../lib/query-clients';
import { motion } from 'framer-motion';
import HeroSection from '../components/HeroSection';
import SectionHeader from '../components/SectionHeader';
import EventCard from '../components/EventCard';
import VenueCard from '../components/VenueCard';
import ClipCard from '../components/ClipCard';
import CreateClipForm from '../components/CreateClipForm';
import ReelsViewer from '../components/ReelsViewer';

export default function Home() {
  const [events, setEvents] = useState(demoEvents);
  const [venues, setVenues] = useState([
    { id: 1, name: "Velvet Lounge" },
    { id: 2, name: "Jazz Bar" },
    { id: 3, name: "Club Nova" },
    { id: 4, name: "The Botanical Bar" },
  ]);
  const [clips, setClips] = useState([
    // Demo clips (nightlife, party, event themed)
    {
      id: 1,
      author_name: "Jane Doe",
      author_email: "jane@example.com",
      created_date: new Date(),
      type: "video",
      media_url: "https://vod-progressive.akamaized.net/exp=1713080000~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F3536%2F16%2F419017013%2F1808570132.mp4~hmac=7e2e2e2e2e2e2e2e2e2e2e2e2e2e2e2e2e2e2e2e2e2e2e2e2e2e2e2e2e2e2e2e2/vimeo-prod-skyfire-std-us/01/3536/16/419017013/1808570132.mp4?filename=party-dance.mp4",
    },
    {
      id: 2,
      author_name: "DJ Flex",
      author_email: "djflex@example.com",
      created_date: new Date(),
      type: "video",
      media_url: "https://vod-progressive.akamaized.net/exp=1713080000~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F3536%2F16%2F419017013%2F1808570132.mp4~hmac=7e2e2e2e2e2e2e2e2e2e2e2e2e2e2e2e2e2e2e2e2e2e2e2e2e2e2e2e2e2e2e2e2/vimeo-prod-skyfire-std-us/01/3536/16/419017013/1808570132.mp4?filename=club-dj.mp4",
    },
    {
      id: 3,
      author_name: "Emily Carter",
      author_email: "emily@example.com",
      created_date: new Date(),
      type: "image",
      media_url: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 4,
      author_name: "Mike Brown",
      author_email: "mike@example.com",
      created_date: new Date(),
      type: "image",
      media_url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 5,
      author_name: "Sarah Lee",
      author_email: "sarah@example.com",
      created_date: new Date(),
      type: "image",
      media_url: "https://images.unsplash.com/photo-1515168833906-d2a3b82b302b?auto=format&fit=crop&w=800&q=80",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [reelsOpen, setReelsOpen] = useState(false);
  const [reelsIndex, setReelsIndex] = useState(0);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  const featuredEvent = events.find(e => e.featured) || events[0];
  const otherEvents = events.filter(e => e.id !== featuredEvent?.id).slice(0, 4);

  return (
    <div className="max-w-3xl mx-auto">
      <HeroSection />

      {/* Featured & Events */}
      {events.length > 0 && (
        <section className="px-4 mb-8">
          <SectionHeader title="Happening Soon" subtitle="Don't miss out" linkTo="/events" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {featuredEvent && <EventCard event={featuredEvent} featured />}
            {otherEvents.map((event, i) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <EventCard event={event} />
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Venues */}
      {venues.length > 0 && (
        <section className="px-4 mb-8">
          <SectionHeader title="Top Venues" subtitle="Explore your city" linkTo="/venues" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {venues.slice(0, 6).map((venue, i) => (
              <motion.div
                key={venue.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <VenueCard venue={venue} />
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Media Clips Feed */}
      <section className="px-4 mb-8">
        <SectionHeader title="Vibe Night Clips" subtitle="Share and enjoy moments" linkTo="/clips" />
        <CreateClipForm onClipCreated={(newClip) => setClips(prev => [newClip, ...prev])} />
        <div className="space-y-4 mt-4">
          {clips.map((clip, i) => (
            <motion.div
              key={clip.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <div onClick={() => { setReelsOpen(true); setReelsIndex(i); }} className="cursor-pointer">
                <ClipCard clip={clip} />
              </div>
            </motion.div>
          ))}
          {clips.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <p className="text-sm">No clips yet. Be the first to share a vibe!</p>
            </div>
          )}
        </div>
        {reelsOpen && (
          <ReelsViewer
            clips={clips}
            initialIndex={reelsIndex}
            onClose={() => setReelsOpen(false)}
          />
        )}
      </section>
    </div>
  );
}