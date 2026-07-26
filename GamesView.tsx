import React, { useState } from 'react';
import { PetState, DailyTask, ShopItem } from '../types';
import { IMAGES, defaultDailyTasks, defaultShopItems } from '../data/mockData';

interface GamesViewProps {
  petState: PetState;
  onUpdatePet: (updater: (prev: PetState) => PetState) => void;
}

export const GamesView: React.FC<GamesViewProps> = ({
  petState,
  onUpdatePet,
}) => {
  const [activeModal, setActiveModal] = useState<'game' | 'tasks' | 'mall' | 'leaderboard' | null>(null);
  
  // Game state
  const [gameScore, setGameScore] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [targets, setTargets] = useState<Array<{ id: number; x: number; y: number; type: 'fish' | 'star' }>>([]);

  // Task & Shop State
  const [tasks, setTasks] = useState<DailyTask[]>(defaultDailyTasks);
  const [shopItems] = useState<ShopItem[]>(defaultShopItems);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  // Start Mini Game
  const handleStartGame = () => {
    setGameScore(0);
    setGameActive(true);
    setActiveModal('game');
    generateTargets();
  };

  const generateTargets = () => {
    const list = Array.from({ length: 5 }).map((_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 70 + 15,
      y: Math.random() * 60 + 20,
      type: Math.random() > 0.4 ? 'fish' : 'star',
    }));
    setTargets(list);
  };

  const handleTapTarget = (id: number, type: 'fish' | 'star') => {
    const points = type === 'fish' ? 20 : 30;
    setGameScore(prev => prev + points);
    setTargets(prev => prev.filter(t => t.id !== id));

    // If all tapped, spawn new batch
    if (targets.length <= 1) {
      setTimeout(() => generateTargets(), 300);
    }
  };

  const handleFinishGame = () => {
    const rewardCoins = Math.floor(gameScore / 2);
    onUpdatePet(prev => ({ ...prev, coins: prev.coins + rewardCoins }));
    showToast(`🎉 游戏结算完成！斩获 ${gameScore} 分，转化获得 ${rewardCoins} 金币！`);
    setGameActive(false);
    setActiveModal(null);
  };

  // Claim task reward
  const handleClaimTask = (taskId: string, reward: number) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, completed: true } : t));
    onUpdatePet(prev => ({ ...prev, coins: prev.coins + reward }));
    showToast(`🪙 成功领取任务奖励 +${reward} 金币！`);
  };

  // Buy item in shop
  const handleBuyItem = (item: ShopItem) => {
    if (petState.coins < item.price) {
      showToast("❌ 金币不足，快去参与游戏星挑战赚取金币吧！");
      return;
    }
    onUpdatePet(prev => ({ ...prev, coins: prev.coins - item.price }));
    showToast(`🛍️ 成功兑换 [${item.name}]！快去主页给毛毛体验吧~`);
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
        {/* Header with Coin Balance */}
        <div className="flex items-center justify-between w-full border-b border-[#121212]/10 pb-3">
          <div className="flex flex-col">
            <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-[#121212]/50">GAME PAVILION</span>
            <h1 className="font-serif font-light italic text-2xl text-[#121212]">游戏星</h1>
          </div>

          <div className="flex items-center gap-2 bg-[#EBE8E0] px-4 py-2 rounded-full border border-[#121212]/15 shadow-xs">
            <span className="material-symbols-outlined text-[#121212] text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              monetization_on
            </span>
            <span className="font-serif italic font-bold text-sm text-[#121212]">
              {petState.coins.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Interactive Game Room Banner */}
        <div className="relative w-full h-[300px] rounded-2xl overflow-hidden bg-[#EBE8E0] border border-[#121212]/20 shadow-md">
          <div className="absolute top-4 left-4 z-10 flex flex-col">
            <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-[#121212]/50">MINI GAME ARCHIVE</span>
            <span className="font-serif italic text-lg text-[#121212]">Cat Catching Challenge</span>
          </div>

          <div className="absolute inset-0 flex flex-col items-center justify-end pb-8">
            {/* Mascot Image */}
            <div className="absolute bottom-20 w-44 h-44 flex items-center justify-center animate-[bounce_3s_ease-in-out_infinite]">
              <img 
                src={IMAGES.gameMascot} 
                alt="毛毛游戏造型" 
                className="w-full h-full object-contain drop-shadow-md"
              />
            </div>

            {/* Start Challenge Button */}
            <button 
              onClick={handleStartGame}
              className="relative z-10 flex items-center gap-2 bg-[#121212] hover:bg-[#121212]/90 text-[#F9F7F2] px-8 py-3.5 rounded-full font-bold text-sm uppercase tracking-widest shadow-xl active:scale-95 transition-all"
            >
              <span>开始挑战</span>
              <span className="material-symbols-outlined text-[20px]">play_circle</span>
            </button>
          </div>
        </div>

        {/* 2x2 Function Grid */}
        <div className="grid grid-cols-2 gap-4">
          {/* Daily Tasks */}
          <button 
            onClick={() => setActiveModal('tasks')}
            className="flex flex-col items-center justify-center p-6 bg-[#EBE8E0] rounded-2xl gap-3 border border-[#121212]/15 shadow-xs active:scale-95 transition-all hover:border-[#121212]/40"
          >
            <div className="w-12 h-12 rounded-xl bg-[#121212] text-[#F9F7F2] flex items-center justify-center border border-white/20">
              <span className="material-symbols-outlined text-[24px]">event_upcoming</span>
            </div>
            <span className="font-serif italic text-base text-[#121212]">每日任务</span>
          </button>

          {/* Point Mall */}
          <button 
            onClick={() => setActiveModal('mall')}
            className="flex flex-col items-center justify-center p-6 bg-[#EBE8E0] rounded-2xl gap-3 border border-[#121212]/15 shadow-xs active:scale-95 transition-all hover:border-[#121212]/40"
          >
            <div className="w-12 h-12 rounded-xl bg-[#121212] text-[#F9F7F2] flex items-center justify-center border border-white/20">
              <span className="material-symbols-outlined text-[24px]">redeem</span>
            </div>
            <span className="font-serif italic text-base text-[#121212]">积分商城</span>
          </button>

          {/* Point Shop */}
          <button 
            onClick={() => setActiveModal('mall')}
            className="flex flex-col items-center justify-center p-6 bg-[#EBE8E0] rounded-2xl gap-3 border border-[#121212]/15 shadow-xs active:scale-95 transition-all hover:border-[#121212]/40"
          >
            <div className="w-12 h-12 rounded-xl bg-[#121212] text-[#F9F7F2] flex items-center justify-center border border-white/20">
              <span className="material-symbols-outlined text-[24px]">storefront</span>
            </div>
            <span className="font-serif italic text-base text-[#121212]">积分商店</span>
          </button>

          {/* Leaderboard */}
          <button 
            onClick={() => setActiveModal('leaderboard')}
            className="flex flex-col items-center justify-center p-6 bg-[#EBE8E0] rounded-2xl gap-3 border border-[#121212]/15 shadow-xs active:scale-95 transition-all hover:border-[#121212]/40"
          >
            <div className="w-12 h-12 rounded-xl bg-[#121212] text-[#F9F7F2] flex items-center justify-center border border-white/20">
              <span className="material-symbols-outlined text-[24px]">leaderboard</span>
            </div>
            <span className="font-serif italic text-base text-[#121212]">排行榜</span>
          </button>
        </div>

        {/* Recent Rewards Quick View */}
        <div className="bg-[#EBE8E0] rounded-2xl p-6 border border-[#121212]/15 shadow-xs">
          <div className="flex items-center justify-between mb-4 border-b border-[#121212]/10 pb-2">
            <span className="font-serif italic text-sm text-[#121212]">最近获得</span>
            <span className="material-symbols-outlined text-[#121212]/40 text-[18px]">chevron_right</span>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
            <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-[#F9F7F2] border border-[#121212]/15 flex items-center justify-center p-2">
              <img src={IMAGES.goldFish} alt="金鱼干" className="w-full h-full object-contain" />
            </div>
            <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-[#F9F7F2] border border-[#121212]/15 flex items-center justify-center p-2">
              <img src={IMAGES.yarnBall} alt="毛线球" className="w-full h-full object-contain" />
            </div>
            <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-[#F9F7F2] border border-[#121212]/15 flex items-center justify-center p-2">
              <img src={IMAGES.pawTrophy} alt="爪爪奖杯" className="w-full h-full object-contain" />
            </div>
            <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-[#F9F7F2] border border-dashed border-[#121212]/30 flex items-center justify-center">
              <span className="material-symbols-outlined text-[#121212]/40">add</span>
            </div>
          </div>
        </div>
      </div>

      {/* Playable Mini-Game Modal */}
      {activeModal === 'game' && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#F9F7F2] text-[#121212] rounded-2xl w-full max-w-md p-6 flex flex-col items-center gap-4 relative border border-[#121212]/20 shadow-2xl">
            <button 
              onClick={() => setActiveModal(null)} 
              className="absolute top-4 right-4 text-[#121212]/50 hover:text-[#121212]"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            <h3 className="font-serif italic text-xl">捕捉小金鱼与幸运星</h3>
            <p className="text-xs text-[#121212]/60">点击掉落的物品获取积分，结算可获取金币！</p>

            <div className="bg-[#EBE8E0] w-full h-64 rounded-xl relative overflow-hidden border border-[#121212]/15 my-2">
              <div className="absolute top-3 left-3 bg-[#121212] text-[#F9F7F2] px-3 py-1 rounded-full text-xs font-bold font-serif italic">
                得分: {gameScore}
              </div>

              {targets.map((t) => (
                <button
                  key={t.id}
                  onClick={() => handleTapTarget(t.id, t.type)}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 animate-bounce transition-transform active:scale-125"
                  style={{ left: `${t.x}%`, top: `${t.y}%` }}
                >
                  {t.type === 'fish' ? (
                    <img src={IMAGES.goldFish} alt="鱼" className="w-12 h-12 drop-shadow-md" />
                  ) : (
                    <span className="material-symbols-outlined text-[40px] text-[#121212] drop-shadow-md" style={{ fontVariationSettings: "'FILL' 1" }}>
                      auto_awesome
                    </span>
                  )}
                </button>
              ))}
            </div>

            <button 
              onClick={handleFinishGame}
              className="w-full bg-[#121212] text-[#F9F7F2] py-3 rounded-full text-xs font-bold uppercase tracking-widest shadow-md active:scale-95 transition-all"
            >
              完成并领取结算奖励
            </button>
          </div>
        </div>
      )}

      {/* Daily Tasks Modal */}
      {activeModal === 'tasks' && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#F9F7F2] text-[#121212] rounded-2xl w-full max-w-md p-6 flex flex-col gap-4 border border-[#121212]/20 shadow-2xl max-h-[80vh]">
            <div className="flex justify-between items-center border-b border-[#121212]/10 pb-3">
              <h3 className="font-serif italic text-xl">每日任务</h3>
              <button onClick={() => setActiveModal(null)} className="text-[#121212]/50 hover:text-[#121212]">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="flex flex-col gap-3 overflow-y-auto pr-1">
              {tasks.map(t => (
                <div key={t.id} className="flex items-center justify-between p-3.5 bg-[#EBE8E0] rounded-xl border border-[#121212]/15">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#121212]">{t.icon}</span>
                    <div className="flex flex-col">
                      <span className="font-serif italic text-sm text-[#121212]">{t.title}</span>
                      <span className="text-[10px] uppercase font-bold text-[#121212]/60">+{t.reward} 金币</span>
                    </div>
                  </div>

                  <button
                    disabled={t.completed}
                    onClick={() => handleClaimTask(t.id, t.reward)}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                      t.completed 
                        ? 'bg-[#121212]/10 text-[#121212]/40' 
                        : 'bg-[#121212] text-[#F9F7F2] active:scale-95 shadow-xs'
                    }`}
                  >
                    {t.completed ? '已完成' : '领取'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Point Mall Modal */}
      {activeModal === 'mall' && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#F9F7F2] text-[#121212] rounded-2xl w-full max-w-md p-6 flex flex-col gap-4 border border-[#121212]/20 shadow-2xl max-h-[80vh]">
            <div className="flex justify-between items-center border-b border-[#121212]/10 pb-3">
              <div className="flex items-center gap-2">
                <h3 className="font-serif italic text-xl">积分商城</h3>
                <span className="text-xs text-[#121212] bg-[#EBE8E0] border border-[#121212]/15 px-2.5 py-0.5 rounded-full font-serif italic">
                  🪙 {petState.coins}
                </span>
              </div>
              <button onClick={() => setActiveModal(null)} className="text-[#121212]/50 hover:text-[#121212]">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 overflow-y-auto pr-1">
              {shopItems.map(item => (
                <div key={item.id} className="bg-[#EBE8E0] p-4 rounded-xl flex flex-col items-center gap-2 border border-[#121212]/15">
                  <div className="w-16 h-16 rounded-xl bg-[#F9F7F2] flex items-center justify-center p-1 border border-[#121212]/10">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                    ) : (
                      <span className="material-symbols-outlined text-[#121212] text-[28px]">{item.icon}</span>
                    )}
                  </div>
                  <span className="font-serif italic text-xs text-[#121212]">{item.name}</span>
                  <span className="text-[10px] font-bold text-[#121212]/70">🪙 {item.price}</span>
                  <button
                    onClick={() => handleBuyItem(item)}
                    className="w-full bg-[#121212] text-[#F9F7F2] py-1.5 rounded-full text-xs font-bold uppercase tracking-wider active:scale-95 transition-all mt-1"
                  >
                    兑换
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Leaderboard Modal */}
      {activeModal === 'leaderboard' && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#F9F7F2] text-[#121212] rounded-2xl w-full max-w-md p-6 flex flex-col gap-4 border border-[#121212]/20 shadow-2xl">
            <div className="flex justify-between items-center border-b border-[#121212]/10 pb-3">
              <h3 className="font-serif italic text-xl">陪伴榜</h3>
              <button onClick={() => setActiveModal(null)} className="text-[#121212]/50 hover:text-[#121212]">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between p-3 bg-[#EBE8E0] rounded-xl border border-[#121212]/20">
                <div className="flex items-center gap-3">
                  <span className="font-serif italic text-lg font-bold text-[#121212]">1.</span>
                  <img src={IMAGES.maomaoAvatar} alt="毛毛" className="w-10 h-10 rounded-full border border-[#121212]/20 object-cover" />
                  <span className="font-serif italic text-sm font-bold text-[#121212]">毛毛 (当前)</span>
                </div>
                <span className="text-xs uppercase font-bold text-[#121212]/70">1126 天</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-[#EBE8E0] rounded-xl border border-[#121212]/15">
                <div className="flex items-center gap-3">
                  <span className="font-serif italic text-base text-[#121212]/50">2.</span>
                  <img src={IMAGES.naitangAvatar} alt="奶糖" className="w-10 h-10 rounded-full border border-[#121212]/20 object-cover" />
                  <span className="font-serif italic text-sm text-[#121212]">奶糖</span>
                </div>
                <span className="text-xs uppercase text-[#121212]/60">980 天</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
