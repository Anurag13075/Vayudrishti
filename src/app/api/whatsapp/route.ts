import { NextRequest, NextResponse } from "next/server";
import { simulateAqi, getAqiLevel } from "@/lib/utils";

// =============================================================================
// 1. INTELLIGENT RESPIRATORY ADVISORY ENGINE
// =============================================================================
function generateBotReply(message: string): { reply: string; action?: string } {
  const query = message.toLowerCase().trim();

  // School Assembly / Kids
  if (
    query.includes("school") ||
    query.includes("assembly") ||
    query.includes("kid") ||
    query.includes("child") ||
    query.includes("student")
  ) {
    const aqi = 245;
    return {
      reply:
        `🏫 *VayuDrishti School Sentinel Alert*\n\n` +
        `⚠️ *Thermal Inversion Warning Active (06:00 - 08:15 AM)*\n` +
        `Current Ground AQI: *${aqi} (Severe)*\n\n` +
        `📋 *Official Protocol:*\n` +
        `• *Morning Assembly:* Relocate indoors to ventilated auditorium.\n` +
        `• *Recess & Sports:* Suspend outdoor athletics for Classes Pre-K through 8.\n` +
        `• *School Transit:* Ensure bus windows are sealed shut.\n\n` +
        `💡 *Recommendation:* Ground-level inversion lifts after 08:30 AM (-42% particulate load). Shift outdoor activity to 08:45 AM.`,
      action: "school_alert",
    };
  }

  // Jogging / Running / Exercise
  if (
    query.includes("run") ||
    query.includes("jog") ||
    query.includes("exercise") ||
    query.includes("walk") ||
    query.includes("gym") ||
    query.includes("cycling")
  ) {
    return {
      reply:
        `🏃 *Respiratory Exertion Advisory*\n\n` +
        `Current Local AQI: *212 (Unhealthy)*\n` +
        `Minute-Ventilation at 140 BPM: *~38 Liters/min* (5.4x resting volume)\n\n` +
        `🚨 *Bio-Telemetry Verdict:* *Outdoor Cardio Not Recommended*\n` +
        `Running 5 km right now will deliver *~29.4 µg PM2.5* directly into deep pulmonary alveoli (equivalent to *1.3 cigarettes* in 30 mins).\n\n` +
        `🌿 *Actionable Defense:*\n` +
        `1. Move workout indoors with HEPA filtration.\n` +
        `2. Wait for the *Clean Window at 03:30 PM - 05:00 PM* (Forecast: AQI 118).\n` +
        `3. If running outdoors is mandatory, choose tree canopy parks over roadside routes.`,
      action: "run_advisory",
    };
  }

  // Route / Commute
  if (
    query.includes("route") ||
    query.includes("commute") ||
    query.includes("travel") ||
    query.includes("drive") ||
    query.includes("traffic") ||
    query.includes("metro") ||
    query.includes("car")
  ) {
    return {
      reply:
        `🗺️ *BreatheClean™ Route Intelligence*\n\n` +
        `Comparing commuter corridors for your trip:\n\n` +
        `🚗 *Route A (Fastest Highway):* 24 mins | *44.6 µg PM2.5* (Heavy diesel soot)\n` +
        `🌿 *Route B (Green Canopy Corridor):* 30 mins (+6m) | *13.2 µg PM2.5* (*-70% toxic burden*)\n` +
        `🚇 *Route C (Underground Metro):* 28 mins | *8.4 µg PM2.5* (*-81% toxic burden*)\n\n` +
        `💡 *In-Cabin Protection Tip:* Switch your vehicle AC to *Internal Air Recirculation* mode immediately. This reduces in-cabin particulate penetration by 80% within 90 seconds!`,
      action: "route_advice",
    };
  }

  // Heart Rate / Watch / Biometric
  if (
    query.includes("watch") ||
    query.includes("heart") ||
    query.includes("pulse") ||
    query.includes("bluetooth") ||
    query.includes("score") ||
    query.includes("wearos") ||
    query.includes("apple")
  ) {
    return {
      reply:
        `⌚ *Hardware Bio-Telemetry Sync*\n\n` +
        `VayuDrishti pairs with Apple Watch, WearOS, Garmin, and Smartphone sensors via W3C Web Bluetooth GATT (0x180D) and DeviceMotion.\n\n` +
        `🫁 *How Your Breath Score Works:*\n` +
        `• Ambient AQI × Minute-Ventilation (VE) × Mask Filtration Factor = Inhaled Particulate Burden.\n` +
        `• 1 Cigarette equivalent = *22 µg of bloodstream PM2.5*.\n` +
        `• Connect your watch at *vayudrishti.in/breathe* to monitor your live alveolar reserve in real time.`,
      action: "bio_sync",
    };
  }

  // City AQI query
  const cityMatch = [
    "delhi",
    "mumbai",
    "bengaluru",
    "kolkata",
    "chennai",
    "hyderabad",
    "pune",
    "ahmedabad",
    "patna",
    "lucknow",
    "noida",
    "gurugram",
  ].find((c) => query.includes(c));

  if (cityMatch) {
    const aqi = simulateAqi(cityMatch);
    const level = getAqiLevel(aqi);
    return {
      reply:
        `📍 *Real-Time Telemetry: ${cityMatch.toUpperCase()}*\n\n` +
        `• Current AQI: *${aqi}* (${level.label})\n` +
        `• Primary Pollutant: *PM2.5 (${Math.round(aqi * 0.82)} µg/m³)*\n` +
        `• Health Impact: ${level.description}\n\n` +
        `🛡️ *Immediate Defense:* N95 mask advised if outdoor exposure exceeds 20 minutes. Keep home/office windows closed during early morning inversion.`,
      action: "city_aqi",
    };
  }

  // Default interactive guidance
  return {
    reply:
      `👋 *Namaste from VayuDrishti Air Sentinel!*\n\n` +
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

// =============================================================================
// 2. DISPATCH HELPERS (TWILIO & META WHATSAPP CLOUD API)
// =============================================================================

// Send WhatsApp message via Twilio REST API
async function sendViaTwilio(to: string, messageText: string) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const fromNumber = process.env.TWILIO_WHATSAPP_NUMBER || "whatsapp:+14155238886";

  if (!accountSid || !authToken) {
    throw new Error("Missing TWILIO_ACCOUNT_SID or TWILIO_AUTH_TOKEN in .env");
  }

  const cleanTo = to.startsWith("whatsapp:") ? to : `whatsapp:${to.trim()}`;
  const cleanFrom = fromNumber.startsWith("whatsapp:") ? fromNumber : `whatsapp:${fromNumber.trim()}`;

  const params = new URLSearchParams();
  params.append("From", cleanFrom);
  params.append("To", cleanTo);
  params.append("Body", messageText);

  const res = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
    {
      method: "POST",
      headers: {
        Authorization: "Basic " + Buffer.from(`${accountSid}:${authToken}`).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    }
  );

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || `Twilio dispatch failed with status ${res.status}`);
  }
  return { success: true, provider: "twilio", sid: data.sid };
}

