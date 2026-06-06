"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";

export default function Navigation() {
  const { lang, setLang, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const NAV_LINKS = [
    { label: t.nav.menu[lang],     href: "#menu" },
    { label: t.nav.story[lang],    href: "#story" },
    { label: t.nav.lunchbox[lang], href: "#lunchbox" },
    { label: t.nav.chutneys[lang], href: "#chutneys" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    setTimeout(() => document.querySelector(href)?.scrollIntoView({ behavior: "smooth" }), menuOpen ? 300 : 0);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1], delay: 0.2 }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div style={{
          background: "linear-gradient(150deg, #8B1E24 0%, #6A1318 100%)",
          borderBottom: "1px solid rgba(240,176,109,0.25)",
          boxShadow: scrolled ? "0 2px 24px rgba(139,30,36,0.3)" : "none",
          transition: "box-shadow 0.4s ease",
        }}>
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="flex items-center justify-between" style={{ height: 70 }}>

              {/* Logo — PNG transparente directo */}
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/Fotos Samosas/Branding/logo-shape-amarillo.png"
                  alt="Samosa King"
                  style={{ height: 46, width: "auto", display: "block" }}
                />
              </button>

              {/* Desktop links — centered absolutely */}
              <ul className="hidden md:flex items-center gap-9 absolute left-1/2 -translate-x-1/2">
                {NAV_LINKS.map(({ label, href }) => (
                  <li key={label}>
                    <button
                      onClick={() => scrollTo(href)}
                      style={{
                        fontSize: "10px", letterSpacing: "0.22em", fontWeight: 600,
                        textTransform: "uppercase", color: "rgba(244,223,200,0.75)",
                        background: "none", border: "none", cursor: "pointer", padding: 0,
                        transition: "color 0.25s",
                      }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#F4DFC8"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(244,223,200,0.75)"; }}
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>

              {/* Language switch — pushed right */}
              <button
                className="hidden md:flex items-center gap-2"
                onClick={() => setLang(lang === "es" ? "en" : "es")}
                style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
              >
                <span style={{
                  fontSize: "10px", fontWeight: 600, letterSpacing: "0.08em",
                  color: lang === "es" ? "#F0B06D" : "rgba(244,223,200,0.4)",
                  transition: "color 0.3s ease",
                }}>
                  Español
                </span>
                <div style={{
                  width: 40, height: 22, borderRadius: 50,
                  background: "rgba(240,176,109,0.15)",
                  border: "1px solid rgba(240,176,109,0.4)",
                  position: "relative", flexShrink: 0,
                }}>
                  <motion.div
                    animate={{ x: lang === "en" ? 18 : 2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    style={{
                      position: "absolute", top: 2,
                      width: 16, height: 16, borderRadius: "50%",
                      background: "#F0B06D",
                      boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
                    }}
                  />
                </div>
                <span style={{
                  fontSize: "10px", fontWeight: 600, letterSpacing: "0.08em",
                  color: lang === "en" ? "#F0B06D" : "rgba(244,223,200,0.4)",
                  transition: "color 0.3s ease",
                }}>
                  English
                </span>
              </button>

              {/* Hamburger */}
              <button
                className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-[5px]"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
              >
                {[0, 1, 2].map((i) => (
                  <motion.span key={i}
                    animate={
                      i === 0 ? (menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 })
                      : i === 1 ? (menuOpen ? { opacity: 0 } : { opacity: 1 })
                      : (menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 })
                    }
                    style={{ display: "block", height: "1.5px", width: 22, background: "#F4DFC8", borderRadius: 2 }}
                  />
                ))}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden flex flex-col items-center justify-center"
            style={{ background: "#8B1E24" }}
          >
            <div className="absolute inset-0 pattern-red opacity-30" />
            <ul className="relative flex flex-col items-center gap-10">
              {NAV_LINKS.map(({ label, href }, i) => (
                <motion.li key={label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
                  <button
                    className="font-display font-black"
                    style={{ fontSize: 44, color: "#F0B06D", background: "none", border: "none", cursor: "pointer" }}
                    onClick={() => scrollTo(href)}
                  >
                    {label}
                  </button>
                </motion.li>
              ))}
            </ul>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: NAV_LINKS.length * 0.07 + 0.05 }}
              className="relative mt-12 flex items-center"
              style={{
                padding: 4,
                borderRadius: 999,
                border: "1px solid rgba(240,176,109,0.45)",
                background: "rgba(61,11,14,0.22)",
              }}
            >
              {(["es", "en"] as const).map((option) => {
                const active = lang === option;
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setLang(option)}
                    aria-pressed={active}
                    style={{
                      minWidth: 72,
                      height: 42,
                      borderRadius: 999,
                      border: "none",
                      background: active ? "#F0B06D" : "transparent",
                      color: active ? "#3D0B0E" : "rgba(244,223,200,0.7)",
                      fontSize: 12,
                      fontWeight: 800,
                      letterSpacing: "0.18em",
                      cursor: "pointer",
                      transition: "background 0.25s ease, color 0.25s ease",
                    }}
                  >
                    {option.toUpperCase()}
                  </button>
                );
              })}
            </motion.div>
            <button onClick={() => setMenuOpen(false)}
              className="absolute top-6 right-6"
              style={{ color: "rgba(244,223,200,0.5)", fontSize: 22, background: "none", border: "none", cursor: "pointer" }}>
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
