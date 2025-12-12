import React, { useState } from "react";
import { FiPlus, FiEdit, FiTrash2, FiUser, FiMail, FiPhone, FiSearch, FiX, FiEye } from "react-icons/fi";

interface Teacher {
  id: number;
  name: string;
  employeeId: string;
  email: string;
  phone: string;
  subjects: string[];
  classes: string[];
  status: string;
}

const getInitialTeachers = (): Teacher[] => [
  {
    id: 1,
    name: "Mrs. Sarah Smith",
    employeeId: "EMP001",
    email: "sarah.smith@school.com",
    phone: "+1234567890",
    subjects: ["Mathematics", "Physics"],
    classes: ["Class 10", "Class 11"],
    status: "active",
  },
  {
    id: 2,
    name: "Mr. John Johnson",
    employeeId: "EMP002",
    email: "john.johnson@school.com",
    phone: "+1234567891",
    subjects: ["Science", "Chemistry"],
    classes: ["Class 9", "Class 10"],
    status: "active",
  },
  {
    id: 3,
    name: "Ms. Emily Williams",
    employeeId: "EMP003",
    email: "emily.williams@school.com",
    phone: "+1234567892",
    subjects: ["English", "Literature"],
    classes: ["Class 11", "Class 12"],
    status: "active",
  },
];

