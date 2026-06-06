"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const CHUTNEYS = [
  {
    id: "mint",
    name: "Mint & Coriander",
    description: "Bright and cooling with garden-fresh mint. The classic companion to any samosa.",
    flavor: "Cooling · Fresh · Herby",
    heat: 1, emoji: "🌿", texture: "Smooth",
    ingredient: "Mint, Coriander, Green Chilli, Lime",
    g1: "#5AB840", g2: "#2D7020", g3: "#1A4A12",
    color: "#3A8830",
  },
  {
    id: "tamarind",
    name: "Sweet Tamarind",
    description: "Deep, tangy tamarind balanced with dates and warming spices. A timeless classic.",
    flavor: "Tangy · Sweet · Complex",
    heat: 1, emoji: "🍯", texture: "Thick & Rich",
    ingredient: "Tamarind, Dates, Cumin, Jaggery",
    g1: "#C06030", g2: "#8B3820", g3: "#5A2010",
    color: "#8B4020",
  },
  {
    id: "mango",
    name: "Mango Habanero",
    description: "Sun-ripe Alphonso mango meets habanero heat. Bold, tropical, unforgettable.",
    flavor: "Tropical · Fruity · Fiery",
    heat: 4, emoji: "🥭", texture: "Chunky",
    ingredient: "Alphonso Mango, Habanero, Turmeric",
    g1: "#F0A820", g2: "#C07010", g3: "#8B4A00",
    color: "#D4820A",
  },
  {
    id: "garlic",
    name: "Roasted Garlic",
    description: "Deeply caramelized garlic with red chilli and cumin. Intense and warming.",
    flavor: "Bold · Umami · Smoky",
    heat: 3, emoji: "🧄", texture: "Rustic",
    ingredient: "Garlic, Red Chilli, Cumin, Vinegar",
    g1: "#C06820", g2: "#8A4010", g3: "#5A2A06",
    color: "#7A3A10",
  },
  {
    id: "coconut",
    name: "Coconut Ginger",
    description: "Creamy fresh coconut with ginger, curry leaf and toasted mustard seeds. Tropical and aromatic.",
    flavor: "Creamy · Aromatic · Gentle",
    heat: 2, emoji: "🥥", texture: "Creamy",
    ingredient: "Coconut, Ginger, Curry Leaf, Mustard",
    g1: "#D4B870", g2: "#A88040", g3: "#6A5020",
    color: "#8A7050",
  },
];

function HeatBar({ level }: { level: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <span style={{ fontSize: "9px", color: "rgba(244,223,200,0.45)", letterSpacing: "0.12em" }}>HEAT</span>
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} style={{
            width: "15px", height: "3px", borderRadius: "2px",
            background: i < level ? `hsl(${30 - i * 8}, 90%, 55%)` : "rgba(255,255,255,0.12)",
          }} />
        ))}
      </div>
    </div>
  );
}

