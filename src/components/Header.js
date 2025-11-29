import React from 'react';
import { Menu, Bell, User } from 'lucide-react';

const Header = ({ onMenuToggle, title = "Dashboard" }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-4 py-3 lg:px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Mobile Menu Button */}
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
          >
            <Menu size={24} />
          </button>
          
          <div>
            <h1 className="text-xl lg:text-2xl font-bold text-gray-800">{title}</h1>
            <p className="text-sm text-gray-600 hidden sm:block">Welcome to Ush Admin Panel</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {/* Live Indicator */}
          <div className="hidden sm:flex items-center space-x-2 bg-green-100 px-3 py-1 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-green-800 text-sm font-medium">Live</span>
          </div>
          
          {/* Notifications */}
          <button className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 relative">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
          </button>
          
          {/* Profile */}
          <button className="p-2 rounded-lg text-gray-600 hover:bg-gray-100">
            <User size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;