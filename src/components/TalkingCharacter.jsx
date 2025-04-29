import React from 'react'
import { motion } from 'framer-motion'

const TalkingCharacter = ({ 
  imageSrc, 
  isSpeaking, 
  alt = "Character",
  className = "w-64 h-64"
}) => {
  return (
    <motion.div 
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className={`relative ${className}`}
    >
      <div className="w-full h-full bg-white rounded-xl shadow-lg overflow-hidden">
        <img 
          src={imageSrc} 
          alt={alt} 
          className="w-full h-full object-cover"
        />
        {isSpeaking && (
          <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-black/50 to-transparent">
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    height: [4, 12, 4],
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                  className="w-1 bg-white rounded-full"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default TalkingCharacter 