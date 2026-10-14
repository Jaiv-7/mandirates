# 🌱 Vadodara Krushi Mitra (વડોદરા કૃષિ મિત્ર)

> **"Know Your Soil. Grow the Right Crop. Know Your Market."**  
> *"તમારી જમીન જાણો. યોગ્ય પાક ઉગાડો. યોગ્ય બજાર ભાવ જાણો."*

A modern, responsive, bilingual Agritech web platform built specifically for **Vadodara District, Gujarat, India**.

It unites two critical agricultural pillars into one cohesive experience:
1. **Vadodara Area-Wise Vegetable Growing Recommendation Engine**: Soil characteristics (Goradu sandy loam, medium black, clay), water availability, seasonal suitability, and crop guides across 17 Vadodara city zones and rural talukas.
2. **Vadodara APMC Mandi Market Price System**: Wholesale arrival and auction price tracking across the 4 major APMC yards in Vadodara (Sayajipura, Padra, Karjan, and Dabhoi) with interactive price trend charts and 100% Gujarati/English translations.

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or newer)
- npm, pnpm, or bun

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
npm run preview
```

---

## 🛠 Tech Stack

- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS v4 + Plus Jakarta Sans + Noto Sans Gujarati
- **State & i18n**: React Context API with instant EN 🇬🇧 / GU 🇮🇳 switching
- **Visualizations**: Recharts for APMC mandi price trend curves
- **Icons**: Lucide React
- **API Simulation**: Built-in Vite middleware at `/api/v1/mandi`

---

## 🌾 Features & Architecture

- **17 Vadodara Localities**: Gotri, Manjalpur, Alkapuri, Karelibaug, Vasna, Makarpura, Sama, Harni, Waghodia Road, Tarsali, Padra, Karjan, Dabhoi, Waghodia, Savli, Desar, and Shinor.
- **4 APMC Mandis**: Sayajipura APMC, Padra APMC, Karjan APMC, and Dabhoi APMC.
- **Vegetable Database**: Tomato, Brinjal, Okra, Spinach, Bottle Gourd, Cluster Beans, Coriander, Green Chilli, Fenugreek, Bitter Gourd, Cauliflower, Cabbage, and more with scientific names, sowing seasons, organic IPM remedies, and companion planting tips.
- **Direct Cross-linking**: Clicking "Check Market Information" from any vegetable links directly to its APMC commodity rates and the nearest mandi.
- **Disclaimers**: Complies with agricultural advisory guidelines and clearly denotes demonstration data.

---

## 📄 License
MIT License. Built for the farmers, home gardeners, and agricultural community of Vadodara District.
