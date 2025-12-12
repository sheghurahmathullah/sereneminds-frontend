import React, { useState } from "react";
import { FiTrendingUp, FiTrendingDown, FiBarChart2, FiDownload, FiFilter } from "react-icons/fi";

interface PerformanceData {
  studentId: string;
  studentName: string;
  class: string;
  division: string;
  overallGrade: string;
  averageScore: number;
  totalSubjects: number;
  passedSubjects: number;
  attendance: number;
  moodScore: number;
  trend: "up" | "down";
}

const StudentPerformance: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState("all");

  const performanceData: PerformanceData[] = [
    {
      studentId: "STU001",
      studentName: "John Doe",
      class: "10",
      division: "A",
      overallGrade: "A+",
      averageScore: 92.5,
      totalSubjects: 6,
      passedSubjects: 6,
      attendance: 95,
      moodScore: 85,
      trend: "up",
    },
    {
      studentId: "STU002",
      studentName: "Jane Smith",
      class: "10",
      division: "B",
      overallGrade: "A",
      averageScore: 88.3,
      totalSubjects: 6,
      passedSubjects: 6,
      attendance: 92,
      moodScore: 78,
      trend: "up",
    },
    {
      studentId: "STU003",
      studentName: "Mike Johnson",
      class: "9",
      division: "A",
      overallGrade: "B",
      averageScore: 75.8,
      totalSubjects: 6,
      passedSubjects: 5,
      attendance: 78,
      moodScore: 65,
      trend: "down",
    },
    {
      studentId: "STU004",
      studentName: "Sarah Williams",
      class: "11",
      division: "C",
      overallGrade: "A-",
      averageScore: 90.2,
      totalSubjects: 6,
      passedSubjects: 6,
      attendance: 98,
      moodScore: 88,
      trend: "up",
    },
  ];

  const getGradeColor = (grade: string) => {
    if (grade.includes("A")) return "text-green-600";
    if (grade.includes("B")) return "text-blue-600";
    if (grade.includes("C")) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Student Performance</h1>
        <p className="text-gray-600">Track and analyze student academic performance</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-end">
          <div className="flex gap-4 flex-1">
            <div className="flex-1">
              <label className="block text-sm text-gray-600 mb-2">Class</label>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1ecab8]/20 focus:border-[#1ecab8]"
              >
                <option value="all">All Classes</option>
                <option value="9">Class 9</option>
                <option value="10">Class 10</option>
                <option value="11">Class 11</option>
                <option value="12">Class 12</option>
              </select>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
              <FiFilter size={18} />
              Filter
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
              <FiDownload size={18} />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Performance Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left p-4 text-sm font-semibold text-gray-700">Student</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-700">Class/Division</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-700">Overall Grade</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-700">Average Score</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-700">Subjects</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-700">Attendance</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-700">Mood Score</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-700">Trend</th>
              </tr>
            </thead>
            <tbody>
              {performanceData.map((student, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-4">
                    <div>
                      <div className="font-medium text-gray-900">{student.studentName}</div>
                      <div className="text-sm text-gray-500">{student.studentId}</div>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-gray-600">
                    Class {student.class} - {student.division}
                  </td>
                  <td className="p-4">
                    <span className={`text-lg font-bold ${getGradeColor(student.overallGrade)}`}>
                      {student.overallGrade}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="font-semibold text-gray-900">{student.averageScore}%</div>
                  </td>
                  <td className="p-4 text-sm text-gray-600">
                    {student.passedSubjects}/{student.totalSubjects}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-[#1ecab8] h-2 rounded-full"
                          style={{ width: `${student.attendance}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600 w-12">{student.attendance}%</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-purple-500 h-2 rounded-full"
                          style={{ width: `${student.moodScore}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600 w-12">{student.moodScore}%</span>
                    </div>
                  </td>
                  <td className="p-4">
                    {student.trend === "up" ? (
                      <FiTrendingUp className="text-green-600" size={20} />
                    ) : (
                      <FiTrendingDown className="text-red-600" size={20} />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentPerformance;

