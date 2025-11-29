import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Games from './pages/Games';
import Tickets from './pages/Tickets';
import Leaderboard from './pages/Leaderboard';
import Rewards from './pages/Rewards';
import Analytics from './pages/Analytics';
import Locations from './pages/Locations';
import TimeSlots from './pages/TimeSlots';
import Landing from './pages/Landing';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setSidebarOpen(false);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  if (!isLoggedIn) {
    return <Landing onLogin={handleLogin} />;
  }

  return (
    <Router>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar 
          onLogout={handleLogout} 
          isOpen={sidebarOpen}
          onClose={closeSidebar}
        />
        <div className="flex-1 flex flex-col lg:ml-0">
          <Header onMenuToggle={toggleSidebar} />
          <main className="flex-1 overflow-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/users" element={<Users />} />
              <Route path="/games" element={<Games />} />
              <Route path="/tickets" element={<Tickets />} />
              {/* <Route path="/leaderboard" element={<Leaderboard />} /> */}
              {/* <Route path="/rewards" element={<Rewards />} /> */}
              {/* <Route path="/analytics" element={<Analytics />} /> */}
              {/* <Route path="/locations" element={<Locations />} /> */}
              {/* <Route path="/timeslots" element={<TimeSlots />} /> */}
              {/* <Route path="/settings" element={<div className="p-4 lg:p-6"><h1 className="text-2xl font-bold">Settings</h1></div>} /> */}
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
