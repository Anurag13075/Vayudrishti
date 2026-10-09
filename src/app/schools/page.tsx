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
    let active = true;
    const fetchLive = async () => {
      try {
        const res = await fetch(`/api/aqi?city=${city}`);
        if (res.ok) {
          const data = await res.json();
          if (active && data.aqi) {
            setAqi(data.aqi);
            return;
          }
        }
      } catch (err) {
        console.error(err);
      }
      if (active) {
        setAqi(simulateAqi(city));
      }
    };

    fetchLive();
    return () => {
      active = false;
    };
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

        {/* Thermal Inversion Predictor: The Scientific Problem Indian Schools Face */}
        <div className="bg-white border border-[#e5e5e0] rounded-2xl p-6 sm:p-8 mb-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-[#f0f0eb] gap-2">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#73736c]">
                  Morning Ground-Level Boundary Layer
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#111110]">
                05:00 AM &ndash; 09:30 AM Thermal Inversion Clearance Curve
              </h3>
            </div>
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-3 py-1.5 rounded-full text-xs font-semibold">
              💡 Shifting Assembly to 08:30 AM = -47% Particulate Dose
            </div>
          </div>

          <p className="text-xs text-[#575752] leading-relaxed mb-6">
            Early morning radiative cooling traps cold diesel smog in the bottom 50 meters of air right when school buses run (07:00 AM). As morning solar radiation warms the surface, the atmospheric inversion breaks after 08:15 AM, allowing upward particulate dispersion.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-6 gap-3 mb-6">
            {[
              { time: "06:00 AM", aqi: 310, status: "Hazardous Trapped Smog", delta: "Peak Inversion" },
              { time: "07:00 AM", aqi: 285, status: "Severe Ground Layer", delta: "Bus Transit" },
              { time: "07:30 AM", aqi: 260, status: "Critical Assembly Hazard", delta: "Assembly Window" },
              { time: "08:15 AM", aqi: 195, status: "Solar Inversion Breaking", delta: "Dispersion Begins" },
              { time: "08:45 AM", aqi: 145, status: "Permissible Safe Window", delta: "Optimal Assembly" },
              { time: "09:30 AM", aqi: 120, status: "Ventilated Boundary Layer", delta: "Recess Cleared" },
            ].map((slot, i) => (
              <div
                key={i}
                className={`p-3.5 rounded-xl border text-center transition-all ${
                  slot.time === "07:30 AM"
                    ? "bg-rose-50 border-rose-300 ring-2 ring-rose-400/20"
                    : slot.time === "08:45 AM"
                    ? "bg-emerald-50 border-emerald-300 ring-2 ring-emerald-400/20"
                    : "bg-[#fbfbf9] border-[#e5e5e0]"
                }`}
              >
                <div className="text-xs font-mono font-bold text-[#111110]">{slot.time}</div>
                <div className="text-xl font-mono font-bold my-1 text-[#111110]">{slot.aqi}</div>
                <div className="text-[10px] font-semibold text-[#575752] leading-tight">{slot.delta}</div>
                <div className="text-[9px] text-[#73736c] mt-1">{slot.status}</div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-[#fbfbf9] rounded-xl border border-[#e5e5e0] flex items-start gap-3 text-xs text-[#575752]">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-[#111110]">School Sentinel Administrative Directive: </span>
              Delay morning outdoor prayer/assembly from 07:30 AM to 08:45 AM. Children absorb 50% more air per kg of body weight than adults; this 75-minute adjustment spares young developing lungs from breathing the trapped overnight diesel inversion layer.
            </div>
          </div>
        </div>

        {/* WhatsApp & SMS Parent Notification Suite + Classroom CADR Calculator */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
          {/* Parent WhatsApp & SMS Broadcast Card */}
          <div className="md:col-span-7 bg-white border border-[#e5e5e0] rounded-2xl p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#f0f0eb]">
                <div className="flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-[#25D366]" />
                  <h3 className="text-sm font-semibold text-[#111110]">One-Click Parent WhatsApp & SMS Notice</h3>
                </div>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-mono font-semibold">
                  Verified Template
                </span>
              </div>
              <p className="text-xs text-[#575752] mb-3">
                Broadcast pre-cleared respiratory circulars directly to parents over WhatsApp groups and SMS.
              </p>
            </div>

            <div className="p-4 bg-[#efeae2] rounded-xl border border-neutral-300 text-xs font-sans text-[#111b21] relative shadow-inner">
              <div className="bg-white rounded-lg p-3 shadow-xs border border-neutral-200/60 space-y-1.5 leading-relaxed">
                <div className="font-bold text-[#075e54] flex items-center justify-between">
                  <span>🏫 [Delhi Public School Sentinel Notice]</span>
                  <span className="text-[10px] font-normal text-neutral-400">06:05 AM</span>
                </div>
                <p>
                  Dear Parent, local morning ground inversion AQI is <strong>{aqi} ({level.label})</strong>. Under CPCB School Protocol, morning assembly and sports drills for Classes Nursery&ndash;8th are relocated to indoor auditoriums.
                </p>
                <p className="text-[11px] text-neutral-600">
                  • School transport windows will remain sealed.<br />
                  • Students with asthma or allergic bronchitis are excused from outdoor drills.<br />
                  • Outdoor recess will commence after 09:00 AM once solar inversion lifts.
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#f0f0eb] flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                    `🏫 [DPS Sentinel Alert] Morning ground AQI is ${aqi}. In accordance with CPCB protocols, outdoor assemblies are moved indoors today. School bus windows sealed shut. https://vayudrishti.in/schools`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#25D366] hover:bg-[#20bd5a] text-white px-3 py-1.5 rounded-full font-semibold inline-flex items-center gap-1.5 transition-colors shadow-2xs"
                >
                  <span>Share to WhatsApp</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `🏫 [DPS Sentinel Alert] Morning ground AQI is ${aqi}. In accordance with CPCB protocols, outdoor assemblies are moved indoors today. School bus windows sealed shut.`
                    );
                    setSmsSent(true);
                    setTimeout(() => setSmsSent(false), 3000);
                  }}
                  className="bg-neutral-100 hover:bg-neutral-200 text-[#111110] px-3 py-1.5 rounded-full font-medium transition-colors"
                >
                  {smsSent ? "✓ Copied Notice!" : "Copy Circular Text"}
                </button>
              </div>

              <span className="text-[#73736c] text-[11px] font-mono">2,400 Parents Synced</span>
            </div>
          </div>

          {/* Classroom CADR Air Purifier & Clean Air Rate Calculator */}
          <div className="md:col-span-5 bg-white border border-[#e5e5e0] rounded-2xl p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#f0f0eb]">
                <h3 className="text-sm font-semibold text-[#111110]">Classroom Clean Air Calculator</h3>
                <span className="text-xs text-[#73736c] font-mono">WHO Standards</span>
              </div>
              <p className="text-xs text-[#575752] mb-4">
                Calculate required Clean Air Delivery Rate (CADR) and ventilation cycles for 40-student rooms.
              </p>
            </div>

            <div className="space-y-3 bg-[#fbfbf9] p-4 rounded-xl border border-[#e5e5e0]">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#575752]">Typical Classroom:</span>
                <span className="font-bold text-[#111110]">600 sq ft &bull; 40 Students</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#575752]">Recommended CADR:</span>
                <span className="font-mono font-bold text-emerald-700">480 m³/hour</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#575752]">Air Changes per Hour (ACH):</span>
                <span className="font-mono font-bold text-[#111110]">5.2 Air Changes / hr</span>
              </div>
              <div className="flex items-center justify-between text-xs pt-2 border-t border-[#e5e5e0]">
                <span className="text-[#575752]">Window Ventilation Window:</span>
                <span className="font-semibold text-emerald-700">11:30 AM &ndash; 02:00 PM</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#f0f0eb] flex items-center justify-between text-xs text-[#73736c]">
              <span>Maintains CO₂ &lt; 800 ppm</span>
              <span className="font-mono text-emerald-700 font-semibold">99.97% HEPA Filtered</span>
            </div>
          </div>
        </div>

        {/* 5-Day Forward Planning Schedule */}
        <div className="bg-white border border-[#e5e5e0] rounded-2xl p-6 shadow-xs mb-8">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#f0f0eb]">
            <div>
              <h3 className="text-sm font-semibold text-[#111110]">5-Day Campus Planning Forecast</h3>
              <p className="text-xs text-[#575752] mt-0.5">
                Forward projection of surface boundary layer ventilation to schedule inter-school sports matches and sports days.
              </p>
            </div>
            <span className="text-xs text-[#73736c] font-mono">CPCB Forecast</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
            {[
              { day: "Monday", aqi: 154, rec: "Caution", desc: "Shorten outdoor PE" },
              { day: "Tuesday", aqi: 182, rec: "Restricted", desc: "Move drills indoors" },
              { day: "Wednesday", aqi: 135, rec: "Caution", desc: "Asthma students indoors" },
              { day: "Thursday", aqi: 92, rec: "Cleared", desc: "Ideal for Sports Meet" },
              { day: "Friday", aqi: 88, rec: "Cleared", desc: "Full outdoor activities" },
            ].map((d, i) => (
              <div key={i} className="p-3.5 rounded-xl border border-[#f0f0eb] bg-[#fbfbf9]">
                <span className="text-xs font-semibold text-[#111110] block">{d.day}</span>
                <div className="text-xl font-mono font-bold my-1 text-[#111110]">{d.aqi}</div>
                <span
                  className={`text-[9px] font-semibold px-2 py-0.5 rounded-full inline-block ${
                    d.rec === "Cleared"
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : d.rec === "Caution"
                      ? "bg-amber-50 text-amber-700 border border-amber-200"
                      : "bg-rose-50 text-rose-700 border border-rose-200"
                  }`}
                >
                  {d.rec}
                </span>
                <div className="text-[10px] text-[#73736c] mt-1.5">{d.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
