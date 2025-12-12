import React, { useState } from "react";
import { FiPlus, FiEdit, FiTrash2, FiFileText, FiCalendar, FiSearch, FiDownload, FiX, FiEye } from "react-icons/fi";

interface Assignment {
  id: number;
  title: string;
  subject: string;
  className: string;
  division: string;
  dueDate: string;
  assignedDate: string;
  totalStudents: number;
  submitted: number;
  status: "active" | "completed" | "draft";
}

const getInitialAssignments = (): Assignment[] => [
  {
    id: 1,
    title: "Mathematics Chapter 5 Exercises",
    subject: "Mathematics",
    className: "Class 10",
    division: "A",
    dueDate: "2024-01-25",
    assignedDate: "2024-01-20",
    totalStudents: 30,
    submitted: 28,
    status: "active",
  },
  {
    id: 2,
    title: "Science Project - Photosynthesis",
    subject: "Science",
    className: "Class 10",
    division: "B",
    dueDate: "2024-01-30",
    assignedDate: "2024-01-22",
    totalStudents: 29,
    submitted: 15,
    status: "active",
  },
  {
    id: 3,
    title: "English Essay Writing",
    subject: "English",
    className: "Class 11",
    division: "A",
    dueDate: "2024-01-28",
    assignedDate: "2024-01-18",
    totalStudents: 28,
    submitted: 28,
    status: "completed",
  },
];

