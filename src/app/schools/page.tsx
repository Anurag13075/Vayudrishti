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
  Bell,
  MessageSquare,
  Smartphone,
  ExternalLink,
} from "lucide-react";
import { INDIAN_CITIES } from "@/lib/constants";
import { simulateAqi, getAqiLevel } from "@/lib/utils";

export default function SchoolsPage() {
  const [city, setCity] = useState(INDIAN_CITIES?.[0]?.key || "delhi");
  const [aqi, setAqi] = useState(168);
  const [smsSent, setSmsSent] = useState(false);

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
    <div className="min-h-screen bg-[#fbfbf9] text-[#111110] font-sans pb-24">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-10">
        {/* Header Breadcrumb & City Selector */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-8 mb-8 border-b border-[#e5e5e0] gap-4">
          <div>
            <div className="text-xs font-mono font-semibold uppercase tracking-wider text-[#73736c] mb-1">
              CAMPUS SENTINEL
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#111110]">
              School Safety Engine
            </h1>
            <p className="text-sm text-[#575752] mt-1">
              Actionable protocols for principals, athletic directors, and parents based on live CPCB standards.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white border border-[#e2e2dc] rounded-full px-3.5 py-1.5 shadow-2xs">
            <School className="text-[#73736c] w-4 h-4" />
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

        {/* Primary Status Banner (Clean Cal.com Style) */}
        <div className="bg-white border border-[#e5e5e0] rounded-2xl p-6 sm:p-8 mb-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-[#f0f0eb]">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className={`w-2.5 h-2.5 rounded-full ${safety.indicator}`} />
                <span className="text-xs font-bold uppercase tracking-wider text-[#73736c]">
                  Daily Outdoor Protocol &bull; 05:45 AM CPCB Directive
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold font-mono tracking-tight text-[#111110]">
                {safety.status} &mdash; {safety.sub}
              </h2>
            </div>

            <div className="sm:text-right">
              <span className="text-xs text-[#a3a399]">Station AQI Ingested</span>
              <div className="text-3xl font-mono font-bold text-[#111110]">{aqi} AQI</div>
              <span className="text-[11px] text-[#73736c] uppercase font-medium">{level.label}</span>
            </div>
          </div>

          <div className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-[#575752]">
            <div>
              <span className="font-semibold text-[#111110] block mb-1">Clinical Context:</span>
              <p className="leading-relaxed">{safety.message}</p>
            </div>
            <div>
              <span className="font-semibold text-[#111110] block mb-1">Immediate Campus Action:</span>
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
              className="bg-white border border-[#e5e5e0] rounded-xl p-5 flex flex-col justify-between shadow-xs hover:border-[#d1d1c7] transition-colors"
            >
              <div>
                <span className="text-xs font-medium text-[#73736c]">{item.role}</span>
                <div className="text-base font-semibold text-[#111110] mt-1 mb-2">{item.recommendation}</div>
                <p className="text-xs text-[#575752] leading-relaxed">{item.note}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#f0f0eb] flex items-center gap-1.5 text-[11px]">
                <span className={`w-1.5 h-1.5 rounded-full ${item.cleared ? "bg-emerald-500" : "bg-rose-500"}`} />
                <span className="text-[#575752] font-medium">{item.cleared ? "Compliant" : "Mandatory Directive"}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Cal.com style Notification Card: Parent SMS Alert Simulator */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
          <div className="md:col-span-6 bg-white border border-[#e5e5e0] rounded-2xl p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Smartphone className="w-4 h-4 text-[#73736c]" />
                <h3 className="text-sm font-semibold text-[#111110]">Automated Parent SMS Broadcast</h3>
              </div>
              <p className="text-xs text-[#575752] mb-4">
                Pre-formatted SMS notification triggered to 2,400 registered parents when local AQI triggers caution threshold.
              </p>
            </div>

            <div className="p-4 bg-[#fbfbf9] border border-[#e5e5e0] rounded-xl space-y-2">
              <div className="flex items-center justify-between text-[11px] text-[#73736c] font-mono pb-1 border-b border-[#e5e5e0]">
                <span>SMS GATEWAY: VAYU-CAMPUS</span>
                <span>06:02 AM</span>
              </div>
              <p className="text-xs text-[#111110] font-sans leading-relaxed">
                "Dear Parent, local AQI at Delhi campus is {aqi} (Unhealthy). In accordance with CPCB Rule 4, all outdoor assemblies and sports have been moved indoors to HEPA-purified halls today. Please equip student with N95 mask for transit."
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-[#f0f0eb] flex items-center justify-between text-xs">
              <span className="text-[#73736c]">Twilio / AWS SNS Delivery</span>
              <button
                onClick={() => setSmsSent(true)}
                className="text-xs font-semibold text-[#111110] hover:underline"
              >
                {smsSent ? "Test Dispatch Triggered" : "Test Parent Broadcast"}
              </button>
            </div>
          </div>

          {/* 5-Day Forward Planning Schedule */}
          <div className="md:col-span-6 bg-white border border-[#e5e5e0] rounded-2xl p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#f0f0eb]">
                <h3 className="text-sm font-semibold text-[#111110]">5-Day Campus Planning Forecast</h3>
                <span className="text-xs text-[#73736c] font-mono">CPCB Forecast</span>
              </div>
              <p className="text-xs text-[#575752] mb-4">
                Forward projection of surface boundary layer ventilation to plan sports matches and athletic meets.
              </p>
            </div>

            <div className="grid grid-cols-5 gap-2 text-center">
              {[
                { day: "Mon", aqi: 154, rec: "Caution" },
                { day: "Tue", aqi: 182, rec: "Restricted" },
                { day: "Wed", aqi: 135, rec: "Caution" },
                { day: "Thu", aqi: 92, rec: "Cleared" },
                { day: "Fri", aqi: 88, rec: "Cleared" },
              ].map((d, i) => (
                <div key={i} className="p-3 rounded-xl border border-[#f0f0eb] bg-[#fbfbf9]">
                  <span className="text-xs font-semibold text-[#111110] block">{d.day}</span>
                  <div className="text-base font-mono font-bold my-1 text-[#111110]">{d.aqi}</div>
                  <span
                    className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-full inline-block ${
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

            <div className="mt-4 pt-3 border-t border-[#f0f0eb] text-right text-xs text-[#73736c]">
              Next revision: 12:00 PM
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
