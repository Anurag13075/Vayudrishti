"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
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

  useEffect(() => {
    const aqi = simulateAqi(city);
    const calculatedScore = calculateBreathScore
      ? calculateBreathScore(aqi)
      : Math.max(0, 100 - aqi / 5);
    setTargetScore(Math.round(calculatedScore));
    setForecast(generateForecast(aqi));
  }, [city]);

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

  const radius = 100;
  const strokeWidth = 14;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const scoreColor = getBreathScoreColor(score);
  const scoreLabel = getBreathScoreLabel(score);

  return (
    <div className="min-h-screen bg-[#fafafa] text-[#09090b] font-sans pb-24">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-10">
        {/* Header Breadcrumb & Title */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-8 mb-8 border-b border-neutral-200/70 gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1">
              Exposure Engine
            </div>
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-900">
              Personal Breath Score™
            </h1>
            <p className="text-sm text-neutral-500 mt-1">
              Real-time physiological dose computation based on localized atmospheric density.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white border border-neutral-200 rounded-full px-3 py-1.5 shadow-2xs">
            <MapPin className="text-neutral-500 w-4 h-4" />
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="bg-transparent border-none outline-none text-xs font-medium text-neutral-800 cursor-pointer pr-2"
            >
              {(INDIAN_CITIES || [{ key: "delhi", name: "Delhi" }]).map((c) => (
                <option key={c.key} value={c.key}>
                  {c.name} ({c.state})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Top Section: Score Circular Gauge + 4 Metric Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-10">
          {/* Circular Gauge Card */}
          <div className="lg:col-span-5 bg-white border border-neutral-200 rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-xs">
            <div className="relative w-[240px] h-[240px] flex items-center justify-center mb-4">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 260 260">
                <circle
                  cx="130"
                  cy="130"
                  r={radius}
                  stroke="#f4f4f5"
                  strokeWidth={strokeWidth}
                  fill="none"
                />
                <motion.circle
                  cx="130"
                  cy="130"
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
                <span className="text-5xl font-mono font-bold text-neutral-900">
                  {score}
                </span>
                <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest mt-1">
                  Scale / 100
                </span>
              </div>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-neutral-100 text-neutral-800 border border-neutral-200">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: scoreColor }} />
              {scoreLabel}
            </div>
            <p className="text-xs text-neutral-500 mt-2 max-w-xs">
              Based on ambient particulate levels in {city.toUpperCase()}. Safe reserve for light exertion.
            </p>
          </div>

          {/* 4 Metric Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: "Time Outdoors Today", value: "2.4 hrs", sub: "Accumulated daily exposure", icon: Clock },
              { title: "Micro-Particulates Inhaled", value: "42.8 µg", sub: "Below biological warning trigger", icon: Wind },
              { title: "N95 Mask Filtration", value: "95.4%", sub: "Efficiency against fine PM2.5", icon: Shield },
              { title: "Safe Outdoor Window Left", value: "3.8 hrs", sub: "Before respiratory strain", icon: Activity },
            ].map((metric, idx) => (
              <div
                key={idx}
                className="bg-white border border-neutral-200 rounded-2xl p-5 flex flex-col justify-between shadow-xs hover:border-neutral-300 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-neutral-500">{metric.title}</span>
                  <div className="w-7 h-7 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-700">
                    <metric.icon className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div className="my-3">
                  <div className="text-2xl font-mono font-bold text-neutral-900">{metric.value}</div>
                  <div className="text-[11px] text-neutral-400 mt-0.5">{metric.sub}</div>
                </div>
                <div className="w-full bg-neutral-100 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-neutral-900 h-1.5 rounded-full" style={{ width: `${60 + idx * 10}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section: 24h AreaChart & Daily Action Schedule */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Forecast Chart */}
          <div className="lg:col-span-7 bg-white border border-neutral-200 rounded-2xl p-6 shadow-xs">
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-neutral-100">
              <div>
                <h3 className="text-sm font-semibold text-neutral-900">24-Hour Predictive Curve</h3>
                <p className="text-xs text-neutral-500">Hourly particulate variance model</p>
              </div>
              <span className="text-xs font-mono text-neutral-500 bg-neutral-100 px-2.5 py-1 rounded-md">
                Diurnal Model
              </span>
            </div>

            <div className="h-[260px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={forecast}>
                  <defs>
                    <linearGradient id="cleanAqiGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#18181b" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#18181b" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="2 2" stroke="#f4f4f5" vertical={false} />
                  <XAxis dataKey="time" stroke="#a1a1aa" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#a1a1aa" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#09090b",
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
                    stroke="#18181b"
                    fill="url(#cleanAqiGrad)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Daily Schedule Timeline */}
          <div className="lg:col-span-5 bg-white border border-neutral-200 rounded-2xl p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-neutral-100">
              <h3 className="text-sm font-semibold text-neutral-900">Recommended Day Windows</h3>
              <span className="text-xs text-emerald-600 font-medium">Optimal Window at 02:00 PM</span>
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
                  className="p-3 rounded-xl border border-neutral-100 bg-neutral-50/50 flex items-center justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-neutral-400">{item.time}</span>
                      <span className="text-xs font-semibold text-neutral-900">{item.title}</span>
                    </div>
                    <div className="text-[11px] text-neutral-500 mt-0.5">{item.note}</div>
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
