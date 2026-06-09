"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const CHUTNEYS = [
  {
    id: "mint",
    name: "Mint & Coriander",
    description: "Bright and cooling with garden-fresh mint. The classic companion to any samosa.",
    flavor: "Cooling · Fresh · Herby",
    heat: 1,
    texture: "Smooth",
    ingredient: "Mint, coriander, green chilli, lime",
    pairing: "Garden Veggie",
    color: "#4F7D45",
  },
  {
    id: "tamarind",
    name: "Sweet Tamarind",
    description: "Deep, tangy tamarind balanced with dates and warming spices. A timeless classic.",
    flavor: "Tangy · Sweet · Complex",
    heat: 1,
    texture: "Thick & rich",
    ingredient: "Tamarind, dates, cumin, jaggery",
    pairing: "Royal Beef",
    color: "#8B4020",
  },
  {
    id: "mango",
    name: "Mango Habanero",
    description: "Sun-ripe Alphonso mango meets habanero heat. Bold, tropical and unforgettable.",
    flavor: "Tropical · Fruity · Fiery",
    heat: 4,
    texture: "Chunky",
    ingredient: "Alphonso mango, habanero, turmeric",
    pairing: "Masala Chicken",
    color: "#C68118",
  },
  {
    id: "garlic",
    name: "Roasted Garlic",
    description: "Deeply caramelized garlic with red chilli and cumin. Intense, savory and warming.",
    flavor: "Bold · Umami · Smoky",
    heat: 3,
    texture: "Rustic",
    ingredient: "Garlic, red chilli, cumin, vinegar",
    pairing: "Keema Lamb",
    color: "#9A4A22",
  },
  {
    id: "coconut",
    name: "Coconut Ginger",
    description: "Creamy fresh coconut with ginger, curry leaf and toasted mustard seeds.",
    flavor: "Creamy · Aromatic · Gentle",
    heat: 2,
    texture: "Creamy",
    ingredient: "Coconut, ginger, curry leaf, mustard",
    pairing: "Spiced Paneer",
    color: "#92784C",
  },
];

