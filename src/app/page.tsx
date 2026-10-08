"use client";

import React, { useState } from "react";
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
  School,
  Clock,
  AlertTriangle,
  Bot,
  Database,
  Cloud,
  Cpu,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import { INDIAN_CITIES } from "@/lib/constants";
import { simulateAqi, getAqiLevel } from "@/lib/utils";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"map" | "breathe" | "schools" | "advisor">("map");

  const tabOptions = [
    { id: "map", label: "Live Telemetry" },
    { id: "breathe", label: "Breath Score™" },
    { id: "schools", label: "School Sentinel" },
    { id: "advisor", label: "AWS Bedrock Advisor" },
  ] as const;

  return (
    <div className="min-h-screen bg-[#fafafa] text-[#09090b] font-sans">
      <Navbar />

      {/* =========================================================================
          HERO SECTION: Editorial, Clean, High Signal
          ========================================================================= */}
      <section className="pt-16 pb-20 md:pt-24 md:pb-28 border-b border-neutral-200/70">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-xs font-medium text-neutral-600 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Track 01: Air · WeMakeDevs × AWS Environmental Hacks</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight text-neutral-900 leading-[1.08] mb-6">
              Every breath counted.
              <br />
              <span className="text-neutral-400">Actionable before it harms.</span>
            </h1>

            <p className="text-lg sm:text-xl text-neutral-600 font-normal leading-relaxed max-w-2xl mb-8">
              India's first personal respiratory defense platform. Moving beyond raw numbers into automated school safeguards, cumulative exposure scoring, and clinical AI guidance.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/map"
                className="inline-flex items-center justify-center gap-2 text-sm font-medium text-white bg-neutral-900 hover:bg-neutral-800 px-5 py-2.5 rounded-full transition-all"
              >
                <span>Launch Live Map</span>
                <ArrowRight className="w-4 h-4 text-neutral-400" />
              </Link>
              <Link
                href="/breathe"
                className="inline-flex items-center justify-center gap-2 text-sm font-medium text-neutral-800 bg-white hover:bg-neutral-50 border border-neutral-200 px-5 py-2.5 rounded-full transition-all shadow-xs"
              >
                <span>Calculate Breath Score</span>
              </Link>
            </div>
          </div>

          {/* =========================================================================
              INTERACTIVE BESIDE-STYLE APP WORKSPACE PREVIEW
              ========================================================================= */}
          <div className="mt-8">
            {/* Pill Tab Selector */}
            <div className="flex justify-center mb-6">
              <div className="inline-flex items-center p-1 bg-neutral-100/90 border border-neutral-200 rounded-full gap-1">
                {tabOptions.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                      activeTab === tab.id
                        ? "bg-white text-neutral-900 shadow-xs font-semibold"
                        : "text-neutral-600 hover:text-neutral-900"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* macOS Browser Mockup */}
            <div className="bg-white border border-neutral-200 rounded-2xl shadow-xl overflow-hidden max-w-5xl mx-auto">
              {/* Window Header */}
              <div className="h-10 border-b border-neutral-100 bg-neutral-50/70 px-4 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-neutral-300" />
                  <div className="w-2.5 h-2.5 rounded-full bg-neutral-300" />
                  <div className="w-2.5 h-2.5 rounded-full bg-neutral-300" />
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-white border border-neutral-200/80 rounded-md text-[11px] text-neutral-500 font-mono">
                  <span>app.vayudrishti.in/{activeTab}</span>
                </div>
                <div className="w-10" />
              </div>

              {/* Dynamic Mockup Body */}
              <div className="p-6 sm:p-8 min-h-[420px] bg-white">
                <AnimatePresence mode="wait">
                  {/* TAB 1: LIVE TELEMETRY PREVIEW */}
                  {activeTab === "map" && (
                    <motion.div
                      key="map"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.18 }}
                      className="grid grid-cols-1 md:grid-cols-12 gap-6"
                    >
                      <div className="md:col-span-4 space-y-3">
                        <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
                          <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Live Stations</span>
                          <span className="text-[11px] text-emerald-600 font-medium">1,024 Online</span>
                        </div>
                        {INDIAN_CITIES.slice(0, 4).map((city) => {
                          const aqi = simulateAqi(city.key);
                          const level = getAqiLevel(aqi);
                          return (
                            <div
                              key={city.key}
                              className="p-3 rounded-xl border border-neutral-100 hover:border-neutral-200 bg-neutral-50/50 flex items-center justify-between transition-colors"
                            >
                              <div>
                                <div className="text-sm font-semibold text-neutral-900">{city.name}</div>
                                <div className="text-xs text-neutral-500">{city.state}</div>
                              </div>
                              <div className="text-right">
                                <div className="text-sm font-bold font-mono" style={{ color: level.color }}>
                                  {aqi} AQI
                                </div>
                                <div className="text-[10px] text-neutral-400 uppercase font-medium">{level.label}</div>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      <div className="md:col-span-8 border border-neutral-100 rounded-xl p-5 bg-[#fafafa] flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-red-500" />
                              <span className="text-sm font-semibold text-neutral-900">Delhi NCR Hotspot Analysis</span>
                            </div>
                            <span className="text-xs font-mono text-neutral-500">CPCB Telemetry Ingested</span>
                          </div>

                          <div className="grid grid-cols-3 gap-3 mb-6">
                            <div className="p-3 bg-white border border-neutral-200/60 rounded-lg">
                              <span className="text-[11px] text-neutral-500">PM2.5 Concentration</span>
                              <div className="text-lg font-bold font-mono text-neutral-900 mt-1">148 µg/m³</div>
                            </div>
                            <div className="p-3 bg-white border border-neutral-200/60 rounded-lg">
                              <span className="text-[11px] text-neutral-500">Inversion Height</span>
                              <div className="text-lg font-bold font-mono text-neutral-900 mt-1">420 m</div>
                            </div>
                            <div className="p-3 bg-white border border-neutral-200/60 rounded-lg">
                              <span className="text-[11px] text-neutral-500">Surface Wind</span>
                              <div className="text-lg font-bold font-mono text-neutral-900 mt-1">3.2 km/h NW</div>
                            </div>
                          </div>
                        </div>

                        <div className="p-4 bg-white border border-neutral-200 rounded-xl flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
                              <Shield className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-xs font-semibold text-neutral-900">Immediate Advisory Issued</div>
                              <div className="text-xs text-neutral-500">Outdoor morning assemblies should shift indoors across 84 schools.</div>
                            </div>
                          </div>
                          <Link href="/map" className="text-xs font-medium text-neutral-900 hover:underline flex items-center gap-1">
                            Inspect Map <ChevronRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 2: BREATH SCORE PREVIEW */}
                  {activeTab === "breathe" && (
                    <motion.div
                      key="breathe"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.18 }}
                      className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
                    >
                      <div className="md:col-span-5 text-center p-6 border border-neutral-100 rounded-2xl bg-neutral-50/50">
                        <div className="inline-block p-4 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 mb-3 font-mono text-4xl font-bold">
                          78/100
                        </div>
                        <h3 className="text-base font-semibold text-neutral-900">Moderate Exposure Reserve</h3>
                        <p className="text-xs text-neutral-500 mt-1 max-w-xs mx-auto">
                          Based on 45 minutes outdoors in South Delhi. 3.2 hours of safe outdoor window remaining.
                        </p>
                      </div>

                      <div className="md:col-span-7 space-y-3">
                        <div className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2">Daily Exposure Factors</div>
                        {[
                          { label: "Particulate Inhaled Today", val: "38.4 µg", detail: "Within safe biological threshold" },
                          { label: "N95 Mask Filtration", val: "94.2% Eff.", detail: "Active filtration applied" },
                          { label: "Optimal Workout Window", val: "02:00 PM - 04:30 PM", detail: "Lowest diurnal AQI band" },
                        ].map((row, i) => (
                          <div key={i} className="p-3.5 bg-white border border-neutral-200/80 rounded-xl flex items-center justify-between">
                            <div>
                              <div className="text-xs font-medium text-neutral-900">{row.label}</div>
                              <div className="text-[11px] text-neutral-400">{row.detail}</div>
                            </div>
                            <span className="text-xs font-mono font-semibold text-neutral-700 bg-neutral-100 px-2.5 py-1 rounded-md">
                              {row.val}
                            </span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 3: SCHOOL SENTINEL */}
                  {activeTab === "schools" && (
                    <motion.div
                      key="schools"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.18 }}
                      className="space-y-4"
                    >
                      <div className="p-4 bg-amber-50/60 border border-amber-200/70 rounded-xl flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-xs">
                            !
                          </div>
                          <div>
                            <span className="text-xs font-bold text-amber-950 uppercase tracking-wide">Status: Restrict Outdoor Activities</span>
                            <div className="text-xs text-amber-800">AQI currently 164 across Central Delhi. Fine PM2.5 elevated.</div>
                          </div>
                        </div>
                        <span className="text-xs font-mono bg-white text-neutral-700 border border-amber-200 px-2.5 py-1 rounded-md">
                          Verified CPCB Rule 4
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {[
                          { title: "Morning Assembly", status: "Indoor Only", pass: false },
                          { title: "Sports Period", status: "Light Cardio", pass: true },
                          { title: "Bus Commute", status: "N95 Mandatory", pass: false },
                        ].map((item, idx) => (
                          <div key={idx} className="p-4 border border-neutral-200 rounded-xl bg-white">
                            <div className="text-xs text-neutral-500">{item.title}</div>
                            <div className="text-sm font-semibold text-neutral-900 mt-1">{item.status}</div>
                            <div className="mt-3 flex items-center gap-1.5 text-[11px]">
                              <span className={`w-2 h-2 rounded-full ${item.pass ? "bg-emerald-500" : "bg-amber-500"}`} />
                              <span className="text-neutral-500">{item.pass ? "Safe to proceed" : "Action required"}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 4: AWS BEDROCK ADVISOR */}
                  {activeTab === "advisor" && (
                    <motion.div
                      key="advisor"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.18 }}
                      className="space-y-4"
                    >
                      <div className="p-5 border border-neutral-200 rounded-xl bg-neutral-50/50">
                        <div className="flex items-center gap-2 mb-3">
                          <Bot className="w-4 h-4 text-purple-600" />
                          <span className="text-xs font-semibold text-neutral-900">AWS Bedrock · Claude 3.5 Sonnet Assessment</span>
                          <span className="text-[10px] text-neutral-400 font-mono ml-auto">Latency 340ms</span>
                        </div>
                        <p className="text-sm text-neutral-700 leading-relaxed bg-white p-4 rounded-lg border border-neutral-200/60 font-sans">
                          "Patient demographic profile: Adult with mild asthma, South Delhi (AQI 184). Inhalation risk reaches airway hyper-reactivity threshold after 25 minutes of unmasked exertion. Move morning jog indoors; maintain indoor HEPA air exchange."
                        </p>
                      </div>

                      <div className="flex items-center justify-between text-xs text-neutral-500 pt-2 border-t border-neutral-100">
                        <span>Model: anthropic.claude-3-5-sonnet-20240620-v1:0</span>
                        <Link href="/advisor" className="text-neutral-900 font-medium hover:underline flex items-center gap-1">
                          Test with your profile <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION: THE PROBLEM (Modeled directly on Beside Image 3)
          ========================================================================= */}
      <section className="py-24 border-b border-neutral-200/70">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Problem Narrative */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">The Problem</span>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-900 leading-tight">
                Three barriers stand between citizens and clean air.
              </h2>
              <p className="text-base text-neutral-600 font-normal leading-relaxed">
                Existing air quality dashboards dump confusing ppm numbers without telling people what to do. Parents don't know if school assemblies are safe, and patients don't know their cumulative toxic dose.
              </p>

              <div className="p-6 bg-white border border-neutral-200 rounded-2xl">
                <div className="text-4xl font-bold font-mono text-neutral-900 mb-1">2.18M</div>
                <div className="text-sm font-semibold text-neutral-800">Annual deaths in India from air pollution</div>
                <p className="text-xs text-neutral-500 mt-2">
                  "Average citizen in Delhi loses 5.3 years of life expectancy — the worst environmental public health crisis of our generation."
                </p>
                <div className="text-[11px] text-neutral-400 mt-2 font-mono">— The Lancet Planetary Health</div>
              </div>
            </div>

            {/* Right Column: Beside-Style Resolution Table */}
            <div className="lg:col-span-7 space-y-3">
              {[
                {
                  problem: "Knowing when school outdoor play is biologically dangerous",
                  solution: "School Sentinel Engine",
                  solved: true,
                },
                {
                  problem: "Tracking your personal respiratory dose over the week",
                  solution: "Personal Breath Score™",
                  solved: true,
                },
                {
                  problem: "Clinical health advice tailored to age, asthma, and local AQI",
                  solution: "AWS Bedrock Clinical AI",
                  solved: true,
                },
                {
                  problem: "Whistleblowing illegal stubble & industrial burns",
                  solution: "Citizen Watch & Upvoting",
                  solved: true,
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 bg-white border border-neutral-200/90 rounded-2xl flex items-center justify-between gap-4 transition-all hover:border-neutral-300"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-sm font-medium text-neutral-800">{item.problem}</span>
                  </div>
                  <span className="text-xs font-semibold text-neutral-900 bg-neutral-100 border border-neutral-200 px-3 py-1.5 rounded-full whitespace-nowrap">
                    {item.solution}
                  </span>
                </div>
              ))}

              <div className="p-5 bg-neutral-900 text-white rounded-2xl flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold">The life and health of your family</div>
                  <div className="text-xs text-neutral-400 mt-0.5">Protected with predictive, automated intelligence.</div>
                </div>
                <Link
                  href="/breathe"
                  className="text-xs font-medium bg-white text-neutral-900 px-3.5 py-1.5 rounded-full hover:bg-neutral-100 transition-colors"
                >
                  Start Protecting
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION: CLOUD ARCHITECTURE (Clean & Technical for Judges)
          ========================================================================= */}
      <section className="py-24 border-b border-neutral-200/70 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">AWS Infrastructure</span>
            <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 mt-2 mb-4">
              Engineered on modern AWS serverless primitives.
            </h2>
            <p className="text-neutral-600 text-sm leading-relaxed">
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
              <div key={i} className="p-5 border border-neutral-200 rounded-xl bg-neutral-50/50 flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-lg bg-white border border-neutral-200 flex items-center justify-center text-neutral-800 mb-4">
                    <card.icon className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-mono text-neutral-500 uppercase">{card.tag}</span>
                  <div className="text-base font-semibold text-neutral-900 mt-1 mb-2">{card.title}</div>
                  <p className="text-xs text-neutral-600 leading-relaxed">{card.desc}</p>
                </div>
                <div className="mt-6 pt-3 border-t border-neutral-200/60 flex items-center text-[11px] text-emerald-700 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2" /> Live in production
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          FOOTER: Minimalist & Crisp
          ========================================================================= */}
      <footer className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-neutral-900 flex items-center justify-center text-white">
              <Wind className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <span className="text-sm font-semibold text-neutral-900">VayuDrishti</span>
            <span className="text-xs text-neutral-400 ml-2">© 2026 WeMakeDevs × AWS Tour</span>
          </div>

          <div className="flex items-center gap-6 text-xs text-neutral-500">
            <Link href="/map" className="hover:text-neutral-900 transition-colors">Live Map</Link>
            <Link href="/breathe" className="hover:text-neutral-900 transition-colors">Breath Score</Link>
            <Link href="/advisor" className="hover:text-neutral-900 transition-colors">AI Advisor</Link>
            <Link href="/schools" className="hover:text-neutral-900 transition-colors">Schools</Link>
            <Link href="/report" className="hover:text-neutral-900 transition-colors">Report Incident</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
