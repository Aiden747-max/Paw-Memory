import React from 'react';
import { TabType, AppMode } from '../types';

interface NavigationProps {
  currentTab: TabType;
  appMode: AppMode;
  onSelectTab: (tab: TabType) => void;
  onSetMode: (mode: AppMode) => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentTab,
  appMode,
  onSelectTab,
  onSetMode,
}) => {
  // Navigation tabs for Daylight Mode
  const daylightTabs: { id: TabType; label: string; icon: string }[] = [
    { id: 'home', label: 'Journal', icon: 'pet_supplies' },
    { id: 'treehouse', label: 'Curated', icon: 'forest' },
    { id: 'portrait', label: 'Capture', icon: 'portrait' },
    { id: 'games', label: 'Focus', icon: 'auto_awesome' },
    { id: 'profile', label: 'Record', icon: 'article' },
  ];

  // Navigation tabs for Night / Starry Mode
  const nightTabs: { id: TabType; label: string; icon: string }[] = [
    { id: 'calendar', label: 'Calendar', icon: 'auto_awesome' },
    { id: 'ritual', label: 'Ritual', icon: 'flare' },
    { id: 'ai-chat', label: 'Dialogue', icon: 'neurology' },
    { id: 'treehole', label: 'Whisper', icon: 'forest' },
    { id: 'photo-vault', label: 'Archive', icon: 'photo_library' },
  ];

  // Render Daylight Bottom Navigation Bar
  if (appMode === 'daylight') {
    return (
      <nav className="fixed bottom-0 w-full z-50 pb-safe bg-[#F9F7F2]/95 backdrop-blur-md border-t border-[#121212]/10">
        <div className="flex justify-around items-center h-16 max-w-lg mx-auto px-4">
          {daylightTabs.map((tab) => {
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectTab(tab.id)}
                className={`flex flex-col items-center justify-center gap-0.5 px-3 py-1.5 rounded-full transition-all duration-200 ${
                  isActive
                    ? 'bg-[#121212] text-[#F9F7F2] font-bold shadow-xs scale-105'
                    : 'text-[#121212]/60 hover:text-[#121212] active:scale-95'
                }`}
              >
                <span className={`material-symbols-outlined text-[20px] ${isActive ? 'fill-current' : ''}`}>
                  {tab.icon}
                </span>
                <span className="text-[9px] uppercase tracking-widest font-sans font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    );
  }

  // Render Night / Starry Floating Capsule Bottom Navigation Bar
  return (
    <nav className="fixed bottom-4 left-6 right-6 z-50 pb-safe max-w-lg mx-auto">
      <div className="flex justify-between items-center h-16 px-4 bg-[#181715]/95 backdrop-blur-xl rounded-full border border-white/20 shadow-2xl">
        {nightTabs.map((tab) => {
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`flex flex-col items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ${
                isActive
                  ? 'bg-[#F9F7F2] text-[#121212] shadow-lg scale-110 font-bold'
                  : 'text-white/60 hover:text-white active:scale-95'
              }`}
              title={tab.label}
            >
              <span className={`material-symbols-outlined text-[22px] ${isActive ? 'fill-current' : ''}`}>
                {tab.icon}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
