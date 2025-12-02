import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Sparkles, Copy, Check, Settings, X, Hash, Smile, Users,
  RefreshCw, Image, Layers, Zap, ImagePlus, Trash2, AlertCircle, Wand2,
  Heart, MessageCircle, Send, Bookmark, MoreHorizontal, AlignLeft,
  Camera, Instagram, ImageIcon, Film, Aperture
} from 'lucide-react'
import { GoogleGenerativeAI } from '@google/generative-ai'
import confetti from 'canvas-confetti'

const TONES = [
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

const CONTENT_TYPES = [
  { id: 'post', label: 'Post', icon: Image },
  { id: 'story', label: 'Story', icon: Layers },
  { id: 'reel', label: 'Reel', icon: Zap },
]

const NICHES = [
  { id: 'general', label: 'General', emoji: '📱' },
  { id: 'food', label: 'Food', emoji: '🍕' },
  { id: 'travel', label: 'Travel', emoji: '✈️' },
  { id: 'fitness', label: 'Fitness', emoji: '💪' },
  { id: 'fashion', label: 'Fashion', emoji: '👗' },
  { id: 'tech', label: 'Tech', emoji: '💻' },
  { id: 'beauty', label: 'Beauty', emoji: '💄' },
  { id: 'lifestyle', label: 'Lifestyle', emoji: '🌿' },
]

const AUDIENCES = [
  { id: 'general', label: 'Everyone', emoji: '🌍' },
  { id: 'teens', label: 'Teens', emoji: '🎮' },
  { id: 'millennials', label: 'Millennials', emoji: '📱' },
  { id: 'professionals', label: 'Professionals', emoji: '💼' },
  { id: 'parents', label: 'Parents', emoji: '👨‍👩‍👧' },
  { id: 'creators', label: 'Creators', emoji: '🎨' },
  { id: 'entrepreneurs', label: 'Entrepreneurs', emoji: '🚀' },
  { id: 'students', label: 'Students', emoji: '📚' },
]

const LENGTHS = [
  { id: 'short', label: 'Short', desc: '1-2 lines' },
  { id: 'medium', label: 'Medium', desc: '3-4 lines' },
  { id: 'long', label: 'Long', desc: '5+ lines' },
]

// Background Decorations Component
const BackgroundDecorations = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
    {/* Floating Bubbles */}
    <div className="bubble w-20 h-20" style={{ top: '10%', left: '5%', animationDelay: '0s' }} />
    <div className="bubble w-14 h-14" style={{ top: '60%', left: '8%', animationDelay: '3s' }} />
    <div className="bubble w-24 h-24" style={{ top: '30%', right: '5%', animationDelay: '5s' }} />
    <div className="bubble w-16 h-16" style={{ top: '70%', right: '10%', animationDelay: '2s' }} />
    <div className="bubble w-12 h-12" style={{ top: '85%', left: '20%', animationDelay: '7s' }} />
    <div className="bubble w-10 h-10" style={{ top: '15%', right: '20%', animationDelay: '4s' }} />
    <div className="bubble w-8 h-8" style={{ top: '45%', left: '3%', animationDelay: '6s' }} />
    <div className="bubble w-18 h-18" style={{ top: '80%', right: '25%', animationDelay: '1s' }} />
    <div className="bubble w-6 h-6" style={{ top: '5%', left: '30%', animationDelay: '8s' }} />
    <div className="bubble w-22 h-22" style={{ top: '40%', right: '3%', animationDelay: '9s' }} />
    <div className="bubble w-10 h-10" style={{ top: '90%', left: '40%', animationDelay: '4.5s' }} />
    <div className="bubble w-15 h-15" style={{ top: '25%', left: '2%', animationDelay: '2.5s' }} />
    <div className="bubble w-8 h-8" style={{ top: '50%', right: '2%', animationDelay: '6.5s' }} />
    <div className="bubble w-12 h-12" style={{ top: '95%', right: '40%', animationDelay: '3.5s' }} />
    <div className="bubble w-18 h-18" style={{ top: '8%', right: '8%', animationDelay: '7.5s' }} />
    <div className="bubble w-7 h-7" style={{ top: '65%', left: '25%', animationDelay: '1.5s' }} />
    
    {/* Floating Camera/Image Icons */}
    <Camera className="float-particle w-8 h-8 text-violet-500" style={{ top: '20%', left: '12%', animationDelay: '0s' }} />
    <Instagram className="float-particle w-10 h-10 text-pink-500" style={{ top: '50%', right: '8%', animationDelay: '4s' }} />
    <ImageIcon className="float-particle w-7 h-7 text-blue-500" style={{ top: '75%', left: '15%', animationDelay: '2s' }} />
    <Film className="float-particle w-9 h-9 text-purple-500" style={{ top: '35%', right: '15%', animationDelay: '6s' }} />
    <Aperture className="float-particle w-8 h-8 text-indigo-500" style={{ top: '65%', right: '20%', animationDelay: '3s' }} />
    <Camera className="float-particle w-6 h-6 text-rose-500" style={{ top: '85%', right: '5%', animationDelay: '5s' }} />
    <Hash className="float-particle w-7 h-7 text-cyan-500" style={{ top: '25%', right: '25%', animationDelay: '7s' }} />
    <Heart className="float-particle w-6 h-6 text-red-400" style={{ top: '55%', left: '5%', animationDelay: '1s' }} />
    <Camera className="float-particle w-5 h-5 text-amber-500" style={{ top: '10%', left: '20%', animationDelay: '8s' }} />
    <Instagram className="float-particle w-8 h-8 text-fuchsia-500" style={{ top: '80%', left: '8%', animationDelay: '2.5s' }} />
    <Film className="float-particle w-6 h-6 text-teal-500" style={{ top: '45%', left: '10%', animationDelay: '5.5s' }} />
    <Aperture className="float-particle w-7 h-7 text-orange-500" style={{ top: '15%', right: '10%', animationDelay: '9s' }} />
    <ImageIcon className="float-particle w-8 h-8 text-sky-500" style={{ top: '90%', right: '15%', animationDelay: '3.5s' }} />
    <Heart className="float-particle w-5 h-5 text-pink-400" style={{ top: '30%', left: '6%', animationDelay: '6.5s' }} />
    <Hash className="float-particle w-6 h-6 text-violet-400" style={{ top: '70%', right: '6%', animationDelay: '4.5s' }} />
    <Camera className="float-particle w-9 h-9 text-indigo-400" style={{ top: '5%', right: '30%', animationDelay: '1.5s' }} />
    
    {/* Sparkles */}
    <div className="sparkle" style={{ top: '15%', left: '25%', animationDelay: '0s' }} />
    <div className="sparkle" style={{ top: '40%', right: '30%', animationDelay: '1s' }} />
    <div className="sparkle" style={{ top: '70%', left: '35%', animationDelay: '2s' }} />
    <div className="sparkle" style={{ top: '25%', right: '15%', animationDelay: '0.5s' }} />
    <div className="sparkle" style={{ top: '60%', right: '35%', animationDelay: '1.5s' }} />
    <div className="sparkle" style={{ top: '80%', left: '10%', animationDelay: '2.5s' }} />
    <div className="sparkle" style={{ top: '5%', left: '45%', animationDelay: '0.3s' }} />
    <div className="sparkle" style={{ top: '35%', left: '8%', animationDelay: '1.3s' }} />
    <div className="sparkle" style={{ top: '55%', right: '12%', animationDelay: '2.3s' }} />
    <div className="sparkle" style={{ top: '85%', right: '45%', animationDelay: '0.8s' }} />
    <div className="sparkle" style={{ top: '20%', left: '40%', animationDelay: '1.8s' }} />
    <div className="sparkle" style={{ top: '45%', left: '20%', animationDelay: '2.8s' }} />
    <div className="sparkle" style={{ top: '75%', right: '25%', animationDelay: '0.2s' }} />
    <div className="sparkle" style={{ top: '10%', right: '40%', animationDelay: '1.2s' }} />
    <div className="sparkle" style={{ top: '90%', left: '30%', animationDelay: '2.2s' }} />
    <div className="sparkle" style={{ top: '50%', left: '45%', animationDelay: '0.7s' }} />
  </div>
)

