import React from 'react';
import { TabType, AppMode } from '../types';
import { APP_ICON } from '../data/mockData';

interface HeaderProps {
  currentTab: TabType;
  appMode: AppMode;
  onToggleMode: () => void;
  onSelectTab: (tab: TabType) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  appMode,
  onToggleMode,
  onSelectTab,
}) => {
  // Title mapping for each tab
  const tabTitles: Record<TabType, string> = {
    home: 'The Daily Chronicle',
    treehouse: 'Community Archive',
    portrait: 'Portrait Gallery',
    games: 'Play & Focus',
    profile: 'Companion Record',
    calendar: 'Starry Calendar',
    ritual: 'Remembrance Vault',
    'ai-chat': 'Dialogue & Memory',
    treehole: 'Whisper Archive',
    'photo-vault': 'Memory Archive',
  };

  return (
    <header className={`fixed top-0 w-full z-50 transition-colors duration-300 ${
      appMode === 'night' 
        ? 'bg-[#121212]/90 text-[#F9F7F2] border-b border-white/10 backdrop-blur-md' 
        : 'bg-[#F9F7F2]/90 text-[#121212] border-b border-[#121212]/10 backdrop-blur-md'
    } pt-safe`}>
      <div className="h-16 px-6 flex items-center justify-between max-w-2xl mx-auto">
        {/* Left: Editorial App Title */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onSelectTab(appMode === 'daylight' ? 'home' : 'ritual')}>
          <div className="w-8 h-8 rounded-full border border-[#121212]/20 dark:border-white/20 overflow-hidden flex items-center justify-center bg-[#EBE8E0] dark:bg-white/10">
            <img 
              src={APP_ICON} 
              alt="MoMo Icon" 
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] uppercase tracking-[0.25em] font-sans font-bold opacity-50 leading-none mb-0.5">
              Volume II • MoMo
            </span>
            <span className="font-serif font-light text-lg tracking-tight leading-none italic">
              {tabTitles[currentTab] || 'MoMo Archive'}
            </span>
          </div>
        </div>

        {/* Right Controls: Editorial Mode Switch & Profile */}
        <div className="flex items-center gap-3">
          {/* Editorial Atmosphere Switch */}
          <button
            onClick={onToggleMode}
            className={`px-3 py-1.5 rounded-full text-[10px] uppercase tracking-widest font-sans font-bold flex items-center gap-1.5 transition-all border ${
              appMode === 'daylight'
                ? 'bg-[#121212] text-[#F9F7F2] border-[#121212] hover:bg-[#121212]/80'
                : 'bg-[#F9F7F2] text-[#121212] border-[#F9F7F2] hover:bg-white'
            }`}
            title="切换陪伴模式 / 寄思星空"
          >
            <span className="material-symbols-outlined text-[14px]">
              {appMode === 'daylight' ? 'wb_sunny' : 'nights_stay'}
            </span>
            <span>{appMode === 'daylight' ? 'Daylight' : 'Nightfall'}</span>
          </button>

          {/* User Profile Button */}
          <button 
            onClick={() => onSelectTab('profile')}
            className={`w-8 h-8 rounded-full border flex items-center justify-center transition-transform active:scale-90 ${
              appMode === 'night' 
                ? 'border-white/20 bg-white/10 text-[#F9F7F2] hover:bg-white/20' 
                : 'border-[#121212]/20 bg-[#EBE8E0] text-[#121212] hover:bg-[#D6D1C4]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">person</span>
          </button>
        </div>
      </div>
    </header>
  );
};
