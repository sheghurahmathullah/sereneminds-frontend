import React from "react";
import { FiShield, FiLock, FiUser, FiKey } from "react-icons/fi";

const Security: React.FC = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Security & Access</h1>
        <p className="text-gray-600">Manage security settings and access controls</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-[#1ecab8] bg-opacity-10 flex items-center justify-center">
              <FiShield className="text-[#1ecab8]" size={24} />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">Access Control</h2>
          </div>
          <p className="text-gray-600 mb-4">Manage user permissions and access levels</p>
          <button className="px-4 py-2 bg-[#1ecab8] text-white rounded-lg hover:bg-[#1bb8a6]">
            Manage Access
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <FiLock className="text-blue-600" size={24} />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">Password Policy</h2>
          </div>
          <p className="text-gray-600 mb-4">Configure password requirements and policies</p>
          <button className="px-4 py-2 bg-[#1ecab8] text-white rounded-lg hover:bg-[#1bb8a6]">
            Configure
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <FiUser className="text-green-600" size={24} />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">User Management</h2>
          </div>
          <p className="text-gray-600 mb-4">Manage user accounts and roles</p>
          <button className="px-4 py-2 bg-[#1ecab8] text-white rounded-lg hover:bg-[#1bb8a6]">
            Manage Users
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
              <FiKey className="text-purple-600" size={24} />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">API Keys</h2>
          </div>
          <p className="text-gray-600 mb-4">Manage API keys and integrations</p>
          <button className="px-4 py-2 bg-[#1ecab8] text-white rounded-lg hover:bg-[#1bb8a6]">
            Manage Keys
          </button>
        </div>
      </div>
    </div>
  );
};

export default Security;



