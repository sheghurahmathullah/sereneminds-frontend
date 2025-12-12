import React from "react";
import { FiTrendingUp, FiBarChart2 } from "react-icons/fi";

const MoodAnalytics: React.FC = () => {
  const moodData = [
    { zone: "Green Zone", count: 856, percentage: 68.7, color: "#10b981" },
    { zone: "Yellow Zone", count: 234, percentage: 18.8, color: "#f59e0b" },
    { zone: "Orange Zone", count: 98, percentage: 7.9, color: "#f97316" },
    { zone: "Red Zone", count: 59, percentage: 4.7, color: "#ef4444" },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Mood Analytics</h1>
        <p className="text-gray-600">Analyze student mood patterns and trends</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Mood Distribution</h2>
          <div className="space-y-4">
            {moodData.map((item, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="font-medium text-gray-900">{item.zone}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-600">{item.count} students</span>
                    <span className="text-sm font-semibold text-gray-900">{item.percentage}%</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="h-3 rounded-full transition-all duration-500"
                    style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Trends</h2>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <FiTrendingUp className="text-green-600" />
                <span className="font-medium text-gray-900">Positive Trend</span>
              </div>
              <p className="text-sm text-gray-600">Green zone increased by 12% this month</p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <FiBarChart2 className="text-yellow-600" />
                <span className="font-medium text-gray-900">Needs Attention</span>
              </div>
              <p className="text-sm text-gray-600">Yellow zone students require support</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoodAnalytics;



