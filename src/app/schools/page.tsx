'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import { 
  School, CheckCircle, AlertTriangle, XCircle, 
  MapPin, Wind, Thermometer, Droplets, Calendar, BookOpen
} from 'lucide-react';
import { INDIAN_CITIES } from '@/lib/constants';
import { simulateAqi, getAqiLevel } from '@/lib/utils';

export default function SchoolsPage() {
  const [city, setCity] = useState(INDIAN_CITIES?.[0]?.key || 'delhi');
  const [aqi, setAqi] = useState(0);

  useEffect(() => {
    setAqi(simulateAqi(city));
  }, [city]);

  const getSafetyStatus = () => {
    if (aqi <= 100) return { 
      status: 'YES', 
      message: 'SAFE FOR OUTDOOR ACTIVITIES', 
      color: 'text-green-500', 
      bg: 'bg-green-500/20',
      border: 'border-green-500/30',
      icon: CheckCircle
    };
    if (aqi <= 150) return { 
      status: 'CAUTION', 
      message: 'LIMIT OUTDOOR TIME', 
      color: 'text-yellow-500', 
      bg: 'bg-yellow-500/20',
      border: 'border-yellow-500/30',
      icon: AlertTriangle
    };
    return { 
      status: 'NO', 
      message: 'KEEP CHILDREN INDOORS', 
      color: 'text-red-500', 
      bg: 'bg-red-500/20',
      border: 'border-red-500/30',
      icon: XCircle
    };
  };

  const safety = getSafetyStatus();
  const level = getAqiLevel(aqi);

  return (
    <div className="min-h-screen bg-dark-900 text-white relative overflow-hidden font-sans">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className={`bg-orb opacity-10 absolute top-[10%] right-[10%] w-[500px] h-[500px] rounded-full blur-[120px] ${safety.status === 'YES' ? 'bg-green-500' : safety.status === 'CAUTION' ? 'bg-yellow-500' : 'bg-red-500'}`} />
      </div>
      
      <Navbar />

      <main className="container mx-auto px-4 py-12 max-w-6xl mt-16">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-2">
              School <span className="gradient-text">Safety</span>
            </h1>
            <p className="text-gray-400">Daily action plans for schools and parents.</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card px-4 py-2 rounded-xl flex items-center space-x-3 border border-gray-700/50"
          >
            <School className="text-blue-400 w-5 h-5" />
            <select 
              value={city} 
              onChange={(e) => setCity(e.target.value)}
              className="bg-transparent border-none outline-none text-white font-medium cursor-pointer py-1"
            >
              {(INDIAN_CITIES || [{ key: 'delhi', name: 'Delhi' }]).map(c => (
                <option key={c.key} value={c.key} className="bg-dark-900">{c.name}</option>
              ))}
            </select>
          </motion.div>
        </div>

        {/* Hero Indicator */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", bounce: 0.4 }}
          className={`glass-card p-12 rounded-3xl text-center mb-12 border-2 ${safety.border} relative overflow-hidden`}
        >
          <div className={`absolute inset-0 ${safety.bg} blur-3xl opacity-20 -z-10`} />
          <safety.icon className={`w-24 h-24 mx-auto mb-6 ${safety.color}`} />
          <h2 className={`text-6xl md:text-8xl font-display font-black mb-4 ${safety.color} tracking-tight`}>
            {safety.status}
          </h2>
          <p className="text-2xl md:text-3xl font-bold tracking-wide text-gray-200">
            {safety.message}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Current Conditions */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-6 rounded-3xl"
          >
            <h3 className="text-lg font-bold mb-6 text-gray-300">Current Conditions</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-2xl">
                <div className="flex items-center gap-3">
                  <Wind className="text-blue-400 w-6 h-6" />
                  <span className="font-medium text-gray-300">AQI</span>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold" style={{ color: level.color }}>{aqi}</div>
                  <div className="text-xs text-gray-400">{level.label}</div>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-2xl">
                <div className="flex items-center gap-3">
                  <Thermometer className="text-red-400 w-6 h-6" />
                  <span className="font-medium text-gray-300">Temperature</span>
                </div>
                <div className="text-xl font-bold text-white">28°C</div>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-2xl">
                <div className="flex items-center gap-3">
                  <Droplets className="text-teal-400 w-6 h-6" />
                  <span className="font-medium text-gray-300">Humidity</span>
                </div>
                <div className="text-xl font-bold text-white">45%</div>
              </div>
            </div>
          </motion.div>

          {/* Action Plan */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 glass-card p-6 rounded-3xl"
          >
            <h3 className="text-lg font-bold mb-6 text-gray-300 flex items-center">
              <BookOpen className="w-5 h-5 mr-2" />
              School Action Plan
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: 'Morning Assembly', status: aqi > 100 ? 'Move Indoors' : 'Outdoors OK', color: aqi > 100 ? 'text-yellow-400' : 'text-green-400' },
                { title: 'Recess & Play', status: aqi > 150 ? 'Strictly Indoors' : aqi > 100 ? 'Limit Time' : 'Outdoors OK', color: aqi > 150 ? 'text-red-400' : aqi > 100 ? 'text-yellow-400' : 'text-green-400' },
                { title: 'Sports Period', status: aqi > 150 ? 'Reschedule' : aqi > 100 ? 'Light Activity' : 'Normal', color: aqi > 150 ? 'text-red-400' : aqi > 100 ? 'text-yellow-400' : 'text-green-400' },
                { title: 'School Commute', status: aqi > 150 ? 'Mask Mandatory' : 'Mask Advised', color: aqi > 150 ? 'text-red-400' : 'text-yellow-400' },
              ].map((action, idx) => (
                <div key={idx} className="p-5 bg-gray-800/40 rounded-2xl border border-gray-700/50">
                  <p className="text-sm text-gray-400 mb-1">{action.title}</p>
                  <p className={`text-lg font-bold ${action.color}`}>{action.status}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Weekly Forecast Table */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-6 rounded-3xl overflow-x-auto"
        >
          <h3 className="text-lg font-bold mb-6 text-gray-300 flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            Weekly Outlook
          </h3>
          <table className="w-full text-left min-w-[600px]">
            <thead>
              <tr className="border-b border-gray-700 text-gray-400">
                <th className="pb-4 pl-4 font-medium">Day</th>
                <th className="pb-4 font-medium">Predicted AQI</th>
                <th className="pb-4 font-medium">Safety Status</th>
                <th className="pb-4 font-medium">Recommendation</th>
              </tr>
            </thead>
            <tbody>
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day, i) => {
                const dayAqi = Math.max(50, aqi + (Math.sin(i) * 40));
                const lvl = getAqiLevel(dayAqi);
                const isOk = dayAqi <= 100;
                
                return (
                  <tr key={day} className="border-b border-gray-800/50 last:border-0 hover:bg-white/5 transition-colors">
                    <td className="py-4 pl-4 font-medium">{day}</td>
                    <td className="py-4">
                      <span className="px-3 py-1 rounded-full text-sm font-bold bg-opacity-20" style={{ color: lvl.color, backgroundColor: `${lvl.color}33` }}>
                        {Math.round(dayAqi)} - {lvl.name}
                      </span>
                    </td>
                    <td className="py-4">
                      {isOk ? (
                        <span className="flex items-center text-green-400 text-sm font-bold"><CheckCircle className="w-4 h-4 mr-1"/> Safe</span>
                      ) : (
                        <span className="flex items-center text-yellow-400 text-sm font-bold"><AlertTriangle className="w-4 h-4 mr-1"/> Caution</span>
                      )}
                    </td>
                    <td className="py-4 text-sm text-gray-400">
                      {isOk ? 'Standard outdoor schedule' : 'Prepare indoor alternatives'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </motion.div>
      </main>
    </div>
  );
}
