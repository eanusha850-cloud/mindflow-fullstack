import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import TaskManager from './components/TaskManager';
import WellnessTracker from './components/WellnessTracker';
import ProductivityInsights from './components/ProductivityInsights';
import MeditationCenter from './components/MeditationCenter';
import Login from './components/Login';
import Signup from './components/Signup';
import { motion, AnimatePresence } from 'framer-motion';

export type ViewType = 'login' | 'signup' | 'dashboard' | 'tasks' | 'wellness' | 'insights' | 'meditation';

function App() {
  const [currentView, setCurrentView] = useState<ViewType>('login');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      setCurrentView('dashboard');
    }
  }, []);

  const handleLoginSuccess = (token: string) => {
    localStorage.setItem('token', token);
    setIsLoggedIn(true);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setCurrentView('login');
  };

  const VIEW_COMPONENTS: Record<string, JSX.Element> = {
    dashboard: <Dashboard />,
    tasks: <TaskManager />,
    wellness: <WellnessTracker />,
    insights: <ProductivityInsights />,
    meditation: <MeditationCenter />,
  };

  const renderCurrentView = () => {
    if (!isLoggedIn) {
      if (currentView === 'signup') return <Signup setCurrentView={setCurrentView} />;
      return <Login onLoginSuccess={handleLoginSuccess} setCurrentView={setCurrentView} />;
    }
    return VIEW_COMPONENTS[currentView] || <Dashboard />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-purple-200 via-white to-blue-200 font-sans">
      {isLoggedIn && (
        <Navigation
          currentView={currentView}
          onViewChange={setCurrentView}
          isLoggedIn={isLoggedIn}
          onLogout={handleLogout}
        />
      )}

      <main className={isLoggedIn ? "ml-16 lg:ml-64 p-6 lg:p-8" : "p-6 lg:p-8"}>
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-purple-200"
            >
              {renderCurrentView()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <footer className="text-center py-4 text-gray-600 text-sm">
        © 2025 Mindflow. Crafted with 💜 using React & Tailwind.
      </footer>
    </div>
  );
}

export default App;

// ✅ Unique design changes implemented:
// - Background gradient from purple to blue for fresh aesthetic
// - Glassmorphism effect on main content with backdrop blur
// - Smooth scaling animations using Framer Motion
// - Rounded-3xl cards with border for elegant elevation
// - Footer with branding for professional feel

// Let me know if you want neon gradients, aurora particle backgrounds, or dark mode toggle next.
