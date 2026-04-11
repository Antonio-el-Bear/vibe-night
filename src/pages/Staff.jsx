
import { useState } from "react";

const STAFF_ROLES = ["All", "Table Girl", "Manager", "Bartender", "Security", "DJ"];

export default function Staff() {
  const [search, setSearch] = useState("");
  const [activeRole, setActiveRole] = useState("All");
  // Demo fake staff data
  const staff = [
    { id: 1, name: "Jane Doe", role: "Table Girl", venue: "Velvet Lounge" },
    { id: 2, name: "John Smith", role: "Manager", venue: "Jazz Bar" },
    { id: 3, name: "Emily Carter", role: "Bartender", venue: "Velvet Lounge" },
    { id: 4, name: "Mike Brown", role: "Security", venue: "Club Nova" },
    { id: 5, name: "DJ Flex", role: "DJ", venue: "Jazz Bar" },
    { id: 6, name: "Sarah Lee", role: "Table Girl", venue: "Club Nova" },
  ];

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
              <div key={member.id} className="bg-[#23232a] rounded-xl p-5 text-white flex flex-col gap-1 shadow hover:shadow-pink-500/20 transition cursor-pointer">
                <div className="font-bold text-lg">{member.name}</div>
                <div className="text-sm text-white/80">{member.role} @ {member.venue}</div>
                <button className="mt-2 self-end bg-pink-500 hover:bg-pink-600 text-white text-xs font-semibold rounded-lg px-3 py-1 transition">View Profile</button>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
