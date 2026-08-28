'use client';

import React, { useState } from 'react';
import { Volume2, Play, Square } from 'lucide-react';

export default function AudioVoiceAdvisor({
  textToSpeak,
  label = 'Listen to Emergency Audio Briefing'
}) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSpeak = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return;
    }

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    window.speechSynthesis.speak(utterance);
  };

  return (
    <button
      onClick={handleSpeak}
      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all duration-300 ${
        isPlaying
          ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-lg shadow-amber-500/40 scale-105 border border-amber-300'
          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-amber-500 hover:text-slate-950 border border-slate-200 dark:border-slate-700 hover:scale-105'
      }`}
      title={isPlaying ? 'Stop Voice Broadcast' : 'Play Voice Broadcast'}>
      {isPlaying ? (
        <>
          {/* Animated Equalizer Wave Bars */}
          <div className="flex items-end space-x-0.5 h-3.5">
            <span className="w-1 bg-slate-950 rounded-full animate-wave-bar" style={{ animationDelay: '0ms' }}></span>
            <span className="w-1 bg-slate-950 rounded-full animate-wave-bar" style={{ animationDelay: '150ms' }}></span>
            <span className="w-1 bg-slate-950 rounded-full animate-wave-bar" style={{ animationDelay: '300ms' }}></span>
            <span className="w-1 bg-slate-950 rounded-full animate-wave-bar" style={{ animationDelay: '450ms' }}></span>
          </div>
          <span>Broadcasting Live...</span>
        </>
      ) : (
        <>
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>{label}</span>
        </>
      )}
    </button>
  );
}