function HeatScale({ level }: { level: number }) {
  return (
    <div className="flex items-center gap-2" aria-label={`Heat level ${level} of 5`}>
      <span style={{ fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase" }}>Heat</span>
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <span
            key={index}
            style={{
              width: 18,
              height: 2,
              background: index < level ? "#8B1E24" : "rgba(61,11,14,0.16)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default function ChutneySection() {
  const [activeId, setActiveId] = useState("mint");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const active = CHUTNEYS.find((chutney) => chutney.id === activeId)!;

  return (
    <section
      id="chutneys"
      ref={ref}
      className="relative overflow-hidden px-6 py-24 md:py-28"
      style={{ background: "#F4DFC8" }}
    >
      <div className="absolute inset-0 pattern-cream pointer-events-none opacity-35" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-[0.85fr_1.15fr] gap-10 md:gap-20 items-end mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65 }}
          >
            <p
              style={{
                color: "rgba(61,11,14,0.45)",
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: "0.32em",
                marginBottom: 14,
                textTransform: "uppercase",
              }}
            >
              Made in our kitchen
            </p>
            <h2
              className="font-fascinate"
              style={{
                color: "#8B1E24",
                fontSize: "clamp(42px, 7vw, 82px)",
                lineHeight: 0.95,
                textTransform: "uppercase",
              }}
            >
              The Chutneys
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.1 }}
            style={{
              color: "rgba(61,11,14,0.58)",
              fontSize: 15,
              lineHeight: 1.7,
              maxWidth: 460,
            }}
          >
            Five small-batch sauces, prepared daily. Choose a flavor to find its ingredients,
            heat and best samosa pairing.
          </motion.p>
        </div>

        <div
          className="grid md:grid-cols-[0.85fr_1.15fr]"
          style={{ borderTop: "1px solid rgba(139,30,36,0.2)", borderBottom: "1px solid rgba(139,30,36,0.2)" }}
        >
          <div
            className="py-3 md:py-7 md:pr-10 md:border-r"
            style={{ borderColor: "rgba(139,30,36,0.16)" }}
          >
            {CHUTNEYS.map((chutney, index) => {
              const selected = chutney.id === activeId;

              return (
                <button
                  key={chutney.id}
                  onClick={() => setActiveId(chutney.id)}
                  className="group w-full flex items-center gap-4 text-left"
                  style={{
                    background: selected ? "rgba(139,30,36,0.055)" : "transparent",
                    border: "none",
                    borderBottom: index < CHUTNEYS.length - 1 ? "1px solid rgba(139,30,36,0.1)" : "none",
                    cursor: "pointer",
                    padding: "17px 14px",
                    transition: "background 0.2s ease",
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      width: selected ? 22 : 10,
                      height: 10,
                      borderRadius: 20,
                      background: chutney.color,
                      flexShrink: 0,
                      transition: "width 0.25s ease",
                    }}
                  />
                  <span
                    className="font-display"
                    style={{
                      color: selected ? "#8B1E24" : "rgba(61,11,14,0.62)",
                      fontSize: 17,
                      fontWeight: selected ? 700 : 500,
                      transition: "color 0.2s ease",
                    }}
                  >
                    {chutney.name}
                  </span>
                  <span
                    style={{
                      color: selected ? "#8B1E24" : "rgba(61,11,14,0.25)",
                      fontSize: 14,
                      marginLeft: "auto",
                    }}
                  >
                    {selected ? "—" : "↗"}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="relative min-h-[390px] px-1 py-10 md:px-14 md:py-12">
            <motion.article
              key={active.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.24 }}
            >
                <div className="flex items-center gap-3 mb-7">
                  <span
                    aria-hidden="true"
                    style={{ width: 42, height: 5, borderRadius: 10, background: active.color }}
                  />
                  <span
                    style={{
                      color: "rgba(61,11,14,0.42)",
                      fontSize: 9,
                      fontWeight: 700,
                      letterSpacing: "0.24em",
                      textTransform: "uppercase",
                    }}
                  >
                    House chutney
                  </span>
                </div>

                <h3
                  className="font-display font-bold"
                  style={{
                    color: "#3D0B0E",
                    fontSize: "clamp(30px, 4vw, 48px)",
                    lineHeight: 1.05,
                    marginBottom: 12,
                  }}
                >
                  {active.name}
                </h3>
                <p
                  style={{
                    color: active.color,
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: "0.16em",
                    marginBottom: 22,
                    textTransform: "uppercase",
                  }}
                >
                  {active.flavor}
                </p>
                <p
                  style={{
                    color: "rgba(61,11,14,0.66)",
                    fontSize: 16,
                    lineHeight: 1.75,
                    maxWidth: 510,
                    marginBottom: 32,
                  }}
                >
                  {active.description}
                </p>

                <div className="grid sm:grid-cols-2 gap-x-10 gap-y-7 pt-7" style={{ borderTop: "1px solid rgba(139,30,36,0.14)" }}>
                  <div>
                    <p style={{ color: "rgba(61,11,14,0.38)", fontSize: 9, letterSpacing: "0.2em", marginBottom: 8, textTransform: "uppercase" }}>
                      Ingredients
                    </p>
                    <p style={{ color: "rgba(61,11,14,0.68)", fontSize: 13, lineHeight: 1.6 }}>
                      {active.ingredient}
                    </p>
                  </div>
                  <div>
                    <p style={{ color: "rgba(61,11,14,0.38)", fontSize: 9, letterSpacing: "0.2em", marginBottom: 8, textTransform: "uppercase" }}>
                      Best with
                    </p>
                    <p style={{ color: "rgba(61,11,14,0.68)", fontSize: 13 }}>
                      {active.pairing} · {active.texture}
                    </p>
                  </div>
                </div>

                <div className="mt-8" style={{ color: "rgba(61,11,14,0.48)" }}>
                  <HeatScale level={active.heat} />
                </div>
            </motion.article>
          </div>
        </div>
      </div>
    </section>
  );
}
