# 🛡️ Aegis Disaster Command (Aegis CMD)

**Aegis Disaster Command** is a next-generation orbital monitoring and disaster response platform. By fusing real-time satellite intelligence, social sentiment analysis, and generative AI, Aegis provides emergency responders and government agencies with a unified operating picture for global crisis management.

![Aegis Command Center](https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2070)
*Note: Representative visualization of the Aegis high-fidelity command interface.*

## 🚀 Key Modules

### 🛰️ Satellite Intelligence (Orbital Recon)
Utilizes multi-spectral orbital captures to detect heat signatures, flood zones, and structural anomalies. Powered by **Gemini 1.5 Flash** for rapid computer vision analysis of high-res imagery.

### 📊 Command Center (Real-Time HUD)
A comprehensive dashboard featuring the **Regional Vulnerability Matrix**, live risk velocity metrics, and a unified **Intel Stream** that aggregates global emergency signals.

### 🌐 Globe Command
Interactive 3D visualization of the Earth's surface, mapping active incidents, seismic pulses, and hurricane paths with precision geocoordinates.

### 👥 Social Intel (Signal-to-Noise)
Scans global social platforms to extract ground-truth reports from citizens in the eye of the storm. Performs sentiment analysis to detect panic levels and emerging needs.

### 🚛 Response Hub (Logistics AI)
Automatically generates tactical logistics plans, mapping out safe zones, trauma-ready hospitals, and critical resource requirements for identified disaster nodes.

### 🏗️ Prevention Desk
Generates proactive disaster prevention strategies and infrastructure hardening blueprints. Includes readiness scoring and tactical checklists for government intervention.

### ☁️ Cloud Resilience Monitor
Tracks the health and status of multi-cloud infrastructure (GCP, AWS, Azure) to ensuring that the command center remains operational even when regional data centers are compromised by disasters.

### ⏳ Data Archives (Time Machine)
Enables post-incident playback and historical data analysis. Uses predictive modeling to simulate future catastrophe scenarios and test response efficacy.

## 🛠️ Technology Stack

- **Frontend:** React 19, TypeScript, Vite
- **AI/ML:** Google Gemini 1.5 Flash (Processing via `@google/genai`)
- **Data Visualization:** Recharts, Lucide, FontAwesome 6
- **Styling:** Tailwind CSS (Modern Glassmorphism & High-Contrast Dark Theme)
- **Runtime Analytics:** Pyodide (Client-side Python analysis for complex data)

## ⚡ Getting Started

1. **Clone & Install:**
   ```bash
   npm install
   ```

2. **Set Environment Variables:**
   Create a `.env` file and add your Google AI Studio API key:
   ```env
   GEMINI_API_KEY=your_key_here
   ```

3. **Launch Dev Server:**
   ```bash
   npm run dev
   ```

## 📂 Project Structure

```text
├── components/          # React UI components (Dashboard, Globe, etc.)
├── services/            # Gemini AI service integrations
├── types.ts             # Global TypeScript interface definitions
├── App.tsx             # Application core and state synchronization
├── index.html           # Entry point and global viewport config
└── metadata.json        # Project capabilities and permissions
```

## 🔋 AI Integration Overview

The platform leverages **Gemini 1.5 Flash** for:
- **Disaster Prediction:** Analyzing patterns to forecast likely events in a 72h window.
- **Image Analysis:** Identifying disaster footprints in satellite uploads.
- **Text Synthesis:** Grounding alerts in real-world news using Google Search grounding.
- **Logistics Planning:** Crafting situational response blueprints based on incident severity.

---

*“Providing the shield of foresight in a world of uncertainty.”*
