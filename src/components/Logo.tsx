"use client";

import React from "react";
import Link from "next/link";

interface LogoProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  showBadge?: boolean;
  badgeText?: string;
  className?: string;
  href?: string;
  variant?: "default" | "minimal" | "monochrome";
}

const sizeMap = {
  xs: { icon: 20, text: "text-xs", badge: "text-[9px]" },
  sm: { icon: 28, text: "text-sm", badge: "text-[10px]" },
  md: { icon: 34, text: "text-base", badge: "text-[11px]" },
  lg: { icon: 44, text: "text-xl", badge: "text-xs" },
  xl: { icon: 56, text: "text-2xl", badge: "text-xs" },
};

export const LogoMark = ({
  size = 32,
  className = "",
}: {
  size?: number;
  className?: string;
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 transition-transform duration-300 group-hover:scale-105 ${className}`}
    >
      <defs>
        {/* Background Gradient */}
        <linearGradient id="vayu-bg-def" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#18181b" />
          <stop offset="100%" stopColor="#09090b" />
        </linearGradient>

        {/* Emerald-Mint Atmospheric Flow Gradient */}
        <linearGradient id="vayu-emerald-def" x1="8" y1="8" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="50%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>

        {/* Cyan Air Flow Accent */}
        <linearGradient id="vayu-cyan-def" x1="40" y1="8" x2="8" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>

        {/* Glow Filter */}
        <filter id="vayu-glow-def" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Container Squircle with subtle ambient border */}
      <rect
        x="2"
        y="2"
        width="44"
        height="44"
        rx="12"
        fill="url(#vayu-bg-def)"
        stroke="#27272a"
        strokeWidth="1.5"
      />

      {/* Subtle Atmosphere Ring */}
      <circle
        cx="24"
        cy="24"
        r="16.5"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth="1"
        strokeDasharray="2 3"
      />

      {/* Atmospheric Flow Stream 1: Upper Swirl (Wind / Vayu) */}
      <path
        d="M13 21.5C13 16.25 17.25 12 22.5 12C27.75 12 32 16.25 32 21.5C32 23.5 30.5 25 28.5 25C26.5 25 25 23.5 25 21.5C25 20.1 23.9 19 22.5 19C21.1 19 20 20.1 20 21.5C20 22.9 21.1 24 22.5 24H29.5"
        stroke="url(#vayu-cyan-def)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Atmospheric Flow Stream 2: Lower Protective Eye (Vision / Drishti) */}
      <path
        d="M35 26.5C35 31.75 30.75 36 25.5 36C20.25 36 16 31.75 16 26.5C16 24.5 17.5 23 19.5 23C21.5 23 23 24.5 23 26.5C23 27.9 24.1 29 25.5 29C26.9 29 28 27.9 28 26.5C28 25.1 26.9 24 25.5 24H18.5"
        stroke="url(#vayu-emerald-def)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Central Drishti Pupil (Precision Core Optical Sensor) */}
      <circle cx="24" cy="24" r="3.2" fill="#34d399" filter="url(#vayu-glow-def)" />
      <circle cx="24" cy="24" r="1.5" fill="#ffffff" />
    </svg>
  );
};

export default function Logo({
  size = "md",
  showText = true,
  showBadge = false,
  badgeText = "AWS Tour '26",
  className = "",
  href,
}: LogoProps) {
  const config = sizeMap[size];

  const content = (
    <div className={`inline-flex items-center gap-2.5 group cursor-pointer ${className}`}>
      <LogoMark size={config.icon} />

      {showText && (
        <div className="flex items-center gap-2">
          <span
            className={`font-bold tracking-tight text-[#111110] transition-colors group-hover:text-black ${config.text}`}
          >
            Vayu<span className="font-semibold text-[#40403c]">Drishti</span>
          </span>

          {showBadge && (
            <span
              className={`hidden sm:inline-flex items-center gap-1 font-mono font-medium text-[#73736c] bg-[#f4f4f2] border border-[#e2e2dc] px-2 py-0.5 rounded-full ${config.badge}`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>{badgeText}</span>
            </span>
          )}
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex items-center focus:outline-hidden">
        {content}
      </Link>
    );
  }

  return content;
}
