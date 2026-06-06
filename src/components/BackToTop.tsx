"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fn = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.7, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 16 }}
          transition={{ duration: 0.3 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          style={{
            position: "fixed", bottom: "28px", right: "28px", zIndex: 50,
            width: "44px", height: "44px", borderRadius: "50%",
            background: "linear-gradient(135deg, #8B1E24, #6A1318)",
            border: "1px solid rgba(240,176,109,0.35)",
            color: "#F0B06D", fontSize: "18px",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer",
            boxShadow: "0 4px 18px rgba(139,30,36,0.35)",
            transition: "all 0.25s ease",
          }}
          onMouseEnter={(e) => {
            const btn = e.currentTarget as HTMLButtonElement;
            btn.style.boxShadow = "0 0 24px rgba(139,30,36,0.55)";
            btn.style.transform = "translateY(-3px)";
          }}
          onMouseLeave={(e) => {
            const btn = e.currentTarget as HTMLButtonElement;
            btn.style.boxShadow = "0 4px 18px rgba(139,30,36,0.35)";
            btn.style.transform = "none";
          }}
        >
          ↑
        </motion.button>
      )}
    </AnimatePresence>
  );
}
