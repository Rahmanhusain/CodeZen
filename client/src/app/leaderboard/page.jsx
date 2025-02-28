import React from "react";

const leaderboardData = [
  { name: "Travis", score: "56.12 km", image: "https://via.placeholder.com/50", rank: 1 },
  { name: "John", score: "46.78 km", image: "https://via.placeholder.com/50", rank: 2 },
  { name: "Anna", score: "34.55 km", image: "https://via.placeholder.com/50", rank: 3 },
  { name: "Andy Speed", score: "29.80 km", image: "https://via.placeholder.com/50", rank: 4 },
  { name: "Lia Perec", score: "25.40 km", image: "https://via.placeholder.com/50", rank: 5 },
];

const Leaderboard = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h2 className="text-xl font-bold text-center mb-6">Weekly Run Rank</h2>

      {/* Top 3 Players */}
      <div className="relative flex justify-center w-full max-w-md">
        {/* 2nd Place - Left, Slightly Lower */}
        <div className="absolute left-0 bottom-4 flex flex-col items-center">
          <img src={leaderboardData[1].image} alt={leaderboardData[1].name} className="w-14 h-14 rounded-full border-4 border-gray-400" />
          <span className="font-medium">{leaderboardData[1].name}</span>
          <span className="text-gray-600">{leaderboardData[1].score}</span>
        </div>

        {/* 1st Place - Center, Highest */}
        <div className="flex flex-col items-center">
          <img src={leaderboardData[0].image} alt={leaderboardData[0].name} className="w-16 h-16 rounded-full border-4 border-yellow-500" />
          <span className="font-bold text-yellow-500">{leaderboardData[0].name}</span>
          <span className="text-gray-600">{leaderboardData[0].score}</span>
        </div>

        {/* 3rd Place - Right, Slightly Lower than 2nd */}
        <div className="absolute right-0 bottom-2 flex flex-col items-center">
          <img src={leaderboardData[2].image} alt={leaderboardData[2].name} className="w-12 h-12 rounded-full border-4 border-orange-500" />
          <span className="font-medium">{leaderboardData[2].name}</span>
          <span className="text-gray-600">{leaderboardData[2].score}</span>
        </div>
      </div>

      {/* 4th and 5th Place - Below */}
      <ul className="mt-8 w-full max-w-md">
        {leaderboardData.slice(3).map((player, index) => (
          <li key={index} className="flex justify-between items-center bg-gray-50 p-2 rounded-lg mb-2 shadow-sm">
            <div className="flex items-center space-x-3">
              <span className="font-bold text-gray-700">{player.rank}</span>
              <img src={player.image} alt={player.name} className="w-10 h-10 rounded-full" />
              <span className="font-medium">{player.name}</span>
            </div>
            <span className="text-gray-600">{player.score}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function App() {
  return <Leaderboard />;
}