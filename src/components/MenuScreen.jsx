import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGame } from '../contexts/GameContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiPlay, FiTrophy, FiUser } = FiIcons;

function MenuScreen() {
  const navigate = useNavigate();
  const { dispatch } = useGame();
  const [playerName, setPlayerName] = useState('');
  const [difficulty, setDifficulty] = useState('easy');
  const [showNameInput, setShowNameInput] = useState(false);

  const handleStartGame = () => {
    if (!playerName.trim()) {
      setShowNameInput(true);
      return;
    }
    
    dispatch({ type: 'SET_PLAYER_NAME', payload: playerName });
    dispatch({ type: 'SET_DIFFICULTY', payload: difficulty });
    dispatch({ type: 'RESET_GAME' });
    navigate('/game');
  };

  const menuItems = [
    { icon: FiPlay, label: 'Play Game', action: handleStartGame },
    { icon: FiTrophy, label: 'Leaderboard', action: () => navigate('/leaderboard') }
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-8"
      >
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
          Memory
          <span className="text-yellow-300"> Game</span>
        </h1>
        <p className="text-xl text-white/80">
          Flip cards and match pairs to win!
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 w-full max-w-md"
      >
        {!showNameInput ? (
          <>
            <div className="mb-6">
              <label className="block text-white mb-2 font-medium">
                Select Difficulty
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['easy', 'medium', 'hard'].map((level) => (
                  <button
                    key={level}
                    onClick={() => setDifficulty(level)}
                    className={`py-2 px-4 rounded-xl font-medium transition-all ${
                      difficulty === level
                        ? 'bg-yellow-400 text-purple-900'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {menuItems.map((item, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={item.action}
                  className="w-full bg-white/20 backdrop-blur-sm hover:bg-white/30 
                           text-white font-medium py-4 px-6 rounded-2xl 
                           transition-all duration-200 flex items-center justify-center gap-3"
                >
                  <SafeIcon icon={item.icon} className="text-xl" />
                  {item.label}
                </motion.button>
              ))}
            </div>
          </>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <SafeIcon icon={FiUser} className="text-2xl text-white" />
              <h2 className="text-xl font-bold text-white">Enter Your Name</h2>
            </div>
            
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="Your name..."
              className="w-full bg-white/20 backdrop-blur-sm border border-white/30 
                       text-white placeholder-white/60 py-3 px-4 rounded-xl 
                       focus:outline-none focus:ring-2 focus:ring-yellow-400"
              maxLength={20}
            />
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowNameInput(false)}
                className="flex-1 bg-white/20 text-white py-3 px-4 rounded-xl 
                         hover:bg-white/30 transition-all"
              >
                Back
              </button>
              <button
                onClick={handleStartGame}
                disabled={!playerName.trim()}
                className="flex-1 bg-yellow-400 text-purple-900 py-3 px-4 rounded-xl 
                         hover:bg-yellow-300 transition-all disabled:opacity-50 
                         disabled:cursor-not-allowed font-medium"
              >
                Start Game
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default MenuScreen;