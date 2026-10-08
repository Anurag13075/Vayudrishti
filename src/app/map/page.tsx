"use client";

import React, { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, Wind, ArrowLeft, Activity, Info } from "lucide-react";
import Navbar from "@/components/Navbar";
import { INDIAN_CITIES, AQI_LEVELS } from "@/lib/constants";
import { simulateAqi, getAqiLevel, getAqiColor, generateForecast } from "@/lib/utils";
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import "leaflet/dist/leaflet.css";

const MapContainer = dynamic(() => import("react-leaflet").then((m) => m.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((m) => m.TileLayer), { ssr: false });
const CircleMarker = dynamic(() => import("react-leaflet").then((m) => m.CircleMarker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then((m) => m.Popup), { ssr: false });

const simulatePollutants = (aqi: number) => ({
  "PM2.5": Math.round(aqi * 0.8),
  "PM10": Math.round(aqi * 1.2),
  "O3": Math.round(aqi * 0.5),
  "NO2": Math.round(aqi * 0.3),
  "SO2": Math.round(aqi * 0.1),
  "CO": Math.round(aqi * 0.05),
});

export default function InteractiveMapPage() {
  const [isClient, setIsClient] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedCity, setSelectedCity] = useState<(typeof INDIAN_CITIES)[0] | null>(null);
  const [citiesData, setCitiesData] = useState<any[]>([]);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  useEffect(() => {
    setIsClient(true);
    updateCityData();
    const interval = setInterval(updateCityData, 60000);
    return () => clearInterval(interval);
  }, []);

  const updateCityData = () => {
    const data = INDIAN_CITIES.map((city) => {
      const aqi = simulateAqi(city.key);
      return {
        ...city,
        aqi,
        level: getAqiLevel(aqi),
        color: getAqiColor(aqi),
        forecast: generateForecast(aqi),
        pollutants: simulatePollutants(aqi),
      };
    });
    setCitiesData(data);
    setLastUpdated(new Date());
  };

  const filteredCities = useMemo(() => {
    return citiesData.filter((city) => {
      const matchesSearch =
        city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        city.state.toLowerCase().includes(searchQuery.toLowerCase());
      if (!matchesSearch) return false;
      if (activeFilter === "All") return true;
      return city.level.label.toLowerCase() === activeFilter.toLowerCase();
    });
  }, [citiesData, searchQuery, activeFilter]);

  const selectedCityData = useMemo(() => {
    if (!selectedCity) return null;
    return citiesData.find((c) => c.name === selectedCity.name);
  }, [selectedCity, citiesData]);

  if (!isClient) return null;

  const filters = ["All", "Good", "Moderate", "Unhealthy", "Hazardous"];

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col overflow-hidden text-neutral-900 font-sans">
      <Navbar />

      <div className="flex-1 flex flex-col md:flex-row h-[calc(100vh-64px)] relative">
        {/* Beside-style Clean Sidebar */}
        <div
          className={`w-full md:w-96 bg-white border-r border-neutral-200 flex flex-col h-full z-10 ${
            selectedCity ? "hidden md:flex" : "flex"
          }`}
        >
          {/* Search & Filters */}
          <div className="p-4 border-b border-neutral-100">
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search monitoring station..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-200 rounded-lg py-2 pl-9 pr-3 text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900"
              />
            </div>

            <div className="flex flex-wrap gap-1.5">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-2.5 py-1 text-[11px] font-medium rounded-full border transition-all ${
                    activeFilter === f
                      ? "bg-neutral-900 text-white border-neutral-900"
                      : "bg-white border-neutral-200 text-neutral-600 hover:bg-neutral-50"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* City Station List */}
          <div className="flex-1 overflow-y-auto p-2 divide-y divide-neutral-100">
            {filteredCities.map((city) => (
              <div
                key={city.name}
                onClick={() => setSelectedCity(city)}
                className="p-3 hover:bg-neutral-50 cursor-pointer rounded-lg transition-colors flex items-center justify-between"
              >
                <div>
                  <div className="text-xs font-semibold text-neutral-900">{city.name}</div>
                  <div className="text-[11px] text-neutral-400 flex items-center mt-0.5">
                    <MapPin className="w-3 h-3 mr-1 text-neutral-300" /> {city.state}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-sm font-mono font-bold" style={{ color: city.color }}>
                    {city.aqi} AQI
                  </div>
                  <div className="text-[10px] uppercase font-medium text-neutral-400">{city.level.label}</div>
                </div>
              </div>
            ))}

            {filteredCities.length === 0 && (
              <div className="text-center py-12 text-neutral-400 text-xs">No matching stations found</div>
            )}
          </div>

          <div className="p-3 border-t border-neutral-100 text-[11px] text-center text-neutral-400 font-mono">
            Telemetry refreshed: {lastUpdated.toLocaleTimeString()}
          </div>
        </div>

        {/* Selected City Detail Overlay */}
        <AnimatePresence>
          {selectedCityData && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="absolute md:relative inset-0 md:inset-auto z-20 md:w-96 bg-white border-l border-neutral-200 flex flex-col h-full shadow-lg md:shadow-none"
            >
              <div className="p-4 border-b border-neutral-100 flex items-center justify-between">
                <button
                  onClick={() => setSelectedCity(null)}
                  className="text-xs font-medium text-neutral-600 hover:text-neutral-900 flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to Stations
                </button>
                <span className="text-xs font-semibold text-neutral-900">{selectedCityData.name}</span>
              </div>

              <div className="flex-1 overflow-y-auto p-5 space-y-5">
                <div className="text-center pb-4 border-b border-neutral-100">
                  <div className="text-5xl font-mono font-bold mb-1" style={{ color: selectedCityData.color }}>
                    {selectedCityData.aqi}
                  </div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-neutral-700">
                    {selectedCityData.level.label}
                  </div>
                  <p className="text-xs text-neutral-500 mt-2 px-2 leading-relaxed">
                    {selectedCityData.level.description}
                  </p>
                </div>

                {/* Mini AreaChart */}
                <div className="p-4 bg-neutral-50 border border-neutral-200/70 rounded-xl">
                  <div className="text-xs font-semibold text-neutral-900 mb-2">24h Station Trajectory</div>
                  <div className="h-28">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={selectedCityData.forecast}>
                        <XAxis dataKey="hour" hide />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#09090b",
                            border: "none",
                            borderRadius: "6px",
                            fontSize: "11px",
                            color: "#fff",
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="aqi"
                          stroke={selectedCityData.color}
                          fill={selectedCityData.color}
                          fillOpacity={0.15}
                          strokeWidth={2}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Pollutant Breakdown */}
                <div>
                  <div className="text-xs font-semibold text-neutral-900 mb-3">Chemical Particulate Ingestion</div>
                  <div className="space-y-2">
                    {Object.entries(selectedCityData.pollutants).map(([key, val]: [string, any]) => (
                      <div key={key}>
                        <div className="flex justify-between text-[11px] mb-1">
                          <span className="text-neutral-500">{key}</span>
                          <span className="font-mono font-medium text-neutral-900">{val} µg/m³</span>
                        </div>
                        <div className="h-1.5 w-full bg-neutral-100 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${Math.min((val / 200) * 100, 100)}%`,
                              backgroundColor: selectedCityData.color,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Health Advice */}
                <div className="p-3.5 bg-neutral-50 border border-neutral-200/70 rounded-xl text-xs text-neutral-600 leading-relaxed">
                  <span className="font-semibold text-neutral-900 block mb-1">Operational Protocol:</span>
                  {selectedCityData.level.advice}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Map Area */}
        <div className="flex-1 relative bg-neutral-100">
          <MapContainer
            center={[22.5, 78.5]}
            zoom={5}
            zoomControl={false}
            className="w-full h-full z-0"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {citiesData.map((city) => (
              <CircleMarker
                key={city.name}
                center={[city.lat, city.lng]}
                pathOptions={{
                  color: city.color,
                  fillColor: city.color,
                  fillOpacity: 0.6,
                  opacity: 0.9,
                  weight: 2,
                }}
                radius={Math.max(7, Math.min(20, city.aqi / 14))}
                eventHandlers={{
                  click: () => {
                    setSelectedCity(city);
                  },
                }}
              >
                <Popup>
                  <div className="text-center p-1">
                    <div className="font-bold text-xs text-neutral-900">{city.name}</div>
                    <div className="text-base font-bold font-mono" style={{ color: city.color }}>
                      {city.aqi} AQI
                    </div>
                    <div className="text-[10px] text-neutral-500">{city.level.label}</div>
                  </div>
                </Popup>
              </CircleMarker>
            ))}
          </MapContainer>

          {/* Scale Legend */}
          <div className="absolute bottom-5 right-5 z-10 bg-white/95 backdrop-blur-md p-3 rounded-xl border border-neutral-200 shadow-sm hidden sm:block">
            <div className="text-[11px] font-semibold text-neutral-700 mb-2 uppercase tracking-wider">
              AQI Scale Bands
            </div>
            <div className="flex flex-col gap-1.5">
              {AQI_LEVELS.map((level) => (
                <div key={level.label} className="flex items-center text-[11px]">
                  <div className="w-2.5 h-2.5 rounded-full mr-2" style={{ backgroundColor: level.color }} />
                  <span className="text-neutral-400 w-14 font-mono">
                    {level.range[0]}-{level.range[1]}
                  </span>
                  <span className="text-neutral-700 font-medium">{level.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
