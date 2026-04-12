const NAV_ITEMS = [
  { id: "home",      icon: "🏠", label: "Home"      },
  { id: "explore",   icon: "🔍", label: "Explore"   },
  { id: "clips",     icon: "🎬", label: "Clips"     },
  { id: "venues",    icon: "📍", label: "Venues"    },
  { id: "dashboard", icon: "⊞",  label: "Dashboard" },
];

export default function BottomNav({ active, onCreateClip }) {
  return (
    <div style={{
      position: "absolute", bottom: 0, left: 0, right: 0,
      background: "rgba(10,10,10,0.95)",
      borderTop: "1px solid #1a1a1a",
      display: "flex", alignItems: "center",
      padding: "8px 0 20px", zIndex: 60,
      backdropFilter: "blur(10px)"
    }}>
      {NAV_ITEMS.map(item => {
        const isActive = active === item.id;
        const isClips = item.id === "clips";
        return (
          <button
            key={item.id}
            onClick={isClips ? onCreateClip : undefined}
            style={{
              flex: 1, background: "none", border: "none", cursor: "pointer",
              display: "flex", flexDirection: "column", alignItems: "center", gap: 3
            }}
          >
            {isClips ? (
              <div style={{
                width: 40, height: 40, borderRadius: 14,
                background: "#a855f7", display: "flex",
                alignItems: "center", justifyContent: "center",
                fontSize: 18, marginTop: -16,
                boxShadow: "0 0 20px #a855f740"
              }}>
                🎬
              </div>
            ) : (
              <span style={{ fontSize: 20 }}>{item.icon}</span>
            )}
            <span style={{
              fontSize: 9, fontWeight: 600, letterSpacing: 0.3,
              color: isActive ? "#a855f7" : isClips ? "#a855f7" : "#444"
            }}>
              {item.label.toUpperCase()}
            </span>
          </button>
        );
      })}
    </div>
  );
}
