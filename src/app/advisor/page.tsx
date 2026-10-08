'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import { 
  HeartPulse, Activity, Wind, Shield, Users, UserPlus, 
  MapPin, CheckCircle, AlertCircle, Bot
} from 'lucide-react';
import { INDIAN_CITIES } from '@/lib/constants';
import { simulateAqi, getAqiLevel, getAqiColor } from '@/lib/utils';

export default function AdvisorPage() {
  const [profile, setProfile] = useState({
    age: 'Adult',
    conditions: [] as string[],
    activity: 'Indoor',
    city: INDIAN_CITIES?.[0]?.key || 'delhi'
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [currentAqi, setCurrentAqi] = useState(50);
  const [aiMessage, setAiMessage] = useState('');

  const handleConditionToggle = (condition: string) => {
    if (condition === 'None') {
      setProfile({ ...profile, conditions: ['None'] });
      return;
    }
    
    let newConditions = profile.conditions.filter(c => c !== 'None');
    if (newConditions.includes(condition)) {
      newConditions = newConditions.filter(c => c !== condition);
    } else {
      newConditions.push(condition);
    }
    
    if (newConditions.length === 0) newConditions = ['None'];
    setProfile({ ...profile, conditions: newConditions });
  };

  const getAdvice = async () => {
    setIsGenerating(true);
    setShowResults(false);
    
    const aqi = simulateAqi(profile.city);
    setCurrentAqi(aqi);

    try {
      const res = await fetch('/api/bedrock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...profile,
          aqi,
        }),
      });
      const data = await res.json();
      if (data?.aiMessage) {
        setAiMessage(data.aiMessage);
      } else {
        throw new Error('API error');
      }
    } catch {
      let msg = `Based on your demographic profile as a ${profile.age.toLowerCase()} with ${profile.conditions.includes('None') ? 'no pre-existing conditions' : profile.conditions.join(' and ')}, planning ${profile.activity.toLowerCase()} in ${profile.city.toUpperCase()}: `;
      if (aqi > 150 || (profile.conditions.length > 0 && !profile.conditions.includes('None'))) {
        msg += "We strongly advise limiting outdoor exertion today. Please wear an N95 respirator if stepping out.";
      } else {
        msg += "Ambient air quality is within safe biological limits for your planned activity. Have a great day!";
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
    <div className="min-h-screen bg-dark-900 text-white relative overflow-hidden font-sans">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="bg-orb bg-orb-purple opacity-20 absolute top-[10%] right-[-5%] w-[400px] h-[400px] rounded-full blur-[100px]" />
        <div className="bg-orb bg-orb-green opacity-10 absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] rounded-full blur-[120px]" />
      </div>
      
      <Navbar />

      <main className="container mx-auto px-4 py-12 max-w-7xl mt-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            AI <span className="gradient-text">Health Advisor</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Get personalized, real-time health recommendations based on your profile and local air quality.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Panel: Profile Form */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full lg:w-1/3 space-y-6"
          >
            <div className="glass-card p-6 rounded-3xl">
              <h2 className="text-xl font-display font-bold mb-6 flex items-center">
                <UserPlus className="w-5 h-5 mr-2 text-purple-400" />
                Health Profile
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-3">Age Group</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['Child', 'Teen', 'Adult', 'Senior'].map(age => (
                      <button
                        key={age}
                        onClick={() => setProfile({ ...profile, age })}
                        className={`py-2 px-4 rounded-xl text-sm transition-all ${
                          profile.age === age ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        }`}
                      >
                        {age}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-3">Health Conditions</label>
                  <div className="flex flex-wrap gap-2">
                    {['Asthma', 'Heart Disease', 'Diabetes', 'Pregnancy', 'None'].map(condition => (
                      <button
                        key={condition}
                        onClick={() => handleConditionToggle(condition)}
                        className={`py-1.5 px-4 rounded-full text-sm transition-all border ${
                          profile.conditions.includes(condition) 
                            ? 'border-purple-500 bg-purple-500/20 text-purple-300' 
                            : 'border-gray-700 bg-transparent text-gray-400 hover:border-gray-500'
                        }`}
                      >
                        {condition}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-3">Planned Activity</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['Indoor', 'Light Outdoor', 'Exercise', 'Commute'].map(activity => (
                      <button
                        key={activity}
                        onClick={() => setProfile({ ...profile, activity })}
                        className={`py-2 px-4 rounded-xl text-sm transition-all ${
                          profile.activity === activity ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        }`}
                      >
                        {activity}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-3">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <select
                      value={profile.city}
                      onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                      className="w-full bg-gray-800 border border-gray-700 rounded-xl py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-purple-500 appearance-none"
                    >
                      {(INDIAN_CITIES || [{ key: 'delhi', name: 'Delhi' }]).map(c => (
                        <option key={c.key} value={c.key}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <button 
                  onClick={getAdvice}
                  disabled={isGenerating}
                  className="w-full glow-button bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-medium transition-all flex justify-center items-center"
                >
                  {isGenerating ? (
                    <motion.div 
                      animate={{ rotate: 360 }} 
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                  ) : (
                    'Get AI Advice'
                  )}
                </button>
              </div>
            </div>
          </motion.div>

          {/* Right Panel: Recommendations */}
          <motion.div 
            className="w-full lg:w-2/3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {showResults ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="glass-card p-6 rounded-3xl flex items-center justify-between border-l-4" style={{ borderLeftColor: aqiColor }}>
                  <div>
                    <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-1">Current Conditions in {profile.city.toUpperCase()}</h3>
                    <div className="flex items-end gap-3">
                      <span className="text-4xl font-display font-bold" style={{ color: aqiColor }}>{currentAqi} AQI</span>
                      <span className="text-lg font-medium mb-1" style={{ color: aqiColor }}>{aqiLevel.label}</span>
                    </div>
                  </div>
                  <div className="hidden sm:block p-4 rounded-full bg-gray-800/50">
                    <Wind className="w-8 h-8" style={{ color: aqiColor }} />
                  </div>
                </div>

                <div className="glass-card p-6 rounded-3xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Bot className="w-32 h-32" />
                  </div>
                  <h3 className="text-xl font-display font-bold mb-4 flex items-center">
                    <Bot className="w-6 h-6 mr-2 text-purple-400" />
                    AI Assessment
                  </h3>
                  <div className="relative z-10">
                    <p className="text-lg leading-relaxed text-gray-200">
                      {aiMessage}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { title: 'Outdoor Activity', icon: Activity, desc: currentAqi > 100 ? 'Avoid prolonged exertion' : 'Safe for all activities' },
                    { title: 'Mask Recommendation', icon: Shield, desc: currentAqi > 150 ? 'N95 mask strictly required' : 'Optional for healthy adults' },
                    { title: 'Ventilation', icon: Wind, desc: currentAqi > 100 ? 'Keep windows closed' : 'Good time to ventilate' },
                    { title: 'Vulnerable Groups', icon: Users, desc: currentAqi > 50 && profile.conditions.length > 0 ? 'Extra caution advised' : 'Normal routine' },
                  ].map((rec, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.1 }}
                      className="glass-card p-5 rounded-2xl flex items-start gap-4 hover:bg-white/5 transition-colors"
                    >
                      <div className="p-3 rounded-xl bg-gray-800 shrink-0">
                        <rec.icon className="w-6 h-6 text-purple-400" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-100">{rec.title}</h4>
                        <p className="text-sm text-gray-400 mt-1">{rec.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <div className="h-full glass-card rounded-3xl flex flex-col items-center justify-center p-12 text-center min-h-[400px]">
                <HeartPulse className="w-16 h-16 text-gray-600 mb-6" />
                <h3 className="text-2xl font-display font-bold text-gray-300 mb-2">Ready for your assessment</h3>
                <p className="text-gray-500 max-w-md">
                  Fill out your health profile on the left and click "Get AI Advice" to receive personalized, actionable recommendations for today.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
