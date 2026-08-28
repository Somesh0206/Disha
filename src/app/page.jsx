'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import {
  AlertTriangle,
  ShieldAlert,
  ShieldCheck,
  MapPin,
  Compass,
  Building2,
  TrendingUp,
  Activity,
  ArrowRight,
  Radio,
  Users,
  Layers,
  Thermometer,
  CloudRain,
  Download,
  Sparkles,
  Navigation,
  CheckCircle2,
  Clock,
  Car,
  FileSpreadsheet
} from 'lucide-react';
import { mockHabitations, mockHazardZones } from '@/data/zonesData';
import { mockShelters } from '@/data/sheltersData';
import RadarScanner from '@/components/RadarScanner';
import AudioVoiceAdvisor from '@/components/AudioVoiceAdvisor';
import ExportReportModal from '@/components/ExportReportModal';

export default function HomePage() {
  const {
    openSosModal,
    simulatedTelemetry,
    isLiveTelemetrySimulation,
    toggleTelemetrySimulation,
    activeAlertCount,
    shelters,
    logUserActivity,
    language,
    t
  } = useApp();

  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [activeIntentFilter, setActiveIntentFilter] = useState('ALL'); // ALL, CITIZEN, RESPONDER

  const activeShelters = shelters && shelters.length > 0 ? shelters : mockShelters;
  const redZonesCount = mockHazardZones.filter((z) => z.riskLevel === 'RED').length;
  const criticalHabitations = mockHabitations.filter((h) => h.immediateRelocationNeeded);
  const totalPopulationAtRisk = mockHabitations
    .filter((h) => h.riskLevel === 'RED')
    .reduce((acc, curr) => acc + curr.population, 0);

  const totalSafeCapacity = activeShelters.reduce((acc, curr) => acc + (curr.totalCapacity || 0), 0);
  const totalAllocatedOccupancy = activeShelters.reduce(
    (acc, curr) => acc + (curr.allocatedOccupancy || curr.currentOccupancy || 0),
    0
  );
  const remainingSafeCapacity = Math.max(0, totalSafeCapacity - totalAllocatedOccupancy);

  const handleExportDataReport = () => {
    if (logUserActivity) {
      logUserActivity('EXPORT_REPORT_TRIGGERED', 'UsageAndOperationsReportExport', { source: 'HomePageHero' });
    }
    setIsExportModalOpen(true);
  };

  return (
    <div className="space-y-12 pb-20">
      {/* Export Report Center Modal */}
      <ExportReportModal isOpen={isExportModalOpen} onClose={() => setIsExportModalOpen(false)} />

      {/* Hero Section with Glassmorphism & Radar Visuals */}
      <section className="relative overflow-hidden bg-gradient-to-b from-red-950/15 via-slate-900/30 to-transparent pt-8 sm:pt-12 pb-14 px-4 sm:px-6 lg:px-8 border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

        <div className="max-w-7xl mx-auto space-y-8">
          {/* Live Alert Ribbon & Voice Advisor */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs font-bold uppercase tracking-wider shadow-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
              </span>
              <span>
                {language === 'hi'
                  ? 'अति-महत्वपूर्ण चेतावनी: दक्षिण-पश्चिम एवं हिमालयी मलबा प्रवाह सक्रिय'
                  : 'CRITICAL ALERT: SOUTH-WEST & HIMALAYAN DEBRIS HAZARDS ACTIVE'}
              </span>
            </div>

            <AudioVoiceAdvisor
              textToSpeak={
                language === 'hi'
                  ? 'सभी नागरिकों का ध्यान दें। यह दिशा (DISHA) भू-स्थानिक सुरक्षा प्रणाली का आधिकारिक आपातकालीन बुलेटिन है। वायनाड और चमोली सेक्टरों में भारी मलबा बहाव और बाढ़ की चेतावनी सक्रिय है। कृपया तुरंत अपने आवंटित सुरक्षित आश्रय की जांच करें।'
                  : 'Attention all residents. This is an official emergency bulletin from DISHA Geo-Intelligence. Critical debris flow and flood warnings are active in the Wayanad and Chamoli sectors. 38 habitations are under mandatory evacuation. Please check your assigned safe shelter immediately.'
              }
              label={language === 'hi' ? 'आपातकालीन ऑडियो प्रसारण सुनें' : 'Listen to Audio Emergency Broadcast'}
            />
          </div>

          {/* Main Hero Header */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-3">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold border border-slate-200 dark:border-slate-700">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>{language === 'hi' ? 'राष्ट्रीय आपदा भू-स्थानिक प्रणाली' : 'National Geo-Intelligence System'}</span>
                </div>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.15]">
                  {language === 'hi' ? 'आपदा जोखिम पहचान,' : 'Mapping Risk,'}{' '}
                  <span className="bg-gradient-to-r from-red-500 via-rose-500 to-amber-500 bg-clip-text text-transparent">
                    {language === 'hi' ? 'जीवन रक्षा:' : 'Protecting Lives:'}
                  </span>{' '}
                  <span className="block text-2xl sm:text-4xl lg:text-5xl mt-1 text-slate-800 dark:text-slate-100">
                    {language === 'hi' ? 'दिशा (DISHA) कमान' : 'Smart Geo-Command'}
                  </span>
                </h1>
              </div>

              <p className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
                {t(
                  'hero.subtitle',
                  'Real-time geotechnical sensor telemetry, algorithmic road evacuation routing (OSRM), and carrying capacity balancing across certified Safe Havens.'
                )}
              </p>

              {/* Action Buttons Hub */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href="/relocation"
                  className="px-5 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-800 text-white font-black text-sm tracking-wide shadow-lg shadow-blue-600/30 flex items-center space-x-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-95">
                  <Compass className="w-4 h-4 text-amber-300 animate-spin-slow" />
                  <span>{t('hero.btnEvacuate', 'Find My Safe Shelter Route')}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/red-zones"
                  className="px-5 py-3.5 rounded-2xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold text-sm tracking-wide border border-slate-700/80 flex items-center space-x-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:scale-[1.02] active:scale-95 shadow-md">
                  <MapPin className="w-4 h-4 text-red-400" />
                  <span>{t('hero.btnRadar', 'Inspect 3D GIS Hazard Zones')}</span>
                </Link>

                <button
                  onClick={() => openSosModal('citizen')}
                  className="px-4 py-3.5 rounded-2xl bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 font-black text-sm border border-red-500/30 flex items-center space-x-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-red-500/20 hover:scale-[1.02] active:scale-95 animate-glow-pulse">
                  <AlertTriangle className="w-4 h-4 text-red-500 animate-pulse" />
                  <span>{t('hero.btnSos', 'Trigger Immediate SOS')}</span>
                </button>

                <button
                  onClick={handleExportDataReport}
                  className="px-4 py-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold border border-slate-200 dark:border-slate-700 flex items-center space-x-1.5 transition-all duration-300 hover:-translate-y-1 shadow-sm"
                  title="Export Official PDF Usage & Operations Report (Admin / Staff Clearance)">
                  <Download className="w-4 h-4 text-red-500" />
                  <span>{language === 'hi' ? 'पीडीएफ रिपोर्ट निर्यात' : 'Export PDF Report'}</span>
                </button>
              </div>

              {/* Quick Trust Highlights */}
              <div className="flex flex-wrap items-center gap-4 pt-1 text-[11px] text-slate-500 dark:text-slate-400">
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{language === 'hi' ? 'ओपनस्ट्रीटमैप OSRM सड़क नेविगेशन' : 'OSRM Live Road Navigation'}</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{language === 'hi' ? 'एनडीएमए/एसडीआरएफ आपातकालीन प्रोटोकॉल' : 'NDMA/SDRF Protocols'}</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{language === 'hi' ? 'पूर्णतः ऑफ़लाइन सुरक्षित' : '100% Offline Resilient'}</span>
                </div>
              </div>
            </div>

            {/* Radar Visual & Live Telemetry Card (Right 5 Cols) */}
            <div className="lg:col-span-5 space-y-4">
              <RadarScanner />

              <div className="glass-panel rounded-3xl p-5 border-slate-200/80 dark:border-slate-800/80 relative overflow-hidden shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3 mb-3">
                  <div className="flex items-center space-x-2">
                    <Activity className="w-4 h-4 text-red-500 animate-pulse" />
                    <span className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">
                      Live Telemetry Stream
                    </span>
                  </div>
                  <button
                    onClick={toggleTelemetrySimulation}
                    className={`text-[10px] font-mono px-2.5 py-1 rounded-full border transition-all ${
                      isLiveTelemetrySimulation
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 font-bold'
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-400 border-slate-700'
                    }`}>
                    {isLiveTelemetrySimulation ? '● SENSORS ONLINE' : 'PAUSED'}
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60">
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 flex items-center space-x-1 font-semibold">
                      <CloudRain className="w-3.5 h-3.5 text-blue-500" />
                      <span>Rainfall Peak</span>
                    </div>
                    <div className="font-mono font-black text-base text-blue-600 dark:text-blue-400 mt-1">
                      {simulatedTelemetry.rainfallMmHr} mm/hr
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60">
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 flex items-center space-x-1 font-semibold">
                      <Thermometer className="w-3.5 h-3.5 text-amber-500" />
                      <span>Pore Pressure</span>
                    </div>
                    <div className="font-mono font-black text-base text-amber-600 dark:text-amber-400 mt-1">
                      {simulatedTelemetry.poreWaterKPa} kPa
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60">
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 flex items-center space-x-1 font-semibold">
                      <Activity className="w-3.5 h-3.5 text-purple-500" />
                      <span>Seismic Tremor</span>
                    </div>
                    <div className="font-mono font-black text-base text-purple-600 dark:text-purple-400 mt-1">
                      {simulatedTelemetry.seismicMagnitude} M
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60">
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 flex items-center space-x-1 font-semibold">
                      <Layers className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Soil Moisture</span>
                    </div>
                    <div className="font-mono font-black text-base text-emerald-600 dark:text-emerald-400 mt-1">
                      {simulatedTelemetry.soilSaturationPct}%
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-200 dark:border-slate-800 text-[10px] text-slate-500 dark:text-slate-400 font-mono text-center flex items-center justify-between">
                  <span>STATION: WAYANAD-WS01</span>
                  <span>{simulatedTelemetry.lastUpdated}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* High-Level KPIs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="glass-panel card-interactive p-5 rounded-3xl border-l-4 border-l-red-500 relative overflow-hidden shadow-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {t('stat.activeRedZones', 'Critical Red Zones')}
              </span>
              <div className="p-2.5 rounded-2xl bg-red-500/10 text-red-500">
                <ShieldAlert className="w-5 h-5 animate-pulse" />
              </div>
            </div>
            <div className="text-3xl font-black text-slate-900 dark:text-white font-mono">
              {redZonesCount}
            </div>
            <div className="text-xs text-red-600 dark:text-red-400 mt-1 font-medium">
              {language === 'hi' ? 'वायनाड एवं चमोली उच्च जोखिम' : 'Wayanad & Chamoli Active'}
            </div>
          </div>

          <div className="glass-panel card-interactive p-5 rounded-3xl border-l-4 border-l-amber-500 relative overflow-hidden shadow-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {t('stat.monitoredHabitations', 'Critical Habitations')}
              </span>
              <div className="p-2.5 rounded-2xl bg-amber-500/10 text-amber-500">
                <AlertTriangle className="w-5 h-5 animate-bounce-subtle" />
              </div>
            </div>
            <div className="text-3xl font-black text-slate-900 dark:text-white font-mono">
              {criticalHabitations.length}
            </div>
            <div className="text-xs text-amber-600 dark:text-amber-400 mt-1 font-medium">
              {language === 'hi' ? 'अनिवार्य निकासी आदेश सक्रिय' : 'Pre-Evacuation Alerts Active'}
            </div>
          </div>

          <div className="glass-panel card-interactive p-5 rounded-3xl border-l-4 border-l-purple-500 relative overflow-hidden shadow-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {t('stat.relocationUrgency', 'Population in Hazard Zones')}
              </span>
              <div className="p-2.5 rounded-2xl bg-purple-500/10 text-purple-500">
                <Users className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-black text-slate-900 dark:text-white font-mono">
              {totalPopulationAtRisk.toLocaleString()}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
              {language === 'hi' ? 'नागरिक तत्काल जोखिम क्षेत्र में' : 'Citizens in immediate perimeter'}
            </div>
          </div>

          <div className="glass-panel card-interactive p-5 rounded-3xl border-l-4 border-l-emerald-500 relative overflow-hidden shadow-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {t('stat.safeShelterCapacity', 'Available Safe Capacity')}
              </span>
              <div className="p-2.5 rounded-2xl bg-emerald-500/10 text-emerald-500">
                <Building2 className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
              {remainingSafeCapacity.toLocaleString()}
            </div>
            <div className="text-xs text-emerald-600 dark:text-emerald-400 mt-1 font-medium">
              {language === 'hi' ? '6 बहु-आपदा सुरक्षित आश्रय स्थलों में' : 'Across 6 Multi-Hazard Havens'}
            </div>
          </div>
        </div>
      </section>

      {/* Core Modules Clean Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              {language === 'hi' ? 'एकीकृत आपदा भू-स्थानिक सुरक्षा मॉड्यूल' : 'Integrated Disaster Geo-Intelligence Modules'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              {language === 'hi'
                ? 'रेड-ज़ोन मैपिंग, सुरक्षित आश्रयों की वहन क्षमता और त्वरित सड़क निकासी लॉजिस्टिक्स'
                : 'End-to-end hazard zone mapping, real-time carrying capacity, and intelligent relief logistics'}
            </p>
          </div>

          {/* Clean Intent Filters */}
          <div className="flex items-center space-x-1.5 p-1 bg-slate-100 dark:bg-slate-850 rounded-2xl border border-slate-200 dark:border-slate-700 text-xs font-bold shrink-0">
            <button
              onClick={() => setActiveIntentFilter('ALL')}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                activeIntentFilter === 'ALL'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}>
              {language === 'hi' ? 'सभी मॉड्यूल' : 'All Tools'}
            </button>
            <button
              onClick={() => setActiveIntentFilter('CITIZEN')}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                activeIntentFilter === 'CITIZEN'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}>
              {language === 'hi' ? 'नागरिक सुरक्षा' : 'Citizen Evacuation'}
            </button>
            <button
              onClick={() => setActiveIntentFilter('RESPONDER')}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                activeIntentFilter === 'RESPONDER'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}>
              {language === 'hi' ? 'कमांड और एनालिटिक्स' : 'Responder & AI'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(activeIntentFilter === 'ALL' || activeIntentFilter === 'CITIZEN') && (
            <Link
              href="/relocation"
              className="glass-panel-hover p-6 rounded-3xl group flex flex-col justify-between border border-blue-500/20 shadow-md">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Compass className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/30">
                    OSRM ROAD AI
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-500 transition-colors">
                  {language === 'hi' ? 'लाइव पुनर्वास एवं मार्ग आवंटन' : 'Live Relocation & Allocation Hub'}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Automatic GPS detection, nearest evacuation shelter calculation, and real-time habitation carrying
                  capacity stress breakdown.
                </p>
              </div>
              <div className="mt-6 flex items-center text-xs font-bold text-blue-500 space-x-1">
                <span>Check My Evacuation Path</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          )}

          {(activeIntentFilter === 'ALL' || activeIntentFilter === 'RESPONDER') && (
            <Link
              href="/red-zones"
              className="glass-panel-hover p-6 rounded-3xl group flex flex-col justify-between border border-red-500/20 shadow-md">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-red-500/10 text-red-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-red-500/15 text-red-600 dark:text-red-400 border border-red-500/30">
                    3D GIS POLYGONS
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-red-500 transition-colors">
                  {language === 'hi' ? 'खतरा रेड-ज़ोन जीआईएस मानचित्र' : 'Hazard Red-Zone GIS Map'}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Visual geospatial classification of landslides, floods, and earthquake zones with multi-hazard
                  filtering and live sensor metrics.
                </p>
              </div>
              <div className="mt-6 flex items-center text-xs font-bold text-red-500 space-x-1">
                <span>Explore GIS Spatial Layers</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          )}

          {(activeIntentFilter === 'ALL' || activeIntentFilter === 'CITIZEN') && (
            <Link
              href="/shelters"
              className="glass-panel-hover p-6 rounded-3xl group flex flex-col justify-between border border-emerald-500/20 shadow-md">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                    BED LOAD-BALANCER
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors">
                  {language === 'hi' ? 'सुरक्षित आश्रय स्थल एवं भंडार' : 'Safe Shelter Directory & Reserves'}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Live capacity tracking, emergency supplies (water, rations, power, medicine), and 50-year disaster
                  resilience audit scorecards.
                </p>
              </div>
              <div className="mt-6 flex items-center text-xs font-bold text-emerald-500 space-x-1">
                <span>View Safe Shelter Inventory</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          )}

          {(activeIntentFilter === 'ALL' || activeIntentFilter === 'RESPONDER') && (
            <Link
              href="/predictions"
              className="glass-panel-hover p-6 rounded-3xl group flex flex-col justify-between border border-amber-500/20 shadow-md">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                    50-YR PROBABILITY
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-amber-500 transition-colors">
                  {language === 'hi' ? 'एआई पूर्वानुमान एवं ऐतिहासिक विश्लेषण' : 'AI Predictions & 50-Yr Analytics'}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  EM-DAT style 50-year historical disaster analysis, 7-to-30-day machine learning risk probability curves,
                  and interactive simulation sandbox.
                </p>
              </div>
              <div className="mt-6 flex items-center text-xs font-bold text-amber-500 space-x-1">
                <span>Run AI Risk Simulation</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          )}

          {(activeIntentFilter === 'ALL' || activeIntentFilter === 'RESPONDER') && (
            <Link
              href="/admin"
              className="glass-panel-hover p-6 rounded-3xl group flex flex-col justify-between border border-purple-500/20 shadow-md">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <ShieldAlert className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-purple-500/15 text-purple-600 dark:text-purple-400 border border-purple-500/30">
                    112 COMMAND DESK
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-purple-500 transition-colors">
                  {language === 'hi' ? 'राहत दल कमान डैशबोर्ड' : 'Responder Command Dashboard'}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Incident triage desk, carrying capacity adjustments, live incoming citizen SOS feed, and multi-channel
                  emergency alert dispatch.
                </p>
              </div>
              <div className="mt-6 flex items-center text-xs font-bold text-purple-500 space-x-1">
                <span>Enter Command Console</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          )}

          {(activeIntentFilter === 'ALL' || activeIntentFilter === 'CITIZEN') && (
            <Link
              href="/resources"
              className="glass-panel-hover p-6 rounded-3xl group flex flex-col justify-between border border-rose-500/20 shadow-md">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Users className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30">
                    COMMUNITY SOPS
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-rose-500 transition-colors">
                  {language === 'hi' ? 'समुदाय एसओपी एवं नागरिक रिपोर्टिंग' : 'Community SOPs & Citizen Reporting'}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Disaster survival SOPs, emergency bag checklist builder, downloadable pocket cards, and crowdsourced
                  hazard reporting.
                </p>
              </div>
              <div className="mt-6 flex items-center text-xs font-bold text-rose-500 space-x-1">
                <span>Access Emergency SOPs</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          )}
        </div>
      </section>

      {/* Real-time Critical Habitations Matrix */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-3xl p-6 shadow-xl border border-slate-200/80 dark:border-slate-800/80">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 gap-3">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                <span>Immediate Relocation Need Matrix</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Habitations currently exceeding safety thresholds based on live sensor telemetry
              </p>
            </div>
            <Link
              href="/relocation"
              className="text-xs font-bold text-red-500 hover:text-red-600 flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-red-500/10 border border-red-500/20">
              <span>View Full Relocation Engine</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="overflow-x-auto mt-4">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-semibold uppercase">
                  <th className="pb-3 px-3">Habitation / Sector</th>
                  <th className="pb-3 px-3">District / State</th>
                  <th className="pb-3 px-3">Primary Hazard</th>
                  <th className="pb-3 px-3">Population</th>
                  <th className="pb-3 px-3">Vulnerability</th>
                  <th className="pb-3 px-3">Relocation Priority</th>
                  <th className="pb-3 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
                {mockHabitations.slice(0, 8).map((hab) => (
                  <tr key={hab.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-3 font-bold text-slate-900 dark:text-white">
                      {hab.name}
                      <span className="block text-[10px] text-slate-400 font-mono">{hab.id}</span>
                    </td>
                    <td className="py-3.5 px-3 text-slate-600 dark:text-slate-300">
                      {hab.district}, {hab.state}
                    </td>
                    <td className="py-3.5 px-3">
                      <span className="capitalize font-semibold text-slate-700 dark:text-slate-200">
                        {hab.hazardType}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 font-mono">{hab.population.toLocaleString()}</td>
                    <td className="py-3.5 px-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${
                              hab.vulnerabilityScore > 80
                                ? 'bg-red-500'
                                : hab.vulnerabilityScore > 50
                                ? 'bg-amber-500'
                                : 'bg-emerald-500'
                            }`}
                            style={{ width: `${hab.vulnerabilityScore}%` }}></div>
                        </div>
                        <span className="font-mono font-bold text-[11px]">{hab.vulnerabilityScore}%</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-3">
                      <span
                        className={`text-[10px] font-black px-2.5 py-0.5 rounded-full ${
                          hab.relocationPriority === 'CRITICAL'
                            ? 'bg-red-500/20 text-red-500 border border-red-500/40 animate-pulse'
                            : hab.relocationPriority === 'HIGH'
                            ? 'bg-amber-500/20 text-amber-500 border border-amber-500/40'
                            : 'bg-emerald-500/20 text-emerald-500 border border-emerald-500/40'
                        }`}>
                        {hab.relocationPriority}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      <Link
                        href={`/relocation?habId=${hab.id}`}
                        className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-[11px] font-bold inline-flex items-center space-x-1 shadow-sm transition-all hover:scale-105">
                        <Compass className="w-3 h-3" />
                        <span>Route</span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}