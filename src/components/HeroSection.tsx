"use client";

import { useEffect, useRef, useState } from "react";
import type { MouseEvent as ReactMouseEvent, PointerEvent as ReactPointerEvent } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";

function LogoBadge() {
  const [hovered, setHovered] = useState(false);
  const alphaMapRef = useRef<{ data: Uint8ClampedArray; width: number; height: number } | null>(null);
  const { lang } = useLanguage();
  const badgeW = "min(297px, 48.3vw)";

  useEffect(() => {
    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      const context = canvas.getContext("2d");
      if (!context) return;
      context.drawImage(image, 0, 0);
      alphaMapRef.current = {
        data: context.getImageData(0, 0, canvas.width, canvas.height).data,
        width: canvas.width,
        height: canvas.height,
      };
    };
    image.src = "/Fotos%20Samosas/Branding/Badge-Samosa-King-tight.png";
  }, []);

  const isPointerOnBadge = (
    event: ReactMouseEvent<HTMLDivElement> | ReactPointerEvent<HTMLDivElement>
  ) => {
    const alphaMap = alphaMapRef.current;
    if (!alphaMap) return true;

    const rect = event.currentTarget.getBoundingClientRect();
    const localX = (event.clientX - rect.left) / rect.width;
    const localY = (event.clientY - rect.top) / rect.height;
    if (localX < 0 || localX > 1 || localY < 0 || localY > 1) return false;

    const sourceX = Math.min(alphaMap.width - 1, Math.max(0, Math.round(localX * alphaMap.width)));
    const sourceY = Math.min(alphaMap.height - 1, Math.max(0, Math.round(localY * alphaMap.height)));
    const alphaIndex = (sourceY * alphaMap.width + sourceX) * 4 + 3;

    return alphaMap.data[alphaIndex] > 24;
  };

  return (
    <div
      style={{ display: "inline-block", cursor: "pointer", perspective: "1100px" }}
      onPointerEnter={(event) => setHovered(isPointerOnBadge(event))}
      onPointerDown={(event) => setHovered(isPointerOnBadge(event))}
      onPointerMove={(event) => setHovered(isPointerOnBadge(event))}
      onPointerLeave={() => setHovered(false)}
      onPointerCancel={() => setHovered(false)}
      onClick={(event) => {
        if (!isPointerOnBadge(event)) return;
        document.querySelector("#lunchbox")?.scrollIntoView({ behavior: "smooth" });
      }}
    >
      <div style={{ animation: "float 7s ease-in-out 1.5s infinite" }}>
        <motion.div
          animate={{ rotateY: hovered ? 180 : 0 }}
          transition={{ duration: 0.72, ease: [0.23, 1, 0.32, 1] }}
          style={{
            width: badgeW,
            aspectRatio: "2044 / 2284",
            display: "block",
            position: "relative",
            transformOrigin: "50% 50%",
            transformStyle: "preserve-3d",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              lineHeight: 0,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/Fotos Samosas/Branding/Badge-Samosa-King-tight.png"
              alt="Samosa King"
              style={{ width: "100%", height: "100%", display: "block", mixBlendMode: "multiply", objectFit: "contain" }}
            />
          </div>

          <div style={{
            position: "absolute", inset: 0,
            backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/Fotos Samosas/Branding/Badge-solo-tight.png"
              alt=""
              style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                inset: 0,
                objectFit: "contain",
                mixBlendMode: "multiply",
              }}
            />
            <span style={{
              position: "relative", zIndex: 1,
              fontFamily: "Merchis, serif",
              fontSize: "clamp(22px, 6.4vw, 42px)",
              color: "#F0B06D",
              textAlign: "center",
              textTransform: "uppercase",
              lineHeight: 1.05,
              letterSpacing: "0.02em",
              whiteSpace: "pre-line",
            }}>
              {lang === "es" ? "Ordena\nAhora" : "Order\nNow"}
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

const NAV_HEIGHT = 70; // mismo que el nav fijo

function CornerOrnament({ position }: { position: "tl" | "tr" | "bl" | "br" }) {
  const rotate = { tl: 270, tr: 0, bl: 180, br: 90 }[position];
  const isLeft = position === "tl" || position === "bl";
  const isTop  = position === "tl" || position === "tr";
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0, duration: 1 }}
      style={{
        position: "absolute",
        ...(isLeft ? { left: 0 } : { right: 0 }),
        // Esquinas top: desplazadas debajo del nav; bottom: pegadas al borde
        ...(isTop ? { top: NAV_HEIGHT } : { bottom: 0 }),
        pointerEvents: "none",
      }}
      className="hidden md:block"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/Fotos Samosas/Branding/Elemento-esquinas.png" alt="" width={120} height={120}
        style={{ transform: `rotate(${rotate}deg)`, mixBlendMode: "multiply", display: "block" }} />
    </motion.div>
  );
}

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const logoY   = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const fadeOut = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const springY = useSpring(logoY, { stiffness: 80, damping: 20 });

  return (
    <section id="hero" ref={ref} className="relative overflow-hidden" style={{ background: "#F4DFC8", minHeight: "100vh" }}>

      {/* Backgrounds */}
      <div className="absolute inset-0 pattern-cream pointer-events-none opacity-60" />
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 65% 65% at 50% 50%, rgba(240,176,109,0.07) 0%, transparent 70%)",
      }} />

      {/* Corner ornaments */}
      <CornerOrnament position="tl" />
      <CornerOrnament position="tr" />
      <CornerOrnament position="bl" />
      <CornerOrnament position="br" />

      {/* Badge + tagline: centrado absoluto entre las esquinas */}
      {/* top 50% + 35px ajusta el centro al espacio disponible debajo del nav (70px / 2 = 35px) */}
      <div
        className="relative z-10 flex flex-col items-center"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, calc(-50% + 35px))",
          textAlign: "center",
          width: "100%",
        }}
      >
        <motion.div
          style={{ y: springY }}
          initial={{ opacity: 0, scale: 0.75, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.0, ease: [0.23, 1, 0.32, 1], delay: 0.15 }}
        >
          <LogoBadge />
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.9, delay: 0.8 }}
          className="flex items-center justify-center gap-4 mt-6 mb-5"
          style={{ opacity: fadeOut }}
        >
          <div style={{ height: "1px", width: 70, background: "linear-gradient(to right, transparent, #F0B06D)" }} />
          <svg width="12" height="12" viewBox="0 0 12 12"><path d="M6,1 L8,6 L6,11 L4,6 Z" fill="#F0B06D" opacity="0.85"/></svg>
          <div style={{ height: "1px", width: 70, background: "linear-gradient(to left, transparent, #F0B06D)" }} />
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: [0, -5, 0] }}
          transition={{
            opacity: { duration: 0.7, delay: 0.9 },
            y: { duration: 4.5, delay: 1.2, repeat: Infinity, ease: "easeInOut" },
          }}
          style={{ opacity: fadeOut, display: "flex", justifyContent: "center", position: "relative" }}
        >
          <h1
            style={{
              color: "#8B1E24",
              fontFamily: "Merchis, serif",
              fontSize: "clamp(34px, 7.5vw, 76px)",
              fontWeight: 400,
              letterSpacing: "0.02em",
              lineHeight: 0.95,
              textTransform: "uppercase",
            }}
          >
            EMPANADAS DE LA INDIA
          </h1>
        </motion.div>
      </div>


      <div className="absolute bottom-0 inset-x-0 section-divider-gold pointer-events-none" />
    </section>
  );
}
