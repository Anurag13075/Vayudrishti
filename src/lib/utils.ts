import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { AQI_LEVELS } from "./constants";

/** Merge Tailwind classes with clsx */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Get AQI level info based on AQI value */
export function getAqiLevel(aqi: number) {
  return (
    AQI_LEVELS.find((level) => aqi >= level.range[0] && aqi <= level.range[1]) ||
    AQI_LEVELS[AQI_LEVELS.length - 1]
  );
}

/** Get AQI color based on value */
export function getAqiColor(aqi: number): string {
  const level = getAqiLevel(aqi);
  return level.color;
}

/** Get AQI badge class based on value */
export function getAqiBadgeClass(aqi: number): string {
  const level = getAqiLevel(aqi);
  return level.badgeClass;
}

/** Format large numbers with commas */
export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(0) + "K";
  }
  return num.toLocaleString("en-IN");
}

/** Get a greeting based on time of day */
export function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
}

/** Calculate Breath Score (0-100, higher is better) from AQI */
export function calculateBreathScore(aqi: number): number {
  if (aqi <= 50) return Math.round(100 - aqi * 0.2);
  if (aqi <= 100) return Math.round(90 - (aqi - 50) * 0.6);
  if (aqi <= 150) return Math.round(60 - (aqi - 100) * 0.6);
  if (aqi <= 200) return Math.round(30 - (aqi - 150) * 0.3);
  if (aqi <= 300) return Math.round(15 - (aqi - 200) * 0.1);
  return Math.max(0, Math.round(5 - (aqi - 300) * 0.025));
}

/** Get Breath Score label */
export function getBreathScoreLabel(score: number): string {
  if (score >= 90) return "Excellent";
  if (score >= 70) return "Good";
  if (score >= 50) return "Moderate";
  if (score >= 30) return "Poor";
  if (score >= 15) return "Very Poor";
  return "Severe";
}

/** Get Breath Score color */
export function getBreathScoreColor(score: number): string {
  if (score >= 90) return "#22c55e";
  if (score >= 70) return "#10b981";
  if (score >= 50) return "#eab308";
  if (score >= 30) return "#f97316";
  if (score >= 15) return "#ef4444";
  return "#991b1b";
}

/** Simulate AQI data for a city (for demo when API is unavailable) */
export function simulateAqi(cityKey: string): number {
  const baseAqi: Record<string, number> = {
    delhi: 185,
    mumbai: 95,
    bengaluru: 72,
    kolkata: 145,
    chennai: 68,
    hyderabad: 88,
    ahmedabad: 120,
    pune: 78,
    jaipur: 135,
    lucknow: 165,
    kanpur: 195,
    patna: 175,
    varanasi: 155,
    guwahati: 85,
    chandigarh: 110,
    bhopal: 105,
    visakhapatnam: 62,
    agra: 148,
    ghaziabad: 210,
    noida: 198,
  };

  const base = baseAqi[cityKey] || 100;
  // Add some realistic variation (±20%)
  const variation = Math.sin(Date.now() / 60000 + cityKey.length) * base * 0.2;
  return Math.max(10, Math.round(base + variation));
}

/** Generate simulated 24-hour forecast */
export function generateForecast(currentAqi: number): { hour: string; aqi: number }[] {
  const forecast = [];
  const now = new Date();

  for (let i = 0; i < 24; i++) {
    const hour = new Date(now.getTime() + i * 3600000);
    const h = hour.getHours();

    // AQI tends to be worse during rush hours (8-10am, 5-8pm) and better at 2-4am
    let modifier = 1;
    if (h >= 8 && h <= 10) modifier = 1.3;
    else if (h >= 17 && h <= 20) modifier = 1.4;
    else if (h >= 2 && h <= 5) modifier = 0.7;
    else if (h >= 11 && h <= 15) modifier = 0.9;

    const variation = Math.sin(i * 0.5) * currentAqi * 0.1;
    const aqi = Math.max(10, Math.round(currentAqi * modifier + variation));

    forecast.push({
      hour: hour.toLocaleTimeString("en-IN", { hour: "2-digit", hour12: true }),
      aqi,
    });
  }

  return forecast;
}

/** Fetch real AQI data from WAQI API */
export async function fetchAqiData(city: string): Promise<number | null> {
  try {
    const token = process.env.NEXT_PUBLIC_WAQI_TOKEN || "demo";
    const response = await fetch(
      `https://api.waqi.info/feed/${city}/?token=${token}`,
      { next: { revalidate: 300 } } as any // Cache for 5 minutes
    );
    const data = await response.json();
    if (data.status === "ok" && data.data?.aqi) {
      return typeof data.data.aqi === "number" ? data.data.aqi : null;
    }
    return null;
  } catch {
    return null;
  }
}

/** Debounce function */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | undefined;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}
