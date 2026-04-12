import { useState, useRef, useEffect } from "react";

export default function ClipCard({ clip, isActive }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(clip.likes);
  const [showShare, setShowShare] = useState(false);
  const [shareStatus, setShareStatus] = useState({});
  const [muted, setMuted] = useState(false);
  const videoRef = useRef(null);

  // Auto-play/pause based on active state
  useEffect(() => {
    if (!videoRef.current) return;
    if (isActive) {
      videoRef.current.play?.().catch(() => {});
    } else {
      videoRef.current.pause?.();
    }
  }, [isActive]);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(prev => liked ? prev - 1 : prev + 1);
  };

  const formatCount = (n) => {
    if (n >= 1000) return (n / 1000).toFixed(1) + "k";
    return n;
  };

  const handleShareTo = (platform) => {
    setShareStatus(prev => ({ ...prev, [platform]: "posting" }));
    setTimeout(() => {
      setShareStatus(prev => ({ ...prev, [platform]: "done" }));
    }, 1500);
  };

  const SHARE_PLATFORMS = [
    { key: "instagram", label: "Instagram", icon: "📸" },
    { key: "tiktok", label: "TikTok", icon: "🎵" },
    { key: "x", label: "X", icon: "✕" },
    { key: "whatsapp", label: "WhatsApp", icon: "💬" },
    { key: "copy", label: "Copy link", icon: "🔗" },
    { key: "save", label: "Save", icon: "⬇" },
  ];

  return (
    <div style={{
      height: "100dvh", scrollSnapAlign: "start", position: "relative",
      background: clip.bg, display: "flex", alignItems: "flex-end", overflow: "hidden"
    }}>
      {/* Gradient overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 40%, transparent 70%)"
      }} />

      {/* Animated background orbs */}
      <div style={{
        position: "absolute", width: 300, height: 300, borderRadius: "50%",
        background: clip.accent + "15", top: "10%", left: "20%",
        animation: isActive ? "pulse 3s ease-in-out infinite" : "none"
      }} />
      <div style={{
        position: "absolute", width: 200, height: 200, borderRadius: "50%",
        background: clip.accent + "10", top: "30%", right: "10%",
        animation: isActive ? "pulse 4s ease-in-out infinite 1s" : "none"
      }} />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 2, width: "100%", padding: "0 16px 90px", display: "flex", alignItems: "flex-end", gap: 14 }}>
        {/* Left: info */}
        <div style={{ flex: 1 }}>
          {/* Venue badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 5,
            background: clip.accent + "30", border: `1px solid ${clip.accent}60`,
            borderRadius: 20, padding: "3px 10px", marginBottom: 10
          }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: clip.accent }} />
            <span style={{ color: clip.accent, fontSize: 11, fontWeight: 700, letterSpacing: 0.5 }}>
              {clip.venue.toUpperCase()}
            </span>
          </div>

          {/* User */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <div style={{
              width: 32, height: 32, borderRadius: "50%",
              border: `2px solid ${clip.accent}`, display: "flex",
              alignItems: "center", justifyContent: "center", fontSize: 16,
              background: "rgba(0,0,0,0.4)"
            }}>
              {clip.user.avatar}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <span style={{ color: "#fff", fontSize: 13, fontWeight: 700 }}>@{clip.user.name}</span>
              {clip.user.verified && (
                <div style={{
                  width: 14, height: 14, borderRadius: "50%", background: clip.accent,
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8
                }}>✓</div>
              )}
            </div>
          </div>

          {/* Caption */}
          <p style={{ color: "rgba(255,255,255,0.9)", fontSize: 13, lineHeight: 1.5, marginBottom: 8 }}>
            {clip.caption}
          </p>

          {/* Tags */}
          <p style={{ color: clip.accent, fontSize: 12 }}>
            {clip.tags.join(" ")}
          </p>

          {/* Sound */}
          <div style={{
            display: "flex", alignItems: "center", gap: 6, marginTop: 10,
            background: "rgba(255,255,255,0.08)", borderRadius: 20,
            padding: "5px 12px", width: "fit-content"
          }}>
            <span style={{ fontSize: 12 }}>🎵</span>
            <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 11 }}>{clip.sound}</span>
          </div>
        </div>

        {/* Right: actions */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
          {/* Like */}
          <button onClick={handleLike} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
            <div style={{
              width: 44, height: 44, borderRadius: "50%",
              background: liked ? "#ef444430" : "rgba(255,255,255,0.12)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 20, transition: "all 0.2s", transform: liked ? "scale(1.15)" : "scale(1)"
            }}>
              {liked ? "❤️" : "🤍"}
            </div>
            <span style={{ color: "rgba(255,255,255,0.8)", fontSize: 11 }}>{formatCount(likeCount)}</span>
          </button>

          {/* Comment */}
          <button style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
            <div style={{ width: 44, height: 44, borderRadius: "50%", background: "rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>💬</div>
            <span style={{ color: "rgba(255,255,255,0.8)", fontSize: 11 }}>{clip.comments}</span>
          </button>

          {/* Share */}
          <button onClick={() => setShowShare(true)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
            <div style={{ width: 44, height: 44, borderRadius: "50%", background: "rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>↗️</div>
            <span style={{ color: "rgba(255,255,255,0.8)", fontSize: 11 }}>Share</span>
          </button>

          {/* Mute */}
          <button onClick={() => setMuted(!muted)} style={{ background: "none", border: "none", cursor: "pointer" }}>
            <div style={{ width: 44, height: 44, borderRadius: "50%", background: "rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>
              {muted ? "🔇" : "🔊"}
            </div>
          </button>
        </div>
      </div>

      {/* Share panel */}
      {showShare && (
        <div
          onClick={() => setShowShare(false)}
          style={{
            position: "absolute", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 100,
            display: "flex", alignItems: "flex-end"
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              width: "100%", background: "#111", borderRadius: "20px 20px 0 0",
              padding: "16px 16px 40px"
            }}
          >
            <div style={{ width: 40, height: 4, background: "#333", borderRadius: 2, margin: "0 auto 16px" }} />
            <p style={{ color: "#fff", fontSize: 14, fontWeight: 700, marginBottom: 16, textAlign: "center" }}>
              Share this Clip
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 14 }}>
              {SHARE_PLATFORMS.map(p => (
                <button
                  key={p.key}
                  onClick={() => handleShareTo(p.key)}
                  style={{
                    background: shareStatus[p.key] === "done" ? "#a855f720" : "#1a1a1a",
                    border: `1px solid ${shareStatus[p.key] === "done" ? "#a855f7" : "#2a2a2a"}`,
                    borderRadius: 12, padding: "10px 6px", cursor: "pointer",
                    display: "flex", flexDirection: "column", alignItems: "center", gap: 5
                  }}
                >
                  <span style={{ fontSize: 22 }}>
                    {shareStatus[p.key] === "posting" ? "⏳" : shareStatus[p.key] === "done" ? "✅" : p.icon}
                  </span>
                  <span style={{ color: shareStatus[p.key] === "done" ? "#a855f7" : "#888", fontSize: 10, fontWeight: 600 }}>
                    {p.label}
                  </span>
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowShare(false)}
              style={{
                width: "100%", background: "#222", border: "none", borderRadius: 10,
                color: "#fff", fontSize: 13, padding: 10, cursor: "pointer"
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes pulse { 0%,100%{transform:scale(1);opacity:0.6} 50%{transform:scale(1.1);opacity:1} }
      `}</style>
    </div>
  );
}
