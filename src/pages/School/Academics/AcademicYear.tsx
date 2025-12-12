import React, { useState } from "react";
import { FiPlus, FiEdit, FiTrash2, FiCalendar, FiCheckCircle } from "react-icons/fi";

interface AcademicYear {
  id: number;
  year: string;
  startDate: string;
  endDate: string;
  status: "active" | "inactive" | "upcoming";
  totalStudents: number;
  totalClasses: number;
}

const AcademicYear: React.FC = () => {
  const [academicYears] = useState<AcademicYear[]>([
    {
      id: 1,
      year: "2024-2025",
      startDate: "2024-06-01",
      endDate: "2025-03-31",
      status: "active",
      totalStudents: 535,
      totalClasses: 18,
    },
    {
      id: 2,
      year: "2023-2024",
      startDate: "2023-06-01",
      endDate: "2024-03-31",
      status: "inactive",
      totalStudents: 520,
      totalClasses: 17,
    },
    {
      id: 3,
      year: "2025-2026",
      startDate: "2025-06-01",
      endDate: "2026-03-31",
      status: "upcoming",
      totalStudents: 0,
      totalClasses: 0,
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      case "upcoming":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Academic Year</h1>
          <p className="text-gray-600">Manage academic year settings</p>
        </div>
        <button className="px-4 py-2 bg-[#1ecab8] text-white rounded-lg hover:bg-[#1bb8a6] flex items-center gap-2">
          <FiPlus size={18} />
          Add Academic Year
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {academicYears.map((year) => (
          <div key={year.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#1ecab8] bg-opacity-10 flex items-center justify-center">
                  <FiCalendar className="text-[#1ecab8]" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{year.year}</h3>
                </div>
              </div>
              {year.status === "active" && (
                <FiCheckCircle className="text-green-600" size={24} />
              )}
            </div>
            <div className="space-y-3 mb-4">
              <div className="text-sm">
                <span className="text-gray-600">Start Date: </span>
                <span className="font-medium text-gray-900">{year.startDate}</span>
              </div>
              <div className="text-sm">
                <span className="text-gray-600">End Date: </span>
                <span className="font-medium text-gray-900">{year.endDate}</span>
              </div>
              <div className="flex items-center gap-4 pt-2 border-t border-gray-200">
                <div>
                  <div className="text-xs text-gray-600">Students</div>
                  <div className="text-lg font-bold text-gray-900">{year.totalStudents}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-600">Classes</div>
                  <div className="text-lg font-bold text-gray-900">{year.totalClasses}</div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(year.status)}`}>
                {year.status.toUpperCase()}
              </span>
              <div className="flex gap-2">
                <button className="p-2 text-[#1ecab8] hover:bg-[#1ecab8] hover:bg-opacity-10 rounded-lg">
                  <FiEdit size={16} />
                </button>
                {year.status !== "active" && (
                  <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                    <FiTrash2 size={16} />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AcademicYear;



