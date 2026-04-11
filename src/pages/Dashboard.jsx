
import { CalendarDays, MapPin, Users, Activity } from "lucide-react";

export default function Dashboard() {
  // Placeholder stats
  const stats = {
    events: 12,
    venues: 4,
    staff: 8,
    posts: 23,
  };
  const recentEvents = [
    { id: 1, title: "Jazz & Cocktails Evening", venue: "The Botanical Bar", genre: "Jazz", date: "MAR 29", status: "upcoming" },
    { id: 2, title: "House Party", venue: "Velvet Lounge", genre: "House", date: "APR 2", status: "upcoming" },
    { id: 3, title: "Amapiano Night", venue: "Club Nova", genre: "Amapiano", date: "APR 5", status: "upcoming" },
    { id: 4, title: "Hip Hop Bash", venue: "Jazz Bar", genre: "Hip Hop", date: "APR 8", status: "upcoming" },
    { id: 5, title: "RnB Vibes", venue: "Velvet Lounge", genre: "R&B", date: "APR 12", status: "upcoming" },
  ];

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
          <button className="bg-white/20 hover:bg-white/30 text-white font-semibold rounded-xl px-4 py-2 w-fit transition">Go</button>
        </div>
        <div className="rounded-2xl bg-gradient-to-br from-purple-700 to-pink-500 p-6 text-white flex flex-col justify-between min-h-[120px] shadow-lg">
          <div className="font-bold text-lg mb-1">Events</div>
          <div className="text-sm mb-3">View & manage upcoming events</div>
          <button className="bg-white/20 hover:bg-white/30 text-white font-semibold rounded-xl px-4 py-2 w-fit transition">Go</button>
        </div>
        <div className="rounded-2xl bg-gradient-to-br from-green-700 to-pink-400 p-6 text-white flex flex-col justify-between min-h-[120px] shadow-lg">
          <div className="font-bold text-lg mb-1">Venues</div>
          <div className="text-sm mb-3">Browse and manage club venues</div>
          <button className="bg-white/20 hover:bg-white/30 text-white font-semibold rounded-xl px-4 py-2 w-fit transition">Go</button>
        </div>
      </div>

      {/* Recent Events */}
      <div className="bg-[#18181b] rounded-2xl border border-[#27272a] p-6">
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
    </div>
  );
}
