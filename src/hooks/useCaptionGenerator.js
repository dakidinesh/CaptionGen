import { useState } from 'react'
import { GoogleGenerativeAI } from '@google/generative-ai'
import confetti from 'canvas-confetti'
import { TONES, NICHES, AUDIENCES, LENGTHS } from '../constants'

export default function useCaptionGenerator() {
  const [captions, setCaptions] = useState([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState('')

  const generateCaptions = async ({
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
    onMissingApiKey,
  }) => {
    if (!apiKey) {
      onMissingApiKey?.()
      return
    }
    
    if (!description.trim() && !uploadedImage) {
      setError('Add image or description')
      return
    }
    
    setIsGenerating(true)
    setError('')
    setCaptions([])

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
      
      const generatedCaptions = (await result.response).text()
        .split(/---CAPTION \d+---/)
        .filter(c => c.trim())
        .map(c => c.trim())
      
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

  return {
    captions,
    isGenerating,
    error,
    setError,
    generateCaptions,
  }
}


