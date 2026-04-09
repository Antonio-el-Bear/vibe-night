import { useState, useEffect } from 'react';
import { CalendarDays, Heart, MessageCircle, LogOut, Settings } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import PostCard from '../components/PostCard';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [myPosts, setMyPosts] = useState([]);
  const [myRsvps, setMyRsvps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('posts');

  useEffect(() => {
    async function fetchData() {
      const userData = null; // base44 removed, replace with real user fetch logic
      setUser(userData);
      if (userData) {
        const [posts, rsvps] = await Promise.all([
          [], // Placeholder for posts
          [], // Placeholder for RSVPs
        ]);
        setMyPosts(posts);
        setMyRsvps(rsvps);
      }
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

  if (!user) {
    return (
      <div className="max-w-3xl mx-auto px-4 pt-20 text-center">
        <p className="text-muted-foreground mb-4">Please sign in to view your profile.</p>
      <Button onClick={() => { /* Redirect to login logic */ }} className="bg-primary text-primary-foreground rounded-xl">
          Sign In
        </Button>
      </div>
    );
  }

  const initials = (user.full_name || user.email || 'U').split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <div className="max-w-3xl mx-auto px-4 pt-6 pb-8">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        {/* Avatar, AvatarImage, and AvatarFallback props are correct for Radix UI. */}
        <Avatar className="w-24 h-24 mx-auto mb-4 border-2 border-primary/30">
          <AvatarImage src={`https://api.dicebear.com/9.x/notionists/svg?seed=${user.email}`} />
          <AvatarFallback className="bg-primary/20 text-primary text-2xl">{initials}</AvatarFallback>
        </Avatar>
        <h1 className="text-2xl font-display font-bold text-foreground">{user.full_name || 'User'}</h1>
        <p className="text-sm text-muted-foreground mt-1">{user.email}</p>

        {/* Stats */}
        <div className="flex items-center justify-center gap-8 mt-6">
          <div className="text-center">
            <p className="text-xl font-bold text-foreground">{myPosts.length}</p>
            <p className="text-xs text-muted-foreground">Posts</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-foreground">{myRsvps.filter(r => r.status === 'going').length}</p>
            <p className="text-xs text-muted-foreground">Events</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-foreground">{myRsvps.filter(r => r.status === 'interested').length}</p>
            <p className="text-xs text-muted-foreground">Saved</p>
          </div>
        </div>

        <div className="flex gap-3 justify-center mt-6">
          <Button
            variant="outline"
            size="sm"
            className="rounded-full gap-1.5"
          >
            <Settings className="w-4 h-4" />
            Edit Profile
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="rounded-full gap-1.5 text-destructive hover:text-destructive"
            // base44 removed, replace with real logout logic
            onClick={() => {/* TODO: Implement logout */}}
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-1 bg-secondary rounded-xl p-1 mb-6">
        {[
          { key: 'posts', label: 'My Posts', icon: MessageCircle },
          { key: 'events', label: 'My Events', icon: CalendarDays },
          { key: 'saved', label: 'Saved', icon: Heart },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.key
                ? 'bg-card text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === 'posts' && (
        <div className="space-y-4">
          {myPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
          {myPosts.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <MessageCircle className="w-10 h-10 mx-auto mb-2 opacity-30" />
              <p className="text-sm">No posts yet. Share your first moment!</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'events' && (
        <div className="text-center py-12 text-muted-foreground">
          <CalendarDays className="w-10 h-10 mx-auto mb-2 opacity-30" />
          <p className="text-sm">{myRsvps.filter(r => r.status === 'going').length > 0 ? 'Your upcoming events will appear here.' : 'No events yet. RSVP to an event!'}</p>
        </div>
      )}

      {activeTab === 'saved' && (
        <div className="text-center py-12 text-muted-foreground">
          <Heart className="w-10 h-10 mx-auto mb-2 opacity-30" />
          <p className="text-sm">{myRsvps.filter(r => r.status === 'interested').length > 0 ? 'Your saved events will appear here.' : 'No saved events yet.'}</p>
        </div>
      )}
    </div>
  );
}