import React, { useEffect, useRef } from 'react'

const AmbientSound = ({ src, volume = 1.8, loop = true, isSpeaking = false }) => {
  const audioRef = useRef(null)

  useEffect(() => {
    if (audioRef.current) {
      console.log('Setting up audio:', src)
      audioRef.current.volume = volume
      audioRef.current.loop = loop
      
      // Add event listeners for debugging
      audioRef.current.addEventListener('play', () => {
        console.log('Audio started playing')
      })
      
      audioRef.current.addEventListener('error', (e) => {
        console.error('Audio error:', e)
      })
      
      audioRef.current.addEventListener('canplaythrough', () => {
        console.log('Audio can play through')
      })

      if (!isSpeaking) {
        // Try to play the audio
        const playPromise = audioRef.current.play()
        
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log('Audio playback started successfully')
            })
            .catch(error => {
              console.error('Audio playback failed:', error)
            })
        }
      } else {
        audioRef.current.pause()
      }
    }

    return () => {
      if (audioRef.current) {
        console.log('Cleaning up audio')
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      }
    }
  }, [volume, loop, isSpeaking])

  return (
    <audio
      ref={audioRef}
      src={src}
      preload="auto"
      crossOrigin="anonymous"
    />
  )
}

export default AmbientSound 