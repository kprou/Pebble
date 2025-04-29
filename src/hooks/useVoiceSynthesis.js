import { useState, useEffect } from 'react'

const useVoiceSynthesis = (apiKey) => {
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [error, setError] = useState(null)

  const speak = async (text, language = 'en') => {
    try {
      setIsSpeaking(true)
      setError(null)

      // For Cantonese text, use a different voice ID
      const voiceId = language === 'zh-HK' ? '21m00Tcm4TlvDq8ikWAM' : 'EXAVITQu4vr4xnSDxMaL'
      
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'xi-api-key': apiKey
        },
        body: JSON.stringify({
          text,
          model_id: 'eleven_multilingual_v2',
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75,
            style: 0.0,
            use_speaker_boost: true
          }
        })
      })

      if (!response.ok) {
        throw new Error('Failed to generate speech')
      }

      const audioBlob = await response.blob()
      const audioUrl = URL.createObjectURL(audioBlob)
      
      const audio = new Audio(audioUrl)
      audio.onended = () => {
        setIsSpeaking(false)
        URL.revokeObjectURL(audioUrl)
      }
      
      await audio.play()
    } catch (err) {
      console.error('Speech synthesis error:', err)
      setError(err.message)
      setIsSpeaking(false)
    }
  }

  return { speak, isSpeaking, error }
}

export default useVoiceSynthesis 