// AQI Level Definitions
export const AQI_LEVELS = [
  {
    range: [0, 50],
    label: "Good",
    color: "#22c55e",
    bgColor: "rgba(34, 197, 94, 0.15)",
    borderColor: "rgba(34, 197, 94, 0.3)",
    emoji: "😊",
    description: "Air quality is satisfactory, and air pollution poses little or no risk.",
    advice: "Enjoy outdoor activities! Perfect day for a run or cycling.",
    badgeClass: "aqi-badge-good",
  },
  {
    range: [51, 100],
    label: "Moderate",
    color: "#eab308",
    bgColor: "rgba(234, 179, 8, 0.15)",
    borderColor: "rgba(234, 179, 8, 0.3)",
    emoji: "😐",
    description: "Air quality is acceptable. However, there may be a risk for some people.",
    advice: "Sensitive individuals should consider reducing prolonged outdoor exertion.",
    badgeClass: "aqi-badge-moderate",
  },
  {
    range: [101, 150],
    label: "Unhealthy for Sensitive Groups",
    color: "#f97316",
    bgColor: "rgba(249, 115, 22, 0.15)",
    borderColor: "rgba(249, 115, 22, 0.3)",
    emoji: "😷",
    description: "Members of sensitive groups may experience health effects.",
    advice: "Children, elderly, and those with respiratory issues should limit outdoor activity.",
    badgeClass: "aqi-badge-sensitive",
  },
  {
    range: [151, 200],
    label: "Unhealthy",
    color: "#ef4444",
    bgColor: "rgba(239, 68, 68, 0.15)",
    borderColor: "rgba(239, 68, 68, 0.3)",
    emoji: "🤢",
    description: "Everyone may begin to experience health effects.",
    advice: "Everyone should reduce prolonged outdoor exertion. Wear N95 masks if going outside.",
    badgeClass: "aqi-badge-unhealthy",
  },
  {
    range: [201, 300],
    label: "Very Unhealthy",
    color: "#8b5cf6",
    bgColor: "rgba(139, 92, 246, 0.15)",
    borderColor: "rgba(139, 92, 246, 0.3)",
    emoji: "🚨",
    description: "Health alert: everyone may experience more serious health effects.",
    advice: "Avoid all outdoor physical activity. Keep windows closed. Use air purifiers indoors.",
    badgeClass: "aqi-badge-very",
  },
  {
    range: [301, 500],
    label: "Hazardous",
    color: "#991b1b",
    bgColor: "rgba(153, 27, 27, 0.15)",
    borderColor: "rgba(153, 27, 27, 0.3)",
    emoji: "☠️",
    description: "Health warning of emergency conditions. The entire population is likely to be affected.",
    advice: "STAY INDOORS. Seal windows. Run air purifiers on max. Avoid all exposure.",
    badgeClass: "aqi-badge-hazardous",
  },
] as const;

// Major Indian Cities with coordinates and typical data
export const INDIAN_CITIES = [
  { name: "Delhi", state: "Delhi", lat: 28.6139, lng: 77.209, population: "32M", key: "delhi" },
  { name: "Mumbai", state: "Maharashtra", lat: 19.076, lng: 72.8777, population: "21M", key: "mumbai" },
  { name: "Bengaluru", state: "Karnataka", lat: 12.9716, lng: 77.5946, population: "13M", key: "bengaluru" },
  { name: "Kolkata", state: "West Bengal", lat: 22.5726, lng: 88.3639, population: "15M", key: "kolkata" },
  { name: "Chennai", state: "Tamil Nadu", lat: 13.0827, lng: 80.2707, population: "11M", key: "chennai" },
  { name: "Hyderabad", state: "Telangana", lat: 17.385, lng: 78.4867, population: "10M", key: "hyderabad" },
  { name: "Ahmedabad", state: "Gujarat", lat: 23.0225, lng: 72.5714, population: "8M", key: "ahmedabad" },
  { name: "Pune", state: "Maharashtra", lat: 18.5204, lng: 73.8567, population: "7M", key: "pune" },
  { name: "Jaipur", state: "Rajasthan", lat: 26.9124, lng: 75.7873, population: "4M", key: "jaipur" },
  { name: "Lucknow", state: "Uttar Pradesh", lat: 26.8467, lng: 80.9462, population: "4M", key: "lucknow" },
  { name: "Kanpur", state: "Uttar Pradesh", lat: 26.4499, lng: 80.3319, population: "3M", key: "kanpur" },
  { name: "Patna", state: "Bihar", lat: 25.6093, lng: 85.1376, population: "2.5M", key: "patna" },
  { name: "Varanasi", state: "Uttar Pradesh", lat: 25.3176, lng: 82.9739, population: "1.8M", key: "varanasi" },
  { name: "Guwahati", state: "Assam", lat: 26.1445, lng: 91.7362, population: "1.1M", key: "guwahati" },
  { name: "Chandigarh", state: "Chandigarh", lat: 30.7333, lng: 76.7794, population: "1.2M", key: "chandigarh" },
  { name: "Bhopal", state: "Madhya Pradesh", lat: 23.2599, lng: 77.4126, population: "2M", key: "bhopal" },
  { name: "Visakhapatnam", state: "Andhra Pradesh", lat: 17.6868, lng: 83.2185, population: "2M", key: "visakhapatnam" },
  { name: "Agra", state: "Uttar Pradesh", lat: 27.1767, lng: 78.0081, population: "2M", key: "agra" },
  { name: "Ghaziabad", state: "Uttar Pradesh", lat: 28.6692, lng: 77.4538, population: "2.4M", key: "ghaziabad" },
  { name: "Noida", state: "Uttar Pradesh", lat: 28.5355, lng: 77.391, population: "0.7M", key: "noida" },
] as const;

