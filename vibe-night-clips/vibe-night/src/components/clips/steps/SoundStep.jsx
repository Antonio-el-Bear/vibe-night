import { Label, SliderRow, NavRow } from "./TrimStep";

const SOUNDS = [
  { id: "original", name: "Original Audio",  genre: "from your clip",     bars: [6,10,8,12,5,9,11,7] },
  { id: "amapiano", name: "Amapiano Mix",     genre: "Afrobeats · trending", bars: [8,14,6,10,14,8,12,5] },
  { id: "deephouse",name: "Deep House",       genre: "Electronic · popular", bars: [5,9,13,7,11,5,8,12] },
  { id: "gqom",     name: "Gqom Nights",      genre: "SA · local vibes",    bars: [12,6,10,14,8,13,5,9] },
  { id: "afrobeats",name: "Afrobeats Party",  genre: "Afrobeats · hot",     bars: [9,13,5,11,7,14,6,10] },
  { id: "lounge",   name: "Velvet Lounge Mix",genre: "Chill · ambient",     bars: [4,7,10,5,8,6,9,4] },
];

export default function SoundStep({ state, update, onNext, onBack }) {
  return (
    <div style={{ padding: "16px" }}>
      {/* Visual waveform preview */}
      <div style={{
        background: "#111", borderRadius: 14, height: 120,
        display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", marginBottom: 16, gap: 12
      }}>
        <div style={{ fontSize: 28 }}>🎵</div>
        <div style={{ display: "flex", gap: 3, alignItems: "flex-end", height: 32 }}>
          {(SOUNDS.find(s => s.id === state.sound)?.bars || SOUNDS[0].bars).map((h, i) => (
            <div key={i} style={{
              width: 5, height: h, background: "#a855f7",
              borderRadius: 2, opacity: 0.6 + (i % 3) * 0.15,
              animation: `wave ${0.5 + i * 0.08}s ease-in-out infinite alternate`
            }} />
          ))}
        </div>
        <p style={{ color: "#555", fontSize: 11 }}>
          {SOUNDS.find(s => s.id === state.sound)?.name}
        </p>
      </div>

      <Label>Choose sound</Label>
      <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4, marginBottom: 16, scrollbarWidth: "none" }}>
        {SOUNDS.map(s => (
          <button
            key={s.id}
            onClick={() => update({ sound: s.id })}
            style={{
              flexShrink: 0, background: "#1a1a1a", cursor: "pointer",
              border: `1px solid ${state.sound === s.id ? "#a855f7" : "#2a2a2a"}`,
              borderRadius: 12, padding: "10px 12px", minWidth: 110, textAlign: "left",
              transition: "all 0.2s"
            }}
          >
            <div style={{ color: state.sound === s.id ? "#e2d4f7" : "#ccc", fontSize: 11, fontWeight: 700, marginBottom: 3 }}>{s.name}</div>
            <div style={{ color: "#555", fontSize: 10, marginBottom: 8 }}>{s.genre}</div>
            <div style={{ display: "flex", gap: 2, alignItems: "flex-end", height: 14 }}>
              {s.bars.slice(0, 5).map((h, i) => (
                <div key={i} style={{
                  width: 3, height: Math.round(h * 0.8),
                  background: state.sound === s.id ? "#a855f7" : "#333", borderRadius: 1
                }} />
              ))}
            </div>
          </button>
        ))}
      </div>

      <SliderRow label="Music vol" min={0} max={100} step={1} value={state.volume} onChange={v => update({ volume: v })} format={v => v + "%"} />
      <SliderRow label="Original"  min={0} max={100} step={1} value={100 - state.volume} onChange={v => update({ volume: 100 - v })} format={v => v + "%"} />

      <NavRow onBack={onBack} onNext={onNext} />
      <style>{`@keyframes wave { from { transform: scaleY(0.6); } to { transform: scaleY(1); } }`}</style>
    </div>
  );
}
