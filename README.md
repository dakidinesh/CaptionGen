# ✨ CaptionGen

**AI-Powered Instagram Caption Generator** — Transform your photos into viral, engagement-driving captions instantly.

![CaptionGen](https://img.shields.io/badge/Powered%20by-Google%20Gemini%20AI-4285F4?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)

---

## 🎯 Overview

CaptionGen leverages Google's **Gemini 2.0 Flash** model to analyze images and generate contextually relevant, engaging Instagram captions. Whether you're a content creator, social media manager, or casual Instagram user, CaptionGen helps you craft the perfect caption in seconds.

---

## 🚀 Features

### 📸 Image Analysis
- **AI Vision Processing** — Upload any image and Gemini AI analyzes the content, mood, colors, subjects, and context
- **Drag & Drop Upload** — Intuitive file upload with visual preview
- **Supports** JPG, PNG, GIF, WebP up to 10MB

### ✍️ Smart Caption Generation
- **3 Unique Variations** — Each generation produces 3 distinct caption options
- **One-Click Copy** — Instantly copy any caption to clipboard
- **Live Instagram Preview** — See how your caption looks in real IG format

### 📱 Instagram Preview
- **Post Preview** — Square format with header, actions, and caption
- **Story Preview** — Vertical 9:16 format with progress bar and text overlay
- **Reel Preview** — Vertical format with engagement icons (likes, comments, share, save)

### 🎉 Delightful UX
- **Confetti Celebration** — Colorful confetti burst when captions generate
- **Animated Background** — Floating bubbles, camera icons, and sparkles
- **Glass Morphism UI** — Modern frosted-glass card design
- **Smooth Animations** — Framer Motion powered transitions
- **Fully Responsive** — Works on desktop, tablet, and mobile

---

## 🛠 Tech Stack

### 🧠 AI & Machine Learning Layer

```
┌─────────────────────────────────────────────────────────────────┐
│                    GENERATIVE AI PIPELINE                        │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────┐  │
│  │  Image Input    │───▶│  Gemini 2.0     │───▶│  Caption    │  │
│  │  (Base64)       │    │  Flash Model    │    │  Output     │  │
│  └─────────────────┘    └─────────────────┘    └─────────────┘  │
│           │                     │                     │          │
│           ▼                     ▼                     ▼          │
│    Vision Analysis      Multimodal LLM        NLP Generation    │
│    • Object Detection   • 1M+ Token Context   • Tone Matching   │
│    • Scene Recognition  • Few-shot Learning   • Hashtag Gen     │
│    • Color Analysis     • Instruction Tuning  • Emoji Injection │
└─────────────────────────────────────────────────────────────────┘
```

| Component | Technology | Version | Purpose |
|-----------|------------|---------|---------|
| **LLM Engine** | Google Gemini 2.0 Flash | Latest | Multimodal large language model for vision + text |
| **AI SDK** | @google/generative-ai | ^0.21.0 | Official Google AI JavaScript client library |
| **Inference** | REST API | v1beta | Real-time model inference via Google Cloud |


### 🌐 API Integration

```javascript
// Gemini API Request Flow
┌──────────────┐     ┌───────────────────┐     ┌──────────────┐
│ User Input   │────▶│ Prompt Assembly   │────▶│ Gemini API   │
│ • Image      │     │ • System context  │     │ • Inference  │
│ • Context    │     │ • Tone injection  │     │ • Response   │
│ • Settings   │     │ • Format rules    │     │ • Parsing    │
└──────────────┘     └───────────────────┘     └──────────────┘
                              │
                              ▼
                     Multimodal Payload:
                     {
                       prompt: string,
                       inlineData: {
                         data: base64,
                         mimeType: string
                       }
                     }
```

## 🏗 Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    CaptionGen UI                       │
├─────────────────────────────────────────────────────────┤
│  ┌─────────┐  ┌─────────────┐  ┌──────────────────────┐ │
│  │ Image   │  │   Options   │  │  Captions & Preview  │ │
│  │ Upload  │  │  Selection  │  │                      │ │
│  │         │  │             │  │  ┌────────────────┐  │ │
│  │ Context │  │ Tone/Niche  │  │  │ Generated      │  │ │
│  │ Input   │  │ Audience    │  │  │ Captions (3)   │  │ │
│  │         │  │ Length      │  │  ├────────────────┤  │ │
│  │ Type    │  │ Hashtags    │  │  │ Instagram      │  │ │
│  │ Niche   │  │ Emojis      │  │  │ Preview        │  │ │
│  └─────────┘  └─────────────┘  │  └────────────────┘  │ │
│                                └──────────────────────┘ │
├─────────────────────────────────────────────────────────┤
│                   Google Gemini API                      │
│              (Image Analysis + Text Gen)                 │
└─────────────────────────────────────────────────────────┘
```

---

## 📁 Project Structure

```
CaptionGen/
├── public/
│   └── favicon.svg          # App icon
├── src/
│   ├── App.jsx              # Main application component
│   ├── main.jsx             # React entry point
│   └── index.css            # Global styles & Tailwind
├── index.html               # HTML template
├── package.json             # Dependencies & scripts
├── vite.config.js           # Vite configuration
├── tailwind.config.js       # Tailwind customization
├── postcss.config.js        # PostCSS plugins
└── README.md
```

---
## 🌟 Key Highlights

1. **Multimodal AI** — Combines image understanding with natural language generation
2. **Contextual Captions** — Adapts to niche, audience, and platform requirements
3. **Real-time Preview** — See exactly how your caption will appear on Instagram
4. **Modern Stack** — Built with 2024's best practices and tools
5. **Beautiful Design** — Thoughtful UI with delightful micro-interactions

---

## 👨‍💻 Author

**Dinesh Daki**

---

## 📄 License

MIT License — Feel free to use, modify, and distribute.

---

<p align="center">
  <b>CaptionGen</b> — Where AI meets creativity ✨
</p>
