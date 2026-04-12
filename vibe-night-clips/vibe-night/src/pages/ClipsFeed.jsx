import { useState, useRef, useEffect } from "react";
import ClipCard from "../components/feed/ClipCard";
import ClipsCreator from "../components/clips/ClipsCreator";
import BottomNav from "../components/shared/BottomNav";

const MOCK_CLIPS = [
  {
    id: "1",
    user: { name: "dj_phantom", avatar: "🎤", verified: true },
    venue: "Velvet Lounge",
    caption: "Velvet Lounge was absolutely insane last night 🔥 The crowd was electric from midnight till close",
    tags: ["#vibenight", "#jhbvibes", "#velvetlounge"],
    likes: 2400,
    comments: 183,
    sound: "Amapiano Mix · Kabza De Small",
    bg: "linear-gradient(160deg,#1a0530 0%,#0d0118 60%,#1a0530 100%)",
    accent: "#a855f7",
  },
  {
    id: "2",
    user: { name: "nova_sounds", avatar: "🎶", verified: false },
    venue: "Club Nova",
    caption: "Spinning again this Friday — new set, new vibes. Come through 👇",
    tags: ["#gqom", "#joburg", "#clubnova"],
    likes: 1100,
    comments: 74,
    sound: "Gqom Nights · DJ Lag",
    bg: "linear-gradient(160deg,#001a0d 0%,#000d06 60%,#001a0d 100%)",
    accent: "#22c55e",
  },
  {
    id: "3",
    user: { name: "mixmaster_k", avatar: "🍸", verified: true },
    venue: "Sky Bar",
    caption: "New cocktail just dropped — the 'Midnight Bloom'. Try it before midnight for half price 🌸",
    tags: ["#skybar", "#cocktails", "#jhbvibes"],
    likes: 3700,
    comments: 291,
    sound: "Deep House · Black Coffee",
    bg: "linear-gradient(160deg,#1a0a00 0%,#0d0500 60%,#1a0a00 100%)",
    accent: "#f59e0b",
  },
  {
    id: "4",
    user: { name: "velvet_vip", avatar: "💎", verified: true },
    venue: "Velvet Lounge",
    caption: "VIP section looking like this every weekend. Book your table before it sells out 💜",
    tags: ["#vip", "#velvetlounge", "#vibenight"],
    likes: 5200,
    comments: 412,
    sound: "Original Audio",
    bg: "linear-gradient(160deg,#0a0020 0%,#050010 60%,#0a0020 100%)",
    accent: "#a855f7",
  },
];

export default function ClipsFeed() {
  const [showCreator, setShowCreator] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handleScroll = () => {
      const idx = Math.round(el.scrollTop / window.innerHeight);
      setActiveIndex(idx);
    };
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div style={{ background: "#000", height: "100dvh", overflow: "hidden", position: "relative", fontFamily: "'DM Sans', sans-serif" }}>
      {/* Top bar */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, zIndex: 50,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "16px 20px 0", pointerEvents: "none"
      }}>
        <span style={{ color: "#a855f7", fontSize: 18, fontWeight: 800, letterSpacing: "-0.5px", pointerEvents: "auto" }}>
          vibe-night
        </span>
        <span style={{ color: "#fff", fontSize: 15, fontWeight: 600 }}>Clips</span>
        <button
          onClick={() => setShowCreator(true)}
          style={{
            background: "#a855f7", border: "none", borderRadius: 20,
            color: "#fff", fontSize: 12, fontWeight: 700, padding: "5px 14px",
            cursor: "pointer", pointerEvents: "auto"
          }}
        >
          + Clip
        </button>
      </div>

      {/* Progress dots */}
      <div style={{
        position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
        display: "flex", flexDirection: "column", gap: 6, zIndex: 40
      }}>
        {MOCK_CLIPS.map((_, i) => (
          <div key={i} style={{
            width: 3, borderRadius: 4,
            height: activeIndex === i ? 20 : 4,
            background: activeIndex === i ? "#a855f7" : "rgba(255,255,255,0.25)",
            transition: "all 0.3s ease"
          }} />
        ))}
      </div>

      {/* Feed */}
      <div
        ref={containerRef}
        style={{
          height: "100dvh", overflowY: "scroll",
          scrollSnapType: "y mandatory", scrollbarWidth: "none"
        }}
      >
        {MOCK_CLIPS.map((clip, i) => (
          <ClipCard key={clip.id} clip={clip} isActive={activeIndex === i} />
        ))}
      </div>

      <BottomNav active="clips" onCreateClip={() => setShowCreator(true)} />

      {showCreator && (
        <ClipsCreator onClose={() => setShowCreator(false)} />
      )}
    </div>
  );
}
