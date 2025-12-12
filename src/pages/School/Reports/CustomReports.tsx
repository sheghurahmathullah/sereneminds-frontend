import React, { useState } from "react";
import { FiPlus, FiFileText, FiDownload } from "react-icons/fi";

const CustomReports: React.FC = () => {
  const [customReports] = useState([
    { id: 1, name: "Custom Report 1", created: "2024-01-10" },
    { id: 2, name: "Custom Report 2", created: "2024-01-08" },
  ]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Custom Reports</h1>
          <p className="text-gray-600">Create and manage custom reports</p>
        </div>
        <button className="px-4 py-2 bg-[#1ecab8] text-white rounded-lg hover:bg-[#1bb8a6] flex items-center gap-2">
          <FiPlus size={18} />
          Create Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {customReports.map((report) => (
          <div key={report.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-[#1ecab8] bg-opacity-10 flex items-center justify-center">
                <FiFileText className="text-[#1ecab8]" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">{report.name}</h3>
                <p className="text-sm text-gray-500">Created: {report.created}</p>
              </div>
            </div>
            <button className="w-full px-4 py-2 border border-[#1ecab8] text-[#1ecab8] rounded-lg hover:bg-[#1ecab8] hover:bg-opacity-10 flex items-center justify-center gap-2">
              <FiDownload size={18} />
              Download
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomReports;



