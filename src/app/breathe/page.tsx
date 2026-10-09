"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import BiometricWatchSync from "@/components/BiometricWatchSync";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Activity,
  Wind,
  Shield,
  Clock,
  MapPin,
  CheckCircle,
  AlertTriangle,
  XCircle,
  ArrowRight,
  Sliders,
  Sparkles,
  ChevronRight,
  Flame,
  Info,
} from "lucide-react";
import { INDIAN_CITIES } from "@/lib/constants";
import { simulateAqi, calculateBreathScore } from "@/lib/utils";

const getBreathScoreColor = (score: number) => {
  if (score >= 80) return "#059669";
  if (score >= 60) return "#d97706";
  if (score >= 40) return "#ea580c";
  return "#dc2626";
};

const getBreathScoreLabel = (score: number) => {
  if (score >= 80) return "Optimal Condition";
  if (score >= 60) return "Moderate Reserve";
  if (score >= 40) return "Elevated Exposure";
  return "Critical Exposure";
};

const generateForecast = (aqi: number) => {
  const data = [];
  let currentAqi = aqi;
  for (let i = 0; i < 24; i++) {
    currentAqi += Math.floor(Math.random() * 21) - 10;
    if (currentAqi < 0) currentAqi = 15;
    data.push({
      time: `${(new Date().getHours() + i) % 24}:00`,
      aqi: currentAqi,
    });
  }
  return data;
};

