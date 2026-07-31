import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

export default function SettingsModal({ 
  isOpen, 
  apiKey, 
  setApiKey, 
  onSave, 
  onClose 
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
          className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => apiKey && onClose()}
        >
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }} 
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()} 
            className="card rounded-xl p-5 w-full max-w-xs shadow-xl"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="font-semibold text-gray-900 text-sm">
                API Key <span className="text-red-500">*</span>
              </span>
              {apiKey && (
                <button onClick={onClose} className="p-1 rounded hover:bg-gray-100">
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              )}
            </div>
            <input 
              type="password" 
              value={apiKey} 
              onChange={(e) => setApiKey(e.target.value)} 
              placeholder="Enter Gemini API key..."
              className="input w-full rounded-lg p-2.5 text-sm mb-3" 
            />
            <p className="text-[10px] text-gray-500 mb-3">
              Get key from{' '}
              <a 
                href="https://aistudio.google.com/apikey" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-violet-500 hover:underline"
              >
                Google AI Studio
              </a>
            </p>
            <button 
              onClick={onSave} 
              disabled={!apiKey} 
              className="btn-primary w-full py-2.5 rounded-lg text-sm"
            >
              Save
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}


