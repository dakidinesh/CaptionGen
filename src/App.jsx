import { useState, useEffect } from 'react'
import { 
  BackgroundDecorations,
  Header,
  InputPanel,
  OptionsPanel,
  CaptionsList,
  InstagramPreview,
  SettingsModal,
} from './components'
import { useCaptionGenerator } from './hooks'
import { STORAGE_KEY } from './constants'

export default function App() {
  // API Key State
  const [apiKey, setApiKey] = useState('')
  const [showSettings, setShowSettings] = useState(false)

  // Input State
  const [description, setDescription] = useState('')
  const [uploadedImage, setUploadedImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [isDragging, setIsDragging] = useState(false)

  // Options State
  const [contentType, setContentType] = useState('post')
  const [tone, setTone] = useState('casual')
  const [niche, setNiche] = useState('general')
  const [audience, setAudience] = useState('general')
  const [length, setLength] = useState('medium')
  const [includeHashtags, setIncludeHashtags] = useState(true)
  const [includeEmojis, setIncludeEmojis] = useState(true)
  const [hashtagCount, setHashtagCount] = useState(5)

  // Caption State
  const [selectedCaption, setSelectedCaption] = useState(0)

  // Custom Hook for Caption Generation
  const { captions, isGenerating, error, generateCaptions } = useCaptionGenerator()

  // Load API Key from localStorage
  useEffect(() => {
    const savedKey = localStorage.getItem(STORAGE_KEY)
    if (savedKey) {
      setApiKey(savedKey)
    } else {
      setShowSettings(true)
    }
  }, [])

  // Save API Key
  const saveApiKey = (key) => {
    setApiKey(key)
    localStorage.setItem(STORAGE_KEY, key)
    setShowSettings(false)
  }

  // Image Upload Handler
  const handleImageUpload = (file) => {
    if (!file || !file.type.startsWith('image/') || file.size > 10 * 1024 * 1024) return
    
    setImagePreview(URL.createObjectURL(file))
    
    const reader = new FileReader()
    reader.onloadend = () => {
      setUploadedImage({ 
        data: reader.result.split(',')[1], 
        mimeType: file.type 
      })
    }
    reader.readAsDataURL(file)
  }

  // Remove Image Handler
  const handleRemoveImage = () => {
    setUploadedImage(null)
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview)
    }
    setImagePreview(null)
  }

  // Generate Captions Handler
  const handleGenerate = () => {
    setSelectedCaption(0)
    generateCaptions({
      apiKey,
      description,
      uploadedImage,
      contentType,
      tone,
      niche,
      audience,
      length,
      includeHashtags,
      includeEmojis,
      hashtagCount,
      onMissingApiKey: () => setShowSettings(true),
    })
  }

  return (
    <div className="min-h-screen lg:h-screen page-bg flex flex-col lg:overflow-hidden relative">
      <BackgroundDecorations />
      
      <Header onSettingsClick={() => setShowSettings(true)} />

      {/* Main Content */}
      <main className="flex-1 flex flex-col lg:flex-row justify-center items-center p-4 gap-4 lg:gap-5 overflow-y-auto lg:overflow-visible">
        
        {/* Column 1 - Image, Context, Type, Niche */}
        <InputPanel
          imagePreview={imagePreview}
          isDragging={isDragging}
          setIsDragging={setIsDragging}
          onImageUpload={handleImageUpload}
          onRemoveImage={handleRemoveImage}
          description={description}
          setDescription={setDescription}
          contentType={contentType}
          setContentType={setContentType}
          niche={niche}
          setNiche={setNiche}
        />

        {/* Column 2 - Options */}
        <OptionsPanel
          tone={tone}
          setTone={setTone}
          audience={audience}
          setAudience={setAudience}
          length={length}
          setLength={setLength}
          includeHashtags={includeHashtags}
          setIncludeHashtags={setIncludeHashtags}
          hashtagCount={hashtagCount}
          setHashtagCount={setHashtagCount}
          includeEmojis={includeEmojis}
          setIncludeEmojis={setIncludeEmojis}
          isGenerating={isGenerating}
          error={error}
          onGenerate={handleGenerate}
        />

        {/* Column 3 - Captions & Preview */}
        <div className="w-full sm:w-80 lg:h-[600px] flex-shrink-0 flex flex-col gap-3">
          <CaptionsList
            captions={captions}
            selectedCaption={selectedCaption}
            setSelectedCaption={setSelectedCaption}
            isGenerating={isGenerating}
            onRegenerate={handleGenerate}
          />

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
      <SettingsModal
        isOpen={showSettings}
        apiKey={apiKey}
        setApiKey={setApiKey}
        onSave={() => saveApiKey(apiKey)}
        onClose={() => setShowSettings(false)}
      />
    </div>
  )
}
