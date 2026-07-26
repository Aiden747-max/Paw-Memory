import React, { useState } from 'react';
import { PostItem, PostComment } from '../types';
import { IMAGES } from '../data/mockData';

interface CommunityViewProps {
  posts: PostItem[];
  onAddPost: (newPost: PostItem) => void;
  onToggleLike: (postId: string) => void;
  onAddComment: (postId: string, commentText: string) => void;
}

export const CommunityView: React.FC<CommunityViewProps> = ({
  posts,
  onAddPost,
  onToggleLike,
  onAddComment,
}) => {
  const [activeTab, setActiveTab] = useState<'follow' | 'recommend' | 'nearby'>('follow');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeCommentPostId, setActiveCommentPostId] = useState<string | null>(null);
  const [newCommentInput, setNewCommentInput] = useState('');

  // Form states for creating a new post
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostLocation, setNewPostLocation] = useState('阳光猫窝');

  // Filter posts based on search query
  const filteredPosts = posts.filter(p => 
    p.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreatePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;

    const created: PostItem = {
      id: `post-${Date.now()}`,
      author: '毛毛',
      avatar: IMAGES.maomaoAvatar,
      time: '刚刚',
      content: newPostContent,
      image: IMAGES.greenParkCat,
      location: newPostLocation,
      likes: 1,
      userLiked: true,
      commentsList: [],
    };

    onAddPost(created);
    setNewPostContent('');
    setShowCreateModal(false);
  };

  const handleSendComment = (postId: string) => {
    if (!newCommentInput.trim()) return;
    onAddComment(postId, newCommentInput);
    setNewCommentInput('');
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#F9F7F2] text-[#121212] pt-16 pb-28 font-sans">
      <div className="max-w-2xl mx-auto w-full px-6 flex flex-col gap-5 pt-3">
        {/* Editorial Top Navigation Tabs & Create Button */}
        <div className="flex items-center justify-between gap-4 border-b border-[#121212]/10 pb-3">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setActiveTab('follow')}
              className="relative py-1 group"
            >
              <span className={`font-serif text-2xl italic transition-colors ${
                activeTab === 'follow' ? 'text-[#121212]' : 'text-[#121212]/40'
              }`}>
                关注
              </span>
              {activeTab === 'follow' && (
                <div className="absolute -bottom-3 left-0 right-0 h-0.5 bg-[#121212]" />
              )}
            </button>

            <button 
              onClick={() => setActiveTab('recommend')}
              className="relative py-1 group"
            >
              <span className={`font-serif text-2xl italic transition-colors ${
                activeTab === 'recommend' ? 'text-[#121212]' : 'text-[#121212]/40'
              }`}>
                精选
              </span>
              {activeTab === 'recommend' && (
                <div className="absolute -bottom-3 left-0 right-0 h-0.5 bg-[#121212]" />
              )}
            </button>

            <button 
              onClick={() => setActiveTab('nearby')}
              className="relative py-1 group"
            >
              <span className={`font-serif text-2xl italic transition-colors ${
                activeTab === 'nearby' ? 'text-[#121212]' : 'text-[#121212]/40'
              }`}>
                附近
              </span>
              {activeTab === 'nearby' && (
                <div className="absolute -bottom-3 left-0 right-0 h-0.5 bg-[#121212]" />
              )}
            </button>
          </div>

          <button 
            onClick={() => setShowCreateModal(true)}
            className="w-10 h-10 rounded-full border border-[#121212]/20 bg-[#121212] text-[#F9F7F2] flex items-center justify-center shadow-md active:scale-90 transition-transform hover:bg-[#121212]/80"
            title="发布新动态"
          >
            <span className="material-symbols-outlined text-[22px]">add</span>
          </button>
        </div>

        {/* Editorial Search Bar */}
        <div className="relative flex items-center">
          <span className="material-symbols-outlined absolute left-4 text-[#121212]/40">search</span>
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜索社区档案或纪实..."
            className="w-full h-11 pl-12 pr-4 rounded-full bg-[#EBE8E0] border border-[#121212]/15 focus:border-[#121212] text-sm text-[#121212] placeholder:text-[#121212]/40 outline-none transition-colors"
          />
        </div>

        {/* Feed List */}
        <div className="flex flex-col gap-6 mt-2">
          {filteredPosts.map((post) => (
            <div 
              key={post.id}
              className="bg-[#EBE8E0] rounded-2xl p-6 border border-[#121212]/15 flex flex-col gap-4 shadow-sm"
            >
              {/* Post Header */}
              <div className="flex items-center justify-between border-b border-[#121212]/10 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-[#121212]/20 bg-[#F9F7F2] flex-shrink-0">
                    <img 
                      src={post.avatar} 
                      alt={post.author} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-serif font-light italic text-base text-[#121212]">{post.author}</span>
                    <span className="text-[9px] uppercase tracking-widest text-[#121212]/50">{post.time}</span>
                  </div>
                </div>

                <button className="text-[#121212]/50 hover:text-[#121212]">
                  <span className="material-symbols-outlined">more_horiz</span>
                </button>
              </div>

              {/* Text Content */}
              <p className="text-sm text-[#121212]/80 leading-relaxed">
                {post.content}
              </p>

              {/* Post Image */}
              {post.image && (
                <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-[#121212]/15 bg-[#D6D1C4]">
                  <img 
                    src={post.image} 
                    alt="动态图片" 
                    className="w-full h-full object-cover"
                  />
                  {post.location && (
                    <div className="absolute top-3 right-3 bg-[#121212]/80 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 border border-white/10">
                      <span className="material-symbols-outlined text-white text-[12px]">location_on</span>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-white">{post.location}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Like / Comment Controls */}
              <div className="flex items-center justify-between pt-2 border-t border-[#121212]/10">
                <div className="flex items-center gap-6">
                  {/* Like Button */}
                  <button 
                    onClick={() => onToggleLike(post.id)}
                    className="flex items-center gap-1.5 group active:scale-95 transition-transform"
                  >
                    <span 
                      className={`material-symbols-outlined text-[20px] transition-colors ${
                        post.userLiked ? 'text-[#121212]' : 'text-[#121212]/40'
                      }`}
                      style={{ fontVariationSettings: post.userLiked ? "'FILL' 1" : "'FILL' 0" }}
                    >
                      favorite
                    </span>
                    <span className="text-xs font-serif italic text-[#121212]">
                      {post.likes}
                    </span>
                  </button>

                  {/* Comment Toggle Button */}
                  <button 
                    onClick={() => setActiveCommentPostId(activeCommentPostId === post.id ? null : post.id)}
                    className="flex items-center gap-1.5 text-[#121212]/50 hover:text-[#121212]"
                  >
                    <span className="material-symbols-outlined text-[20px]">chat_bubble</span>
                    <span className="text-xs font-serif italic">{post.commentsList.length}</span>
                  </button>
                </div>

                <button className="w-8 h-8 flex items-center justify-center rounded-full text-[#121212]/50 hover:text-[#121212]">
                  <span className="material-symbols-outlined text-[18px]">share</span>
                </button>
              </div>

              {/* Inline Comments Section */}
              {activeCommentPostId === post.id && (
                <div className="mt-2 pt-3 border-t border-[#121212]/10 flex flex-col gap-3 bg-[#F9F7F2] p-4 rounded-xl border border-[#121212]/10">
                  <div className="flex flex-col gap-2 max-h-48 overflow-y-auto no-scrollbar">
                    {post.commentsList.length === 0 ? (
                      <span className="text-xs text-[#121212]/50 italic">还没有评论，快来留下第一条想法吧~</span>
                    ) : (
                      post.commentsList.map(c => (
                        <div key={c.id} className="flex gap-2 text-xs">
                          <span className="font-serif italic font-bold text-[#121212]">{c.author}:</span>
                          <span className="text-[#121212]/80 flex-1">{c.content}</span>
                          <span className="text-[9px] uppercase tracking-widest text-[#121212]/40">{c.time}</span>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="flex items-center gap-2 mt-1">
                    <input 
                      type="text"
                      value={newCommentInput}
                      onChange={(e) => setNewCommentInput(e.target.value)}
                      placeholder="写下温暖评论..."
                      className="flex-1 bg-[#EBE8E0] px-3 py-1.5 rounded-full text-xs text-[#121212] border border-[#121212]/15 focus:outline-none"
                    />
                    <button 
                      onClick={() => handleSendComment(post.id)}
                      className="bg-[#121212] text-[#F9F7F2] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider active:scale-95"
                    >
                      发送
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* End Indicator */}
          <div className="py-8 flex flex-col items-center justify-center gap-2 opacity-40">
            <div className="w-8 h-8 rounded-full border border-[#121212] flex items-center justify-center">
              <span className="material-symbols-outlined text-[#121212] text-[16px]">auto_awesome</span>
            </div>
            <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#121212]">ARCHIVE END</span>
          </div>
        </div>
      </div>

      {/* Publish Post Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#F9F7F2] text-[#121212] rounded-2xl w-full max-w-md p-6 flex flex-col gap-4 border border-[#121212]/20 shadow-2xl">
            <div className="flex justify-between items-center border-b border-[#121212]/10 pb-3">
              <h3 className="font-serif italic text-xl">发布陪伴日志</h3>
              <button onClick={() => setShowCreateModal(false)} className="text-[#121212]/50 hover:text-[#121212]">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleCreatePostSubmit} className="flex flex-col gap-3">
              <textarea 
                rows={3}
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                placeholder="分享今天和毛毛的温馨故事..."
                className="w-full p-3 bg-[#EBE8E0] rounded-xl text-xs border border-[#121212]/15 outline-none focus:border-[#121212]"
                required
              />

              <div className="flex items-center gap-2 bg-[#EBE8E0] px-3 py-2 rounded-xl border border-[#121212]/15">
                <span className="material-symbols-outlined text-[#121212]/50 text-[18px]">location_on</span>
                <input 
                  type="text"
                  value={newPostLocation}
                  onChange={(e) => setNewPostLocation(e.target.value)}
                  placeholder="添加地点..."
                  className="bg-transparent text-xs text-[#121212] border-none outline-none w-full"
                />
              </div>

              <div className="flex justify-end gap-3 mt-2">
                <button 
                  type="button" 
                  onClick={() => setShowCreateModal(false)} 
                  className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-[#121212]/70 bg-[#EBE8E0]"
                >
                  取消
                </button>
                <button 
                  type="submit" 
                  className="px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-[#F9F7F2] bg-[#121212] shadow-md active:scale-95"
                >
                  发布
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
