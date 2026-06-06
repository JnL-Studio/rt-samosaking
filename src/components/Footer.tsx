"use client";

import { motion } from "framer-motion";

const LINKS = {
  Menú:     ["Samosas", "Lunchboxes", "Chutneys", "Chai Tea", "Extras"],
  Visita:   ["Encuéntranos", "Horarios", "Catering", "Eventos", "Franquicia"],
  Conecta:  ["Instagram", "TikTok", "Facebook", "Google Maps", "Zomato"],
};

const MARQUEE = ["Beef Samosa", "✦", "Masala Chicken", "✦", "Garden Veggie", "✦", "Spiced Paneer", "✦", "Keema Lamb", "✦", "Chai Tea", "✦", "Mint Chutney", "✦", "Tamarind", "✦", "Royal Lunchbox", "✦"];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden" style={{ background: "#3D0B0E" }}>
      <div className="absolute inset-0 pattern-red pointer-events-none opacity-30" />
      <div style={{ height: "1px", background: "linear-gradient(to right, transparent, rgba(240,176,109,0.3), transparent)" }} />

      {/* Marquee */}
      <div style={{ padding: "14px 0", overflow: "hidden", borderBottom: "1px solid rgba(240,176,109,0.1)" }}>
        <div style={{ display: "flex", gap: 36, animation: "marquee 32s linear infinite", width: "max-content" }}>
          {[...MARQUEE, ...MARQUEE].map((item, i) => (
            <span key={i} style={{ fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", whiteSpace: "nowrap", color: item === "✦" ? "rgba(240,176,109,0.5)" : "rgba(244,223,200,0.22)", fontWeight: 500 }}>
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-14">

          {/* Brand */}
          <div className="md:col-span-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/Fotos Samosas/Branding/Badge-Samosa-King.png" alt="Samosa King"
              style={{ width: 90, height: 90, mixBlendMode: "screen", display: "block", marginBottom: 20, opacity: 0.85 }} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/Fotos Samosas/Branding/Empanadas-de-la-india-(rojo).png" alt="Empanadas de la India"
              style={{ height: 22, width: "auto", filter: "brightness(0) invert(1)", opacity: 0.25, display: "block", marginBottom: 16 }} />
            <p style={{ color: "rgba(244,223,200,0.22)", fontSize: 13, lineHeight: 1.8, maxWidth: 260 }}>
              Samosas artesanales hechas con especias reales y la calidez de la hospitalidad india.
            </p>
            <div className="flex gap-3 mt-7">
              {["📸", "🎵", "👥"].map((icon, i) => (
                <button key={i} style={{ width: 40, height: 40, borderRadius: "50%", fontSize: 16, background: "rgba(240,176,109,0.07)", border: "1px solid rgba(240,176,109,0.15)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.25s" }}
                  onMouseEnter={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.background = "rgba(240,176,109,0.15)"; b.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.background = "rgba(240,176,109,0.07)"; b.style.transform = "none"; }}>
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(LINKS).map(([cat, links], ci) => (
            <motion.div key={cat} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: ci * 0.08 }}>
              <h4 style={{ fontSize: "8px", letterSpacing: "0.35em", color: "rgba(240,176,109,0.45)", textTransform: "uppercase", fontWeight: 700, marginBottom: 18 }}>{cat}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" style={{ fontSize: 14, color: "rgba(244,223,200,0.22)", transition: "color 0.2s" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(240,176,109,0.7)"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(244,223,200,0.22)"; }}>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8" style={{ borderTop: "1px solid rgba(240,176,109,0.08)" }}>
          <div className="flex flex-wrap gap-8">
            {[{ l: "Horario", v: "Lun–Vie 11–20h · Sáb–Dom 10–21h" }, { l: "Teléfono", v: "(555) 123-4567" }].map(({ l, v }) => (
              <div key={l}>
                <div style={{ fontSize: "8px", letterSpacing: "0.25em", color: "rgba(240,176,109,0.35)", textTransform: "uppercase", marginBottom: 4 }}>{l}</div>
                <div style={{ color: "rgba(244,223,200,0.3)", fontSize: 13 }}>{v}</div>
              </div>
            ))}
          </div>
          <button className="btn-gold" style={{ padding: "11px 28px" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 6px 24px rgba(240,176,109,0.45)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "none"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "none"; }}>
            Ordenar Online →
          </button>
        </div>
        <p style={{ color: "rgba(244,223,200,0.12)", fontSize: 12, textAlign: "center", marginTop: 28 }}>© 2024 The Samosa King · Hecho con amor y especias reales</p>
      </div>
    </footer>
  );
}
