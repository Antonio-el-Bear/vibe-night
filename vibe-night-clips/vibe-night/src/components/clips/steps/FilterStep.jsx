import { Label, SliderRow, NavRow } from "./TrimStep";

const FILTERS = [
  { id: "none",   label: "None",  bg: "#111",    cssFilter: "none" },
  { id: "haze",   label: "Haze",  bg: "#1a0a2e", cssFilter: "hue-rotate(270deg) saturate(1.4)" },
  { id: "verde",  label: "Verde", bg: "#0a1a0a", cssFilter: "hue-rotate(90deg) saturate(1.3)" },
  { id: "blaze",  label: "Blaze", bg: "#1a0a0a", cssFilter: "hue-rotate(330deg) saturate(1.5) contrast(1.1)" },
  { id: "frost",  label: "Frost", bg: "#0a0a1a", cssFilter: "hue-rotate(200deg) saturate(0.8) brightness(1.1)" },
  { id: "gold",   label: "Gold",  bg: "#1a1500", cssFilter: "sepia(0.4) saturate(1.3)" },
  { id: "noir",   label: "Noir",  bg: "#0a0a0a", cssFilter: "grayscale(0.8) contrast(1.2)" },
  { id: "vivid",  label: "Vivid", bg: "#1a0a1a", cssFilter: "saturate(2) contrast(1.1)" },
];

export default function FilterStep({ state, update, onNext, onBack }) {
  const getVideoStyle = () => {
    const f = FILTERS.find(f => f.id === state.filter) || FILTERS[0];
    const b = state.brightness / 50;
    const c = state.contrast / 50;
    const s = state.saturation / 50;
    return {
      filter: `${f.cssFilter === "none" ? "" : f.cssFilter} brightness(${b}) contrast(${c}) saturate(${s})`
    };
  };

  return (
    <div style={{ padding: "16px" }}>
      {/* Preview */}
      <div style={{
        borderRadius: 14, height: 180, overflow: "hidden",
        marginBottom: 14, position: "relative",
        background: FILTERS.find(f => f.id === state.filter)?.bg || "#111",
        display: "flex", alignItems: "center", justifyContent: "center"
      }}>
        {state.videoUrl ? (
          <video src={state.videoUrl} style={{ width: "100%", height: "100%", objectFit: "cover", ...getVideoStyle() }} muted playsInline />
        ) : (
          <div style={{ fontSize: 40, ...{ filter: getVideoStyle().filter } }}>🎬</div>
        )}
        <div style={{
          position: "absolute", bottom: 8, left: 8,
          background: "rgba(0,0,0,0.6)", color: "#fff", fontSize: 11,
          padding: "3px 10px", borderRadius: 20
        }}>
          {FILTERS.find(f => f.id === state.filter)?.label || "No filter"}
        </div>
      </div>

      {/* Filter chips */}
      <Label>Filters</Label>
      <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4, marginBottom: 14, scrollbarWidth: "none" }}>
        {FILTERS.map(f => (
          <button
            key={f.id}
            onClick={() => update({ filter: f.id })}
            style={{
              flexShrink: 0, width: 64, height: 64, borderRadius: 12, cursor: "pointer",
              border: `2px solid ${state.filter === f.id ? "#a855f7" : "transparent"}`,
              background: f.bg, display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center", gap: 4, transition: "all 0.2s"
            }}
          >
            <span style={{ fontSize: 20, filter: f.cssFilter }}>🎬</span>
            <span style={{ color: state.filter === f.id ? "#a855f7" : "#666", fontSize: 9, fontWeight: 600 }}>{f.label}</span>
          </button>
        ))}
      </div>

      {/* Adjustments */}
      <Label>Adjustments</Label>
      <SliderRow label="Brightness" min={0} max={100} step={1} value={state.brightness} onChange={v => update({ brightness: v })} format={v => v} />
      <SliderRow label="Contrast"   min={0} max={100} step={1} value={state.contrast}   onChange={v => update({ contrast: v })}   format={v => v} />
      <SliderRow label="Saturation" min={0} max={100} step={1} value={state.saturation} onChange={v => update({ saturation: v })} format={v => v} />

      <NavRow onBack={onBack} onNext={onNext} />
    </div>
  );
}