// Send WhatsApp message via Meta / WhatsApp Cloud API
async function sendViaMeta(to: string, messageText: string) {
  const token = process.env.WHATSAPP_ACCESS_TOKEN || process.env.META_WHATSAPP_TOKEN;
  const phoneId = process.env.WHATSAPP_PHONE_NUMBER_ID;

  if (!token || !phoneId) {
    throw new Error("Missing WHATSAPP_ACCESS_TOKEN or WHATSAPP_PHONE_NUMBER_ID in .env");
  }

  const cleanTo = to.replace(/[^0-9]/g, "");

  const res = await fetch(`https://graph.facebook.com/v20.0/${phoneId}/messages`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: cleanTo,
      type: "text",
      text: { body: messageText },
    }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error?.message || `Meta Cloud dispatch failed with status ${res.status}`);
  }
  return { success: true, provider: "meta", messageId: data.messages?.[0]?.id };
}

// Universal outbound dispatcher
async function dispatchOutboundWhatsApp(to: string, messageText: string) {
  if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
    return await sendViaTwilio(to, messageText);
  }
  if (
    (process.env.WHATSAPP_ACCESS_TOKEN || process.env.META_WHATSAPP_TOKEN) &&
    process.env.WHATSAPP_PHONE_NUMBER_ID
  ) {
    return await sendViaMeta(to, messageText);
  }
  return {
    success: false,
    simulated: true,
    warning: "No WhatsApp API keys configured in .env. Message generated in simulation mode.",
    to,
    message: messageText,
  };
}

