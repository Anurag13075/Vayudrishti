'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Wind, AlertTriangle, Info, ArrowLeft, X, Activity } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { INDIAN_CITIES, AQI_LEVELS } from '@/lib/constants';
import { simulateAqi, getAqiLevel, getAqiColor, generateForecast } from '@/lib/utils';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import 'leaflet/dist/leaflet.css';

const MapContainer = dynamic(() => import('react-leaflet').then(m => m.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(m => m.TileLayer), { ssr: false });
const CircleMarker = dynamic(() => import('react-leaflet').then(m => m.CircleMarker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(m => m.Popup), { ssr: false });

// Helper to simulate pollutants
const simulatePollutants = (aqi: number) => ({
  'PM2.5': Math.round(aqi * 0.8),
  'PM10': Math.round(aqi * 1.2),
  'O3': Math.round(aqi * 0.5),
  'NO2': Math.round(aqi * 0.3),
  'SO2': Math.round(aqi * 0.1),
  'CO': Math.round(aqi * 0.05),
});

export default function InteractiveMapPage() {
  const [isClient, setIsClient] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedCity, setSelectedCity] = useState<typeof INDIAN_CITIES[0] | null>(null);
  const [citiesData, setCitiesData] = useState<any[]>([]);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  
  useEffect(() => {
    setIsClient(true);
    updateCityData();
    const interval = setInterval(updateCityData, 60000);
    return () => clearInterval(interval);
  }, []);

  const updateCityData = () => {
    const data = INDIAN_CITIES.map(city => {
      const aqi = simulateAqi(city.key);
      return {
        ...city,
        aqi,
        level: getAqiLevel(aqi),
        color: getAqiColor(aqi),
        forecast: generateForecast(aqi),
        pollutants: simulatePollutants(aqi)
      };
    });
    setCitiesData(data);
    setLastUpdated(new Date());
  };

  const filteredCities = useMemo(() => {
    return citiesData.filter(city => {
      const matchesSearch = city.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           city.state.toLowerCase().includes(searchQuery.toLowerCase());
      if (!matchesSearch) return false;
      if (activeFilter === 'All') return true;
      return city.level.label.toLowerCase() === activeFilter.toLowerCase();
    });
  }, [citiesData, searchQuery, activeFilter]);

  const selectedCityData = useMemo(() => {
    if (!selectedCity) return null;
    return citiesData.find(c => c.name === selectedCity.name);
  }, [selectedCity, citiesData]);

  if (!isClient) return null;

  const filters = ['All', 'Good', 'Moderate', 'Unhealthy', 'Hazardous'];

  return (
    <div className="min-h-screen bg-dark-900 flex flex-col overflow-hidden text-white relative">
      <div className="absolute inset-0 bg-orb-green opacity-20 pointer-events-none" />
      <div className="absolute inset-0 bg-orb-blue opacity-20 pointer-events-none" />
      
      <Navbar />
      
      <div className="flex-1 flex flex-col md:flex-row h-[calc(100vh-64px)] relative z-10">
        {/* Side Panel */}
        <motion.div 
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className={`w-full md:w-96 glass-card border-r border-white/10 flex flex-col h-full bg-dark-900/60 backdrop-blur-xl ${selectedCity ? 'hidden md:flex' : 'flex'}`}
        >
          <div className="p-4 border-b border-white/10">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search cities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-white placeholder-gray-400 focus:outline-none focus:border-green-500/50 transition-colors"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              {filters.map(f => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                    activeFilter === f 
                    ? 'bg-green-500/20 border-green-500/50 text-green-400' 
                    : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
            <AnimatePresence>
              {filteredCities.map((city, idx) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: idx * 0.02 }}
                  key={city.name}
                  onClick={() => setSelectedCity(city)}
                  className="p-3 mb-2 rounded-xl hover:bg-white/5 cursor-pointer transition-colors flex items-center justify-between group"
                >
                  <div>
                    <h3 className="font-medium text-white group-hover:text-green-400 transition-colors">{city.name}</h3>
                    <p className="text-xs text-gray-400 flex items-center mt-1">
                      <MapPin className="w-3 h-3 mr-1" /> {city.state}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold" style={{ color: city.color }}>
                      {city.aqi}
                    </div>
                    <div className="text-[10px] uppercase tracking-wider" style={{ color: city.color }}>
                      {city.level.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {filteredCities.length === 0 && (
              <div className="text-center py-10 text-gray-400">
                <Search className="w-8 h-8 mx-auto mb-2 opacity-20" />
                <p>No cities found</p>
              </div>
            )}
          </div>
          
          <div className="p-3 border-t border-white/10 text-xs text-center text-gray-500">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </div>
        </motion.div>

        {/* Selected City Detailed View (Mobile Overlap) */}
        <AnimatePresence>
          {selectedCityData && (
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute md:relative inset-0 md:inset-auto z-20 md:w-96 glass-card border-l border-white/10 flex flex-col h-full bg-dark-900/90 md:bg-dark-900/60 backdrop-blur-2xl"
            >
              <div className="p-4 border-b border-white/10 flex items-center justify-between">
                <button 
                  onClick={() => setSelectedCity(null)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors flex items-center text-gray-300"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Back
                </button>
                <div className="text-sm font-medium">{selectedCityData.name}</div>
              </div>

              <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-white/10">
                <div className="text-center mb-8">
                  <div className="text-6xl font-display font-bold mb-2 drop-shadow-lg" style={{ color: selectedCityData.color }}>
                    {selectedCityData.aqi}
                  </div>
                  <div className="text-xl font-medium mb-1" style={{ color: selectedCityData.color }}>
                    {selectedCityData.level.label}
                  </div>
                  <p className="text-sm text-gray-400 px-4">{selectedCityData.level.description}</p>
                </div>

                <div className="mb-8 bg-white/5 border border-white/10 rounded-xl p-4">
                  <h4 className="flex items-center text-sm font-medium mb-4 text-white">
                    <Activity className="w-4 h-4 mr-2 text-blue-400" />
                    24h Forecast
                  </h4>
                  <div className="h-40">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={selectedCityData.forecast}>
                        <defs>
                          <linearGradient id="colorAqi" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={selectedCityData.color} stopOpacity={0.3}/>
                            <stop offset="95%" stopColor={selectedCityData.color} stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="time" stroke="#ffffff40" fontSize={10} tickLine={false} axisLine={false} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#030712', borderColor: '#ffffff20', borderRadius: '8px' }}
                          itemStyle={{ color: selectedCityData.color }}
                        />
                        <Area type="monotone" dataKey="aqi" stroke={selectedCityData.color} fillOpacity={1} fill="url(#colorAqi)" strokeWidth={2} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="flex items-center text-sm font-medium mb-4 text-white">
                    <Wind className="w-4 h-4 mr-2 text-purple-400" />
                    Pollutants (µg/m³)
                  </h4>
                  <div className="space-y-3">
                    {Object.entries(selectedCityData.pollutants).map(([key, val]: [string, any]) => (
                      <div key={key}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-400">{key}</span>
                          <span className="font-mono text-gray-200">{val}</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min((val / 200) * 100, 100)}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="h-full rounded-full"
                            style={{ backgroundColor: selectedCityData.color }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <h4 className="flex items-center text-sm font-medium mb-2 text-white">
                    <AlertTriangle className="w-4 h-4 mr-2 text-yellow-400" />
                    Health Advice
                  </h4>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {selectedCityData.level.advice}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Map Area */}
        <div className="flex-1 relative bg-[#0a0a0a]">
          <MapContainer 
            center={[22.5, 78.5]} 
            zoom={5} 
            zoomControl={false}
            className="w-full h-full z-0 leaflet-dark-theme"
            style={{ filter: 'invert(1) hue-rotate(180deg) brightness(0.95) contrast(1.1)' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {citiesData.map((city) => {
              const isHigh = city.aqi > 150;
              return (
                <CircleMarker
                  key={city.name}
                  center={[city.lat, city.lng]}
                  pathOptions={{ 
                    color: city.color, 
                    fillColor: city.color,
                    fillOpacity: 0.5,
                    opacity: 0.8,
                    weight: 2
                  }}
                  radius={Math.max(8, Math.min(24, city.aqi / 10))}
                  eventHandlers={{
                    click: () => {
                      setSelectedCity(city);
                    },
                  }}
                  className={isHigh ? 'animate-pulse' : ''}
                >
                  <Popup className="glass-popup">
                    <div className="text-center p-1">
                      <div className="font-bold text-gray-800">{city.name}</div>
                      <div className="text-xl font-bold" style={{ color: city.color }}>
                        AQI: {city.aqi}
                      </div>
                      <div className="text-xs text-gray-500">{city.level.label}</div>
                    </div>
                  </Popup>
                </CircleMarker>
              );
            })}
          </MapContainer>
          
          {/* Legend */}
          <div className="absolute bottom-6 right-6 z-10 glass-card bg-dark-900/80 backdrop-blur-md p-3 rounded-xl border border-white/10 hidden sm:block">
            <h4 className="text-xs font-semibold text-gray-300 mb-2 uppercase tracking-wider">AQI Scale</h4>
            <div className="flex flex-col gap-1.5">
              {AQI_LEVELS.map((level) => (
                <div key={level.label} className="flex items-center text-xs">
                  <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: level.color }} />
                  <span className="text-gray-400 w-16">{level.range[0]}-{level.range[1]}</span>
                  <span className="text-gray-200">{level.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
