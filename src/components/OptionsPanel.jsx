import { motion } from 'framer-motion'
import { Hash, Smile, Users, AlignLeft, RefreshCw, Wand2, AlertCircle } from 'lucide-react'
import { TONES, AUDIENCES, LENGTHS } from '../constants'

export default function OptionsPanel({
  tone,
  setTone,
  audience,
  setAudience,
  length,
  setLength,
  includeHashtags,
  setIncludeHashtags,
  hashtagCount,
  setHashtagCount,
  includeEmojis,
  setIncludeEmojis,
  isGenerating,
  error,
  onGenerate,
}) {
  return (
    <div className="w-full sm:w-80 lg:w-[340px] lg:h-[600px] flex-shrink-0 flex flex-col gap-3 overflow-y-auto scroll-area">
      {/* Tone */}
      <div className="card rounded-xl p-3">
        <div className="text-[10px] font-semibold text-gray-600 uppercase tracking-wider mb-2">Tone</div>
        <div className="grid grid-cols-3 gap-1">
          {TONES.map((t) => (
            <button 
              key={t.id} 
              onClick={() => setTone(t.id)}
              className={`tone-btn py-1.5 px-1 rounded-lg text-[10px] font-medium ${tone === t.id ? 'active' : ''}`}
            >
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
              <button 
                key={a.id} 
                onClick={() => setAudience(a.id)}
                className={`tone-btn py-1 rounded text-center ${audience === a.id ? 'active' : ''}`}
              >
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
              <button 
                key={l.id} 
                onClick={() => setLength(l.id)}
                className={`pill flex-1 py-1.5 rounded-lg text-[10px] font-medium ${length === l.id ? 'active' : ''}`}
              >
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
          <button 
            onClick={() => setIncludeHashtags(!includeHashtags)} 
            className={`toggle w-8 h-4 rounded-full ${includeHashtags ? 'active' : ''}`}
          >
            <motion.div 
              animate={{ x: includeHashtags ? 17 : 2 }} 
              transition={{ type: 'spring', stiffness: 500, damping: 30 }} 
              className="w-3 h-3 bg-white rounded-full shadow" 
            />
          </button>
        </div>
        {includeHashtags && (
          <input 
            type="range" 
            min="3" 
            max="15" 
            value={hashtagCount} 
            onChange={(e) => setHashtagCount(parseInt(e.target.value))} 
            className="w-full h-1 bg-gray-200 rounded-full appearance-none cursor-pointer accent-violet-500" 
          />
        )}
        <div className="flex items-center justify-between pt-1 border-t border-gray-100">
          <div className="flex items-center gap-1.5">
            <Smile className="w-3 h-3 text-pink-500" />
            <span className="text-[10px] font-medium text-gray-600">Emojis</span>
          </div>
          <button 
            onClick={() => setIncludeEmojis(!includeEmojis)} 
            className={`toggle w-8 h-4 rounded-full ${includeEmojis ? 'active' : ''}`}
          >
            <motion.div 
              animate={{ x: includeEmojis ? 17 : 2 }} 
              transition={{ type: 'spring', stiffness: 500, damping: 30 }} 
              className="w-3 h-3 bg-white rounded-full shadow" 
            />
          </button>
        </div>
      </div>

      {/* Generate Button */}
      <button 
        onClick={onGenerate} 
        disabled={isGenerating} 
        className="btn-primary py-2.5 rounded-xl flex items-center justify-center gap-2 text-xs"
      >
        {isGenerating ? (
          <>
            <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Generating...
          </>
        ) : (
          <>
            <Wand2 className="w-3.5 h-3.5" /> Generate
          </>
        )}
      </button>

      {error && (
        <div className="flex items-center gap-1.5 text-red-500 text-[10px] bg-red-50 rounded-lg p-2">
          <AlertCircle className="w-3 h-3" /> {error}
        </div>
      )}
    </div>
  )
}


