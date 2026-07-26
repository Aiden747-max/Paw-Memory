import React, { useState } from 'react';
import { AppMode, TabType, PetState, PostItem } from './types';
import { initialPetState, defaultPosts } from './data/mockData';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';

// View Screens
import { HomeView } from './components/HomeView';
import { CommunityView } from './components/CommunityView';
import { GamesView } from './components/GamesView';
import { PortraitView } from './components/PortraitView';
import { CalendarView } from './components/CalendarView';
import { ProfileView } from './components/ProfileView';
import { RitualView } from './components/RitualView';
import { AiChatView } from './components/AiChatView';
import { TreeholeView } from './components/TreeholeView';
import { PhotoVaultView } from './components/PhotoVaultView';

export function App() {
  const [appMode, setAppMode] = useState<AppMode>('daylight');
  const [currentTab, setCurrentTab] = useState<TabType>('home');
  const [petState, setPetState] = useState<PetState>(initialPetState);
  const [posts, setPosts] = useState<PostItem[]>(defaultPosts);

  // Toggle Mode Handler
  const handleToggleMode = () => {
    if (appMode === 'daylight') {
      setAppMode('night');
      setCurrentTab('ritual');
    } else {
      setAppMode('daylight');
      setCurrentTab('home');
    }
  };

  // Tab Selection Handler
  const handleSelectTab = (tab: TabType) => {
    // Automatically adjust atmosphere mode if user navigates to a tab from another mode
    const nightTabs: TabType[] = ['calendar', 'ritual', 'ai-chat', 'treehole', 'photo-vault'];
    if (nightTabs.includes(tab)) {
      setAppMode('night');
    } else {
      setAppMode('daylight');
    }
    setCurrentTab(tab);
  };

  // Community Feed Handlers
  const handleAddPost = (newPost: PostItem) => {
    setPosts([newPost, ...posts]);
  };

  const handleToggleLike = (postId: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        const userLiked = !p.userLiked;
        const likes = userLiked ? p.likes + 1 : p.likes - 1;
        return { ...p, userLiked, likes };
      }
      return p;
    }));
  };

  const handleAddComment = (postId: string, commentText: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        const newComment = {
          id: `c-${Date.now()}`,
          author: '毛毛',
          avatar: petState.gender === 'male' ? posts[0].avatar : posts[1].avatar,
          content: commentText,
          time: '刚刚',
        };
        return {
          ...p,
          commentsList: [...p.commentsList, newComment],
        };
      }
      return p;
    }));
  };

  return (
    <div className={`min-h-screen w-full transition-colors duration-500 font-sans ${
      appMode === 'night' ? 'bg-[#121212] text-[#F9F7F2]' : 'bg-[#F9F7F2] text-[#121212]'
    }`}>
      {/* Top Header */}
      <Header
        currentTab={currentTab}
        appMode={appMode}
        onToggleMode={handleToggleMode}
        onSelectTab={handleSelectTab}
      />

      {/* Main View Screen Container */}
      <main className="w-full">
        {currentTab === 'home' && (
          <HomeView
            petState={petState}
            onUpdatePet={setPetState}
            onNavigate={handleSelectTab}
          />
        )}

        {currentTab === 'treehouse' && (
          <CommunityView
            posts={posts}
            onAddPost={handleAddPost}
            onToggleLike={handleToggleLike}
            onAddComment={handleAddComment}
          />
        )}

        {currentTab === 'portrait' && <PortraitView />}

        {currentTab === 'games' && (
          <GamesView
            petState={petState}
            onUpdatePet={setPetState}
          />
        )}

        {currentTab === 'profile' && (
          <ProfileView
            petState={petState}
            onUpdatePet={setPetState}
          />
        )}

        {currentTab === 'calendar' && <CalendarView />}

        {currentTab === 'ritual' && (
          <RitualView
            petState={petState}
            onUpdatePet={setPetState}
          />
        )}

        {currentTab === 'ai-chat' && <AiChatView />}

        {currentTab === 'treehole' && <TreeholeView />}

        {currentTab === 'photo-vault' && <PhotoVaultView />}
      </main>

      {/* Bottom Floating Navigation */}
      <Navigation
        currentTab={currentTab}
        appMode={appMode}
        onSelectTab={handleSelectTab}
        onSetMode={setAppMode}
      />
    </div>
  );
}

export default App;
