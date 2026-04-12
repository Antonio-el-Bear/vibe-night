import { useRef, useState, useEffect } from "react";

const DURATIONS = [
  { label: "30s", val: 30 },
  { label: "45s", val: 45 },
  { label: "60s", val: 60 },
  { label: "Custom", val: null },
];

export default function TrimStep({ state, update, onNext }) {
  const barRef = useRef(null);
  const dragging = useRef(null);
  const [leftPct, setLeftPct] = useState(0);
  const [rightPct, setRightPct] = useState(70);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = Math.round(secs % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

  const getPct = (e) => {
    const bar = barRef.current;
    if (!bar) return 0;
    const rect = bar.getBoundingClientRect();
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
    return clamp((x / rect.width) * 100, 0, 100);
  };

  const onMouseMove = (e) => {
    if (!dragging.current) return;
    const pct = getPct(e);
    if (dragging.current === "l") {
      setLeftPct(clamp(pct, 0, rightPct - 10));
    } else {
      setRightPct(clamp(pct, leftPct + 10, 100));
    }
  };

  const onMouseUp = () => { dragging.current = null; };

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("touchmove", onMouseMove);
    window.addEventListener("touchend", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchmove", onMouseMove);
      window.removeEventListener("touchend", onMouseUp);
    };
  });

  const totalDur = state.duration || 60;
  const startSec = (leftPct / 100) * totalDur;
  const endSec = (rightPct / 100) * totalDur;

  return (
    <div style={{ padding: "16px" }}>
      {/* Preview */}
      <div style={{
        background: "#111", borderRadius: 14, height: 180,
        display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", marginBottom: 16, position: "relative", overflow: "hidden"
      }}>
        {state.videoUrl ? (
          <video src={state.videoUrl} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 14 }} muted playsInline />
        ) : (
          <>
            <div style={{ fontSize: 40 }}>🎬</div>
            <p style={{ color: "#333", fontSize: 12, marginTop: 8 }}>your clip preview</p>
          </>
        )}
        <div style={{
          position: "absolute", bottom: 8, right: 8,
          background: "#a855f7", color: "#fff", fontSize: 10,
          fontWeight: 700, padding: "2px 8px", borderRadius: 20
        }}>
          {formatTime(endSec - startSec)}
        </div>
      </div>

      {/* Duration selector */}
      <Label>Duration</Label>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {DURATIONS.map(d => (
          <button
            key={d.label}
            onClick={() => d.val && update({ maxDuration: d.val })}
            style={chipStyle(state.maxDuration === d.val || (!d.val && false))}
          >
            {d.label}
          </button>
        ))}
      </div>

      {/* Trim bar */}
      <Label>Trim clip</Label>
      <div
        ref={barRef}
        style={{ background: "#1a1a1a", borderRadius: 8, height: 40, position: "relative", marginBottom: 8, userSelect: "none" }}
      >
        {/* inactive zones */}
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${leftPct}%`, background: "#0d0d0d", borderRadius: "8px 0 0 8px" }} />
        <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: `${100 - rightPct}%`, background: "#0d0d0d", borderRadius: "0 8px 8px 0" }} />
        {/* active zone */}
        <div style={{
          position: "absolute", top: 0, bottom: 0,
          left: `${leftPct}%`, right: `${100 - rightPct}%`,
          background: "#a855f730", border: "2px solid #a855f7", borderRadius: 4
        }} />
        {/* Left handle */}
        <div
          onMouseDown={() => { dragging.current = "l"; }}
          onTouchStart={() => { dragging.current = "l"; }}
          style={{
            position: "absolute", left: `${leftPct}%`, top: 0, bottom: 0,
            width: 14, background: "#a855f7", borderRadius: "4px 0 0 4px",
            cursor: "ew-resize", transform: "translateX(-50%)",
            display: "flex", alignItems: "center", justifyContent: "center"
          }}
        >
          <div style={{ width: 2, height: 16, background: "#fff", borderRadius: 2 }} />
        </div>
        {/* Right handle */}
        <div
          onMouseDown={() => { dragging.current = "r"; }}
          onTouchStart={() => { dragging.current = "r"; }}
          style={{
            position: "absolute", left: `${rightPct}%`, top: 0, bottom: 0,
            width: 14, background: "#a855f7", borderRadius: "0 4px 4px 0",
            cursor: "ew-resize", transform: "translateX(-50%)",
            display: "flex", alignItems: "center", justifyContent: "center"
          }}
        >
          <div style={{ width: 2, height: 16, background: "#fff", borderRadius: 2 }} />
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
        <span style={{ color: "#555", fontSize: 11 }}>{formatTime(startSec)}</span>
        <span style={{ color: "#a855f7", fontSize: 11, fontWeight: 600 }}>{formatTime(endSec - startSec)} selected</span>
        <span style={{ color: "#555", fontSize: 11 }}>{formatTime(endSec)}</span>
      </div>

      {/* Speed */}
      <SliderRow
        label="Speed"
        min={50} max={200} step={1}
        value={state.speed}
        onChange={v => update({ speed: v })}
        format={v => v + "%"}
      />

      <NavRow onNext={onNext} />
    </div>
  );
}

export function Label({ children }) {
  return <p style={{ color: "#555", fontSize: 10, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8, fontWeight: 600 }}>{children}</p>;
}

export function SliderRow({ label, min, max, step, value, onChange, format }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
      <span style={{ color: "#777", fontSize: 11, width: 70 }}>{label}</span>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(Number(e.target.value))}
        style={{ flex: 1, accentColor: "#a855f7" }} />
      <span style={{ color: "#a855f7", fontSize: 11, width: 36, textAlign: "right" }}>{format(value)}</span>
    </div>
  );
}

export function NavRow({ onBack, onNext, nextLabel = "Next →", backLabel = "← Back" }) {
  return (
    <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
      {onBack && (
        <button onClick={onBack} style={{ flex: 1, background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 10, color: "#777", fontSize: 13, padding: 10, cursor: "pointer" }}>
          {backLabel}
        </button>
      )}
      {onNext && (
        <button onClick={onNext} style={{ flex: 1, background: "#a855f720", border: "1px solid #a855f760", borderRadius: 10, color: "#a855f7", fontSize: 13, fontWeight: 600, padding: 10, cursor: "pointer" }}>
          {nextLabel}
        </button>
      )}
    </div>
  );
}

function chipStyle(active) {
  return {
    flex: 1, padding: "7px 4px", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer",
    background: active ? "#a855f720" : "#1a1a1a",
    border: `1px solid ${active ? "#a855f7" : "#2a2a2a"}`,
    color: active ? "#a855f7" : "#555",
    transition: "all 0.2s"
  };
}
