import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, Search, CalendarDays, MapPin, User, Bell, Settings as SettingsIcon, Users, LayoutDashboard } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const navItems = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/explore', icon: Search, label: 'Explore' },
  { path: '/events', icon: CalendarDays, label: 'Events' },
  { path: '/venues', icon: MapPin, label: 'Venues' },
  { path: '/staff', icon: Users, label: 'Staff' },
  { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/notifications', icon: Bell, label: 'Notifications' },
  { path: '/settings', icon: SettingsIcon, label: 'Settings' },
];

export default function Layout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background">

      {/* Top Bar with Profile Avatar */}
      <div className="flex items-center justify-end px-4 py-2 md:hidden bg-card/80">
        <Link to="/profile" className="flex items-center gap-2">
          <Avatar className="w-8 h-8">
            <AvatarImage src={"https://api.dicebear.com/9.x/notionists/svg?seed=profile"} />
            <AvatarFallback>P</AvatarFallback>
          </Avatar>
        </Link>
      </div>

      {/* Main Content */}
      <main className="pb-20 md:pb-0 md:pl-20 lg:pl-64">
        <Outlet />
      </main>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 h-full w-20 lg:w-64 bg-card/80 backdrop-blur-xl border-r border-border flex-col z-50">
        <div className="p-4 lg:p-6 flex flex-col gap-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-pink-500 flex items-center justify-center">
              <span className="text-white font-bold text-lg">B</span>
            </div>
            <span className="hidden lg:block font-display text-xl font-bold text-foreground">Vibenight</span>
          </Link>
          {/* Profile Avatar Shortcut */}
          <Link to="/profile" className="flex items-center gap-2 mt-2">
            <Avatar className="w-10 h-10">
              <AvatarImage src={"https://api.dicebear.com/9.x/notionists/svg?seed=profile"} />
              <AvatarFallback>P</AvatarFallback>
            </Avatar>
            <span className="hidden lg:block font-medium">Profile</span>
          </Link>
        </div>
        <nav className="flex-1 px-3 lg:px-4 mt-4 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? 'bg-primary/15 text-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                }`}
              >
                <item.icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-primary' : 'group-hover:text-foreground'}`} />
                <span className="hidden lg:block text-sm font-medium">{item.label}</span>
                {isActive && (
                  <div className="hidden lg:block ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
                )}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card/90 backdrop-blur-xl border-t border-border z-50 safe-area-bottom">
        <div className="flex items-center justify-around px-2 py-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all duration-200 ${
                  isActive ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}