const Teachers: React.FC = () => {
  const [teachers, setTeachers] = useState<Teacher[]>(getInitialTeachers());
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showView, setShowView] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    employeeId: "",
    email: "",
    phone: "",
    subjects: "",
    classes: "",
    status: "active",
  });

  const filteredTeachers = teachers.filter(
    (teacher) =>
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = () => {
    setIsEdit(false);
    setFormData({
      name: "",
      employeeId: `EMP${String(teachers.length + 1).padStart(3, "0")}`,
      email: "",
      phone: "",
      subjects: "",
      classes: "",
      status: "active",
    });
    setShowForm(true);
  };

  const handleEdit = (teacher: Teacher) => {
    setIsEdit(true);
    setSelectedTeacher(teacher);
    setFormData({
      name: teacher.name,
      employeeId: teacher.employeeId,
      email: teacher.email,
      phone: teacher.phone,
      subjects: teacher.subjects.join(", "),
      classes: teacher.classes.join(", "),
      status: teacher.status,
    });
    setShowForm(true);
  };

  const handleView = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setShowView(true);
  };

  const handleDelete = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (selectedTeacher) {
      setTeachers(teachers.filter((t) => t.id !== selectedTeacher.id));
      setShowDeleteConfirm(false);
      setSelectedTeacher(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEdit && selectedTeacher) {
      setTeachers(
        teachers.map((t) =>
          t.id === selectedTeacher.id
            ? {
                ...t,
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                subjects: formData.subjects.split(",").map((s) => s.trim()),
                classes: formData.classes.split(",").map((c) => c.trim()),
                status: formData.status,
              }
            : t
        )
      );
    } else {
      const newTeacher: Teacher = {
        id: Math.max(...teachers.map((t) => t.id)) + 1,
        name: formData.name,
        employeeId: formData.employeeId,
        email: formData.email,
        phone: formData.phone,
        subjects: formData.subjects.split(",").map((s) => s.trim()),
        classes: formData.classes.split(",").map((c) => c.trim()),
        status: formData.status,
      };
      setTeachers([...teachers, newTeacher]);
    }
    setShowForm(false);
    setFormData({
      name: "",
      employeeId: "",
      email: "",
      phone: "",
      subjects: "",
      classes: "",
      status: "active",
    });
    setSelectedTeacher(null);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Teachers & Staff</h1>
          <p className="text-gray-600">Manage teachers and staff members</p>
        </div>
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-[#1ecab8] text-white rounded-lg hover:bg-[#1bb8a6] flex items-center gap-2"
        >
          <FiPlus size={18} />
          Add Teacher
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search teachers..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1ecab8]/20 focus:border-[#1ecab8]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTeachers.map((teacher) => (
          <div key={teacher.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-[#1ecab8] bg-opacity-10 flex items-center justify-center">
                <FiUser className="text-[#1ecab8]" size={32} />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900">{teacher.name}</h3>
                <p className="text-sm text-gray-500">{teacher.employeeId}</p>
              </div>
            </div>
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <FiMail size={14} />
                <span>{teacher.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <FiPhone size={14} />
                <span>{teacher.phone}</span>
              </div>
              <div className="pt-2 border-t border-gray-200">
                <div className="text-xs text-gray-600 mb-1">Subjects:</div>
                <div className="flex flex-wrap gap-1">
                  {teacher.subjects.map((subject, idx) => (
                    <span key={idx} className="px-2 py-1 bg-[#1ecab8] bg-opacity-10 text-[#1ecab8] rounded text-xs">
                      {subject}
                    </span>
                  ))}
                </div>
              </div>
              <div className="pt-2">
                <div className="text-xs text-gray-600 mb-1">Classes:</div>
                <div className="flex flex-wrap gap-1">
                  {teacher.classes.map((cls, idx) => (
                    <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                      {cls}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                {teacher.status}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleView(teacher)}
                  className="p-2 text-[#1ecab8] hover:bg-[#1ecab8] hover:bg-opacity-10 rounded-lg"
                  title="View"
                >
                  <FiEye size={16} />
                </button>
                <button
                  onClick={() => handleEdit(teacher)}
                  className="p-2 text-[#1ecab8] hover:bg-[#1ecab8] hover:bg-opacity-10 rounded-lg"
                  title="Edit"
                >
                  <FiEdit size={16} />
                </button>
                <button
                  onClick={() => handleDelete(teacher)}
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
                {isEdit ? "Edit Teacher" : "Add New Teacher"}
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
                    Name *
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
                    Employee ID *
                  </label>
                  <input
                    type="text"
                    required
                    disabled={isEdit}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1ecab8]/20 focus:border-[#1ecab8] disabled:bg-gray-50"
                    value={formData.employeeId}
                    onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
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
                    Subjects (comma separated) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Mathematics, Physics"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1ecab8]/20 focus:border-[#1ecab8]"
                    value={formData.subjects}
                    onChange={(e) => setFormData({ ...formData, subjects: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Classes (comma separated) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Class 10, Class 11"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1ecab8]/20 focus:border-[#1ecab8]"
                    value={formData.classes}
                    onChange={(e) => setFormData({ ...formData, classes: e.target.value })}
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
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
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
                  {isEdit ? "Update" : "Add"} Teacher
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
      {showView && selectedTeacher && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Teacher Details</h2>
              <button
                onClick={() => {
                  setShowView(false);
                  setSelectedTeacher(null);
                }}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <FiX size={24} />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600">Name</label>
                <div className="font-medium text-gray-900">{selectedTeacher.name}</div>
              </div>
              <div>
                <label className="text-sm text-gray-600">Employee ID</label>
                <div className="font-medium text-gray-900">{selectedTeacher.employeeId}</div>
              </div>
              <div>
                <label className="text-sm text-gray-600">Email</label>
                <div className="font-medium text-gray-900">{selectedTeacher.email}</div>
              </div>
              <div>
                <label className="text-sm text-gray-600">Phone</label>
                <div className="font-medium text-gray-900">{selectedTeacher.phone}</div>
              </div>
              <div>
                <label className="text-sm text-gray-600">Subjects</label>
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedTeacher.subjects.map((subject, idx) => (
                    <span key={idx} className="px-2 py-1 bg-[#1ecab8] bg-opacity-10 text-[#1ecab8] rounded text-xs">
                      {subject}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-600">Classes</label>
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedTeacher.classes.map((cls, idx) => (
                    <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                      {cls}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-600">Status</label>
                <div>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                    {selectedTeacher.status}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-3 pt-6 mt-6 border-t border-gray-200">
              <button
                onClick={() => {
                  handleEdit(selectedTeacher);
                  setShowView(false);
                }}
                className="flex-1 px-4 py-2 bg-[#1ecab8] text-white rounded-lg hover:bg-[#1bb8a6] font-medium"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  setShowView(false);
                  setSelectedTeacher(null);
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
      {showDeleteConfirm && selectedTeacher && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Delete Teacher</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete <strong>{selectedTeacher.name}</strong>? This action cannot be undone.
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
                  setSelectedTeacher(null);
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

export default Teachers;
