

import { CalendarDays, MapPin, Users, Activity } from "lucide-react";
import { useState } from "react";
import { demoEvents } from '../lib/query-clients';

const fakeVenues = [
  { id: 1, name: "Velvet Lounge" },
  { id: 2, name: "Jazz Bar" },
  { id: 3, name: "Club Nova" },
  { id: 4, name: "The Botanical Bar" },
];
const fakePosts = [
  { id: 1, author: "Jane Doe", content: "Had an amazing night at Velvet Lounge!" },
  { id: 2, author: "DJ Flex", content: "Spinning again this Friday!" },
  { id: 3, author: "Emily Carter", content: "Try my new cocktail at the bar!" },
  { id: 4, author: "Mike Brown", content: "Security tip: keep your valuables safe." },
  { id: 5, author: "Sarah Lee", content: "Table service with a smile!" },
  { id: 6, author: "Nina Patel", content: "Proud of our team tonight." },
];

export default function Dashboard() {
  // Demo stats
  const stats = {
    events: demoEvents.length,
    venues: fakeVenues.length,
    staff: 8,
    posts: fakePosts.length,
  };
  const recentEvents = demoEvents.slice(0, 8).map(ev => ({
    ...ev,
    venue: ev.venue_name,
    date: new Date(ev.date).toLocaleString('en-US', { month: 'short', day: 'numeric' }).toUpperCase(),
  }));
  const [modal, setModal] = useState(null);

  return (
    <div className="max-w-5xl mx-auto px-4 pt-12 pb-8">
      <h1 className="text-4xl font-extrabold text-white mb-10">Dashboard</h1>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        <div className="rounded-2xl bg-[#18181b] p-6 flex flex-col items-center border border-[#27272a]">
          <CalendarDays className="w-8 h-8 text-pink-500 mb-2" />
          <div className="text-2xl font-bold text-white">{stats.events}</div>
          <div className="text-sm text-white/60">Total Events</div>
        </div>
        <div className="rounded-2xl bg-[#18181b] p-6 flex flex-col items-center border border-[#27272a]">
          <MapPin className="w-8 h-8 text-pink-500 mb-2" />
          <div className="text-2xl font-bold text-white">{stats.venues}</div>
          <div className="text-sm text-white/60">Venues</div>
        </div>
        <div className="rounded-2xl bg-[#18181b] p-6 flex flex-col items-center border border-[#27272a]">
          <Users className="w-8 h-8 text-pink-500 mb-2" />
          <div className="text-2xl font-bold text-white">{stats.staff}</div>
          <div className="text-sm text-white/60">Staff Members</div>
        </div>
        <div className="rounded-2xl bg-[#18181b] p-6 flex flex-col items-center border border-[#27272a]">
          <Activity className="w-8 h-8 text-pink-500 mb-2" />
          <div className="text-2xl font-bold text-white">{stats.posts}</div>
          <div className="text-sm text-white/60">Social Posts</div>
        </div>
      </div>

      {/* Manage sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="rounded-2xl bg-gradient-to-br from-pink-600 to-pink-400 p-6 text-white flex flex-col justify-between min-h-[120px] shadow-lg">
          <div className="font-bold text-lg mb-1">Manage Staff</div>
          <div className="text-sm mb-3">Table girls, managers & more</div>
          <button onClick={() => setModal('staff')} className="bg-white/20 hover:bg-white/30 text-white font-semibold rounded-xl px-4 py-2 w-fit transition">Go</button>
        </div>
        <div className="rounded-2xl bg-gradient-to-br from-purple-700 to-pink-500 p-6 text-white flex flex-col justify-between min-h-[120px] shadow-lg">
          <div className="font-bold text-lg mb-1">Events</div>
          <div className="text-sm mb-3">View & manage upcoming events</div>
          <button onClick={() => setModal('events')} className="bg-white/20 hover:bg-white/30 text-white font-semibold rounded-xl px-4 py-2 w-fit transition">Go</button>
        </div>
        <div className="rounded-2xl bg-gradient-to-br from-green-700 to-pink-400 p-6 text-white flex flex-col justify-between min-h-[120px] shadow-lg">
          <div className="font-bold text-lg mb-1">Venues</div>
          <div className="text-sm mb-3">Browse and manage club venues</div>
          <button onClick={() => setModal('venues')} className="bg-white/20 hover:bg-white/30 text-white font-semibold rounded-xl px-4 py-2 w-fit transition">Go</button>
        </div>
      </div>

      {/* Recent Events */}
      <div className="bg-[#18181b] rounded-2xl border border-[#27272a] p-6 mb-10">
        <div className="flex items-center justify-between mb-4">
          <div className="font-bold text-lg text-white">Recent Events</div>
          <a href="#" className="text-pink-500 text-sm font-medium">See all</a>
        </div>
        <div className="divide-y divide-[#27272a]">
          {recentEvents.map(ev => (
            <div key={ev.id} className="flex items-center justify-between py-3">
              <div>
                <div className="font-medium text-white">{ev.title}</div>
                <div className="text-xs text-white/60">{ev.venue} &middot; {ev.genre}</div>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-pink-500 text-white text-xs font-semibold rounded-full px-3 py-1 mr-2">{ev.date}</span>
                <span className="bg-pink-500/20 text-pink-500 text-xs font-semibold rounded-full px-3 py-1 capitalize">{ev.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Demo modals for Go buttons */}
      {modal === 'staff' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-[#18181b] rounded-2xl p-8 w-full max-w-md text-white relative">
            <button onClick={() => setModal(null)} className="absolute top-3 right-3 text-white/60 hover:text-white text-xl">&times;</button>
            <div className="font-bold text-2xl mb-2">Staff Members</div>
            <ul className="space-y-2">
              <li>Jane Doe (Table Girl, Velvet Lounge)</li>
              <li>John Smith (Manager, Jazz Bar)</li>
              <li>Emily Carter (Bartender, Velvet Lounge)</li>
              <li>Mike Brown (Security, Club Nova)</li>
              <li>DJ Flex (DJ, Jazz Bar)</li>
              <li>Sarah Lee (Table Girl, Club Nova)</li>
              <li>Carlos Vega (Bartender, Jazz Bar)</li>
              <li>Nina Patel (Manager, Velvet Lounge)</li>
            </ul>
          </div>
        </div>
      )}
      {modal === 'events' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-[#18181b] rounded-2xl p-8 w-full max-w-md text-white relative">
            <button onClick={() => setModal(null)} className="absolute top-3 right-3 text-white/60 hover:text-white text-xl">&times;</button>
            <div className="font-bold text-2xl mb-2">Upcoming Events</div>
            <ul className="space-y-2">
              {recentEvents.map(ev => (
                <li key={ev.id}>{ev.title} ({ev.genre}, {ev.venue})</li>
              ))}
            </ul>
          </div>
        </div>
      )}
      {modal === 'venues' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-[#18181b] rounded-2xl p-8 w-full max-w-md text-white relative">
            <button onClick={() => setModal(null)} className="absolute top-3 right-3 text-white/60 hover:text-white text-xl">&times;</button>
            <div className="font-bold text-2xl mb-2">Venues</div>
            <ul className="space-y-2">
              {fakeVenues.map(v => (
                <li key={v.id}>{v.name}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
