import { Camera, Instagram, ImageIcon, Film, Aperture, Hash, Heart } from 'lucide-react'

export default function BackgroundDecorations() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Floating Bubbles */}
      <div className="bubble w-20 h-20" style={{ top: '10%', left: '5%', animationDelay: '0s' }} />
      <div className="bubble w-14 h-14" style={{ top: '60%', left: '8%', animationDelay: '3s' }} />
      <div className="bubble w-24 h-24" style={{ top: '30%', right: '5%', animationDelay: '5s' }} />
      <div className="bubble w-16 h-16" style={{ top: '70%', right: '10%', animationDelay: '2s' }} />
      <div className="bubble w-12 h-12" style={{ top: '85%', left: '20%', animationDelay: '7s' }} />
      <div className="bubble w-10 h-10" style={{ top: '15%', right: '20%', animationDelay: '4s' }} />
      <div className="bubble w-8 h-8" style={{ top: '45%', left: '3%', animationDelay: '6s' }} />
      <div className="bubble w-18 h-18" style={{ top: '80%', right: '25%', animationDelay: '1s' }} />
      <div className="bubble w-6 h-6" style={{ top: '5%', left: '30%', animationDelay: '8s' }} />
      <div className="bubble w-22 h-22" style={{ top: '40%', right: '3%', animationDelay: '9s' }} />
      <div className="bubble w-10 h-10" style={{ top: '90%', left: '40%', animationDelay: '4.5s' }} />
      <div className="bubble w-15 h-15" style={{ top: '25%', left: '2%', animationDelay: '2.5s' }} />
      <div className="bubble w-8 h-8" style={{ top: '50%', right: '2%', animationDelay: '6.5s' }} />
      <div className="bubble w-12 h-12" style={{ top: '95%', right: '40%', animationDelay: '3.5s' }} />
      <div className="bubble w-18 h-18" style={{ top: '8%', right: '8%', animationDelay: '7.5s' }} />
      <div className="bubble w-7 h-7" style={{ top: '65%', left: '25%', animationDelay: '1.5s' }} />
      
      {/* Floating Camera/Image Icons */}
      <Camera className="float-particle w-8 h-8 text-violet-500" style={{ top: '20%', left: '12%', animationDelay: '0s' }} />
      <Instagram className="float-particle w-10 h-10 text-pink-500" style={{ top: '50%', right: '8%', animationDelay: '4s' }} />
      <ImageIcon className="float-particle w-7 h-7 text-blue-500" style={{ top: '75%', left: '15%', animationDelay: '2s' }} />
      <Film className="float-particle w-9 h-9 text-purple-500" style={{ top: '35%', right: '15%', animationDelay: '6s' }} />
      <Aperture className="float-particle w-8 h-8 text-indigo-500" style={{ top: '65%', right: '20%', animationDelay: '3s' }} />
      <Camera className="float-particle w-6 h-6 text-rose-500" style={{ top: '85%', right: '5%', animationDelay: '5s' }} />
      <Hash className="float-particle w-7 h-7 text-cyan-500" style={{ top: '25%', right: '25%', animationDelay: '7s' }} />
      <Heart className="float-particle w-6 h-6 text-red-400" style={{ top: '55%', left: '5%', animationDelay: '1s' }} />
      <Camera className="float-particle w-5 h-5 text-amber-500" style={{ top: '10%', left: '20%', animationDelay: '8s' }} />
      <Instagram className="float-particle w-8 h-8 text-fuchsia-500" style={{ top: '80%', left: '8%', animationDelay: '2.5s' }} />
      <Film className="float-particle w-6 h-6 text-teal-500" style={{ top: '45%', left: '10%', animationDelay: '5.5s' }} />
      <Aperture className="float-particle w-7 h-7 text-orange-500" style={{ top: '15%', right: '10%', animationDelay: '9s' }} />
      <ImageIcon className="float-particle w-8 h-8 text-sky-500" style={{ top: '90%', right: '15%', animationDelay: '3.5s' }} />
      <Heart className="float-particle w-5 h-5 text-pink-400" style={{ top: '30%', left: '6%', animationDelay: '6.5s' }} />
      <Hash className="float-particle w-6 h-6 text-violet-400" style={{ top: '70%', right: '6%', animationDelay: '4.5s' }} />
      <Camera className="float-particle w-9 h-9 text-indigo-400" style={{ top: '5%', right: '30%', animationDelay: '1.5s' }} />
      
      {/* Sparkles */}
      <div className="sparkle" style={{ top: '15%', left: '25%', animationDelay: '0s' }} />
      <div className="sparkle" style={{ top: '40%', right: '30%', animationDelay: '1s' }} />
      <div className="sparkle" style={{ top: '70%', left: '35%', animationDelay: '2s' }} />
      <div className="sparkle" style={{ top: '25%', right: '15%', animationDelay: '0.5s' }} />
      <div className="sparkle" style={{ top: '60%', right: '35%', animationDelay: '1.5s' }} />
      <div className="sparkle" style={{ top: '80%', left: '10%', animationDelay: '2.5s' }} />
      <div className="sparkle" style={{ top: '5%', left: '45%', animationDelay: '0.3s' }} />
      <div className="sparkle" style={{ top: '35%', left: '8%', animationDelay: '1.3s' }} />
      <div className="sparkle" style={{ top: '55%', right: '12%', animationDelay: '2.3s' }} />
      <div className="sparkle" style={{ top: '85%', right: '45%', animationDelay: '0.8s' }} />
      <div className="sparkle" style={{ top: '20%', left: '40%', animationDelay: '1.8s' }} />
      <div className="sparkle" style={{ top: '45%', left: '20%', animationDelay: '2.8s' }} />
      <div className="sparkle" style={{ top: '75%', right: '25%', animationDelay: '0.2s' }} />
      <div className="sparkle" style={{ top: '10%', right: '40%', animationDelay: '1.2s' }} />
      <div className="sparkle" style={{ top: '90%', left: '30%', animationDelay: '2.2s' }} />
      <div className="sparkle" style={{ top: '50%', left: '45%', animationDelay: '0.7s' }} />
    </div>
  )
}


