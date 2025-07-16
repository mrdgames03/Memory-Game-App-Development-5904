import React, { createContext, useContext, useReducer, useEffect } from 'react';

const GameContext = createContext();

const initialState = {
  cards: [],
  flippedCards: [],
  matchedCards: [],
  moves: 0,
  score: 0,
  timeElapsed: 0,
  gameStatus: 'idle', // idle, playing, paused, completed
  difficulty: 'easy', // easy: 4x3, medium: 4x4, hard: 6x4
  playerName: '',
  leaderboard: [],
  gameImages: {
    easy: [
      { id: 1, url: 'https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?w=200&h=200&fit=crop', difficulty: 'easy' },
      { id: 2, url: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=200&h=200&fit=crop', difficulty: 'easy' },
      { id: 3, url: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=200&h=200&fit=crop', difficulty: 'easy' },
      { id: 4, url: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=200&h=200&fit=crop', difficulty: 'easy' },
      { id: 5, url: 'https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?w=200&h=200&fit=crop', difficulty: 'easy' },
      { id: 6, url: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=200&h=200&fit=crop', difficulty: 'easy' }
    ],
    medium: [
      { id: 7, url: 'https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?w=200&h=200&fit=crop', difficulty: 'medium' },
      { id: 8, url: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=200&h=200&fit=crop', difficulty: 'medium' },
      { id: 9, url: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=200&h=200&fit=crop', difficulty: 'medium' },
      { id: 10, url: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=200&h=200&fit=crop', difficulty: 'medium' },
      { id: 11, url: 'https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?w=200&h=200&fit=crop', difficulty: 'medium' },
      { id: 12, url: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=200&h=200&fit=crop', difficulty: 'medium' },
      { id: 13, url: 'https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?w=200&h=200&fit=crop', difficulty: 'medium' },
      { id: 14, url: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=200&h=200&fit=crop', difficulty: 'medium' }
    ],
    hard: [
      { id: 15, url: 'https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?w=200&h=200&fit=crop', difficulty: 'hard' },
      { id: 16, url: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=200&h=200&fit=crop', difficulty: 'hard' },
      { id: 17, url: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=200&h=200&fit=crop', difficulty: 'hard' },
      { id: 18, url: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=200&h=200&fit=crop', difficulty: 'hard' },
      { id: 19, url: 'https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?w=200&h=200&fit=crop', difficulty: 'hard' },
      { id: 20, url: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=200&h=200&fit=crop', difficulty: 'hard' },
      { id: 21, url: 'https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?w=200&h=200&fit=crop', difficulty: 'hard' },
      { id: 22, url: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=200&h=200&fit=crop', difficulty: 'hard' },
      { id: 23, url: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=200&h=200&fit=crop', difficulty: 'hard' },
      { id: 24, url: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=200&h=200&fit=crop', difficulty: 'hard' },
      { id: 25, url: 'https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?w=200&h=200&fit=crop', difficulty: 'hard' },
      { id: 26, url: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=200&h=200&fit=crop', difficulty: 'hard' }
    ]
  }
};

function gameReducer(state, action) {
  switch (action.type) {
    case 'SET_CARDS':
      return { ...state, cards: action.payload };
    case 'FLIP_CARD':
      return { ...state, flippedCards: [...state.flippedCards, action.payload] };
    case 'MATCH_CARDS':
      return {
        ...state,
        matchedCards: [...state.matchedCards, ...action.payload],
        flippedCards: [],
        moves: state.moves + 1,
        score: state.score + 100
      };
    case 'RESET_FLIPPED':
      return { ...state, flippedCards: [] };
    case 'INCREMENT_MOVES':
      return { ...state, moves: state.moves + 1 };
    case 'SET_TIME':
      return { ...state, timeElapsed: action.payload };
    case 'SET_GAME_STATUS':
      return { ...state, gameStatus: action.payload };
    case 'SET_DIFFICULTY':
      return { ...state, difficulty: action.payload };
    case 'SET_PLAYER_NAME':
      return { ...state, playerName: action.payload };
    case 'RESET_GAME':
      return {
        ...state,
        cards: [],
        flippedCards: [],
        matchedCards: [],
        moves: 0,
        score: 0,
        timeElapsed: 0,
        gameStatus: 'idle'
      };
    case 'UPDATE_LEADERBOARD':
      return { ...state, leaderboard: action.payload };
    case 'ADD_GAME_IMAGE':
      return {
        ...state,
        gameImages: {
          ...state.gameImages,
          [action.payload.difficulty]: [
            ...state.gameImages[action.payload.difficulty],
            action.payload
          ]
        }
      };
    case 'REMOVE_GAME_IMAGE':
      return {
        ...state,
        gameImages: {
          ...state.gameImages,
          [action.payload.difficulty]: state.gameImages[action.payload.difficulty].filter(
            img => img.id !== action.payload.id
          )
        }
      };
    case 'SET_GAME_IMAGES':
      return { ...state, gameImages: action.payload };
    case 'MOVE_IMAGE_TO_DIFFICULTY':
      const { imageId, fromDifficulty, toDifficulty } = action.payload;
      const imageToMove = state.gameImages[fromDifficulty].find(img => img.id === imageId);
      if (!imageToMove) return state;
      
      const updatedImage = { ...imageToMove, difficulty: toDifficulty };
      
      return {
        ...state,
        gameImages: {
          ...state.gameImages,
          [fromDifficulty]: state.gameImages[fromDifficulty].filter(img => img.id !== imageId),
          [toDifficulty]: [...state.gameImages[toDifficulty], updatedImage]
        }
      };
    default:
      return state;
  }
}

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  // Load data from localStorage
  useEffect(() => {
    const savedLeaderboard = localStorage.getItem('memoryGameLeaderboard');
    if (savedLeaderboard) {
      dispatch({ type: 'UPDATE_LEADERBOARD', payload: JSON.parse(savedLeaderboard) });
    }

    const savedImages = localStorage.getItem('memoryGameImages');
    if (savedImages) {
      dispatch({ type: 'SET_GAME_IMAGES', payload: JSON.parse(savedImages) });
    }
  }, []);

  // Save data to localStorage
  useEffect(() => {
    localStorage.setItem('memoryGameLeaderboard', JSON.stringify(state.leaderboard));
  }, [state.leaderboard]);

  useEffect(() => {
    localStorage.setItem('memoryGameImages', JSON.stringify(state.gameImages));
  }, [state.gameImages]);

  const generateCards = (difficulty) => {
    const gridSizes = {
      easy: { pairs: 6, grid: '3x4' },
      medium: { pairs: 8, grid: '4x4' },
      hard: { pairs: 12, grid: '4x6' }
    };

    const { pairs } = gridSizes[difficulty];
    const selectedImages = state.gameImages[difficulty].slice(0, pairs);

    // Create pairs
    const cardPairs = selectedImages.flatMap((image, index) => [
      { id: index * 2, image: image.url, pairId: index },
      { id: index * 2 + 1, image: image.url, pairId: index }
    ]);

    // Shuffle cards
    const shuffledCards = cardPairs.sort(() => Math.random() - 0.5);
    dispatch({ type: 'SET_CARDS', payload: shuffledCards });
  };

  const flipCard = (cardId) => {
    if (state.flippedCards.length < 2 && !state.flippedCards.includes(cardId)) {
      dispatch({ type: 'FLIP_CARD', payload: cardId });
    }
  };

  const checkMatch = () => {
    if (state.flippedCards.length === 2) {
      const [firstCard, secondCard] = state.flippedCards.map(id =>
        state.cards.find(card => card.id === id)
      );

      if (firstCard.pairId === secondCard.pairId) {
        dispatch({ type: 'MATCH_CARDS', payload: state.flippedCards });
      } else {
        dispatch({ type: 'INCREMENT_MOVES' });
        setTimeout(() => {
          dispatch({ type: 'RESET_FLIPPED' });
        }, 1000);
      }
    }
  };

  const addToLeaderboard = (playerName, score, moves, time) => {
    const newEntry = {
      id: Date.now(),
      name: playerName,
      score,
      moves,
      time,
      date: new Date().toISOString()
    };

    const updatedLeaderboard = [...state.leaderboard, newEntry]
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);

    dispatch({ type: 'UPDATE_LEADERBOARD', payload: updatedLeaderboard });
  };

  const addGameImage = (imageUrl, difficulty) => {
    const newImage = {
      id: Date.now(),
      url: imageUrl,
      difficulty
    };
    dispatch({ type: 'ADD_GAME_IMAGE', payload: newImage });
  };

  const removeGameImage = (imageId, difficulty) => {
    dispatch({ type: 'REMOVE_GAME_IMAGE', payload: { id: imageId, difficulty } });
  };

  const moveImageToDifficulty = (imageId, fromDifficulty, toDifficulty) => {
    dispatch({ 
      type: 'MOVE_IMAGE_TO_DIFFICULTY', 
      payload: { imageId, fromDifficulty, toDifficulty } 
    });
  };

  const value = {
    ...state,
    dispatch,
    generateCards,
    flipCard,
    checkMatch,
    addToLeaderboard,
    addGameImage,
    removeGameImage,
    moveImageToDifficulty
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};