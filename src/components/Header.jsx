import { Sparkles, Settings } from 'lucide-react'

export default function Header({ onSettingsClick }) {
  return (
    <header className="flex-shrink-0 px-4 sm:px-6 py-3 sm:py-4 border-b border-black/5 relative">
      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center">
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <span className="font-bold text-xl sm:text-2xl text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
            CaptionGen
          </span>
        </div>
        <p className="text-xs sm:text-sm text-gray-600 mt-1">Turn your photos into viral captions ✨</p>
      </div>
      <button 
        onClick={onSettingsClick} 
        className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 p-2 rounded-lg hover:bg-black/5"
      >
        <Settings className="w-5 h-5 text-gray-400" />
      </button>
    </header>
  )
}


