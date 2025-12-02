import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, ImagePlus } from 'lucide-react'

function StoryReelPreview({ caption, imagePreview, contentType }) {
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
        <div className="text-[8px] leading-relaxed">
          <span className="font-semibold text-gray-900">your_username </span>
          <span className="text-gray-700 whitespace-pre-wrap line-clamp-2">{caption || 'Your caption here...'}</span>
        </div>
      </div>
    </div>
  )
}

export default function InstagramPreview({ caption, imagePreview, contentType }) {
  if (contentType === 'story' || contentType === 'reel') {
    return <StoryReelPreview caption={caption} imagePreview={imagePreview} contentType={contentType} />
  }
  
  return <PostPreview caption={caption} imagePreview={imagePreview} />
}