// Instagram Preview Component
const InstagramPreview = ({ caption, imagePreview, contentType }) => {
  // Story/Reel Preview (vertical 9:16)
  if (contentType === 'story' || contentType === 'reel') {
    return (
      <div className="bg-black rounded-xl overflow-hidden shadow-lg w-full" style={{ aspectRatio: '9/16', maxHeight: '400px' }}>
        <div className="relative w-full h-full">
          {/* Background */}
          {imagePreview ? (
            <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-violet-600 to-pink-500" />
          )}
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
          
          {/* Header */}
          <div className="absolute top-2 left-2 right-2 flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 ring-1 ring-white" />
            <span className="text-white text-[8px] font-semibold">your_username</span>
            {contentType === 'story' && (
              <span className="text-white/60 text-[7px]">• 2h</span>
            )}
          </div>
          
          {/* Reel UI */}
          {contentType === 'reel' && (
            <div className="absolute right-2 bottom-12 flex flex-col items-center gap-2">
              <div className="flex flex-col items-center">
                <Heart className="w-4 h-4 text-white" />
                <span className="text-white text-[7px]">12.5K</span>
              </div>
              <div className="flex flex-col items-center">
                <MessageCircle className="w-4 h-4 text-white" />
                <span className="text-white text-[7px]">234</span>
              </div>
              <Send className="w-4 h-4 text-white" />
              <Bookmark className="w-4 h-4 text-white" />
            </div>
          )}
          
          {/* Caption */}
          <div className="absolute bottom-2 left-2 right-8">
            {contentType === 'reel' && (
              <p className="text-white text-[8px] font-semibold mb-0.5">your_username</p>
            )}
            <p className="text-white text-[7px] leading-relaxed line-clamp-2">
              {caption || (contentType === 'story' ? 'Tap to add text...' : 'Your caption here...')}
            </p>
          </div>
          
          {/* Story progress bar */}
          {contentType === 'story' && (
            <div className="absolute top-1 left-1.5 right-1.5 h-[2px] bg-white/30 rounded-full overflow-hidden">
              <div className="h-full w-1/3 bg-white rounded-full" />
            </div>
          )}
        </div>
      </div>
    )
  }
  
  // Post Preview (square)
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm w-full">
      {/* Header */}
      <div className="flex items-center gap-2 p-2 border-b border-gray-100">
        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-violet-500 to-pink-500" />
        <div className="flex-1">
          <p className="text-[8px] font-semibold text-gray-900">your_username</p>
          <p className="text-[7px] text-gray-500">Location</p>
        </div>
        <MoreHorizontal className="w-3 h-3 text-gray-400" />
      </div>
      
      {/* Image */}
      <div className="aspect-square bg-gray-100 relative">
        {imagePreview ? (
          <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ImagePlus className="w-6 h-6 text-gray-300" />
          </div>
        )}
      </div>
      
      {/* Actions */}
      <div className="p-2 space-y-1.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Heart className="w-3.5 h-3.5 text-gray-700" />
            <MessageCircle className="w-3.5 h-3.5 text-gray-700" />
            <Send className="w-3.5 h-3.5 text-gray-700" />
          </div>
          <Bookmark className="w-3.5 h-3.5 text-gray-700" />
        </div>
        
        {/* Caption */}
        <div className="text-[8px] leading-relaxed">
          <span className="font-semibold text-gray-900">your_username </span>
          <span className="text-gray-700 whitespace-pre-wrap line-clamp-2">{caption || 'Your caption here...'}</span>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const [apiKey, setApiKey] = useState('')
  const [showSettings, setShowSettings] = useState(false)
  const [description, setDescription] = useState('')
  const [contentType, setContentType] = useState('post')
  const [tone, setTone] = useState('casual')
  const [niche, setNiche] = useState('general')
  const [audience, setAudience] = useState('general')
  const [length, setLength] = useState('medium')
  const [includeHashtags, setIncludeHashtags] = useState(true)
  const [includeEmojis, setIncludeEmojis] = useState(true)
  const [hashtagCount, setHashtagCount] = useState(5)
  const [captions, setCaptions] = useState([])
  const [selectedCaption, setSelectedCaption] = useState(0)
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState('')
  const [copiedIndex, setCopiedIndex] = useState(null)
  const [uploadedImage, setUploadedImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef(null)

  useEffect(() => {
    const savedKey = localStorage.getItem('captiongen_api_key')
    if (savedKey) setApiKey(savedKey)
    else setShowSettings(true)
  }, [])

  const saveApiKey = (key) => {
    setApiKey(key)
    localStorage.setItem('captiongen_api_key', key)
    setShowSettings(false)
  }

  const handleImageUpload = (file) => {
    if (!file || !file.type.startsWith('image/') || file.size > 10 * 1024 * 1024) return
    setError('')
    setImagePreview(URL.createObjectURL(file))
    const reader = new FileReader()
    reader.onloadend = () => setUploadedImage({ data: reader.result.split(',')[1], mimeType: file.type })
    reader.readAsDataURL(file)
  }

  const removeImage = () => {
    setUploadedImage(null)
    if (imagePreview) URL.revokeObjectURL(imagePreview)
    setImagePreview(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const generateCaptions = async () => {
    if (!apiKey) { setShowSettings(true); return }
    if (!description.trim() && !uploadedImage) { setError('Add image or description'); return }
    
    setIsGenerating(true)
    setError('')
    setCaptions([])
    setSelectedCaption(0)

    try {
      const genAI = new GoogleGenerativeAI(apiKey)
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })
      const t = TONES.find(t => t.id === tone)
      const n = NICHES.find(n => n.id === niche)
      const a = AUDIENCES.find(a => a.id === audience)
      const len = LENGTHS.find(len => len.id === length)
      
      const prompt = `You are an expert Instagram content strategist. Generate 3 unique captions.

${uploadedImage ? `Analyze the uploaded image carefully. ${description ? `Additional context: "${description}"` : ''}` : `Content: ${description}`}

REQUIREMENTS:
- Target Audience: ${a.label} ${audience === 'teens' ? '(use trendy language, relatable content)' : audience === 'millennials' ? '(nostalgic references, self-aware humor)' : audience === 'professionals' ? '(industry insights, networking-friendly)' : audience === 'parents' ? '(family-focused, relatable parenting moments)' : audience === 'creators' ? '(behind-the-scenes, creative process)' : audience === 'entrepreneurs' ? '(motivational, business growth focused)' : audience === 'students' ? '(study life, campus vibes, relatable struggles)' : ''}
- Tone: ${t.label} ${tone === 'genz' ? '(use trending slang, "no cap", "slay", "its giving", etc.)' : tone === 'poetic' ? '(metaphorical, artistic, emotional)' : tone === 'sarcastic' ? '(witty, ironic, playful sarcasm)' : tone === 'corporate' ? '(professional, business-focused, LinkedIn-style)' : tone === 'luxury' ? '(elegant, sophisticated, aspirational)' : ''}
- Niche: ${n.label} content ${niche !== 'general' ? `(use ${niche}-specific terminology and hashtags)` : ''}
- Length: ${len.label} (${len.desc})
- Content Type: Instagram ${contentType} ${contentType === 'story' ? '(very short, punchy)' : contentType === 'reel' ? '(hook-focused, trending)' : ''}
${includeEmojis ? '- Include relevant emojis throughout' : '- No emojis'}
${includeHashtags ? `- End with exactly ${hashtagCount} relevant ${niche !== 'general' ? niche + '-specific ' : ''}hashtags` : '- No hashtags'}

FORMAT (use exactly):
---CAPTION 1---
[caption]

---CAPTION 2---
[caption]

---CAPTION 3---
[caption]`

      const result = uploadedImage 
        ? await model.generateContent([prompt, { inlineData: uploadedImage }])
        : await model.generateContent(prompt)
      
      const generatedCaptions = (await result.response).text().split(/---CAPTION \d+---/).filter(c => c.trim()).map(c => c.trim())
      setCaptions(generatedCaptions)
      
      // Trigger confetti celebration! 🎉
      if (generatedCaptions.length > 0) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#7c3aed', '#ec4899', '#f59e0b', '#10b981', '#3b82f6']
        })
      }
    } catch (err) {
      setError(err.message || 'Failed')
    } finally {
      setIsGenerating(false)
    }
  }

  const copy = async (text, i) => {
    await navigator.clipboard.writeText(text)
    setCopiedIndex(i)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  return (
    <div className="min-h-screen lg:h-screen page-bg flex flex-col lg:overflow-hidden relative">
      {/* Background Decorations */}
      <BackgroundDecorations />
      
      {/* Header */}
      <header className="flex-shrink-0 px-4 sm:px-6 py-3 sm:py-4 border-b border-black/5 relative">
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <span className="font-bold text-xl sm:text-2xl text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>CaptionGen</span>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">Turn your photos into viral captions ✨</p>
        </div>
        <button onClick={() => setShowSettings(true)} className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 p-2 rounded-lg hover:bg-black/5">
          <Settings className="w-5 h-5 text-gray-400" />
        </button>
      </header>

      {/* Main Content - Responsive Layout */}
      <main className="flex-1 flex flex-col lg:flex-row justify-center items-center p-4 gap-4 lg:gap-5 overflow-y-auto lg:overflow-visible">
        
        {/* Column 1 - Image, Context, Type, Niche */}
        <div className="w-full sm:w-80 lg:h-[600px] flex-shrink-0 flex flex-col gap-3 overflow-y-auto scroll-area">
          <div className="card rounded-xl p-3">
            <div className="text-[10px] font-semibold text-gray-600 uppercase tracking-wider mb-1">Image <span className="text-red-500">*</span></div>
            <p className="text-[8px] text-gray-400 mb-2">* At least image or context required</p>
            {imagePreview ? (
              <div className="relative rounded-lg overflow-hidden">
                <img src={imagePreview} alt="Preview" className="w-full h-24 object-cover" />
                <button onClick={removeImage} className="absolute top-1.5 right-1.5 p-1 bg-black/50 hover:bg-red-500 rounded transition-colors">
                  <Trash2 className="w-3 h-3 text-white" />
                </button>
              </div>
            ) : (
              <div
                onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleImageUpload(e.dataTransfer.files?.[0]) }}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
                onDragLeave={() => setIsDragging(false)}
                onClick={() => fileInputRef.current?.click()}
                className={`upload-zone h-24 rounded-lg flex flex-col items-center justify-center gap-1.5 cursor-pointer ${isDragging ? 'dragging' : ''}`}
              >
                <ImagePlus className={`w-5 h-5 ${isDragging ? 'text-violet-500' : 'text-gray-400'}`} />
                <span className="text-[10px] text-gray-500">Drop image</span>
                <input ref={fileInputRef} type="file" accept="image/*" onChange={(e) => handleImageUpload(e.target.files?.[0])} className="hidden" />
              </div>
            )}
          </div>

          <div className="card rounded-xl p-3">
            <div className="text-[10px] font-semibold text-gray-600 uppercase tracking-wider mb-2">Context <span className="text-red-500">*</span></div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe content..."
              className="input w-full h-16 rounded-lg p-2 text-xs resize-none"
            />
          </div>

          {/* Type */}
          <div className="card rounded-xl p-3">
            <div className="text-[10px] font-semibold text-gray-600 uppercase tracking-wider mb-2">Type</div>
            <div className="flex gap-1.5">
              {CONTENT_TYPES.map((type) => (
                <button key={type.id} onClick={() => setContentType(type.id)}
                  className={`pill flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1 text-[10px] font-medium ${contentType === type.id ? 'active' : ''}`}>
                  <type.icon className="w-3 h-3" /> {type.label}
                </button>
              ))}
            </div>
          </div>

          {/* Niche */}
          <div className="card rounded-xl p-3">
            <div className="text-[10px] font-semibold text-gray-600 uppercase tracking-wider mb-2">Niche</div>
            <div className="grid grid-cols-4 gap-1">
              {NICHES.map((n) => (
                <button key={n.id} onClick={() => setNiche(n.id)}
                  className={`tone-btn py-1.5 rounded-lg text-center ${niche === n.id ? 'active' : ''}`}>
                  <div className="text-sm">{n.emoji}</div>
                  <div className="text-[9px] text-gray-600">{n.label}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Column 2 - Options */}
        <div className="w-full sm:w-80 lg:w-[340px] lg:h-[600px] flex-shrink-0 flex flex-col gap-3 overflow-y-auto scroll-area">
          {/* Tone */}
          <div className="card rounded-xl p-3">
            <div className="text-[10px] font-semibold text-gray-600 uppercase tracking-wider mb-2">Tone</div>
            <div className="grid grid-cols-3 gap-1">
              {TONES.map((t) => (
                <button key={t.id} onClick={() => setTone(t.id)}
                  className={`tone-btn py-1.5 px-1 rounded-lg text-[10px] font-medium ${tone === t.id ? 'active' : ''}`}>
                  {t.emoji} {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Audience & Length */}
          <div className="card rounded-xl p-3 space-y-3">
            <div>
              <div className="text-[10px] font-semibold text-gray-600 uppercase tracking-wider mb-2 flex items-center gap-1">
                <Users className="w-3 h-3" /> Target Audience
              </div>
              <div className="grid grid-cols-4 gap-1">
                {AUDIENCES.map((a) => (
                  <button key={a.id} onClick={() => setAudience(a.id)}
                    className={`tone-btn py-1 rounded text-center ${audience === a.id ? 'active' : ''}`}>
                    <div className="text-sm">{a.emoji}</div>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div className="text-[10px] font-semibold text-gray-600 uppercase tracking-wider mb-2 flex items-center gap-1">
                <AlignLeft className="w-3 h-3" /> Length
              </div>
              <div className="flex gap-1">
                {LENGTHS.map((l) => (
                  <button key={l.id} onClick={() => setLength(l.id)}
                    className={`pill flex-1 py-1.5 rounded-lg text-[10px] font-medium ${length === l.id ? 'active' : ''}`}>
                    {l.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Options */}
          <div className="card rounded-xl p-3 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Hash className="w-3 h-3 text-violet-500" />
                <span className="text-[10px] font-medium text-gray-600">Hashtags</span>
                {includeHashtags && <span className="text-[10px] text-violet-500 font-bold">{hashtagCount}</span>}
              </div>
              <button onClick={() => setIncludeHashtags(!includeHashtags)} className={`toggle w-8 h-4 rounded-full ${includeHashtags ? 'active' : ''}`}>
                <motion.div animate={{ x: includeHashtags ? 17 : 2 }} transition={{ type: 'spring', stiffness: 500, damping: 30 }} className="w-3 h-3 bg-white rounded-full shadow" />
              </button>
            </div>
            {includeHashtags && (
              <input type="range" min="3" max="15" value={hashtagCount} onChange={(e) => setHashtagCount(parseInt(e.target.value))} 
                className="w-full h-1 bg-gray-200 rounded-full appearance-none cursor-pointer accent-violet-500" />
            )}
            <div className="flex items-center justify-between pt-1 border-t border-gray-100">
              <div className="flex items-center gap-1.5">
                <Smile className="w-3 h-3 text-pink-500" />
                <span className="text-[10px] font-medium text-gray-600">Emojis</span>
              </div>
              <button onClick={() => setIncludeEmojis(!includeEmojis)} className={`toggle w-8 h-4 rounded-full ${includeEmojis ? 'active' : ''}`}>
                <motion.div animate={{ x: includeEmojis ? 17 : 2 }} transition={{ type: 'spring', stiffness: 500, damping: 30 }} className="w-3 h-3 bg-white rounded-full shadow" />
              </button>
            </div>
          </div>

          {/* Generate Button */}
          <button onClick={generateCaptions} disabled={isGenerating} className="btn-primary py-2.5 rounded-xl flex items-center justify-center gap-2 text-xs">
            {isGenerating ? <><RefreshCw className="w-3.5 h-3.5 animate-spin" /> Generating...</> : <><Wand2 className="w-3.5 h-3.5" /> Generate</>}
          </button>

          {error && (
            <div className="flex items-center gap-1.5 text-red-500 text-[10px] bg-red-50 rounded-lg p-2">
              <AlertCircle className="w-3 h-3" /> {error}
            </div>
          )}
        </div>

        {/* Column 3 - Captions & Preview */}
        <div className="w-full sm:w-80 lg:h-[600px] flex-shrink-0 flex flex-col gap-3">
          {/* Captions List */}
          <div className="flex-1 card rounded-xl p-3 overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-gray-800">Captions</span>
              {captions.length > 0 && (
                <button onClick={generateCaptions} className="text-[10px] text-gray-400 hover:text-violet-500 flex items-center gap-1">
                  <RefreshCw className="w-3 h-3" /> Redo
                </button>
              )}
            </div>
            <div className="overflow-y-auto scroll-area space-y-2 max-h-[180px] lg:max-h-[220px]">
              <AnimatePresence mode="wait">
                {isGenerating ? (
                  <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-2">
                    {[1, 2, 3].map((i) => <div key={i} className="shimmer h-16 rounded-lg" />)}
                  </motion.div>
                ) : captions.length > 0 ? (
                  <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
                    {captions.map((caption, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        onClick={() => setSelectedCaption(i)}
                        className={`caption-card rounded-lg p-2 ${selectedCaption === i ? 'ring-2 ring-violet-500 bg-violet-50' : ''}`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <span className={`inline-block px-1.5 py-0.5 rounded text-[9px] font-bold mb-1 ${selectedCaption === i ? 'text-violet-600 bg-violet-100' : 'text-gray-500 bg-gray-100'}`}>
                              {i + 1}
                            </span>
                            <p className="text-[10px] text-gray-700 leading-relaxed line-clamp-2">{caption}</p>
                          </div>
                          <button onClick={(e) => { e.stopPropagation(); copy(caption, i) }} className="p-1 rounded hover:bg-gray-100">
                            {copiedIndex === i ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3 text-gray-400" />}
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center text-center py-6">
                    <Sparkles className="w-5 h-5 text-gray-300 mb-1" />
                    <p className="text-[9px] text-gray-500">Captions appear here</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Instagram Preview */}
          <div className="card rounded-xl p-3 flex items-center justify-center">
            <InstagramPreview 
              caption={captions[selectedCaption] || ''} 
              imagePreview={imagePreview}
              contentType={contentType}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="flex-shrink-0 py-2 text-center">
        <p className="text-[11px] text-gray-500">
          © 2024 <span className="font-medium text-gray-700">Dinesh Daki</span>
        </p>
      </footer>

      {/* Settings Modal */}
      <AnimatePresence>
        {showSettings && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => apiKey && setShowSettings(false)}>
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()} className="card rounded-xl p-5 w-full max-w-xs shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <span className="font-semibold text-gray-900 text-sm">API Key <span className="text-red-500">*</span></span>
                {apiKey && <button onClick={() => setShowSettings(false)} className="p-1 rounded hover:bg-gray-100"><X className="w-4 h-4 text-gray-400" /></button>}
              </div>
              <input type="password" value={apiKey} onChange={(e) => setApiKey(e.target.value)} placeholder="Enter Gemini API key..."
                className="input w-full rounded-lg p-2.5 text-sm mb-3" />
              <p className="text-[10px] text-gray-500 mb-3">
                Get key from <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener noreferrer" className="text-violet-500 hover:underline">Google AI Studio</a>
              </p>
              <button onClick={() => saveApiKey(apiKey)} disabled={!apiKey} className="btn-primary w-full py-2.5 rounded-lg text-sm">Save</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
