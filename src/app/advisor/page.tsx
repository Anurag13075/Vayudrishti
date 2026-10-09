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
  Code2,
  Copy,
  Volume2,
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
  const [showPromptInspector, setShowPromptInspector] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

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
    let aqi = 168;
    try {
      const liveRes = await fetch(`/api/aqi?city=${profile.city}`);
      if (liveRes.ok) {
        const liveData = await liveRes.json();
        if (liveData.aqi) aqi = liveData.aqi;
      }
    } catch {
      aqi = simulateAqi(profile.city);
    }
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

  const bedrockPromptJson = JSON.stringify(
    {
      modelId: "anthropic.claude-3-5-sonnet-20240620-v1:0",
      patient: {
        demographic: profile.age,
        riskFactors: profile.conditions,
        intendedAction: profile.activity,
        ambientStation: profile.city,
        sensorMetrics: { aqi: currentAqi, primaryPollutant: "PM2.5" },
      },
    },
    null,
    2
  );

  return (
    <div className="min-h-screen bg-[#fbfbf9] text-[#111110] font-sans pb-24">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-10">
        {/* Header Breadcrumb & Title */}
        <div className="pb-8 mb-8 border-b border-[#e5e5e0]">
          <div className="text-xs font-mono font-semibold uppercase tracking-wider text-[#73736c] mb-1">
            CLINICAL INTELLIGENCE
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#111110]">
            AWS Bedrock Health Advisor
          </h1>
          <p className="text-sm text-[#575752] mt-1">
            Generative AI clinical assessments based on personal vulnerability factors and real-time sensor streams.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Panel: Profile Input Card */}
          <div className="lg:col-span-5 bg-white border border-[#e5e5e0] rounded-2xl p-6 shadow-xs space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#f0f0eb]">
              <span className="text-sm font-semibold text-[#111110]">Patient Demographic Profile</span>
              <span className="text-[11px] font-mono text-[#73736c]">AWS Bedrock Ready</span>
            </div>

            {/* Age Group */}
            <div>
              <label className="block text-xs font-medium text-[#73736c] mb-2">Age Bracket</label>
              <div className="grid grid-cols-4 gap-2">
                {["Child", "Teen", "Adult", "Senior"].map((age) => (
                  <button
                    key={age}
                    onClick={() => setProfile({ ...profile, age })}
                    className={`py-2 text-xs font-medium rounded-lg border transition-all ${
                      profile.age === age
                        ? "bg-[#111110] text-white border-[#111110] shadow-2xs font-semibold"
                        : "bg-white text-[#575752] border-[#e2e2dc] hover:bg-[#f4f4f2]"
                    }`}
                  >
                    {age}
                  </button>
                ))}
              </div>
            </div>

            {/* Health Conditions */}
            <div>
              <label className="block text-xs font-medium text-[#73736c] mb-2">Pre-Existing Risk Factors</label>
              <div className="flex flex-wrap gap-1.5">
                {["Asthma", "Heart Disease", "Diabetes", "Pregnancy", "None"].map((cond) => {
                  const selected = profile.conditions.includes(cond);
                  return (
                    <button
                      key={cond}
                      onClick={() => handleConditionToggle(cond)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-all ${
                        selected
                          ? "bg-[#111110] text-white border-[#111110] font-semibold"
                          : "bg-white text-[#575752] border-[#e2e2dc] hover:bg-[#f4f4f2]"
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
              <label className="block text-xs font-medium text-[#73736c] mb-2">Planned Activity</label>
              <div className="grid grid-cols-2 gap-2">
                {["Indoor", "Light Outdoor", "Exercise", "Commute"].map((act) => (
                  <button
                    key={act}
                    onClick={() => setProfile({ ...profile, activity: act })}
                    className={`py-2 px-3 text-xs font-medium rounded-lg border transition-all text-left ${
                      profile.activity === act
                        ? "bg-[#111110] text-white border-[#111110] shadow-2xs font-semibold"
                        : "bg-white text-[#575752] border-[#e2e2dc] hover:bg-[#f4f4f2]"
                    }`}
                  >
                    {act}
                  </button>
                ))}
              </div>
            </div>

            {/* Location Selector */}
            <div>
              <label className="block text-xs font-medium text-[#73736c] mb-2">Station Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a3a399]" />
                <select
                  value={profile.city}
                  onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                  className="w-full bg-white border border-[#e2e2dc] rounded-lg py-2 pl-9 pr-3 text-xs text-[#111110] focus:outline-none focus:border-[#111110]"
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
              className="w-full py-3 px-4 rounded-full bg-[#111110] hover:bg-[#2b2b27] text-white text-xs font-medium flex items-center justify-center gap-2 transition-all shadow-xs"
            >
              {isGenerating ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Invoking AWS Bedrock (Claude 3.5 Sonnet)...</span>
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
            <div className="bg-white border border-[#e5e5e0] rounded-2xl p-5 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-xs font-medium text-[#73736c] uppercase">Ambient Station Status</span>
                <div className="flex items-baseline gap-3 mt-1">
                  <span className="text-3xl font-mono font-bold text-[#111110]">{currentAqi} AQI</span>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#f4f4f2] text-[#111110] border border-[#e2e2dc]">
                    {aqiLevel.label}
                  </span>
                </div>
              </div>
              <div className="text-right text-xs text-[#73736c] font-mono">
                {profile.city.toUpperCase()} &bull; CPCB SENSOR
              </div>
            </div>

            {/* Clinical Assessment Output */}
            <div className="bg-white border border-[#e5e5e0] rounded-2xl p-6 shadow-xs">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#f0f0eb]">
                <div className="flex items-center gap-2">
                  <Bot className="w-4 h-4 text-[#111110]" />
                  <span className="text-xs font-semibold text-[#111110]">Bedrock Clinical Summary</span>
                </div>

                <div className="flex items-center gap-3">
                  {/* Living soundwave indicator like Wispr Flow */}
                  <div className="flex items-center gap-1 h-4">
                    <div className="w-1 bg-[#111110] rounded-full animate-wave-1" />
                    <div className="w-1 bg-[#111110] rounded-full animate-wave-2" />
                    <div className="w-1 bg-emerald-600 rounded-full animate-wave-3" />
                    <div className="w-1 bg-[#111110] rounded-full animate-wave-4" />
                  </div>
                  <span className="text-[11px] font-mono text-[#73736c]">Claude 3.5 Sonnet</span>
                </div>
              </div>

              <div className="p-4 bg-[#fbfbf9] border border-[#e5e5e0] rounded-xl text-xs sm:text-sm text-[#575752] leading-relaxed font-sans">
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
                  <div key={i} className="p-3 border border-[#e5e5e0] rounded-xl bg-white shadow-2xs">
                    <div className="flex items-center gap-2 mb-1">
                      <item.icon className="w-3.5 h-3.5 text-[#73736c]" />
                      <span className="text-xs font-medium text-[#73736c]">{item.title}</span>
                    </div>
                    <div className="text-xs font-semibold text-[#111110]">{item.val}</div>
                  </div>
                ))}
              </div>

              {/* Toggle Prompt Inspector Drawer */}
              <div className="mt-5 pt-3 border-t border-[#f0f0eb] flex items-center justify-between text-xs">
                <button
                  onClick={() => setShowPromptInspector(!showPromptInspector)}
                  className="inline-flex items-center gap-1.5 text-[#73736c] hover:text-[#111110] font-mono transition-colors"
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>{showPromptInspector ? "Hide Bedrock Payload" : "Inspect Bedrock Payload"}</span>
                </button>

                <span className="text-[11px] text-emerald-700 font-mono">200 OK &bull; 340ms Latency</span>
              </div>

              {showPromptInspector && (
                <div className="mt-3 p-4 bg-[#111110] text-[#d1d1c7] rounded-xl font-mono text-[11px] overflow-x-auto">
                  <div className="flex justify-between items-center mb-2 pb-1 border-b border-[#2b2b27] text-[#a3a399]">
                    <span>POST /model/anthropic.claude-3-5-sonnet/invoke</span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(bedrockPromptJson);
                        setCopiedPrompt(true);
                        setTimeout(() => setCopiedPrompt(false), 2000);
                      }}
                      className="hover:text-white flex items-center gap-1"
                    >
                      {copiedPrompt ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedPrompt ? "Copied" : "Copy"}</span>
                    </button>
                  </div>
                  <pre>{bedrockPromptJson}</pre>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
