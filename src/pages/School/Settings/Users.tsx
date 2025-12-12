import React from "react";
import { FiPlus, FiUser, FiEdit, FiTrash2 } from "react-icons/fi";

const Users: React.FC = () => {
  const users = [
    { id: 1, name: "Admin User", email: "admin@school.com", role: "Administrator", status: "active" },
    { id: 2, name: "Teacher 1", email: "teacher1@school.com", role: "Teacher", status: "active" },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">User Management</h1>
          <p className="text-gray-600">Manage system users and their roles</p>
        </div>
        <button className="px-4 py-2 bg-[#1ecab8] text-white rounded-lg hover:bg-[#1bb8a6] flex items-center gap-2">
          <FiPlus size={18} />
          Add User
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="text-left p-4 text-sm font-semibold text-gray-700">User</th>
              <th className="text-left p-4 text-sm font-semibold text-gray-700">Email</th>
              <th className="text-left p-4 text-sm font-semibold text-gray-700">Role</th>
              <th className="text-left p-4 text-sm font-semibold text-gray-700">Status</th>
              <th className="text-left p-4 text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#1ecab8] bg-opacity-10 flex items-center justify-center">
                      <FiUser className="text-[#1ecab8]" />
                    </div>
                    <div className="font-medium text-gray-900">{user.name}</div>
                  </div>
                </td>
                <td className="p-4 text-sm text-gray-600">{user.email}</td>
                <td className="p-4 text-sm text-gray-600">{user.role}</td>
                <td className="p-4">
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                    {user.status}
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

export default Users;



