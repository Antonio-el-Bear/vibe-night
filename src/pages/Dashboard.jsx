import { CalendarDays, MapPin, Users, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  // Placeholder stats
  const stats = {
    events: 6,
    venues: 6,
    staff: 0,
    posts: 5,
  };
  const recentEvents = [
    { id: 1, title: "Jazz & Cocktails Evening", venue: "The Botanical Bar", genre: "Jazz", date: "MAR 29", status: "upcoming" },
    // Add more events as needed
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 pt-8 pb-8">
      <h1 className="text-3xl font-display font-bold text-foreground mb-8">Dashboard</h1>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="rounded-2xl bg-card p-5 flex flex-col items-center shadow border border-border/60">
          <CalendarDays className="w-7 h-7 text-primary mb-2" />
          <div className="text-lg font-bold text-foreground">{stats.events}</div>
          <div className="text-xs text-muted-foreground">Total Events</div>
        </div>
        <div className="rounded-2xl bg-card p-5 flex flex-col items-center shadow border border-border/60">
          <MapPin className="w-7 h-7 text-primary mb-2" />
          <div className="text-lg font-bold text-foreground">{stats.venues}</div>
          <div className="text-xs text-muted-foreground">Venues</div>
        </div>
        <div className="rounded-2xl bg-card p-5 flex flex-col items-center shadow border border-border/60">
          <Users className="w-7 h-7 text-primary mb-2" />
          <div className="text-lg font-bold text-foreground">{stats.staff}</div>
          <div className="text-xs text-muted-foreground">Staff Members</div>
        </div>
        <div className="rounded-2xl bg-card p-5 flex flex-col items-center shadow border border-border/60">
          <Activity className="w-7 h-7 text-primary mb-2" />
          <div className="text-lg font-bold text-foreground">{stats.posts}</div>
          <div className="text-xs text-muted-foreground">Social Posts</div>
        </div>
      </div>

      {/* Manage sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="rounded-2xl bg-gradient-to-br from-primary/80 to-pink-700/80 p-6 text-white shadow flex flex-col justify-between min-h-[120px]">
          <div className="font-bold text-lg mb-1">Manage Staff</div>
          <div className="text-sm mb-3">Table girls, managers & more</div>
          <Button variant="secondary" className="bg-white/10 text-white border-white/20 rounded-xl px-4 py-2 w-fit">Go</Button>
        </div>
        <div className="rounded-2xl bg-gradient-to-br from-primary/80 to-primary/40 p-6 text-white shadow flex flex-col justify-between min-h-[120px]">
          <div className="font-bold text-lg mb-1">Events</div>
          <div className="text-sm mb-3">View & manage upcoming events</div>
          <Button variant="secondary" className="bg-white/10 text-white border-white/20 rounded-xl px-4 py-2 w-fit">Go</Button>
        </div>
        <div className="rounded-2xl bg-gradient-to-br from-green-700/80 to-primary/40 p-6 text-white shadow flex flex-col justify-between min-h-[120px]">
          <div className="font-bold text-lg mb-1">Venues</div>
          <div className="text-sm mb-3">Browse and manage club venues</div>
          <Button variant="secondary" className="bg-white/10 text-white border-white/20 rounded-xl px-4 py-2 w-fit">Go</Button>
        </div>
      </div>

      {/* Recent Events */}
      <div className="bg-card rounded-2xl border border-border/60 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="font-bold text-lg text-foreground">Recent Events</div>
          <a href="#" className="text-primary text-sm font-medium">See all</a>
        </div>
        <div className="divide-y divide-border">
          {recentEvents.map(ev => (
            <div key={ev.id} className="flex items-center justify-between py-3">
              <div>
                <div className="font-medium text-foreground">{ev.title}</div>
                <div className="text-xs text-muted-foreground">{ev.venue} &middot; {ev.genre}</div>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-primary/10 text-primary text-xs font-semibold rounded-full px-3 py-1 mr-2">{ev.date}</span>
                <span className="bg-pink-500/20 text-pink-600 text-xs font-semibold rounded-full px-3 py-1">{ev.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
