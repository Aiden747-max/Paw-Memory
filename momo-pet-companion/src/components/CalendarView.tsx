import React, { useState } from 'react';
import { IMAGES } from '../data/mockData';

export const CalendarView: React.FC = () => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [selectedDay, setSelectedDay] = useState(20);

  const toggleAudio = () => {
    setIsPlayingAudio(prev => !prev);
  };

  // 31 days calendar array
  const calendarDays = Array.from({ length: 31 }, (_, i) => i + 1);

  // Star marked days
  const markedDays = [1, 5, 10, 14, 20, 25, 28];

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#F9F7F2] text-[#121212] pt-16 pb-28 font-sans">
      <div className="max-w-2xl mx-auto w-full px-6 flex flex-col gap-6 pt-3">
        {/* Date & Weather Header */}
        <div className="flex items-center justify-between border-b border-[#121212]/10 pb-3">
          <div className="flex flex-col">
            <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-[#121212]/50">CHRONICLE ARCHIVE</span>
            <h1 className="font-serif font-light italic text-2xl text-[#121212]">星空日历</h1>
          </div>

          <div className="flex items-center gap-2 bg-[#EBE8E0] border border-[#121212]/15 px-3.5 py-1.5 rounded-full">
            <span className="material-symbols-outlined text-[#121212] text-[16px]">partly_cloudy_night</span>
            <span className="text-xs font-serif italic text-[#121212]">5月20日 · 18°C</span>
          </div>
        </div>

        {/* MoMo's Voice Memo Message Card */}
        <div className="bg-[#121212] text-[#F9F7F2] rounded-2xl p-6 flex flex-col gap-4 border border-white/10 relative overflow-hidden shadow-xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-white/20 bg-[#F9F7F2] text-[#121212] flex items-center justify-center font-serif italic font-bold text-sm">
                毛
              </div>
              <div className="flex flex-col">
                <span className="font-serif italic text-base text-[#F9F7F2]">毛毛来信</span>
                <span className="text-[9px] uppercase tracking-widest text-white/50">14:30 DELIVERED</span>
              </div>
            </div>

            <span className="material-symbols-outlined text-[#F9F7F2] text-[20px]">mark_email_unread</span>
          </div>

          <p className="text-sm text-white/80 leading-relaxed font-light italic font-serif">
            “今天主人不在家，不过我一直很乖，睡了一整天，梦里也见到了主人哦~”
          </p>

          {/* Interactive Voice Player */}
          <div className="flex items-center gap-4 bg-white/10 rounded-xl p-3 border border-white/10">
            <button
              onClick={toggleAudio}
              className="w-9 h-9 rounded-full bg-[#F9F7F2] text-[#121212] flex items-center justify-center active:scale-95 transition-all shadow-md"
            >
              <span className="material-symbols-outlined text-[20px]">
                {isPlayingAudio ? 'pause' : 'play_arrow'}
              </span>
            </button>

            {/* Simulated Audio Waveform */}
            <div className="flex-1 flex items-center gap-1.5 h-6">
              {[12, 20, 8, 24, 16, 28, 10, 18, 22, 14, 26, 8, 20, 12, 16].map((h, i) => (
                <div
                  key={i}
                  className={`flex-1 bg-[#F9F7F2] rounded-full transition-all duration-300 ${
                    isPlayingAudio ? 'animate-pulse' : 'opacity-40'
                  }`}
                  style={{
                    height: isPlayingAudio ? `${Math.min(24, h + (i % 3) * 4)}px` : `${h}px`,
                  }}
                />
              ))}
            </div>

            <span className="text-[10px] font-mono text-white/60">0:15</span>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="bg-[#EBE8E0] rounded-2xl p-6 flex flex-col gap-4 border border-[#121212]/15 shadow-xs">
          <div className="flex items-center justify-between border-b border-[#121212]/10 pb-3">
            <span className="font-serif italic font-light text-xl text-[#121212]">2024年 5月</span>
            <div className="flex gap-2">
              <button className="w-8 h-8 rounded-full border border-[#121212]/15 flex items-center justify-center hover:bg-[#121212]/10">
                <span className="material-symbols-outlined text-sm text-[#121212]">chevron_left</span>
              </button>
              <button className="w-8 h-8 rounded-full border border-[#121212]/15 flex items-center justify-center hover:bg-[#121212]/10">
                <span className="material-symbols-outlined text-sm text-[#121212]">chevron_right</span>
              </button>
            </div>
          </div>

          {/* Days Header */}
          <div className="grid grid-cols-7 text-center text-[10px] uppercase tracking-widest font-bold text-[#121212]/50">
            {['日', '一', '二', '三', '四', '五', '六'].map((d, idx) => (
              <span key={idx}>{d}</span>
            ))}
          </div>

          {/* Day Cells Grid */}
          <div className="grid grid-cols-7 gap-2">
            {calendarDays.map((day) => {
              const isSelected = selectedDay === day;
              const hasMark = markedDays.includes(day);

              return (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`aspect-square rounded-xl flex flex-col items-center justify-center relative text-xs font-serif transition-all ${
                    isSelected
                      ? 'bg-[#121212] text-[#F9F7F2] font-bold shadow-md scale-105'
                      : 'bg-[#F9F7F2] text-[#121212] border border-[#121212]/10 hover:border-[#121212]/30'
                  }`}
                >
                  <span>{day}</span>
                  {hasMark && !isSelected && (
                    <span className="material-symbols-outlined text-[10px] text-[#121212] absolute bottom-1" style={{ fontVariationSettings: "'FILL' 1" }}>
                      auto_awesome
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Date Detail Card */}
        <div className="bg-[#EBE8E0] rounded-2xl p-5 border border-[#121212]/15 flex items-center gap-4 shadow-xs">
          <div className="w-16 h-16 rounded-xl overflow-hidden border border-[#121212]/15 bg-[#F9F7F2] flex-shrink-0">
            <img src={IMAGES.gallerySleepingCat} alt="相念记忆" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#121212]/60">5月{selectedDay}日 记忆</span>
            <p className="text-xs text-[#121212]/80 leading-snug">
              这天毛毛在阳台上晒了半天太阳，毛发热乎乎的，摸起来超级舒服。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
