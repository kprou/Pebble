import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import TalkingCharacter from './TalkingCharacter'
import AmbientSound from './AmbientSound'
import useVoiceSynthesis from '../hooks/useVoiceSynthesis'
import useVoiceInteraction from '../hooks/useVoiceInteraction'

const HongKongCafe = ({ onBack }) => {
  const [messages, setMessages] = useState([
    { 
      role: "agent", 
      text: "歡迎！Would you like to try our famous Hong Kong-style milk tea? (Welcome! Would you like to try our famous Hong Kong-style milk tea?)" 
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

  // Load background image
  useEffect(() => {
    const img = new Image()
    img.src = '/cafe-background.gif'
    img.onload = () => {
      setIsBackgroundLoaded(true)
    }
  }, [])

  // Load character image
  useEffect(() => {
    const img = new Image()
    img.src = '/cafe-barista.png'
    img.onload = () => {
      setIsCharacterLoaded(true)
    }
  }, [])

  // Play initial barista message and ambient sound on mount
  useEffect(() => {
    const initialMessage = "歡迎！Would you like to try our famous Hong Kong-style milk tea? (Welcome! Would you like to try our famous Hong Kong-style milk tea?)"
    speak(initialMessage, 'zh-HK')
  }, []) // Empty dependency array means this runs once on mount

  const cafeScenarios = [
    {
      initialMessage: "歡迎！Would you like to try our famous Hong Kong-style milk tea? (Welcome! Would you like to try our famous Hong Kong-style milk tea?)",
      responses: {
        "milk tea": "我們的奶茶是用錫蘭和 Assam 茶葉特製的，加煉奶，好香濃！Would you like to try it? (Our milk tea is made with a special blend of Ceylon and Assam tea leaves, and we use evaporated milk for that rich, creamy taste. Would you like to try it?)",
        "yes": "好！Hot or iced? (Great choice! Hot or iced?)",
        "hot": "熱奶茶！Would you like to try our famous pineapple bun with it? (Hot milk tea! Would you like to try our famous pineapple bun with it?)",
        "iced": "凍奶茶！Would you like to try our famous pineapple bun with it? (Iced milk tea! Would you like to try our famous pineapple bun with it?)",
        "pineapple bun": "菠蘿包新鮮出爐！It's called 'pineapple' because of its crisscross pattern that looks like a pineapple. Would you like to try it? (The pineapple bun is fresh from the oven! It's called 'pineapple' because of its crisscross pattern that looks like a pineapple. Would you like to try it?)",
        "hello": "你好！Welcome to our cafe! (Hello! Welcome to our cafe!)",
        "how are you": "我很好！How are you? (I'm good! How are you?)",
        "good": "很好！You want try our milk tea? (Good! You want to try our milk tea?)",
        "bye": "多謝光臨！Hope to see you again soon! (Thank you for visiting! Hope to see you again soon!)",
        "thank you": "不客氣！Enjoy your stay! (You're welcome! Enjoy your stay!)",
        "delicious": "多謝！We're glad you enjoyed it! (Thank you! We're glad you enjoyed it!)"
      },
      suggestedChoices: [
        { text: "奶茶 (Milk tea)", phonetic: "naai5 caa4" },
        { text: "熱奶茶 (Hot milk tea)", phonetic: "jit6 naai5 caa4" },
        { text: "凍奶茶 (Iced milk tea)", phonetic: "dung3 naai5 caa4" },
        { text: "菠蘿包 (Pineapple bun)", phonetic: "bo1 lo4 baau1" }
      ]
    },
    {
      initialMessage: "你好！Today we have special egg tarts fresh from the oven! Would you like to try one? (Hello! Today we have special egg tarts fresh from the oven! Would you like to try one?)",
      responses: {
        "egg tart": "我們的蛋撻是用傳統配方，外皮酥脆，內餡滑嫩！Would you like to try it? (Our egg tarts are made with a traditional recipe, crispy crust and smooth custard! Would you like to try it?)",
        "yes": "好！Would you like it hot or warm? (Great! Would you like it hot or warm?)",
        "hot": "熱蛋撻！Would you like to try our famous milk tea with it? (Hot egg tart! Would you like to try our famous milk tea with it?)",
        "warm": "溫蛋撻！Would you like to try our famous milk tea with it? (Warm egg tart! Would you like to try our famous milk tea with it?)",
        "milk tea": "我們的奶茶是用錫蘭和 Assam 茶葉特製的，加煉奶，好香濃！Would you like to try it? (Our milk tea is made with a special blend of Ceylon and Assam tea leaves, and we use evaporated milk for that rich, creamy taste. Would you like to try it?)",
        "hello": "你好！Welcome to our cafe! (Hello! Welcome to our cafe!)",
        "how are you": "我很好！How are you? (I'm good! How are you?)",
        "good": "很好！You want try our egg tarts? (Good! You want to try our egg tarts?)"
      },
      suggestedChoices: [
        { text: "蛋撻 (Egg tart)", phonetic: "daan6 taat1" },
        { text: "熱蛋撻 (Hot egg tart)", phonetic: "jit6 daan6 taat1" },
        { text: "溫蛋撻 (Warm egg tart)", phonetic: "wan1 daan6 taat1" },
        { text: "奶茶 (Milk tea)", phonetic: "naai5 caa4" }
      ]
    },
    {
      initialMessage: "歡迎！Today we have special Hong Kong-style French toast! Would you like to try it? (Welcome! Today we have special Hong Kong-style French toast! Would you like to try it?)",
      responses: {
        "french toast": "我們的西多士是用厚切麵包，塗上花生醬，炸至金黃！Would you like to try it? (Our French toast is made with thick-cut bread, peanut butter, and fried to golden perfection! Would you like to try it?)",
        "yes": "好！Would you like it with butter and syrup? (Great! Would you like it with butter and syrup?)",
        "butter": "加牛油！Would you like to try our famous milk tea with it? (With butter! Would you like to try our famous milk tea with it?)",
        "syrup": "加糖漿！Would you like to try our famous milk tea with it? (With syrup! Would you like to try our famous milk tea with it?)",
        "milk tea": "我們的奶茶是用錫蘭和 Assam 茶葉特製的，加煉奶，好香濃！Would you like to try it? (Our milk tea is made with a special blend of Ceylon and Assam tea leaves, and we use evaporated milk for that rich, creamy taste. Would you like to try it?)",
        "hello": "你好！Welcome to our cafe! (Hello! Welcome to our cafe!)",
        "how are you": "我很好！How are you? (I'm good! How are you?)",
        "good": "很好！You want try our French toast? (Good! You want to try our French toast?)"
      },
      suggestedChoices: [
        { text: "西多士 (French toast)", phonetic: "sai1 do1 si6" },
        { text: "加牛油 (With butter)", phonetic: "gaa1 ngau4 jau4" },
        { text: "加糖漿 (With syrup)", phonetic: "gaa1 tong4 zoeng1" },
        { text: "奶茶 (Milk tea)", phonetic: "naai5 caa4" }
      ]
    }
  ]

  const [currentScenario, setCurrentScenario] = useState(
    cafeScenarios[Math.floor(Math.random() * cafeScenarios.length)]
  )

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
      aiReply = "多謝光臨！Hope to see you again soon! (Thank you for visiting! Hope to see you again soon!)"
      setTimeout(() => {
        setShowCompletion(true)
      }, 2000)
    }

    // Check if it's time for the barista to end the conversation
    if (messages.length >= 6 && !isStopped) {
      const lastMessage = messages[messages.length - 1]
      if (lastMessage.role === "agent" && !lastMessage.text.includes("Hope to see you again")) {
        aiReply = "多謝光臨！Hope to see you again soon! (Thank you for visiting! Hope to see you again soon!)"
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
    const newScenario = cafeScenarios[Math.floor(Math.random() * cafeScenarios.length)]
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
            你成功了！You've successfully experienced the Hong Kong cafe culture!
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
            Would you like to try the Cheung Chau Street Market experience next?
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
              Try Market
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
          <p className="text-gray-600 mb-4">你成功了！You've successfully experienced the Hong Kong cafe culture!</p>
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
        backgroundImage: isBackgroundLoaded ? 'url("/cafe-background.gif")' : 'none',
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
        src="/cafe-ambiance.mp3" 
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
        ☕ Hong Kong Coffee Cafe
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
              imageSrc="/cafe-barista.png"
              isSpeaking={isSpeaking}
              alt="Barista"
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
                className={msg.role === "agent" ? "text-green-700" : "text-right text-gray-800"}
              >
                <p><strong>{msg.role === "agent" ? "Barista" : "You"}:</strong> {msg.text}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <div className="w-full max-w-md space-y-4 relative z-10">
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
          {isVoiceSupported && (
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
          )}
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

export default HongKongCafe 