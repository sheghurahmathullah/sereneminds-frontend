import React, { useState } from "react";
import { FiPlus, FiEdit, FiTrash2, FiUsers, FiSearch } from "react-icons/fi";

interface Division {
  id: number;
  divisionName: string;
  className: string;
  classCode: string;
  totalStudents: number;
  classTeacher: string;
  status: string;
}

const Divisions: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const divisions: Division[] = [
    {
      id: 1,
      divisionName: "Division A",
      className: "Class 10",
      classCode: "CLS010",
      totalStudents: 30,
      classTeacher: "Mrs. Smith",
      status: "active",
    },
    {
      id: 2,
      divisionName: "Division B",
      className: "Class 10",
      classCode: "CLS010",
      totalStudents: 29,
      classTeacher: "Mr. Johnson",
      status: "active",
    },
    {
      id: 3,
      divisionName: "Division A",
      className: "Class 11",
      classCode: "CLS011",
      totalStudents: 28,
      classTeacher: "Ms. Williams",
      status: "active",
    },
  ];

  const filteredDivisions = divisions.filter(
    (div) =>
      div.divisionName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      div.className.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Divisions</h1>
          <p className="text-gray-600">Manage class divisions</p>
        </div>
        <button className="px-4 py-2 bg-[#1ecab8] text-white rounded-lg hover:bg-[#1bb8a6] flex items-center gap-2">
          <FiPlus size={18} />
          Add Division
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search divisions..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1ecab8]/20 focus:border-[#1ecab8]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDivisions.map((division) => (
          <div key={division.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">{division.divisionName}</h3>
                <p className="text-sm text-gray-500">{division.className}</p>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                {division.status}
              </span>
            </div>
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-gray-600">
                <FiUsers size={16} />
                <span className="text-sm">{division.totalStudents} Students</span>
              </div>
              <div className="text-sm">
                <span className="text-gray-600">Class Teacher: </span>
                <span className="font-medium text-gray-900">{division.classTeacher}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 px-4 py-2 border border-[#1ecab8] text-[#1ecab8] rounded-lg hover:bg-[#1ecab8] hover:bg-opacity-10 flex items-center justify-center gap-2">
                <FiEdit size={16} />
                Edit
              </button>
              <button className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50">
                <FiTrash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Divisions;



