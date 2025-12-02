import { useRef } from 'react'
import { ImagePlus, Trash2 } from 'lucide-react'

export default function ImageUpload({ 
  imagePreview, 
  isDragging, 
  setIsDragging, 
  onImageUpload, 
  onRemoveImage 
}) {
  const fileInputRef = useRef(null)

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    onImageUpload(e.dataTransfer.files?.[0])
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e) => {
    onImageUpload(e.target.files?.[0])
  }

  if (imagePreview) {
    return (
      <div className="relative rounded-lg overflow-hidden">
        <img src={imagePreview} alt="Preview" className="w-full h-24 object-cover" />
        <button 
          onClick={onRemoveImage} 
          className="absolute top-1.5 right-1.5 p-1 bg-black/50 hover:bg-red-500 rounded transition-colors"
        >
          <Trash2 className="w-3 h-3 text-white" />
        </button>
      </div>
    )
  }

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onClick={handleClick}
      className={`upload-zone h-24 rounded-lg flex flex-col items-center justify-center gap-1.5 cursor-pointer ${isDragging ? 'dragging' : ''}`}
    >
      <ImagePlus className={`w-5 h-5 ${isDragging ? 'text-violet-500' : 'text-gray-400'}`} />
      <span className="text-[10px] text-gray-500">Drop image</span>
      <input 
        ref={fileInputRef} 
        type="file" 
        accept="image/*" 
        onChange={handleFileChange} 
        className="hidden" 
      />
    </div>
  )
}


