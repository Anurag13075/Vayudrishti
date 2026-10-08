"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import {
  MapPin,
  Send,
  ThumbsUp,
  Clock,
  ShieldCheck,
  Flame,
  Construction,
  Car,
  Factory,
  Trash2,
  AlertOctagon,
  Check,
} from "lucide-react";
import { INDIAN_CITIES } from "@/lib/constants";

const REPORT_TYPES = [
  { id: "stubble", label: "Stubble Fire", icon: Flame },
  { id: "construction", label: "Construction Dust", icon: Construction },
  { id: "factory", label: "Industrial Chimney", icon: Factory },
  { id: "vehicle", label: "Exhaust Smoke", icon: Car },
  { id: "waste", label: "Waste Burning", icon: Trash2 },
  { id: "other", label: "Other Source", icon: AlertOctagon },
];

const SEVERITIES = [
  { id: "mild", label: "Mild" },
  { id: "moderate", label: "Moderate" },
  { id: "severe", label: "Severe" },
];

const SAMPLE_REPORTS = [
  {
    id: 1,
    type: "construction",
    severity: "severe",
    location: "Dwarka Sector 12, Delhi",
    time: "12m ago",
    desc: "Uncovered excavation site blowing heavy dust into residential blocks. No water suppression active.",
    upvotes: 28,
  },
  {
    id: 2,
    type: "waste",
    severity: "moderate",
    location: "Andheri Flyover, Mumbai",
    time: "45m ago",
    desc: "Open landfill plastic incineration near transit line. Heavy acrid odor.",
    upvotes: 14,
  },
  {
    id: 3,
    type: "stubble",
    severity: "severe",
    location: "Ludhiana Perimeter, Punjab",
    time: "2h ago",
    desc: "Multi-acre field burn visible along state highway corridor.",
    upvotes: 94,
  },
  {
    id: 4,
    type: "factory",
    severity: "moderate",
    location: "Peenya Industrial Area, Bengaluru",
    time: "3h ago",
    desc: "Dark particulate smoke discharging during unpermitted morning hours.",
    upvotes: 42,
  },
];

