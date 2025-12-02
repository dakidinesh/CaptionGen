import ImageUpload from './ImageUpload'
import { CONTENT_TYPES, NICHES } from '../constants'

export default function InputPanel({
  imagePreview,
  isDragging,
  setIsDragging,
  onImageUpload,
  onRemoveImage,
  description,
  setDescription,
  contentType,
  setContentType,
  niche,
  setNiche,
}) {
  return (
    <div className="w-full max-w-md sm:w-80 lg:h-[600px] flex-shrink-0 flex flex-col gap-3 overflow-y-auto scroll-area">
      {/* Image Upload */}
      <div className="card rounded-xl p-3">
        <div className="text-[10px] font-semibold text-gray-600 uppercase tracking-wider mb-1">
          Image <span className="text-red-500">*</span>
        </div>
        <p className="text-[8px] text-gray-400 mb-2">* At least image or context required</p>
        <ImageUpload
          imagePreview={imagePreview}
          isDragging={isDragging}
          setIsDragging={setIsDragging}
          onImageUpload={onImageUpload}
          onRemoveImage={onRemoveImage}
        />
      </div>

      {/* Context */}
      <div className="card rounded-xl p-3">
        <div className="text-[10px] font-semibold text-gray-600 uppercase tracking-wider mb-2">
          Context <span className="text-red-500">*</span>
        </div>
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
            <button 
              key={type.id} 
              onClick={() => setContentType(type.id)}
              className={`pill flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1 text-[10px] font-medium ${contentType === type.id ? 'active' : ''}`}
            >
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
            <button 
              key={n.id} 
              onClick={() => setNiche(n.id)}
              className={`tone-btn py-1.5 rounded-lg text-center ${niche === n.id ? 'active' : ''}`}
            >
              <div className="text-sm">{n.emoji}</div>
              <div className="text-[9px] text-gray-600">{n.label}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}


