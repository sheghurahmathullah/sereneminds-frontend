import React from "react";
import { FiTrendingUp, FiUsers, FiBook, FiBarChart2 } from "react-icons/fi";

const Overview: React.FC = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">School Overview</h1>
        <p className="text-gray-600">Comprehensive overview of school operations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-[#1ecab8] bg-opacity-10 flex items-center justify-center">
              <FiUsers className="text-[#1ecab8]" size={24} />
            </div>
            <div>
              <div className="text-sm text-gray-600">Total Students</div>
              <div className="text-2xl font-bold text-gray-900">1,247</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <FiBook className="text-blue-600" size={24} />
            </div>
            <div>
              <div className="text-sm text-gray-600">Total Classes</div>
              <div className="text-2xl font-bold text-gray-900">32</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <FiTrendingUp className="text-green-600" size={24} />
            </div>
            <div>
              <div className="text-sm text-gray-600">Attendance Rate</div>
              <div className="text-2xl font-bold text-gray-900">94.5%</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
              <FiBarChart2 className="text-purple-600" size={24} />
            </div>
            <div>
              <div className="text-sm text-gray-600">Active Teachers</div>
              <div className="text-2xl font-bold text-gray-900">45</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Summary</h2>
        <p className="text-gray-600">School overview dashboard with key metrics and statistics.</p>
      </div>
    </div>
  );
};

export default Overview;



