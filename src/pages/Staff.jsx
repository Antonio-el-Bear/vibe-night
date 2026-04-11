import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const STAFF_ROLES = ["All", "Table Girl", "Manager", "Bartender", "Security", "DJ"];

export default function Staff() {
  const [search, setSearch] = useState("");
  const [activeRole, setActiveRole] = useState("All");
  // Placeholder for staff list
  const staff = [];

  return (
    <div className="max-w-3xl mx-auto px-4 pt-8 pb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground mb-1">Staff Profiles</h1>
          <p className="text-muted-foreground text-sm">Table girls, managers & club staff</p>
        </div>
        <Button className="bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-xl px-5 py-2 text-base">+ Add Staff</Button>
      </div>

      <div className="flex flex-col md:flex-row md:items-center gap-3 mb-6">
        <Input
          type="text"
          placeholder="Search by name or venue..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="md:w-80 bg-background border border-border rounded-xl px-4 py-2"
        />
        <div className="flex gap-2 mt-2 md:mt-0">
          {STAFF_ROLES.map(role => (
            <Button
              key={role}
              variant={activeRole === role ? "default" : "outline"}
              className={`rounded-xl px-4 py-1.5 text-sm font-medium ${activeRole === role ? "bg-pink-500 text-white" : ""}`}
              onClick={() => setActiveRole(role)}
            >
              {role}
            </Button>
          ))}
        </div>
      </div>

      {/* Empty state */}
      {staff.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-center text-muted-foreground">
          <p className="text-lg mb-2">No staff found. Add your first staff member.</p>
        </div>
      )}
    </div>
  );
}
