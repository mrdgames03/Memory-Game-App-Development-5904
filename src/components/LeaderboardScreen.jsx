import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGame } from '../contexts/GameContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiArrowLeft, FiTrophy, FiClock, FiTarget } = FiIcons;

function LeaderboardScreen() {
  const navigate = useNavigate();
  const { leaderboard } = useGame();

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getTrophyIcon = (index) => {
    const colors = ['text-yellow-500', 'text-gray-400', 'text-amber-600'];
    return colors[index] || 'text-gray-300';
  };

  return (
    <div className="min-h-screen p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md mx-auto"
      >
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate('/')}
            className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-xl transition-all"
          >
            <SafeIcon icon={FiArrowLeft} />
          </button>
          <h1 className="text-2xl font-bold text-white">Leaderboard</h1>
        </div>

        {leaderboard.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center"
          >
            <SafeIcon icon={FiTrophy} className="text-4xl text-white/40 mx-auto mb-4" />
            <p className="text-white/60">No games played yet!</p>
            <p className="text-white/40 text-sm mt-2">Be the first to set a record!</p>
          </motion.div>
        ) : (
          <div className="space-y-3">
            {leaderboard.map((entry, index) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className={`text-2xl ${getTrophyIcon(index)}`}>
                      {index < 3 ? <SafeIcon icon={FiTrophy} /> : `#${index + 1}`}
                    </div>
                    <div>
                      <div className="font-bold text-white">{entry.name}</div>
                      <div className="text-white/60 text-sm">
                        {new Date(entry.date).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-yellow-400 text-lg">{entry.score}</div>
                    <div className="text-white/60 text-xs">points</div>
                  </div>
                </div>
                
                <div className="flex justify-between text-sm">
                  <div className="flex items-center gap-1 text-white/60">
                    <SafeIcon icon={FiTarget} />
                    {entry.moves} moves
                  </div>
                  <div className="flex items-center gap-1 text-white/60">
                    <SafeIcon icon={FiClock} />
                    {formatTime(entry.time)}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default LeaderboardScreen;