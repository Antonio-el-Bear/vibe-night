

import { useState } from "react";
import moment from "moment";
import { Button } from '@/components/ui/button';

const STAFF_ROLES = ["All", "Table Girl", "Manager", "Bartender", "Security", "DJ"];

const fakeStaff = [
  { id: 1, name: "Jane Doe", role: "Table Girl", venue: "Velvet Lounge", avatar: "https://randomuser.me/api/portraits/women/44.jpg", bio: "Friendly and attentive, Jane makes every guest feel special.", onDuty: true, shiftEnd: moment().add(2, 'hours').toISOString(), clockIn: moment().subtract(1, 'hours').toISOString(), clockOut: null },
  { id: 2, name: "John Smith", role: "Manager", venue: "Jazz Bar", avatar: "https://randomuser.me/api/portraits/men/32.jpg", bio: "John keeps the club running smoothly every night.", onDuty: true, shiftEnd: moment().add(30, 'minutes').toISOString(), clockIn: moment().subtract(3, 'hours').toISOString(), clockOut: null },
  { id: 3, name: "Emily Carter", role: "Bartender", venue: "Velvet Lounge", avatar: "https://randomuser.me/api/portraits/women/65.jpg", bio: "Emily crafts the best cocktails in town.", onDuty: false, shiftEnd: null, clockIn: null, clockOut: null },
  { id: 4, name: "Mike Brown", role: "Security", venue: "Club Nova", avatar: "https://randomuser.me/api/portraits/men/41.jpg", bio: "Mike ensures everyone has a safe night out.", onDuty: false, shiftEnd: null, clockIn: null, clockOut: null },
  { id: 5, name: "DJ Flex", role: "DJ", venue: "Jazz Bar", avatar: "https://randomuser.me/api/portraits/men/77.jpg", bio: "Spinning the hottest tracks all night long.", onDuty: true, shiftEnd: moment().add(1, 'hours').toISOString(), clockIn: moment().subtract(2, 'hours').toISOString(), clockOut: null },
  { id: 6, name: "Sarah Lee", role: "Table Girl", venue: "Club Nova", avatar: "https://randomuser.me/api/portraits/women/12.jpg", bio: "Sarah brings energy and smiles to every table.", onDuty: false, shiftEnd: null, clockIn: null, clockOut: null },
  { id: 7, name: "Carlos Vega", role: "Bartender", venue: "Jazz Bar", avatar: "https://randomuser.me/api/portraits/men/23.jpg", bio: "Carlos is known for his signature mojitos.", onDuty: false, shiftEnd: null, clockIn: null, clockOut: null },
  { id: 8, name: "Nina Patel", role: "Manager", venue: "Velvet Lounge", avatar: "https://randomuser.me/api/portraits/women/33.jpg", bio: "Nina is the heart of the Velvet Lounge team.", onDuty: false, shiftEnd: null, clockIn: null, clockOut: null },
];

