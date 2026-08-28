'use client';

import React from 'react';
import { Radio, Compass, ShieldAlert } from 'lucide-react';

export default function RadarScanner() {
  return (
    <div className="relative w-48 h-48 sm:w-56 sm:h-56 mx-auto rounded-full bg-slate-950 border-2 border-red-500/50 overflow-hidden shadow-2xl shadow-red-950/60 flex items-center justify-center animate-float group">
      {/* Outer Ambient Glow Aura */}
      <div className="absolute inset-0 rounded-full bg-red-600/5 filter blur-md animate-pulse"></div>

      {/* Concentric Range Rings */}
      <div className="absolute w-[88%] h-[88%] rounded-full border border-dashed border-red-500/20 animate-spin-slow"></div>
      <div className="absolute w-3/4 h-3/4 rounded-full border border-red-500/25"></div>
      <div className="absolute w-1/2 h-1/2 rounded-full border border-red-500/35"></div>
      <div className="absolute w-1/4 h-1/4 rounded-full border border-red-500/45"></div>

      {/* Crosshairs Grid Lines */}
      <div className="absolute w-full h-[1px] bg-red-500/30"></div>
      <div className="absolute h-full w-[1px] bg-red-500/30"></div>
      <div className="absolute w-full h-[1px] bg-red-500/15 rotate-45"></div>
      <div className="absolute w-full h-[1px] bg-red-500/15 -rotate-45"></div>

      {/* High-Tech Rotating Radar Sweep Beam */}
      <div
        className="absolute inset-0 origin-center animate-radar-spin pointer-events-none"
        style={{
          background:
            'conic-gradient(from 0deg, rgba(239, 68, 68, 0.5) 0deg, rgba(239, 68, 68, 0.15) 30deg, transparent 75deg, transparent 360deg)'
        }}
      />

      {/* Blinking Hazard Target Pings */}
      {/* Hazard 1: Wayanad Debris Zone */}
      <div className="absolute top-9 right-11 w-3 h-3 rounded-full bg-red-500 animate-ping"></div>
      <div className="absolute top-9 right-11 w-2.5 h-2.5 rounded-full bg-red-500 shadow-lg shadow-red-500/80 border border-white/60"></div>

      {/* Hazard 2: Flood Zone */}
      <div className="absolute bottom-11 left-9 w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping"></div>
      <div className="absolute bottom-11 left-9 w-2 h-2 rounded-full bg-amber-400 shadow-lg shadow-amber-400 border border-white/60"></div>

      {/* Hazard 3: Safe Haven Green Vector */}
      <div className="absolute top-12 left-12 w-2 h-2 rounded-full bg-emerald-400 shadow-md shadow-emerald-400"></div>

      {/* Center Reticle */}
      <div className="relative z-10 w-7 h-7 rounded-full bg-gradient-to-br from-red-600 to-rose-700 border-2 border-white flex items-center justify-center text-white shadow-xl">
        <Radio className="w-3.5 h-3.5 animate-pulse" />
      </div>

      {/* Live Geospatial Tracker Status Badge */}
      <div className="absolute bottom-2.5 text-[8.5px] font-mono text-red-400 font-black bg-slate-950/90 px-2 py-0.5 rounded-full border border-red-500/40 tracking-wider shadow-sm flex items-center space-x-1">
        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span>
        <span>SAT-RADAR: 3 TRACKED</span>
      </div>
    </div>
  );
}