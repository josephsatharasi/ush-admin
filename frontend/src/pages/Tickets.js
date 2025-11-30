import React, { useState } from 'react';
import { Search, Filter, Eye, Download, CheckCircle, XCircle } from 'lucide-react';

const Tickets = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const tickets = [
    {
      id: 'T001',
      gameId: 'G001',
      userId: 'U001',
      userName: 'Kishore',
      ticketNumber: '123456',
      gameType: 'Live Game',
      timeSlot: '2:30 PM',
      status: 'Active',
      purchaseDate: '2024-01-15',
      price: '₹50'
    },
    {
      id: 'T002',
      gameId: 'G002',
      userId: 'U002',
      userName: 'Nandha Kishore',
      ticketNumber: '789012',
      gameType: 'FAM-JAM',
      timeSlot: '2:00 PM',
      status: 'Won',
      purchaseDate: '2024-01-15',
      price: '₹30'
    },
    {
      id: 'T003',
      gameId: 'G003',
      userId: 'U003',
      userName: 'Bhaskar Ram',
      ticketNumber: '345678',
      gameType: 'Live Game',
      timeSlot: '1:45 PM',
      status: 'Lost',
      purchaseDate: '2024-01-15',
      price: '₹50'
    },
    {
      id: 'T004',
      gameId: 'G004',
      userId: 'U004',
      userName: 'Neethu',
      ticketNumber: '901234',
      gameType: 'FAM-JAM',
      timeSlot: '3:00 PM',
      status: 'Pending',
      purchaseDate: '2024-01-15',
      price: '₹30'
    }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'Active': return 'bg-blue-100 text-blue-800';
      case 'Won': return 'bg-green-100 text-green-800';
      case 'Lost': return 'bg-red-100 text-red-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Tickets Management</h1>
        <p className="text-gray-600">Manage all game tickets</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="text-sm text-gray-500">Total Tickets</h3>
          <p className="text-2xl font-bold text-gray-800">45,678</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="text-sm text-gray-500">Active Tickets</h3>
          <p className="text-2xl font-bold text-blue-600">12,345</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="text-sm text-gray-500">Winning Tickets</h3>
          <p className="text-2xl font-bold text-green-600">2,456</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="text-sm text-gray-500">Revenue</h3>
          <p className="text-2xl font-bold text-purple-600">₹18,90,340</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search size={20} className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search by ticket number, user name..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option>All Status</option>
              <option>Active</option>
              <option>Won</option>
              <option>Lost</option>
              <option>Pending</option>
            </select>
            <select className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option>All Games</option>
              <option>Live Game</option>
              <option>FAM-JAM</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tickets Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Ticket ID</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">User</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Ticket Number</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Game Type</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Time Slot</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Price</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => (
                <tr key={ticket.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{ticket.id}</td>
                  <td className="py-3 px-4">{ticket.userName}</td>
                  <td className="py-3 px-4 font-mono">{ticket.ticketNumber}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      ticket.gameType === 'Live Game' ? 'bg-orange-100 text-orange-800' : 'bg-pink-100 text-pink-800'
                    }`}>
                      {ticket.gameType}
                    </span>
                  </td>
                  <td className="py-3 px-4">{ticket.timeSlot}</td>
                  <td className="py-3 px-4 font-medium">{ticket.price}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(ticket.status)}`}>
                      {ticket.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button className="p-1 text-blue-600 hover:bg-blue-100 rounded">
                        <Eye size={16} />
                      </button>
                      <button className="p-1 text-green-600 hover:bg-green-100 rounded">
                        <Download size={16} />
                      </button>
                      {ticket.status === 'Won' && (
                        <button className="p-1 text-green-600 hover:bg-green-100 rounded">
                          <CheckCircle size={16} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Tickets;