"use client";

const NAV_LINKS = [
  { label: "Menú", href: "#menu" },
  { label: "Nuestra historia", href: "#story" },
  { label: "Lunchboxes", href: "#lunchbox" },
  { label: "Chutneys", href: "#chutneys" },
];

export default function Footer() {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden" style={{ background: "#3D0B0E" }}>
      <div className="absolute inset-0 pattern-red pointer-events-none opacity-20" />
      <div
        style={{
          height: "1px",
          background: "linear-gradient(to right, transparent, rgba(240,176,109,0.45), transparent)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 py-10 md:py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="flex items-center gap-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/Fotos Samosas/Branding/Badge-Samosa-King.png"
              alt="Samosa King"
              style={{
                width: 96,
                height: "auto",
                mixBlendMode: "screen",
                display: "block",
                opacity: 0.9,
                flexShrink: 0,
              }}
            />
            <div>
              <p
                className="font-fascinate"
                style={{ color: "#F4DFC8", fontSize: 20, lineHeight: 1.1, marginBottom: 7 }}
              >
                Empanadas de la India
              </p>
              <p style={{ color: "rgba(244,223,200,0.5)", fontSize: 13, lineHeight: 1.5 }}>
                Samosas artesanales, especias reales.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-5 md:gap-8">
            <div>
              <p
                style={{
                  color: "rgba(240,176,109,0.55)",
                  fontSize: 8,
                  fontWeight: 700,
                  letterSpacing: "0.24em",
                  textTransform: "uppercase",
                  marginBottom: 5,
                }}
              >
                Abierto hoy
              </p>
              <p style={{ color: "rgba(244,223,200,0.72)", fontSize: 13 }}>
                11:00–20:00 · (555) 123-4567
              </p>
            </div>
            <button
              className="btn-gold"
              style={{ padding: "12px 26px", whiteSpace: "nowrap" }}
            >
              Ordenar online
            </button>
          </div>
        </div>

        <div
          className="flex flex-col md:flex-row md:items-center justify-between gap-5 mt-9 pt-6"
          style={{ borderTop: "1px solid rgba(240,176,109,0.12)" }}
        >
          <nav aria-label="Navegación del footer">
            <ul className="flex flex-wrap gap-x-6 gap-y-3">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <button
                    onClick={() => scrollTo(href)}
                    style={{
                      color: "rgba(244,223,200,0.5)",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontSize: 10,
                      fontWeight: 600,
                      letterSpacing: "0.14em",
                      padding: 0,
                      textTransform: "uppercase",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#F0B06D";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "rgba(244,223,200,0.5)";
                    }}
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <a
              href="#"
              style={{ color: "rgba(244,223,200,0.45)", fontSize: 11, textDecoration: "none" }}
            >
              Instagram
            </a>
            <span style={{ color: "rgba(240,176,109,0.3)", fontSize: 10 }}>✦</span>
            <p style={{ color: "rgba(244,223,200,0.28)", fontSize: 11 }}>
              © 2026 Samosa King
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
