"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";

function ScrollStep({ step, index }: { step: { num: string; heading: { es: string; en: string }; body: { es: string; en: string } }; index: number }) {
  const { lang } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "start 0.2"] });
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const accent = index === 1 ? "#8B1E24" : "#F0B06D";

  return (
    <motion.div
      ref={ref} style={{ opacity, y }}
      className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center py-24"
    >
      <div className={index % 2 === 1 ? "md:order-2" : ""}>
        <div style={{ fontSize: "clamp(100px, 18vw, 180px)", fontFamily: "var(--font-playfair)", fontWeight: 900, color: "rgba(139,30,36,0.08)", lineHeight: 1, letterSpacing: "-0.04em", userSelect: "none" }}>
          {step.num}
        </div>
      </div>
      <div className={index % 2 === 1 ? "md:order-1" : ""}>
        <div style={{ width: 32, height: 2, background: accent, marginBottom: 24, borderRadius: 2 }} />
        <h3 className="font-fascinate mb-6"
          style={{ fontSize: "clamp(22px, 4vw, 42px)", color: "#8B1E24", lineHeight: 1.2, textTransform: "uppercase", whiteSpace: "pre-line" }}>
          {step.heading[lang]}
        </h3>
        <p style={{ fontSize: "15px", color: "rgba(61,11,14,0.55)", lineHeight: 1.8, maxWidth: 420 }}>
          {step.body[lang]}
        </p>
      </div>
    </motion.div>
  );
}

export default function StorytellingSection() {
  const { lang, t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const badgeY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const badgeOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

  return (
    <section id="story" ref={sectionRef} className="relative overflow-hidden" style={{ background: "#F4DFC8" }}>
      <div style={{ height: "1px", background: "linear-gradient(to right, transparent, rgba(240,176,109,0.5), transparent)" }} />

      {/* Badge watermark */}
      <motion.div style={{ y: badgeY, opacity: badgeOpacity, position: "absolute", right: "-6%", top: "10%", pointerEvents: "none", zIndex: 0 }} className="hidden xl:block">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/Fotos Samosas/Branding/Badge-Samosa-King.png" alt="" width={420} height={420} style={{ mixBlendMode: "multiply", opacity: 0.06 }} />
      </motion.div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="pt-24 pb-4 text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{ fontSize: "9px", letterSpacing: "0.4em", color: "rgba(61,11,14,0.35)", textTransform: "uppercase", fontWeight: 600, marginBottom: 16 }}
          >
            {t.story.label[lang]}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.06 }}
            className="font-fascinate"
            style={{ fontSize: "clamp(34px, 6vw, 76px)", color: "#8B1E24", lineHeight: 1.1, textTransform: "uppercase" }}
          >
            {lang === "es" ? <>Hecho con<br /><span style={{ color: "#F0B06D" }}>el alma.</span></> : <>Made with<br /><span style={{ color: "#F0B06D" }}>the soul.</span></>}
          </motion.h2>
        </div>

        <div style={{ marginTop: 16 }}>
          {t.story.steps.map((step, i) => (
            <div key={step.num} style={{ borderTop: i > 0 ? "1px solid rgba(139,30,36,0.08)" : "none" }}>
              <ScrollStep step={step} index={i} />
            </div>
          ))}
        </div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="py-20 text-center"
          style={{ borderTop: "1px solid rgba(240,176,109,0.3)" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/Fotos Samosas/Branding/Empanadas-de-la-india-(rojo).png" alt="Empanadas de la India"
            style={{ height: "clamp(18px, 2.5vw, 30px)", width: "auto", mixBlendMode: "multiply", opacity: 0.5, display: "block", margin: "0 auto 32px" }} />
          <blockquote className="font-display italic"
            style={{ fontSize: "clamp(20px, 3.5vw, 36px)", color: "rgba(61,11,14,0.6)", lineHeight: 1.5, maxWidth: 680, margin: "0 auto" }}>
            {t.story.quote[lang]}
          </blockquote>
          <footer style={{ marginTop: 20, fontSize: "10px", letterSpacing: "0.28em", color: "rgba(61,11,14,0.3)", textTransform: "uppercase" }}>
            {t.story.quoteAuthor[lang]}
          </footer>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-3 pb-20"
          style={{ borderTop: "1px solid rgba(139,30,36,0.1)" }}
        >
          {t.story.stats.map((stat, i) => (
            <div key={stat.label.es} className="text-center py-10"
              style={{ borderRight: i < 2 ? "1px solid rgba(139,30,36,0.1)" : "none" }}>
              <div className="font-display font-black"
                style={{ fontSize: "clamp(36px, 6vw, 72px)", color: "#8B1E24", lineHeight: 1, letterSpacing: "-0.02em" }}>
                {stat.n}
              </div>
              <div style={{ fontSize: "12px", fontWeight: 600, color: "#3D0B0E", marginTop: 6, letterSpacing: "0.04em" }}>{stat.label[lang]}</div>
              <div style={{ fontSize: "11px", color: "rgba(61,11,14,0.35)", marginTop: 3 }}>{stat.sub[lang]}</div>
            </div>
          ))}
        </motion.div>
      </div>

      <div style={{ height: "1px", background: "linear-gradient(to right, transparent, rgba(240,176,109,0.4), transparent)" }} />
    </section>
  );
}
