"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";

const SAMOSAS = [
  {
    id: "beef",    name: "Royal Beef",     tagline: "The King's Choice",
    description: "Slow-seasoned prime beef con hierbas aromáticas envuelta en nuestra masa dorada.",
    ingredients: ["Prime Beef", "Cumin", "Cilantro", "Garam Masala"],
    filling: "Res & hierbas",   emoji: "🥩",
    spice: 3, price: "$5.49",  accent: "#C4621A",
  },
  {
    id: "chicken", name: "Masala Chicken", tagline: "Street Food Royalty",
    description: "Pollo deshebrado en masala molido a mano con verduras frescas y especias chaat.",
    ingredients: ["Chicken", "Masala", "Peppers", "Mint"],
    filling: "Pollo & masala",  emoji: "🍗",
    spice: 4, price: "$5.49",  accent: "#D49020",
  },
  {
    id: "veggie",  name: "Garden Veggie",  tagline: "Pure & Vibrant",
    description: "Papa y chícharo especiado con cúrcuma y especias cálidas. La más amada.",
    ingredients: ["Potato", "Green Peas", "Turmeric", "Coriander"],
    filling: "Papa & chícharo", emoji: "🥬",
    spice: 2, price: "$4.49",  accent: "#3A8830",
  },
  {
    id: "paneer",  name: "Spiced Paneer",  tagline: "Chef's Favourite",
    description: "Paneer suave en masala de tomate y cebolla con pimientos y hierbas frescas.",
    ingredients: ["Paneer", "Tomato", "Bell Pepper", "Fenugreek"],
    filling: "Paneer & tomate", emoji: "🧀",
    spice: 3, price: "$5.49",  accent: "#D46018",
  },
  {
    id: "lamb",    name: "Keema Lamb",     tagline: "A Royal Delicacy",
    description: "Cordero molido con cebolla caramelizada, pasta de jengibre y especias enteras.",
    ingredients: ["Lamb Mince", "Onion", "Ginger", "Whole Spices"],
    filling: "Cordero keema",   emoji: "🍖",
    spice: 4, price: "$6.49",  accent: "#B8341A",
  },
  {
    id: "sweet",   name: "Sweet Potato",   tagline: "Surprisingly Bold",
    description: "Camote asado con coco, hojuelas de chile y piloncillo. Dulce se encuentra picante.",
    ingredients: ["Sweet Potato", "Coconut", "Chilli", "Jaggery"],
    filling: "Camote & coco",   emoji: "🍠",
    spice: 2, price: "$4.99",  accent: "#D07820",
  },
];

function SpiceDots({ level }: { level: number }) {
  return (
    <div className="flex items-center gap-[5px]">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} style={{
          width: 6, height: 6, borderRadius: "50%",
          background: i < level ? "#F0B06D" : "rgba(240,176,109,0.2)",
        }} />
      ))}
    </div>
  );
}