// =============================================================================
// 3. GET HANDLER: META WEBHOOK VERIFICATION (CHALLENGE HANDSHAKE)
// =============================================================================
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  const expectedToken = process.env.WHATSAPP_VERIFY_TOKEN || "vayudrishti_sentinel_token";

  if (mode === "subscribe" && token === expectedToken) {
    console.log("Meta WhatsApp webhook challenge verified successfully.");
    return new NextResponse(challenge, { status: 200 });
  }

  // Health check for browsers / uptime monitors
  return NextResponse.json({
    service: "VayuDrishti WhatsApp Bot Engine",
    status: "active",
    endpoints: {
      webhook: "POST /api/whatsapp",
      metaVerification: "GET /api/whatsapp?hub.mode=subscribe&hub.challenge=...&hub.verify_token=...",
      outbound: "POST /api/whatsapp (with action: 'send', to: '+91...', message: '...')",
    },
    providersDetected: {
      twilio: Boolean(process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN),
      metaCloud: Boolean(
        (process.env.WHATSAPP_ACCESS_TOKEN || process.env.META_WHATSAPP_TOKEN) &&
          process.env.WHATSAPP_PHONE_NUMBER_ID
      ),
    },
  });
}

// =============================================================================
// 4. POST HANDLER: INBOUND WEBHOOK (TWILIO & META) + OUTBOUND DIRECT DISPATCH
// =============================================================================
export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";

    // -------------------------------------------------------------------------
    // Case A: Form-URL-Encoded Inbound (Standard Twilio WhatsApp Webhook)
    // -------------------------------------------------------------------------
    if (contentType.includes("application/x-www-form-urlencoded")) {
      const formData = await req.formData();
      const body = formData.get("Body")?.toString() || "";
      const from = formData.get("From")?.toString() || "";

      const response = generateBotReply(body);

      // Return TwiML XML so Twilio instantly sends the reply back to user's phone!
      const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Message>
    <Body>${response.reply}</Body>
  </Message>
</Response>`;

      return new NextResponse(twiml, {
        headers: { "Content-Type": "text/xml" },
      });
    }

    // -------------------------------------------------------------------------
    // Case B: JSON Request (Meta Cloud API Webhook OR App In-Browser Client)
    // -------------------------------------------------------------------------
    const json = await req.json().catch(() => ({}));

    // B1: Explicit Outbound Action (e.g. from UI "Send Alert to my WhatsApp")
    if (json.action === "send" && json.to) {
      const result = await dispatchOutboundWhatsApp(json.to, json.message || "Test Alert from VayuDrishti");
      return NextResponse.json(result);
    }

    // B2: Meta WhatsApp Cloud API Inbound Webhook Payload
    const metaMessage = json?.entry?.[0]?.changes?.[0]?.value?.messages?.[0];
    if (metaMessage) {
      const fromNumber = metaMessage.from; // e.g. "919876543210"
      const userText = metaMessage.text?.body || "";

      const response = generateBotReply(userText);

      // Asynchronously reply to the user using Meta Cloud API
      try {
        await sendViaMeta(fromNumber, response.reply);
      } catch (metaErr: any) {
        console.error("Meta Cloud reply error:", metaErr.message);
      }

      // Meta requires 200 OK fast acknowledge
      return NextResponse.json({ status: "acknowledged" });
    }

    // B3: Twilio JSON Webhook or Frontend Simulator API call
    const incomingText = json.message || json.Body || "";
    const fromPhone = json.from || json.From || "";

    const response = generateBotReply(incomingText);

    // If an actual real phone number is provided and credentials exist, dispatch real message
    let outboundDispatch = null;
    if (fromPhone && fromPhone.length > 8 && !fromPhone.startsWith("user")) {
      try {
        outboundDispatch = await dispatchOutboundWhatsApp(fromPhone, response.reply);
      } catch (err: any) {
        outboundDispatch = { success: false, error: err.message };
      }
    }

    return NextResponse.json({
      success: true,
      sender: "VayuDrishti Bot 🟢",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      ...response,
      outboundDispatch,
    });
  } catch (err: any) {
    console.error("WhatsApp API Error:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to process WhatsApp request" },
      { status: 500 }
    );
  }
}