const Assignments: React.FC = () => {
  const [assignments, setAssignments] = useState<Assignment[]>(getInitialAssignments());
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showView, setShowView] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    className: "",
    division: "",
    dueDate: "",
    assignedDate: new Date().toISOString().split("T")[0],
    totalStudents: 0,
    submitted: 0,
    status: "active" as "active" | "completed" | "draft",
  });

  const filteredAssignments = assignments.filter(
    (assignment) =>
      assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignment.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "draft":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleAdd = () => {
    setIsEdit(false);
    setFormData({
      title: "",
      subject: "",
      className: "",
      division: "",
      dueDate: "",
      assignedDate: new Date().toISOString().split("T")[0],
      totalStudents: 0,
      submitted: 0,
      status: "active",
    });
    setShowForm(true);
  };

  const handleEdit = (assignment: Assignment) => {
    setIsEdit(true);
    setSelectedAssignment(assignment);
    setFormData({
      title: assignment.title,
      subject: assignment.subject,
      className: assignment.className,
      division: assignment.division,
      dueDate: assignment.dueDate,
      assignedDate: assignment.assignedDate,
      totalStudents: assignment.totalStudents,
      submitted: assignment.submitted,
      status: assignment.status,
    });
    setShowForm(true);
  };

  const handleView = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    setShowView(true);
  };

  const handleDelete = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (selectedAssignment) {
      setAssignments(assignments.filter((a) => a.id !== selectedAssignment.id));
      setShowDeleteConfirm(false);
      setSelectedAssignment(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEdit && selectedAssignment) {
      setAssignments(
        assignments.map((a) =>
          a.id === selectedAssignment.id ? { ...a, ...formData } : a
        )
      );
    } else {
      const newAssignment: Assignment = {
        id: Math.max(...assignments.map((a) => a.id)) + 1,
        ...formData,
      };
      setAssignments([...assignments, newAssignment]);
    }
    setShowForm(false);
    setFormData({
      title: "",
      subject: "",
      className: "",
      division: "",
      dueDate: "",
      assignedDate: new Date().toISOString().split("T")[0],
      totalStudents: 0,
      submitted: 0,
      status: "active",
    });
    setSelectedAssignment(null);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Assignments</h1>
          <p className="text-gray-600">Manage and track student assignments</p>
        </div>
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-[#1ecab8] text-white rounded-lg hover:bg-[#1bb8a6] flex items-center gap-2"
        >
          <FiPlus size={18} />
          Create Assignment
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search assignments..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1ecab8]/20 focus:border-[#1ecab8]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAssignments.map((assignment) => (
          <div key={assignment.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-[#1ecab8] bg-opacity-10 flex items-center justify-center">
                <FiFileText className="text-[#1ecab8]" size={24} />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900">{assignment.title}</h3>
                <p className="text-sm text-gray-500">{assignment.subject}</p>
              </div>
            </div>
            <div className="space-y-2 mb-4">
              <div className="text-sm">
                <span className="text-gray-600">Class: </span>
                <span className="font-medium text-gray-900">
                  {assignment.className} - {assignment.division}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <FiCalendar size={14} />
                <span>Due: {assignment.dueDate}</span>
              </div>
              <div className="pt-2 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-600">Submissions</span>
                  <span className="font-medium text-gray-900">
                    {assignment.submitted}/{assignment.totalStudents}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-[#1ecab8] h-2 rounded-full"
                    style={{
                      width: `${(assignment.submitted / assignment.totalStudents) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(assignment.status)}`}>
                {assignment.status.toUpperCase()}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleView(assignment)}
                  className="p-2 text-[#1ecab8] hover:bg-[#1ecab8] hover:bg-opacity-10 rounded-lg"
                  title="View"
                >
                  <FiEye size={16} />
                </button>
                <button
                  onClick={() => handleEdit(assignment)}
                  className="p-2 text-[#1ecab8] hover:bg-[#1ecab8] hover:bg-opacity-10 rounded-lg"
                  title="Edit"
                >
                  <FiEdit size={16} />
                </button>
                <button
                  onClick={() => handleDelete(assignment)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                  title="Delete"
                >
                  <FiTrash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {isEdit ? "Edit Assignment" : "Create New Assignment"}
              </h2>
              <button
                onClick={() => setShowForm(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <FiX size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1ecab8]/20 focus:border-[#1ecab8]"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subject *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1ecab8]/20 focus:border-[#1ecab8]"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
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
                    value={formData.className}
                    onChange={(e) => setFormData({ ...formData, className: e.target.value })}
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
                    Assigned Date *
                  </label>
                  <input
                    type="date"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1ecab8]/20 focus:border-[#1ecab8]"
                    value={formData.assignedDate}
                    onChange={(e) => setFormData({ ...formData, assignedDate: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Due Date *
                  </label>
                  <input
                    type="date"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1ecab8]/20 focus:border-[#1ecab8]"
                    value={formData.dueDate}
                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Total Students *
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1ecab8]/20 focus:border-[#1ecab8]"
                    value={formData.totalStudents}
                    onChange={(e) => setFormData({ ...formData, totalStudents: parseInt(e.target.value) || 0 })}
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
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as "active" | "completed" | "draft" })}
                  >
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-[#1ecab8] text-white rounded-lg hover:bg-[#1bb8a6] font-medium"
                >
                  {isEdit ? "Update" : "Create"} Assignment
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Modal */}
      {showView && selectedAssignment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Assignment Details</h2>
              <button
                onClick={() => {
                  setShowView(false);
                  setSelectedAssignment(null);
                }}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <FiX size={24} />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600">Title</label>
                <div className="font-medium text-gray-900">{selectedAssignment.title}</div>
              </div>
              <div>
                <label className="text-sm text-gray-600">Subject</label>
                <div className="font-medium text-gray-900">{selectedAssignment.subject}</div>
              </div>
              <div>
                <label className="text-sm text-gray-600">Class/Division</label>
                <div className="font-medium text-gray-900">
                  {selectedAssignment.className} - {selectedAssignment.division}
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-600">Due Date</label>
                <div className="font-medium text-gray-900">{selectedAssignment.dueDate}</div>
              </div>
              <div>
                <label className="text-sm text-gray-600">Assigned Date</label>
                <div className="font-medium text-gray-900">{selectedAssignment.assignedDate}</div>
              </div>
              <div>
                <label className="text-sm text-gray-600">Submissions</label>
                <div className="font-medium text-gray-900">
                  {selectedAssignment.submitted}/{selectedAssignment.totalStudents}
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-600">Status</label>
                <div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedAssignment.status)}`}>
                    {selectedAssignment.status.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-3 pt-6 mt-6 border-t border-gray-200">
              <button
                onClick={() => {
                  handleEdit(selectedAssignment);
                  setShowView(false);
                }}
                className="flex-1 px-4 py-2 bg-[#1ecab8] text-white rounded-lg hover:bg-[#1bb8a6] font-medium"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  setShowView(false);
                  setSelectedAssignment(null);
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
      {showDeleteConfirm && selectedAssignment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Delete Assignment</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete <strong>{selectedAssignment.title}</strong>? This action cannot be undone.
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
                  setSelectedAssignment(null);
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

export default Assignments;
