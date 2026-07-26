import React, { useState } from 'react';
import { MediaVaultItem } from '../types';
import { defaultVaultItems } from '../data/mockData';

export const PhotoVaultView: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'video' | 'photo'>('all');
  const [items, setItems] = useState<MediaVaultItem[]>(defaultVaultItems);
  const [activeItem, setActiveItem] = useState<MediaVaultItem | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);

  // New photo upload form state
  const [captionInput, setCaptionInput] = useState('');
  const [typeInput, setTypeInput] = useState<'photo' | 'video'>('photo');

  const filteredItems = items.filter(i => {
    if (filter === 'video') return i.type === 'video';
    if (filter === 'photo') return i.type === 'photo';
    return true;
  });

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!captionInput.trim()) return;

    const newItem: MediaVaultItem = {
      id: `v-${Date.now()}`,
      type: typeInput,
      url: items[0].url,
      caption: captionInput,
      altText: captionInput,
      date: '刚刚',
    };

    setItems([newItem, ...items]);
    setCaptionInput('');
    setShowUploadModal(false);
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#F9F7F2] text-[#121212] pt-16 pb-28 font-sans">
      <div className="max-w-2xl mx-auto w-full px-6 flex flex-col gap-6 pt-3">
        {/* Header & Filter Bar */}
        <div className="flex items-center justify-between border-b border-[#121212]/10 pb-3">
          <div className="flex flex-col">
            <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-[#121212]/50">MEMORY VAULT</span>
            <h1 className="font-serif font-light italic text-2xl text-[#121212]">回忆保管箱</h1>
          </div>

          <button
            onClick={() => setShowUploadModal(true)}
            className="px-4 py-2 rounded-full bg-[#121212] text-[#F9F7F2] font-serif italic text-xs flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[16px]">add_a_photo</span>
            <span>添加回忆</span>
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex gap-2">
          {[
            { id: 'all', label: '全部' },
            { id: 'photo', label: '照片' },
            { id: 'video', label: '视频' },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id as any)}
              className={`px-4 py-1.5 rounded-full text-xs font-serif italic transition-all ${
                filter === f.id
                  ? 'bg-[#121212] text-[#F9F7F2] shadow-xs'
                  : 'bg-[#EBE8E0] text-[#121212]/70 border border-[#121212]/10 hover:border-[#121212]'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* 3x3 Photo & Video Grid */}
        <div className="grid grid-cols-3 gap-3">
          {filteredItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveItem(item)}
              className="aspect-square rounded-2xl overflow-hidden bg-[#EBE8E0] relative group border border-[#121212]/15 shadow-xs focus:outline-none"
            >
              <img
                src={item.url}
                alt={item.caption}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />

              {/* Video Badge */}
              {item.type === 'video' && (
                <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[#121212]/60 backdrop-blur-md flex items-center justify-center text-[#F9F7F2]">
                  <span className="material-symbols-outlined text-[14px]">play_arrow</span>
                </div>
              )}

              {/* Hover Caption Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#121212]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-2 flex flex-col justify-end text-left">
                <span className="text-[10px] text-[#F9F7F2] font-serif italic truncate">{item.caption}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeItem && (
        <div className="fixed inset-0 z-50 bg-[#121212]/90 backdrop-blur-xl flex flex-col items-center justify-between p-6">
          <div className="w-full max-w-md flex justify-between items-center text-[#F9F7F2]">
            <span className="text-xs font-serif italic text-[#F9F7F2]/80">{activeItem.date || '回忆珍藏'}</span>
            <button onClick={() => setActiveItem(null)} className="p-2 hover:text-white">
              <span className="material-symbols-outlined text-[28px]">close</span>
            </button>
          </div>

          <div className="w-full max-w-md my-auto aspect-square rounded-2xl overflow-hidden shadow-2xl relative border border-white/20 bg-[#121212]">
            <img src={activeItem.url} alt={activeItem.caption} className="w-full h-full object-cover" />
            {activeItem.type === 'video' && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <div className="w-16 h-16 rounded-full bg-[#F9F7F2] text-[#121212] flex items-center justify-center shadow-2xl">
                  <span className="material-symbols-outlined text-[36px]">play_arrow</span>
                </div>
              </div>
            )}
          </div>

          <div className="w-full max-w-md flex flex-col items-center text-center gap-3">
            <p className="text-xs text-[#F9F7F2]/90 font-serif italic">{activeItem.caption}</p>
            <div className="flex gap-4">
              <button className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-xs font-serif italic text-[#F9F7F2] flex items-center gap-1.5 border border-white/15">
                <span className="material-symbols-outlined text-[16px]">favorite</span>
                <span>珍藏</span>
              </button>
              <button className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-xs font-serif italic text-[#F9F7F2] flex items-center gap-1.5 border border-white/15">
                <span className="material-symbols-outlined text-[16px]">share</span>
                <span>分享</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Memory Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#F9F7F2] text-[#121212] rounded-2xl w-full max-w-md p-6 flex flex-col gap-4 border border-[#121212]/20 shadow-2xl">
            <div className="flex justify-between items-center border-b border-[#121212]/10 pb-3">
              <h3 className="font-serif italic text-xl">珍藏新回忆</h3>
              <button onClick={() => setShowUploadModal(false)} className="text-[#121212]/50 hover:text-[#121212]">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="flex flex-col gap-3">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setTypeInput('photo')}
                  className={`flex-1 py-2 rounded-xl text-xs font-serif italic ${
                    typeInput === 'photo' ? 'bg-[#121212] text-[#F9F7F2]' : 'bg-[#EBE8E0] text-[#121212]'
                  }`}
                >
                  照片
                </button>
                <button
                  type="button"
                  onClick={() => setTypeInput('video')}
                  className={`flex-1 py-2 rounded-xl text-xs font-serif italic ${
                    typeInput === 'video' ? 'bg-[#121212] text-[#F9F7F2]' : 'bg-[#EBE8E0] text-[#121212]'
                  }`}
                >
                  视频
                </button>
              </div>

              <input
                type="text"
                value={captionInput}
                onChange={(e) => setCaptionInput(e.target.value)}
                placeholder="这一刻发生了什么温暖的故事..."
                className="p-3 bg-[#EBE8E0] rounded-xl text-xs border border-[#121212]/15 outline-none text-[#121212] placeholder:text-[#121212]/40"
                required
              />

              <div className="flex justify-end gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-[#121212]/70 bg-[#EBE8E0]"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-[#F9F7F2] bg-[#121212]"
                >
                  归档保管
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
