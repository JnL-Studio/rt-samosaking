"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const BOXES = [
  {
    id: "solo",
    size: "Lunchbox for 1",
    tagline: "The Solo Royal",
    price: "$14.99",
    image: "/Fotos Samosas/LunchBox/Lunchbox2.png",
    badge: null as string | null,
    highlight: false,
    items: [
      { icon: "🥟", label: "2 Samosas of Choice" },
      { icon: "🫙", label: "1 Chutney of Choice" },
      { icon: "🥔", label: "Masala Chips" },
      { icon: "☕", label: "1 Chai Tea — Hot or Iced" },
    ],
  },
  {
    id: "duo",
    size: "Lunchbox for 2",
    tagline: "The Royal Feast",
    price: "$24.99",
    originalPrice: "$29.98",
    image: "/Fotos Samosas/LunchBox/Lunchbox4.png",
    badge: null as string | null,
    highlight: true,
    items: [
      { icon: "🥟", label: "4 Samosas of Choice" },
      { icon: "🫙", label: "2 Chutneys of Choice" },
      { icon: "🥔", label: "Masala Chips" },
      { icon: "☕", label: "2 Chai Teas — Hot or Iced" },
    ],
  },
];

function LunchboxCard({ box }: { box: typeof BOXES[0] }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* Badge */}
      {box.badge && (
        <motion.div
          initial={{ scale: 0, rotate: -12 }}
          animate={{ scale: 1, rotate: -8 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
          style={{
            position: "absolute", top: "-14px", right: "18px", zIndex: 20,
            background: "linear-gradient(135deg, #F0B06D, #F0B06D)",
            color: "#3D0B0E", fontSize: "9px", fontWeight: 800,
            letterSpacing: "0.14em", textTransform: "uppercase",
            padding: "5px 14px", borderRadius: "20px",
            boxShadow: "0 4px 20px rgba(240,176,109,0.5)",
          }}
        >
          ✦ {box.badge}
        </motion.div>
      )}

      <div
        style={{
          borderRadius: "24px",
          overflow: "hidden",
          background: box.highlight
            ? "linear-gradient(145deg, #8B1E24 0%, #6A1318 100%)"
            : "#F9F0E4",
          border: box.highlight
            ? `1px solid ${open ? "rgba(240,176,109,0.55)" : "rgba(240,176,109,0.25)"}`
            : `1px solid ${open ? "rgba(139,30,36,0.3)" : "rgba(139,30,36,0.12)"}`,
          boxShadow: open
            ? box.highlight
              ? "0 28px 65px rgba(139,30,36,0.45), 0 0 0 1px rgba(240,176,109,0.3)"
              : "0 28px 65px rgba(139,30,36,0.18), 0 0 0 1px rgba(139,30,36,0.1)"
            : "0 6px 24px rgba(139,30,36,0.12)",
          transition: "all 0.5s cubic-bezier(0.23, 1, 0.32, 1)",
        }}
      >
        {/* Top accent line */}
        <div style={{
          height: "1.5px",
          background: box.highlight
            ? `linear-gradient(to right, transparent, ${open ? "rgba(240,176,109,0.9)" : "rgba(240,176,109,0.4)"}, transparent)`
            : `linear-gradient(to right, transparent, ${open ? "rgba(139,30,36,0.5)" : "rgba(139,30,36,0.15)"}, transparent)`,
          transition: "all 0.4s ease",
          borderRadius: "24px 24px 0 0",
        }} />

        {/* Foto del lunchbox */}
        <div style={{ position: "relative", overflow: "hidden" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={box.image}
            alt={`${box.tagline} — ${box.size}`}
            style={{
              width: "100%", height: "auto", objectFit: "contain",
              transform: open ? "scale(1.04)" : "scale(1)",
              transition: "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)",
            }}
          />

        </div>

        {/* Content */}
        <div className="px-7 pt-9 pb-7">
          <div className="text-center mb-6">
            <h3 className="font-fascinate" style={{
              fontSize: "clamp(20px, 3.2vw, 28px)",
              color: box.highlight ? "#F4DFC8" : "#8B1E24",
              lineHeight: 1.1, marginBottom: "14px",
            }}>
              {box.id === "solo" ? "The Solo Royale" : "The Royal Feast"}
            </h3>
            <div style={{
              fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 500,
              color: box.highlight ? "rgba(240,176,109,0.6)" : "rgba(139,30,36,0.45)",
              marginBottom: "16px",
            }}>
              {box.id === "solo" ? "Lunch for One" : "Lunch for Two"}
            </div>
            <div className="flex items-center justify-center gap-3">
              <span className="font-display font-bold" style={{ fontSize: "26px",
                color: box.highlight ? "#F0B06D" : "#8B1E24" }}>
                {box.price}
              </span>
              {"originalPrice" in box && box.originalPrice && (
                <span style={{ fontSize: "14px", color: box.highlight ? "rgba(244,223,200,0.35)" : "rgba(61,11,14,0.3)", textDecoration: "line-through" }}>
                  {box.originalPrice}
                </span>
              )}
            </div>
          </div>

          <ul className="space-y-3 mb-7">
            {box.items.map((item, i) => (
              <motion.li
                key={item.label}
                initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: 0.25 + i * 0.07 }}
                className="flex items-center gap-3"
              >
                <span style={{ fontSize: "17px" }}>{item.icon}</span>
                <span style={{ fontSize: "13.5px", lineHeight: 1.45,
                  color: box.highlight ? "rgba(244,223,200,0.65)" : "rgba(61,11,14,0.6)" }}>
                  {item.label}
                </span>
              </motion.li>
            ))}
          </ul>

          <button
            className="w-full py-4"
            style={{
              background: box.highlight ? "linear-gradient(135deg, #F0B06D, #F0B06D)" : "transparent",
              border: box.highlight ? "none" : "1.5px solid #8B1E24",
              borderRadius: "50px", cursor: "pointer", transition: "all 0.3s ease",
              fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 700,
              color: box.highlight ? "#3D0B0E" : "#8B1E24",
            }}
            onMouseEnter={(e) => {
              const btn = e.currentTarget as HTMLButtonElement;
              btn.style.transform = "translateY(-2px)";
              btn.style.boxShadow = box.highlight ? "0 8px 28px rgba(240,176,109,0.5)" : "0 4px 16px rgba(139,30,36,0.2)";
              if (!box.highlight) btn.style.background = "rgba(139,30,36,0.06)";
            }}
            onMouseLeave={(e) => {
              const btn = e.currentTarget as HTMLButtonElement;
              btn.style.transform = "none"; btn.style.boxShadow = "none";
              if (!box.highlight) btn.style.background = "transparent";
            }}
          >
            {box.highlight ? "Order Now — Best Deal" : "Order Lunchbox"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function LunchboxSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="lunchbox" ref={ref} className="relative py-28 px-6 overflow-hidden" style={{ background: "#F4DFC8" }}>
      <div className="absolute inset-0 pattern-cream pointer-events-none opacity-100" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{ width: "500px", height: "260px",
          background: "radial-gradient(ellipse, rgba(139,30,36,0.07) 0%, transparent 70%)",
          filter: "blur(40px)" }} />

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}} transition={{ duration: 0.9, delay: 0.1 }}
            className="flex items-center gap-5 mb-8 w-full"
          >
            <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, transparent, #8B1E24)" }} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/Fotos Samosas/Branding/logo-shape-rojo.png" alt="" width={64} height={64}
              style={{ mixBlendMode: "multiply", display: "block" }} />
            <div style={{ flex: 1, height: "1px", background: "linear-gradient(to left, transparent, #8B1E24)" }} />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 36 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.75, delay: 0.08 }}
            className="font-fascinate mb-4"
            style={{ fontSize: "clamp(32px, 6vw, 70px)", color: "#8B1E24", lineHeight: 1.1, textTransform: "uppercase" }}
          >
            Royal Lunchboxes
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.16 }}
            style={{ color: "rgba(61,11,14,0.4)", fontSize: "15px", maxWidth: "360px", margin: "0 auto" }}
          >
            Everything you need for the perfect Indian feast, packed with care.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {BOXES.map((box) => <LunchboxCard key={box.id} box={box} />)}
        </div>

        <motion.p
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.7 }}
          className="text-center mt-10"
          style={{ color: "rgba(61,11,14,0.35)", fontSize: "13px", letterSpacing: "0.04em" }}
        >
          🥟 Mix any samosa flavors &nbsp;·&nbsp; 🫙 Choose your chutneys &nbsp;·&nbsp; ☕ Hot or iced chai
        </motion.p>
      </div>
    </section>
  );
}
