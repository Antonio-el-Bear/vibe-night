import { useState, useRef } from "react";
import TrimStep from "./steps/TrimStep";
import FilterStep from "./steps/FilterStep";
import SoundStep from "./steps/SoundStep";
import CaptionStep from "./steps/CaptionStep";
import ShareStep from "./steps/ShareStep";

const STEPS = [
  { id: "trim",    icon: "✂️",  label: "Trim"    },
  { id: "filter",  icon: "✨",  label: "Filter"  },
  { id: "sound",   icon: "🎵",  label: "Sound"   },
  { id: "caption", icon: "T",   label: "Caption" },
  { id: "share",   icon: "↗",   label: "Share"   },
];

const DEFAULT_STATE = {
  videoFile: null,
  videoUrl: null,
  duration: 42,
  maxDuration: 60,
  trimStart: 0,
  trimEnd: 42,
  speed: 100,
  filter: "none",
  brightness: 50,
  contrast: 50,
  saturation: 60,
  sound: "original",
  volume: 80,
  caption: "Had an insane night at Velvet Lounge 🔥",
  tags: ["#vibenight", "#jhbvibes"],
  textPosition: "bottom",
  platforms: ["instagram", "tiktok", "x", "vibenight"],
  scheduleType: "now",
};

export default function ClipsCreator({ onClose }) {
  const [step, setStep] = useState(0);
  const [clipState, setClipState] = useState(DEFAULT_STATE);
  const [posted, setPosted] = useState(false);
  const [posting, setPosting] = useState(false);
  const fileInputRef = useRef(null);

  const update = (patch) => setClipState(prev => ({ ...prev, ...patch }));

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    update({ videoFile: file, videoUrl: url });
  };

  const handlePost = async () => {
    setPosting(true);
    // Simulate API calls to each platform
    await new Promise(r => setTimeout(r, 2000));
    setPosting(false);
    setPosted(true);
  };

  const stepProps = { state: clipState, update, onNext: () => setStep(s => s + 1), onBack: () => setStep(s => s - 1) };

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 200,
      background: "rgba(0,0,0,0.95)", display: "flex",
      flexDirection: "column", fontFamily: "'DM Sans', sans-serif"
    }}>
      {/* Header */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "16px 20px", borderBottom: "1px solid #1a1a1a"
      }}>
        <button onClick={onClose} style={{ background: "none", border: "none", color: "#666", fontSize: 20, cursor: "pointer" }}>✕</button>
        <span style={{ color: "#fff", fontSize: 15, fontWeight: 700 }}>Create a Clip</span>
        <div style={{ width: 28 }} />
      </div>

      {/* Step tabs */}
      <div style={{ display: "flex", borderBottom: "1px solid #1a1a1a" }}>
        {STEPS.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setStep(i)}
            style={{
              flex: 1, padding: "10px 4px", background: "none", border: "none",
              borderBottom: `2px solid ${step === i ? "#a855f7" : "transparent"}`,
              cursor: "pointer", transition: "all 0.2s"
            }}
          >
            <div style={{ fontSize: 16, marginBottom: 2 }}>{s.icon}</div>
            <div style={{ fontSize: 9, color: step === i ? "#a855f7" : "#444", fontWeight: 600, letterSpacing: 0.3 }}>
              {s.label.toUpperCase()}
            </div>
          </button>
        ))}
      </div>

      {/* Video upload prompt */}
      {!clipState.videoUrl && (
        <div
          onClick={() => fileInputRef.current?.click()}
          style={{
            margin: "14px 16px", border: "2px dashed #2a2a2a", borderRadius: 14,
            padding: "20px", textAlign: "center", cursor: "pointer"
          }}
        >
          <div style={{ fontSize: 36, marginBottom: 8 }}>🎬</div>
          <p style={{ color: "#888", fontSize: 13, margin: 0 }}>Tap to upload your Clip</p>
          <p style={{ color: "#444", fontSize: 11, marginTop: 4 }}>30s – 60s · MP4 or MOV</p>
          <input ref={fileInputRef} type="file" accept="video/*" onChange={handleFileSelect} style={{ display: "none" }} />
        </div>
      )}

      {/* Step content */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        {step === 0 && <TrimStep {...stepProps} />}
        {step === 1 && <FilterStep {...stepProps} />}
        {step === 2 && <SoundStep {...stepProps} />}
        {step === 3 && <CaptionStep {...stepProps} />}
        {step === 4 && !posted && <ShareStep {...stepProps} onPost={handlePost} posting={posting} />}
        {posted && <PostedScreen platforms={clipState.platforms} onClose={onClose} onNew={() => { setPosted(false); setStep(0); setClipState(DEFAULT_STATE); }} />}
      </div>
    </div>
  );
}

function PostedScreen({ platforms, onClose, onNew }) {
  const NAMES = { instagram: "Instagram", tiktok: "TikTok", x: "X", youtube: "YouTube Shorts", whatsapp: "WhatsApp", vibenight: "vibe-night" };
  return (
    <div style={{ padding: "40px 24px", textAlign: "center" }}>
      <div style={{ fontSize: 56, marginBottom: 16 }}>🔥</div>
      <h2 style={{ color: "#fff", fontSize: 22, fontWeight: 800, marginBottom: 8 }}>Clip dropped!</h2>
      <p style={{ color: "#666", fontSize: 13, lineHeight: 1.6, marginBottom: 24 }}>
        Your Clip is live and posting to your selected platforms. The JHB night scene is about to go crazy.
      </p>
      <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginBottom: 32 }}>
        {platforms.map(p => (
          <div key={p} style={{
            background: "#a855f720", border: "1px solid #a855f760",
            borderRadius: 20, color: "#a855f7", fontSize: 12, padding: "4px 14px"
          }}>{NAMES[p] || p}</div>
        ))}
      </div>
      <button onClick={onNew} style={{
        width: "100%", background: "#a855f7", border: "none", borderRadius: 12,
        color: "#fff", fontSize: 15, fontWeight: 700, padding: 14, cursor: "pointer", marginBottom: 10
      }}>
        Create another Clip
      </button>
      <button onClick={onClose} style={{
        width: "100%", background: "transparent", border: "1px solid #2a2a2a",
        borderRadius: 12, color: "#666", fontSize: 14, padding: 12, cursor: "pointer"
      }}>
        Back to feed
      </button>
    </div>
  );
}
