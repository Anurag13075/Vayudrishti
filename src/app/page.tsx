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
  ChevronDown,
  Sparkles,
  Calendar,
  Sliders,
  Copy,
  ExternalLink,
  Bell,
  CheckCircle2,
  Share2,
  Building,
  Layers,
  Terminal,
  Zap,
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
  // CARD 02 AVAILABILITY TOGGLES (Cal.com Step 2 Widget - User Liked This)
  // =========================================================================
  const [scheduleToggles, setScheduleToggles] = useState({
    mon: true,
    tue: false,
    wed: true,
  });

  // =========================================================================
  // CARD 03 DEFENSE TOGGLES (Cal.com Video Meet Style - User Liked This)
  // =========================================================================
  const [defenseToggles, setDefenseToggles] = useState({
    mask: true,
    purifier: true,
    windows: false,
  });

  // =========================================================================
  // INTERACTIVE DIURNAL HOUR SCRUBBER
  // =========================================================================
  const [scrubberHour, setScrubberHour] = useState<number>(14); // 2:00 PM default
  const hourData = {
    6: { aqi: 215, label: "Morning Inversion Peak", status: "Restricted", note: "Dense boundary layer traps vehicular smoke" },
    9: { aqi: 184, label: "Rush Hour Surge", status: "N95 Required", note: "Peak diesel exhaust concentrations" },
    14: { aqi: 92, label: "Solar Dispersion Window", status: "Optimal Window", note: "Maximum boundary mixing layer; best time for outdoor tasks" },
    18: { aqi: 178, label: "Evening Commute Surge", status: "Caution", note: "Cooling air traps street-level particulate" },
    22: { aqi: 240, label: "Night Biomass Settling", status: "Hazardous", note: "Surface cooling creates severe ground haze" },
  };
  const currentScrubberInfo =
    hourData[scrubberHour as keyof typeof hourData] || {
      aqi: 145,
      label: "Standard Diurnal Variance",
      status: "Moderate",
      note: "Maintain standard outdoor vigilance",
    };

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

  // =========================================================================
  // INTERACTIVE WORKFLOW AUTOMATION ENGINE STATE (Cal.com Workflows Style)
  // =========================================================================
  const [workflowTab, setWorkflowTab] = useState<"school" | "patient" | "hvac">("school");
  const [workflowThreshold, setWorkflowThreshold] = useState<number>(140);
  const [isSimulatingDispatch, setIsSimulatingDispatch] = useState<boolean>(false);
  const [dispatchConfirmed, setDispatchConfirmed] = useState<boolean>(false);

  const handleSimulateDispatch = () => {
    setIsSimulatingDispatch(true);
    setTimeout(() => {
      setIsSimulatingDispatch(false);
      setDispatchConfirmed(true);
      setTimeout(() => setDispatchConfirmed(false), 3500);
    }, 600);
  };

  const workflowPresets = {
    school: {
      title: "School Morning Assembly & Recess Protocol",
      trigger: "Cron: Every Morning at 05:45 AM IST",
      condition: "Lodhi Road CPCB Inversion Sensor AQI > Threshold",
      primaryAction: "Dispatch emergency SMS to 2,400 parents via Amazon SNS",
      secondaryAction: "Lock outdoor sports grounds; route assembly to auditorium",
      tertiaryAction: "Spin up classroom HEPA filtration bank (99.97% CADR)",
      institutions: "48 Campuses Active",
      lastFired: "Today at 05:45 AM (Threshold Breached at 168 AQI)",
    },
    patient: {
      title: "Chronic Asthmatic & Elderly Personal Sentinel",
      trigger: "EventBridge: Hyperlocal PM2.5 Micro-Spike (>120 µg/m³)",
      condition: "Patient Profile: Severe Bronchial Hyperreactivity",
      primaryAction: "Push high-priority alert: Inhale prophylactic bronchodilator",
      secondaryAction: "Suggest rescheduling commute to 02:00 PM clean window",
      tertiaryAction: "Log particulate dose into AWS DynamoDB Health Ledger",
      institutions: "1,420 Patients Guarded",
      lastFired: "Yesterday at 08:15 AM (Pre-emptive alert delivered)",
    },
    hvac: {
      title: "Enterprise Commercial Building Damper Lockout",
      trigger: "Continuous 60s Telemetry Ingest from 1,024 Stations",
      condition: "Boundary Layer Mixing Depth < 250m & Ambient PM2.5 > Threshold",
      primaryAction: "Send BACnet / Modbus command to close fresh-air intake dampers",
      secondaryAction: "Recirculate 100% conditioned air through MERV-13 pre-filters",
      tertiaryAction: "Generate hourly compliance report in Amazon S3 bucket",
      institutions: "16 Commercial Towers",
      lastFired: "06:00 AM - 08:30 AM (Inversion window auto-sealed)",
    },
  };

  // =========================================================================
  // INTERACTIVE BIOMETRIC EXPOSURE ENGINE (Wispr Flow Bio-Mechanics Style)
  // =========================================================================
  const [bioActivity, setBioActivity] = useState<"rest" | "walk" | "run" | "cycle">("walk");
  const [bioMask, setBioMask] = useState<"none" | "cloth" | "surgical" | "n95">("n95");
  const [bioMinutes, setBioMinutes] = useState<number>(30);

  // Ventilation rates in liters per minute (clinical pulmonology standards)
  const ventilationRates = {
    rest: 6,
    walk: 18,
    run: 42,
    cycle: 55,
  };

  // Filtration efficiency percentages
  const maskEfficiencies = {
    none: 0,
    cloth: 0.20,
    surgical: 0.50,
    n95: 0.95,
  };

  const totalVolumeLiters = ventilationRates[bioActivity] * bioMinutes;
  const totalVolumeM3 = totalVolumeLiters / 1000;
  const unshieldedDoseUg = totalVolumeM3 * 168;
  const filterEff = maskEfficiencies[bioMask];
  const depositedDoseUg = unshieldedDoseUg * (1 - filterEff);
  const dosePreventedUg = unshieldedDoseUg - depositedDoseUg;
  const dosePercentSaved = Math.round(filterEff * 100);

  // =========================================================================
  // FAQ ACCORDION STATE
  // =========================================================================
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "How does VayuDrishti differ from standard government AQI websites?",
      a: "Government portals report historical 24-hour rolling averages as a single aggregate number. VayuDrishti ingests raw micro-sensor streams every 60 seconds, correlates with boundary-layer thermal inversion models, and converts raw numbers into immediate personal action protocols (e.g. safe outdoor hour windows and school assembly closures).",
    },
    {
      q: "How does the Personal Breath Score™ quantify exposure?",
      a: "The Breath Score evaluates localized PM2.5 concentration, physical exertion rate (respiratory volume per minute), mask filtration efficiency (N95 vs unmasked), and time outdoors. It functions like a biometric calorie tracker for particulate matter, giving you an exact daily safe reserve.",
    },
    {
      q: "Where does AWS fit into the architecture?",
      a: "Amazon Bedrock runs Claude 3.5 Sonnet to translate chemical sensor outputs into clinical guidance tailored to individual conditions (asthma, pregnancy, age). AWS Lambda and API Gateway ingest streams from 1,000+ national stations without server overhead, while DynamoDB stores time-series incidents with sub-10ms latency.",
    },
    {
      q: "Can school principals automate morning assembly decisions?",
      a: "Yes. Campus administrators receive an automated morning directive at 05:45 AM evaluating surface thermal inversion and particulate concentrations. If AQI exceeds 140, the system triggers SMS alerts to staff to move assemblies and athletic training indoors.",
    },
    {
      q: "How are crowdsourced community reports verified?",
      a: "When a citizen reports stubble burning, construction dust, or illegal garbage incineration, the incident is geotagged and cross-referenced against nearby satellite thermal anomaly feeds (MODIS/VIIRS) and nearby station spikes before escalating to municipal feeds.",
    },
  ];

  // Moving Stack Items (Matches Image 3)
  const stackItems = [
    "Amazon Bedrock",
    "AWS Lambda",
    "Amazon DynamoDB",
    "AWS Step Functions",
    "Amazon EventBridge",
    "Amazon CloudWatch",
    "AWS Amplify",
    "Amazon S3",
    "Amazon SNS",
    "Amazon CloudFront",
    "Amazon ECS",
    "Amazon Route 53",
  ];

  return (
    <div className="min-h-screen bg-[#fbfbf9] text-[#111110] font-sans selection:bg-[#111110] selection:text-white">
      {/* Top Status Ribbon (Matches Beacon in Image 3) */}
      <div className="bg-[#111110] text-[#f4f4f2] text-xs border-b border-[#2b2b27] py-2 px-4">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3 font-mono text-[11px]">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              LIVE TELEMETRY
            </span>
            <span className="text-[#73736c] hidden sm:inline">&bull;</span>
            <span className="text-[#a3a399] hidden sm:inline">ap-south-1 &bull; 1,024 CPCB Stations Ingesting</span>
          </div>

          <div className="flex items-center gap-4 text-[#a3a399]">
            <span>AWS Bedrock Claude 3.5 Sonnet</span>
            <span className="text-white bg-[#27272a] px-2 py-0.5 rounded text-[10px]">v2.4.0</span>
          </div>
        </div>
      </div>

      <Navbar />

      {/* =========================================================================
          MOVING TECH STACK MARQUEE RIBBON (Top of Landing Page - Beacon Style)
          Infinite horizontal moving animation of the AWS build stack
          ========================================================================= */}
      <div className="bg-[#111110] text-white py-2.5 border-b border-[#2b2b27] overflow-hidden">
        <div className="flex items-center">
          {/* Fixed "BUILT ON" Badge on Left */}
          <div className="px-4 py-0.5 bg-[#111110] z-10 shrink-0 border-r border-[#2b2b27] flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-mono tracking-widest uppercase text-emerald-400 font-bold">
              BUILT ON AWS
            </span>
          </div>

          {/* Infinite Scrolling Track */}
          <div className="overflow-hidden whitespace-nowrap flex flex-1">
            <div className="animate-marquee flex items-center gap-10 font-mono text-xs text-[#d1d1c7] tracking-wider uppercase font-medium">
              {[...stackItems, ...stackItems, ...stackItems].map((item, idx) => (
                <span key={idx} className="flex items-center gap-4 hover:text-white transition-colors cursor-default">
                  <span>{item}</span>
                  <span className="text-[#575752] font-normal">&bull;</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          HERO SECTION: Pure Cal.com / Wispr Flow Layout
          ========================================================================= */}
      <section className="pt-12 pb-16 md:pt-16 md:pb-20 border-b border-[#e5e5e0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Hero Narrative */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#e2e2dc] shadow-2xs text-xs font-medium text-[#575752]">
                <span className="font-semibold text-[#111110]">VayuDrishti v2.0</span>
                <span className="text-[#a3a399]">&bull;</span>
                <span className="text-emerald-700 font-medium">Track 01: Air</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#73736c]" />
              </div>

              <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-[#111110] leading-[1.04]">
                The better way to <br />
                <span className="font-serif italic font-normal text-[#40403c]">breathe in India.</span>
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

              <div className="pt-2 flex items-center gap-3 text-xs text-[#73736c]">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Zero guesswork. Automated school closures, cumulative dose scoring & clinical AI guidance.</span>
              </div>
            </div>

            {/* Right Hero Widget: REAL LIVING INTERACTIVE CALENDAR WIDGET */}
            <div className="lg:col-span-6">
              <div className="bg-white border border-[#e5e5e0] rounded-2xl shadow-[0_20px_45px_-12px_rgba(0,0,0,0.08)] overflow-hidden transition-all">
                {/* Widget Header: Station Avatar */}
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

                    {/* Calculated Exposure Metric */}
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

                    <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-medium text-[#a3a399] mb-1">
                      <span>S</span>
                      <span>M</span>
                      <span>T</span>
                      <span>W</span>
                      <span>T</span>
                      <span>F</span>
                      <span>S</span>
                    </div>

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
          SECTION: THE 3-STEP LIVING CARDS (Exact match to Cal.com Image 1 / Image 2)
          01 Connect your sensor | 02 Set your availability | 03 Choose your defense
          ========================================================================= */}
      <section className="py-24 border-b border-[#e5e5e0] bg-[#fbfbf9]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-xl mb-14">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#73736c]">
              CORE WORKFLOW
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#111110] mt-2 mb-3">
              How VayuDrishti protects you.
            </h2>
            <p className="text-[#575752] text-sm leading-relaxed">
              Three synchronized steps turning atmospheric data into biological immunity.
            </p>
          </div>

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
                <div className="absolute w-36 h-36 rounded-full border border-dashed border-[#d1d1c7]" />
                <div className="absolute w-24 h-24 rounded-full border border-[#e5e5e0]" />

                {/* Central Pill */}
                <div className="relative z-10 px-3.5 py-1.5 rounded-full bg-white border border-[#e2e2dc] shadow-sm text-xs font-semibold text-[#111110] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>VayuDrishti</span>
                </div>

                {/* Orbit 1 */}
                <div className="absolute w-36 h-36 animate-orbit pointer-events-none">
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <div className="animate-counter-orbit px-2 py-0.5 bg-white border border-[#e2e2dc] rounded-full text-[10px] font-bold text-blue-700 shadow-xs">
                      CPCB
                    </div>
                  </div>
                  <div className="absolute -bottom-3.5 left-1/2 -translate-x-1/2">
                    <div className="animate-counter-orbit px-2 py-0.5 bg-white border border-[#e2e2dc] rounded-full text-[10px] font-bold text-amber-700 shadow-xs">
                      SAFAR
                    </div>
                  </div>
                </div>

                {/* Orbit 2 */}
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
          SECTION: INTERACTIVE DIURNAL HOUR SCRUBBER (Live Time Scrub Tool)
          ========================================================================= */}
      <section className="py-24 border-b border-[#e5e5e0] bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#73736c]">
              ATMOSPHERIC INVERSION SIMULATOR
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#111110] mt-2 mb-3">
              See how the day shifts.
            </h2>
            <p className="text-[#575752] text-sm leading-relaxed">
              Drag the diurnal timeline below to inspect real-time boundary layer dynamics across Delhi NCR.
            </p>
          </div>

          <div className="bg-[#fbfbf9] border border-[#e5e5e0] rounded-2xl p-6 sm:p-8 shadow-xs">
            {/* Hour Selector Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-6 border-b border-[#e5e5e0]">
              {[
                { hour: 6, label: "06:00 AM" },
                { hour: 9, label: "09:00 AM" },
                { hour: 14, label: "02:00 PM" },
                { hour: 18, label: "06:00 PM" },
                { hour: 22, label: "10:00 PM" },
              ].map((item) => (
                <button
                  key={item.hour}
                  onClick={() => setScrubberHour(item.hour)}
                  className={`px-4 py-2 text-xs font-semibold rounded-full border transition-all ${
                    scrubberHour === item.hour
                      ? "bg-[#111110] text-white border-[#111110] shadow-xs"
                      : "bg-white text-[#575752] border-[#e2e2dc] hover:bg-[#f4f4f2]"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Dynamic Results Card */}
            <div className="pt-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-4 text-center md:text-left">
                <span className="text-xs font-mono text-[#73736c] uppercase">Predicted Station Value</span>
                <div className="text-6xl font-mono font-bold text-[#111110] my-2">
                  {currentScrubberInfo.aqi}{" "}
                  <span className="text-sm font-sans font-medium text-[#73736c]">AQI</span>
                </div>
                <span
                  className={`inline-block text-xs font-semibold px-3 py-1 rounded-full border ${
                    currentScrubberInfo.aqi <= 100
                      ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                      : currentScrubberInfo.aqi <= 180
                      ? "bg-amber-50 text-amber-800 border-amber-200"
                      : "bg-rose-50 text-rose-800 border-rose-200"
                  }`}
                >
                  {currentScrubberInfo.status}
                </span>
              </div>

              <div className="md:col-span-8 p-5 bg-white border border-[#e5e5e0] rounded-xl space-y-3">
                <div className="text-xs font-semibold text-[#111110] flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-600" />
                  <span>{currentScrubberInfo.label}</span>
                </div>
                <p className="text-xs sm:text-sm text-[#575752] leading-relaxed">
                  {currentScrubberInfo.note}
                </p>
                <div className="pt-2 flex items-center justify-between text-xs text-[#73736c] border-t border-[#f0f0eb]">
                  <span>Lodhi Road Telemetry Prediction</span>
                  <Link href="/map" className="font-semibold text-[#111110] hover:underline flex items-center gap-1">
                    Inspect on Map &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION: WISPR FLOW INSPIRED EDITORIAL (Circular rotating SVG text path)
          "Don't guess. Know what you inhale."
          ========================================================================= */}
      <section className="py-24 border-b border-[#e5e5e0] bg-[#fbfbf9] overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Wispr Flow style rotating text SVG badge */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center text-center">
              <div className="relative w-64 h-64 flex items-center justify-center">
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

                <div className="absolute w-20 h-20 rounded-full bg-white border border-[#e2e2dc] flex items-center justify-center shadow-inner">
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
                <span className="font-serif italic font-normal text-[#575752]">Know what you inhale.</span>
              </h2>

              <p className="text-base sm:text-lg text-[#575752] leading-relaxed max-w-xl">
                The first environmental companion that translates microscopic aerosol physics into everyday decisions for your family.
              </p>

              {/* Real-time typing console widget */}
              <div className="p-5 bg-white border border-[#e5e5e0] rounded-2xl shadow-2xs font-mono text-xs text-[#111110] leading-relaxed">
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
          SECTION: CAL.COM WORKFLOWS ENGINE (Atmospheric Automation Platform)
          Replaces generic 4-box feature grid with Cal.com Workflows builder
          ========================================================================= */}
      <section className="py-24 border-b border-[#e5e5e0] bg-[#fbfbf9]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-14">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#73736c]">
              AUTOMATED WORKFLOWS
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#111110] mt-2 mb-3">
              Automate every atmospheric protocol.
            </h2>
            <p className="text-[#575752] text-sm sm:text-base leading-relaxed">
              Connect raw CPCB sensor streams directly to parent SMS alerts, campus air dampers, and clinical warnings without human delay.
            </p>
          </div>

          {/* Workflow Workbench Container */}
          <div className="bg-white border border-[#e5e5e0] rounded-2xl shadow-sm overflow-hidden">
            {/* Top Workflow Tab Selector (Cal.com pill style) */}
            <div className="p-4 sm:p-5 bg-[#fafafa] border-b border-[#e5e5e0] flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                {[
                  { id: "school" as const, label: "School Morning Assembly", icon: "🏫" },
                  { id: "patient" as const, label: "Asthmatic Sentinel", icon: "🫁" },
                  { id: "hvac" as const, label: "Enterprise HVAC Damper", icon: "🏢" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setWorkflowTab(tab.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 transition-all ${
                      workflowTab === tab.id
                        ? "bg-[#111110] text-white shadow-xs"
                        : "bg-white text-[#575752] border border-[#e5e5e0] hover:bg-[#f0f0eb]"
                    }`}
                  >
                    <span>{tab.icon}</span>
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 text-[11px] font-mono text-[#73736c]">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>AWS Step Functions Engine Active</span>
              </div>
            </div>

            {/* Workflow Canvas */}
            <div className="p-6 sm:p-8 space-y-8">
              {/* Pipeline Nodes Flow */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                {/* NODE 1: TRIGGER */}
                <div className="lg:col-span-4 p-5 rounded-xl bg-[#fbfbf9] border border-[#e5e5e0] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#73736c] bg-white px-2 py-0.5 rounded border border-[#e5e5e0]">
                      STEP 01 &bull; TRIGGER
                    </span>
                    <Clock className="w-3.5 h-3.5 text-[#73736c]" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#111110]">
                      {workflowPresets[workflowTab].trigger}
                    </div>
                    <div className="text-xs text-[#575752] mt-1">
                      Continuous telemetry stream via AWS EventBridge
                    </div>
                  </div>
                  <div className="pt-2 border-t border-[#e5e5e0] flex items-center justify-between text-[11px] font-mono text-[#73736c]">
                    <span>Current Sensor:</span>
                    <span className="font-bold text-[#111110]">Lodhi Rd (168 AQI)</span>
                  </div>
                </div>

                {/* ARROW 1 */}
                <div className="hidden lg:flex lg:col-span-1 items-center justify-center text-[#a3a399]">
                  <ArrowRight className="w-5 h-5" />
                </div>

                {/* NODE 2: LOGIC THRESHOLD GATE */}
                <div className="lg:col-span-7 p-5 rounded-xl bg-[#fbfbf9] border border-[#e5e5e0] space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#73736c] bg-white px-2 py-0.5 rounded border border-[#e5e5e0]">
                      STEP 02 &bull; LOGIC RULE
                    </span>
                    <Sliders className="w-3.5 h-3.5 text-[#73736c]" />
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="font-semibold text-[#111110]">AQI Dispatch Threshold</span>
                      <span className="font-mono font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                        &gt; {workflowThreshold} AQI
                      </span>
                    </div>

                    <input
                      type="range"
                      min={100}
                      max={220}
                      step={5}
                      value={workflowThreshold}
                      onChange={(e) => setWorkflowThreshold(Number(e.target.value))}
                      className="w-full accent-[#111110] cursor-pointer"
                    />

                    <div className="flex items-center justify-between text-[10px] font-mono text-[#73736c] mt-1">
                      <span>100 AQI (Sensitive)</span>
                      <span>160 AQI (Moderate)</span>
                      <span>220 AQI (Hazardous)</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-[#e5e5e0]">
                    <span className="text-xs text-[#575752]">Rule Evaluation:</span>
                    <span
                      className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${
                        168 >= workflowThreshold
                          ? "bg-rose-50 text-rose-800 border-rose-200"
                          : "bg-emerald-50 text-emerald-800 border-emerald-200"
                      }`}
                    >
                      {168 >= workflowThreshold
                        ? "🚨 THRESHOLD BREACHED (ACTION ACTIVE)"
                        : "✅ WITHIN TOLERANCE (STANDBY)"}
                    </span>
                  </div>
                </div>
              </div>

              {/* NODE 3: DISPATCHED ACTIONS GRID */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#73736c]">
                    STEP 03 &bull; DISPATCHED ACTIONS (PARALLEL EXECUTION)
                  </span>

                  <button
                    onClick={handleSimulateDispatch}
                    disabled={isSimulatingDispatch}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#111110] hover:bg-[#2b2b27] text-white text-xs font-medium transition-all shadow-xs"
                  >
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    <span>{isSimulatingDispatch ? "Simulating..." : "Test Dispatch Rule"}</span>
                  </button>
                </div>

                {/* Dispatch Toast Confirmation */}
                <AnimatePresence>
                  {dispatchConfirmed && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>
                          <strong>AWS Step Functions Executed:</strong> Dispatched 2,400 emergency SMS via Amazon SNS in 24ms (Region: ap-south-1).
                        </span>
                      </div>
                      <span className="font-mono text-[10px] text-emerald-700">HTTP 200 OK</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Action 1 */}
                  <div className="p-4 rounded-xl bg-white border border-[#e5e5e0] shadow-2xs space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#111110]">
                      <Bell className="w-3.5 h-3.5 text-blue-600" />
                      <span>{workflowPresets[workflowTab].primaryAction}</span>
                    </div>
                    <p className="text-xs text-[#575752] leading-relaxed">
                      Instant multi-carrier SMS gateway broadcast with sub-second delivery confirmation.
                    </p>
                    <div className="pt-2 flex items-center justify-between text-[10px] font-mono text-[#73736c] border-t border-[#f0f0eb]">
                      <span>Service:</span>
                      <span className="font-semibold text-[#111110]">Amazon SNS</span>
                    </div>
                  </div>

                  {/* Action 2 */}
                  <div className="p-4 rounded-xl bg-white border border-[#e5e5e0] shadow-2xs space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#111110]">
                      <Shield className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{workflowPresets[workflowTab].secondaryAction}</span>
                    </div>
                    <p className="text-xs text-[#575752] leading-relaxed">
                      Automated campus calendar reallocation & physical gate access notification.
                    </p>
                    <div className="pt-2 flex items-center justify-between text-[10px] font-mono text-[#73736c] border-t border-[#f0f0eb]">
                      <span>Latency:</span>
                      <span className="font-semibold text-emerald-700">&lt; 15ms</span>
                    </div>
                  </div>

                  {/* Action 3 */}
                  <div className="p-4 rounded-xl bg-white border border-[#e5e5e0] shadow-2xs space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#111110]">
                      <Wind className="w-3.5 h-3.5 text-purple-600" />
                      <span>{workflowPresets[workflowTab].tertiaryAction}</span>
                    </div>
                    <p className="text-xs text-[#575752] leading-relaxed">
                      Building automation protocol triggering high-CADR HEPA pre-activation.
                    </p>
                    <div className="pt-2 flex items-center justify-between text-[10px] font-mono text-[#73736c] border-t border-[#f0f0eb]">
                      <span>Audit Trail:</span>
                      <span className="font-semibold text-[#111110]">Amazon S3</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Workbench Footer */}
            <div className="px-6 py-4 bg-[#fbfbf9] border-t border-[#e5e5e0] flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-[#575752]">
                <Building className="w-3.5 h-3.5 text-[#73736c]" />
                <span>{workflowPresets[workflowTab].institutions} &bull; {workflowPresets[workflowTab].lastFired}</span>
              </div>

              <Link
                href="/schools"
                className="font-semibold text-[#111110] hover:underline flex items-center gap-1"
              >
                <span>Deploy to Your Campus</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#73736c]" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION: WISPR FLOW BIOMETRIC PULMONARY DEPOSITION ENGINE
          High-craft bio-mechanic simulator replacing the black code terminal
          ========================================================================= */}
      <section className="py-24 border-b border-[#e5e5e0] bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-14">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#73736c]">
              BIOMETRIC PULMONARY DEPOSITION
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#111110] mt-2 mb-3">
              Your lungs aren't an air filter.
            </h2>
            <p className="text-[#575752] text-sm sm:text-base leading-relaxed">
              Raw AQI tells you what is in the ambient sky. VayuDrishti calculates the microscopic particulate mass deposited into your bronchial alveoli based on your physiological minute ventilation and mask barrier.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* LEFT COLUMN: INTERACTIVE BIOMETRIC CONTROLS */}
            <div className="lg:col-span-5 bg-[#fbfbf9] border border-[#e5e5e0] rounded-2xl p-6 sm:p-7 space-y-6 flex flex-col justify-between">
              <div className="space-y-6">
                {/* Parameter 1: Activity Exertion */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-2.5">
                    <span className="font-semibold text-[#111110]">Physical Exertion Level</span>
                    <span className="font-mono text-[#73736c]">
                      {ventilationRates[bioActivity]} L/min ventilation
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: "rest" as const, label: "Resting", rate: "6 L/min" },
                      { id: "walk" as const, label: "Brisk Walk", rate: "18 L/min" },
                      { id: "run" as const, label: "Cardio Run", rate: "42 L/min" },
                      { id: "cycle" as const, label: "Fast Cycling", rate: "55 L/min" },
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setBioActivity(item.id)}
                        className={`p-2.5 rounded-xl text-left border transition-all ${
                          bioActivity === item.id
                            ? "bg-[#111110] text-white border-[#111110] shadow-xs"
                            : "bg-white text-[#575752] border-[#e2e2dc] hover:bg-[#f4f4f2]"
                        }`}
                      >
                        <div className="text-xs font-bold">{item.label}</div>
                        <div className={`text-[10px] font-mono ${bioActivity === item.id ? "text-[#a3a399]" : "text-[#73736c]"}`}>
                          {item.rate}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Parameter 2: Respiratory Barrier */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-2.5">
                    <span className="font-semibold text-[#111110]">Respiratory Protection</span>
                    <span className="font-mono text-emerald-700 font-bold">
                      {Math.round(maskEfficiencies[bioMask] * 100)}% filtration
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: "none" as const, label: "Unshielded", eff: "0% Filter" },
                      { id: "cloth" as const, label: "Cloth Mask", eff: "20% Filter" },
                      { id: "surgical" as const, label: "Surgical Mask", eff: "50% Filter" },
                      { id: "n95" as const, label: "N95 Respirator", eff: "95% Filter" },
                    ].map((m) => (
                      <button
                        key={m.id}
                        onClick={() => setBioMask(m.id)}
                        className={`p-2.5 rounded-xl text-left border transition-all ${
                          bioMask === m.id
                            ? "bg-[#111110] text-white border-[#111110] shadow-xs"
                            : "bg-white text-[#575752] border-[#e2e2dc] hover:bg-[#f4f4f2]"
                        }`}
                      >
                        <div className="text-xs font-bold">{m.label}</div>
                        <div className={`text-[10px] font-mono ${bioMask === m.id ? "text-emerald-400" : "text-[#73736c]"}`}>
                          {m.eff}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Parameter 3: Exposure Duration */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-2.5">
                    <span className="font-semibold text-[#111110]">Exposure Duration</span>
                    <span className="font-mono text-[#73736c]">{bioMinutes} minutes</span>
                  </div>

                  <div className="grid grid-cols-4 gap-2">
                    {[15, 30, 45, 60].map((mins) => (
                      <button
                        key={mins}
                        onClick={() => setBioMinutes(mins)}
                        className={`py-2 text-xs font-semibold rounded-lg border transition-all ${
                          bioMinutes === mins
                            ? "bg-[#111110] text-white border-[#111110]"
                            : "bg-white text-[#575752] border-[#e2e2dc] hover:bg-[#f4f4f2]"
                        }`}
                      >
                        {mins}m
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Volume summary badge */}
              <div className="pt-4 border-t border-[#e5e5e0] flex items-center justify-between text-xs text-[#73736c]">
                <span>Tidal Ventilation Volume:</span>
                <span className="font-mono font-bold text-[#111110]">
                  {totalVolumeLiters} Liters ({totalVolumeM3.toFixed(2)} m³)
                </span>
              </div>
            </div>

            {/* RIGHT COLUMN: HIGH-PRECISION DEPOSITION READOUT & PARTICLE INTERCEPTOR */}
            <div className="lg:col-span-7 bg-[#fbfbf9] border border-[#e5e5e0] rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
              {/* Big Metric Card */}
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[#73736c]">
                  ESTIMATED ALVEOLAR PARTICULATE DEPOSITION
                </span>

                <div className="mt-3 flex flex-wrap items-baseline gap-4">
                  <span className="text-6xl sm:text-7xl font-mono font-bold text-[#111110] tracking-tight">
                    {depositedDoseUg.toFixed(1)}
                  </span>
                  <div>
                    <span className="text-xl font-mono font-bold text-[#111110]">µg PM2.5</span>
                    <span className="block text-xs text-[#73736c]">
                      deposited in deep lung tissue (ambient: 168 µg/m³)
                    </span>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-white border border-[#e5e5e0] rounded-xl flex items-center justify-between text-xs">
                  <span className="text-[#575752]">Without Barrier:</span>
                  <span className="font-mono line-through text-[#a3a399] font-medium">
                    {unshieldedDoseUg.toFixed(1)} µg PM2.5
                  </span>
                  <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    -{dosePreventedUg.toFixed(1)} µg blocked
                  </span>
                </div>
              </div>

              {/* Filtration Efficiency Progress Bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#111110]">Particulate Interception Rate</span>
                  <span className="font-mono font-bold text-emerald-700">{dosePercentSaved}%</span>
                </div>

                <div className="w-full h-3 bg-[#e5e5e0] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-600 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${dosePercentSaved}%` }}
                  />
                </div>
              </div>

              {/* LIVING PARTICLE DEFLECTION VISUALIZER */}
              <div className="relative h-28 bg-white border border-[#e5e5e0] rounded-xl p-3 overflow-hidden flex items-center justify-between">
                <div className="text-xs space-y-1 z-10">
                  <div className="font-semibold text-[#111110] flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Electrostatic Fiber Mesh Simulation</span>
                  </div>
                  <div className="text-[11px] text-[#73736c]">
                    {bioMask === "n95"
                      ? "Melt-blown polypropylene fibers trapping 0.3µm aerosol particles"
                      : bioMask === "none"
                      ? "Zero barrier — direct mucosal and capillary penetration"
                      : "Partial inertial impaction on woven fabric threads"}
                  </div>
                </div>

                {/* Animated Particles SVG */}
                <div className="w-40 h-full relative shrink-0">
                  {/* Central filter barrier line */}
                  <div
                    className={`absolute top-0 bottom-0 left-1/2 w-1 -translate-x-1/2 ${
                      bioMask === "n95"
                        ? "bg-emerald-500"
                        : bioMask === "none"
                        ? "bg-transparent border-r border-dashed border-[#d1d1c7]"
                        : "bg-amber-400"
                    }`}
                  />

                  {/* Flowing simulated particle dots */}
                  <div className="absolute inset-0 flex items-center justify-around pointer-events-none">
                    <div className="w-2 h-2 rounded-full bg-rose-500 animate-ping opacity-60" />
                    <div className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-pulse" />
                    <div
                      className={`w-2 h-2 rounded-full transition-colors ${
                        bioMask === "n95" ? "bg-emerald-500" : "bg-rose-500"
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* AWS Bedrock Clinical Guidance Box */}
              <div className="p-4 bg-white border border-[#e5e5e0] rounded-xl text-xs space-y-1.5">
                <div className="flex items-center gap-2 font-mono text-[11px] text-[#73736c]">
                  <Bot className="w-3.5 h-3.5 text-purple-600" />
                  <span className="font-bold text-[#111110]">AWS Bedrock Clinical Evaluation</span>
                  <span className="text-emerald-700 font-semibold ml-auto">Claude 3.5 Sonnet</span>
                </div>
                <p className="text-[#575752] leading-relaxed">
                  {bioMask === "n95"
                    ? `Optimal airway defense. With 95% particulate filtration, your deposited dose (${depositedDoseUg.toFixed(1)} µg) remains safely under the 25 µg/day inflammation threshold, making this ${bioActivity} session clinically safe.`
                    : bioMask === "none"
                    ? `Critical exposure alert: Without protection during ${bioActivity}, you will inhale ${unshieldedDoseUg.toFixed(1)} µg of toxic particulate. We strongly recommend equipping an N95 respirator or postponing activity.`
                    : `Moderate filtration: Your barrier blocks ${dosePercentSaved}% of aerosols, but ${depositedDoseUg.toFixed(1)} µg still enters pulmonary circulation. Consider upgrading to an N95 respirator for rigorous cardio.`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION: INTERACTIVE FAQ ACCORDION
          ========================================================================= */}
      <section className="py-24 border-b border-[#e5e5e0] bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#73736c]">
              QUESTIONS & ARCHITECTURE
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#111110] mt-2 mb-3">
              Frequently asked questions.
            </h2>
          </div>

          <div className="divide-y divide-[#e5e5e0]">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="py-5">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between text-left text-base font-semibold text-[#111110] hover:text-[#575752] transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#73736c] transform transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <p className="pt-3 text-sm text-[#575752] leading-relaxed">{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          FINAL CALL TO ACTION
          ========================================================================= */}
      <section className="py-24 bg-[#111110] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-400">
            START PROTECTING TODAY
          </span>

          <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
            Ready to take control of what you breathe?
          </h2>

          <p className="text-base sm:text-lg text-[#a3a399] max-w-xl mx-auto">
            Free, open telemetry connecting 1.4 billion citizens with real-time respiratory intelligence.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/map"
              className="bg-white hover:bg-[#f4f4f2] text-[#111110] font-semibold text-sm px-6 py-3.5 rounded-full inline-flex items-center gap-2 transition-all hover:scale-105"
            >
              <span>Explore Live Telemetry Map</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/breathe"
              className="bg-[#27272a] hover:bg-[#3f3f46] text-white font-medium text-sm px-6 py-3.5 rounded-full border border-[#3f3f46] inline-flex items-center gap-2 transition-all"
            >
              <span>Check Your Breath Score</span>
            </Link>
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
