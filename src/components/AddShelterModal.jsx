'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import {
  Building2,
  MapPin,
  LocateFixed,
  Search,
  CheckCircle2,
  ShieldCheck,
  ShieldAlert,
  Lock,
  X,
  Truck,
  Droplet,
  Utensils,
  Zap,
  HeartPulse,
  Phone,
  UserCheck,
  AlertCircle,
  Sparkles,
  Loader2,
  PlusCircle,
  ChevronDown
} from 'lucide-react';
import {
  INDIA_STATES_AND_UTS,
  getCitiesForState,
  getDefaultCoordsForState
} from '@/data/indiaLocationsData';

const SHELTER_TYPES = [
  {
    id: 'RELOCATION_HUB',
    labelEn: 'Relocation & Transit Staging Hub',
    labelHi: 'पुनर्वास एवं पारगमन हब',
    icon: '🚚',
    badge: 'PRIORITY',
    color: 'teal'
  },
  {
    id: 'SCHOOL',
    labelEn: 'School / Higher Education Haven',
    labelHi: 'स्कूल / उच्च शिक्षा आश्रय स्थल',
    icon: '🏫',
    badge: 'STANDARD',
    color: 'indigo'
  },
  {
    id: 'HOSPITAL',
    labelEn: 'Hospital & Emergency Trauma Care',
    labelHi: 'अस्पताल एवं आपातकालीन ट्रॉमा केंद्र',
    icon: '🏥',
    badge: 'MEDICAL',
    color: 'emerald'
  },
  {
    id: 'STADIUM',
    labelEn: 'Stadium / Mega Evacuation Ground',
    labelHi: 'स्टेडियम / विशाल जनसमूह आश्रय',
    icon: '🏟️',
    badge: 'HIGH-CAPACITY',
    color: 'amber'
  },
  {
    id: 'GOVERNMENT_OFFICE',
    labelEn: 'Govt Secretariat / SDMA Complex',
    labelHi: 'सरकारी सचिवालय / आपदा कार्यालय',
    icon: '🏛️',
    badge: 'COMMAND',
    color: 'blue'
  },
  {
    id: 'COMMUNITY_HALL',
    labelEn: 'Community Relief Center / Hall',
    labelHi: 'सामुदायिक राहत केंद्र / भवन',
    icon: '🏢',
    badge: 'LOCAL',
    color: 'purple'
  }
];

const AMENITY_OPTIONS = [
  { id: '24x7 Emergency Power & Solar Backup Grid', labelEn: '⚡ 24x7 Power Backup & Solar Grid', labelHi: '⚡ 24x7 सौर व जनरेटर बैकअप' },
  { id: 'Safe Drinking Water Purification Point', labelEn: '💧 Safe RO Drinking Water Supply', labelHi: '💧 सुरक्षित पेयजल एवं आरओ' },
  { id: 'Community Kitchen & Food Ration Depot', labelEn: '🍲 Community Kitchen & Rations', labelHi: '🍲 सामुदायिक रसोई व राशन' },
  { id: 'First-Aid & Trauma Triage Station', labelEn: '🩺 First-Aid & Trauma Station', labelHi: '🩺 प्राथमिक चिकित्सा व डॉक्टर' },
  { id: 'Dedicated Sanitation & Hygiene Toilets', labelEn: '🚻 Sanitation & Clean Toilets', labelHi: '🚻 स्वच्छता एवं अलग शौचालय' },
  { id: 'Rapid Relocation & Evacuation Transit Fleet', labelEn: '🚚 Relocation Vehicle Transit Convoy', labelHi: '🚚 आपातकालीन 4x4 वाहन बेड़ा' }
];

