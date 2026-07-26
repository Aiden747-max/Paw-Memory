import React, { useState } from 'react';
import { IMAGES } from '../data/mockData';

export const TreeholeView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'recommend' | 'listening'>('recommend');
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [newNoteInput, setNewNoteInput] = useState('');
  const [notes, setNotes] = useState<Array<{ id: string; topic: string; author: string; text: string; time: string }>>([
    {
      id: 'n1',
      topic: '表达怀念',
      author: '温柔的风',
      text: '今天阳台上的阳光很暖，好像你又缩在我的膝盖上打瞌睡。想你了。',
      time: '10分钟前',
    },
    {
      id: 'n2',
      topic: '寻找共鸣',
      author: '星光守护者',
      text: '虽然你离开了，但你带给我的温暖与爱永远留在心里。',
      time: '25分钟前',
    },
  ]);
  const [toast, setToast] = useState<string | null>(null);

  const showToastMsg = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const handlePostNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteInput.trim() || !selectedTopic) return;

    const newEntry = {
      id: `n-${Date.now()}`,
      topic: selectedTopic,
      author: '毛毛的主人',
      text: newNoteInput,
      time: '刚刚',
    };

    setNotes([newEntry, ...notes]);
    setNewNoteInput('');
    showToastMsg("✨ 你的寄语已安放在树洞中，愿风能把思念传到星空。");
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#F9F7F2] text-[#121212] pt-16 pb-28 font-sans">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#121212] text-[#F9F7F2] px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-2xl animate-bounce border border-white/20">
          {toast}
        </div>
      )}

      <div className="max-w-2xl mx-auto w-full px-6 flex flex-col gap-6 pt-3">
        {/* Navigation Tabs */}
        <div className="flex items-center justify-between border-b border-[#121212]/10 pb-3">
          <div className="flex gap-6">
            <button
              onClick={() => setActiveTab('recommend')}
              className={`font-serif italic text-2xl font-light transition-colors ${
                activeTab === 'recommend' ? 'text-[#121212]' : 'text-[#121212]/30'
              }`}
            >
              推荐
            </button>
            <button
              onClick={() => setActiveTab('listening')}
              className={`font-serif italic text-2xl font-light transition-colors ${
                activeTab === 'listening' ? 'text-[#121212]' : 'text-[#121212]/30'
              }`}
            >
              正在倾听
            </button>
          </div>

          <span className="material-symbols-outlined text-[#121212] text-[20px]">filter_vintage</span>
        </div>

        {/* Quiet Moment Banner Card */}
        <div className="bg-[#EBE8E0] rounded-2xl p-6 flex flex-col gap-4 border border-[#121212]/15 relative overflow-hidden shadow-xs">
          <div className="flex flex-col gap-1">
            <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-[#121212]/50">SILENT MOMENT</span>
            <p className="text-base font-serif italic text-[#121212] leading-snug">
              在这里，你可以安心说出想说的话。
            </p>
          </div>

          {/* Traveler Avatar Stack */}
          <div className="flex items-center gap-3 pt-3 border-t border-[#121212]/10">
            <div className="flex -space-x-2">
              {IMAGES.treeholeAvatars.map((url, idx) => (
                <img
                  key={idx}
                  src={url}
                  alt="旅人头像"
                  className="w-8 h-8 rounded-full border border-[#F9F7F2] object-cover"
                />
              ))}
            </div>
            <span className="text-xs text-[#121212]/70">1,204 位旅人正在这里静静倾听</span>
          </div>
        </div>

        {/* 2x2 Feature Grid */}
        <div className="grid grid-cols-2 gap-4">
          {[
            { id: '表达怀念', icon: 'favorite', title: '表达怀念' },
            { id: '加深慰藉', icon: 'spa', title: '加深慰藉' },
            { id: '倾听故事', icon: 'auto_stories', title: '倾听故事' },
            { id: '寻找共鸣', icon: 'waves', title: '寻找共鸣' },
          ].map((topic) => (
            <button
              key={topic.id}
              onClick={() => setSelectedTopic(topic.id)}
              className="bg-[#EBE8E0] rounded-2xl p-6 flex flex-col items-center justify-center gap-3 border border-[#121212]/15 hover:border-[#121212] transition-all active:scale-95 shadow-xs"
            >
              <div className="w-10 h-10 rounded-full border border-[#121212]/20 bg-[#F9F7F2] flex items-center justify-center">
                <span className="material-symbols-outlined text-[#121212] text-[22px]">{topic.icon}</span>
              </div>
              <span className="font-serif italic text-base text-[#121212]">{topic.title}</span>
            </button>
          ))}
        </div>

        {/* Recent Treehole Notes Feed */}
        <div className="flex flex-col gap-3 mt-2">
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#121212]/50 px-1">树洞里的温情声响</span>
          {notes.map((n) => (
            <div key={n.id} className="bg-[#EBE8E0] p-5 rounded-2xl border border-[#121212]/15 flex flex-col gap-2 shadow-xs">
              <div className="flex justify-between items-center text-xs">
                <span className="font-serif italic font-bold text-[#121212]">{n.topic} · {n.author}</span>
                <span className="text-[10px] font-mono text-[#121212]/40">{n.time}</span>
              </div>
              <p className="text-xs text-[#121212]/80 leading-relaxed font-sans">{n.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Topic Drawer / Post Modal */}
      {selectedTopic && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-md flex items-end sm:items-center justify-center p-4">
          <div className="bg-[#F9F7F2] text-[#121212] rounded-2xl w-full max-w-md p-6 flex flex-col gap-4 border border-[#121212]/20 shadow-2xl">
            <div className="flex justify-between items-center border-b border-[#121212]/10 pb-3">
              <h3 className="font-serif italic text-xl text-[#121212]">{selectedTopic} · 寄语</h3>
              <button onClick={() => setSelectedTopic(null)} className="text-[#121212]/50 hover:text-[#121212]">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handlePostNote} className="flex flex-col gap-3">
              <textarea
                rows={4}
                value={newNoteInput}
                onChange={(e) => setNewNoteInput(e.target.value)}
                placeholder="将你的思念写在这里，风会送达..."
                className="w-full p-4 bg-[#EBE8E0] rounded-xl text-xs text-[#121212] placeholder:text-[#121212]/40 border border-[#121212]/15 focus:outline-none focus:border-[#121212]"
                required
              />

              <div className="flex justify-end gap-2 mt-1">
                <button
                  type="button"
                  onClick={() => setSelectedTopic(null)}
                  className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-[#121212]/70 bg-[#EBE8E0]"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-[#F9F7F2] bg-[#121212] active:scale-95"
                >
                  寄出思念
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
