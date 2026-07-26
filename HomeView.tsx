import React, { useState, useEffect } from 'react';
import { PetState, TabType } from '../types';
import { IMAGES } from '../data/mockData';

interface HomeViewProps {
  petState: PetState;
  onUpdatePet: (updater: (prev: PetState) => PetState) => void;
  onNavigate: (tab: TabType) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  petState,
  onUpdatePet,
  onNavigate,
}) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [particles, setParticles] = useState<Array<{ id: number; left: number; top: number; size: number; duration: number; delay: number }>>([]);

  // Generate gentle ambient floating particles in hero banner
  useEffect(() => {
    const list = Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      left: Math.random() * 90 + 5,
      top: Math.random() * 90 + 5,
      size: Math.random() * 6 + 4,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
    }));
    setParticles(list);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Action Handlers
  const handleFeed = () => {
    onUpdatePet(prev => ({
      ...prev,
      fullness: Math.min(100, prev.fullness + 5),
      mood: Math.min(100, prev.mood + 2),
      coins: prev.coins + 10,
    }));
    showToast("🥣 喵呜！粮食很美味，毛毛饱食度 +5%，获得 10 金币！");
  };

  const handlePlayToys = () => {
    onUpdatePet(prev => ({
      ...prev,
      mood: Math.min(100, prev.mood + 6),
      coins: prev.coins + 15,
    }));
    showToast("🎾 啪嗒啪嗒！毛毛和你玩毛线球很开心，心情值 +6%！");
  };

  const handlePatrol = () => {
    showToast("👀 巡查完毕！毛毛健康状态良好，正在安稳午睡中。");
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#F9F7F2] text-[#121212] pt-16 pb-28 transition-colors duration-300 font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#121212] text-[#F9F7F2] px-6 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase shadow-2xl animate-bounce border border-white/20">
          {toastMessage}
        </div>
      )}

      {/* Editorial Sub Header Area */}
      <div className="flex items-center justify-between px-6 py-4 max-w-2xl mx-auto w-full border-b border-[#121212]/10 mb-2">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => onNavigate('home')}
            className="w-9 h-9 flex items-center justify-center rounded-full border border-[#121212]/15 bg-[#EBE8E0] hover:bg-[#D6D1C4] active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[#121212] text-[18px]">arrow_back</span>
          </button>
          <div className="flex flex-col">
            <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-[#121212]/50">CURATED JOURNAL</span>
            <h1 className="font-serif font-light text-xl text-[#121212] italic leading-tight">MoMo Chronicle</h1>
          </div>
        </div>

        <div className="flex gap-2">
          <button 
            onClick={() => showToast("✨ 已复制主页分享链接！快去展示给小伙伴吧~")}
            className="w-9 h-9 flex items-center justify-center rounded-full border border-[#121212]/15 bg-[#EBE8E0] hover:bg-[#D6D1C4] active:scale-95 transition-all"
            title="分享主页"
          >
            <span className="material-symbols-outlined text-[#121212] text-[18px]">share</span>
          </button>
          <button 
            onClick={() => onNavigate('profile')}
            className="w-9 h-9 flex items-center justify-center rounded-full border border-[#121212]/15 bg-[#EBE8E0] hover:bg-[#D6D1C4] active:scale-95 transition-all"
            title="设置"
          >
            <span className="material-symbols-outlined text-[#121212] text-[18px]">settings</span>
          </button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto w-full px-6 flex flex-col gap-6 mt-2">
        {/* Editorial Hero Feature */}
        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-[#121212]/15 shadow-xl bg-[#EBE8E0] group">
          <img 
            src={IMAGES.heroKitten} 
            alt="毛毛 - 围巾小猫" 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />

          {/* Editorial Overlay Pill */}
          <div className="absolute top-4 right-4 bg-[#121212] text-[#F9F7F2] px-4 py-1.5 rounded-full flex items-center gap-2 border border-white/20 shadow-md">
            <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              favorite
            </span>
            <span className="text-[10px] uppercase font-bold tracking-widest">
              陪伴 • {petState.companionDays} DAYS
            </span>
          </div>

          {/* Issue Tag in Hero Corner */}
          <div className="absolute bottom-4 left-4 bg-[#F9F7F2]/90 backdrop-blur-md px-3 py-1 rounded-sm border border-[#121212]/20">
            <span className="text-[9px] uppercase tracking-[0.25em] font-bold text-[#121212]">FEATURED COMPANION</span>
          </div>

          {/* Ambient Particles */}
          <div className="absolute inset-0 pointer-events-none">
            {particles.map((p) => (
              <div
                key={p.id}
                className="absolute bg-white/40 rounded-full animate-pulse"
                style={{
                  left: `${p.left}%`,
                  top: `${p.top}%`,
                  width: `${p.size}px`,
                  height: `${p.size}px`,
                  animationDuration: `${p.duration}s`,
                  animationDelay: `${p.delay}s`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Pet Info & Editorial Status Card */}
        <div className="-mt-10 relative z-10">
          <div className="bg-[#EBE8E0] rounded-2xl p-6 border border-[#121212]/15 shadow-lg flex flex-col gap-5">
            <div className="flex justify-between items-end border-b border-[#121212]/10 pb-4">
              <div className="flex flex-col">
                <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-[#121212]/50">THE SUBJECT</span>
                <div className="flex items-center gap-2">
                  <h2 className="font-serif font-light italic text-3xl text-[#121212]">{petState.name}</h2>
                  <span className="material-symbols-outlined text-[#121212]/60 text-[20px]">male</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2 bg-[#121212] text-[#F9F7F2] px-3 py-1 rounded-full border border-white/10">
                <div className="w-1.5 h-1.5 rounded-full bg-[#EBE8E0] animate-ping" />
                <span className="text-[9px] font-bold tracking-widest uppercase">ACTIVE SESSION</span>
              </div>
            </div>

            {/* Status Bars */}
            <div className="grid grid-cols-2 gap-6">
              {/* Fullness Bar */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-[#121212]/60">饱食度</span>
                  <span className="font-serif italic font-bold text-sm text-[#121212]">{petState.fullness}%</span>
                </div>
                <div className="h-2 w-full bg-[#D6D1C4] rounded-full overflow-hidden p-0.5 border border-[#121212]/10">
                  <div 
                    className="h-full bg-[#121212] rounded-full transition-all duration-500"
                    style={{ width: `${petState.fullness}%` }}
                  />
                </div>
              </div>

              {/* Mood Bar */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-[#121212]/60">心情值</span>
                  <span className="font-serif italic font-bold text-sm text-[#121212]">{petState.mood}%</span>
                </div>
                <div className="h-2 w-full bg-[#D6D1C4] rounded-full overflow-hidden p-0.5 border border-[#121212]/10">
                  <div 
                    className="h-full bg-[#121212] rounded-full transition-all duration-500"
                    style={{ width: `${petState.mood}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Daily Actions Grid */}
        <div className="mt-1">
          <div className="flex items-center justify-between mb-4 border-b border-[#121212]/10 pb-2">
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#121212]/60">DAILY INTERACTIONS</span>
            <button onClick={() => onNavigate('profile')} className="text-[#121212]/50 hover:text-[#121212] transition-colors">
              <span className="material-symbols-outlined text-[18px]">history</span>
            </button>
          </div>

          <div className="grid grid-cols-4 gap-3">
            {/* Food */}
            <button 
              onClick={handleFeed}
              className="group flex flex-col items-center gap-2 p-3 rounded-2xl bg-[#EBE8E0] border border-[#121212]/10 hover:border-[#121212]/30 transition-all active:scale-95"
            >
              <div className="w-12 h-12 rounded-full border border-[#121212]/20 bg-[#F9F7F2] text-[#121212] flex items-center justify-center group-hover:bg-[#121212] group-hover:text-[#F9F7F2] transition-all">
                <span className="material-symbols-outlined text-[22px]">restaurant</span>
              </div>
              <span className="text-[10px] uppercase tracking-wider font-bold text-[#121212]">粮食</span>
            </button>

            {/* Math / Focus */}
            <button 
              onClick={() => onNavigate('games')}
              className="group flex flex-col items-center gap-2 p-3 rounded-2xl bg-[#EBE8E0] border border-[#121212]/10 hover:border-[#121212]/30 transition-all active:scale-95"
            >
              <div className="w-12 h-12 rounded-full border border-[#121212]/20 bg-[#F9F7F2] text-[#121212] flex items-center justify-center group-hover:bg-[#121212] group-hover:text-[#F9F7F2] transition-all">
                <span className="material-symbols-outlined text-[22px]">calculate</span>
              </div>
              <span className="text-[10px] uppercase tracking-wider font-bold text-[#121212]">专注</span>
            </button>

            {/* Toys */}
            <button 
              onClick={handlePlayToys}
              className="group flex flex-col items-center gap-2 p-3 rounded-2xl bg-[#EBE8E0] border border-[#121212]/10 hover:border-[#121212]/30 transition-all active:scale-95"
            >
              <div className="w-12 h-12 rounded-full border border-[#121212]/20 bg-[#F9F7F2] text-[#121212] flex items-center justify-center group-hover:bg-[#121212] group-hover:text-[#F9F7F2] transition-all">
                <span className="material-symbols-outlined text-[22px]">sports_tennis</span>
              </div>
              <span className="text-[10px] uppercase tracking-wider font-bold text-[#121212]">玩具</span>
            </button>

            {/* Patrol */}
            <button 
              onClick={handlePatrol}
              className="group flex flex-col items-center gap-2 p-3 rounded-2xl bg-[#EBE8E0] border border-[#121212]/10 hover:border-[#121212]/30 transition-all active:scale-95"
            >
              <div className="w-12 h-12 rounded-full border border-[#121212]/20 bg-[#F9F7F2] text-[#121212] flex items-center justify-center group-hover:bg-[#121212] group-hover:text-[#F9F7F2] transition-all">
                <span className="material-symbols-outlined text-[22px]">visibility</span>
              </div>
              <span className="text-[10px] uppercase tracking-wider font-bold text-[#121212]">巡视</span>
            </button>
          </div>
        </div>

        {/* Narrative Section */}
        <div className="mt-1 mb-4">
          <div className="bg-[#EBE8E0] rounded-2xl p-6 border border-[#121212]/15 flex items-center gap-6 relative overflow-hidden">
            <div className="w-16 h-16 rounded-full border border-[#121212]/20 bg-[#F9F7F2] flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-[32px] text-[#121212]">
                bedtime
              </span>
            </div>

            <div className="flex flex-col gap-1 z-10">
              <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#121212]/50">CURRENT STATE</span>
              <h4 className="font-serif font-light text-lg italic text-[#121212]">安稳午睡中</h4>
              <p className="text-xs text-[#121212]/70 leading-relaxed font-sans">
                毛毛刚刚吃饱，现在正窝在温暖阳光里做梦呢。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
