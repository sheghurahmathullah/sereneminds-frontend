import React from "react";
import { FiDownload, FiCalendar } from "react-icons/fi";

const AttendanceReports: React.FC = () => {
  const stats = {
    totalStudents: 1247,
    present: 1189,
    absent: 58,
    attendanceRate: 95.3,
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Attendance Reports</h1>
        <p className="text-gray-600">View attendance statistics and reports</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="text-sm text-gray-600 mb-1">Total Students</div>
          <div className="text-2xl font-bold text-gray-900">{stats.totalStudents}</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-green-500">
          <div className="text-sm text-gray-600 mb-1">Present</div>
          <div className="text-2xl font-bold text-green-600">{stats.present}</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-red-500">
          <div className="text-sm text-gray-600 mb-1">Absent</div>
          <div className="text-2xl font-bold text-red-600">{stats.absent}</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-[#1ecab8]">
          <div className="text-sm text-gray-600 mb-1">Attendance Rate</div>
          <div className="text-2xl font-bold text-[#1ecab8]">{stats.attendanceRate}%</div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Monthly Attendance Report</h2>
          <button className="px-4 py-2 bg-[#1ecab8] text-white rounded-lg hover:bg-[#1bb8a6] flex items-center gap-2">
            <FiDownload size={18} />
            Download Report
          </button>
        </div>
        <p className="text-gray-600">Attendance data visualization and detailed reports available here.</p>
      </div>
    </div>
  );
};

export default AttendanceReports;



