"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Navigation,
  MapPin,
  Clock,
  Shield,
  Activity,
  ArrowRight,
  TrendingDown,
  Wind,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  TreePine,
  Car,
  ChevronRight,
} from "lucide-react";

interface CorridorRoute {
  id: string;
  name: string;
  city: string;
  origin: string;
  destination: string;
  standard: {
    name: string;
    duration: string;
    distance: string;
    avgAqi: number;
    doseUg: number;
    corridorType: string;
    pathDescription: string;
  };
  breatheClean: {
    name: string;
    duration: string;
    distance: string;
    avgAqi: number;
    doseUg: number;
    corridorType: string;
    pathDescription: string;
  };
}

const PRESET_CORRIDORS: CorridorRoute[] = [
  {
    id: "delhi-central",
    name: "Central Delhi Commute",
    city: "Delhi NCR",
    origin: "Connaught Place (Outer Circle)",
    destination: "India Gate / Lodhi Gardens",
    standard: {
      name: "Ring Road & Janpath Arterial",
      duration: "18 mins",
      distance: "4.8 km",
      avgAqi: 248,
      doseUg: 44.6,
      corridorType: "Dense diesel vehicular congestion & bus corridors",
      pathDescription: "Passes through high-exhaust roundabouts and traffic choke points with stagnant boundary layer.",
    },
    breatheClean: {
      name: "Canopy Greenbelt & Barakhamba Greenway",
      duration: "21 mins",
      distance: "5.2 km",
      avgAqi: 76,
      doseUg: 13.6,
      corridorType: "Tree-canopied avenues & low-emission boulevards",
      pathDescription: "Follows Nehru Park & diplomat buffer zones where mature foliage filters up to 68% of street-level PM2.5.",
    },
  },
  {
    id: "mumbai-bkc",
    name: "Mumbai Commercial Transit",
    city: "Mumbai",
    origin: "Bandra West (Linking Road)",
    destination: "BKC Financial District",
    standard: {
      name: "Western Express Highway (WEH)",
      duration: "24 mins",
      distance: "6.5 km",
      avgAqi: 195,
      doseUg: 39.0,
      corridorType: "Elevated flyover & heavy commercial diesel corridor",
      pathDescription: "High-exposure corridor trapped between continuous idling taxi exhaust and construction dust.",
    },
    breatheClean: {
      name: "Coastal Breeze Coastal Link & Mithi Buffer",
      duration: "28 mins",
      distance: "7.1 km",
      avgAqi: 82,
      doseUg: 16.4,
      corridorType: "Maritime maritime wind dispersed perimeter corridor",
      pathDescription: "Harnesses sea-breeze dispersion off Mahim Bay, avoiding the trapped particulate tunnel of the highway.",
    },
  },
  {
    id: "bengaluru-tech",
    name: "Bengaluru Tech Corridor",
    city: "Bengaluru",
    origin: "Indiranagar 100ft Road",
    destination: "Koramangala 4th Block",
    standard: {
      name: "Intermediate Ring Road (Domlur Flyover)",
      duration: "22 mins",
      distance: "5.8 km",
      avgAqi: 172,
      doseUg: 31.5,
      corridorType: "Arterial bottleneck with high bus soot density",
      pathDescription: "Direct highway path with severe vehicle deceleration spikes and dense roadside micro-dust.",
    },
    breatheClean: {
      name: "Defence Green Belt & Old Airport Canopy",
      duration: "25 mins",
      distance: "6.3 km",
      avgAqi: 64,
      doseUg: 11.7,
      corridorType: "Military heritage tree cover & shaded residential lanes",
      pathDescription: "Continuous 80% natural tree cover creating an active microclimatic clean air pocket.",
    },
  },
];

