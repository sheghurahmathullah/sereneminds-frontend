import React, { useState } from "react";
import { FiPlus, FiEdit, FiTrash2, FiCalendar, FiFileText, FiSearch } from "react-icons/fi";

interface Examination {
  id: number;
  examName: string;
  examType: string;
  className: string;
  startDate: string;
  endDate: string;
  status: "upcoming" | "ongoing" | "completed";
  totalSubjects: number;
}

const Examinations: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const examinations: Examination[] = [
    {
      id: 1,
      examName: "Mid-Term Examination",
      examType: "Mid-Term",
      className: "All Classes",
      startDate: "2024-02-15",
      endDate: "2024-02-28",
      status: "upcoming",
      totalSubjects: 6,
    },
    {
      id: 2,
      examName: "Unit Test 1",
      examType: "Unit Test",
      className: "Class 10",
      startDate: "2024-01-20",
      endDate: "2024-01-25",
      status: "completed",
      totalSubjects: 6,
    },
    {
      id: 3,
      examName: "Final Examination",
      examType: "Final",
      className: "All Classes",
      startDate: "2024-03-15",
      endDate: "2024-03-30",
      status: "upcoming",
      totalSubjects: 6,
    },
  ];

  const filteredExams = examinations.filter(
    (exam) =>
      exam.examName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exam.examType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-800";
      case "ongoing":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Examinations</h1>
          <p className="text-gray-600">Manage examination schedules</p>
        </div>
        <button className="px-4 py-2 bg-[#1ecab8] text-white rounded-lg hover:bg-[#1bb8a6] flex items-center gap-2">
          <FiPlus size={18} />
          Schedule Exam
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search examinations..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1ecab8]/20 focus:border-[#1ecab8]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExams.map((exam) => (
          <div key={exam.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#1ecab8] bg-opacity-10 flex items-center justify-center">
                  <FiFileText className="text-[#1ecab8]" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{exam.examName}</h3>
                  <p className="text-sm text-gray-500">{exam.examType}</p>
                </div>
              </div>
            </div>
            <div className="space-y-2 mb-4">
              <div className="text-sm">
                <span className="text-gray-600">Class: </span>
                <span className="font-medium text-gray-900">{exam.className}</span>
              </div>
              <div className="text-sm">
                <span className="text-gray-600">Start Date: </span>
                <span className="font-medium text-gray-900">{exam.startDate}</span>
              </div>
              <div className="text-sm">
                <span className="text-gray-600">End Date: </span>
                <span className="font-medium text-gray-900">{exam.endDate}</span>
              </div>
              <div className="text-sm">
                <span className="text-gray-600">Subjects: </span>
                <span className="font-medium text-gray-900">{exam.totalSubjects}</span>
              </div>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(exam.status)}`}>
                {exam.status.toUpperCase()}
              </span>
              <div className="flex gap-2">
                <button className="p-2 text-[#1ecab8] hover:bg-[#1ecab8] hover:bg-opacity-10 rounded-lg">
                  <FiEdit size={16} />
                </button>
                <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                  <FiTrash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Examinations;