export default function Staff() {
  const [search, setSearch] = useState("");
  const [activeRole, setActiveRole] = useState("All");
  const [modal, setModal] = useState(null); // For demo profile modal
  const [staff, setStaff] = useState(fakeStaff);

  function handleClockIn(id) {
    setStaff(staff => staff.map(s =>
      s.id === id ? {
        ...s,
        onDuty: true,
        clockIn: moment().toISOString(),
        clockOut: null,
        shiftEnd: moment().add(4, 'hours').toISOString(),
      } : s
    ));
  }

  function handleClockOut(id) {
    setStaff(staff => staff.map(s =>
      s.id === id ? {
        ...s,
        onDuty: false,
        clockOut: moment().toISOString(),
        shiftEnd: null,
      } : s
    ));
  }

  return (
    <div className="max-w-4xl mx-auto px-4 pt-12 pb-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-extrabold text-white mb-1">Staff Profiles</h1>
          <p className="text-lg text-white/70">Table girls, managers & club staff</p>
        </div>
        <button className="bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-xl px-6 py-2 text-base transition">+ Add Staff</button>
      </div>

      <div className="flex flex-col md:flex-row md:items-center gap-3 mb-8">
        <input
          type="text"
          placeholder="Search by name or venue..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="md:w-96 w-full bg-[#18181b] border border-[#27272a] text-white placeholder:text-white/40 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
        <div className="flex gap-2 mt-2 md:mt-0">
          {STAFF_ROLES.map(role => (
            <button
              key={role}
              className={`rounded-xl px-4 py-1.5 text-sm font-medium border border-[#27272a] transition ${activeRole === role ? "bg-pink-500 text-white" : "bg-[#18181b] text-white/70 hover:bg-[#23232a]"}`}
              onClick={() => setActiveRole(role)}
              type="button"
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      {/* Staff list or empty state */}
      {staff.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <p className="text-lg text-white/60 mb-2">No staff found. Add your first staff member.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {staff
            .filter(member =>
              (activeRole === "All" || member.role === activeRole) &&
              (search === "" || member.name.toLowerCase().includes(search.toLowerCase()) || member.venue.toLowerCase().includes(search.toLowerCase()))
            )
            .map(member => (
              <div key={member.id} className="bg-[#23232a] rounded-xl p-5 text-white flex flex-col gap-2 shadow hover:shadow-pink-500/20 transition cursor-pointer">
                <div className="flex items-center gap-3">
                  <img src={member.avatar} alt={member.name} className="w-12 h-12 rounded-full object-cover border-2 border-pink-500" />
                  <div>
                    <div className="font-bold text-lg">{member.name}</div>
                    <div className="text-sm text-white/80">{member.role} @ {member.venue}</div>
                    {member.onDuty && member.shiftEnd && (
                      <div className="text-xs text-accent mt-1">Shift ends {moment(member.shiftEnd).fromNow()}</div>
                    )}
                    {!member.onDuty && member.clockOut && (
                      <div className="text-xs text-muted-foreground mt-1">Last clocked out {moment(member.clockOut).fromNow()}</div>
                    )}
                  </div>
                  <div className="ml-auto flex flex-col gap-2">
                    <Button size="sm" variant={member.onDuty ? "outline" : "default"} onClick={() => member.onDuty ? handleClockOut(member.id) : handleClockIn(member.id)}>
                      {member.onDuty ? "Clock Out" : "Clock In"}
                    </Button>
                    <button onClick={() => setModal(member)} className="self-end bg-pink-500 hover:bg-pink-600 text-white text-xs font-semibold rounded-lg px-3 py-1 transition">View Profile</button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
      <h2 className="text-xl font-semibold mt-10 mb-4">Upcoming Shift Changes</h2>
      <div className="space-y-2">
        {staff.filter(s => s.onDuty && s.shiftEnd && moment(s.shiftEnd).diff(moment(), 'minutes') < 60).length === 0 && (
          <div className="text-muted-foreground text-sm">No upcoming shift changes in the next hour.</div>
        )}
        {staff.filter(s => s.onDuty && s.shiftEnd && moment(s.shiftEnd).diff(moment(), 'minutes') < 60).map(member => (
          <div key={member.id} className="flex items-center gap-2 text-sm">
            <span className="font-medium">{member.name}</span>
            <span className="text-muted-foreground">({member.role})</span>
            <span className="text-accent">shifts in {moment(member.shiftEnd).fromNow(true)}</span>
          </div>
        ))}
      </div>

      {/* Demo profile modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-[#18181b] rounded-2xl p-8 w-full max-w-md text-white relative">
            <button onClick={() => setModal(null)} className="absolute top-3 right-3 text-white/60 hover:text-white text-xl">&times;</button>
            <div className="flex flex-col items-center gap-3">
              <img src={modal.avatar} alt={modal.name} className="w-20 h-20 rounded-full object-cover border-2 border-pink-500" />
              <div className="font-bold text-2xl">{modal.name}</div>
              <div className="text-pink-400 font-semibold">{modal.role}</div>
              <div className="text-white/70 mb-2">{modal.venue}</div>
              <div className="text-center text-white/80">{modal.bio}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
