"use client";

import React, { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, Wind, ArrowLeft, Activity, Info, ExternalLink, Navigation, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import CleanRouteNavigator from "@/components/CleanRouteNavigator";
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
  const [showRouteNavigator, setShowRouteNavigator] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
    // Initialize base
    const initialData = INDIAN_CITIES.map((city) => {
      const aqi = simulateAqi(city.key);
      return {
        ...city,
        aqi,
        level: getAqiLevel(aqi),
        color: getAqiColor(aqi),
        forecast: generateForecast(aqi),
        pollutants: simulatePollutants(aqi),
        isLive: false,
      };
    });
    setCitiesData(initialData);

    // Fetch real live atmospheric telemetry for key cities
    const fetchLiveTelemetry = async () => {
      try {
        const topCities = INDIAN_CITIES.slice(0, 10);
        const results = await Promise.all(
          topCities.map(async (c) => {
            try {
              const res = await fetch(`/api/aqi?city=${c.key}&lat=${c.lat}&lng=${c.lng}`);
              if (res.ok) {
                const live = await res.json();
                return {
                  ...c,
                  aqi: live.aqi,
                  level: getAqiLevel(live.aqi),
                  color: live.color || getAqiColor(live.aqi),
                  forecast: live.forecast || generateForecast(live.aqi),
                  pollutants: live.pollutants
                    ? {
                        "PM2.5": live.pollutants.pm25,
                        "PM10": live.pollutants.pm10,
                        "CO": Math.round(live.pollutants.co / 10),
                        "NO2": live.pollutants.no2,
                        "SO2": live.pollutants.so2,
                        "O3": live.pollutants.o3,
                      }
                    : simulatePollutants(live.aqi),
                  isLive: true,
                };
              }
            } catch (e) {
              console.error(e);
            }
            return null;
          })
        );

        setCitiesData((prev) =>
          prev.map((city) => {
            const liveMatch = results.find((r) => r && r.key === city.key);
            return liveMatch || city;
          })
        );
        setLastUpdated(new Date());
      } catch (err) {
        console.error("Live fetch error:", err);
      }
    };

    fetchLiveTelemetry();
    const interval = setInterval(fetchLiveTelemetry, 120000);
    return () => clearInterval(interval);
  }, []);

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
    <div className="min-h-screen bg-[#fbfbf9] flex flex-col overflow-hidden text-[#111110] font-sans">
      <Navbar />

      <div className="flex-1 flex flex-col md:flex-row h-[calc(100vh-64px)] relative">
        {/* Cal.com style Clean Sidebar */}
        <div
          className={`w-full md:w-96 bg-white border-r border-[#e5e5e0] flex flex-col h-full z-10 ${
            selectedCity ? "hidden md:flex" : "flex"
          }`}
        >
          {/* Search & Filters */}
          <div className="p-4 border-b border-[#f0f0eb]">
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a3a399] w-4 h-4" />
              <input
                type="text"
                placeholder="Search monitoring station..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#f4f4f2] border border-[#e5e5e0] rounded-xl py-2 pl-9 pr-3 text-xs text-[#111110] placeholder:text-[#a3a399] focus:outline-none focus:border-[#111110]"
              />
            </div>

            <div className="flex flex-wrap gap-1.5 mb-3">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-3 py-1 text-[11px] font-medium rounded-full border transition-all ${
                    activeFilter === f
                      ? "bg-[#111110] text-white border-[#111110] shadow-2xs font-semibold"
                      : "bg-white border-[#e2e2dc] text-[#575752] hover:bg-[#f4f4f2]"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            {/* BreatheClean Navigation Quick Button */}
            <button
              onClick={() => setShowRouteNavigator(true)}
              className="w-full bg-[#111110] hover:bg-[#2b2b27] text-white text-xs font-semibold py-2.5 px-3 rounded-xl flex items-center justify-between shadow-2xs transition-all hover:-translate-y-0.5 group"
            >
              <div className="flex items-center gap-2">
                <Navigation className="w-3.5 h-3.5 text-emerald-400 group-hover:rotate-12 transition-transform" />
                <span>BreatheClean™ Route Engine</span>
              </div>
              <span className="font-mono text-[10px] bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-800">
                -71% dose
              </span>
            </button>
          </div>

          {/* City Station List */}
          <div className="flex-1 overflow-y-auto p-2 divide-y divide-[#f0f0eb]">
            {filteredCities.map((city) => (
              <div
                key={city.name}
                onClick={() => setSelectedCity(city)}
                className="p-3 hover:bg-[#fbfbf9] cursor-pointer rounded-xl transition-colors flex items-center justify-between"
              >
                <div>
                  <div className="text-xs font-semibold text-[#111110]">{city.name}</div>
                  <div className="text-[11px] text-[#73736c] flex items-center mt-0.5">
                    <MapPin className="w-3 h-3 mr-1 text-[#a3a399]" /> {city.state}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-sm font-mono font-bold text-[#111110]">
                    {city.aqi} AQI
                  </div>
                  <div className="text-[10px] uppercase font-medium text-[#73736c]">{city.level.label}</div>
                </div>
              </div>
            ))}

            {filteredCities.length === 0 && (
              <div className="text-center py-12 text-[#a3a399] text-xs">No matching stations found</div>
            )}
          </div>

          <div className="p-3 border-t border-[#f0f0eb] text-[11px] text-center text-[#73736c] font-mono">
            CPCB telemetry synced: {lastUpdated.toLocaleTimeString()}
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
              className="absolute md:relative inset-0 md:inset-auto z-20 md:w-96 bg-white border-l border-[#e5e5e0] flex flex-col h-full shadow-lg md:shadow-none"
            >
              <div className="p-4 border-b border-[#f0f0eb] flex items-center justify-between">
                <button
                  onClick={() => setSelectedCity(null)}
                  className="text-xs font-medium text-[#575752] hover:text-[#111110] flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to Stations
                </button>
                <span className="text-xs font-semibold text-[#111110]">{selectedCityData.name}</span>
              </div>

              <div className="flex-1 overflow-y-auto p-5 space-y-5">
                <div className="text-center pb-4 border-b border-[#f0f0eb]">
                  <div className="text-5xl font-mono font-bold mb-1 text-[#111110]">
                    {selectedCityData.aqi}
                  </div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#73736c]">
                    {selectedCityData.level.label}
                  </div>
                  <p className="text-xs text-[#575752] mt-2 px-2 leading-relaxed">
                    {selectedCityData.level.description}
                  </p>
                </div>

                {/* Mini AreaChart */}
                <div className="p-4 bg-[#fbfbf9] border border-[#e5e5e0] rounded-xl shadow-2xs">
                  <div className="text-xs font-semibold text-[#111110] mb-2">24h Station Trajectory</div>
                  <div className="h-28">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={selectedCityData.forecast}>
                        <XAxis dataKey="hour" hide />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#111110",
                            border: "none",
                            borderRadius: "6px",
                            fontSize: "11px",
                            color: "#fff",
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="aqi"
                          stroke="#111110"
                          fill="#111110"
                          fillOpacity={0.12}
                          strokeWidth={2}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Pollutant Breakdown */}
                <div>
                  <div className="text-xs font-semibold text-[#111110] mb-3">Chemical Particulate Ingestion</div>
                  <div className="space-y-2">
                    {Object.entries(selectedCityData.pollutants).map(([key, val]: [string, any]) => (
                      <div key={key}>
                        <div className="flex justify-between text-[11px] mb-1">
                          <span className="text-[#73736c]">{key}</span>
                          <span className="font-mono font-medium text-[#111110]">{val} µg/m³</span>
                        </div>
                        <div className="h-1.5 w-full bg-[#f4f4f2] rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full bg-[#111110]"
                            style={{
                              width: `${Math.min((val / 200) * 100, 100)}%`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Health Advice */}
                <div className="p-3.5 bg-[#fbfbf9] border border-[#e5e5e0] rounded-xl text-xs text-[#575752] leading-relaxed">
                  <span className="font-semibold text-[#111110] block mb-1">Operational Protocol:</span>
                  {selectedCityData.level.advice}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Map Area */}
        <div className="flex-1 relative bg-[#f4f4f2]">
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
                    <div className="font-bold text-xs text-[#111110]">{city.name}</div>
                    <div className="text-base font-bold font-mono" style={{ color: city.color }}>
                      {city.aqi} AQI
                    </div>
                    <div className="text-[10px] text-[#73736c]">{city.level.label}</div>
                  </div>
                </Popup>
              </CircleMarker>
            ))}
          </MapContainer>

          {/* Floating Center Route Engine Button */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10">
            <button
              onClick={() => setShowRouteNavigator(true)}
              className="bg-[#111110] hover:bg-[#2b2b27] text-white px-5 py-2.5 rounded-full shadow-2xl border border-neutral-700 flex items-center gap-2.5 text-xs font-semibold transition-all hover:scale-105"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>BreatheClean™ Route Engine</span>
              <span className="font-mono text-[10px] bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-800">
                -71% toxic dose
              </span>
            </button>
          </div>

          {/* Scale Legend */}
          <div className="absolute bottom-5 right-5 z-10 bg-white/95 backdrop-blur-md p-3.5 rounded-xl border border-[#e5e5e0] shadow-sm hidden sm:block">
            <div className="text-[11px] font-semibold text-[#111110] mb-2 uppercase tracking-wider">
              AQI Scale Bands
            </div>
            <div className="flex flex-col gap-1.5">
              {AQI_LEVELS.map((level) => (
                <div key={level.label} className="flex items-center text-[11px]">
                  <div className="w-2.5 h-2.5 rounded-full mr-2" style={{ backgroundColor: level.color }} />
                  <span className="text-[#73736c] w-14 font-mono">
                    {level.range[0]}-{level.range[1]}
                  </span>
                  <span className="text-[#111110] font-medium">{level.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* BreatheClean Navigation Modal Popup */}
      <AnimatePresence>
        {showRouteNavigator && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setShowRouteNavigator(false)}
                className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white border border-[#e5e5e0] text-[#111110] flex items-center justify-center shadow-md hover:bg-neutral-100 transition-colors"
                aria-label="Close Navigator"
              >
                <X className="w-4 h-4" />
              </button>

              <CleanRouteNavigator />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
