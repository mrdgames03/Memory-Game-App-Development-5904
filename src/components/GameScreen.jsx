import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGame } from '../contexts/GameContext';
import GameCard from './GameCard';
import GameHeader from './GameHeader';
import GameCompleteModal from './GameCompleteModal';

function GameScreen() {
  const navigate = useNavigate();
  const {
    cards,
    flippedCards,
    matchedCards,
    moves,
    score,
    timeElapsed,
    gameStatus,
    difficulty,
    playerName,
    gameImages,
    dispatch,
    generateCards,
    checkMatch
  } = useGame();
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    if (!playerName) {
      navigate('/');
      return;
    }

    // Check if we have enough images for the selected difficulty
    const difficultyRequirements = {
      easy: 6,
      medium: 8,
      hard: 12
    };

    const requiredImages = difficultyRequirements[difficulty];
    const availableImages = gameImages[difficulty]?.length || 0;

    if (availableImages < requiredImages) {
      alert(`Not enough images for ${difficulty} difficulty. Need ${requiredImages}, have ${availableImages}. Please add more images in the admin panel.`);
      navigate('/');
      return;
    }

    // Generate cards for the game
    generateCards(difficulty);
    dispatch({ type: 'SET_GAME_STATUS', payload: 'playing' });

    // Start the timer
    const interval = setInterval(() => {
      dispatch({ type: 'SET_TIME', payload: timeElapsed + 1 });
    }, 1000);
    setTimer(interval);

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [difficulty, playerName, navigate, generateCards, dispatch, gameImages]);

  useEffect(() => {
    if (flippedCards.length === 2) {
      setTimeout(() => {
        checkMatch();
      }, 500);
    }
  }, [flippedCards, checkMatch]);

  useEffect(() => {
    if (cards.length > 0 && matchedCards.length === cards.length) {
      dispatch({ type: 'SET_GAME_STATUS', payload: 'completed' });
      if (timer) clearInterval(timer);
    }
  }, [matchedCards, cards, timer, dispatch]);

  const getGridClass = () => {
    switch (difficulty) {
      case 'easy': return 'grid-cols-3 gap-3';
      case 'medium': return 'grid-cols-4 gap-2';
      case 'hard': return 'grid-cols-4 gap-2';
      default: return 'grid-cols-3 gap-3';
    }
  };

  // Show loading state while cards are being generated
  if (!cards || cards.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading game...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      <GameHeader
        playerName={playerName}
        moves={moves}
        score={score}
        timeElapsed={timeElapsed}
        onPause={() => dispatch({ type: 'SET_GAME_STATUS', payload: 'paused' })}
        onQuit={() => navigate('/')}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className={`grid ${getGridClass()} max-w-md mx-auto mt-6`}
      >
        {cards.map((card) => (
          <GameCard
            key={card.id}
            card={card}
            isFlipped={flippedCards.includes(card.id) || matchedCards.includes(card.id)}
            isMatched={matchedCards.includes(card.id)}
            disabled={gameStatus !== 'playing' || flippedCards.length >= 2}
          />
        ))}
      </motion.div>

      {gameStatus === 'completed' && (
        <GameCompleteModal
          playerName={playerName}
          moves={moves}
          score={score}
          timeElapsed={timeElapsed}
          onPlayAgain={() => {
            dispatch({ type: 'RESET_GAME' });
            generateCards(difficulty);
            dispatch({ type: 'SET_GAME_STATUS', payload: 'playing' });
          }}
          onMainMenu={() => navigate('/')}
        />
      )}
    </div>
  );
}

export default GameScreen;