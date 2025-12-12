import React, { useState } from "react";
import { FiCalendar, FiDownload, FiFilter, FiCheckCircle, FiXCircle, FiClock } from "react-icons/fi";

interface AttendanceRecord {
  date: string;
  studentId: string;
  studentName: string;
  class: string;
  division: string;
  status: "present" | "absent" | "late" | "excused";
  checkInTime?: string;
}

const StudentAttendance: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [selectedClass, setSelectedClass] = useState("all");

  const attendanceRecords: AttendanceRecord[] = [
    {
      date: "2024-01-15",
      studentId: "STU001",
      studentName: "John Doe",
      class: "10",
      division: "A",
      status: "present",
      checkInTime: "08:30 AM",
    },
    {
      date: "2024-01-15",
      studentId: "STU002",
      studentName: "Jane Smith",
      class: "10",
      division: "A",
      status: "late",
      checkInTime: "09:15 AM",
    },
    {
      date: "2024-01-15",
      studentId: "STU003",
      studentName: "Mike Johnson",
      class: "10",
      division: "A",
      status: "absent",
    },
    {
      date: "2024-01-15",
      studentId: "STU004",
      studentName: "Sarah Williams",
      class: "10",
      division: "B",
      status: "present",
      checkInTime: "08:25 AM",
    },
    {
      date: "2024-01-15",
      studentId: "STU005",
      studentName: "David Brown",
      class: "10",
      division: "B",
      status: "excused",
    },
  ];

  const stats = {
    total: attendanceRecords.length,
    present: attendanceRecords.filter((r) => r.status === "present").length,
    absent: attendanceRecords.filter((r) => r.status === "absent").length,
    late: attendanceRecords.filter((r) => r.status === "late").length,
    excused: attendanceRecords.filter((r) => r.status === "excused").length,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "present":
        return "bg-green-100 text-green-800";
      case "absent":
        return "bg-red-100 text-red-800";
      case "late":
        return "bg-yellow-100 text-yellow-800";
      case "excused":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "present":
        return <FiCheckCircle className="text-green-600" />;
      case "absent":
        return <FiXCircle className="text-red-600" />;
      case "late":
        return <FiClock className="text-yellow-600" />;
      case "excused":
        return <FiClock className="text-blue-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Student Attendance</h1>
        <p className="text-gray-600">Track and manage student attendance records</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="text-sm text-gray-600 mb-1">Total Students</div>
          <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-green-500">
          <div className="text-sm text-gray-600 mb-1">Present</div>
          <div className="text-2xl font-bold text-green-600">{stats.present}</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-red-500">
          <div className="text-sm text-gray-600 mb-1">Absent</div>
          <div className="text-2xl font-bold text-red-600">{stats.absent}</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-yellow-500">
          <div className="text-sm text-gray-600 mb-1">Late</div>
          <div className="text-2xl font-bold text-yellow-600">{stats.late}</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-blue-500">
          <div className="text-sm text-gray-600 mb-1">Excused</div>
          <div className="text-2xl font-bold text-blue-600">{stats.excused}</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-end">
          <div className="flex gap-4 flex-1">
            <div className="flex-1">
              <label className="block text-sm text-gray-600 mb-2">Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1ecab8]/20 focus:border-[#1ecab8]"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm text-gray-600 mb-2">Class</label>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1ecab8]/20 focus:border-[#1ecab8]"
              >
                <option value="all">All Classes</option>
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

      {/* Attendance Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left p-4 text-sm font-semibold text-gray-700">Student ID</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-700">Student Name</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-700">Class/Division</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-700">Status</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-700">Check-in Time</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-700">Date</th>
              </tr>
            </thead>
            <tbody>
              {attendanceRecords.map((record, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-4 text-sm text-gray-900">{record.studentId}</td>
                  <td className="p-4">
                    <div className="font-medium text-gray-900">{record.studentName}</div>
                  </td>
                  <td className="p-4 text-sm text-gray-600">
                    Class {record.class} - {record.division}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(record.status)}
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          record.status
                        )}`}
                      >
                        {record.status.toUpperCase()}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-gray-600">
                    {record.checkInTime || "-"}
                  </td>
                  <td className="p-4 text-sm text-gray-600">{record.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentAttendance;

