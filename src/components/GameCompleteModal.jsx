import React from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../contexts/GameContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiTrophy, FiRefreshCw, FiHome } = FiIcons;

function GameCompleteModal({ playerName, moves, score, timeElapsed, onPlayAgain, onMainMenu }) {
  const { addToLeaderboard } = useGame();

  React.useEffect(() => {
    addToLeaderboard(playerName, score, moves, timeElapsed);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-3xl p-6 max-w-sm w-full text-center"
      >
        <div className="text-6xl mb-4">🎉</div>
        
        <div className="flex items-center justify-center gap-2 mb-4">
          <SafeIcon icon={FiTrophy} className="text-2xl text-yellow-500" />
          <h2 className="text-2xl font-bold text-gray-800">Congratulations!</h2>
        </div>
        
        <p className="text-gray-600 mb-6">
          Well done, <span className="font-bold text-purple-600">{playerName}</span>!
        </p>

        <div className="bg-gray-50 rounded-2xl p-4 mb-6 space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Final Score:</span>
            <span className="font-bold text-purple-600">{score}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Moves:</span>
            <span className="font-bold">{moves}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Time:</span>
            <span className="font-bold">{formatTime(timeElapsed)}</span>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onPlayAgain}
            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 
                     rounded-xl font-medium transition-all flex items-center justify-center gap-2"
          >
            <SafeIcon icon={FiRefreshCw} />
            Play Again
          </button>
          <button
            onClick={onMainMenu}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-4 
                     rounded-xl font-medium transition-all flex items-center justify-center gap-2"
          >
            <SafeIcon icon={FiHome} />
            Main Menu
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default GameCompleteModal;