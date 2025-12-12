import React from "react";
import { FiTrendingUp, FiDownload } from "react-icons/fi";

const PerformanceReports: React.FC = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Performance Reports</h1>
        <p className="text-gray-600">Analyze student academic performance</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Academic Performance Overview</h2>
          <button className="px-4 py-2 bg-[#1ecab8] text-white rounded-lg hover:bg-[#1bb8a6] flex items-center gap-2">
            <FiDownload size={18} />
            Export Report
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-green-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <FiTrendingUp className="text-green-600" />
              <span className="font-medium text-gray-900">Average Score</span>
            </div>
            <div className="text-2xl font-bold text-green-600">85.5%</div>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="font-medium text-gray-900 mb-2">Pass Rate</div>
            <div className="text-2xl font-bold text-blue-600">94.2%</div>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <div className="font-medium text-gray-900 mb-2">Top Performers</div>
            <div className="text-2xl font-bold text-purple-600">156</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceReports;



