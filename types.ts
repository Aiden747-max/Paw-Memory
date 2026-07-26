export type AppMode = 'daylight' | 'night';

export type TabType = 
  | 'home' 
  | 'treehouse' 
  | 'portrait' 
  | 'games' 
  | 'profile'
  | 'calendar' 
  | 'ritual' 
  | 'ai-chat' 
  | 'treehole' 
  | 'photo-vault';

export interface PetState {
  name: string;
  gender: 'male' | 'female';
  uid: string;
  fullness: number; // 0-100
  mood: number; // 0-100
  companionDays: number; // e.g. 1126
  remembranceDays: number; // e.g. 236
  coins: number; // e.g. 1240
  starlightCount: number; // e.g. 1420
  memoriesCount: number; // e.g. 128
}

export interface PostComment {
  id: string;
  author: string;
  avatar: string;
  content: string;
  time: string;
}

export interface PostItem {
  id: string;
  author: string;
  avatar: string;
  time: string;
  content: string;
  image?: string;
  location?: string;
  likes: number;
  userLiked?: boolean;
  commentsList: PostComment[];
}

export interface TimelineItem {
  id: string;
  date: string;
  title: string;
  description?: string;
  image?: string;
  tags?: string[];
  icon: string;
}

export interface MediaVaultItem {
  id: string;
  type: 'photo' | 'video';
  url: string;
  caption: string;
  altText: string;
  date?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'pet';
  text: string;
  timestamp: string;
}

export interface DailyTask {
  id: string;
  title: string;
  reward: number;
  completed: boolean;
  progress: number;
  maxProgress: number;
  icon: string;
}

export interface ShopItem {
  id: string;
  name: string;
  price: number;
  icon: string;
  image?: string;
  category: 'food' | 'toy' | 'outfit' | 'decor';
}
