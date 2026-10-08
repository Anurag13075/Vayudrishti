"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wind,
  MapPin,
  Shield,
  Activity,
  ArrowRight,
  Check,
  Search,
  Clock,
  AlertTriangle,
  Bot,
  Database,
  Cloud,
  Cpu,
  ChevronRight,
  Sparkles,
  Calendar,
  Sliders,
  Copy,
  ExternalLink,
  Bell,
  CheckCircle2,
  Share2,
} from "lucide-react";
import Navbar from "@/components/Navbar";

export default function Home() {
  // =========================================================================
  // INTERACTIVE HERO WIDGET STATE (Cal.com Booking Widget Style)
  // =========================================================================
  const [selectedDuration, setSelectedDuration] = useState<"15m" | "30m" | "45m" | "1h">("30m");
  const [selectedDate, setSelectedDate] = useState<number>(21);
  const [selectedSlot, setSelectedSlot] = useState<string>("07:30 AM");

  const doseByDuration = {
    "15m": { dose: "14.2 µg", reserve: "4.8 hrs", safe: true },
    "30m": { dose: "28.4 µg", reserve: "3.2 hrs", safe: true },
    "45m": { dose: "42.6 µg", reserve: "1.9 hrs", safe: false },
    "1h": { dose: "56.8 µg", reserve: "0.8 hrs", safe: false },
  };

  // =========================================================================
  // CARD 02 AVAILABILITY TOGGLES (Cal.com Step 2 Widget)
  // =========================================================================
  const [scheduleToggles, setScheduleToggles] = useState({
    mon: true,
    tue: false,
    wed: true,
  });

  // =========================================================================
  // CARD 03 DEFENSE TOGGLES (Cal.com Video Meet Style)
  // =========================================================================
  const [defenseToggles, setDefenseToggles] = useState({
    mask: true,
    purifier: true,
    windows: false,
  });

  // =========================================================================
  // REAL-TIME AUTO-TYPING AI SIMULATION (Wispr Flow Style)
  // =========================================================================
  const [typingIndex, setTypingIndex] = useState(0);
  const sampleText =
    "Lodhi Road sensor ingested. Surface thermal inversion trapping PM2.5 at 164 µg/m³. Automated advisory dispatched: shift morning athletic activities to indoor court.";

  useEffect(() => {
    const timer = setInterval(() => {
      setTypingIndex((prev) => (prev < sampleText.length ? prev + 1 : prev));
    }, 35);
    return () => clearInterval(timer);
  }, [sampleText.length]);

  return (
    <div className="min-h-screen bg-[#fbfbf9] text-[#111110] font-sans selection:bg-[#111110] selection:text-white">
      {/* Top Announcement Bar (Wispr Flow style) */}
      <div className="bg-[#111110] text-white text-[12px] font-medium py-2 px-4 text-center">
        <div className="max-w-6xl mx-auto flex items-center justify-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>VayuDrishti v2.0 is live on AWS — Hyperlocal sensor streaming across 1,000+ Indian stations.</span>
          <Link href="/map" className="underline font-semibold ml-1 hover:text-emerald-300 transition-colors">
            Explore live map &rarr;
          </Link>
        </div>
      </div>

      <Navbar />

      {/* =========================================================================
          HERO SECTION: Pure Cal.com / Wispr Flow Layout
          ========================================================================= */}
      <section className="pt-12 pb-20 md:pt-20 md:pb-28 border-b border-[#e5e5e0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Hero Narrative */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#e2e2dc] shadow-2xs text-xs font-medium text-[#575752]">
                <span className="font-semibold text-[#111110]">VayuDrishti v2.0</span>
                <span className="text-[#a3a399]">&bull;</span>
                <span className="text-emerald-600 font-medium">Built with AWS Cloud</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#73736c]" />
              </div>

              <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-[#111110] leading-[1.05]">
                The better way to breathe in India.
              </h1>

              <p className="text-lg sm:text-xl text-[#575752] font-normal leading-relaxed max-w-xl">
                A fully automated respiratory defense platform for individuals, school campuses taking precautions, and developers building clean-air intelligence.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Link
                  href="/map"
                  className="bg-[#111110] hover:bg-[#2b2b27] text-white text-sm font-medium px-6 py-3.5 rounded-full inline-flex items-center justify-center gap-2 shadow-xs transition-all hover:-translate-y-0.5"
                >
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  <span>Check Your Local Station</span>
                </Link>

                <Link
                  href="/breathe"
                  className="bg-white hover:bg-[#f7f7f3] text-[#111110] border border-[#e2e2dc] text-sm font-medium px-6 py-3.5 rounded-full inline-flex items-center justify-center gap-2 shadow-2xs transition-all hover:-translate-y-0.5"
                >
                  <span>Calculate Breath Score</span>
                  <ArrowRight className="w-4 h-4 text-[#73736c]" />
                </Link>
              </div>

              <div className="pt-4 flex items-center gap-3 text-xs text-[#73736c]">
                <div className="flex -space-x-1.5">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 border border-white flex items-center justify-center text-[10px] font-bold text-emerald-800">
                    D
                  </div>
                  <div className="w-6 h-6 rounded-full bg-blue-100 border border-white flex items-center justify-center text-[10px] font-bold text-blue-800">
                    M
                  </div>
                  <div className="w-6 h-6 rounded-full bg-purple-100 border border-white flex items-center justify-center text-[10px] font-bold text-purple-800">
                    B
                  </div>
                </div>
                <span>Active telemetry across Delhi NCR, Mumbai, Bengaluru & 20+ metro regions.</span>
              </div>
            </div>

            {/* Right Hero Widget: REAL LIVING INTERACTIVE CALENDAR WIDGET (Direct Cal.com Match) */}
            <div className="lg:col-span-6">
              <div className="bg-white border border-[#e5e5e0] rounded-2xl shadow-[0_20px_45px_-12px_rgba(0,0,0,0.08)] overflow-hidden transition-all">
                {/* Widget Header: Denise Wilson Style Station Avatar */}
                <div className="p-6 border-b border-[#f0f0eb] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-11 h-11 rounded-full bg-[#111110] flex items-center justify-center text-white font-bold text-sm">
                        <Wind className="w-5 h-5 text-emerald-400" />
                      </div>
                      <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white" />
                    </div>
                    <div>
                      <div className="text-xs text-[#73736c]">CPCB Station Telemetry</div>
                      <h3 className="text-base font-semibold text-[#111110]">Lodhi Road Atmospheric Station</h3>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-medium px-2.5 py-1 rounded-md bg-amber-50 text-amber-800 border border-amber-200">
                    164 AQI &bull; Live
                  </span>
                </div>

                <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6">
                  {/* Left Column of Widget: Duration Selector & Telemetry Details */}
                  <div className="md:col-span-6 space-y-5">
                    <div>
                      <label className="text-xs font-medium text-[#73736c] block mb-2">Planned Outdoor Window</label>
                      <div className="grid grid-cols-4 gap-1.5 bg-[#f4f4f2] p-1 rounded-lg border border-[#e5e5e0]">
                        {(["15m", "30m", "45m", "1h"] as const).map((d) => (
                          <button
                            key={d}
                            onClick={() => setSelectedDuration(d)}
                            className={`py-1.5 text-xs font-medium rounded-md transition-all ${
                              selectedDuration === d
                                ? "bg-white text-[#111110] shadow-xs font-semibold"
                                : "text-[#73736c] hover:text-[#111110]"
                            }`}
                          >
                            {d}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Calculated Exposure Metric (Updates in real time) */}
                    <div className="p-3.5 bg-[#fbfbf9] border border-[#e5e5e0] rounded-xl space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[#73736c]">Estimated PM2.5 Inhaled</span>
                        <span className="font-mono font-bold text-[#111110]">
                          {doseByDuration[selectedDuration].dose}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[#73736c]">Safe Reserve Left</span>
                        <span
                          className={`font-mono font-semibold ${
                            doseByDuration[selectedDuration].safe ? "text-emerald-700" : "text-amber-700"
                          }`}
                        >
                          {doseByDuration[selectedDuration].reserve}
                        </span>
                      </div>
                      <div className="w-full bg-[#e5e5e0] h-1.5 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-300 ${
                            doseByDuration[selectedDuration].safe ? "bg-emerald-600" : "bg-amber-600"
                          }`}
                          style={{
                            width:
                              selectedDuration === "15m"
                                ? "25%"
                                : selectedDuration === "30m"
                                ? "50%"
                                : selectedDuration === "45m"
                                ? "75%"
                                : "95%",
                          }}
                        />
                      </div>
                    </div>

                    <div className="text-xs text-[#73736c] space-y-1.5 pt-1">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-[#a3a399]" />
                        <span>Central Delhi &bull; Lat 28.58° N</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-[#a3a399]" />
                        <span>Selected slot: {selectedSlot}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column of Widget: Cal.com Calendar Date Grid */}
                  <div className="md:col-span-6 border-t md:border-t-0 md:border-l border-[#f0f0eb] md:pl-6 pt-4 md:pt-0">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold text-[#111110]">October 2026</span>
                      <span className="text-[11px] font-mono text-[#73736c]">UTC+5:30</span>
                    </div>

                    {/* Weekday headers */}
                    <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-medium text-[#a3a399] mb-1">
                      <span>S</span>
                      <span>M</span>
                      <span>T</span>
                      <span>W</span>
                      <span>T</span>
                      <span>F</span>
                      <span>S</span>
                    </div>

                    {/* Calendar days with clickable date state */}
                    <div className="grid grid-cols-7 gap-1 text-center text-xs">
                      {[
                        null, null, null, 1, 2, 3, 4,
                        5, 6, 7, 8, 9, 10, 11,
                        12, 13, 14, 15, 16, 17, 18,
                        19, 20, 21, 22, 23, 24, 25,
                        26, 27, 28, 29, 30, 31,
                      ].map((day, idx) => {
                        if (!day) return <div key={idx} />;
                        const isSelected = selectedDate === day;
                        return (
                          <button
                            key={idx}
                            onClick={() => setSelectedDate(day)}
                            className={`h-7 w-7 mx-auto rounded-full text-[11px] font-medium flex items-center justify-center transition-all ${
                              isSelected
                                ? "bg-[#111110] text-white font-bold"
                                : "text-[#575752] hover:bg-[#f0f0eb]"
                            }`}
                          >
                            {day}
                          </button>
                        );
                      })}
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#f0f0eb] flex items-center justify-between text-xs">
                      <span className="text-[#73736c]">Inversion Level</span>
                      <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px]">
                        Low Hazard
                      </span>
                    </div>
                  </div>
                </div>

                {/* Widget Footer CTA */}
                <div className="bg-[#fbfbf9] px-6 py-3 border-t border-[#f0f0eb] flex items-center justify-between text-xs">
                  <span className="text-[#73736c]">Automated Health Protocol</span>
                  <Link href="/breathe" className="font-semibold text-[#111110] hover:underline flex items-center gap-1">
                    Log Your Dose &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION: THE 3-STEP LIVING CARDS (Exact match to Cal.com Image 1)
          01 Connect your sensor | 02 Set your availability | 03 Choose your defense
          ========================================================================= */}
      <section className="py-24 border-b border-[#e5e5e0] bg-[#fbfbf9]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* CARD 01: CONNECT SENSOR STREAM WITH REVOLVING ORBIT */}
            <div className="cal-card p-7 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-semibold px-2 py-1 rounded bg-[#f4f4f2] text-[#73736c] inline-block mb-4">
                  01
                </span>
                <h3 className="text-xl font-bold tracking-tight text-[#111110] mb-2">
                  Connect your sensor stream
                </h3>
                <p className="text-sm text-[#575752] leading-relaxed mb-6">
                  We cross-reference 1,000+ CPCB, satellite, and community sensors so you don't breathe blind.
                </p>
              </div>

              {/* LIVING WIDGET: Central VayuDrishti pill with rotating orbit */}
              <div className="relative h-48 w-full bg-[#fafafa] rounded-xl border border-[#e5e5e0] flex items-center justify-center overflow-hidden">
                {/* Concentric orbit rings */}
                <div className="absolute w-36 h-36 rounded-full border border-dashed border-[#d1d1c7]" />
                <div className="absolute w-24 h-24 rounded-full border border-[#e5e5e0]" />

                {/* Central VayuDrishti Pill */}
                <div className="relative z-10 px-3.5 py-1.5 rounded-full bg-white border border-[#e2e2dc] shadow-sm text-xs font-semibold text-[#111110] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>VayuDrishti</span>
                </div>

                {/* Animated Orbit Container 1 (Clockwise) */}
                <div className="absolute w-36 h-36 animate-orbit pointer-events-none">
                  {/* CPCB badge revolving at top */}
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <div className="animate-counter-orbit px-2 py-0.5 bg-white border border-[#e2e2dc] rounded-full text-[10px] font-bold text-blue-700 shadow-xs">
                      CPCB
                    </div>
                  </div>
                  {/* SAFAR badge revolving at bottom */}
                  <div className="absolute -bottom-3.5 left-1/2 -translate-x-1/2">
                    <div className="animate-counter-orbit px-2 py-0.5 bg-white border border-[#e2e2dc] rounded-full text-[10px] font-bold text-amber-700 shadow-xs">
                      SAFAR
                    </div>
                  </div>
                </div>

                {/* Animated Orbit Container 2 (Counter-Clockwise) */}
                <div className="absolute w-24 h-24 animate-counter-orbit pointer-events-none">
                  <div className="absolute top-1/2 -left-3 -translate-y-1/2">
                    <div className="animate-orbit px-1.5 py-0.5 bg-white border border-[#e2e2dc] rounded-full text-[9px] font-bold text-purple-700 shadow-xs">
                      AWS
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CARD 02: SET EXPOSURE LIMITS (Cal.com Availability Toggles Style) */}
            <div className="cal-card p-7 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-semibold px-2 py-1 rounded bg-[#f4f4f2] text-[#73736c] inline-block mb-4">
                  02
                </span>
                <h3 className="text-xl font-bold tracking-tight text-[#111110] mb-2">
                  Set your exposure limits
                </h3>
                <p className="text-sm text-[#575752] leading-relaxed mb-6">
                  Want to block off hazardous morning hours? Set family exposure limits? We make that easy.
                </p>
              </div>

              {/* LIVING WIDGET: Real Interactive Toggle Rows */}
              <div className="space-y-2 bg-[#fafafa] p-3 rounded-xl border border-[#e5e5e0]">
                {[
                  { key: "mon" as const, day: "Mon", time: "6:00 am - 7:30 am", safe: true },
                  { key: "tue" as const, day: "Tue", time: "8:30 am - 10:00 am", safe: false },
                  { key: "wed" as const, day: "Wed", time: "4:30 pm - 6:00 pm", safe: true },
                ].map((row) => (
                  <div
                    key={row.key}
                    className="p-2.5 bg-white border border-[#e5e5e0] rounded-lg flex items-center justify-between shadow-2xs"
                  >
                    <div className="flex items-center gap-3">
                      {/* Toggle button */}
                      <button
                        onClick={() =>
                          setScheduleToggles((prev) => ({ ...prev, [row.key]: !prev[row.key] }))
                        }
                        className={`w-8 h-4.5 flex items-center rounded-full p-0.5 transition-colors ${
                          scheduleToggles[row.key] ? "bg-[#111110]" : "bg-[#d1d1c7]"
                        }`}
                      >
                        <div
                          className={`bg-white w-3.5 h-3.5 rounded-full shadow-md transform transition-transform ${
                            scheduleToggles[row.key] ? "translate-x-3.5" : "translate-x-0"
                          }`}
                        />
                      </button>
                      <span className="text-xs font-semibold text-[#111110]">{row.day}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono text-[#575752]">{row.time}</span>
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          scheduleToggles[row.key] ? (row.safe ? "bg-emerald-500" : "bg-amber-500") : "bg-neutral-300"
                        }`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CARD 03: CHOOSE HOW TO DEFEND (Cal.com Video Meet Style) */}
            <div className="cal-card p-7 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-semibold px-2 py-1 rounded bg-[#f4f4f2] text-[#73736c] inline-block mb-4">
                  03
                </span>
                <h3 className="text-xl font-bold tracking-tight text-[#111110] mb-2">
                  Choose how to defend
                </h3>
                <p className="text-sm text-[#575752] leading-relaxed mb-6">
                  It could be an N95 respirator, indoor HEPA filtration, or rescheduling the school athletic meet.
                </p>
              </div>

              {/* LIVING WIDGET: Meeting/Defense Control Panel */}
              <div className="bg-[#fafafa] rounded-xl border border-[#e5e5e0] p-4 flex flex-col justify-between h-48">
                <div className="flex items-center justify-between pb-2 border-b border-[#e5e5e0]">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    <span className="text-xs font-semibold text-[#111110]">Respiratory Shield</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    Active 94.2%
                  </span>
                </div>

                {/* Oscillating Living Waveform Bars (Wispr Flow style) */}
                <div className="my-auto py-2 flex items-center justify-center gap-1.5 h-12">
                  <div className="w-1.5 bg-[#111110] rounded-full animate-wave-1" />
                  <div className="w-1.5 bg-[#111110] rounded-full animate-wave-2" />
                  <div className="w-1.5 bg-emerald-600 rounded-full animate-wave-3" />
                  <div className="w-1.5 bg-[#111110] rounded-full animate-wave-4" />
                  <div className="w-1.5 bg-emerald-600 rounded-full animate-wave-5" />
                  <div className="w-1.5 bg-[#111110] rounded-full animate-wave-6" />
                  <div className="w-1.5 bg-[#111110] rounded-full animate-wave-7" />
                </div>

                {/* Action toggles */}
                <div className="flex items-center justify-around pt-2 border-t border-[#e5e5e0] text-xs">
                  <button
                    onClick={() => setDefenseToggles((p) => ({ ...p, mask: !p.mask }))}
                    className={`px-2 py-1 rounded text-[11px] font-medium transition-colors ${
                      defenseToggles.mask ? "bg-[#111110] text-white" : "bg-white text-[#73736c] border border-[#e5e5e0]"
                    }`}
                  >
                    N95 Mask
                  </button>
                  <button
                    onClick={() => setDefenseToggles((p) => ({ ...p, purifier: !p.purifier }))}
                    className={`px-2 py-1 rounded text-[11px] font-medium transition-colors ${
                      defenseToggles.purifier ? "bg-[#111110] text-white" : "bg-white text-[#73736c] border border-[#e5e5e0]"
                    }`}
                  >
                    HEPA Purifier
                  </button>
                  <button
                    onClick={() => setDefenseToggles((p) => ({ ...p, windows: !p.windows }))}
                    className={`px-2 py-1 rounded text-[11px] font-medium transition-colors ${
                      defenseToggles.windows ? "bg-[#111110] text-white" : "bg-white text-[#73736c] border border-[#e5e5e0]"
                    }`}
                  >
                    Sealed Vents
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION: WISPR FLOW INSPIRED EDITORIAL (Circular rotating SVG text path)
          "Don't choke, just breathe."
          ========================================================================= */}
      <section className="py-24 border-b border-[#e5e5e0] bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Wispr Flow style rotating text SVG badge */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center text-center">
              <div className="relative w-64 h-64 flex items-center justify-center">
                {/* Rotating Circular SVG Text */}
                <svg viewBox="0 0 200 200" className="w-full h-full animate-text-spin">
                  <path
                    id="circlePath"
                    d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
                    fill="none"
                  />
                  <text className="text-[10px] font-mono tracking-[0.22em] uppercase fill-[#73736c]">
                    <textPath href="#circlePath" startOffset="0%">
                      HYPERLOCAL AIR QUALITY INTELLIGENCE &bull; AWS BEDROCK &bull; CPCB SENSOR STREAM &bull;{" "}
                    </textPath>
                  </text>
                </svg>

                {/* Central Fingerprint / Particle Badge (Wispr Flow style) */}
                <div className="absolute w-20 h-20 rounded-full bg-[#f4f4f2] border border-[#e2e2dc] flex items-center justify-center shadow-inner">
                  <Wind className="w-8 h-8 text-[#111110] animate-pulse" />
                </div>
              </div>

              <div className="mt-4 text-xs font-mono text-[#73736c]">Continuous Ingestion Engine</div>
            </div>

            {/* Right Column: Editorial Serif & Real-time Auto-typing */}
            <div className="lg:col-span-7 space-y-5">
              <div className="text-xs font-mono font-semibold uppercase tracking-wider text-[#73736c]">
                AUTOMATED CLINICAL INTELLIGENCE
              </div>

              <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#111110]">
                Don't guess.
                <br />
                <span className="italic font-normal font-serif text-[#575752]">Know what you inhale.</span>
              </h2>

              <p className="text-base sm:text-lg text-[#575752] leading-relaxed max-w-xl">
                The first environmental companion that translates microscopic aerosol physics into everyday decisions for your family.
              </p>

              {/* Real-time typing console widget */}
              <div className="p-5 bg-[#fbfbf9] border border-[#e5e5e0] rounded-2xl shadow-2xs font-mono text-xs text-[#111110] leading-relaxed">
                <div className="flex items-center gap-2 mb-3 pb-2 border-b border-[#e5e5e0] text-[#73736c]">
                  <Bot className="w-4 h-4 text-purple-600" />
                  <span>AWS Bedrock Clinical Stream</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 ml-auto animate-ping" />
                </div>
                <p>
                  {sampleText.slice(0, typingIndex)}
                  <span className="inline-block w-1.5 h-3.5 bg-[#111110] ml-0.5 animate-pulse" />
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION: FEATURE GRID (Cal.com Image 3 & 4 4-Card Layout)
          Notice & buffers | Custom booking link | Overlay calendar | Automated reminders
          ========================================================================= */}
      <section className="py-24 border-b border-[#e5e5e0] bg-[#fbfbf9]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* GRID CARD 1: AVOID MEETING OVERLOAD (Cal.com Notice & Buffers) */}
            <div className="cal-card p-8 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-[#111110] mb-2">Avoid toxic exposure overload</h3>
                <p className="text-sm text-[#575752] leading-relaxed mb-6">
                  Only exercise when atmospheric dispersion is high. Set daily limits and add buffers around peak rush hours.
                </p>
              </div>

              {/* LIVING WIDGET: Dropdown Settings Box */}
              <div className="bg-white border border-[#e5e5e0] rounded-xl p-5 shadow-2xs space-y-3">
                <div className="text-xs font-semibold text-[#111110]">Notice & Exposure Buffers</div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs p-2 bg-[#fbfbf9] border border-[#e5e5e0] rounded-lg">
                    <span className="text-[#575752]">Minimum notice before outdoor transit</span>
                    <span className="font-semibold text-[#111110] font-mono">3 hours</span>
                  </div>

                  <div className="flex items-center justify-between text-xs p-2 bg-[#fbfbf9] border border-[#e5e5e0] rounded-lg">
                    <span className="text-[#575752]">HEPA Purifier pre-activation buffer</span>
                    <span className="font-semibold text-[#111110] font-mono">20 mins</span>
                  </div>

                  <div className="flex items-center justify-between text-xs p-2 bg-[#fbfbf9] border border-[#e5e5e0] rounded-lg">
                    <span className="text-[#575752]">Diurnal high-risk window lock</span>
                    <span className="font-semibold text-rose-700 font-mono">06:00 - 08:30 AM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* GRID CARD 2: STAND OUT WITH A CUSTOM LINK (Cal.com Booking Link Style) */}
            <div className="cal-card p-8 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-[#111110] mb-2">Stand out with a verified clean-air link</h3>
                <p className="text-sm text-[#575752] leading-relaxed mb-6">
                  Customize your campus link so it's transparent and trusted by parents. Clean, verified, unforgeable.
                </p>
              </div>

              {/* LIVING WIDGET: Custom link pill floating on card */}
              <div className="relative pt-6">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 px-4 py-1.5 rounded-full bg-[#111110] text-white text-xs font-mono font-medium shadow-md flex items-center gap-2">
                  <span>vayudrishti.in/dps-rk-puram</span>
                  <ExternalLink className="w-3 h-3 text-[#a3a399]" />
                </div>

                <div className="bg-white border border-[#e5e5e0] rounded-xl p-5 shadow-2xs space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center font-bold text-emerald-800 text-xs">
                      DPS
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-[#111110]">DPS R.K. Puram Sentinel</div>
                      <div className="text-[11px] text-emerald-700">Verified Clean Campus Protocol</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-xs pt-1 border-t border-[#f0f0eb]">
                    <span className="text-[#73736c]">Indoor Classroom Air:</span>
                    <span className="font-mono font-bold text-emerald-700">32 AQI (HEPA Active)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* GRID CARD 3: STREAMLINE YOUR BOOKERS' EXPERIENCE (Cal.com Overlay) */}
            <div className="cal-card p-8 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-[#111110] mb-2">Streamline campus & school directives</h3>
                <p className="text-sm text-[#575752] leading-relaxed mb-6">
                  Overlay live particulate curves, receive automated morning alerts, and reschedule outdoor sports with ease.
                </p>
              </div>

              {/* LIVING WIDGET: Day Schedule Overlay */}
              <div className="bg-white border border-[#e5e5e0] rounded-xl p-4 shadow-2xs">
                <div className="flex items-center justify-between text-xs pb-2 border-b border-[#e5e5e0] mb-2">
                  <span className="font-semibold text-[#111110]">Automated Morning Directive</span>
                  <span className="text-[11px] font-mono text-emerald-600">Generated 05:45 AM</span>
                </div>

                <div className="grid grid-cols-4 gap-1.5 text-center text-xs">
                  {[
                    { slot: "Assembly", safe: false, label: "Indoor" },
                    { slot: "Recess", safe: true, label: "Cleared" },
                    { slot: "Athletics", safe: false, label: "Reschedule" },
                    { slot: "Commute", safe: true, label: "N95 Bus" },
                  ].map((s, idx) => (
                    <div
                      key={idx}
                      className={`p-2 rounded-lg border ${
                        s.safe
                          ? "bg-emerald-50/70 border-emerald-200 text-emerald-800"
                          : "bg-amber-50/70 border-amber-200 text-amber-800"
                      }`}
                    >
                      <div className="text-[10px] text-[#73736c]">{s.slot}</div>
                      <div className="font-semibold text-[11px] mt-0.5">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* GRID CARD 4: REDUCE NO-SHOWS (Cal.com Toast Alert Notification Style) */}
            <div className="cal-card p-8 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-[#111110] mb-2">Reduce health emergencies with instant alerts</h3>
                <p className="text-sm text-[#575752] leading-relaxed mb-6">
                  Easily send SMS or push alerts about air spikes, and trigger immediate classroom ventilation protocols.
                </p>
              </div>

              {/* LIVING WIDGET: Sliding Toast Notification Widget */}
              <div className="bg-[#fafafa] p-4 rounded-xl border border-[#e5e5e0] flex items-center justify-center">
                <div className="bg-white border border-[#e5e5e0] rounded-xl p-3.5 shadow-md flex items-center gap-3 w-full animate-float-subtle">
                  <div className="w-8 h-8 rounded-lg bg-rose-100 flex items-center justify-center text-rose-700 shrink-0">
                    <Bell className="w-4 h-4 animate-bounce" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-semibold text-[#111110]">Spike Alert Dispatched</div>
                    <div className="text-[11px] text-[#575752]">
                      Anand Vihar surged to 284 AQI &bull; Directives sent to 42 schools
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-[#a3a399]">Just now</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION: CLOUD ARCHITECTURE (Clean & Technical for AWS Judges)
          ========================================================================= */}
      <section className="py-24 border-b border-[#e5e5e0] bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#73736c]">
              AWS CLOUD ARCHITECTURE
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#111110] mt-2 mb-3">
              Built on production AWS primitives.
            </h2>
            <p className="text-[#575752] text-sm leading-relaxed">
              Designed for high-throughput ingestion from 1,000+ national monitoring stations with sub-10ms query latency.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                title: "Amazon Bedrock",
                tag: "Generative AI",
                desc: "Runs Claude 3.5 Sonnet to translate chemical sensor outputs into clinical guidance.",
                icon: Cpu,
              },
              {
                title: "AWS Lambda",
                tag: "Serverless Compute",
                desc: "Event-driven microservices processing 1,000+ live telemetry feeds continuously.",
                icon: Activity,
              },
              {
                title: "Amazon DynamoDB",
                tag: "NoSQL Database",
                desc: "Sub-10ms time-series store for citizen reports, historical AQI, and geo-keys.",
                icon: Database,
              },
              {
                title: "AWS Amplify",
                tag: "Edge Delivery",
                desc: "Global CDN delivery with CI/CD builds deployed directly from git in 1-click.",
                icon: Cloud,
              },
            ].map((card, i) => (
              <div
                key={i}
                className="p-5 border border-[#e5e5e0] rounded-xl bg-[#fbfbf9] flex flex-col justify-between hover:border-[#d1d1c7] transition-colors"
              >
                <div>
                  <div className="w-8 h-8 rounded-lg bg-white border border-[#e2e2dc] flex items-center justify-center text-[#111110] mb-4 shadow-2xs">
                    <card.icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono text-[#73736c] uppercase">{card.tag}</span>
                  <div className="text-base font-bold text-[#111110] mt-1 mb-2">{card.title}</div>
                  <p className="text-xs text-[#575752] leading-relaxed">{card.desc}</p>
                </div>
                <div className="mt-6 pt-3 border-t border-[#e5e5e0] flex items-center text-[11px] text-emerald-700 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2" /> Live in production
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          FOOTER: Cal.com Minimalist Editorial
          ========================================================================= */}
      <footer className="py-12 bg-[#fbfbf9]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-[#111110] flex items-center justify-center text-white">
              <Wind className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <span className="text-sm font-semibold text-[#111110]">VayuDrishti</span>
            <span className="text-xs text-[#a3a399] ml-2">&copy; 2026 WeMakeDevs &times; AWS Tour</span>
          </div>

          <div className="flex items-center gap-6 text-xs text-[#575752]">
            <Link href="/map" className="hover:text-[#111110] transition-colors">
              Live Map
            </Link>
            <Link href="/breathe" className="hover:text-[#111110] transition-colors">
              Breath Score
            </Link>
            <Link href="/advisor" className="hover:text-[#111110] transition-colors">
              AI Advisor
            </Link>
            <Link href="/schools" className="hover:text-[#111110] transition-colors">
              School Sentinel
            </Link>
            <Link href="/report" className="hover:text-[#111110] transition-colors">
              Report Incident
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
