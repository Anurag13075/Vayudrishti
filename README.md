# 🌿 VayuDrishti (वायुदृष्टि) — AI-Powered Hyperlocal Air Quality Intelligence

> **Track 01: Air** — Environmental Hacks by WeMakeDevs × AWS  
> *"Every Breath You Take Is Counted."*

---

## 🏆 Executive Summary: Why This Wins

Air pollution is India's largest public health emergency, claiming **over 2.18 million lives each year** and stealing an average of **5.3 years of life expectancy**. Yet, every existing tool is merely a passive "dashboard" displaying numbers people don't know how to act on.

**VayuDrishti** breaks the mold. It is **NOT another dashboard**. It is India’s first **personal respiratory defense platform**:
1. **🫁 Personal Breath Score™**: Quantifies cumulative daily toxic exposure like a fitness tracker.
2. **🤖 AWS Bedrock-Powered AI Health Advisor**: Clinical-grade, demographic-aware recommendations (age, asthma, activity profile) rather than generic warnings.
3. **🏫 School & Child Safety Decision Engine**: Clear, binary **YES/NO** decisions on outdoor assemblies, recess, and sports.
4. **🗺️ Cinematic Hyperlocal Interactive Map**: Visualizes real-time sensor streams across 1,000+ Indian monitoring stations with pulsating severity markers.
5. **📸 Community Pollution Watch & Whistleblowing**: Crowdsourced reporting of stubble burning, construction dust, and illegal industrial smoke with real-time upvoting.

---

## ☁️ Architecture & AWS Cloud Integration

VayuDrishti is designed to scale across India using AWS serverless and AI infrastructure:

```
                      ┌──────────────────────────────────────────┐
                      │              AWS Route 53                │
                      └────────────────────┬─────────────────────┘
                                           │
                                           ▼
                      ┌──────────────────────────────────────────┐
                      │          Amazon CloudFront CDN           │
                      └────────────────────┬─────────────────────┘
                                           │
                    ┌──────────────────────┴──────────────────────┐
                    │                                             │
                    ▼                                             ▼
       ┌────────────────────────┐                   ┌──────────────────────────┐
       │   AWS Amplify Hosting  │                   │    Amazon S3 Bucket      │
       │   (Next.js 14 Web App) │                   │  (Static Map Data / Geo) │
       └────────────┬───────────┘                   └──────────────────────────┘
                    │
                    ▼
       ┌────────────────────────┐
       │   Amazon API Gateway   │
       └────────────┬───────────┘
                    │
         ┌──────────┴──────────────────────────┐
         ▼                                     ▼
┌────────────────────────┐           ┌──────────────────────────────────┐
│   AWS Lambda Handlers  │           │      Amazon Bedrock Engine       │
│  - /api/aqi (Ingestion)│           │  - Claude 3.5 Sonnet / Titan     │
│  - /api/reports (CRUD) │           │  - Hyper-personalized AI advisor │
└──────────┬─────────────┘           └──────────────────────────────────┘
           │
           ▼
┌────────────────────────┐
│    Amazon DynamoDB     │
│  - User Breath Scores  │
│  - Community Reports   │
└────────────────────────┘
```

### AWS Services Utilized:
- **Amazon Bedrock**: Powers the real-time AI Clinical Health Advisor, evaluating particulate matter (PM2.5 / PM10) alongside patient vulnerability profiles.
- **AWS Lambda & API Gateway**: High-throughput serverless microservices handling sensor telemetry and crowdsourced incidents.
- **Amazon DynamoDB**: Single-digit millisecond latency NoSQL store for geo-indexed community reports and air quality snapshots.
- **AWS Amplify Hosting**: Enterprise-grade CI/CD and edge deployment with automated preview branches.
- **Amazon CloudFront & S3**: Ultra-low latency geospatial asset delivery and map tile caching.

---

## 🎨 Design & User Experience Highlights

