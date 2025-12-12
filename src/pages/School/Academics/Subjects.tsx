import React, { useState } from "react";
import { FiPlus, FiEdit, FiTrash2, FiBook, FiSearch } from "react-icons/fi";

interface Subject {
  id: number;
  subjectName: string;
  subjectCode: string;
  className: string;
  teacher: string;
  totalClasses: number;
  status: string;
}

const Subjects: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const subjects: Subject[] = [
    {
      id: 1,
      subjectName: "Mathematics",
      subjectCode: "MATH",
      className: "Class 10",
      teacher: "Mr. Johnson",
      totalClasses: 6,
      status: "active",
    },
    {
      id: 2,
      subjectName: "Science",
      subjectCode: "SCI",
      className: "Class 10",
      teacher: "Mrs. Smith",
      totalClasses: 5,
      status: "active",
    },
    {
      id: 3,
      subjectName: "English",
      subjectCode: "ENG",
      className: "Class 10",
      teacher: "Ms. Williams",
      totalClasses: 4,
      status: "active",
    },
    {
      id: 4,
      subjectName: "Social Studies",
      subjectCode: "SOC",
      className: "Class 10",
      teacher: "Mr. Brown",
      totalClasses: 3,
      status: "active",
    },
  ];

  const filteredSubjects = subjects.filter(
    (subject) =>
      subject.subjectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subject.subjectCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Subjects</h1>
          <p className="text-gray-600">Manage academic subjects</p>
        </div>
        <button className="px-4 py-2 bg-[#1ecab8] text-white rounded-lg hover:bg-[#1bb8a6] flex items-center gap-2">
          <FiPlus size={18} />
          Add Subject
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search subjects..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1ecab8]/20 focus:border-[#1ecab8]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="text-left p-4 text-sm font-semibold text-gray-700">Subject Name</th>
              <th className="text-left p-4 text-sm font-semibold text-gray-700">Subject Code</th>
              <th className="text-left p-4 text-sm font-semibold text-gray-700">Class</th>
              <th className="text-left p-4 text-sm font-semibold text-gray-700">Teacher</th>
              <th className="text-left p-4 text-sm font-semibold text-gray-700">Classes/Week</th>
              <th className="text-left p-4 text-sm font-semibold text-gray-700">Status</th>
              <th className="text-left p-4 text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSubjects.map((subject) => (
              <tr key={subject.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#1ecab8] bg-opacity-10 flex items-center justify-center">
                      <FiBook className="text-[#1ecab8]" />
                    </div>
                    <div className="font-medium text-gray-900">{subject.subjectName}</div>
                  </div>
                </td>
                <td className="p-4 text-sm text-gray-600">{subject.subjectCode}</td>
                <td className="p-4 text-sm text-gray-600">{subject.className}</td>
                <td className="p-4 text-sm text-gray-600">{subject.teacher}</td>
                <td className="p-4 text-sm text-gray-600">{subject.totalClasses}</td>
                <td className="p-4">
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                    {subject.status}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-[#1ecab8] hover:bg-[#1ecab8] hover:bg-opacity-10 rounded-lg">
                      <FiEdit size={16} />
                    </button>
                    <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Subjects;



