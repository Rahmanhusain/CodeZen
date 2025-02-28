'use client'
import React, { useState } from 'react';

const LeaderboardComponent = () => {
  const [activeTab, setActiveTab] = useState('weekly');
  
  // Sample data for the leaderboard
  const leaderboardData = {
    weekly: [
      { id: 1, name: "Alex Morgan", score: 2850, change: "up" },
      { id: 2, name: "Jamie Chen", score: 2710, change: "down" },
      { id: 3, name: "Taylor Wilson", score: 2580, change: "up" },
      { id: 4, name: "Jordan Smith", score: 2420, change: "up" },
      { id: 5, name: "Casey Brown", score: 2340, change: "same" }
    ],
    
  };
  
  // Get the appropriate icon based on change status
    
  
  // Get rank badge styling
  const getRankBadge = (rank) => {
    switch(rank) {
      case 1:
        return "bg-yellow-400 text-yellow-900";
      case 2:
        return "bg-gray-300 text-gray-800";
      case 3:
        return "bg-amber-600 text-amber-900";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };
  
  return (
    <div className='flex items-center justify-center w-full min-h-screen'>

    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md w-1/2 md:max-w-2xl">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Leaderboard</h2>
          <div className="flex space-x-2 text-sm">
            
            
          </div>
        </div>
        
        <div className="overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {leaderboardData[activeTab].map((user) => (
              <li key={user.id} className="py-4 flex items-center justify-between hover:bg-gray-50 rounded-md transition duration-150 ease-in-out p-2">
                <div className="flex items-center space-x-4">
                  <div className={`${getRankBadge(user.id)} w-8 h-8 flex-shrink-0 rounded-full flex items-center justify-center font-bold`}>
                    {user.id}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {user.name}
                    </p>
                    
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-blue-600">{user.score.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">points</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
    </div>

  );
};

export default LeaderboardComponent;