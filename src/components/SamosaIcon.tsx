"use client";

interface SamosaIconProps {
  size?: number;
  glow?: boolean;
  className?: string;
  variant?: "full" | "left" | "right";
  fillOpacity?: number;
}

export default function SamosaIcon({
  size = 300,
  glow = false,
  className = "",
  variant = "full",
  fillOpacity = 1,
}: SamosaIconProps) {
  const w = size;
  const h = size * 0.9;

  return (
    <svg
      viewBox="0 0 300 270"
      width={w}
      height={h}
      className={className}
      style={{
        filter: glow
          ? "drop-shadow(0 0 30px rgba(214,161,90,0.5)) drop-shadow(0 20px 40px rgba(0,0,0,0.5))"
          : "drop-shadow(0 15px 30px rgba(0,0,0,0.5))",
        willChange: "transform",
      }}
    >
      <defs>
        <linearGradient id="samosaLeft" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F0B84A" stopOpacity={fillOpacity} />
          <stop offset="40%" stopColor="#D4923A" stopOpacity={fillOpacity} />
          <stop offset="100%" stopColor="#9B6020" stopOpacity={fillOpacity} />
        </linearGradient>
        <linearGradient id="samosaRight" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#D8A040" stopOpacity={fillOpacity} />
          <stop offset="40%" stopColor="#B07828" stopOpacity={fillOpacity} />
          <stop offset="100%" stopColor="#7A4C14" stopOpacity={fillOpacity} />
        </linearGradient>
        <linearGradient id="samosaEdge" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#C08030" stopOpacity={fillOpacity} />
          <stop offset="100%" stopColor="#6A3C10" stopOpacity={fillOpacity} />
        </linearGradient>
        <radialGradient id="samosaHighlight" cx="35%" cy="25%" r="45%">
          <stop offset="0%" stopColor="rgba(255,215,100,0.35)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>
        <radialGradient id="samosaHighlight2" cx="70%" cy="30%" r="30%">
          <stop offset="0%" stopColor="rgba(255,200,80,0.15)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>
        <radialGradient id="innerGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFD080" />
          <stop offset="40%" stopColor="#FF9020" />
          <stop offset="100%" stopColor="#8B3A00" />
        </radialGradient>
        <filter id="samosaShadow">
          <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#6A3010" floodOpacity="0.4" />
        </filter>
        <clipPath id="leftHalf">
          <rect x="0" y="0" width="150" height="270" />
        </clipPath>
        <clipPath id="rightHalf">
          <rect x="150" y="0" width="150" height="270" />
        </clipPath>
      </defs>

      {/* Left face of samosa */}
      {(variant === "full" || variant === "left") && (
        <g clipPath={variant === "full" ? "url(#leftHalf)" : undefined}>
          <path
            d="M150,18 C148,18 142,30 132,48 C110,88 72,160 38,246 L150,246 Z"
            fill="url(#samosaLeft)"
            filter="url(#samosaShadow)"
          />
          {/* Left edge crimping */}
          {Array.from({ length: 9 }).map((_, i) => {
            const t = (i + 0.5) / 9;
            const x = 150 + (38 - 150) * t;
            const y = 18 + (246 - 18) * t;
            const nx = -(246 - 18);
            const ny = 38 - 150;
            const len = Math.sqrt(nx * nx + ny * ny);
            const cx = x + (nx / len) * 7;
            const cy = y + (ny / len) * 7;
            return (
              <ellipse
                key={i}
                cx={cx}
                cy={cy}
                rx={5}
                ry={3}
                transform={`rotate(${Math.atan2(246 - 18, 38 - 150) * (180 / Math.PI)}, ${cx}, ${cy})`}
                fill="#7A4C14"
                opacity="0.6"
              />
            );
          })}
          <path
            d="M150,18 C148,18 142,30 132,48 C110,88 72,160 38,246 L150,246 Z"
            fill="url(#samosaHighlight)"
          />
        </g>
      )}

      {/* Right face of samosa */}
      {(variant === "full" || variant === "right") && (
        <g clipPath={variant === "full" ? "url(#rightHalf)" : undefined}>
          <path
            d="M150,18 C152,18 158,30 168,48 C190,88 228,160 262,246 L150,246 Z"
            fill="url(#samosaRight)"
            filter="url(#samosaShadow)"
          />
          {/* Right edge crimping */}
          {Array.from({ length: 9 }).map((_, i) => {
            const t = (i + 0.5) / 9;
            const x = 150 + (262 - 150) * t;
            const y = 18 + (246 - 18) * t;
            const nx = 246 - 18;
            const ny = 262 - 150;
            const len = Math.sqrt(nx * nx + ny * ny);
            const cx = x + (nx / len) * 7;
            const cy = y + (ny / len) * 7;
            return (
              <ellipse
                key={i}
                cx={cx}
                cy={cy}
                rx={5}
                ry={3}
                transform={`rotate(${Math.atan2(246 - 18, 262 - 150) * (180 / Math.PI)}, ${cx}, ${cy})`}
                fill="#5A3A0E"
                opacity="0.6"
              />
            );
          })}
          <path
            d="M150,18 C152,18 158,30 168,48 C190,88 228,160 262,246 L150,246 Z"
            fill="url(#samosaHighlight2)"
          />
        </g>
      )}

      {/* Bottom base / sealed edge */}
      {(variant === "full") && (
        <>
          <path
            d="M38,246 Q94,258 150,256 Q206,258 262,246 L262,250 Q206,264 150,262 Q94,264 38,250 Z"
            fill="url(#samosaEdge)"
          />
          {/* Bottom crimped bumps */}
          {Array.from({ length: 14 }).map((_, i) => {
            const x = 42 + i * 16;
            return (
              <ellipse
                key={i}
                cx={x}
                cy={249}
                rx={6}
                ry={4}
                fill={i % 2 === 0 ? "#B07030" : "#8B5520"}
                opacity="0.8"
              />
            );
          })}
        </>
      )}

      {/* Top peak shadow / crease */}
      <line
        x1="150" y1="18"
        x2="150" y2="246"
        stroke="rgba(0,0,0,0.2)"
        strokeWidth="2"
      />

      {/* Subtle texture dots */}
      {[
        { cx: 100, cy: 100 }, { cx: 85, cy: 150 }, { cx: 110, cy: 190 },
        { cx: 130, cy: 130 }, { cx: 75, cy: 200 },
        { cx: 200, cy: 100 }, { cx: 215, cy: 150 }, { cx: 190, cy: 190 },
        { cx: 170, cy: 130 }, { cx: 225, cy: 200 },
      ].map((dot, i) => (
        <circle key={i} cx={dot.cx} cy={dot.cy} r="1.5" fill="rgba(80,40,10,0.25)" />
      ))}

      {/* Specular highlight on top peak */}
      <ellipse cx="135" cy="45" rx="12" ry="18"
        fill="rgba(255,220,120,0.22)"
        transform="rotate(-30,135,45)"
      />
    </svg>
  );
}

export function SamosaHalf({ side, size = 300, opening = 0 }: {
  side: "left" | "right";
  size?: number;
  opening?: number;
}) {
  return (
    <div
      style={{
        transformOrigin: side === "left" ? "right center" : "left center",
        transform: `perspective(800px) rotateY(${side === "left" ? -opening : opening}deg)`,
        transition: "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)",
        willChange: "transform",
      }}
    >
      <SamosaIcon size={size} variant={side} />
    </div>
  );
}
