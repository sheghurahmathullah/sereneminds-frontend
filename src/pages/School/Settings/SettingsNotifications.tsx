import React from "react";
import { FiBell, FiToggleLeft, FiToggleRight } from "react-icons/fi";

const SettingsNotifications: React.FC = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Notification Settings</h1>
        <p className="text-gray-600">Configure notification preferences</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-3">
              <FiBell className="text-[#1ecab8]" />
              <div>
                <div className="font-medium text-gray-900">Email Notifications</div>
                <div className="text-sm text-gray-600">Receive notifications via email</div>
              </div>
            </div>
            <FiToggleRight className="text-[#1ecab8]" size={24} />
          </div>
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-3">
              <FiBell className="text-[#1ecab8]" />
              <div>
                <div className="font-medium text-gray-900">SMS Notifications</div>
                <div className="text-sm text-gray-600">Receive notifications via SMS</div>
              </div>
            </div>
            <FiToggleLeft className="text-gray-400" size={24} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsNotifications;



