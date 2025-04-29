import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const AnimatedCharacter = ({ 
  imageSrc, 
  isSpeaking, 
  alt = "Character",
  className = "w-64 h-64"
}) => {
  const imageRef = useRef(null)

  useEffect(() => {
    if (imageRef.current) {
      if (isSpeaking) {
        // If it's a GIF, it will automatically animate
        // If it's a video, we'll play it
        if (imageRef.current.tagName === 'VIDEO') {
          imageRef.current.play()
        }
      } else {
        // If it's a video, we'll pause it
        if (imageRef.current.tagName === 'VIDEO') {
          imageRef.current.pause()
        }
      }
    }
  }, [isSpeaking])

  return (
    <motion.div 
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className={`bg-white rounded-xl shadow-lg overflow-hidden ${className}`}
    >
      {imageSrc.endsWith('.mp4') ? (
        <video
          ref={imageRef}
          src={imageSrc}
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      ) : (
        <img
          ref={imageRef}
          src={imageSrc}
          alt={alt}
          className="w-full h-full object-cover"
        />
      )}
    </motion.div>
  )
}

export default AnimatedCharacter 