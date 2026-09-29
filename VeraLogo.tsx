import React from 'react';

interface VeraLogoProps {
  size?: number;
  className?: string;
  variant?: 'mark' | 'badge' | 'full';
  showTagline?: boolean;
}

/**
 * VeraCredit "V" Monogram Symbol
 * 
 * Design Concept:
 * - Geometric "V" Monogram representing VeraCredit (Truth & Creditworthiness).
 * - Left Wing: Downward anchored pillar in Royal Sapphire Blue (Institutional stability & actuarial foundation).
 * - Right Wing: Soaring upward growth vector in Electric Violet to Vibrant Cyan (Financial velocity & loan approval).
 * - Center Intersection: Embedded precision checkmark / diamond apex (Vera = verified authenticity).
 * - Top-Right Apex Spark: Golden starburst denoting prime tier excellence.
 */
export const VeraLogo: React.FC<VeraLogoProps> = ({
  size = 36,
  className = '',
  variant = 'badge',
  showTagline = false,
}) => {
  // SVG Mark of the stylized "V"
  const symbolSvg = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="transition-transform duration-300 group-hover:scale-105"
      aria-label="VeraCredit V Symbol"
    >
      <defs>
        {/* Gradient 1: Left Wing - Royal Sapphire to Deep Indigo */}
        <linearGradient id="vLeftWingGrad" x1="8" y1="8" x2="24" y2="38" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="60%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>

        {/* Gradient 2: Right Wing - Electric Violet to Fresh Cyan */}
        <linearGradient id="vRightWingGrad" x1="22" y1="36" x2="42" y2="6" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="50%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>

        {/* Gradient 3: Apex Core / Verification Diamond */}
        <linearGradient id="vApexCoreGrad" x1="16" y1="20" x2="32" y2="38" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>

        {/* Gradient 4: Subtle Golden Highlight Spark */}
        <linearGradient id="vGoldSparkGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fde047" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>

        {/* Soft Drop Shadow for depth */}
        <filter id="vDropGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#3b82f6" floodOpacity="0.25" />
        </filter>
      </defs>

      {/* Background Soft Glow Disc (Subtle) */}
      <circle cx="24" cy="24" r="20" fill="url(#vLeftWingGrad)" opacity="0.08" />

      {/* Group with filter */}
      <g filter="url(#vDropGlow)">
        {/* Left Wing of the "V" (Institutional Foundation Pillar) */}
        <path
          d="M 9.5 8 C 8.4 8 7.5 8.9 7.5 10 L 7.5 11.2 C 7.5 11.9 7.8 12.6 8.3 13.1 L 21 28.5 L 26.5 28.5 L 15.2 8.9 C 14.8 8.3 14.1 8 13.4 8 Z"
          fill="url(#vLeftWingGrad)"
        />

        {/* Right Wing of the "V" (Soaring Growth & Credit Trajectory) */}
        <path
          d="M 23.2 40.5 C 23.8 41.2 24.9 41.2 25.5 40.5 L 40.7 13.2 C 41.2 12.7 41.5 12 41.5 11.2 L 41.5 10 C 41.5 8.9 40.6 8 39.5 8 L 34.6 8 C 33.9 8 33.2 8.3 32.8 8.9 L 24.4 24.5 L 19.8 18.8 L 16.5 22.8 L 23.2 40.5 Z"
          fill="url(#vRightWingGrad)"
        />

        {/* Overlapping Apex Crest (Interlocking Facet that forms the "True Verification" checkmark contour) */}
        <path
          d="M 16.5 22.8 L 24.3 33.2 C 24.7 33.7 25.4 33.7 25.8 33.2 L 34.8 17.5 L 30.5 17.5 L 24.5 28 L 19.8 22 Z"
          fill="url(#vApexCoreGrad)"
          opacity="0.95"
        />

        {/* Vera Diamond Apex Node (Precision verification point) */}
        <path
          d="M 24.5 30.5 L 26.5 28 L 24.5 25.5 L 22.5 28 Z"
          fill="#ffffff"
          opacity="0.9"
        />

        {/* Top-Right Golden Success Spark (Denoting prime institutional credit) */}
        <path
          d="M 39 5.5 L 40 7.5 L 42 8.5 L 40 9.5 L 39 11.5 L 38 9.5 L 36 8.5 L 38 7.5 Z"
          fill="url(#vGoldSparkGrad)"
        />
      </g>
    </svg>
  );

  if (variant === 'mark') {
    return <div className={`inline-flex items-center justify-center ${className}`}>{symbolSvg}</div>;
  }

  if (variant === 'badge') {
    return (
      <div className={`relative group inline-flex items-center justify-center ${className}`}>
        {/* Subtle Multi-gradient Glass Shield Container */}
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600/30 via-violet-600/20 to-cyan-400/30 p-[1px] shadow-sm shadow-blue-500/15 group-hover:shadow-blue-500/30 group-hover:from-blue-600/50 group-hover:to-cyan-400/50 transition-all duration-300">
          <div className="w-full h-full bg-slate-900/95 dark:bg-[#0c111d] rounded-[11px] flex items-center justify-center overflow-hidden backdrop-blur-md">
            {symbolSvg}
          </div>
        </div>
      </div>
    );
  }

  // Full variant: Symbol + Typography
  return (
    <div className={`flex items-center gap-3 select-none group cursor-pointer ${className}`}>
      <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600/30 via-violet-600/20 to-cyan-400/30 p-[1px] shadow-sm shadow-blue-500/15 group-hover:shadow-blue-500/30 group-hover:from-blue-600/50 group-hover:to-cyan-400/50 transition-all duration-300">
        <div className="w-full h-full bg-slate-900/95 dark:bg-[#0c111d] rounded-[11px] flex items-center justify-center overflow-hidden backdrop-blur-md">
          {symbolSvg}
        </div>
      </div>
      <div>
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100 transition-colors">
            Vera<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-400">Credit</span>
          </span>
          <span className="text-[10px] font-mono tracking-wider px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800/40 font-semibold">
            BFSI
          </span>
        </div>
        {showTagline && (
          <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
            True Underwriting. Real Financial Clarity.
          </p>
        )}
      </div>
    </div>
  );
};
