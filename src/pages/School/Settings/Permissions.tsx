import React from "react";
import { FiShield, FiCheck } from "react-icons/fi";

const Permissions: React.FC = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Permissions</h1>
        <p className="text-gray-600">Manage user permissions and access controls</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-3 mb-4">
          <FiShield className="text-[#1ecab8]" size={24} />
          <h2 className="text-lg font-semibold text-gray-900">Role Permissions</h2>
        </div>
        <p className="text-gray-600">Permission management interface coming soon.</p>
      </div>
    </div>
  );
};

export default Permissions;



