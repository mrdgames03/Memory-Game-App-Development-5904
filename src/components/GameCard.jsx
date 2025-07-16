import React from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../contexts/GameContext';

function GameCard({ card, isFlipped, isMatched, disabled }) {
  const { flipCard } = useGame();

  const handleClick = () => {
    if (!disabled && !isFlipped) {
      flipCard(card.id);
    }
  };

  return (
    <motion.div
      whileHover={!disabled && !isFlipped ? { scale: 1.05 } : {}}
      whileTap={!disabled && !isFlipped ? { scale: 0.95 } : {}}
      onClick={handleClick}
      className={`relative aspect-square cursor-pointer ${
        disabled && !isFlipped ? 'cursor-not-allowed' : ''
      }`}
    >
      <div className={`
        absolute inset-0 rounded-2xl transition-all duration-500 transform-gpu
        ${isFlipped ? 'rotate-y-180' : ''}
        ${isMatched ? 'animate-bounce-in' : ''}
      `}>
        {/* Back of card */}
        <div className={`
          absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500
          flex items-center justify-center backface-hidden
          ${isFlipped ? 'opacity-0' : 'opacity-100'}
        `}>
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <div className="w-4 h-4 bg-white/40 rounded-full"></div>
          </div>
        </div>

        {/* Front of card */}
        <div className={`
          absolute inset-0 rounded-2xl bg-white shadow-lg
          flex items-center justify-center backface-hidden rotate-y-180
          ${isFlipped ? 'opacity-100' : 'opacity-0'}
          ${isMatched ? 'ring-4 ring-green-400' : ''}
        `}>
          <img
            src={card.image}
            alt="Memory card"
            className="w-full h-full object-cover rounded-2xl"
            loading="lazy"
          />
        </div>
      </div>
    </motion.div>
  );
}

export default GameCard;