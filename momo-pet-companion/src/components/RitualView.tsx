import React, { useState } from 'react';
import { PetState } from '../types';

interface RitualViewProps {
  petState: PetState;
  onUpdatePet: (updater: (prev: PetState) => PetState) => void;
}

export const RitualView: React.FC<RitualViewProps> = ({
  petState,
  onUpdatePet,
}) => {
  const [isSparkling, setIsSparkling] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const showToastMsg = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  // Light up remembrance starlight
  const handleLightUpStar = () => {
    setIsSparkling(true);
    setTimeout(() => setIsSparkling(false), 800);

    onUpdatePet(prev => ({
      ...prev,
      starlightCount: prev.starlightCount + 1,
    }));

    showToastMsg(`✨ 成功点亮第 ${petState.starlightCount + 1} 颗思念星光！它已升入星空安放。`);
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#121212] text-[#F9F7F2] pt-16 pb-28 relative overflow-hidden font-sans">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#F9F7F2] text-[#121212] px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-2xl animate-bounce border border-[#121212]/20">
          {toast}
        </div>
      )}

      {/* Twinkling Star Field Background */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        {Array.from({ length: 24 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-twinkle"
            style={{
              left: `${(i * 17) % 95}%`,
              top: `${(i * 23) % 90}%`,
              width: `${(i % 3) + 2}px`,
              height: `${(i % 3) + 2}px`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-2xl mx-auto w-full px-6 flex flex-col items-center gap-8 pt-6 relative z-10">
        {/* Main Header Text */}
        <div className="flex flex-col items-center text-center gap-2">
          <span className="text-[9px] uppercase tracking-[0.4em] font-bold text-white/50">REMEMBRANCE JOURNEY</span>
          <h1 className="font-serif font-light italic text-3xl sm:text-4xl text-[#F9F7F2] tracking-tight">
            我们已怀念 <span className="font-mono underline decoration-white/40">{petState.remembranceDays}</span> 天
          </h1>
          <p className="text-xs text-white/60 max-w-xs leading-relaxed font-serif italic">
            星光永不熄灭，每一颗思念都在守护着你。
          </p>
        </div>

        {/* Central Interactive Starlight Jar Container */}
        <div className="relative w-64 h-80 flex items-center justify-center">
          {/* Particle Burst Shooting Animation when Lighted */}
          {isSparkling && (
            <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
              <div className="w-32 h-32 rounded-full bg-white/20 blur-xl animate-ping" />
              <span className="material-symbols-outlined text-[80px] text-white animate-bounce" style={{ fontVariationSettings: "'FILL' 1" }}>
                auto_awesome
              </span>
            </div>
          )}

          {/* Glass Jar Graphic Container */}
          <div className="relative w-48 h-64 rounded-[32px] border border-white/20 bg-white/5 backdrop-blur-md shadow-2xl flex flex-col items-center justify-end pb-6 overflow-hidden">
            {/* Jar Lid */}
            <div className="absolute top-0 w-28 h-5 bg-white/10 rounded-b-xl border-b border-white/20" />

            {/* Inner Floating Stars Inside Jar */}
            <div className="relative w-full h-44 flex flex-wrap items-center justify-center gap-2 p-4">
              {Array.from({ length: 12 }).map((_, idx) => (
                <span
                  key={idx}
                  className="material-symbols-outlined text-white/80 text-[18px] animate-pulse"
                  style={{
                    fontVariationSettings: "'FILL' 1",
                    animationDuration: `${1.5 + (idx % 3)}s`,
                    animationDelay: `${idx * 0.2}s`,
                    transform: `translateY(${(idx % 2 === 0 ? 1 : -1) * 4}px)`,
                  }}
                >
                  auto_awesome
                </span>
              ))}
            </div>

            {/* Jar Base Glow Line */}
            <div className="w-full h-6 bg-white/10 rounded-b-[28px]" />
          </div>
        </div>

        {/* Action Button: Light Up Today's Remembrance */}
        <button
          onClick={handleLightUpStar}
          className="relative z-10 flex items-center gap-2.5 bg-[#F9F7F2] text-[#121212] px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-widest shadow-xl active:scale-95 transition-all hover:bg-white"
        >
          <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            flare
          </span>
          <span>点亮今日的思念</span>
        </button>

        {/* Starlight Counter Stats Card */}
        <div className="w-full bg-white/5 rounded-2xl p-6 flex justify-around items-center border border-white/10 mt-2 backdrop-blur-md">
          <div className="flex flex-col items-center gap-1">
            <span className="text-[10px] uppercase font-bold tracking-widest text-white/50">已积聚星光</span>
            <span className="font-serif italic font-bold text-2xl text-[#F9F7F2]">
              {petState.starlightCount.toLocaleString()}
            </span>
          </div>

          <div className="w-[1px] h-8 bg-white/10" />

          <div className="flex flex-col items-center gap-1">
            <span className="text-[10px] uppercase font-bold tracking-widest text-white/50">发送心愿</span>
            <span className="font-serif italic font-bold text-2xl text-[#F9F7F2]">
              {petState.memoriesCount}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
