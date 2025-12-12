import React, { useState } from "react";
import {
  FiSearch,
  FiFilter,
  FiDownload,
  FiEdit,
  FiEye,
  FiTrash2,
  FiUser,
  FiMail,
  FiPhone,
  FiPlus,
  FiX,
  FiCalendar,
  FiMapPin,
  FiUserCheck,
} from "react-icons/fi";

interface Student {
  id: number;
  name: string;
  studentId: string;
  class: string;
  division: string;
  email: string;
  phone: string;
  dateOfBirth?: string;
  address?: string;
  parentName?: string;
  parentPhone?: string;
  parentEmail?: string;
  enrollmentDate?: string;
  status: "active" | "inactive";
  moodStatus: "green" | "yellow" | "orange" | "red";
  lastMoodLog: string;
}

// Static initial data - resets on refresh
const getInitialStudents = (): Student[] => [
  {
    id: 1,
    name: "John Doe",
    studentId: "STU001",
    class: "10",
    division: "A",
    email: "john.doe@example.com",
    phone: "+1234567890",
    dateOfBirth: "2008-05-15",
    address: "123 Main St, City, State 12345",
    parentName: "Robert Doe",
    parentPhone: "+1234567899",
    parentEmail: "robert.doe@example.com",
    enrollmentDate: "2023-06-01",
    status: "active",
    moodStatus: "green",
    lastMoodLog: "2 hours ago",
  },
  {
    id: 2,
    name: "Jane Smith",
    studentId: "STU002",
    class: "10",
    division: "B",
    email: "jane.smith@example.com",
    phone: "+1234567891",
    dateOfBirth: "2008-08-20",
    address: "456 Oak Ave, City, State 12345",
    parentName: "Mary Smith",
    parentPhone: "+1234567898",
    parentEmail: "mary.smith@example.com",
    enrollmentDate: "2023-06-01",
    status: "active",
    moodStatus: "yellow",
    lastMoodLog: "5 hours ago",
  },
  {
    id: 3,
    name: "Mike Johnson",
    studentId: "STU003",
    class: "9",
    division: "A",
    email: "mike.johnson@example.com",
    phone: "+1234567892",
    dateOfBirth: "2009-03-10",
    address: "789 Pine Rd, City, State 12345",
    parentName: "James Johnson",
    parentPhone: "+1234567897",
    parentEmail: "james.johnson@example.com",
    enrollmentDate: "2023-06-01",
    status: "active",
    moodStatus: "red",
    lastMoodLog: "1 day ago",
  },
  {
    id: 4,
    name: "Sarah Williams",
    studentId: "STU004",
    class: "11",
    division: "C",
    email: "sarah.williams@example.com",
    phone: "+1234567893",
    dateOfBirth: "2007-11-25",
    address: "321 Elm St, City, State 12345",
    parentName: "Patricia Williams",
    parentPhone: "+1234567896",
    parentEmail: "patricia.williams@example.com",
    enrollmentDate: "2022-06-01",
    status: "active",
    moodStatus: "green",
    lastMoodLog: "3 hours ago",
  },
  {
    id: 5,
    name: "David Brown",
    studentId: "STU005",
    class: "12",
    division: "A",
    email: "david.brown@example.com",
    phone: "+1234567894",
    dateOfBirth: "2006-07-08",
    address: "654 Maple Dr, City, State 12345",
    parentName: "Michael Brown",
    parentPhone: "+1234567895",
    parentEmail: "michael.brown@example.com",
    enrollmentDate: "2021-06-01",
    status: "inactive",
    moodStatus: "orange",
    lastMoodLog: "2 days ago",
  },
];