export default function ReportPage() {
  const [reports, setReports] = useState(SAMPLE_REPORTS);
  const [formState, setFormState] = useState({
    type: "construction",
    severity: "moderate",
    city: INDIAN_CITIES?.[0]?.key || "delhi",
    address: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const cityObj = INDIAN_CITIES.find((c) => c.key === formState.city);
      const newReport = {
        id: Date.now(),
        type: formState.type,
        severity: formState.severity,
        location: formState.address
          ? `${formState.address}, ${cityObj?.name || "India"}`
          : `${cityObj?.name || "India"} (${cityObj?.state || ""})`,
        time: "Just now",
        desc: formState.description || "Reported environmental hazard verified by citizen sensor.",
        upvotes: 1,
      };

      setReports([newReport, ...reports]);
      setIsSubmitting(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 4000);

      setFormState({
        type: "construction",
        severity: "moderate",
        city: formState.city,
        address: "",
        description: "",
      });
    }, 900);
  };

  const handleUpvote = (id: number) => {
    setReports(reports.map((r) => (r.id === id ? { ...r, upvotes: r.upvotes + 1 } : r)));
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-[#09090b] font-sans pb-24">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-10">
        {/* Header Breadcrumb & Title */}
        <div className="pb-8 mb-8 border-b border-neutral-200/70">
          <div className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1">
            Community Watch
          </div>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-900">
            Citizen Pollution Registry
          </h1>
          <p className="text-sm text-neutral-500 mt-1">
            Crowdsource and geotag unpermitted emission sources to trigger localized inspection protocols.
          </p>
        </div>

        {/* Aggregate Ticker */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[
            { label: "Reports Logged This Week", val: "1,248" },
            { label: "Active Municipal Inquiries", val: "89 Hotspots" },
            { label: "Remediation Directives Issued", val: "34 Actions" },
          ].map((stat, i) => (
            <div key={i} className="p-4 bg-white border border-neutral-200 rounded-xl">
              <span className="text-xs text-neutral-400">{stat.label}</span>
              <div className="text-lg font-mono font-bold text-neutral-900 mt-1">{stat.val}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Filing Form */}
          <div className="lg:col-span-6 bg-white border border-neutral-200 rounded-2xl p-6 shadow-xs relative">
            <AnimatePresence>
              {showSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="p-4 mb-5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3 text-xs text-emerald-800"
                >
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Report submitted successfully and ingested into local sentinel feed.</span>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Incident Category */}
              <div>
                <label className="block text-xs font-medium text-neutral-500 mb-2">Category of Incident</label>
                <div className="grid grid-cols-3 gap-2">
                  {REPORT_TYPES.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setFormState({ ...formState, type: t.id })}
                      className={`p-2.5 rounded-xl border text-left text-xs font-medium flex items-center gap-2 transition-all ${
                        formState.type === t.id
                          ? "bg-neutral-900 text-white border-neutral-900"
                          : "bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-50"
                      }`}
                    >
                      <t.icon className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{t.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Severity */}
              <div>
                <label className="block text-xs font-medium text-neutral-500 mb-2">Observed Severity</label>
                <div className="grid grid-cols-3 gap-2">
                  {SEVERITIES.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setFormState({ ...formState, severity: s.id })}
                      className={`py-2 text-xs font-medium rounded-lg border transition-all ${
                        formState.severity === s.id
                          ? "bg-neutral-900 text-white border-neutral-900"
                          : "bg-white text-neutral-600 border-neutral-200 hover:bg-neutral-50"
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* City & Address */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-neutral-500 mb-1.5">City Region</label>
                  <select
                    value={formState.city}
                    onChange={(e) => setFormState({ ...formState, city: e.target.value })}
                    className="w-full bg-white border border-neutral-200 rounded-lg py-2 px-3 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900"
                  >
                    {(INDIAN_CITIES || [{ key: "delhi", name: "Delhi" }]).map((c) => (
                      <option key={c.key} value={c.key}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-500 mb-1.5">Specific Landmark</label>
                  <input
                    type="text"
                    placeholder="e.g. Sector 14, Main Road"
                    value={formState.address}
                    onChange={(e) => setFormState({ ...formState, address: e.target.value })}
                    className="w-full bg-white border border-neutral-200 rounded-lg py-2 px-3 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900 placeholder:text-neutral-300"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-medium text-neutral-500 mb-1.5">Observations</label>
                <textarea
                  rows={3}
                  placeholder="Detail visible smoke, absence of water sprinklers, or unpermitted burning..."
                  value={formState.description}
                  onChange={(e) => setFormState({ ...formState, description: e.target.value })}
                  className="w-full bg-white border border-neutral-200 rounded-lg p-3 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900 placeholder:text-neutral-300 resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 px-4 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-medium flex items-center justify-center gap-2 transition-all"
              >
                {isSubmitting ? (
                  <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Publish to Municipal Registry</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Column: Live Community Feed */}
          <div className="lg:col-span-6 space-y-3">
            <div className="flex items-center justify-between pb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                Verified Incident Feed
              </span>
              <span className="text-[11px] text-neutral-500 font-mono">DynamoDB Synced</span>
            </div>

            {reports.map((report) => {
              const typeObj = REPORT_TYPES.find((t) => t.id === report.type) || REPORT_TYPES[0];
              return (
                <div
                  key={report.id}
                  className="p-4 bg-white border border-neutral-200 rounded-xl shadow-xs transition-colors hover:border-neutral-300"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-md bg-neutral-100 flex items-center justify-center text-neutral-700">
                        <typeObj.icon className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs font-semibold text-neutral-900">{typeObj.label}</span>
                      <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600 border border-neutral-200">
                        {report.severity}
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-neutral-400">{report.time}</span>
                  </div>

                  <p className="text-xs text-neutral-600 leading-relaxed mb-3">{report.desc}</p>

                  <div className="flex items-center justify-between pt-2 border-t border-neutral-100 text-xs text-neutral-500">
                    <div className="flex items-center gap-1 text-[11px]">
                      <MapPin className="w-3 h-3 text-neutral-400" />
                      <span>{report.location}</span>
                    </div>

                    <button
                      onClick={() => handleUpvote(report.id)}
                      className="inline-flex items-center gap-1.5 text-[11px] font-medium text-neutral-700 hover:text-neutral-900 bg-neutral-50 hover:bg-neutral-100 px-2.5 py-1 rounded-md border border-neutral-200 transition-colors"
                    >
                      <ThumbsUp className="w-3 h-3" />
                      <span>{report.upvotes}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
