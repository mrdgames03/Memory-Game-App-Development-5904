import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiPause, FiHome, FiClock, FiTarget, FiTrendingUp } = FiIcons;

function GameHeader({ playerName, moves, score, timeElapsed, onPause, onQuit }) {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 mx-auto max-w-md"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white font-bold text-lg">
          Hello, {playerName}!
        </h2>
        <div className="flex gap-2">
          <button
            onClick={onPause}
            className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-xl transition-all"
          >
            <SafeIcon icon={FiPause} />
          </button>
          <button
            onClick={onQuit}
            className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-xl transition-all"
          >
            <SafeIcon icon={FiHome} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="bg-white/10 rounded-xl p-3">
          <SafeIcon icon={FiClock} className="text-blue-300 mx-auto mb-1" />
          <div className="text-white font-bold">{formatTime(timeElapsed)}</div>
          <div className="text-white/60 text-xs">Time</div>
        </div>
        
        <div className="bg-white/10 rounded-xl p-3">
          <SafeIcon icon={FiTarget} className="text-green-300 mx-auto mb-1" />
          <div className="text-white font-bold">{moves}</div>
          <div className="text-white/60 text-xs">Moves</div>
        </div>
        
        <div className="bg-white/10 rounded-xl p-3">
          <SafeIcon icon={FiTrendingUp} className="text-yellow-300 mx-auto mb-1" />
          <div className="text-white font-bold">{score}</div>
          <div className="text-white/60 text-xs">Score</div>
        </div>
      </div>
    </motion.div>
  );
}

export default GameHeader;