function ChutneyOrb({ chutney, active, onClick }: {
  chutney: typeof CHUTNEYS[0]; active: boolean; onClick: () => void;
}) {
  const [mp, setMp] = useState({ x: 50, y: 50 });
  const [ripple, setRipple] = useState(false);

  return (
    <button
      className="flex flex-col items-center gap-3"
      onClick={() => { setRipple(true); setTimeout(() => setRipple(false), 800); onClick(); }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setMp({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
      }}
    >
      <div
        style={{
          width: active ? "105px" : "88px", height: active ? "105px" : "88px",
          borderRadius: active ? "42% 58% 55% 45% / 48% 45% 55% 52%" : "50%",
          background: `radial-gradient(circle at ${mp.x}% ${mp.y}%, ${chutney.g1} 0%, ${chutney.g2} 55%, ${chutney.g3} 100%)`,
          boxShadow: active
            ? `0 0 36px ${chutney.color}70, 0 0 70px ${chutney.color}25, inset 0 1px 0 rgba(255,255,255,0.2)`
            : `0 0 12px ${chutney.color}30, inset 0 1px 0 rgba(255,255,255,0.08)`,
          border: `1px solid ${chutney.color}55`,
          display: "flex", alignItems: "center", justifyContent: "center", position: "relative",
          overflow: "hidden", cursor: "pointer",
          animation: active ? "liquid-wobble 4s ease-in-out infinite" : "none",
          transform: active ? "scale(1.08)" : "scale(1)",
          transition: "all 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
        }}
      >
        {/* Surface highlight */}
        <div style={{ position: "absolute", top: "14%", left: "18%", width: "32%", height: "22%",
          background: "radial-gradient(circle, rgba(255,255,255,0.28) 0%, transparent 70%)",
          borderRadius: "50%", transform: "rotate(-30deg)", filter: "blur(3px)" }} />

        {/* Ripple */}
        {ripple && (
          <div style={{ position: "absolute", inset: 0, borderRadius: "inherit",
            border: `2px solid ${chutney.g1}`, animation: "ripple 0.8s ease-out forwards" }} />
        )}

        <span style={{ fontSize: active ? "30px" : "24px", transition: "font-size 0.35s ease",
          filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.25))" }}>
          {chutney.emoji}
        </span>
      </div>

      <div className="text-center" style={{ maxWidth: "90px" }}>
        <span style={{
          fontSize: "10px", letterSpacing: "0.1em",
          color: active ? "#F4DFC8" : "rgba(244,223,200,0.5)",
          fontWeight: active ? 700 : 400, textTransform: "uppercase",
          lineHeight: 1.4, display: "block", transition: "all 0.3s ease",
        }}>
          {chutney.name}
        </span>
      </div>

      <div style={{ width: "4px", height: "4px", borderRadius: "50%",
        background: "#F0B06D", opacity: active ? 1 : 0, transition: "opacity 0.3s ease" }} />
    </button>
  );
}

export default function ChutneySection() {
  const [activeId, setActiveId] = useState("mint");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const active = CHUTNEYS.find((c) => c.id === activeId)!;

  return (
    <section id="chutneys" ref={ref} className="relative py-28 px-6 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #7A1418 0%, #8B1E24 50%, #7A1418 100%)" }}>
      <div className="absolute inset-0 pattern-red pointer-events-none" />
      <div
        className="absolute pointer-events-none transition-all duration-700"
        style={{
          top: "35%", left: "50%", transform: "translate(-50%, -50%)",
          width: "650px", height: "450px",
          background: `radial-gradient(ellipse, ${active.color}14 0%, transparent 65%)`,
          filter: "blur(55px)",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-4 mb-5"
          >
            <div style={{ height: "1px", width: "45px", background: "linear-gradient(to right, transparent, rgba(240,176,109,0.5))" }} />
            <span style={{ fontSize: "9px", letterSpacing: "0.35em", color: "rgba(240,176,109,0.55)", textTransform: "uppercase", fontWeight: 600 }}>
              House-Made Daily
            </span>
            <div style={{ height: "1px", width: "45px", background: "linear-gradient(to left, transparent, rgba(240,176,109,0.5))" }} />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 36 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.75, delay: 0.08 }}
            className="font-fascinate mb-4"
            style={{ fontSize: "clamp(32px, 6vw, 70px)", color: "#F4DFC8", lineHeight: 1.1, textTransform: "uppercase" }}
          >
            The Chutneys
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.16 }}
            style={{ color: "rgba(244,223,200,0.4)", fontSize: "15px", maxWidth: "360px", margin: "0 auto" }}
          >
            Click to explore each sauce and discover the flavor within.
          </motion.p>
        </div>

        {/* Orbs */}
        <motion.div
          initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.75, delay: 0.25 }}
          className="flex flex-wrap justify-center gap-8 md:gap-12 mb-14"
        >
          {CHUTNEYS.map((c) => (
            <ChutneyOrb key={c.id} chutney={c} active={activeId === c.id} onClick={() => setActiveId(c.id)} />
          ))}
        </motion.div>

        {/* Active panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeId}
            initial={{ opacity: 0, y: 18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -18, scale: 0.97 }}
            transition={{ duration: 0.38, ease: [0.23, 1, 0.32, 1] }}
            className="max-w-xl mx-auto"
          >
            <div style={{
              background: "rgba(61,11,14,0.5)", backdropFilter: "blur(18px)",
              WebkitBackdropFilter: "blur(18px)",
              border: `1px solid ${active.color}35`, borderRadius: "20px",
              padding: "32px 36px",
              boxShadow: `0 20px 55px rgba(0,0,0,0.4), 0 0 0 1px ${active.color}12`,
            }}>
              {/* Accent line */}
              <div style={{ height: "2px", background: `linear-gradient(to right, transparent, ${active.color}, transparent)`,
                marginBottom: "24px", borderRadius: "2px" }} />

              <div className="flex items-center gap-5 mb-5">
                <div style={{
                  width: "64px", height: "64px", flexShrink: 0, borderRadius: "40% 60% 55% 45% / 48% 45% 55% 52%",
                  background: `radial-gradient(circle at 35% 35%, ${active.g1} 0%, ${active.g3} 100%)`,
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: "26px",
                  boxShadow: `0 0 25px ${active.color}40`,
                  border: `1px solid ${active.color}45`,
                  animation: "liquid-wobble 5s ease-in-out infinite",
                }}>
                  {active.emoji}
                </div>
                <div>
                  <h3 className="font-display font-bold" style={{ fontSize: "22px", color: "#F4DFC8", marginBottom: "4px" }}>
                    {active.name}
                  </h3>
                  <div style={{ color: active.color, fontSize: "11px", letterSpacing: "0.1em", opacity: 0.8 }}>
                    {active.flavor}
                  </div>
                </div>
              </div>

              <p style={{ color: "rgba(244,223,200,0.6)", fontSize: "14.5px", lineHeight: 1.7, marginBottom: "18px" }}>
                {active.description}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div style={{ fontSize: "9px", letterSpacing: "0.2em", color: "rgba(244,223,200,0.3)", textTransform: "uppercase", marginBottom: "5px" }}>
                    Ingredients
                  </div>
                  <div style={{ color: "rgba(244,223,200,0.55)", fontSize: "13px" }}>{active.ingredient}</div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <HeatBar level={active.heat} />
                  <div style={{ fontSize: "10px", color: "rgba(244,223,200,0.3)", letterSpacing: "0.1em" }}>
                    {active.texture} texture
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom fade to cream */}
      <div className="absolute bottom-0 inset-x-0 h-16 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #F4DFC8)" }} />
    </section>
  );
}
