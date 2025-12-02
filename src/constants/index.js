import { Image, Layers, Zap } from 'lucide-react'

export const TONES = [
  { id: 'casual', label: 'Casual', emoji: '✌️' },
  { id: 'professional', label: 'Pro', emoji: '💼' },
  { id: 'witty', label: 'Witty', emoji: '⚡' },
  { id: 'inspirational', label: 'Inspire', emoji: '✨' },
  { id: 'genz', label: 'Gen-Z', emoji: '💀' },
  { id: 'poetic', label: 'Poetic', emoji: '🌙' },
  { id: 'sarcastic', label: 'Sarcastic', emoji: '😏' },
  { id: 'corporate', label: 'Corporate', emoji: '📊' },
  { id: 'luxury', label: 'Luxury', emoji: '👑' },
]

export const CONTENT_TYPES = [
  { id: 'post', label: 'Post', icon: Image },
  { id: 'story', label: 'Story', icon: Layers },
  { id: 'reel', label: 'Reel', icon: Zap },
]

export const NICHES = [
  { id: 'general', label: 'General', emoji: '📱' },
  { id: 'food', label: 'Food', emoji: '🍕' },
  { id: 'travel', label: 'Travel', emoji: '✈️' },
  { id: 'fitness', label: 'Fitness', emoji: '💪' },
  { id: 'fashion', label: 'Fashion', emoji: '👗' },
  { id: 'tech', label: 'Tech', emoji: '💻' },
  { id: 'beauty', label: 'Beauty', emoji: '💄' },
  { id: 'lifestyle', label: 'Lifestyle', emoji: '🌿' },
]

export const AUDIENCES = [
  { id: 'general', label: 'Everyone', emoji: '🌍' },
  { id: 'teens', label: 'Teens', emoji: '🎮' },
  { id: 'millennials', label: 'Millennials', emoji: '📱' },
  { id: 'professionals', label: 'Professionals', emoji: '💼' },
  { id: 'parents', label: 'Parents', emoji: '👨‍👩‍👧' },
  { id: 'creators', label: 'Creators', emoji: '🎨' },
  { id: 'entrepreneurs', label: 'Entrepreneurs', emoji: '🚀' },
  { id: 'students', label: 'Students', emoji: '📚' },
]

export const LENGTHS = [
  { id: 'short', label: 'Short', desc: '1-2 lines' },
  { id: 'medium', label: 'Medium', desc: '3-4 lines' },
  { id: 'long', label: 'Long', desc: '5+ lines' },
]

export const STORAGE_KEY = 'captiongen_api_key'


