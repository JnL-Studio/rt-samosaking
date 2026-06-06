"use client";

interface LogoProps {
  size?: number;
  className?: string;
  variant?: "full" | "shield-only" | "icon";
}

export default function SamosaKingLogo({ size = 200, className = "", variant = "full" }: LogoProps) {
  const w = variant === "icon" ? size : size;
  const h = variant === "icon" ? size : size * 1.42;

  return (
    <svg
      viewBox="0 0 240 340"
      width={w}
      height={h}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A02028" />
          <stop offset="50%" stopColor="#8B1E24" />
          <stop offset="100%" stopColor="#6A1418" />
        </linearGradient>
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F0B06D" />
          <stop offset="50%" stopColor="#F0B06D" />
          <stop offset="100%" stopColor="#F0B06D" />
        </linearGradient>
        <linearGradient id="goldShine" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F0B06D" />
          <stop offset="100%" stopColor="#C08030" />
        </linearGradient>
        <filter id="logoShadow">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#3D0B0E" floodOpacity="0.25" />
        </filter>
      </defs>

      {/* ── SHIELD OUTER SHAPE ── */}
      {/* Gold outer border */}
      <path
        d="M120,8 C100,8 75,20 62,38 L28,38 C16,38 8,46 8,58 L8,175
           C8,215 28,245 55,260 L120,292 L185,260 C212,245 232,215 232,175
           L232,58 C232,46 224,38 212,38 L178,38 C165,20 140,8 120,8 Z"
        fill="url(#goldGrad)"
        filter="url(#logoShadow)"
      />

      {/* Deep red shield fill */}
      <path
        d="M120,16 C102,16 80,26 68,44 L34,44 C24,44 16,52 16,62 L16,174
           C16,212 34,240 60,254 L120,284 L180,254 C206,240 224,212 224,174
           L224,62 C224,52 216,44 206,44 L172,44 C160,26 138,16 120,16 Z"
        fill="url(#shieldGrad)"
      />

      {/* Inner gold decorative border */}
      <path
        d="M120,26 C104,26 84,34 74,50 L42,50 C34,50 28,56 28,64 L28,172
           C28,208 44,234 68,248 L120,274 L172,248 C196,234 212,208 212,172
           L212,64 C212,56 206,50 198,50 L166,50 C156,34 136,26 120,26 Z"
        fill="none"
        stroke="#F0B06D"
        strokeWidth="2"
        opacity="0.5"
      />

      {/* Inner decorative swirl lines (top) */}
      <path
        d="M80,58 Q90,48 120,48 Q150,48 160,58"
        fill="none" stroke="#F0B06D" strokeWidth="1.2" opacity="0.6"
      />
      <path
        d="M60,72 Q65,62 80,58 M160,58 Q175,62 180,72"
        fill="none" stroke="#F0B06D" strokeWidth="1.2" opacity="0.6"
      />

      {/* Inner decorative swirl lines (bottom) */}
      <path
        d="M60,195 Q65,208 80,218 Q100,228 120,228 Q140,228 160,218 Q175,208 180,195"
        fill="none" stroke="#F0B06D" strokeWidth="1.2" opacity="0.5"
      />

      {/* ── CROWN ── */}
      {/* Crown base bar */}
      <rect x="72" y="152" width="96" height="18" rx="4" fill="url(#goldShine)" />
      {/* Crown base shine */}
      <rect x="72" y="152" width="96" height="6" rx="4" fill="rgba(255,255,255,0.15)" />

      {/* Crown body (the curved base between prongs) */}
      <path
        d="M72,152 L72,135 Q84,148 96,135 Q108,122 120,135 Q132,148 144,135 Q156,122 168,135 L168,152 Z"
        fill="url(#goldShine)"
      />

      {/* Left prong ball */}
      <circle cx="78" cy="112" r="9" fill="url(#goldShine)" />
      <circle cx="78" cy="112" r="6" fill="url(#goldGrad)" />
      <circle cx="76" cy="110" r="2" fill="rgba(255,255,255,0.3)" />

      {/* Left-center prong ball */}
      <circle cx="102" cy="105" r="9" fill="url(#goldShine)" />
      <circle cx="102" cy="105" r="6" fill="url(#goldGrad)" />
      <circle cx="100" cy="103" r="2" fill="rgba(255,255,255,0.3)" />

      {/* Center prong (tallest) with diamond cutout */}
      <path
        d="M114,88 L120,80 L126,88 L126,135 L114,135 Z"
        fill="url(#goldShine)"
      />
      {/* Diamond hole in center prong */}
      <path
        d="M120,95 L124,100 L120,105 L116,100 Z"
        fill="#8B1E24"
      />
      <circle cx="120" cy="80" r="9" fill="url(#goldShine)" />
      <circle cx="120" cy="80" r="6" fill="url(#goldGrad)" />
      <circle cx="118" cy="78" r="2" fill="rgba(255,255,255,0.3)" />

      {/* Right-center prong ball */}
      <circle cx="138" cy="105" r="9" fill="url(#goldShine)" />
      <circle cx="138" cy="105" r="6" fill="url(#goldGrad)" />
      <circle cx="136" cy="103" r="2" fill="rgba(255,255,255,0.3)" />

      {/* Right prong ball */}
      <circle cx="162" cy="112" r="9" fill="url(#goldShine)" />
      <circle cx="162" cy="112" r="6" fill="url(#goldGrad)" />
      <circle cx="160" cy="110" r="2" fill="rgba(255,255,255,0.3)" />

      {/* ── TEXT ── */}
      {/* Horizontal line above text */}
      <line x1="62" y1="180" x2="178" y2="180" stroke="#F0B06D" strokeWidth="1.5" opacity="0.8" />

      {/* "SAMOSA" */}
      <text
        x="120" y="205"
        textAnchor="middle"
        fill="url(#goldGrad)"
        fontSize="26"
        fontWeight="900"
        fontFamily="'Arial Black', 'Impact', sans-serif"
        letterSpacing="4"
      >
        SAMOSA
      </text>

      {/* "KING" */}
      <text
        x="120" y="228"
        textAnchor="middle"
        fill="url(#goldGrad)"
        fontSize="26"
        fontWeight="900"
        fontFamily="'Arial Black', 'Impact', sans-serif"
        letterSpacing="6"
      >
        KING
      </text>

      {/* Horizontal line below text */}
      <line x1="62" y1="236" x2="178" y2="236" stroke="#F0B06D" strokeWidth="1.5" opacity="0.8" />

      {/* ── TAGLINE ── */}
      {variant === "full" && (
        <text
          x="120" y="310"
          textAnchor="middle"
          fill="#8B1E24"
          fontSize="14"
          fontStyle="italic"
          fontFamily="'Georgia', 'Times New Roman', serif"
          letterSpacing="1"
        >
          Empanadas de la India
        </text>
      )}
    </svg>
  );
}
