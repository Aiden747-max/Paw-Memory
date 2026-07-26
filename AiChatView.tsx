import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { IMAGES } from '../data/mockData';

export const AiChatView: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-1',
      sender: 'pet',
      text: '嗨，我是毛毛的星空分身。今天有什么心里话想和我倾诉吗？喵呜~',
      timestamp: '刚刚',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Send message to Express backend (/api/chat)
  const handleSend = async (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsLoading(true);

    try {
      // Prepare conversation history for Gemini server call
      const history = messages.map(m => ({
        role: m.sender === 'user' ? 'user' : 'model',
        parts: [{ text: m.text }],
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history }),
      });

      const data = await res.json();
      const replyText = data.reply || "喵呜~ 无论什么时候，毛毛都在这片星空下温和地听着你呢。";

      const petMsg: ChatMessage = {
        id: `p-${Date.now()}`,
        sender: 'pet',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages(prev => [...prev, petMsg]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [
        ...prev,
        {
          id: `p-${Date.now()}`,
          sender: 'pet',
          text: '喵呜~ 刚刚星空信号闪烁了一下，不过毛毛一直有在好好陪着你哦。',
          timestamp: '刚刚',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#F9F7F2] text-[#121212] pt-16 pb-28 font-sans">
      <div className="max-w-2xl mx-auto w-full px-6 flex flex-col h-[calc(100vh-180px)] pt-2">
        {/* Top Header & Floating Glowing Avatar */}
        <div className="flex flex-col items-center gap-2 mb-4 flex-shrink-0">
          <div className="relative w-20 h-20 rounded-full overflow-hidden p-0.5 border border-[#121212]/30 bg-[#EBE8E0] shadow-sm">
            <img src={IMAGES.etherealAiCat} alt="毛毛 AI 数字生命" className="w-full h-full object-cover rounded-full" />
          </div>

          <div className="flex items-center gap-2 bg-[#EBE8E0] px-3.5 py-1 rounded-full border border-[#121212]/15">
            <span className="material-symbols-outlined text-[#121212] text-[14px] animate-spin">auto_awesome</span>
            <span className="text-xs font-serif italic font-bold text-[#121212]">毛毛 · 正在倾听</span>
          </div>
        </div>

        {/* Chat History Container */}
        <div className="flex-1 overflow-y-auto no-scrollbar flex flex-col gap-4 p-2">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col max-w-[85%] ${
                m.sender === 'user' ? 'self-end items-end' : 'self-start items-start'
              }`}
            >
              <div
                className={`p-4 rounded-2xl text-xs leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-[#121212] text-[#F9F7F2] font-sans rounded-tr-none shadow-sm'
                    : 'bg-[#EBE8E0] text-[#121212] font-serif italic border border-[#121212]/15 rounded-tl-none shadow-xs'
                }`}
              >
                {m.text}
              </div>
              <span className="text-[9px] uppercase tracking-widest text-[#121212]/40 mt-1 px-2 font-mono">{m.timestamp}</span>
            </div>
          ))}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="self-start bg-[#EBE8E0] border border-[#121212]/15 p-3 rounded-2xl text-xs text-[#121212] font-serif italic flex items-center gap-2 shadow-xs">
              <span className="material-symbols-outlined animate-spin text-[16px]">auto_awesome</span>
              <span>毛毛正在认真思考回应...</span>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="flex gap-2 overflow-x-auto py-2 no-scrollbar flex-shrink-0">
          {["我想你了", "讲个故事给毛毛听", "今天心情有点糟糕"].map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSend(prompt)}
              className="px-3.5 py-1.5 rounded-full bg-[#EBE8E0] hover:bg-[#121212] hover:text-[#F9F7F2] border border-[#121212]/15 text-xs font-serif italic text-[#121212] whitespace-nowrap active:scale-95 transition-all shadow-xs"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Bottom Input Field */}
        <div className="flex items-center gap-2 mt-1 flex-shrink-0">
          <div className="flex-1 flex items-center bg-[#EBE8E0] rounded-full px-4 py-2 border border-[#121212]/20">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="和星空中的毛毛说话..."
              className="w-full bg-transparent text-xs text-[#121212] placeholder:text-[#121212]/40 border-none outline-none"
            />
            <button 
              onClick={() => handleSend("喵呜！毛毛在吗？")}
              className="text-[#121212]/60 hover:text-[#121212] ml-2"
              title="语音倾听"
            >
              <span className="material-symbols-outlined text-[18px]">mic</span>
            </button>
          </div>

          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || isLoading}
            className="w-10 h-10 rounded-full bg-[#121212] text-[#F9F7F2] flex items-center justify-center font-bold active:scale-90 transition-all disabled:opacity-40"
          >
            <span className="material-symbols-outlined text-[18px]">send</span>
          </button>
        </div>
      </div>
    </div>
  );
};
