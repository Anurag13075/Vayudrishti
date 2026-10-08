"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import {
  School,
  CheckCircle,
  AlertTriangle,
  XCircle,
  MapPin,
  Wind,
  Thermometer,
  Droplets,
  Calendar,
  Shield,
  ArrowRight,
} from "lucide-react";
import { INDIAN_CITIES } from "@/lib/constants";
import { simulateAqi, getAqiLevel } from "@/lib/utils";

export default function SchoolsPage() {
  const [city, setCity] = useState(INDIAN_CITIES?.[0]?.key || "delhi");
  const [aqi, setAqi] = useState(168);

  useEffect(() => {
    setAqi(simulateAqi(city));
  }, [city]);

  const getSafetyStatus = () => {
    if (aqi <= 100)
      return {
        status: "SAFE",
        sub: "Permissible for Outdoor Sports",
        color: "text-emerald-700 bg-emerald-50 border-emerald-200",
        indicator: "bg-emerald-500",
        message: "Ambient particulate matter is within safe physiological limits for developing lungs.",
        action: "Normal curriculum; standard hydration breaks.",
      };
    if (aqi <= 150)
      return {
        status: "CAUTION",
        sub: "Limit High-Intensity Cardio",
        color: "text-amber-700 bg-amber-50 border-amber-200",
        indicator: "bg-amber-500",
        message: "Fine PM2.5 elevated. Asthmatic children must remain in indoor ventilated areas.",
        action: "Cap outdoor recess to 20 minutes maximum.",
      };
    return {
      status: "RESTRICTED",
      sub: "Mandate Indoor Activities",
      color: "text-rose-700 bg-rose-50 border-rose-200",
      indicator: "bg-rose-500",
      message: "Severe respiratory risk. Suspended outdoor assemblies and sports sessions across campuses.",
      action: "All activities shifted indoors with closed doors and HEPA purifiers active.",
    };
  };

  const safety = getSafetyStatus();
  const level = getAqiLevel(aqi);

  return (
    <div className="min-h-screen bg-[#fafafa] text-[#09090b] font-sans pb-24">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-10">
        {/* Header Breadcrumb & City Selector */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-8 mb-8 border-b border-neutral-200/70 gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1">
              Campus Sentinel
            </div>
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-900">
              School Safety Engine
            </h1>
            <p className="text-sm text-neutral-500 mt-1">
              Actionable protocols for principals, athletic directors, and parents based on live CPCB standards.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white border border-neutral-200 rounded-full px-3 py-1.5 shadow-2xs">
            <School className="text-neutral-500 w-4 h-4" />
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

        {/* Primary Status Banner (Clean Beside Style) */}
        <div className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 mb-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-neutral-100">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className={`w-2.5 h-2.5 rounded-full ${safety.indicator}`} />
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Daily Outdoor Protocol
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold font-mono tracking-tight text-neutral-900">
                {safety.status} — {safety.sub}
              </h2>
            </div>

            <div className="sm:text-right">
              <span className="text-xs text-neutral-400">Station AQI Ingested</span>
              <div className="text-2xl font-mono font-bold text-neutral-900">{aqi} AQI</div>
              <span className="text-[11px] text-neutral-500 uppercase">{level.label}</span>
            </div>
          </div>

          <div className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-neutral-600">
            <div>
              <span className="font-semibold text-neutral-900 block mb-1">Clinical Context:</span>
              <p className="leading-relaxed">{safety.message}</p>
            </div>
            <div>
              <span className="font-semibold text-neutral-900 block mb-1">Immediate Campus Action:</span>
              <p className="leading-relaxed">{safety.action}</p>
            </div>
          </div>
        </div>

        {/* School Action Plan Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            {
              role: "Morning Assembly",
              recommendation: aqi > 140 ? "Relocate Indoors" : "Safe Outdoors",
              note: "Conduct over public address system if AQI > 140",
              cleared: aqi <= 140,
            },
            {
              role: "Recess & Play",
              recommendation: aqi > 150 ? "Restricted Indoors" : "Standard 25 Min",
              note: "Monitor asthmatic students closely",
              cleared: aqi <= 150,
            },
            {
              role: "Athletic Training",
              recommendation: aqi > 120 ? "Cardio Suspended" : "Permitted",
              note: "Substituted with stretching & tactics",
              cleared: aqi <= 120,
            },
            {
              role: "Bus Commute",
              recommendation: aqi > 130 ? "N95 Recommended" : "Standard",
              note: "Close windows on vehicular transit",
              cleared: aqi <= 130,
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white border border-neutral-200 rounded-xl p-5 flex flex-col justify-between shadow-xs"
            >
              <div>
                <span className="text-xs font-medium text-neutral-400">{item.role}</span>
                <div className="text-base font-semibold text-neutral-900 mt-1 mb-2">{item.recommendation}</div>
                <p className="text-xs text-neutral-500 leading-relaxed">{item.note}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center gap-1.5 text-[11px]">
                <span className={`w-1.5 h-1.5 rounded-full ${item.cleared ? "bg-emerald-500" : "bg-rose-500"}`} />
                <span className="text-neutral-600 font-medium">{item.cleared ? "Compliant" : "Mandatory Directive"}</span>
              </div>
            </div>
          ))}
        </div>

        {/* 5-Day Forward Planning Schedule */}
        <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-xs">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-neutral-100">
            <h3 className="text-sm font-semibold text-neutral-900">5-Day Planning Forecast</h3>
            <span className="text-xs text-neutral-400 font-mono">CPCB Forecast Ingestion</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {[
              { day: "Mon", aqi: 154, rec: "Caution" },
              { day: "Tue", aqi: 182, rec: "Restricted" },
              { day: "Wed", aqi: 135, rec: "Caution" },
              { day: "Thu", aqi: 92, rec: "Cleared" },
              { day: "Fri", aqi: 88, rec: "Cleared" },
            ].map((d, i) => (
              <div key={i} className="p-3.5 rounded-xl border border-neutral-100 bg-neutral-50/50 text-center">
                <span className="text-xs font-semibold text-neutral-900 block">{d.day}</span>
                <div className="text-lg font-mono font-bold my-1 text-neutral-900">{d.aqi}</div>
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    d.rec === "Cleared"
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : d.rec === "Caution"
                      ? "bg-amber-50 text-amber-700 border border-amber-200"
                      : "bg-rose-50 text-rose-700 border border-rose-200"
                  }`}
                >
                  {d.rec}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
