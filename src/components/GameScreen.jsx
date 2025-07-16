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

    generateCards(difficulty);
    dispatch({ type: 'SET_GAME_STATUS', payload: 'playing' });
    
    const interval = setInterval(() => {
      dispatch({ type: 'SET_TIME', payload: timeElapsed + 1 });
    }, 1000);
    
    setTimer(interval);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (flippedCards.length === 2) {
      setTimeout(() => {
        checkMatch();
      }, 500);
    }
  }, [flippedCards]);

  useEffect(() => {
    if (cards.length > 0 && matchedCards.length === cards.length) {
      dispatch({ type: 'SET_GAME_STATUS', payload: 'completed' });
      if (timer) clearInterval(timer);
    }
  }, [matchedCards, cards]);

  const getGridClass = () => {
    switch (difficulty) {
      case 'easy': return 'grid-cols-3 gap-3';
      case 'medium': return 'grid-cols-4 gap-2';
      case 'hard': return 'grid-cols-4 gap-2';
      default: return 'grid-cols-3 gap-3';
    }
  };

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