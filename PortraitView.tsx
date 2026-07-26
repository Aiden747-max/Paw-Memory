import React, { useState } from 'react';
import { IMAGES } from '../data/mockData';

export const PortraitView: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'normal' | 'vintage' | 'warm' | 'celestial' | 'pastel'>('warm');
  const [isFlashing, setIsFlashing] = useState(false);
  const [snapshots, setSnapshots] = useState<string[]>([
    IMAGES.portraitKitten,
    IMAGES.gallerySleepingCat,
    IMAGES.galleryPaw,
    IMAGES.galleryTabbyKitten
  ]);
  const [showGallery, setShowGallery] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const showToastMsg = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  // Camera Shutter Action
  const handleTakeSnapshot = () => {
    setIsFlashing(true);
    setTimeout(() => setIsFlashing(false), 200);

    const newPhoto = IMAGES.portraitKitten;
    setSnapshots(prev => [newPhoto, ...prev]);
    showToastMsg("📸 咔嚓！毛毛精美写真已定格，保存至写真相册中！");
  };

  const filterStyles = {
    normal: '',
    vintage: 'sepia(0.3) contrast(1.1) brightness(0.95)',
    warm: 'saturate(1.2) sepia(0.15) hue-rotate(-10deg)',
    celestial: 'hue-rotate(180deg) saturate(1.1) brightness(1.05)',
    pastel: 'brightness(1.1) saturate(0.85) contrast(0.9)',
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#F9F7F2] text-[#121212] pt-16 pb-28 relative font-sans">
      {/* Camera Flash Effect Layer */}
      {isFlashing && (
        <div className="fixed inset-0 z-50 bg-white animate-out fade-out duration-300 pointer-events-none" />
      )}

      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#121212] text-[#F9F7F2] px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-2xl animate-bounce border border-white/20">
          {toast}
        </div>
      )}

      <div className="max-w-2xl mx-auto w-full px-6 flex flex-col gap-6 pt-3">
        {/* Editorial Header Controls */}
        <div className="flex items-center justify-between w-full border-b border-[#121212]/10 pb-3">
          <div className="flex flex-col">
            <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-[#121212]/50">ISSUE NO. 084</span>
            <h1 className="font-serif font-light italic text-2xl text-[#121212]">毛毛写真馆</h1>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => setShowGallery(true)}
              className="px-4 py-2 rounded-full border border-[#121212]/20 bg-[#EBE8E0] hover:bg-[#D6D1C4] text-[#121212] font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all"
            >
              <span className="material-symbols-outlined text-[16px]">photo_library</span>
              <span>相册 ({snapshots.length})</span>
            </button>
          </div>
        </div>

        {/* Central Magazine Cover Style Portrait Frame */}
        <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden border border-[#121212]/20 shadow-xl bg-[#EBE8E0]">
          <img 
            src={IMAGES.portraitKitten} 
            alt="毛毛写真" 
            className="w-full h-full object-cover transition-all duration-500"
            style={{ filter: filterStyles[activeFilter] }}
          />

          {/* Magazine Overlay Title Elements */}
          <div className="absolute top-6 left-6 right-6 flex justify-between items-start text-white drop-shadow-md pointer-events-none">
            <div className="flex flex-col">
              <span className="text-[9px] uppercase tracking-[0.4em] font-sans font-bold text-white/80">PORTRAIT SERIES</span>
              <span className="font-serif text-2xl font-light italic text-white">The Beauty of Form</span>
            </div>
            <span className="text-[9px] uppercase tracking-widest bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-white">
              {activeFilter}
            </span>
          </div>

          <div className="absolute bottom-6 left-6 text-white drop-shadow-md pointer-events-none">
            <span className="text-[9px] uppercase tracking-[0.3em] font-sans text-white/70">ARCHIVAL SNAPSHOT</span>
            <p className="font-serif italic text-sm text-white/90">MoMo in Warm Daylight Light</p>
          </div>
        </div>

        {/* Bottom Filter Selectors */}
        <div className="flex flex-col gap-2">
          <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#121212]/50 px-1">SELECT ART FILTER</span>
          <div className="flex justify-between items-center bg-[#EBE8E0] p-1.5 rounded-2xl border border-[#121212]/15">
            {[
              { id: 'normal', name: '原图', icon: 'filter_b_and_w' },
              { id: 'warm', name: '日系', icon: 'filter_vintage' },
              { id: 'vintage', name: '复古', icon: 'auto_stories' },
              { id: 'celestial', name: '星空', icon: 'temp_preferences_custom' },
              { id: 'pastel', name: '粉彩', icon: 'partly_cloudy_night' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id as any)}
                className={`flex-1 py-2 rounded-xl text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                  activeFilter === f.id
                    ? 'bg-[#121212] text-[#F9F7F2] shadow-xs scale-105'
                    : 'text-[#121212]/60 hover:text-[#121212]'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">{f.icon}</span>
                <span className="text-[10px] tracking-wider uppercase">{f.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Shutter Capture Button */}
        <div className="flex justify-center items-center py-2">
          <button
            onClick={handleTakeSnapshot}
            className="w-16 h-16 rounded-full bg-[#121212] text-[#F9F7F2] flex items-center justify-center p-2 shadow-xl active:scale-90 transition-transform relative group border border-white/20"
            title="拍摄写真"
          >
            <div className="w-full h-full rounded-full border border-white/40 flex items-center justify-center">
              <span className="material-symbols-outlined text-[28px]">photo_camera</span>
            </div>
          </button>
        </div>
      </div>

      {/* Gallery Modal Drawer */}
      {showGallery && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#F9F7F2] text-[#121212] rounded-2xl w-full max-w-md p-6 flex flex-col gap-4 border border-[#121212]/20 shadow-2xl max-h-[85vh]">
            <div className="flex justify-between items-center border-b border-[#121212]/10 pb-3">
              <h3 className="font-serif italic text-xl">定格写真胶片</h3>
              <button onClick={() => setShowGallery(false)} className="text-[#121212]/50 hover:text-[#121212]">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 overflow-y-auto pr-1">
              {snapshots.map((url, index) => (
                <div key={index} className="aspect-[3/4] rounded-xl overflow-hidden bg-[#EBE8E0] border border-[#121212]/15 relative group">
                  <img src={url} alt={`写真 ${index + 1}`} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white text-[10px] uppercase font-bold tracking-widest">NO. {snapshots.length - index}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
