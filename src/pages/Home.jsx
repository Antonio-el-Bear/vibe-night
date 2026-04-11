import { useState, useEffect } from 'react';
import { demoEvents } from '../lib/query-clients';
import { motion } from 'framer-motion';
import HeroSection from '../components/HeroSection';
import SectionHeader from '../components/SectionHeader';
import EventCard from '../components/EventCard';
import VenueCard from '../components/VenueCard';
import PostCard from '../components/PostCard';
import CreatePostForm from '../components/CreatePostForm';

export default function Home() {
  const [events, setEvents] = useState(demoEvents);
  const [venues, setVenues] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      // TODO: Replace with new API calls
      setEvents([]); // Placeholder
      setVenues([]); // Placeholder
      setPosts([]); // Placeholder
      setLoading(false);
    }
    fetchData();
  }, []);

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

      {/* Social Feed */}
      <section className="px-4 mb-8">
        {/* SectionHeader requires 'linkTo' prop. Provide a placeholder or actual route. */}
        <SectionHeader title="The Vibe" subtitle="What people are saying" linkTo="/vibe" />
        <CreatePostForm onPostCreated={(newPost) => setPosts(prev => [newPost, ...prev])} />
        <div className="space-y-4 mt-4">
          {posts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <PostCard post={post} />
            </motion.div>
          ))}
          {posts.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <p className="text-sm">No posts yet. Share your first moment!</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}