- **Dark-First Cinematic Aesthetics**: OLED-optimized dark theme (`#030712`) with luminous accent glows and glassmorphism cards.
- **Smooth Framer Motion Choreography**: Staggered scroll reveals, floating atmospheric orbs, pulsing risk markers, and interactive micro-interactions.
- **Data Visualization**: Dynamic AreaCharts via Recharts for 24-hour predictive trends and real-time SVG circular gauges.
- **Mobile-First Responsive Layout**: Flawless navigation on mobile, tablet, and ultra-wide displays.

---

## 🚀 Key Feature Walkthrough

### 1. 🫁 Personal Breath Score (`/breathe`)
- Real-time animated circular progress gauge displaying your respiratory defense index (0–100).
- Live metrics: Outdoor exposure time, micro-gram particulate volume inhaled, N95 filtration effectiveness, and remaining safe outdoor window.
- 24-hour predictive forecast curve to plan runs, commutes, and outdoor activities during the lowest AQI windows.

### 2. 🗺️ Hyperlocal Live Map (`/map`)
- Interactive Leaflet-powered map of India with dark-theme cartography.
- Pulsing glowing indicators for hazardous zones (AQI > 150).
- Instant city inspection sidebar with search, severity filter chips, and multi-pollutant breakdowns (PM2.5, PM10, O3, NO2, SO2, CO).

### 3. 🤖 AI Health Advisor (`/advisor`)
- Tailored clinical recommendations powered by AWS Bedrock.
- Dynamic profile customizer: Age group, pre-existing conditions (Asthma, Diabetes, Heart Disease, Pregnancy), and planned activity.
- Delivers precise actionable protocols: outdoor safety, ventilation status, and mask mandates.

### 4. 🏫 School Safety Dashboard (`/schools`)
- Instant **YES / CAUTION / NO** decision indicator for principals, teachers, and parents.
- Operational guidance on Morning Assemblies, Sports Periods, Recess, and Commute Safety.
- 7-day school forecast table.

### 5. 📸 Community Pollution Watch (`/report`)
- Citizen-driven reporting of environmental violations: Stubble burning, construction dust, industrial chimneys, and garbage incineration.
- Reactive live incident feed with instant upvoting and geospatial tagging.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Custom AQI Design System
- **Animations**: Framer Motion
- **Mapping**: Leaflet + React Leaflet
- **Charts**: Recharts
- **Icons**: Lucide React
- **Cloud & AI**: AWS Bedrock, AWS Lambda, Amazon DynamoDB, AWS Amplify

---

## ⚡ Getting Started Locally

```bash
# 1. Clone the repository
git clone https://github.com/your-username/vayudrishti.git
cd hackthon

# 2. Install dependencies (when ready)
npm install

# 3. Configure environment variables (optional for live API keys)
# Copy .env.local and update keys if desired:
# NEXT_PUBLIC_WAQI_TOKEN=your_token
# AWS_REGION=ap-south-1

# 4. Start development server
npm run dev
```

Visit `http://localhost:3000` to explore VayuDrishti.

---

## 🎙️ 3-Minute Demo Video Pitch Script

1. **0:00 - 0:30 (The Hook)**: Introduce Delhi / Indian winter air. Mention 2.18M deaths annually. Show why traditional AQI apps fail because raw numbers don't tell citizens what actions to take.
2. **0:30 - 1:15 (The Solution - Breath Score & Map)**: Show the Live Map with pulsing hotspots. Jump to the **Breath Score** gauge — showing how it calculates personal biological burden and safe outdoor windows.
3. **1:15 - 2:00 (AWS Bedrock AI Health Advisor & Schools)**: Run the AI Advisor for an asthmatic child in Delhi vs. an adult in Mumbai. Highlight the AWS Bedrock integration. Show the School Safety YES/NO engine.
4. **2:00 - 2:35 (Community Action Feed)**: File a live report on stubble burning; watch it immediately appear in the feed with upvotes.
5. **2:35 - 3:00 (AWS Architecture & Close)**: Show the AWS serverless architecture (Bedrock, Lambda, DynamoDB, Amplify). Close with: *"VayuDrishti transforms invisible toxic air into actionable intelligence for 1.4 billion Indians."*

---

*Built with 💚 for Bharat | VayuDrishti © 2026 | Environmental Hacks by WeMakeDevs × AWS*
