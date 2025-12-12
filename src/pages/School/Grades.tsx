import React, { useState } from "react";
import { FiDownload, FiFilter, FiTrendingUp, FiTrendingDown, FiBarChart2 } from "react-icons/fi";

interface GradeRecord {
  studentId: string;
  studentName: string;
  className: string;
  division: string;
  subject: string;
  exam: string;
  marksObtained: number;
  totalMarks: number;
  percentage: number;
  grade: string;
  rank: number;
}

const Grades: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState("all");
  const [selectedSubject, setSelectedSubject] = useState("all");
  
  const gradeRecords: GradeRecord[] = [
    {
      studentId: "STU001",
      studentName: "John Doe",
      className: "10",
      division: "A",
      subject: "Mathematics",
      exam: "Mid-Term",
      marksObtained: 92,
      totalMarks: 100,
      percentage: 92,
      grade: "A+",
      rank: 1,
    },
    {
      studentId: "STU002",
      studentName: "Jane Smith",
      className: "10",
      division: "A",
      subject: "Mathematics",
      exam: "Mid-Term",
      marksObtained: 88,
      totalMarks: 100,
      percentage: 88,
      grade: "A",
      rank: 2,
    },
    {
      studentId: "STU003",
      studentName: "Mike Johnson",
      className: "10",
      division: "B",
      subject: "Mathematics",
      exam: "Mid-Term",
      marksObtained: 75,
      totalMarks: 100,
      percentage: 75,
      grade: "B",
      rank: 3,
    },
  ];

  const getGradeColor = (grade: string) => {
    if (grade.includes("A+") || grade.includes("A")) return "text-green-600";
    if (grade.includes("B")) return "text-blue-600";
    if (grade.includes("C")) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Grades & Results</h1>
        <p className="text-gray-600">View and manage student grades and examination results</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-end">
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
          <div className="flex-1">
            <label className="block text-sm text-gray-600 mb-2">Subject</label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1ecab8]/20 focus:border-[#1ecab8]"
            >
              <option value="all">All Subjects</option>
              <option value="math">Mathematics</option>
              <option value="science">Science</option>
              <option value="english">English</option>
            </select>
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

      {/* Grades Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left p-4 text-sm font-semibold text-gray-700">Rank</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-700">Student</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-700">Class/Division</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-700">Subject</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-700">Exam</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-700">Marks</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-700">Percentage</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-700">Grade</th>
              </tr>
            </thead>
            <tbody>
              {gradeRecords.map((record, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      {index === 0 ? (
                        <FiTrendingUp className="text-green-600" size={18} />
                      ) : index === gradeRecords.length - 1 ? (
                        <FiTrendingDown className="text-red-600" size={18} />
                      ) : null}
                      <span className="font-semibold text-gray-900">#{record.rank}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div>
                      <div className="font-medium text-gray-900">{record.studentName}</div>
                      <div className="text-sm text-gray-500">{record.studentId}</div>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-gray-600">
                    Class {record.className} - {record.division}
                  </td>
                  <td className="p-4 text-sm text-gray-600">{record.subject}</td>
                  <td className="p-4 text-sm text-gray-600">{record.exam}</td>
                  <td className="p-4">
                    <div className="font-semibold text-gray-900">
                      {record.marksObtained}/{record.totalMarks}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="font-semibold text-gray-900">{record.percentage}%</div>
                  </td>
                  <td className="p-4">
                    <span className={`text-lg font-bold ${getGradeColor(record.grade)}`}>
                      {record.grade}
                    </span>
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

export default Grades;

