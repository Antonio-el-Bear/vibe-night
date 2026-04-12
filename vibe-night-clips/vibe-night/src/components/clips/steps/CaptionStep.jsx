import { useState } from "react";
import { Label, NavRow } from "./TrimStep";

const QUICK_TAGS = ["#vibenight","#jhbvibes","#velvetlounge","#nightlife","#amapiano","#joburg","#gqom","#jhbparty","#clublife","#sa"];

const POSITIONS = [
  { id: "top-left",     label: "↖" }, { id: "top",     label: "↑" }, { id: "top-right",    label: "↗" },
  { id: "left",         label: "←" }, { id: "center",  label: "·" }, { id: "right",        label: "→" },
  { id: "bottom-left",  label: "↙" }, { id: "bottom",  label: "↓" }, { id: "bottom-right", label: "↘" },
];

export default function CaptionStep({ state, update, onNext, onBack }) {
  const toggleTag = (tag) => {
    const has = state.tags.includes(tag);
    update({ tags: has ? state.tags.filter(t => t !== tag) : [...state.tags, tag] });
  };

  return (
    <div style={{ padding: "16px" }}>
      <Label>Caption</Label>
      <textarea
        value={state.caption}
        onChange={e => update({ caption: e.target.value })}
        placeholder="Add a caption for your Clip..."
        rows={3}
        style={{
          width: "100%", background: "#1a1a1a", border: "1px solid #2a2a2a",
          borderRadius: 10, color: "#fff", fontSize: 13, padding: "10px 12px",
          outline: "none", resize: "none", marginBottom: 14, fontFamily: "inherit",
          lineHeight: 1.5
        }}
        onFocus={e => e.target.style.borderColor = "#a855f7"}
        onBlur={e => e.target.style.borderColor = "#2a2a2a"}
      />

      <Label>Quick tags</Label>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
        {QUICK_TAGS.map(tag => {
          const selected = state.tags.includes(tag);
          return (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              style={{
                background: selected ? "#a855f720" : "#1a1a1a",
                border: `1px solid ${selected ? "#a855f7" : "#2a2a2a"}`,
                borderRadius: 20, color: selected ? "#a855f7" : "#666",
                fontSize: 11, padding: "4px 10px", cursor: "pointer", transition: "all 0.2s"
              }}
            >
              {tag}
            </button>
          );
        })}
      </div>

      <Label>Text overlay position</Label>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 5, marginBottom: 16 }}>
        {POSITIONS.map(p => (
          <button
            key={p.id}
            onClick={() => update({ textPosition: p.id })}
            style={{
              background: state.textPosition === p.id ? "#a855f720" : "#1a1a1a",
              border: `1px solid ${state.textPosition === p.id ? "#a855f7" : "#2a2a2a"}`,
              borderRadius: 8, color: state.textPosition === p.id ? "#a855f7" : "#555",
              fontSize: 13, padding: "8px 4px", cursor: "pointer", transition: "all 0.2s"
            }}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Caption preview */}
      <Label>Preview</Label>
      <div style={{ background: "#111", borderRadius: 12, padding: "12px 14px", marginBottom: 14 }}>
        <p style={{ color: "#fff", fontSize: 13, lineHeight: 1.5, marginBottom: 6 }}>{state.caption}</p>
        <p style={{ color: "#a855f7", fontSize: 12 }}>{state.tags.join(" ")}</p>
      </div>

      <NavRow onBack={onBack} onNext={onNext} />
    </div>
  );
}