// Impact Statistics
export const IMPACT_STATS = [
  {
    value: 2180000,
    suffix: "",
    label: "Indians die from air pollution every year",
    source: "The Lancet, 2024",
  },
  {
    value: 5.3,
    suffix: " years",
    label: "Average life expectancy lost to air pollution",
    source: "EPIC, University of Chicago",
  },
  {
    value: 21,
    suffix: " of 30",
    label: "Most polluted cities worldwide are in India",
    source: "IQAir World Air Quality Report",
  },
  {
    value: 480,
    suffix: "+",
    label: "Peak AQI in Delhi — 'Hazardous' starts at 300",
    source: "CPCB, Winter 2024",
  },
];

// Feature Cards
export const FEATURES = [
  {
    title: "Real-Time AQI Map",
    description: "Interactive map with live air quality data from 1000+ monitoring stations across India. See pollution hotspots, wind patterns, and city-level breakdowns.",
    icon: "Map",
    gradient: "from-emerald-500 to-teal-500",
    href: "/map",
  },
  {
    title: "Personal Breath Score",
    description: "Track your daily pollution exposure like a fitness tracker. Get a personal 'Breath Score' based on where you are and how long you've been outside.",
    icon: "Wind",
    gradient: "from-blue-500 to-cyan-500",
    href: "/breathe",
  },
  {
    title: "AI Health Advisor",
    description: "Get personalized health recommendations powered by AI. Based on current AQI, your health profile, and local conditions — not generic advice.",
    icon: "Brain",
    gradient: "from-violet-500 to-purple-500",
    href: "/advisor",
  },
  {
    title: "School Safety Dashboard",
    description: "Should your kids play outside today? Real-time safety alerts for schools with clear YES/NO decisions and alternative indoor activity suggestions.",
    icon: "GraduationCap",
    gradient: "from-orange-500 to-amber-500",
    href: "/schools",
  },
  {
    title: "Smart Day Planner",
    description: "AI predicts AQI for the next 24 hours and suggests the best windows for outdoor exercise, commuting, and activities. Plan your day around clean air.",
    icon: "Calendar",
    gradient: "from-pink-500 to-rose-500",
    href: "/breathe",
  },
  {
    title: "Community Reports",
    description: "Report pollution sources — stubble burning, construction dust, factory emissions. Crowdsourced data creates accountability and drives local action.",
    icon: "Users",
    gradient: "from-red-500 to-orange-500",
    href: "/report",
  },
];

// Health Recommendations by AQI Level
export const HEALTH_RECOMMENDATIONS = {
  good: {
    outdoor: "✅ All outdoor activities are safe",
    exercise: "✅ Great day for running, cycling, or sports",
    windows: "✅ Open windows for fresh air",
    mask: "No mask needed",
    children: "✅ Safe for all children's activities",
    elderly: "✅ Safe for elderly to go outside",
  },
  moderate: {
    outdoor: "⚠️ Most outdoor activities are fine",
    exercise: "⚠️ Sensitive individuals should moderate intense exercise",
    windows: "✅ Windows can remain open",
    mask: "Optional for sensitive individuals",
    children: "⚠️ Watch for symptoms in asthmatic children",
    elderly: "⚠️ Limit prolonged outdoor exposure",
  },
  sensitive: {
    outdoor: "⚠️ Reduce prolonged outdoor exertion",
    exercise: "❌ Avoid intense outdoor exercise",
    windows: "⚠️ Consider keeping windows closed",
    mask: "Recommended for sensitive groups outdoors",
    children: "❌ Keep children indoors during peak hours",
    elderly: "❌ Elderly should stay indoors",
  },
  unhealthy: {
    outdoor: "❌ Everyone should reduce outdoor activity",
    exercise: "❌ Move all exercise indoors",
    windows: "❌ Keep all windows closed",
    mask: "N95 mask required outdoors",
    children: "❌ No outdoor activities for children",
    elderly: "❌ Elderly must stay indoors",
  },
  very: {
    outdoor: "🚨 Avoid ALL outdoor activity",
    exercise: "🚨 Indoor exercise only with air purifier",
    windows: "🚨 Seal windows and doors",
    mask: "N95 mask mandatory if going out",
    children: "🚨 Schools should suspend outdoor activities",
    elderly: "🚨 Emergency — stay indoors, run purifiers",
  },
  hazardous: {
    outdoor: "☠️ STAY INDOORS — Health emergency",
    exercise: "☠️ No exercise — even indoors without purifiers",
    windows: "☠️ Seal all openings, use wet towels on gaps",
    mask: "N95/P100 required. Avoid going out entirely",
    children: "☠️ Schools should close or go online",
    elderly: "☠️ Medical alert — monitor for symptoms",
  },
};

// Navigation Items
export const NAV_ITEMS = [
  { label: "Live Map", href: "/map", icon: "Map" },
  { label: "Breath Score", href: "/breathe", icon: "Wind" },
  { label: "AI Advisor", href: "/advisor", icon: "Brain" },
  { label: "Schools", href: "/schools", icon: "GraduationCap" },
  { label: "Report", href: "/report", icon: "AlertTriangle" },
];