export default function CleanRouteNavigator() {
  const [selectedCorridorId, setSelectedCorridorId] = useState<string>("delhi-central");
  const [activeTab, setActiveTab] = useState<"clean" | "standard">("clean");

  const currentCorridor =
    PRESET_CORRIDORS.find((c) => c.id === selectedCorridorId) || PRESET_CORRIDORS[0];

  const doseSavedUg = Number(
    (currentCorridor.standard.doseUg - currentCorridor.breatheClean.doseUg).toFixed(1)
  );
  const doseReductionPercent = Math.round(
    ((currentCorridor.standard.doseUg - currentCorridor.breatheClean.doseUg) /
      currentCorridor.standard.doseUg) *
      100
  );

  return (
    <div className="bg-white border border-[#e5e5e0] rounded-2xl shadow-[0_12px_36px_-10px_rgba(0,0,0,0.06)] overflow-hidden transition-all">
      {/* Top Header: Route Navigation System */}
      <div className="p-5 sm:p-6 border-b border-[#f0f0eb] flex flex-wrap items-center justify-between gap-4 bg-[#fbfbf9]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#111110] flex items-center justify-center text-white shadow-xs">
            <Navigation className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-bold text-[#111110]">
                BreatheClean™ Route Engine
              </h3>
              <span className="font-mono text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                AI Navigation
              </span>
            </div>
            <p className="text-xs text-[#73736c]">
              Reroutes commute away from diesel highways through natural green filter corridors
            </p>
          </div>
        </div>

        {/* Corridor Selector Dropdown */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-semibold text-[#73736c] hidden sm:inline">
            Metro Corridor:
          </label>
          <select
            value={selectedCorridorId}
            onChange={(e) => setSelectedCorridorId(e.target.value)}
            className="bg-white border border-[#e2e2dc] rounded-full px-3.5 py-1.5 text-xs font-semibold text-[#111110] shadow-2xs focus:outline-hidden"
          >
            {PRESET_CORRIDORS.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.city})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Origin -> Destination Pill Bar */}
      <div className="px-6 py-3 bg-[#f4f4f2] border-b border-[#e5e5e0] flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-[#111110] font-semibold">
          <MapPin className="w-3.5 h-3.5 text-emerald-600" />
          <span>{currentCorridor.origin}</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#73736c]" />
          <span>{currentCorridor.destination}</span>
        </div>

        <div className="flex items-center gap-2 text-emerald-800 bg-emerald-100/80 px-2.5 py-1 rounded-full font-medium">
          <TrendingDown className="w-3.5 h-3.5 text-emerald-700" />
          <span>
            Clean Route Saves: <strong>{doseSavedUg} µg PM2.5</strong> ({doseReductionPercent}% less toxic load)
          </span>
        </div>
      </div>

      {/* Main Split Layout: Route Comparison & Interactive Map Visualizer */}
      <div className="p-5 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Route Comparison Cards */}
        <div className="lg:col-span-6 space-y-4">
          {/* Card 1: BreatheClean Corridor (Recommended) */}
          <div
            onClick={() => setActiveTab("clean")}
            className={`p-5 rounded-xl border transition-all cursor-pointer ${
              activeTab === "clean"
                ? "bg-emerald-50/40 border-emerald-500 shadow-xs ring-1 ring-emerald-500"
                : "bg-white border-[#e5e5e0] hover:bg-[#fbfbf9]"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="text-xs font-mono font-bold text-emerald-800 uppercase tracking-wider">
                  RECOMMENDED &bull; BREATHECLEAN PATH
                </span>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                -{doseReductionPercent}% Inhaled Dose
              </span>
            </div>

            <h4 className="text-base font-bold text-[#111110] mb-1">
              {currentCorridor.breatheClean.name}
            </h4>
            <p className="text-xs text-[#575752] leading-relaxed mb-4">
              {currentCorridor.breatheClean.pathDescription}
            </p>

            <div className="grid grid-cols-3 gap-2 bg-white p-3 rounded-lg border border-emerald-200/60 text-center">
              <div>
                <span className="text-[10px] text-[#73736c] block">Corridor AQI</span>
                <span className="text-base font-mono font-bold text-emerald-700">
                  {currentCorridor.breatheClean.avgAqi}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-[#73736c] block">Inhaled PM2.5</span>
                <span className="text-base font-mono font-bold text-emerald-700">
                  {currentCorridor.breatheClean.doseUg} µg
                </span>
              </div>
              <div>
                <span className="text-[10px] text-[#73736c] block">Transit Time</span>
                <span className="text-base font-mono font-bold text-[#111110]">
                  {currentCorridor.breatheClean.duration}
                </span>
              </div>
            </div>
          </div>

          {/* Card 2: Standard Route (Google Maps Fastest / Toxic) */}
          <div
            onClick={() => setActiveTab("standard")}
            className={`p-5 rounded-xl border transition-all cursor-pointer ${
              activeTab === "standard"
                ? "bg-rose-50/40 border-rose-500 shadow-xs ring-1 ring-rose-500"
                : "bg-white border-[#e5e5e0] hover:bg-[#fbfbf9]"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                <span className="text-xs font-mono font-bold text-rose-800 uppercase tracking-wider">
                  STANDARD &bull; HIGHWAY FASTEST
                </span>
              </div>
              <span className="text-xs font-mono font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full">
                Toxic Exposure Risk
              </span>
            </div>

            <h4 className="text-base font-bold text-[#111110] mb-1">
              {currentCorridor.standard.name}
            </h4>
            <p className="text-xs text-[#575752] leading-relaxed mb-4">
              {currentCorridor.standard.pathDescription}
            </p>

            <div className="grid grid-cols-3 gap-2 bg-white p-3 rounded-lg border border-rose-200/60 text-center">
              <div>
                <span className="text-[10px] text-[#73736c] block">Corridor AQI</span>
                <span className="text-base font-mono font-bold text-rose-700">
                  {currentCorridor.standard.avgAqi}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-[#73736c] block">Inhaled PM2.5</span>
                <span className="text-base font-mono font-bold text-rose-700">
                  {currentCorridor.standard.doseUg} µg
                </span>
              </div>
              <div>
                <span className="text-[10px] text-[#73736c] block">Transit Time</span>
                <span className="text-base font-mono font-bold text-[#111110]">
                  {currentCorridor.standard.duration}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Visual Route Map Diagram */}
        <div className="lg:col-span-6 bg-[#fbfbf9] border border-[#e5e5e0] rounded-xl p-5 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#e5e5e0]">
              <span className="text-xs font-semibold text-[#111110]">
                Corridor Micro-Particulate Topology
              </span>
              <span className="text-[11px] font-mono text-[#73736c]">
                OpenStreetMap &bull; 60s Sensor Overlay
              </span>
            </div>

            {/* Stylized Vector Path Simulation Map */}
            <div className="relative h-60 w-full bg-[#111110] rounded-xl overflow-hidden my-3 border border-[#2e2e2b] p-4 flex flex-col justify-between">
              {/* Grid Lines */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#222220_1px,transparent_1px),linear-gradient(to_bottom,#222220_1px,transparent_1px)] bg-[size:24px_24px] opacity-30" />

              {/* Top Origin Pin */}
              <div className="relative z-10 flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-bold shadow-md">
                  A
                </div>
                <div className="bg-[#1c1c1a] border border-[#2e2e2b] px-2.5 py-1 rounded-md text-[11px] text-white font-medium">
                  {currentCorridor.origin}
                </div>
              </div>

              {/* Vector Paths SVG */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 240">
                {/* Standard Route Path (Red, direct, high AQI) */}
                <path
                  d="M 60 40 Q 180 80 320 200"
                  fill="none"
                  stroke={activeTab === "standard" ? "#ef4444" : "#7f1d1d"}
                  strokeWidth={activeTab === "standard" ? "4" : "2"}
                  strokeDasharray={activeTab === "standard" ? "none" : "4 4"}
                  className="transition-all duration-300"
                />

                {/* Clean Route Path (Green, curved around green spaces) */}
                <path
                  d="M 60 40 Q 80 160 320 200"
                  fill="none"
                  stroke={activeTab === "clean" ? "#10b981" : "#064e3b"}
                  strokeWidth={activeTab === "clean" ? "4" : "2"}
                  strokeDasharray={activeTab === "clean" ? "none" : "4 4"}
                  className="transition-all duration-300"
                />

                {/* Tree Canopy Cluster (Natural Filter Area) */}
                <circle cx="160" cy="150" r="28" fill="#059669" opacity="0.15" />
                <circle cx="180" cy="160" r="22" fill="#059669" opacity="0.2" />

                {/* Highway Diesel Smog Cluster */}
                <circle cx="210" cy="90" r="32" fill="#dc2626" opacity="0.15" />
              </svg>

              {/* Bottom Destination Pin */}
              <div className="relative z-10 flex items-center justify-end gap-2">
                <div className="bg-[#1c1c1a] border border-[#2e2e2b] px-2.5 py-1 rounded-md text-[11px] text-white font-medium">
                  {currentCorridor.destination}
                </div>
                <div className="w-6 h-6 rounded-full bg-rose-500 text-white flex items-center justify-center text-xs font-bold shadow-md">
                  B
                </div>
              </div>
            </div>

            {/* Map Legend */}
            <div className="flex items-center justify-between text-xs text-[#73736c] px-1 font-mono">
              <span className="flex items-center gap-1.5 text-emerald-700">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                Clean Green Canopy ({currentCorridor.breatheClean.avgAqi} AQI)
              </span>
              <span className="flex items-center gap-1.5 text-rose-700">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                Diesel Ring Road ({currentCorridor.standard.avgAqi} AQI)
              </span>
            </div>
          </div>

          {/* Bottom Clinical Insight */}
          <div className="p-3 bg-white rounded-xl border border-[#e5e5e0] text-xs text-[#575752] flex items-center justify-between">
            <div>
              <span className="font-bold text-[#111110]">Commute Trade-Off: </span>
              Sacrificing <strong>+3 mins</strong> saves{" "}
              <strong className="text-emerald-700">31.0 µg PM2.5</strong> from deep lung absorption.
            </div>
            <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded shrink-0">
              Biologically Optimal
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
