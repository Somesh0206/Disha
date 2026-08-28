'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import LiveDisasterFeedsModal from './LiveDisasterFeedsModal';
import {
  ShieldAlert,
  MapPin,
  Compass,
  Building2,
  TrendingUp,
  SlidersHorizontal,
  BookOpen,
  Sun,
  Moon,
  Menu,
  X,
  Siren,
  ShieldCheck,
  UserCheck,
  Eye,
  Mic,
  Lock,
  PlusCircle
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const {
    isDarkMode,
    toggleTheme,
    openSosModal,
    openAddShelterModal,
    activeAlertCount,
    openVoiceAssistant,
    currentUser,
    setIsAuthModalOpen,
    language,
    setLanguage,
    t
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [isDisasterModalOpen, setIsDisasterModalOpen] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { href: '/', label: language === 'hi' ? 'अवलोकन' : 'Overview', icon: Compass },
    { href: '/red-zones', label: language === 'hi' ? 'रेड ज़ोन' : 'Red Zones', icon: MapPin },
    { href: '/shelters', label: language === 'hi' ? 'सुरक्षित आश्रय' : 'Safe Havens', icon: Building2 },
    { href: '/relocation', label: language === 'hi' ? 'पुनर्वास मार्ग' : 'Relocation', icon: TrendingUp },
    { href: '/predictions', label: language === 'hi' ? 'पूर्वानुमान' : 'AI Risk', icon: SlidersHorizontal },
    { href: '/chat', label: language === 'hi' ? 'चैट' : 'Chat', icon: Lock },
    { href: '/resources', label: language === 'hi' ? 'एसओपी' : 'SOPs', icon: BookOpen },
    { href: '/admin', label: language === 'hi' ? 'कंट्रोल' : 'Console', icon: ShieldAlert }
  ];

  const roleLabel =
    currentUser?.role === 'ADMIN'
      ? language === 'hi'
        ? 'प्रशासक'
        : 'Admin'
      : currentUser?.role === 'STAFF'
      ? language === 'hi'
        ? 'स्टाफ'
        : 'Staff'
      : language === 'hi'
      ? 'नागरिक'
      : 'Citizen';

  const roleBadgeColor =
    currentUser?.role === 'ADMIN'
      ? 'bg-red-500/15 text-red-600 dark:text-red-400 border-red-500/30'
      : currentUser?.role === 'STAFF'
      ? 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30'
      : 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30';

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md transition-colors overflow-x-hidden">
      {/* Real-time Ticker / Status Bar */}
      <div className="bg-gradient-to-r from-red-600 via-amber-600 to-red-700 text-white text-[11px] py-1 px-3 sm:px-6 font-medium flex items-center justify-between shadow-inner">
        <div className="flex items-center space-x-2 truncate">
          <span className="flex h-2 w-2 relative shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
          </span>
          <span className="font-black tracking-wider uppercase text-[9px] bg-red-950/60 px-1.5 py-0.5 rounded shrink-0">
            {language === 'hi' ? 'लाइव अलर्ट' : 'LIVE ALERT'}
          </span>
          <span className="truncate">
            {language === 'hi'
              ? 'वायनाड ढलान: भारी मलबा बहाव चेतावनी | 38 बस्तियां उच्च सतर्कता पर | कोसी बेसिन: एम्बर अलर्ट'
              : 'Wayanad Escarpment: Extreme Debris Flow Warning | 38 Habitations on Pre-Evacuation Alert | Kosi River: Amber Alert Level'}
          </span>
        </div>
        <div className="hidden lg:flex items-center space-x-3 shrink-0 text-slate-100 text-[10px] font-mono">
          <span>CLOCK: {currentTime || 'SYNCING...'}</span>
          <span className="bg-emerald-500/20 text-emerald-200 px-1.5 py-0.5 rounded border border-emerald-400/30 font-bold">
            SAT-FEED: ACTIVE
          </span>
        </div>
      </div>

      {/* Main Header */}
      <div className="w-full max-w-[1500px] mx-auto px-2 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-14 sm:h-15 gap-1 sm:gap-2">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center space-x-2 sm:space-x-2.5 group shrink-0">
            <div className="relative">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-red-600 via-rose-600 to-amber-600 flex items-center justify-center text-white font-black text-base sm:text-lg shadow-md shadow-red-600/30 group-hover:scale-105 transition-transform">
                D
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 border-2 border-white dark:border-slate-950"></span>
              </span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center space-x-1">
                <span className="font-black text-base sm:text-lg tracking-tight text-slate-900 dark:text-white group-hover:text-red-500 transition-colors">
                  {language === 'hi' ? 'दिशा' : 'DISHA'}
                </span>
                <span className="text-[9px] font-black px-1.5 py-0.2 rounded bg-red-500/10 text-red-500 border border-red-500/20 uppercase tracking-wider">
                  GEO
                </span>
              </div>
              <span className="text-[9px] text-slate-500 dark:text-slate-400 tracking-tight hidden xl:block leading-none">
                {language === 'hi' ? 'आपदा जोखिम पहचान' : 'Protecting Lives'}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-0.5 xl:space-x-1 shrink-1 overflow-hidden">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center space-x-1 px-2 xl:px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
                    isActive
                      ? 'bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`}>
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-red-500' : 'text-slate-400'}`} />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Actions Cluster: Language, Vaani, Role, Hub, Theme, and SOS */}
          <div className="flex items-center space-x-1 sm:space-x-1.5 shrink-0">
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 px-2 py-1 rounded-lg text-[11px] font-bold bg-slate-100 dark:bg-slate-850 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-all"
              title="Switch Language">
              <span>🌐</span>
              <span>{language === 'en' ? 'हिन्दी' : 'EN'}</span>
            </button>

            {/* Vaani AI Voice Trigger */}
            <button
              onClick={openVoiceAssistant}
              className="flex items-center space-x-1 px-2.5 py-1 rounded-lg text-[11px] font-black bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-sm transition-all"
              title="Open AI Voice Assistant (Vaani)">
              <Mic className="w-3 h-3 animate-pulse" />
              <span>{language === 'hi' ? 'वाणी' : 'Vaani'}</span>
            </button>

            {/* Role Clearance Switcher Badge */}
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className={`hidden md:flex items-center space-x-1 px-2 py-1 rounded-lg text-[11px] font-bold border ${roleBadgeColor} hover:opacity-80 transition-all`}
              title="Clearance Access Role">
              {currentUser?.role === 'ADMIN' ? (
                <ShieldCheck className="w-3 h-3 text-red-500" />
              ) : currentUser?.role === 'STAFF' ? (
                <UserCheck className="w-3 h-3 text-blue-500" />
              ) : (
                <Eye className="w-3 h-3 text-emerald-500" />
              )}
              <span>{roleLabel}</span>
            </button>

            {/* Quick Add Shelter / Hub button for Admin and Staff */}
            {(currentUser?.role === 'ADMIN' || currentUser?.role === 'STAFF') && (
              <button
                type="button"
                onClick={openAddShelterModal}
                className="hidden xl:flex items-center space-x-1 px-2 py-1 rounded-lg text-[11px] font-bold bg-teal-500/15 hover:bg-teal-500/25 text-teal-600 dark:text-teal-400 border border-teal-500/30 transition-all"
                title="Register Safe Haven or Hub">
                <PlusCircle className="w-3 h-3" />
                <span>{language === 'hi' ? '+ हब' : '+ Hub'}</span>
              </button>
            )}

            {/* Dark / Light Toggle */}
            <button
              onClick={toggleTheme}
              title="Toggle Theme"
              className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-850 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
              {isDarkMode ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-slate-700" />}
            </button>

            {/* EMERGENCY SOS Button */}
            <button
              onClick={() => openSosModal('citizen')}
              className="flex items-center space-x-1.5 bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-700 hover:to-rose-700 text-white px-2.5 sm:px-3.5 py-1.5 rounded-xl text-xs font-black shadow-md shadow-red-600/30 border border-red-400/30 transition-all hover:scale-105 active:scale-95 shrink-0"
              title="Emergency SOS Dispatch">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-90"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              <Siren className="w-3.5 h-3.5" />
              <span className="tracking-wide">{language === 'hi' ? 'एसओएस' : 'SOS'}</span>
              {activeAlertCount > 0 && (
                <span className="bg-red-950 text-white text-[9px] px-1.5 py-0.2 rounded-full font-mono font-bold">
                  {activeAlertCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 pt-3 pb-6 space-y-2">
          <div className="grid grid-cols-3 gap-2 pb-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsAuthModalOpen(true);
              }}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 flex flex-col items-center justify-center space-y-1">
              <ShieldCheck className="w-4 h-4 text-red-500" />
              <span>{roleLabel}</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openVoiceAssistant();
              }}
              className="p-2 rounded-xl bg-purple-500/10 text-xs font-bold text-purple-600 dark:text-purple-400 flex flex-col items-center justify-center space-y-1 border border-purple-500/20">
              <Mic className="w-4 h-4 text-purple-500" />
              <span>{language === 'hi' ? 'वाणी AI' : 'Vaani AI'}</span>
            </button>

            <Link
              href="/chat"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-xl bg-emerald-500/10 text-xs font-bold text-emerald-600 dark:text-emerald-400 flex flex-col items-center justify-center space-y-1 border border-emerald-500/20">
              <Lock className="w-4 h-4 text-emerald-500" />
              <span>{language === 'hi' ? 'सुरक्षित चैट' : 'Chat'}</span>
            </Link>
          </div>

          {(currentUser?.role === 'ADMIN' || currentUser?.role === 'STAFF') && (
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                openAddShelterModal();
              }}
              className="w-full py-2 px-3 rounded-xl bg-teal-500/15 border border-teal-500/30 text-teal-700 dark:text-teal-300 text-xs font-bold flex items-center justify-center space-x-1.5">
              <PlusCircle className="w-4 h-4" />
              <span>{language === 'hi' ? '+ नया सुरक्षित आश्रय / हब जोड़ें' : '+ Add Safe Shelter / Hub'}</span>
            </button>
          )}

          <div className="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-xl text-xs font-bold ${
                    isActive
                      ? 'bg-red-500/10 text-red-500 border border-red-500/20'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}>
                  <Icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}