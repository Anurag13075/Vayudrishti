'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import { 
  AlertOctagon, MapPin, Send, MessageSquare, 
  ThumbsUp, Clock, ShieldCheck, Flame, Construction, Car, Factory, Trash2
} from 'lucide-react';
import { INDIAN_CITIES } from '@/lib/constants';

const REPORT_TYPES = [
  { id: 'stubble', label: 'Stubble Burning', icon: Flame, color: 'text-orange-500' },
  { id: 'construction', label: 'Construction Dust', icon: Construction, color: 'text-yellow-500' },
  { id: 'factory', label: 'Factory Emissions', icon: Factory, color: 'text-gray-400' },
  { id: 'vehicle', label: 'Vehicle Smoke', icon: Car, color: 'text-blue-400' },
  { id: 'waste', label: 'Waste Burning', icon: Trash2, color: 'text-red-400' },
  { id: 'other', label: 'Other', icon: AlertOctagon, color: 'text-purple-400' }
];

const SEVERITIES = [
  { id: 'mild', label: 'Mild 😕', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50' },
  { id: 'moderate', label: 'Moderate 😷', color: 'bg-orange-500/20 text-orange-400 border-orange-500/50' },
  { id: 'severe', label: 'Severe 🚨', color: 'bg-red-500/20 text-red-400 border-red-500/50' }
];

const SAMPLE_REPORTS = [
  { id: 1, type: 'construction', severity: 'severe', location: 'Dwarka, Delhi', time: '10 mins ago', desc: 'Heavy dust from new mall construction. No water sprinkling being done.', upvotes: 24 },
  { id: 2, type: 'waste', severity: 'moderate', location: 'Andheri East, Mumbai', time: '1 hour ago', desc: 'Garbage burning near the highway bridge.', upvotes: 12 },
  { id: 3, type: 'stubble', severity: 'severe', location: 'Ludhiana Outskirts, Punjab', time: '2 hours ago', desc: 'Massive field fires visible from the main road.', upvotes: 89 },
  { id: 4, type: 'factory', severity: 'moderate', location: 'Peenya, Bangalore', time: '3 hours ago', desc: 'Thick black smoke from industrial chimney since morning.', upvotes: 45 }
];

export default function ReportPage() {
  const [reports, setReports] = useState(SAMPLE_REPORTS);
  const [formState, setFormState] = useState({
    type: '',
    severity: '',
    city: INDIAN_CITIES?.[0]?.key || 'delhi',
    address: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call & prepend to live feed
    setTimeout(() => {
      const cityObj = INDIAN_CITIES.find(c => c.key === formState.city);
      const newReport = {
        id: Date.now(),
        type: formState.type,
        severity: formState.severity,
        location: formState.address ? `${formState.address}, ${cityObj?.name || 'India'}` : `${cityObj?.name || 'India'} (${cityObj?.state || ''})`,
        time: 'Just now',
        desc: formState.description || 'Reported pollution event in this vicinity.',
        upvotes: 1
      };

      setReports([newReport, ...reports]);
      setIsSubmitting(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000);
      
      setFormState({
        type: '',
        severity: '',
        city: formState.city,
        address: '',
        description: ''
      });
    }, 1200);
  };

  const handleUpvote = (id: number) => {
    setReports(reports.map(r => r.id === id ? { ...r, upvotes: r.upvotes + 1 } : r));
  };

  return (
    <div className="min-h-screen bg-dark-900 text-white relative overflow-hidden font-sans">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="bg-orb bg-orb-red opacity-10 absolute top-[20%] left-[10%] w-[400px] h-[400px] rounded-full blur-[100px]" />
        <div className="bg-orb bg-orb-orange opacity-10 absolute bottom-[10%] right-[10%] w-[500px] h-[500px] rounded-full blur-[120px]" />
      </div>
      
      <Navbar />

      <main className="container mx-auto px-4 py-12 max-w-6xl mt-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            See Something? <span className="text-red-400">Report It.</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Help your community breathe better. Crowdsource pollution data and drive local action.
          </p>
        </motion.div>

        {/* Stats Bar */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-4 rounded-2xl flex flex-wrap justify-center gap-8 mb-12 border border-gray-700/50"
        >
          <div className="flex items-center gap-2">
            <MessageSquare className="text-blue-400 w-5 h-5" />
            <span className="font-bold">1,247 <span className="text-gray-400 font-normal">Reports This Week</span></span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="text-red-400 w-5 h-5" />
            <span className="font-bold">89 <span className="text-gray-400 font-normal">Areas Flagged</span></span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="text-green-400 w-5 h-5" />
            <span className="font-bold">12 <span className="text-gray-400 font-normal">Actions Taken</span></span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Report Form */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-7 glass-card p-8 rounded-3xl relative overflow-hidden"
          >
            <AnimatePresence>
              {showSuccess && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-green-900/90 backdrop-blur-sm z-20 flex flex-col items-center justify-center text-center p-8 rounded-3xl"
                >
                  <ShieldCheck className="w-20 h-20 text-green-400 mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Report Submitted!</h3>
                  <p className="text-green-200">Thank you for helping keep your community safe. Local authorities have been notified.</p>
                </motion.div>
              )}
            </AnimatePresence>

            <h2 className="text-2xl font-display font-bold mb-6">File a Report</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-3">What kind of pollution?</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {REPORT_TYPES.map(type => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setFormState({ ...formState, type: type.id })}
                      className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                        formState.type === type.id 
                          ? 'border-red-500 bg-red-500/10' 
                          : 'border-gray-700 bg-gray-800/50 hover:bg-gray-700'
                      }`}
                    >
                      <type.icon className={`w-6 h-6 ${type.color}`} />
                      <span className="text-xs font-medium text-center">{type.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-3">Severity Level</label>
                <div className="flex gap-3">
                  {SEVERITIES.map(sev => (
                    <button
                      key={sev.id}
                      type="button"
                      onClick={() => setFormState({ ...formState, severity: sev.id })}
                      className={`flex-1 py-2 rounded-xl border text-sm font-medium transition-all ${
                        formState.severity === sev.id 
                          ? sev.color 
                          : 'border-gray-700 bg-gray-800/50 text-gray-400 hover:bg-gray-700'
                      }`}
                    >
                      {sev.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">City</label>
                  <select
                    value={formState.city}
                    onChange={(e) => setFormState({ ...formState, city: e.target.value })}
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl py-2.5 px-4 text-white focus:outline-none focus:border-red-500"
                  >
                    {(INDIAN_CITIES || [{ key: 'delhi', name: 'Delhi' }]).map(c => (
                      <option key={c.key} value={c.key}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Specific Location</label>
                  <input
                    type="text"
                    placeholder="e.g. Near Metro Pillar 45"
                    value={formState.address}
                    onChange={(e) => setFormState({ ...formState, address: e.target.value })}
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl py-2.5 px-4 text-white focus:outline-none focus:border-red-500 placeholder-gray-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Description</label>
                <textarea
                  rows={3}
                  placeholder="Provide any additional details..."
                  value={formState.description}
                  onChange={(e) => setFormState({ ...formState, description: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-red-500 placeholder-gray-600 resize-none"
                />
              </div>

              <button 
                type="submit"
                disabled={!formState.type || !formState.severity || isSubmitting}
                className="w-full glow-button bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-bold transition-all flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"/>
                ) : (
                  <><Send className="w-5 h-5" /> Submit Report</>
                )}
              </button>
            </form>
          </motion.div>

          {/* Recent Reports */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-5 space-y-4"
          >
            <h2 className="text-xl font-display font-bold mb-6 pl-2 flex items-center">
              <Activity className="w-5 h-5 mr-2 text-red-400" />
              Live Feed
            </h2>
            
            {reports.map((report, idx) => {
              const typeInfo = REPORT_TYPES.find(t => t.id === report.type) || REPORT_TYPES[0];
              const sevInfo = SEVERITIES.find(s => s.id === report.severity) || SEVERITIES[0];
              
              return (
                <motion.div 
                  key={report.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * idx }}
                  className="glass-card p-5 rounded-2xl hover:-translate-y-1 transition-transform"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-800 rounded-lg">
                        <typeInfo.icon className={`w-5 h-5 ${typeInfo.color}`} />
                      </div>
                      <div>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${sevInfo.color}`}>
                          {report.severity.toUpperCase()}
                        </span>
                        <div className="text-xs text-gray-400 mt-1 flex items-center">
                          <Clock className="w-3 h-3 mr-1" /> {report.time}
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-200 text-sm mb-3 leading-relaxed">"{report.desc}"</p>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-800">
                    <div className="text-xs text-gray-400 flex items-center">
                      <MapPin className="w-3 h-3 mr-1" /> {report.location}
                    </div>
                    <button 
                      onClick={() => handleUpvote(report.id)}
                      className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-red-400 transition-colors px-2 py-1 rounded-lg hover:bg-white/5"
                    >
                      <ThumbsUp className="w-3.5 h-3.5" /> {report.upvotes}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </main>
    </div>
  );
}

// Helper icon component since Activity isn't imported above for Live Feed
function Activity(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  );
}
