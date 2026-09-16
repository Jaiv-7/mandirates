/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AboutView } from './components/AboutView';
import { AgricultureTipsView } from './components/AgricultureTipsView';
import { AreaComparisonView } from './components/AreaComparisonView';
import { Footer } from './components/Footer';
import { GlobalSearch } from './components/GlobalSearch';
import { Hero } from './components/Hero';
import { HowItWorks } from './components/HowItWorks';
import { MandiTableView } from './components/MandiTableView';
import { MarketTicker } from './components/MarketTicker';
import { Navbar } from './components/Navbar';
import { SeasonalCalendarView } from './components/SeasonalCalendarView';
import { SmartDashboard } from './components/SmartDashboard';
import { Stats } from './components/Stats';
import { VegetableDetailsModal } from './components/VegetableDetailsModal';
import { VegetableGuideView } from './components/VegetableGuideView';
import { AgritechProvider, useAgritech } from './context/AgritechContext';
import { LanguageProvider } from './context/LanguageContext';

const MainContent: React.FC = () => {
  const { activeTab } = useAgritech();

  const renderActiveView = () => {
    switch (activeTab) {
      case 'home':
        return (
          <>
            <Hero />
            <Stats />
            <SmartDashboard />
            <HowItWorks />
            <VegetableGuideView />
          </>
        );
      case 'vegetableGuide':
      case 'areaCrops':
        return <VegetableGuideView />;
      case 'mandiRates':
      case 'priceTrends':
        return <MandiTableView />;
      case 'seasonalCalendar':
        return <SeasonalCalendarView />;
      case 'areaComparison':
        return <AreaComparisonView />;
      case 'agriTips':
        return <AgricultureTipsView />;
      case 'about':
        return <AboutView />;
      default:
        return (
          <>
            <Hero />
            <Stats />
            <SmartDashboard />
            <HowItWorks />
            <VegetableGuideView />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 font-sans text-stone-900 antialiased selection:bg-emerald-200 selection:text-emerald-900">
      {/* Top Running APMC Ticker */}
      <MarketTicker />

      {/* Main Navbar */}
      <Navbar />

      {/* Primary Dynamic Content */}
      <main className="flex-1">
        {renderActiveView()}
      </main>

      {/* Global Vegetable Detail Modal with APMC Connection */}
      <VegetableDetailsModal />

      {/* Global Search Modal (Ctrl+K or Header Click) */}
      <GlobalSearch />

      {/* Complete Footer with Disclaimers */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <AgritechProvider>
        <MainContent />
      </AgritechProvider>
    </LanguageProvider>
  );
}
