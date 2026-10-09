import { NextRequest, NextResponse } from "next/server";
import { simulateAqi, getAqiLevel } from "@/lib/utils";

// Intelligent response generator for VayuDrishti WhatsApp Bot
function generateBotReply(message: string): { reply: string; action?: string } {
  const query = message.toLowerCase().trim();

  // School Assembly Query
  if (query.includes("school") || query.includes("assembly") || query.includes("kid") || query.includes("children")) {
    const aqi = 245;
    return {
      reply: `🏫 *VayuDrishti School Sentinel Alert*\n\n` +
        `⚠️ *Thermal Inversion Warning Active (06:00 - 08:15 AM)*\n` +
        `Current Ground AQI: *${aqi} (Severe)*\n\n` +
        `📋 *Official Protocol:*\n` +
        `• *Morning Assembly:* Relocate indoors to ventilated auditorium.\n` +
        `• *Recess & Sports:* Suspend outdoor athletics for Classes Pre-K through 8.\n` +
        `• *School Transit:* Ensure bus windows are sealed shut.\n\n` +
        `💡 *Recommendation:* Ground-level inversion lifts after 08:30 AM (-42% particulate load). Shift outdoor activity to 09:00 AM.`,
      action: "school_alert",
    };
  }

  // Jogging / Running / Exercise Query
  if (query.includes("run") || query.includes("jog") || query.includes("exercise") || query.includes("walk") || query.includes("gym")) {
    return {
      reply: `🏃 *Respiratory Exertion Advisory*\n\n` +
        `Current Local AQI: *212 (Unhealthy)*\n` +
        `Minute-Ventilation at 140 BPM: *~38 Liters/min* (5.4x resting volume)\n\n` +
        `🚨 *Bio-Telemetry Verdict:* *Outdoor Cardio Not Recommended*\n` +
        `Running 5 km right now will deliver *~29.4 µg PM2.5* directly into deep pulmonary alveoli (equivalent to *1.3 cigarettes* in 30 mins).\n\n` +
        `🌿 *Alternatives:*\n` +
        `1. Move workout indoors with HEPA filtration.\n` +
        `2. Wait for the *Clean Window at 03:30 PM - 05:00 PM* (Forecast: AQI 118).\n` +
        `3. If running outdoors is mandatory, choose green tree canopy parks over roadside routes.`,
      action: "run_advisory",
    };
  }

  // Route / Commute Query
  if (query.includes("route") || query.includes("commute") || query.includes("travel") || query.includes("drive") || query.includes("traffic") || query.includes("metro")) {
    return {
      reply: `🗺️ *BreatheClean™ Route Intelligence*\n\n` +
        `Comparing commuter corridors for your trip:\n\n` +
        `🚗 *Route A (Fastest Highway):* 24 mins | *44.6 µg PM2.5* (Heavy diesel soot)\n` +
        `🌿 *Route B (Green Canopy Corridor):* 30 mins (+6m) | *13.2 µg PM2.5* (*-70% toxic burden*)\n` +
        `🚇 *Route C (Underground Metro):* 28 mins | *8.4 µg PM2.5* (*-81% toxic burden*)\n\n` +
        `💡 *In-Cabin Protection Tip:* Switch your vehicle AC to *Internal Air Recirculation* mode immediately. This reduces in-cabin particulate penetration by 80% within 90 seconds!`,
      action: "route_advice",
    };
  }

  // Heart Rate / Watch / Biometric Query
  if (query.includes("watch") || query.includes("heart") || query.includes("pulse") || query.includes("bluetooth") || query.includes("score")) {
    return {
      reply: `⌚ *Hardware Bio-Telemetry Sync*\n\n` +
        `VayuDrishti pairs with Apple Watch, WearOS, Garmin, and Smartphone sensors via W3C Web Bluetooth GATT (0x180D) and DeviceMotion.\n\n` +
        `🫁 *How Your Breath Score Works:*\n` +
        `• Ambient AQI × Minute-Ventilation (VE) × Mask Filtration Factor = Inhaled Particulate Burden.\n` +
        `• 1 Cigarette equivalent = *22 µg of bloodstream PM2.5*.\n` +
        `• Connect your watch at *vayudrishti.in/breathe* to monitor your live alveolar reserve in real time.`,
      action: "bio_sync",
    };
  }

  // General or City AQI query
  const cityMatch = ["delhi", "mumbai", "bengaluru", "kolkata", "chennai", "hyderabad", "pune", "ahmedabad", "patna", "lucknow"].find(c => query.includes(c));
  if (cityMatch) {
    const aqi = simulateAqi(cityMatch);
    const level = getAqiLevel(aqi);
    return {
      reply: `📍 *Real-Time Telemetry: ${cityMatch.toUpperCase()}*\n\n` +
        `• Current AQI: *${aqi}* (${level.label})\n` +
        `• Primary Pollutant: *PM2.5 (${Math.round(aqi * 0.82)} µg/m³)*\n` +
        `• Health Impact: ${level.description}\n\n` +
        `🛡️ *Immediate Defense:* N95 mask advised if outdoor exposure exceeds 20 minutes. Keep home/office windows closed during early morning inversion.`,
      action: "city_aqi",
    };
  }

  // Default interactive guidance
  return {
    reply: `👋 *Namaste from VayuDrishti Air Sentinel!*\n\n` +
      `I am your 24/7 personal respiratory defense bot. Ask me anything:\n\n` +
      `1️⃣ *"Can I run outdoors right now?"*\n` +
      `2️⃣ *"School assembly status for tomorrow morning?"*\n` +
      `3️⃣ *"Cleanest route to office?"*\n` +
      `4️⃣ *"What is the AQI in Delhi / Mumbai?"*\n` +
      `5️⃣ *"How do I connect my smartwatch?"*\n\n` +
      `Type your question or send a city name to get live defense guidance!`,
    action: "help",
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const message = body.message || body.Body || "";
    const from = body.from || body.From || "user";

    const response = generateBotReply(message);

    // If incoming request is from Twilio Webhook (URL-encoded or twilio format)
    if (body.From && body.Body) {
      const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Message>${response.reply}</Message>
</Response>`;
      return new NextResponse(twiml, {
        headers: { "Content-Type": "text/xml" },
      });
    }

    return NextResponse.json({
      success: true,
      sender: "VayuDrishti Bot 🟢",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      ...response,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to process message" },
      { status: 500 }
    );
  }
}
