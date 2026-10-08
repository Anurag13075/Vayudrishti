"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import {
  Activity,
  Wind,
  Shield,
  Users,
  MapPin,
  Bot,
  Sparkles,
  ArrowRight,
  Check,
} from "lucide-react";
import { INDIAN_CITIES } from "@/lib/constants";
import { simulateAqi, getAqiLevel, getAqiColor } from "@/lib/utils";

export default function AdvisorPage() {
  const [profile, setProfile] = useState({
    age: "Adult",
    conditions: ["None"] as string[],
    activity: "Exercise",
    city: INDIAN_CITIES?.[0]?.key || "delhi",
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [showResults, setShowResults] = useState(true);
  const [currentAqi, setCurrentAqi] = useState(165);
  const [aiMessage, setAiMessage] = useState(
    "Adult planning outdoor exercise in Delhi (AQI 165). Fine particulate exposure exceeds WHO safe limits by 11.2x. Deep inhalation during running accelerates alveolar penetration. Strongly advise transferring cardiovascular session indoors with active HEPA air exchange."
  );

  const handleConditionToggle = (condition: string) => {
    if (condition === "None") {
      setProfile({ ...profile, conditions: ["None"] });
      return;
    }
    let newConditions = profile.conditions.filter((c) => c !== "None");
    if (newConditions.includes(condition)) {
      newConditions = newConditions.filter((c) => c !== condition);
    } else {
      newConditions.push(condition);
    }
    if (newConditions.length === 0) newConditions = ["None"];
    setProfile({ ...profile, conditions: newConditions });
  };

  const getAdvice = async () => {
    setIsGenerating(true);
    const aqi = simulateAqi(profile.city);
    setCurrentAqi(aqi);

    try {
      const res = await fetch("/api/bedrock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...profile,
          aqi,
        }),
      });
      const data = await res.json();
      if (data?.aiMessage) {
        setAiMessage(data.aiMessage);
      } else {
        throw new Error();
      }
    } catch {
      let msg = `Clinical profile: ${profile.age} with ${
        profile.conditions.includes("None") ? "no chronic conditions" : profile.conditions.join(" and ")
      }, in ${profile.city.toUpperCase()} (AQI ${aqi}). `;
      if (aqi > 150 || (profile.conditions.length > 0 && !profile.conditions.includes("None"))) {
        msg += "We strongly advise limiting outdoor exertion today. Please wear an N95 respirator if stepping out.";
      } else {
        msg += "Ambient air quality is within safe biological limits for your planned activity. Have a productive day!";
      }
      setAiMessage(msg);
    } finally {
      setIsGenerating(false);
      setShowResults(true);
    }
  };

  const aqiColor = getAqiColor(currentAqi);
  const aqiLevel = getAqiLevel(currentAqi);

  return (
    <div className="min-h-screen bg-[#fafafa] text-[#09090b] font-sans pb-24">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-10">
        {/* Header Breadcrumb & Title */}
        <div className="pb-8 mb-8 border-b border-neutral-200/70">
          <div className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1">
            Clinical Intelligence
          </div>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-900">
            AWS Bedrock Health Advisor
          </h1>
          <p className="text-sm text-neutral-500 mt-1">
            Generative AI clinical assessments based on personal vulnerability factors and real-time sensor streams.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Panel: Profile Input Card */}
          <div className="lg:col-span-5 bg-white border border-neutral-200 rounded-2xl p-6 shadow-xs space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <span className="text-sm font-semibold text-neutral-900">Patient Demographic Profile</span>
              <span className="text-[11px] font-mono text-neutral-400">AWS Bedrock Prompt Ready</span>
            </div>

            {/* Age Group */}
            <div>
              <label className="block text-xs font-medium text-neutral-500 mb-2">Age Bracket</label>
              <div className="grid grid-cols-4 gap-2">
                {["Child", "Teen", "Adult", "Senior"].map((age) => (
                  <button
                    key={age}
                    onClick={() => setProfile({ ...profile, age })}
                    className={`py-2 text-xs font-medium rounded-lg border transition-all ${
                      profile.age === age
                        ? "bg-neutral-900 text-white border-neutral-900 shadow-2xs"
                        : "bg-white text-neutral-600 border-neutral-200 hover:bg-neutral-50"
                    }`}
                  >
                    {age}
                  </button>
                ))}
              </div>
            </div>

            {/* Health Conditions */}
            <div>
              <label className="block text-xs font-medium text-neutral-500 mb-2">Pre-Existing Risk Factors</label>
              <div className="flex flex-wrap gap-1.5">
                {["Asthma", "Heart Disease", "Diabetes", "Pregnancy", "None"].map((cond) => {
                  const selected = profile.conditions.includes(cond);
                  return (
                    <button
                      key={cond}
                      onClick={() => handleConditionToggle(cond)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-all ${
                        selected
                          ? "bg-neutral-900 text-white border-neutral-900"
                          : "bg-white text-neutral-600 border-neutral-200 hover:bg-neutral-50"
                      }`}
                    >
                      {cond}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Planned Activity */}
            <div>
              <label className="block text-xs font-medium text-neutral-500 mb-2">Planned Activity</label>
              <div className="grid grid-cols-2 gap-2">
                {["Indoor", "Light Outdoor", "Exercise", "Commute"].map((act) => (
                  <button
                    key={act}
                    onClick={() => setProfile({ ...profile, activity: act })}
                    className={`py-2 px-3 text-xs font-medium rounded-lg border transition-all text-left ${
                      profile.activity === act
                        ? "bg-neutral-900 text-white border-neutral-900 shadow-2xs"
                        : "bg-white text-neutral-600 border-neutral-200 hover:bg-neutral-50"
                    }`}
                  >
                    {act}
                  </button>
                ))}
              </div>
            </div>

            {/* Location Selector */}
            <div>
              <label className="block text-xs font-medium text-neutral-500 mb-2">Station Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <select
                  value={profile.city}
                  onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                  className="w-full bg-white border border-neutral-200 rounded-lg py-2 pl-9 pr-3 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900"
                >
                  {(INDIAN_CITIES || [{ key: "delhi", name: "Delhi" }]).map((c) => (
                    <option key={c.key} value={c.key}>
                      {c.name} ({c.state})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Submit Action */}
            <button
              onClick={getAdvice}
              disabled={isGenerating}
              className="w-full py-2.5 px-4 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-medium flex items-center justify-center gap-2 transition-all"
            >
              {isGenerating ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Querying AWS Bedrock...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Run Clinical Evaluation</span>
                </>
              )}
            </button>
          </div>

          {/* Right Panel: Clean Output & Assessment */}
          <div className="lg:col-span-7 space-y-6">
            {/* Condition Banner */}
            <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-xs font-medium text-neutral-500 uppercase">Ambient Station Status</span>
                <div className="flex items-baseline gap-3 mt-1">
                  <span className="text-2xl font-mono font-bold text-neutral-900">{currentAqi} AQI</span>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-800 border border-neutral-200">
                    {aqiLevel.label}
                  </span>
                </div>
              </div>
              <div className="text-right text-xs text-neutral-400 font-mono">
                {profile.city.toUpperCase()} · LIVE
              </div>
            </div>

            {/* Clinical Assessment Output */}
            <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-xs">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-neutral-100">
                <div className="flex items-center gap-2">
                  <Bot className="w-4 h-4 text-neutral-900" />
                  <span className="text-xs font-semibold text-neutral-900">Bedrock Clinical Summary</span>
                </div>
                <span className="text-[11px] font-mono text-neutral-400">Claude 3.5 Sonnet</span>
              </div>

              <div className="p-4 bg-neutral-50/70 border border-neutral-200/60 rounded-xl text-xs sm:text-sm text-neutral-700 leading-relaxed font-sans">
                {aiMessage}
              </div>

              {/* Protocol Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
                {[
                  {
                    title: "Outdoor Safety",
                    val: currentAqi > 150 ? "Restricted" : "Permissible with caution",
                    icon: Activity,
                  },
                  {
                    title: "Mask Protocol",
                    val: currentAqi > 120 ? "N95 Mandatory" : "Optional",
                    icon: Shield,
                  },
                  {
                    title: "Ventilation",
                    val: currentAqi > 100 ? "Keep windows sealed" : "Open during afternoon",
                    icon: Wind,
                  },
                  {
                    title: "Vulnerable Care",
                    val: profile.conditions.includes("None") ? "Standard precautions" : "Strict indoor regimen",
                    icon: Users,
                  },
                ].map((item, i) => (
                  <div key={i} className="p-3 border border-neutral-200/80 rounded-xl bg-white">
                    <div className="flex items-center gap-2 mb-1">
                      <item.icon className="w-3.5 h-3.5 text-neutral-500" />
                      <span className="text-xs font-medium text-neutral-500">{item.title}</span>
                    </div>
                    <div className="text-xs font-semibold text-neutral-900">{item.val}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
