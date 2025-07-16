import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGame } from '../contexts/GameContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiArrowLeft, FiPlus, FiTrash2, FiImage, FiUpload, FiMove, FiCheckCircle, FiAlertCircle } = FiIcons;

function AdminPanel() {
  const navigate = useNavigate();
  const { gameImages, addGameImage, removeGameImage, moveImageToDifficulty } = useGame();
  const [newImageUrl, setNewImageUrl] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('easy');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('easy');
  const [moveMode, setMoveMode] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);

  const difficultyRequirements = {
    easy: 6,
    medium: 8,
    hard: 12
  };

  const difficultyColors = {
    easy: 'bg-green-500',
    medium: 'bg-yellow-500',
    hard: 'bg-red-500'
  };

  const handleAddImage = async () => {
    if (!newImageUrl.trim()) return;

    setIsLoading(true);
    try {
      const img = new Image();
      img.onload = () => {
        addGameImage(newImageUrl, selectedDifficulty);
        setNewImageUrl('');
        setIsLoading(false);
      };
      img.onerror = () => {
        alert('Invalid image URL. Please check the URL and try again.');
        setIsLoading(false);
      };
      img.src = newImageUrl;
    } catch (error) {
      alert('Error adding image. Please try again.');
      setIsLoading(false);
    }
  };

  const handleRemoveImage = (imageId, difficulty) => {
    const currentImages = gameImages[difficulty];
    const requiredImages = difficultyRequirements[difficulty];
    
    if (currentImages.length <= requiredImages) {
      alert(`You need at least ${requiredImages} images for ${difficulty} difficulty to work properly.`);
      return;
    }
    
    removeGameImage(imageId, difficulty);
  };

  const toggleImageSelection = (imageId) => {
    setSelectedImages(prev => 
      prev.includes(imageId) 
        ? prev.filter(id => id !== imageId)
        : [...prev, imageId]
    );
  };

  const handleMoveImages = (targetDifficulty) => {
    selectedImages.forEach(imageId => {
      const fromDifficulty = Object.keys(gameImages).find(diff => 
        gameImages[diff].some(img => img.id === imageId)
      );
      if (fromDifficulty && fromDifficulty !== targetDifficulty) {
        moveImageToDifficulty(imageId, fromDifficulty, targetDifficulty);
      }
    });
    setSelectedImages([]);
    setMoveMode(false);
  };

  const getDifficultyStatus = (difficulty) => {
    const count = gameImages[difficulty].length;
    const required = difficultyRequirements[difficulty];
    return {
      count,
      required,
      isValid: count >= required,
      percentage: Math.min((count / required) * 100, 100)
    };
  };

  return (
    <div className="min-h-screen p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate('/')}
            className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-xl transition-all"
          >
            <SafeIcon icon={FiArrowLeft} />
          </button>
          <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
        </div>

        {/* Difficulty Overview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-6"
        >
          <h2 className="text-xl font-bold text-white mb-4">Difficulty Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.keys(difficultyRequirements).map(difficulty => {
              const status = getDifficultyStatus(difficulty);
              return (
                <div key={difficulty} className="bg-white/10 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium capitalize">{difficulty}</span>
                    {status.isValid ? (
                      <SafeIcon icon={FiCheckCircle} className="text-green-400" />
                    ) : (
                      <SafeIcon icon={FiAlertCircle} className="text-yellow-400" />
                    )}
                  </div>
                  <div className="text-white/60 text-sm mb-2">
                    {status.count}/{status.required} images
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        status.isValid ? 'bg-green-400' : 'bg-yellow-400'
                      }`}
                      style={{ width: `${status.percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Add New Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <SafeIcon icon={FiUpload} className="text-2xl text-white" />
            <h2 className="text-xl font-bold text-white">Add New Image</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
            <div className="md:col-span-2">
              <input
                type="url"
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                placeholder="Enter image URL (e.g., https://images.unsplash.com/...)"
                className="w-full bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/60 py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="bg-white/20 backdrop-blur-sm border border-white/30 text-white py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
            <button
              onClick={handleAddImage}
              disabled={!newImageUrl.trim() || isLoading}
              className="bg-yellow-400 hover:bg-yellow-300 text-purple-900 py-3 px-6 rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <SafeIcon icon={FiPlus} />
              {isLoading ? 'Adding...' : 'Add'}
            </button>
          </div>
          
          <p className="text-white/60 text-sm">
            Use high-quality square images (200x200px recommended) from Unsplash or other sources.
          </p>
        </motion.div>

        {/* Image Management */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <SafeIcon icon={FiImage} className="text-2xl text-white" />
              <h2 className="text-xl font-bold text-white">Manage Images</h2>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setMoveMode(!moveMode)}
                className={`py-2 px-4 rounded-xl font-medium transition-all flex items-center gap-2 ${
                  moveMode 
                    ? 'bg-yellow-400 text-purple-900' 
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                <SafeIcon icon={FiMove} />
                {moveMode ? 'Exit Move Mode' : 'Move Mode'}
              </button>
            </div>
          </div>

          {/* Difficulty Tabs */}
          <div className="flex gap-2 mb-6">
            {Object.keys(difficultyRequirements).map(difficulty => {
              const status = getDifficultyStatus(difficulty);
              return (
                <button
                  key={difficulty}
                  onClick={() => setActiveTab(difficulty)}
                  className={`py-2 px-4 rounded-xl font-medium transition-all flex items-center gap-2 ${
                    activeTab === difficulty
                      ? 'bg-yellow-400 text-purple-900'
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  <div className={`w-2 h-2 rounded-full ${difficultyColors[difficulty]}`} />
                  {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} ({status.count})
                </button>
              );
            })}
          </div>

          {/* Move Actions */}
          {moveMode && selectedImages.length > 0 && (
            <div className="bg-yellow-400/20 border border-yellow-400/30 rounded-xl p-4 mb-4">
              <p className="text-yellow-200 text-sm mb-3">
                {selectedImages.length} image(s) selected. Move to:
              </p>
              <div className="flex gap-2">
                {Object.keys(difficultyRequirements).map(difficulty => (
                  <button
                    key={difficulty}
                    onClick={() => handleMoveImages(difficulty)}
                    disabled={difficulty === activeTab}
                    className="bg-yellow-400 hover:bg-yellow-300 text-purple-900 py-2 px-4 rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Images Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {gameImages[activeTab].map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className={`relative group cursor-pointer ${
                  selectedImages.includes(image.id) ? 'ring-2 ring-yellow-400' : ''
                }`}
                onClick={() => moveMode && toggleImageSelection(image.id)}
              >
                <img
                  src={image.url}
                  alt={`Game image ${index + 1}`}
                  className="w-full aspect-square object-cover rounded-xl"
                />
                
                {/* Selection Overlay */}
                {moveMode && (
                  <div className={`absolute inset-0 rounded-xl transition-all ${
                    selectedImages.includes(image.id) 
                      ? 'bg-yellow-400/30' 
                      : 'bg-black/20 opacity-0 group-hover:opacity-100'
                  }`}>
                    <div className="absolute top-2 left-2">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        selectedImages.includes(image.id)
                          ? 'bg-yellow-400 border-yellow-400'
                          : 'border-white bg-white/20'
                      }`}>
                        {selectedImages.includes(image.id) && (
                          <SafeIcon icon={FiCheckCircle} className="text-purple-900 text-sm" />
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Delete Button */}
                {!moveMode && (
                  <button
                    onClick={() => handleRemoveImage(image.id, activeTab)}
                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200"
                  >
                    <SafeIcon icon={FiTrash2} className="text-sm" />
                  </button>
                )}
              </motion.div>
            ))}
          </div>

          {/* Status Message */}
          {(() => {
            const status = getDifficultyStatus(activeTab);
            if (!status.isValid) {
              return (
                <div className="mt-4 p-4 bg-yellow-400/20 border border-yellow-400/30 rounded-xl">
                  <p className="text-yellow-200 text-sm">
                    ⚠️ You need at least {status.required} images for {activeTab} difficulty to work properly. 
                    Current count: {status.count}/{status.required}
                  </p>
                </div>
              );
            }
            return null;
          })()}
        </motion.div>
      </motion.div>
    </div>
  );
}

export default AdminPanel;