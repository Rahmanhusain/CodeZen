'use client';
import React, { useState } from 'react';
// import './LeaderboardComponent.css'; // You'll need to create this CSS file

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
    monthly: [
      { id: 1, name: "Taylor Wilson", score: 9650, change: "up" },
      { id: 2, name: "Alex Morgan", score: 9120, change: "same" },
      { id: 3, name: "Casey Brown", score: 8750, change: "up" },
      { id: 4, name: "Jamie Chen", score: 8200, change: "down" },
      { id: 5, name: "Jordan Smith", score: 7890, change: "down" }
    ],
    allTime: [
      { id: 1, name: "Casey Brown", score: 143250, change: "same" },
      { id: 2, name: "Taylor Wilson", score: 128700, change: "up" },
      { id: 3, name: "Alex Morgan", score: 126400, change: "down" },
      { id: 4, name: "Jordan Smith", score: 109850, change: "same" },
      { id: 5, name: "Jamie Chen", score: 98320, change: "same" }
    ]
  };
  
  // Get the appropriate icon based on change status
  const getChangeIcon = (change) => {
    switch(change) {
      case 'up':
        return (
          <div className="change-icon change-up">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </div>
        );
      case 'down':
        return (
          <div className="change-icon change-down">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="change-icon change-same">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
            </svg>
          </div>
        );
    }
  };
  
  // Get rank badge class name
  const getRankBadgeClass = (rank) => {
    switch(rank) {
      case 1:
        return "rank-badge rank-gold";
      case 2:
        return "rank-badge rank-silver";
      case 3:
        return "rank-badge rank-bronze";
      default:
        return "rank-badge rank-default";
    }
  };
  
  return (
    <div className="leaderboard-container">
      <div className="leaderboard-header">
        <h2 className="leaderboard-title">Leaderboard</h2>
        <div className="tab-buttons">
          <button
            onClick={() => setActiveTab('weekly')}
            className={`tab-button ${activeTab === 'weekly' ? 'active' : ''}`}
          >
            Weekly
          </button>
          <button
            onClick={() => setActiveTab('monthly')}
            className={`tab-button ${activeTab === 'monthly' ? 'active' : ''}`}
          >
            Monthly
          </button>
          <button
            onClick={() => setActiveTab('allTime')}
            className={`tab-button ${activeTab === 'allTime' ? 'active' : ''}`}
          >
            All Time
          </button>
        </div>
      </div>
      
      <div className="leaderboard-content">
        <ul className="leaderboard-list">
          {leaderboardData[activeTab].map((user) => (
            <li key={user.id} className="leaderboard-item">
              <div className="user-info">
                <div className={getRankBadgeClass(user.id)}>
                  {user.id}
                </div>
                <img className="user-avatar" src={user.avatar} alt={user.name} />
                <div className="user-details">
                  <p className="user-name">{user.name}</p>
                  <p className="user-trend">
                    {getChangeIcon(user.change)}
                    <span className="trend-text">
                      {user.change === 'up' ? 'Trending up' : user.change === 'down' ? 'Trending down' : 'No change'}
                    </span>
                  </p>
                </div>
              </div>
              <div className="user-score">
                <p className="score-value">{user.score.toLocaleString()}</p>
                <p className="score-label">points</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LeaderboardComponent;



