"use client";
import type React from "react";
import { useEffect, useRef } from "react";
import { MeshGradient } from "@paper-design/shaders-react";

interface ShaderBackgroundProps {
  children: React.ReactNode;
  darkMode?: boolean;
}

export function ShaderBackground({ children, darkMode = false }: ShaderBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    return () => {
      // Cleanup if needed
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen w-full relative overflow-hidden"
    >
      {/* SVG Filters */}
      <svg className="absolute inset-0 w-0 h-0">
        <defs>
          <filter
            id="glass-effect"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feTurbulence
              baseFrequency="0.005"
              numOctaves="1"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="0.3"
            />
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0.02
                      0 1 0 0 0.02
                      0 0 1 0 0.05
                      0 0 0 0.9 0"
              result="tint"
            />
          </filter>
          <filter
            id="gooey-filter"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="gooey"
            />
            <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* Background Shaders - Light and Dark Mode */}
      {darkMode ? (
        <>
          {/* Dark Mode Colors - Matching website theme with #c4ad9d accent */}
          <div className="absolute inset-0 w-full h-full bg-[#1f1812]" />
          <MeshGradient
            className="absolute inset-0 w-full h-full"
            colors={["#1f1812", "#2a2218", "#c4ad9d", "#3d3228", "#2e251c"]}
            speed={0.9}
          />
          <MeshGradient
            className="absolute inset-0 w-full h-full opacity-60"
            colors={["#2a2218", "#c4ad9d", "#3d3228", "#1f1812"]}
            speed={0.7}
          />
          <MeshGradient
            className="absolute inset-0 w-full h-full opacity-40"
            colors={["#c4ad9d", "#3d3228", "#2a2218", "#2e251c"]}
            speed={0.9}
          />
        </>
      ) : (
        <>
          {/* Light Mode Colors */}
          <div className="absolute inset-0 w-full h-full bg-[#e9e6dd]" />
          <MeshGradient
            className="absolute inset-0 w-full h-full"
            colors={["#e9e6dd", "#c4ad9d", "#d4cec3", "#b8a08d", "#e0d9cc"]}
            speed={0.9}
          />
          <MeshGradient
            className="absolute inset-0 w-full h-full opacity-70"
            colors={["#c4ad9d", "#e9e6dd", "#d4cec3", "#b8a08d"]}
            speed={0.7}
          />
          <MeshGradient
            className="absolute inset-0 w-full h-full opacity-50"
            colors={["#d4cec3", "#b8a08d", "#c4ad9d", "#e9e6dd"]}
            speed={0.9}
          />
        </>
      )}

      {children}
    </div>
  );
}