function SamosaCard({ samosa, index }: { samosa: typeof SAMOSAS[0]; index: number }) {
  const [open, setOpen] = useState(false);
  const { lang, t } = useLanguage();
  const item = t.menu.items[index];
  const hoverImg = `/Fotos Samosas/Samosa-${(index % 3) + 1}.png`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1], delay: index * 0.07 }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div style={{
        borderRadius: 20,
        background: "linear-gradient(150deg, #8B1E24 0%, #6A1318 100%)",
        border: open ? "1px solid rgba(240,176,109,0.5)" : "1px solid rgba(240,176,109,0.18)",
        boxShadow: open
          ? "0 20px 50px rgba(139,30,36,0.35), 0 0 0 1px rgba(240,176,109,0.2)"
          : "0 4px 20px rgba(139,30,36,0.15)",
        transition: "all 0.45s cubic-bezier(0.23, 1, 0.32, 1)",
        overflow: "hidden",
        position: "relative",
      }}>

        {/* Top accent line */}
        <div style={{
          position: "absolute", top: 0, left: "15%", right: "15%", height: "1px",
          background: `linear-gradient(to right, transparent, ${samosa.accent}, transparent)`,
          opacity: open ? 1 : 0.4, transition: "opacity 0.4s",
        }} />

        {/* ── Photo area ── */}
        <div className="h-[240px] md:h-[220px]" style={{ position: "relative", overflow: "hidden" }}>
          {/* Base — Samosa 0, siempre visible */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/Fotos Samosas/Samosa 0.png"
            alt="Samosa"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
          />
          {/* Hover — imagen específica, fade in */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={hoverImg}
            alt={samosa.name}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", opacity: open ? 1 : 0, transition: "opacity 0.9s ease" }}
          />
        </div>

        {/* Card body */}
        <div style={{ padding: "clamp(24px, 5vw, 28px) clamp(22px, 5vw, 28px) 26px" }}>

          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-3">
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: "clamp(9px, 2.2vw, 10px)", letterSpacing: "0.24em", color: samosa.accent, textTransform: "uppercase", fontWeight: 700, marginBottom: 7, opacity: 0.95 }}>
                {item.tagline[lang]}
              </div>
              <h3 className="font-fascinate" style={{ fontSize: "clamp(30px, 8vw, 38px)", color: "#F4DFC8", lineHeight: 0.98 }}>
                {samosa.name}
              </h3>
            </div>
            <span className="font-display font-bold" style={{ fontSize: "clamp(22px, 5vw, 26px)", color: "#F0B06D", flexShrink: 0, lineHeight: 1 }}>
              {samosa.price}
            </span>
          </div>

          {/* Description */}
          <p style={{ fontSize: "clamp(14px, 3.5vw, 15px)", color: "rgba(244,223,200,0.62)", lineHeight: 1.55, marginBottom: 18 }}>
            {item.description[lang]}
          </p>

          {/* Ingredients */}
          <div className="flex flex-wrap gap-2 mb-5">
            {samosa.ingredients.map((ing) => (
              <span key={ing} style={{
                fontSize: "clamp(10.5px, 2.7vw, 11.5px)", letterSpacing: "0.04em",
                color: "rgba(244,223,200,0.7)",
                background: "rgba(240,176,109,0.12)",
                border: "1px solid rgba(240,176,109,0.26)",
                borderRadius: 20, padding: "5px 11px",
              }}>
                {ing}
              </span>
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span style={{ fontSize: "10px", color: "rgba(240,176,109,0.65)", letterSpacing: "0.13em", textTransform: "uppercase" }}>{t.menu.heat[lang]}</span>
              <SpiceDots level={samosa.spice} />
            </div>
            <button
              style={{
                fontSize: "10px", letterSpacing: "0.15em", color: "#F0B06D",
                textTransform: "uppercase", fontWeight: 700,
                background: "rgba(240,176,109,0.1)", border: "1px solid rgba(240,176,109,0.25)",
                borderRadius: 20, padding: "8px 17px", cursor: "pointer", transition: "all 0.2s",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(240,176,109,0.22)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(240,176,109,0.1)"; }}
            >
              {t.menu.add[lang]}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function MenuSection() {
  const { lang, t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="menu" ref={ref} className="relative py-28 px-6 overflow-hidden" style={{ background: "#F4DFC8" }}>
      <div className="absolute inset-0 pattern-cream pointer-events-none opacity-50" />



      <div className="relative z-10 max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
            style={{ fontSize: "9px", letterSpacing: "0.4em", color: "rgba(61,11,14,0.35)", textTransform: "uppercase", fontWeight: 600, marginBottom: 14 }}
          >
            {t.menu.label[lang]}
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.06 }}
            className="font-fascinate mb-4"
            style={{ fontSize: "clamp(40px, 7.5vw, 90px)", color: "#8B1E24", lineHeight: 1.05, textTransform: "uppercase" }}
          >
            {t.menu.heading[lang]}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.15 }}
            style={{ color: "rgba(61,11,14,0.4)", fontSize: 14, maxWidth: 340, margin: "0 auto" }}
          >
            {t.menu.hint[lang]}
          </motion.p>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}} transition={{ duration: 0.9, delay: 0.2 }}
          className="flex items-center gap-5 mb-14 w-full"
        >
          <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, transparent, #8B1E24)" }} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/Fotos Samosas/Branding/logo-shape-rojo.png" alt="" width={64} height={64} style={{ mixBlendMode: "multiply", display: "block" }} />
          <div style={{ flex: 1, height: "1px", background: "linear-gradient(to left, transparent, #8B1E24)" }} />
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SAMOSAS.map((s, i) => <SamosaCard key={s.id} samosa={s} index={i} />)}
        </div>

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-14 pt-10"
          style={{ borderTop: "1px solid rgba(139,30,36,0.1)" }}
        >
          <p style={{ color: "rgba(61,11,14,0.3)", fontSize: 13, marginBottom: 14 }}>
            {t.menu.note[lang]}
          </p>
          <button className="btn-outline">{t.menu.full[lang]}</button>
        </motion.div>
      </div>
    </section>
  );
}
