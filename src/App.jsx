import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { GameProvider } from './contexts/GameContext';
import GameScreen from './components/GameScreen';
import MenuScreen from './components/MenuScreen';
import LeaderboardScreen from './components/LeaderboardScreen';
import AdminPanel from './components/AdminPanel';
import VersionFooter from './components/VersionFooter';
import './App.css';

// Secret code for admin access - you can change this to any string you prefer
const ADMIN_SECRET = 'quest2024';

function App() {
  return (
    <GameProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500">
          <Routes>
            <Route path="/" element={<MenuScreen />} />
            <Route path="/game" element={<GameScreen />} />
            <Route path="/leaderboard" element={<LeaderboardScreen />} />
            {/* Secret admin route */}
            <Route path={`/admin/${ADMIN_SECRET}`} element={<AdminPanel />} />
            {/* Redirect any other /admin/* paths to home */}
            <Route path="/admin/*" element={<Navigate to="/" replace />} />
            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <VersionFooter />
        </div>
      </Router>
    </GameProvider>
  );
}

export default App;