export default function AddShelterModal() {
  const {
    isAddShelterModalOpen,
    closeAddShelterModal,
    addSafeShelter,
    userCoordinates,
    requestUserLocation,
    currentUser,
    setIsAuthModalOpen,
    language
  } = useApp();

  const [type, setType] = useState('RELOCATION_HUB');
  const [name, setName] = useState('');
  const [state, setState] = useState('Kerala');
  const [district, setDistrict] = useState('Wayanad');
  const [isCustomCity, setIsCustomCity] = useState(false);
  const [customCityInput, setCustomCityInput] = useState('');
  const [address, setAddress] = useState('');
  const [latitude, setLatitude] = useState(userCoordinates?.[0] ? userCoordinates[0].toFixed(5) : '11.55400');
  const [longitude, setLongitude] = useState(userCoordinates?.[1] ? userCoordinates[1].toFixed(5) : '76.12650');
  const [totalCapacity, setTotalCapacity] = useState('800');
  const [currentOccupancy, setCurrentOccupancy] = useState('0');
  const [contactPerson, setContactPerson] = useState('');
  const [phone, setPhone] = useState('+91 94471 23098');
  const [selectedAmenities, setSelectedAmenities] = useState([
    '24x7 Emergency Power & Solar Backup Grid',
    'Safe Drinking Water Purification Point',
    'Community Kitchen & Food Ration Depot',
    'First-Aid & Trauma Triage Station',
    'Rapid Relocation & Evacuation Transit Fleet'
  ]);

  const [isGeocoding, setIsGeocoding] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Available cities for currently selected state
  const availableCities = getCitiesForState(state);

  // When state changes, update district to first available city and update approximate default coords
  const handleStateChange = (selectedStateName) => {
    setState(selectedStateName);
    const cities = getCitiesForState(selectedStateName);
    if (cities && cities.length > 0) {
      setDistrict(cities[0]);
      setIsCustomCity(false);
      setCustomCityInput('');
    } else {
      setIsCustomCity(true);
      setDistrict('CUSTOM');
    }

    // If user hasn't customized coordinates with live GPS, provide state center
    if (!userCoordinates) {
      const defCoords = getDefaultCoordsForState(selectedStateName);
      setLatitude(defCoords[0].toFixed(5));
      setLongitude(defCoords[1].toFixed(5));
    }
  };

  const handleCityChange = (val) => {
    if (val === '__CUSTOM__') {
      setIsCustomCity(true);
      setDistrict('CUSTOM');
    } else {
      setIsCustomCity(false);
      setDistrict(val);
    }
  };

  if (!isAddShelterModalOpen) return null;

  const isAuthorized = currentUser?.role === 'ADMIN' || currentUser?.role === 'STAFF';

  // 1-click GPS lock
  const handleLockGPS = async () => {
    try {
      if (requestUserLocation) {
        const coords = await requestUserLocation();
        if (coords && Array.isArray(coords) && coords.length === 2) {
          setLatitude(coords[0].toFixed(5));
          setLongitude(coords[1].toFixed(5));
        }
      } else if (userCoordinates) {
        setLatitude(userCoordinates[0].toFixed(5));
        setLongitude(userCoordinates[1].toFixed(5));
      }
    } catch (err) {
      console.warn('Could not acquire GPS:', err);
    }
  };

  // 1-click Geocode from Address
  const handleGeocodeAddress = async () => {
    const finalDistrict = isCustomCity ? customCityInput : district;
    const queryStr = `${name} ${address} ${finalDistrict} ${state}`.trim();
    if (!queryStr) return;

    setIsGeocoding(true);
    setErrorMessage('');
    try {
      const res = await fetch(`/api/geocoding/search?q=${encodeURIComponent(queryStr)}`);
      const data = await res.json();
      if (data.success && data.results && data.results.length > 0) {
        const best = data.results[0];
        setLatitude(best.coordinates[0].toFixed(5));
        setLongitude(best.coordinates[1].toFixed(5));
        if (!address && best.displayName) {
          setAddress(best.displayName);
        }
      } else {
        setErrorMessage(
          language === 'hi'
            ? 'पता नहीं मिला। कृपया सीधे मानचित्र निर्देशांक दर्ज करें।'
            : 'Address coordinates not found automatically. Please enter lat/lon manually.'
        );
      }
    } catch {
      setErrorMessage(
        language === 'hi'
          ? 'जियोकोडिंग सेवा से संपर्क नहीं हो सका।'
          : 'Could not connect to geocoding service.'
      );
    } finally {
      setIsGeocoding(false);
    }
  };

  const handleToggleAmenity = (amenityId) => {
    if (selectedAmenities.includes(amenityId)) {
      setSelectedAmenities(selectedAmenities.filter((a) => a !== amenityId));
    } else {
      setSelectedAmenities([...selectedAmenities, amenityId]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!isAuthorized) {
      setErrorMessage(
        language === 'hi'
          ? 'सुरक्षा अनुमति अस्वीकृत: केवल SEOC प्रशासक या फील्ड स्टाफ नए आश्रय जोड़ सकते हैं।'
          : 'Access Denied: Only SEOC Administrators or Relief Staff are authorized to add new shelters.'
      );
      return;
    }

    if (!name.trim()) {
      setErrorMessage(language === 'hi' ? 'कृपया केंद्र का नाम दर्ज करें।' : 'Please enter facility name.');
      return;
    }

    const finalDistrict = isCustomCity ? customCityInput.trim() || 'Sector Hub' : district;

    const latNum = parseFloat(latitude);
    const lonNum = parseFloat(longitude);
    const capNum = parseInt(totalCapacity, 10);
    const occNum = parseInt(currentOccupancy, 10) || 0;

    if (isNaN(latNum) || isNaN(lonNum)) {
      setErrorMessage(
        language === 'hi'
          ? 'अमान्य निर्देशांक। कृपया वैध अक्षांश व देशांतर संख्या दर्ज करें।'
          : 'Invalid coordinates. Please provide valid numbers.'
      );
      return;
    }

    if (isNaN(capNum) || capNum <= 0) {
      setErrorMessage(
        language === 'hi'
          ? 'कृपया वैध कुल क्षमता दर्ज करें।'
          : 'Please enter a valid total capacity.'
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        name: name.trim(),
        type,
        state,
        district: finalDistrict,
        address: address.trim() || `${name}, ${finalDistrict}, ${state}`,
        coordinates: [latNum, lonNum],
        totalCapacity: capNum,
        currentOccupancy: occNum,
        contactPerson: contactPerson.trim() || (currentUser?.name ? `${currentUser.name} (${currentUser.role})` : 'SEOC Relief Officer'),
        phone: phone.trim() || '+91 112',
        amenities: selectedAmenities,
        addedByRole: currentUser?.role || 'STAFF',
        addedByName: currentUser?.name || 'Authorized Officer'
      };

      const result = await addSafeShelter(payload);

      if (result && result.success) {
        setSuccessMessage(
          language === 'hi'
            ? `सफलता: "${name}" को राष्ट्रीय सुरक्षित आश्रय ग्रिड में जोड़ा गया!`
            : `Success: "${name}" successfully registered into active GIS safe havens network!`
        );
        setTimeout(() => {
          closeAddShelterModal();
        }, 1200);
      } else {
        setErrorMessage(
          result?.error ||
            (language === 'hi'
              ? 'आश्रय सहेजने में विफल। कृपया पुनः प्रयास करें।'
              : 'Failed to save shelter. Please try again.')
        );
      }
    } catch (err) {
      setErrorMessage(err.message || 'An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const statesList = INDIA_STATES_AND_UTS.filter((item) => item.type === 'State');
  const utsList = INDIA_STATES_AND_UTS.filter((item) => item.type === 'Union Territory');

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-6">
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-700 p-5 text-white flex items-center justify-between shadow-md">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white text-xl backdrop-blur-sm">
              🏛️
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-base sm:text-lg font-black tracking-tight">
                  {language === 'hi'
                    ? 'नया सुरक्षित आश्रय / पुनर्वास हब जोड़ें'
                    : 'Register New Safe Haven / Relocation Hub'}
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/20 uppercase tracking-wider">
                  GIS Mesh
                </span>
              </div>
              <p className="text-xs text-teal-100">
                {language === 'hi'
                  ? 'राष्ट्रीय भू-स्थानिक नेटवर्क पर नया आपदा-रोधी आश्रय केंद्र जोड़ें'
                  : 'Add verified disaster-resilient shelter or transit hub to national GIS routing'}
              </p>
            </div>
          </div>

          <button
            onClick={closeAddShelterModal}
            className="p-2 rounded-xl bg-black/20 hover:bg-black/40 text-white transition-colors"
            title="Close">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Access Restriction Guard for Citizens / Non-Authorized Users */}
        {!isAuthorized ? (
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-3xl bg-teal-500/10 border-2 border-teal-500/30 text-teal-600 dark:text-teal-400 flex items-center justify-center mx-auto shadow-lg shadow-teal-500/20">
              <ShieldAlert className="w-8 h-8 animate-pulse" />
            </div>

            <div className="max-w-md mx-auto space-y-2">
              <h3 className="text-xl font-black text-slate-900 dark:text-white">
                {language === 'hi'
                  ? 'सुरक्षा अनुमति आवश्यक: केवल प्रशासक या राहत स्टाफ'
                  : 'SEOC Clearance Required: Admin or Staff Only'}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {language === 'hi'
                  ? 'नया सुरक्षित आश्रय या पुनर्वास हब जोड़ना राष्ट्रीय आपदा जीआईएस रूटिंग और वहन क्षमता गणना को सीधे प्रभावित करता है। केवल अधिकृत SEOC प्रशासकों और NDRF/SDRF स्टाफ को नए केंद्र जोड़ने की अनुमति है।'
                  : 'Registering new safe havens and relocation hubs modifies live GIS disaster routing meshes and carrying capacity calculations across national emergency networks. Only SEOC Administrators and NDRF/SDRF Relief Staff are authorized to add or modify shelters.'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400 flex items-center justify-between max-w-md mx-auto">
              <span className="flex items-center space-x-2">
                <Lock className="w-4 h-4 text-amber-500" />
                <span>{language === 'hi' ? 'वर्तमान भूमिका:' : 'Current Role:'}</span>
                <strong className="text-slate-800 dark:text-slate-200 uppercase font-mono">
                  {currentUser?.role || 'CITIZEN'}
                </strong>
              </span>
              <span className="text-[11px] text-red-500 font-bold">● LACKING CLEARANCE</span>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={closeAddShelterModal}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                {language === 'hi' ? 'वापस जाएं' : 'Dismiss'}
              </button>
              <button
                type="button"
                onClick={() => {
                  closeAddShelterModal();
                  setIsAuthModalOpen(true);
                }}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-700 hover:from-teal-700 hover:to-emerald-800 text-white font-black text-xs shadow-lg shadow-teal-600/30 flex items-center justify-center space-x-2 transition-all hover:scale-105">
                <ShieldCheck className="w-4 h-4" />
                <span>{language === 'hi' ? 'प्रशासक / स्टाफ के रूप में लॉगिन करें' : 'Authenticate as Admin / Staff'}</span>
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Active Submitter Clearance Bar */}
            <div className="px-6 py-2.5 bg-teal-500/10 dark:bg-teal-950/40 border-b border-teal-500/20 flex items-center justify-between text-xs text-teal-800 dark:text-teal-300">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                <span>
                  {language === 'hi' ? 'सत्यापित ऑपरेटर:' : 'Verified Operator:'}{' '}
                  <strong>{currentUser?.name || 'SEOC Command Officer'}</strong>
                </span>
                <span className="text-[10px] font-mono px-2 py-0.2 rounded-full bg-teal-500/20 text-teal-700 dark:text-teal-300 font-bold">
                  {currentUser?.role || 'STAFF'}
                </span>
              </div>
              <span className="text-[11px] font-mono text-teal-600 dark:text-teal-400 hidden sm:inline">
                CLEARANCE LEVEL: 1-A
              </span>
            </div>

            {/* Error / Success Notifications */}
            {errorMessage && (
              <div className="mx-6 mt-4 p-3 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}
            {successMessage && (
              <div className="mx-6 mt-4 p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{successMessage}</span>
              </div>
            )}

            {/* Modal Body Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
              {/* 1. Facility Category Picker */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                  {language === 'hi' ? '1. आश्रय / पुनर्वास हब का प्रकार चुनें' : '1. Select Facility Category'}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {SHELTER_TYPES.map((st) => {
                    const isSelected = type === st.id;
                    return (
                      <button
                        key={st.id}
                        type="button"
                        onClick={() => setType(st.id)}
                        className={`p-2.5 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                          isSelected
                            ? 'border-teal-500 bg-teal-500/15 text-teal-700 dark:text-teal-300 ring-2 ring-teal-500/30 shadow-sm'
                            : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                        }`}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xl">{st.icon}</span>
                          <span className="text-[9px] font-mono uppercase px-1.5 py-0.2 rounded bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-bold">
                            {st.badge}
                          </span>
                        </div>
                        <span className="text-xs font-bold leading-tight">
                          {language === 'hi' ? st.labelHi : st.labelEn}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Basic Facility Details with India States/UTs & Cities Dropdown */}
              <div className="space-y-3 pt-1">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  {language === 'hi' ? '2. केंद्र का नाम एवं राज्य / शहर चयन' : '2. Facility Name, State / UT & City'}
                </label>

                <div>
                  <input
                    type="text"
                    placeholder={
                      language === 'hi'
                        ? 'उदा. वेल्लारमाला सामुदायिक पुनर्वास हब'
                        : 'Facility Name (e.g., Vellarmala Community Relocation Hub)'
                    }
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-semibold focus:ring-2 focus:ring-teal-500 outline-none"
                  />
                </div>

                {/* State / Union Territory & City Dropdowns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {/* State / UT Dropdown */}
                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                      {language === 'hi' ? 'राज्य / केंद्र शासित प्रदेश (State / UT)' : 'State / Union Territory (28 States + 8 UTs)'}
                    </label>
                    <div className="relative">
                      <select
                        value={state}
                        onChange={(e) => handleStateChange(e.target.value)}
                        required
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-bold appearance-none cursor-pointer focus:ring-2 focus:ring-teal-500 outline-none pr-8">
                        <optgroup label={language === 'hi' ? 'भारतीय राज्य (28 States)' : 'Indian States (28 States)'}>
                          {statesList.map((st) => (
                            <option key={st.name} value={st.name}>
                              {st.name} {language === 'hi' ? `(${st.nameHi})` : ''}
                            </option>
                          ))}
                        </optgroup>
                        <optgroup label={language === 'hi' ? 'केंद्र शासित प्रदेश (8 UTs)' : 'Union Territories (8 UTs)'}>
                          {utsList.map((ut) => (
                            <option key={ut.name} value={ut.name}>
                              {ut.name} {language === 'hi' ? `(${ut.nameHi})` : ''}
                            </option>
                          ))}
                        </optgroup>
                      </select>
                      <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-3 pointer-events-none" />
                    </div>
                  </div>

                  {/* City / District Dropdown */}
                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                      {language === 'hi' ? 'शहर / जिला / सेक्टर (City / District)' : `City / District in ${state}`}
                    </label>
                    <div className="relative">
                      <select
                        value={isCustomCity ? '__CUSTOM__' : district}
                        onChange={(e) => handleCityChange(e.target.value)}
                        required
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-bold appearance-none cursor-pointer focus:ring-2 focus:ring-teal-500 outline-none pr-8">
                        {availableCities.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                        <option value="__CUSTOM__">
                          {language === 'hi' ? '➕ अन्य (कस्टम शहर का नाम टाइप करें)' : '➕ Other / Enter Custom City'}
                        </option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-3 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Custom City Text Input (If '+ Other / Enter Custom City' is picked) */}
                {isCustomCity && (
                  <div className="animate-in fade-in duration-150">
                    <input
                      type="text"
                      placeholder={
                        language === 'hi'
                          ? 'कस्टम शहर / नगर / वार्ड का नाम दर्ज करें'
                          : 'Enter custom city, municipality, or tehsil name'
                      }
                      value={customCityInput}
                      onChange={(e) => setCustomCityInput(e.target.value)}
                      required
                      className="w-full px-3.5 py-2 rounded-xl border border-teal-500/50 bg-teal-50/50 dark:bg-teal-950/20 text-slate-900 dark:text-white text-xs font-semibold focus:ring-2 focus:ring-teal-500 outline-none"
                    />
                  </div>
                )}

                {/* Street Address & Geocode */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder={
                      language === 'hi'
                        ? 'विस्तृत पता / लैंडमार्क (उदा. बाईपास रोड, मेप्पाडी)'
                        : 'Full Street Address / Landmark (e.g., Bypass Junction, NH 766, Meppadi)'
                    }
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs pr-28"
                  />
                  <button
                    type="button"
                    onClick={handleGeocodeAddress}
                    disabled={isGeocoding}
                    className="absolute right-1.5 top-1.5 px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-[10px] font-bold transition-all flex items-center space-x-1 shadow-sm">
                    {isGeocoding ? (
                      <Loader2 className="w-3 h-3 animate-spin" />
                    ) : (
                      <>
                        <Search className="w-3 h-3" />
                        <span>{language === 'hi' ? 'पता खोजें' : 'Geocode'}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* 3. GIS Coordinates Picker */}
              <div className="p-3.5 bg-teal-500/5 dark:bg-teal-950/20 border border-teal-500/30 rounded-2xl space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-teal-800 dark:text-teal-300 flex items-center space-x-1.5">
                    <MapPin className="w-4 h-4 text-teal-500" />
                    <span>
                      {language === 'hi'
                        ? '3. जीपीएस निर्देशांक (अक्षांश व देशांतर)'
                        : '3. Precise GIS Coordinates'}
                    </span>
                  </span>

                  <button
                    type="button"
                    onClick={handleLockGPS}
                    className="px-2.5 py-1 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-[10px] font-bold transition-all flex items-center space-x-1 shadow-sm">
                    <LocateFixed className="w-3 h-3" />
                    <span>{language === 'hi' ? '📍 वर्तमान जीपीएस लॉक करें' : '📍 Lock My GPS'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-mono text-slate-500 dark:text-slate-400 mb-0.5">
                      Latitude (अक्षांश)
                    </label>
                    <input
                      type="number"
                      step="0.00001"
                      value={latitude}
                      onChange={(e) => setLatitude(e.target.value)}
                      required
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-slate-500 dark:text-slate-400 mb-0.5">
                      Longitude (देशांतर)
                    </label>
                    <input
                      type="number"
                      step="0.00001"
                      value={longitude}
                      onChange={(e) => setLongitude(e.target.value)}
                      required
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* 4. Capacity & Nodal Logistics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {language === 'hi' ? 'कुल क्षमता (बिस्तर)' : 'Total Capacity'}
                  </label>
                  <input
                    type="number"
                    min="10"
                    max="50000"
                    value={totalCapacity}
                    onChange={(e) => setTotalCapacity(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-bold"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {language === 'hi' ? 'वर्तमान अधिभोग' : 'Live Occupancy'}
                  </label>
                  <input
                    type="number"
                    min="0"
                    max={totalCapacity || '1000'}
                    value={currentOccupancy}
                    onChange={(e) => setCurrentOccupancy(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-bold"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {language === 'hi' ? 'नोडल अधिकारी' : 'Nodal In-Charge'}
                  </label>
                  <input
                    type="text"
                    placeholder="Inspector / Officer"
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {language === 'hi' ? '24x7 फोन नंबर' : '24x7 Hotline'}
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-mono"
                  />
                </div>
              </div>

              {/* 5. Essential Amenities & Relocation Infrastructure */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                  {language === 'hi'
                    ? '5. उपलब्ध राहत सुविधाएं एवं पारगमन बुनियादी ढांचा'
                    : '5. Verified Amenities & Logistics'}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {AMENITY_OPTIONS.map((am) => {
                    const checked = selectedAmenities.includes(am.id);
                    return (
                      <button
                        key={am.id}
                        type="button"
                        onClick={() => handleToggleAmenity(am.id)}
                        className={`p-2 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${
                          checked
                            ? 'border-emerald-500 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 font-bold'
                            : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 text-slate-500'
                        }`}>
                        <span>{language === 'hi' ? am.labelHi : am.labelEn}</span>
                        {checked && <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 ml-1" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Submit Action */}
              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={closeAddShelterModal}
                  className="flex-1 py-3 px-4 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                  {language === 'hi' ? 'रद्द करें' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-[2] py-3 px-4 rounded-xl bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-700 hover:from-teal-700 hover:to-emerald-800 text-white font-bold text-xs shadow-lg shadow-teal-600/30 flex items-center justify-center space-x-2 transition-all hover:scale-[1.02] disabled:opacity-50">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>{language === 'hi' ? 'पंजीकृत किया जा रहा है...' : 'Registering on GIS Mesh...'}</span>
                    </>
                  ) : (
                    <>
                      <Building2 className="w-4 h-4" />
                      <span>
                        {language === 'hi'
                          ? 'सुरक्षित आश्रय / हब पंजीकृत करें'
                          : 'Register Safe Haven / Relocation Hub'}
                      </span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
