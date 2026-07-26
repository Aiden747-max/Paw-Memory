import React, { useState } from 'react';
import { PetState, TimelineItem } from '../types';
import { IMAGES, defaultTimeline } from '../data/mockData';

interface ProfileViewProps {
  petState: PetState;
  onUpdatePet: (updater: (prev: PetState) => PetState) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  petState,
  onUpdatePet,
}) => {
  const [activeSegment, setActiveSegment] = useState<'growth' | 'milestones' | 'stats'>('growth');
  const [timeline, setTimeline] = useState<TimelineItem[]>(defaultTimeline);
  const [showAddModal, setShowAddModal] = useState(false);

  // New timeline entry form state
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newDate, setNewDate] = useState('2024.05.20');

  const handleAddEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newItem: TimelineItem = {
      id: `t-${Date.now()}`,
      date: newDate,
      title: newTitle,
      description: newDesc,
      icon: 'auto_awesome',
      image: IMAGES.gallerySleepingCat,
    };

    setTimeline([newItem, ...timeline]);
    setShowAddModal(false);
    setNewTitle('');
    setNewDesc('');
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#F9F7F2] text-[#121212] pt-16 pb-28 relative font-sans">
      <div className="max-w-2xl mx-auto w-full px-6 flex flex-col gap-6 pt-3">
        {/* Profile Header Card */}
        <div className="bg-[#EBE8E0] rounded-2xl p-6 border border-[#121212]/15 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-full overflow-hidden border border-[#121212]/30 bg-[#F9F7F2] p-0.5 shadow-xs">
              <img src={IMAGES.profileAvatar} alt={petState.name} className="w-full h-full object-cover rounded-full" />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <h2 className="font-serif italic text-2xl font-light text-[#121212]">{petState.name}</h2>
                <span className="material-symbols-outlined text-[#121212]/60 text-[18px]">male</span>
              </div>
              <span className="text-[10px] font-mono tracking-widest text-[#121212]/50">UID: {petState.uid}</span>
              <span className="text-xs font-serif italic text-[#121212] mt-0.5">陪伴 {petState.companionDays} 天</span>
            </div>
          </div>

          <button className="w-10 h-10 rounded-full border border-[#121212]/15 bg-[#F9F7F2] flex items-center justify-center text-[#121212] hover:bg-[#121212] hover:text-[#F9F7F2] transition-colors">
            <span className="material-symbols-outlined text-[18px]">edit</span>
          </button>
        </div>

        {/* Segmented Controls */}
        <div className="flex bg-[#EBE8E0] p-1.5 rounded-2xl border border-[#121212]/15">
          <button
            onClick={() => setActiveSegment('growth')}
            className={`flex-1 py-2 rounded-xl text-xs font-serif italic transition-all ${
              activeSegment === 'growth'
                ? 'bg-[#121212] text-[#F9F7F2] shadow-xs'
                : 'text-[#121212]/60 hover:text-[#121212]'
            }`}
          >
            成长记录
          </button>
          <button
            onClick={() => setActiveSegment('milestones')}
            className={`flex-1 py-2 rounded-xl text-xs font-serif italic transition-all ${
              activeSegment === 'milestones'
                ? 'bg-[#121212] text-[#F9F7F2] shadow-xs'
                : 'text-[#121212]/60 hover:text-[#121212]'
            }`}
          >
            里程碑
          </button>
          <button
            onClick={() => setActiveSegment('stats')}
            className={`flex-1 py-2 rounded-xl text-xs font-serif italic transition-all ${
              activeSegment === 'stats'
                ? 'bg-[#121212] text-[#F9F7F2] shadow-xs'
                : 'text-[#121212]/60 hover:text-[#121212]'
            }`}
          >
            数据统计
          </button>
        </div>

        {/* Growth Timeline Content */}
        {activeSegment === 'growth' && (
          <div className="relative flex flex-col gap-6 pl-4 border-l border-[#121212]/20 my-2">
            {timeline.map((item) => (
              <div key={item.id} className="relative pl-6">
                {/* Node Bullet Icon */}
                <div className="absolute -left-[20px] top-1 w-7 h-7 rounded-full bg-[#121212] text-[#F9F7F2] flex items-center justify-center shadow-xs border border-[#F9F7F2]">
                  <span className="material-symbols-outlined text-[14px]">{item.icon}</span>
                </div>

                {/* Node Card */}
                <div className="bg-[#EBE8E0] rounded-2xl p-5 border border-[#121212]/15 flex flex-col gap-2 shadow-xs">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#121212]/50">{item.date}</span>
                  <h3 className="font-serif italic text-base text-[#121212]">{item.title}</h3>
                  {item.description && (
                    <p className="text-xs text-[#121212]/80 leading-relaxed">{item.description}</p>
                  )}
                  {item.image && (
                    <div className="w-full aspect-[16/9] rounded-xl overflow-hidden mt-1 border border-[#121212]/15 bg-[#F9F7F2]">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                  )}
                  {item.tags && (
                    <div className="flex gap-2 mt-1">
                      {item.tags.map((tag, idx) => (
                        <span key={idx} className="text-[9px] uppercase font-bold text-[#121212] bg-[#F9F7F2] border border-[#121212]/15 px-2.5 py-0.5 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Milestones Content */}
        {activeSegment === 'milestones' && (
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#EBE8E0] p-5 rounded-2xl border border-[#121212]/15 flex flex-col gap-2">
              <span className="material-symbols-outlined text-[#121212] text-[28px]">emoji_events</span>
              <span className="font-serif italic text-base text-[#121212]">陪伴超越 1000 天</span>
              <span className="text-xs text-[#121212]/60">获得金牌护卫勋章</span>
            </div>
            <div className="bg-[#EBE8E0] p-5 rounded-2xl border border-[#121212]/15 flex flex-col gap-2">
              <span className="material-symbols-outlined text-[#121212] text-[28px]">auto_awesome</span>
              <span className="font-serif italic text-base text-[#121212]">捕捉 100 瞬间</span>
              <span className="text-xs text-[#121212]/60">获得摄影大师成就</span>
            </div>
          </div>
        )}

        {/* Stats Content */}
        {activeSegment === 'stats' && (
          <div className="bg-[#EBE8E0] rounded-2xl p-6 border border-[#121212]/15 flex flex-col gap-4">
            <span className="font-serif italic text-base text-[#121212]">数据概览</span>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-[#F9F7F2] p-3 rounded-xl border border-[#121212]/10">
                <span className="font-serif italic font-bold text-xl text-[#121212]">{petState.companionDays}</span>
                <span className="text-[10px] uppercase font-bold block text-[#121212]/50 mt-1">陪伴天数</span>
              </div>
              <div className="bg-[#F9F7F2] p-3 rounded-xl border border-[#121212]/10">
                <span className="font-serif italic font-bold text-xl text-[#121212]">{petState.memoriesCount}</span>
                <span className="text-[10px] uppercase font-bold block text-[#121212]/50 mt-1">回忆相册</span>
              </div>
              <div className="bg-[#F9F7F2] p-3 rounded-xl border border-[#121212]/10">
                <span className="font-serif italic font-bold text-xl text-[#121212]">{petState.coins}</span>
                <span className="text-[10px] uppercase font-bold block text-[#121212]/50 mt-1">金币积累</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Floating Add Timeline Entry Button */}
      <button 
        onClick={() => setShowAddModal(true)}
        className="fixed bottom-24 right-6 w-12 h-12 rounded-full bg-[#121212] text-[#F9F7F2] flex items-center justify-center shadow-xl active:scale-90 transition-transform border border-white/20"
      >
        <span className="material-symbols-outlined text-[24px]">add_a_photo</span>
      </button>

      {/* Add Timeline Entry Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#F9F7F2] text-[#121212] rounded-2xl w-full max-w-md p-6 flex flex-col gap-4 border border-[#121212]/20 shadow-2xl">
            <div className="flex justify-between items-center border-b border-[#121212]/10 pb-3">
              <h3 className="font-serif italic text-xl">记录里程碑</h3>
              <button onClick={() => setShowAddModal(false)} className="text-[#121212]/50 hover:text-[#121212]">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleAddEntry} className="flex flex-col gap-3">
              <input 
                type="text" 
                value={newDate} 
                onChange={e => setNewDate(e.target.value)}
                placeholder="日期 (如 2024.05.20)" 
                className="p-3 bg-[#EBE8E0] rounded-xl text-xs border border-[#121212]/15 outline-none focus:border-[#121212]" 
              />
              <input 
                type="text" 
                value={newTitle} 
                onChange={e => setNewTitle(e.target.value)}
                placeholder="里程碑标题..." 
                className="p-3 bg-[#EBE8E0] rounded-xl text-xs font-serif italic border border-[#121212]/15 outline-none focus:border-[#121212]" 
                required 
              />
              <textarea 
                rows={3} 
                value={newDesc} 
                onChange={e => setNewDesc(e.target.value)}
                placeholder="这天发生了什么值得纪念的事情..." 
                className="p-3 bg-[#EBE8E0] rounded-xl text-xs border border-[#121212]/15 outline-none focus:border-[#121212]" 
              />
              <div className="flex justify-end gap-2 mt-2">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-[#121212]/70 bg-[#EBE8E0]">
                  取消
                </button>
                <button type="submit" className="px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-[#F9F7F2] bg-[#121212]">
                  保存
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