const AllStudents: React.FC = () => {
  const [students, setStudents] = useState<Student[]>(getInitialStudents());
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [showForm, setShowForm] = useState(false);
  const [showView, setShowView] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    studentId: "",
    class: "",
    division: "",
    email: "",
    phone: "",
    status: "active" as "active" | "inactive",
  });

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredStudents.length / pageSize);
  const paginatedStudents = filteredStudents.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const getMoodColor = (status: string) => {
    switch (status) {
      case "green":
        return "bg-green-100 text-green-800";
      case "yellow":
        return "bg-yellow-100 text-yellow-800";
      case "orange":
        return "bg-orange-100 text-orange-800";
      case "red":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleAdd = () => {
    setIsEdit(false);
    setFormData({
      name: "",
      studentId: `STU${String(students.length + 1).padStart(3, "0")}`,
      class: "",
      division: "",
      email: "",
      phone: "",
      status: "active",
    });
    setShowForm(true);
  };

  const handleEdit = (student: Student) => {
    setIsEdit(true);
    setSelectedStudent(student);
    setFormData({
      name: student.name,
      studentId: student.studentId,
      class: student.class,
      division: student.division,
      email: student.email,
      phone: student.phone,
      status: student.status,
    });
    setShowForm(true);
  };

  const handleView = (student: Student) => {
    setSelectedStudent(student);
    setShowView(true);
  };

  const handleDelete = (student: Student) => {
    setSelectedStudent(student);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (selectedStudent) {
      setStudents(students.filter((s) => s.id !== selectedStudent.id));
      setShowDeleteConfirm(false);
      setSelectedStudent(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEdit && selectedStudent) {
      setStudents(
        students.map((s) =>
          s.id === selectedStudent.id
            ? {
                ...s,
                ...formData,
                moodStatus: s.moodStatus,
                lastMoodLog: s.lastMoodLog,
              }
            : s
        )
      );
    } else {
      const newStudent: Student = {
        id: Math.max(...students.map((s) => s.id)) + 1,
        ...formData,
        moodStatus: "green",
        lastMoodLog: "Just now",
      };
      setStudents([...students, newStudent]);
    }
    setShowForm(false);
    setFormData({
      name: "",
      studentId: "",
      class: "",
      division: "",
      email: "",
      phone: "",
      status: "active",
    });
    setSelectedStudent(null);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">All Students</h1>
        <p className="text-gray-600">Manage and view all student records</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
          <div className="relative flex-1 w-full md:w-auto">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search students by name, ID, or email..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1ecab8]/20 focus:border-[#1ecab8]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
              <FiFilter size={18} />
              Filter
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
              <FiDownload size={18} />
              Export
            </button>
            <button
              onClick={handleAdd}
              className="px-4 py-2 bg-[#1ecab8] text-white rounded-lg hover:bg-[#1bb8a6] flex items-center gap-2"
            >
              <FiPlus size={18} />
              Add Student
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left p-4 text-sm font-semibold text-gray-700">Student</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-700">Class/Division</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-700">Contact</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-700">Mood Status</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-700">Last Mood Log</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-700">Status</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedStudents.map((student) => (
                <tr key={student.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#1ecab8] bg-opacity-10 flex items-center justify-center">
                        <FiUser className="text-[#1ecab8]" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{student.name}</div>
                        <div className="text-sm text-gray-500">{student.studentId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm text-gray-900">
                      Class {student.class} - {student.division}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm text-gray-900">{student.email}</div>
                    <div className="text-xs text-gray-500">{student.phone}</div>
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getMoodColor(
                        student.moodStatus
                      )}`}
                    >
                      {student.moodStatus.toUpperCase()}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-gray-600">{student.lastMoodLog}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        student.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {student.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleView(student)}
                        className="p-2 text-[#1ecab8] hover:bg-[#1ecab8] hover:bg-opacity-10 rounded-lg transition-colors"
                        title="View"
                      >
                        <FiEye size={18} />
                      </button>
                      <button
                        onClick={() => handleEdit(student)}
                        className="p-2 text-[#1ecab8] hover:bg-[#1ecab8] hover:bg-opacity-10 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <FiEdit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(student)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredStudents.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No students found
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
            <div className="text-sm text-gray-600">
              Showing {(page - 1) * pageSize + 1} to {Math.min(page * pageSize, filteredStudents.length)} of {filteredStudents.length} students
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Previous
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add/Edit Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {isEdit ? "Edit Student" : "Add New Student"}
              </h2>
              <button
                onClick={() => {
                  setShowForm(false);
                  setFormData({
                    name: "",
                    studentId: "",
                    class: "",
                    division: "",
                    email: "",
                    phone: "",
                    status: "active",
                  });
                }}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <FiX size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Student Name *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1ecab8]/20 focus:border-[#1ecab8]"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Student ID *
                  </label>
                  <input
                    type="text"
                    required
                    disabled={isEdit}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1ecab8]/20 focus:border-[#1ecab8] disabled:bg-gray-50"
                    value={formData.studentId}
                    onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Class *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1ecab8]/20 focus:border-[#1ecab8]"
                    value={formData.class}
                    onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Division *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1ecab8]/20 focus:border-[#1ecab8]"
                    value={formData.division}
                    onChange={(e) => setFormData({ ...formData, division: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1ecab8]/20 focus:border-[#1ecab8]"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1ecab8]/20 focus:border-[#1ecab8]"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status *
                  </label>
                  <select
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1ecab8]/20 focus:border-[#1ecab8]"
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value as "active" | "inactive" })
                    }
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-[#1ecab8] text-white rounded-lg hover:bg-[#1bb8a6] font-medium"
                >
                  {isEdit ? "Update" : "Add"} Student
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setFormData({
                      name: "",
                      studentId: "",
                      class: "",
                      division: "",
                      email: "",
                      phone: "",
                      status: "active",
                    });
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Modal - Complete Profile */}
      {showView && selectedStudent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl p-6 max-w-4xl w-full my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Complete Student Profile</h2>
              <button
                onClick={() => {
                  setShowView(false);
                  setSelectedStudent(null);
                }}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <FiX size={24} />
              </button>
            </div>

            {/* Student Header */}
            <div className="bg-gradient-to-r from-[#1ecab8] to-[#1bb8a6] rounded-lg p-6 mb-6 text-white">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
                  <FiUser size={40} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-1">{selectedStudent.name}</h3>
                  <p className="text-white text-opacity-90">{selectedStudent.studentId}</p>
                  <p className="text-white text-opacity-90">
                    Class {selectedStudent.class} - Division {selectedStudent.division}
                  </p>
                </div>
              </div>
            </div>

            {/* Basic Information */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FiUser className="text-[#1ecab8]" />
                Basic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-600 block mb-1">Full Name</label>
                  <div className="font-medium text-gray-900">{selectedStudent.name}</div>
                </div>
                <div>
                  <label className="text-sm text-gray-600 block mb-1">Student ID</label>
                  <div className="font-medium text-gray-900">{selectedStudent.studentId}</div>
                </div>
                <div>
                  <label className="text-sm text-gray-600 block mb-1">Class & Division</label>
                  <div className="font-medium text-gray-900">
                    Class {selectedStudent.class} - Division {selectedStudent.division}
                  </div>
                </div>
                {selectedStudent.dateOfBirth && (
                  <div>
                    <label className="text-sm text-gray-600 block mb-1 flex items-center gap-1">
                      <FiCalendar size={14} />
                      Date of Birth
                    </label>
                    <div className="font-medium text-gray-900">{selectedStudent.dateOfBirth}</div>
                  </div>
                )}
                {selectedStudent.enrollmentDate && (
                  <div>
                    <label className="text-sm text-gray-600 block mb-1 flex items-center gap-1">
                      <FiCalendar size={14} />
                      Enrollment Date
                    </label>
                    <div className="font-medium text-gray-900">{selectedStudent.enrollmentDate}</div>
                  </div>
                )}
                <div>
                  <label className="text-sm text-gray-600 block mb-1">Status</label>
                  <div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        selectedStudent.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {selectedStudent.status}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="text-sm text-gray-600 block mb-1">Mood Status</label>
                  <div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getMoodColor(
                        selectedStudent.moodStatus
                      )}`}
                    >
                      {selectedStudent.moodStatus.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FiMail className="text-[#1ecab8]" />
                Contact Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-600 block mb-1 flex items-center gap-1">
                    <FiMail size={14} />
                    Email
                  </label>
                  <div className="font-medium text-gray-900">{selectedStudent.email}</div>
                </div>
                <div>
                  <label className="text-sm text-gray-600 block mb-1 flex items-center gap-1">
                    <FiPhone size={14} />
                    Phone
                  </label>
                  <div className="font-medium text-gray-900">{selectedStudent.phone}</div>
                </div>
                {selectedStudent.address && (
                  <div className="md:col-span-2">
                    <label className="text-sm text-gray-600 block mb-1 flex items-center gap-1">
                      <FiMapPin size={14} />
                      Address
                    </label>
                    <div className="font-medium text-gray-900">{selectedStudent.address}</div>
                  </div>
                )}
              </div>
            </div>

            {/* Parent/Guardian Information */}
            {selectedStudent.parentName && (
              <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <FiUserCheck className="text-[#1ecab8]" />
                  Parent/Guardian Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-600 block mb-1">Parent Name</label>
                    <div className="font-medium text-gray-900">{selectedStudent.parentName}</div>
                  </div>
                  {selectedStudent.parentPhone && (
                    <div>
                      <label className="text-sm text-gray-600 block mb-1 flex items-center gap-1">
                        <FiPhone size={14} />
                        Parent Phone
                      </label>
                      <div className="font-medium text-gray-900">{selectedStudent.parentPhone}</div>
                    </div>
                  )}
                  {selectedStudent.parentEmail && (
                    <div>
                      <label className="text-sm text-gray-600 block mb-1 flex items-center gap-1">
                        <FiMail size={14} />
                        Parent Email
                      </label>
                      <div className="font-medium text-gray-900">{selectedStudent.parentEmail}</div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Mood & Activity */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Mood & Activity</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-600 block mb-1">Current Mood Status</label>
                  <div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getMoodColor(
                        selectedStudent.moodStatus
                      )}`}
                    >
                      {selectedStudent.moodStatus.toUpperCase()} ZONE
                    </span>
                  </div>
                </div>
                <div>
                  <label className="text-sm text-gray-600 block mb-1">Last Mood Log</label>
                  <div className="font-medium text-gray-900">{selectedStudent.lastMoodLog}</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t border-gray-200">
              <button
                onClick={() => {
                  handleEdit(selectedStudent);
                  setShowView(false);
                }}
                className="flex-1 px-4 py-2 bg-[#1ecab8] text-white rounded-lg hover:bg-[#1bb8a6] font-medium flex items-center justify-center gap-2"
              >
                <FiEdit size={18} />
                Edit Profile
              </button>
              <button
                onClick={() => {
                  setShowView(false);
                  setSelectedStudent(null);
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && selectedStudent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Delete Student</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete <strong>{selectedStudent.name}</strong>? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={confirmDelete}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium"
              >
                Delete
              </button>
              <button
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setSelectedStudent(null);
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllStudents;
