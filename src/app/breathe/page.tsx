'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { Activity, Wind, Shield, Clock, MapPin, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import { INDIAN_CITIES } from '@/lib/constants';
import { simulateAqi, calculateBreathScore } from '@/lib/utils';

// Fallbacks in case utils are missing
const getBreathScoreColor = (score: number) => {
  if (score >= 80) return '#22c55e';
  if (score >= 60) return '#eab308';
  if (score >= 40) return '#f97316';
  return '#ef4444';
};

const getBreathScoreLabel = (score: number) => {
  if (score >= 80) return 'Excellent';
  if (score >= 60) return 'Good';
  if (score >= 40) return 'Moderate';
  return 'Poor';
};

const generateForecast = (aqi: number) => {
  const data = [];
  let currentAqi = aqi;
  for (let i = 0; i < 24; i++) {
    currentAqi += Math.floor(Math.random() * 21) - 10;
    if (currentAqi < 0) currentAqi = 10;
    data.push({
      time: `${(new Date().getHours() + i) % 24}:00`,
      aqi: currentAqi
    });
  }
  return data;
};

export default function BreathePage() {
  const [city, setCity] = useState(INDIAN_CITIES?.[0]?.key || 'delhi');
  const [score, setScore] = useState(0);
  const [targetScore, setTargetScore] = useState(0);
  const [forecast, setForecast] = useState<any[]>([]);
  
  useEffect(() => {
    const aqi = simulateAqi(city);
    const calculatedScore = calculateBreathScore ? calculateBreathScore(aqi) : Math.max(0, 100 - aqi / 5);
    setTargetScore(Math.round(calculatedScore));
    setForecast(generateForecast(aqi));
  }, [city]);

  useEffect(() => {
    const interval = setInterval(() => {
      setScore(prev => {
        if (prev < targetScore) return prev + 1;
        if (prev > targetScore) return prev - 1;
        return prev;
      });
    }, 20);
    return () => clearInterval(interval);
  }, [targetScore]);

  const radius = 120;
  const strokeWidth = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const color = getBreathScoreColor(score);
  const label = getBreathScoreLabel(score);

  return (
    <div className="min-h-screen bg-dark-900 text-white relative overflow-hidden font-sans">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="bg-orb bg-orb-green opacity-20 absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full blur-[100px]" />
        <div className="bg-orb bg-orb-blue opacity-20 absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full blur-[120px]" />
      </div>
      
      <Navbar />

      <main className="container mx-auto px-4 py-12 max-w-6xl mt-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Personal <span className="gradient-text-green">Breath Score</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Your real-time respiratory health tracker. Monitor your exposure and plan your day safely.
          </p>
        </motion.div>

        <div className="flex justify-center mb-12">
          <div className="glass-card px-6 py-3 rounded-full flex items-center space-x-4">
            <MapPin className="text-green-500 w-5 h-5" />
            <select 
              value={city} 
              onChange={(e) => setCity(e.target.value)}
              className="bg-transparent border-none outline-none text-white font-medium cursor-pointer"
            >
              {(INDIAN_CITIES || [{ key: 'delhi', name: 'Delhi' }, { key: 'mumbai', name: 'Mumbai' }]).map(c => (
                <option key={c.key} value={c.key} className="bg-dark-900 text-white">{c.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:col-span-1 flex flex-col items-center justify-center glass-card p-8 rounded-3xl"
          >
            <div className="relative w-[280px] h-[280px] flex items-center justify-center mb-6">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 300 300">
                <circle
                  cx="150"
                  cy="150"
                  r={radius}
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth={strokeWidth}
                  fill="none"
                />
                <motion.circle
                  cx="150"
                  cy="150"
                  r={radius}
                  stroke={color}
                  strokeWidth={strokeWidth}
                  fill="none"
                  strokeDasharray={circumference}
                  animate={{ strokeDashoffset }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-6xl font-display font-bold" style={{ color }}>
                  {score}
                </span>
                <span className="text-gray-400 text-sm mt-2 uppercase tracking-wider">out of 100</span>
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-1" style={{ color }}>{label}</h3>
              <p className="text-gray-400 text-sm">Current breathing conditions</p>
            </div>
          </motion.div>

          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { title: 'Time Outdoors', value: '2.5 hrs', icon: Clock, color: 'text-blue-400', progress: 40 },
              { title: 'Pollution Inhaled', value: '45 μg/m³', icon: Wind, color: 'text-red-400', progress: 65 },
              { title: 'Mask Effectiveness', value: '95%', icon: Shield, color: 'text-green-400', progress: 95 },
              { title: 'Safe Hours Left', value: '4.5 hrs', icon: Activity, color: 'text-purple-400', progress: 75 },
            ].map((metric, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="glass-card p-6 rounded-2xl flex flex-col justify-between hover:-translate-y-1 transition-transform"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-xl bg-opacity-10 bg-white ${metric.color}`}>
                    <metric.icon className="w-6 h-6" />
                  </div>
                  <span className="text-2xl font-bold">{metric.value}</span>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-2">{metric.title}</p>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <motion.div 
                      className="bg-current h-2 rounded-full"
                      style={{ color: metric.color.replace('text-', '') }}
                      initial={{ width: 0 }}
                      animate={{ width: `${metric.progress}%` }}
                      transition={{ duration: 1, delay: 0.5 + idx * 0.1 }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-6 rounded-3xl"
          >
            <h3 className="text-xl font-display font-bold mb-6 flex items-center">
              <Activity className="w-5 h-5 mr-2 text-blue-400" />
              24-Hour Forecast
            </h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={forecast}>
                  <defs>
                    <linearGradient id="colorAqi" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                  <XAxis dataKey="time" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#111827', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="aqi" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorAqi)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-6 rounded-3xl"
          >
            <h3 className="text-xl font-display font-bold mb-6 flex items-center">
              <Clock className="w-5 h-5 mr-2 text-green-400" />
              Daily Planner
            </h3>
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-700 before:to-transparent">
              {[
                { time: '06:00 AM', event: 'Morning Exercise', status: 'safe', icon: CheckCircle, color: 'text-green-500', aqi: 45 },
                { time: '09:00 AM', event: 'Commute', status: 'caution', icon: AlertTriangle, color: 'text-yellow-500', aqi: 120 },
                { time: '01:00 PM', event: 'Lunch Break', status: 'danger', icon: XCircle, color: 'text-red-500', aqi: 180 },
                { time: '07:00 PM', event: 'Evening Walk', status: 'safe', icon: CheckCircle, color: 'text-green-500', aqi: 65 },
              ].map((item, idx) => (
                <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-dark-900 bg-gray-800 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                    <item.icon className={`w-5 h-5 ${item.color}`} />
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-card p-4 rounded-xl flex items-center justify-between">
                    <div>
                      <h4 className="font-bold">{item.event}</h4>
                      <span className="text-sm text-gray-400">{item.time}</span>
                    </div>
                    <div className="text-right">
                      <div className={`font-bold ${item.color}`}>AQI {item.aqi}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
