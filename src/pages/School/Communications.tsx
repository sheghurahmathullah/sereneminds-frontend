import React from "react";
import { FiMail, FiSend, FiInbox } from "react-icons/fi";

const Communications: React.FC = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Communications</h1>
        <p className="text-gray-600">Manage school communications and messages</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-[#1ecab8] bg-opacity-10 flex items-center justify-center">
              <FiInbox className="text-[#1ecab8]" size={24} />
            </div>
            <div>
              <div className="text-sm text-gray-600">Inbox</div>
              <div className="text-2xl font-bold text-gray-900">24</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <FiSend className="text-blue-600" size={24} />
            </div>
            <div>
              <div className="text-sm text-gray-600">Sent</div>
              <div className="text-2xl font-bold text-gray-900">156</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <FiMail className="text-green-600" size={24} />
            </div>
            <div>
              <div className="text-sm text-gray-600">Drafts</div>
              <div className="text-2xl font-bold text-gray-900">8</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Messages</h2>
        <p className="text-gray-600">Communication management interface coming soon.</p>
      </div>
    </div>
  );
};

export default Communications;



