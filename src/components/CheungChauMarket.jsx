import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import TalkingCharacter from './TalkingCharacter'
import AmbientSound from './AmbientSound'
import useVoiceSynthesis from '../hooks/useVoiceSynthesis'
import useVoiceInteraction from '../hooks/useVoiceInteraction'

const CheungChauMarket = ({ onBack }) => {
  const [messages, setMessages] = useState([
    { 
      role: "agent", 
      text: "你好！Fresh mango mochi, just for you! $40 HKD! (Hello! Fresh mango mochi, just for you! $40 HKD!)" 
    }
  ])
  const [userInput, setUserInput] = useState("")
  const [scenarioComplete, setScenarioComplete] = useState(false)
  const [showCompletion, setShowCompletion] = useState(false)
  const [isCantoneseKeyboard, setIsCantoneseKeyboard] = useState(false)
  const [isStopped, setIsStopped] = useState(false)
  const [isBackgroundLoaded, setIsBackgroundLoaded] = useState(false)
  const [isCharacterLoaded, setIsCharacterLoaded] = useState(false)

  const { speak, isSpeaking, error } = useVoiceSynthesis(import.meta.env.VITE_ELEVENLABS_API_KEY)
  const { isListening, toggleListening, isSupported: isVoiceSupported } = useVoiceInteraction((transcript) => {
    setUserInput(transcript)
    handleSend(transcript)
  })

  const recommendedMessages = [
    {
      text: "太貴了 (Too expensive)",
      phonetic: "taai3 gwai3 liu5",
      english: "too expensive"
    },
    {
      text: "便宜點 (Cheaper)",
      phonetic: "pin4 ji4 dim2",
      english: "cheaper"
    },
    {
      text: "本地價錢 (Local price)",
      phonetic: "bun2 dei6 gaa3 cin4",
      english: "local price"
    },
    {
      text: "好，我要 (Okay, I'll take it)",
      phonetic: "hou2, ngo5 jiu3",
      english: "okay, I'll take it"
    },
    {
      text: "你好 (Hello)",
      phonetic: "nei5 hou2",
      english: "hello"
    },
    {
      text: "多謝 (Thank you)",
      phonetic: "do1 ze6",
      english: "thank you"
    }
  ]

  const marketScenarios = [
    {
      initialMessage: "你好！Fresh mango mochi, just for you! $40 HKD! (Hello! Fresh mango mochi, just for you! $40 HKD!)",
      responses: {
        "too expensive": "太貴？Alright, alright... $30 HKD final offer! (Too expensive? Alright, alright... $30 HKD final offer!)",
        "local price": "哇！You know local price! $25 HKD, deal! (Wow! You know local price! $25 HKD, deal!)",
        "cheaper": "便宜點？How about $32 HKD? Best quality mango mochi! (Cheaper? How about $32 HKD? Best quality mango mochi!)",
        "yes": "多謝！Here's your mango mochi. Enjoy! (Thank you! Here's your mango mochi. Enjoy!)",
        "hello": "你好！Welcome to Cheung Chau market! (Hello! Welcome to Cheung Chau market!)",
        "how are you": "我很好！How are you? (I'm good! How are you?)",
        "good": "很好！You want try mango mochi? (Good! You want to try mango mochi?)",
        "bye": "多謝光臨！Come back soon! (Thank you for visiting! Come back soon!)",
        "thank you": "不客氣！Enjoy your mango mochi! (You're welcome! Enjoy your mango mochi!)",
        "delicious": "多謝！We're glad you enjoyed it! (Thank you! We're glad you enjoyed it!)"
      },
      suggestedChoices: [
        { text: "太貴了 (Too expensive)", phonetic: "taai3 gwai3 liu5" },
        { text: "便宜點 (Cheaper)", phonetic: "pin4 ji4 dim2" },
        { text: "本地價錢 (Local price)", phonetic: "bun2 dei6 gaa3 cin4" },
        { text: "好，我要 (Okay, I'll take it)", phonetic: "hou2, ngo5 jiu3" }
      ]
    },
    {
      initialMessage: "你好！Fresh fish balls, made this morning! $35 HKD! (Hello! Fresh fish balls, made this morning! $35 HKD!)",
      responses: {
        "too expensive": "太貴？Okay, $28 HKD for you! (Too expensive? Okay, $28 HKD for you!)",
        "local price": "哇！You know local price! $22 HKD, special price! (Wow! You know local price! $22 HKD, special price!)",
        "cheaper": "便宜點？How about $30 HKD? Fresh from this morning! (Cheaper? How about $30 HKD? Fresh from this morning!)",
        "yes": "多謝！Here's your fish balls. Enjoy! (Thank you! Here's your fish balls. Enjoy!)",
        "hello": "你好！Welcome to Cheung Chau market! (Hello! Welcome to Cheung Chau market!)",
        "how are you": "我很好！How are you? (I'm good! How are you?)",
        "good": "很好！You want try fish balls? (Good! You want to try fish balls?)"
      },
      suggestedChoices: [
        { text: "太貴了 (Too expensive)", phonetic: "taai3 gwai3 liu5" },
        { text: "便宜點 (Cheaper)", phonetic: "pin4 ji4 dim2" },
        { text: "本地價錢 (Local price)", phonetic: "bun2 dei6 gaa3 cin4" },
        { text: "好，我要 (Okay, I'll take it)", phonetic: "hou2, ngo5 jiu3" }
      ]
    },
    {
      initialMessage: "你好！Fresh seafood dumplings, just made! $45 HKD! (Hello! Fresh seafood dumplings, just made! $45 HKD!)",
      responses: {
        "too expensive": "太貴？Okay, $35 HKD for you! (Too expensive? Okay, $35 HKD for you!)",
        "local price": "哇！You know local price! $30 HKD, special price! (Wow! You know local price! $30 HKD, special price!)",
        "cheaper": "便宜點？How about $38 HKD? Fresh from this morning! (Cheaper? How about $38 HKD? Fresh from this morning!)",
        "yes": "多謝！Here's your seafood dumplings. Enjoy! (Thank you! Here's your seafood dumplings. Enjoy!)",
        "hello": "你好！Welcome to Cheung Chau market! (Hello! Welcome to Cheung Chau market!)",
        "how are you": "我很好！How are you? (I'm good! How are you?)",
        "good": "很好！You want try seafood dumplings? (Good! You want to try seafood dumplings?)"
      },
      suggestedChoices: [
        { text: "太貴了 (Too expensive)", phonetic: "taai3 gwai3 liu5" },
        { text: "便宜點 (Cheaper)", phonetic: "pin4 ji4 dim2" },
        { text: "本地價錢 (Local price)", phonetic: "bun2 dei6 gaa3 cin4" },
        { text: "好，我要 (Okay, I'll take it)", phonetic: "hou2, ngo5 jiu3" }
      ]
    }
  ]

  const [currentScenario, setCurrentScenario] = useState(
    marketScenarios[Math.floor(Math.random() * marketScenarios.length)]
  )

  // Load background image
  useEffect(() => {
    const img = new Image()
    img.src = '/market-background.gif'
    img.onload = () => {
      setIsBackgroundLoaded(true)
    }
  }, [])

  // Load character image
  useEffect(() => {
    const img = new Image()
    img.src = '/street-market-vendor.png'
    img.onload = () => {
      setIsCharacterLoaded(true)
    }
  }, [])

  // Play initial vendor message and ambient sound on mount
  useEffect(() => {
    const initialMessage = "你好！Fresh mango mochi, just for you! $40 HKD! (Hello! Fresh mango mochi, just for you! $40 HKD!)"
    speak(initialMessage, 'zh-HK')
  }, []) // Empty dependency array means this runs once on mount

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new webkitSpeechRecognition()
      recognition.continuous = false
      recognition.interimResults = false
      recognition.lang = isCantoneseKeyboard ? 'zh-HK' : 'en-US'

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript
        setUserInput(transcript)
        handleSend(transcript)
      }

      recognition.onend = () => {
        setIsListening(false)
      }

      if (isListening) {
        recognition.start()
      }
    }
  }, [isListening, isCantoneseKeyboard])

  useEffect(() => {
    if ('speechSynthesis' in window) {
      const synth = window.speechSynthesis
      const voices = synth.getVoices()
      
      // Find Cantonese voice if available
      const cantoneseVoice = voices.find(voice => voice.lang.includes('zh-HK'))
      
      if (cantoneseVoice) {
        synth.voice = cantoneseVoice
      }
    }
  }, [])

  const handleSend = (input = userInput) => {
    if (!input.trim()) return

    let aiReply = "That's interesting! What else would you like to know?"
    const lowerInput = input.toLowerCase()

    // Check for matching responses
    for (const [key, response] of Object.entries(currentScenario.responses)) {
      if (lowerInput.includes(key)) {
        aiReply = response
        break
      }
    }

    // Check for conversation ending phrases
    if (lowerInput.includes("bye") || lowerInput.includes("goodbye") || lowerInput.includes("see you")) {
      aiReply = "多謝光臨！Come back soon! (Thank you for visiting! Come back soon!)"
      setTimeout(() => {
        setShowCompletion(true)
      }, 2000)
    }

    // Check if it's time for the vendor to end the conversation
    if (messages.length >= 6 && !isStopped) {
      const lastMessage = messages[messages.length - 1]
      if (lastMessage.role === "agent" && !lastMessage.text.includes("Come back soon")) {
        aiReply = "多謝光臨！Come back soon! (Thank you for visiting! Come back soon!)"
        setTimeout(() => {
          setShowCompletion(true)
        }, 2000)
      }
    }

    setMessages([...messages, { role: "user", text: input }, { role: "agent", text: aiReply }])
    setUserInput("")

    // Speak the reply with Cantonese accent
    speak(aiReply, 'zh-HK')
  }

  const toggleKeyboard = () => {
    setIsCantoneseKeyboard(!isCantoneseKeyboard)
  }

  const stopConversation = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
    }
    setIsSpeaking(false)
    setIsStopped(true)
  }

  const restartConversation = () => {
    const newScenario = marketScenarios[Math.floor(Math.random() * marketScenarios.length)]
    setCurrentScenario(newScenario)
    setMessages([
      { 
        role: "agent", 
        text: newScenario.initialMessage 
      }
    ])
    setUserInput("")
    setIsStopped(false)
    setScenarioComplete(false)
    setShowCompletion(false)
    speak(newScenario.initialMessage, 'zh-HK')
  }

  if (showCompletion) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-green-50 flex flex-col items-center justify-center p-6 space-y-4"
      >
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md"
        >
          <motion.h1 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-2xl font-bold mb-4"
          >
            🎉 恭喜！Congratulations!
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 mb-4"
          >
            你成功了！You've successfully negotiated at the Cheung Chau Street Market!
          </motion.p>
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4 }}
            className="w-24 h-24 mx-auto mb-4"
          >
            <span className="text-6xl">🏆</span>
          </motion.div>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-gray-600 mb-6"
          >
            Would you like to try the Hong Kong Cafe experience next?
          </motion.p>
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex gap-4 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onBack}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-lg"
            >
              Try Cafe
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowCompletion(false)}
              className="bg-gray-500 text-white px-6 py-2 rounded-lg shadow-lg"
            >
              Stay Here
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    )
  }

  if (scenarioComplete) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-green-50 flex flex-col items-center justify-center p-6 space-y-4"
      >
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="bg-white p-8 rounded-xl shadow-lg text-center"
        >
          <h1 className="text-2xl font-bold mb-4">🎉 Scenario Complete!</h1>
          <p className="text-gray-600 mb-4">你成功了！You've successfully negotiated at the Cheung Chau Street Market!</p>
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-24 h-24 mx-auto mb-4"
          >
            <span className="text-6xl">🏆</span>
          </motion.div>
          <p className="text-sm text-gray-500">New locations will be unlocked soon...</p>
        </motion.div>
      </motion.div>
    )
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex flex-col items-center justify-center p-6 space-y-4 relative"
      style={{
        backgroundImage: isBackgroundLoaded ? 'url("/market-background.gif")' : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: isBackgroundLoaded ? 'transparent' : '#f3f4f6'
      }}
    >
      <AnimatePresence>
        {!isBackgroundLoaded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-gray-100"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: isBackgroundLoaded ? 0.5 : 0 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 bg-black"
      />

      <AmbientSound 
        src="/market-ambiance.mp3" 
        volume={0.2}
        isSpeaking={isSpeaking}
      />

      <div className="absolute top-4 left-4 z-10">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className="bg-white text-gray-800 px-4 py-2 rounded-lg shadow-lg flex items-center gap-2"
        >
          <span>←</span> Back
        </motion.button>
      </div>

      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-10 text-2xl font-bold text-white"
      >
        🛒 Cheung Chau Street Market
      </motion.div>

      <div className="flex gap-8 w-full max-w-4xl relative z-10">
        <AnimatePresence>
          {!isCharacterLoaded ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-64 h-64 bg-white rounded-xl shadow-lg overflow-hidden flex items-center justify-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
              />
            </motion.div>
          ) : (
            <TalkingCharacter 
              imageSrc="/street-market-vendor.png"
              isSpeaking={isSpeaking}
              alt="Market Vendor"
            />
          )}
        </AnimatePresence>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex-1 bg-white bg-opacity-90 p-4 rounded-xl shadow space-y-2 overflow-y-auto h-80"
        >
          <AnimatePresence>
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={msg.role === "agent" ? "text-blue-700" : "text-right text-gray-800"}
              >
                <p><strong>{msg.role === "agent" ? "Vendor" : "You"}:</strong> {msg.text}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <div className="w-full max-w-4xl space-y-4 relative z-10">
        <div className="flex gap-2 flex-wrap justify-center">
          {currentScenario.suggestedChoices.map((choice, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSend(choice.text.split(" (")[0])}
              className="bg-white bg-opacity-90 text-gray-800 px-3 py-1 rounded-full text-sm hover:bg-opacity-100 transition-colors flex flex-col items-center"
              disabled={isStopped}
            >
              <span>{choice.text}</span>
              <span className="text-xs text-gray-500">{choice.phonetic}</span>
            </motion.button>
          ))}
        </div>
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleKeyboard}
            className={`px-4 py-2 rounded-xl transition-colors ${
              isCantoneseKeyboard 
                ? 'bg-yellow-500 hover:bg-yellow-600' 
                : 'bg-gray-500 hover:bg-gray-600'
            } text-white`}
            disabled={isStopped}
          >
            {isCantoneseKeyboard ? '中文' : 'English'}
          </motion.button>
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder={isCantoneseKeyboard ? "輸入中文..." : "Type in English..."}
            className="flex-1 px-4 py-2 border rounded-xl shadow bg-white bg-opacity-90"
            disabled={isStopped}
          />
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleListening}
            className={`px-4 py-2 rounded-xl transition-colors ${
              isListening 
                ? 'bg-red-500 hover:bg-red-600' 
                : 'bg-blue-500 hover:bg-blue-600'
            } text-white`}
            disabled={isStopped}
          >
            {isListening ? 'Stop' : 'Speak'}
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSend()}
            className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
            disabled={isStopped}
          >
            Send
          </motion.button>
        </div>
        <div className="flex gap-2 justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={stopConversation}
            className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
            disabled={isStopped}
          >
            Stop Conversation
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const farewellMessage = "多謝光臨！Come back soon! (Thank you for visiting! Come back soon!)"
              setMessages([...messages, { role: "agent", text: farewellMessage }])
              speak(farewellMessage, 'zh-HK')
              setTimeout(() => {
                setShowCompletion(true)
              }, 2000)
            }}
            className="px-4 py-2 bg-yellow-500 text-white rounded-xl hover:bg-yellow-600 transition-colors"
            disabled={isStopped}
          >
            End Conversation
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={restartConversation}
            className="px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors"
          >
            Restart
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

export default CheungChauMarket 