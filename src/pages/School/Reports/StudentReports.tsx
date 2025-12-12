import React, { useState } from "react";
import { FiDownload, FiFilter, FiBarChart2, FiFileText } from "react-icons/fi";

const StudentReports: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState("all");

  const reports = [
    { id: 1, name: "Student Performance Report", type: "Performance", date: "2024-01-15" },
    { id: 2, name: "Attendance Summary Report", type: "Attendance", date: "2024-01-14" },
    { id: 3, name: "Mood Tracking Report", type: "Mood", date: "2024-01-13" },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Student Reports</h1>
        <p className="text-gray-600">Generate and view student reports</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report) => (
          <div key={report.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-[#1ecab8] bg-opacity-10 flex items-center justify-center">
                <FiFileText className="text-[#1ecab8]" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">{report.name}</h3>
                <p className="text-sm text-gray-500">{report.type}</p>
              </div>
            </div>
            <div className="text-sm text-gray-600 mb-4">Generated: {report.date}</div>
            <button className="w-full px-4 py-2 bg-[#1ecab8] text-white rounded-lg hover:bg-[#1bb8a6] flex items-center justify-center gap-2">
              <FiDownload size={18} />
              Download
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentReports;



