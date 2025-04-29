import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CheungChauMarket from './CheungChauMarket'
import HongKongCafe from './HongKongCafe'

const PebbleMap = () => {
  const [showOptions, setShowOptions] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [showWelcome, setShowWelcome] = useState(true)

  const handleNext = () => {
    setShowWelcome(false)
    setShowOptions(true)
  }

  const handleLocationSelect = (location) => {
    setSelectedLocation(location)
  }

  const handleBack = () => {
    setSelectedLocation(null)
  }

  if (selectedLocation === 'cheungchau') {
    return <CheungChauMarket onBack={handleBack} />
  }

  if (selectedLocation === 'cafe') {
    return <HongKongCafe onBack={handleBack} />
  }

  if (showOptions) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen bg-cover bg-center" 
        style={{ backgroundImage: 'url("/world-map.jpg")' }}
      >
        <div className="min-h-screen bg-black bg-opacity-50 flex items-center justify-center">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto p-4"
          >
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white rounded-lg shadow-lg p-6 cursor-pointer"
              onClick={() => handleLocationSelect('cheungchau')}
            >
              <div className="flex flex-col items-center">
                <motion.img 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                  src="/cheung-chau-icon.jpg" 
                  alt="Cheung Chau" 
                  className="w-32 h-32 object-cover rounded-full mb-4" 
                />
                <h2 className="text-2xl font-bold mb-2">Street Market in Cheung Chau Island</h2>
                <p className="text-gray-600 text-center">Experience the vibrant local market life</p>
              </div>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white rounded-lg shadow-lg p-6 cursor-pointer"
              onClick={() => handleLocationSelect('cafe')}
            >
              <div className="flex flex-col items-center">
                <motion.img 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 }}
                  src="/hong-kong-cafe-icon.jpg" 
                  alt="Hong Kong Cafe" 
                  className="w-32 h-32 object-cover rounded-full mb-4" 
                />
                <h2 className="text-2xl font-bold mb-2">Hong Kong Cafe in Central</h2>
                <p className="text-gray-600 text-center">Immerse yourself in local cafe culture</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-cover bg-center relative" 
      style={{ backgroundImage: 'url("/world-map.jpg")' }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col items-center justify-center">
        <AnimatePresence>
          {showWelcome && (
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              className="text-center mb-8 max-w-2xl px-4"
            >
              <motion.h1 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-4xl font-bold text-white mb-4"
              >
                Welcome to Pebble!
              </motion.h1>
              <motion.p 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-white"
              >
                Practice Real Conversations for Real-World Situations Backed by AI
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleNext}
          className="bg-white text-black px-8 py-4 rounded-full text-xl font-bold hover:bg-opacity-90 transition-all shadow-lg"
        >
          {showWelcome ? 'Start Your Journey' : 'Next'}
        </motion.button>
      </div>
    </motion.div>
  )
}

export default PebbleMap 