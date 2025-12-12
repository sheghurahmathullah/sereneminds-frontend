import React from "react";
import { FiEdit, FiSave } from "react-icons/fi";

const Profile: React.FC = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">School Profile</h1>
        <p className="text-gray-600">Manage school information and settings</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">School Information</h2>
          <button className="px-4 py-2 bg-[#1ecab8] text-white rounded-lg hover:bg-[#1bb8a6] flex items-center gap-2">
            <FiEdit size={18} />
            Edit
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm text-gray-600 mb-2">School Name</label>
            <div className="text-gray-900 font-medium">Serene Minds School</div>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-2">School Code</label>
            <div className="text-gray-900 font-medium">SCH001</div>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-2">Email</label>
            <div className="text-gray-900 font-medium">info@sereneminds.edu</div>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-2">Phone</label>
            <div className="text-gray-900 font-medium">+1234567890</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;



