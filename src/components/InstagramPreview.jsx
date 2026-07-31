import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, ImagePlus } from 'lucide-react'

function StoryPreview({ caption, imagePreview }) {
  return (
    <div className="bg-black rounded-xl overflow-hidden shadow-lg w-full" style={{ aspectRatio: '9/16', maxHeight: '500px' }}>
      <div className="relative w-full h-full">
        {/* Background */}
        {imagePreview ? (
          <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-violet-600 to-pink-500" />
        )}
        
        {/* Subtle overlay for text readability */}
        <div className="absolute inset-0 bg-black/20" />
        
        {/* Story progress bar */}
        <div className="absolute top-1 left-1.5 right-1.5 h-[2px] bg-white/30 rounded-full overflow-hidden">
          <div className="h-full w-1/3 bg-white rounded-full" />
        </div>
        
        {/* Header */}
        <div className="absolute top-3 left-2 right-2 flex items-center gap-1.5">
          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 ring-1 ring-white" />
          <span className="text-white text-[8px] font-semibold">your_username</span>
          <span className="text-white/60 text-[7px]">• 2h</span>
        </div>
        
        {/* Caption - Centered on image like Instagram text sticker */}
        <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 flex items-center justify-center">
          <div className="bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2 max-h-40 overflow-y-auto scroll-area">
            <p className="text-white text-[10px] sm:text-[9px] leading-relaxed text-center font-medium">
              {caption || 'Your caption here...'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function ReelPreview({ caption, imagePreview }) {
  return (
    <div className="bg-black rounded-xl overflow-hidden shadow-lg w-full" style={{ aspectRatio: '9/16', maxHeight: '500px' }}>
      <div className="relative w-full h-full">
        {/* Background */}
        {imagePreview ? (
          <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-violet-600 to-pink-500" />
        )}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />
        
        {/* Header */}
        <div className="absolute top-2 left-2 right-2 flex items-center gap-1.5">
          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 ring-1 ring-white" />
          <span className="text-white text-[8px] font-semibold">your_username</span>
        </div>
        
        {/* Reel UI */}
        <div className="absolute right-1.5 bottom-20 flex flex-col items-center gap-1.5">
          <div className="flex flex-col items-center">
            <Heart className="w-3.5 h-3.5 text-white" />
            <span className="text-white text-[6px]">12.5K</span>
          </div>
          <div className="flex flex-col items-center">
            <MessageCircle className="w-3.5 h-3.5 text-white" />
            <span className="text-white text-[6px]">234</span>
          </div>
          <Send className="w-3.5 h-3.5 text-white" />
          <Bookmark className="w-3.5 h-3.5 text-white" />
        </div>
        
        {/* Caption */}
        <div className="absolute bottom-2 left-2 right-8 max-h-28 overflow-y-auto scroll-area">
          <p className="text-white text-[8px] font-semibold mb-0.5">your_username</p>
          <p className="text-white text-[7px] leading-relaxed">
            {caption || 'Your caption here...'}
          </p>
        </div>
      </div>
    </div>
  )
}

function PostPreview({ caption, imagePreview }) {
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
        <div className="text-[9px] sm:text-[8px] leading-relaxed max-h-24 sm:max-h-16 overflow-y-auto scroll-area">
          <span className="font-semibold text-gray-900">your_username </span>
          <span className="text-gray-700 whitespace-pre-wrap">{caption || 'Your caption here...'}</span>
        </div>
      </div>
    </div>
  )
}

export default function InstagramPreview({ caption, imagePreview, contentType }) {
  if (contentType === 'story') {
    return <StoryPreview caption={caption} imagePreview={imagePreview} />
  }
  
  if (contentType === 'reel') {
    return <ReelPreview caption={caption} imagePreview={imagePreview} />
  }
  
  return <PostPreview caption={caption} imagePreview={imagePreview} />
}


