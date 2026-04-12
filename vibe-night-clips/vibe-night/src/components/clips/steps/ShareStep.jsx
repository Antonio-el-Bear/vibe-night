import { Label, NavRow } from "./TrimStep";

const PLATFORMS = [
  { id: "instagram", label: "Instagram", icon: "📸", sub: "Reels" },
  { id: "tiktok",    label: "TikTok",    icon: "🎵", sub: "For You page" },
  { id: "x",         label: "X",         icon: "✕",  sub: "Video post" },
  { id: "youtube",   label: "YouTube",   icon: "▶",  sub: "Shorts" },
  { id: "whatsapp",  label: "WhatsApp",  icon: "💬", sub: "Status" },
  { id: "vibenight", label: "vibe-night",icon: "🌙", sub: "Clips feed" },
];

const SCHEDULE = [
  { id: "now",     label: "Post now" },
  { id: "tonight", label: "Tonight 9pm" },
  { id: "friday",  label: "This Friday" },
];

export default function ShareStep({ state, update, onBack, onPost, posting }) {
  const togglePlatform = (id) => {
    const has = state.platforms.includes(id);
    update({ platforms: has ? state.platforms.filter(p => p !== id) : [...state.platforms, id] });
  };

  return (
    <div style={{ padding: "16px" }}>
      <Label>Post to platforms</Label>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: 8, marginBottom: 16 }}>
        {PLATFORMS.map(p => {
          const selected = state.platforms.includes(p.id);
          return (
            <button
              key={p.id}
              onClick={() => togglePlatform(p.id)}
              style={{
                background: selected ? "#a855f715" : "#1a1a1a",
                border: `1px solid ${selected ? "#a855f7" : "#2a2a2a"}`,
                borderRadius: 12, padding: "12px 6px", cursor: "pointer",
                textAlign: "center", transition: "all 0.2s"
              }}
            >
              <div style={{ fontSize: 22, marginBottom: 4 }}>{p.icon}</div>
              <div style={{ color: selected ? "#d4a8f7" : "#888", fontSize: 10, fontWeight: 700, marginBottom: 2 }}>{p.label}</div>
              <div style={{ color: selected ? "#a855f780" : "#444", fontSize: 9 }}>{p.sub}</div>
            </button>
          );
        })}
      </div>

      <Label>Schedule</Label>
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {SCHEDULE.map(s => (
          <button
            key={s.id}
            onClick={() => update({ scheduleType: s.id })}
            style={{
              flex: 1, padding: "8px 4px", borderRadius: 8, fontSize: 11, fontWeight: 600,
              cursor: "pointer", transition: "all 0.2s",
              background: state.scheduleType === s.id ? "#a855f720" : "#1a1a1a",
              border: `1px solid ${state.scheduleType === s.id ? "#a855f7" : "#2a2a2a"}`,
              color: state.scheduleType === s.id ? "#a855f7" : "#555"
            }}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Summary card */}
      <div style={{ background: "#111", borderRadius: 12, padding: "12px 14px", marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
          <span style={{ color: "#555", fontSize: 11 }}>Platforms</span>
          <span style={{ color: "#a855f7", fontSize: 11, fontWeight: 600 }}>{state.platforms.length} selected</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
          <span style={{ color: "#555", fontSize: 11 }}>Sound</span>
          <span style={{ color: "#ccc", fontSize: 11 }}>{state.sound}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ color: "#555", fontSize: 11 }}>Schedule</span>
          <span style={{ color: "#ccc", fontSize: 11 }}>{SCHEDULE.find(s => s.id === state.scheduleType)?.label}</span>
        </div>
      </div>

      <button
        onClick={onPost}
        disabled={posting || state.platforms.length === 0}
        style={{
          width: "100%", background: posting ? "#6b21a8" : "#a855f7",
          border: "none", borderRadius: 12, color: "#fff",
          fontSize: 15, fontWeight: 800, padding: "14px",
          cursor: posting || state.platforms.length === 0 ? "not-allowed" : "pointer",
          letterSpacing: 0.3, marginBottom: 8, transition: "all 0.3s"
        }}
      >
        {posting ? "Dropping your Clip... 🔥" : "Drop the Clip 🔥"}
      </button>

      <NavRow onBack={onBack} />
    </div>
  );
}