export default function BreathePage() {
  const [city, setCity] = useState(INDIAN_CITIES?.[0]?.key || "delhi");
  const [score, setScore] = useState(0);
  const [targetScore, setTargetScore] = useState(0);
  const [forecast, setForecast] = useState<any[]>([]);

  // Interactive activity modifier
  const [selectedActivity, setSelectedActivity] = useState<"rest" | "commute" | "walk" | "cardio">("walk");
  const activityMultipliers = {
    rest: { label: "Indoor Rest", factor: 1.0, icon: "🪑" },
    commute: { label: "Vehicle Transit", factor: 1.5, icon: "🚗" },
    walk: { label: "Brisk Walk", factor: 2.2, icon: "🚶" },
    cardio: { label: "Intense Cardio / Run", factor: 4.2, icon: "🏃" },
  };

  // Mask status
  const [hasMask, setHasMask] = useState(true);
  const [liveAqi, setLiveAqi] = useState<number>(168);

  useEffect(() => {
    let active = true;
    const fetchCityData = async () => {
      try {
        const res = await fetch(`/api/aqi?city=${city}`);
        if (res.ok) {
          const data = await res.json();
          if (active && data.aqi) {
            setLiveAqi(data.aqi);
            if (data.forecast) setForecast(data.forecast);
            return;
          }
        }
      } catch (err) {
        console.error(err);
      }
      if (active) {
        const fallback = simulateAqi(city);
        setLiveAqi(fallback);
        setForecast(generateForecast(fallback));
      }
    };

    fetchCityData();
    return () => {
      active = false;
    };
  }, [city]);

  useEffect(() => {
    const multiplier = activityMultipliers[selectedActivity].factor;
    const effectiveAqi = hasMask ? liveAqi * 0.25 * multiplier : liveAqi * multiplier;
    const calculatedScore = Math.max(8, Math.min(98, Math.round(100 - effectiveAqi / 2.8)));
    setTargetScore(calculatedScore);
  }, [liveAqi, selectedActivity, hasMask]);

  useEffect(() => {
    const interval = setInterval(() => {
      setScore((prev) => {
        if (prev < targetScore) return prev + 1;
        if (prev > targetScore) return prev - 1;
        return prev;
      });
    }, 15);
    return () => clearInterval(interval);
  }, [targetScore]);

  const radius = 95;
  const strokeWidth = 14;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const scoreColor = getBreathScoreColor(score);
  const scoreLabel = getBreathScoreLabel(score);

  return (
    <div className="min-h-screen bg-[#fbfbf9] text-[#111110] font-sans pb-24">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-10">
        {/* Header Breadcrumb & Title */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-8 mb-8 border-b border-[#e5e5e0] gap-4">
          <div>
            <div className="text-xs font-mono font-semibold uppercase tracking-wider text-[#73736c] mb-1">
              BIOLOGICAL EXPOSURE ENGINE
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#111110]">
              Personal Breath Score™
            </h1>
            <p className="text-sm text-[#575752] mt-1">
              Physiological aerosol deposition tracking based on physical exertion and particulate density.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white border border-[#e2e2dc] rounded-full px-3.5 py-1.5 shadow-2xs">
            <MapPin className="text-[#73736c] w-4 h-4" />
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="bg-transparent border-none outline-none text-xs font-semibold text-[#111110] cursor-pointer pr-2"
            >
              {(INDIAN_CITIES || [{ key: "delhi", name: "Delhi" }]).map((c) => (
                <option key={c.key} value={c.key}>
                  {c.name} ({c.state})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Top Activity & Protection Selector Bar (Cal.com segmented style) */}
        <div className="bg-white border border-[#e5e5e0] rounded-2xl p-4 sm:p-5 mb-8 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 w-full md:w-auto">
            <span className="text-xs font-semibold text-[#73736c] whitespace-nowrap">Exertion Profile:</span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 w-full bg-[#f4f4f2] p-1 rounded-xl border border-[#e5e5e0]">
              {(["rest", "commute", "walk", "cardio"] as const).map((act) => (
                <button
                  key={act}
                  onClick={() => setSelectedActivity(act)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                    selectedActivity === act
                      ? "bg-white text-[#111110] shadow-xs font-semibold"
                      : "text-[#73736c] hover:text-[#111110]"
                  }`}
                >
                  <span>{activityMultipliers[act].icon}</span>
                  <span>{activityMultipliers[act].label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <span className="text-xs font-semibold text-[#73736c]">N95 Respirator:</span>
            <button
              onClick={() => setHasMask(!hasMask)}
              className={`px-4 py-1.5 text-xs font-semibold rounded-full border transition-all ${
                hasMask
                  ? "bg-[#111110] text-white border-[#111110]"
                  : "bg-white text-[#73736c] border-[#e2e2dc] hover:bg-[#f4f4f2]"
              }`}
            >
              {hasMask ? "Equipped (95% Filtration)" : "Unmasked (0% Filtration)"}
            </button>
          </div>
        </div>

        {/* Top Section: Score Circular Gauge + 4 Metric Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-10">
          {/* Circular Gauge Card with Concentric Orbit */}
          <div className="lg:col-span-5 bg-white border border-[#e5e5e0] rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-xs relative overflow-hidden">
            <div className="relative w-[230px] h-[230px] flex items-center justify-center mb-4">
              {/* Rotating outer orbit indicator */}
              <div className="absolute inset-0 rounded-full border border-dashed border-[#e2e2dc] animate-orbit pointer-events-none" />

              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 250 250">
                <circle
                  cx="125"
                  cy="125"
                  r={radius}
                  stroke="#f4f4f2"
                  strokeWidth={strokeWidth}
                  fill="none"
                />
                <motion.circle
                  cx="125"
                  cy="125"
                  r={radius}
                  stroke={scoreColor}
                  strokeWidth={strokeWidth}
                  fill="none"
                  strokeDasharray={circumference}
                  animate={{ strokeDashoffset }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-mono font-bold text-[#111110]">
                  {score}
                </span>
                <span className="text-[10px] font-mono text-[#a3a399] uppercase tracking-widest mt-1">
                  Index / 100
                </span>
              </div>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#f4f4f2] text-[#111110] border border-[#e2e2dc]">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: scoreColor }} />
              {scoreLabel}
            </div>
            <p className="text-xs text-[#73736c] mt-2 max-w-xs leading-relaxed">
              Calculated for {activityMultipliers[selectedActivity].label} in {city.toUpperCase()} with {hasMask ? "N95 mask" : "no mask"}.
            </p>
          </div>

          {/* 4 Metric Cards (Cal.com Living style) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                title: "Inhalation Rate",
                value: `${(12 * activityMultipliers[selectedActivity].factor).toFixed(0)} L/min`,
                sub: "Minute respiratory volume",
                icon: Wind,
              },
              {
                title: "Deposited Particulate",
                value: hasMask ? "8.4 µg" : `${(38.2 * activityMultipliers[selectedActivity].factor).toFixed(1)} µg`,
                sub: hasMask ? "Filtered via certified electro-spun mesh" : "Direct alveolar penetration risk",
                icon: Activity,
              },
              {
                title: "Mask Defense Efficiency",
                value: hasMask ? "95.4%" : "0.0%",
                sub: hasMask ? "N95 active seal compliant" : "Raw atmospheric intake",
                icon: Shield,
              },
              {
                title: "Safe Remaining Window",
                value: hasMask ? "4.5 hrs" : "1.2 hrs",
                sub: "Before reaching biological trigger",
                icon: Clock,
              },
            ].map((metric, idx) => (
              <div
                key={idx}
                className="bg-white border border-[#e5e5e0] rounded-2xl p-5 flex flex-col justify-between shadow-xs hover:border-[#d1d1c7] transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-[#73736c]">{metric.title}</span>
                  <div className="w-7 h-7 rounded-lg bg-[#f4f4f2] flex items-center justify-center text-[#111110]">
                    <metric.icon className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div className="my-3">
                  <div className="text-2xl font-mono font-bold text-[#111110]">{metric.value}</div>
                  <div className="text-[11px] text-[#73736c] mt-0.5">{metric.sub}</div>
                </div>
                <div className="w-full bg-[#f4f4f2] rounded-full h-1.5 overflow-hidden">
                  <div className="bg-[#111110] h-1.5 rounded-full" style={{ width: `${65 + idx * 8}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* =======================================================================
            HARDWARE BIO-TELEMETRY: SMARTWATCH LIVE HEART RATE & MINUTE VENTILATION
            ======================================================================= */}
        <div className="mb-12">
          <BiometricWatchSync currentAqi={liveAqi} cityName={city.toUpperCase()} />
        </div>

        {/* Bottom Section: 24h AreaChart & Daily Action Schedule */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Forecast Chart */}
          <div className="lg:col-span-7 bg-white border border-[#e5e5e0] rounded-2xl p-6 shadow-xs">
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#f0f0eb]">
              <div>
                <h3 className="text-sm font-semibold text-[#111110]">24-Hour Diurnal Particulate Trajectory</h3>
                <p className="text-xs text-[#73736c]">Hourly surface boundary concentration</p>
              </div>
              <span className="text-xs font-mono text-[#73736c] bg-[#f4f4f2] px-2.5 py-1 rounded-md">
                Diurnal Model
              </span>
            </div>

            <div className="h-[260px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={forecast}>
                  <defs>
                    <linearGradient id="cleanAqiGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#111110" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#111110" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="2 2" stroke="#f0f0eb" vertical={false} />
                  <XAxis dataKey="time" stroke="#a3a399" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#a3a399" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#111110",
                      border: "none",
                      borderRadius: "8px",
                      color: "#fff",
                      fontSize: "12px",
                    }}
                    itemStyle={{ color: "#fff" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="aqi"
                    stroke="#111110"
                    fill="url(#cleanAqiGrad)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Daily Schedule Timeline */}
          <div className="lg:col-span-5 bg-white border border-[#e5e5e0] rounded-2xl p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#f0f0eb]">
              <h3 className="text-sm font-semibold text-[#111110]">Recommended Day Windows</h3>
              <span className="text-xs text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded">
                Optimal at 02:00 PM
              </span>
            </div>

            <div className="space-y-3">
              {[
                { time: "06:00 AM", title: "Morning Run / Walk", status: "Restricted", note: "High surface thermal inversion", safe: false },
                { time: "09:00 AM", title: "Office Transit", status: "N95 Recommended", note: "Peak vehicular density", safe: false },
                { time: "02:00 PM", title: "Outdoor Exertion", status: "Recommended Window", note: "Solar mixing layer open", safe: true },
                { time: "07:30 PM", title: "Evening Commute", status: "Moderate", note: "Keep vehicle vents closed", safe: true },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl border border-[#f0f0eb] bg-[#fbfbf9] flex items-center justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-[#a3a399]">{item.time}</span>
                      <span className="text-xs font-semibold text-[#111110]">{item.title}</span>
                    </div>
                    <div className="text-[11px] text-[#73736c] mt-0.5">{item.note}</div>
                  </div>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      item.safe
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-amber-50 text-amber-700 border border-amber-200"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
