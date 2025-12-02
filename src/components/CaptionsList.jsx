import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Copy, Check, RefreshCw } from 'lucide-react'

export default function CaptionsList({
  captions,
  selectedCaption,
  setSelectedCaption,
  isGenerating,
  onRegenerate,
}) {
  const [copiedIndex, setCopiedIndex] = useState(null)

  const copyToClipboard = async (text, index) => {
    await navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  return (
    <div className="flex-1 card rounded-xl p-3 overflow-hidden">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-gray-800">Captions</span>
        {captions.length > 0 && (
          <button 
            onClick={onRegenerate} 
            className="text-[10px] text-gray-400 hover:text-violet-500 flex items-center gap-1"
          >
            <RefreshCw className="w-3 h-3" /> Redo
          </button>
        )}
      </div>
      <div className="overflow-y-auto scroll-area space-y-2 max-h-[180px] lg:max-h-[220px]">
        <AnimatePresence mode="wait">
          {isGenerating ? (
            <motion.div 
              key="loading" 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="space-y-2"
            >
              {[1, 2, 3].map((i) => (
                <div key={i} className="shimmer h-16 rounded-lg" />
              ))}
            </motion.div>
          ) : captions.length > 0 ? (
            <motion.div 
              key="results" 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="space-y-2"
            >
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
                    <button 
                      onClick={(e) => { e.stopPropagation(); copyToClipboard(caption, i) }} 
                      className="p-1 rounded hover:bg-gray-100"
                    >
                      {copiedIndex === i ? (
                        <Check className="w-3 h-3 text-green-500" />
                      ) : (
                        <Copy className="w-3 h-3 text-gray-400" />
                      )}
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              key="empty" 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="flex flex-col items-center justify-center text-center py-6"
            >
              <Sparkles className="w-5 h-5 text-gray-300 mb-1" />
              <p className="text-[9px] text-gray-500">Captions appear here</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}


