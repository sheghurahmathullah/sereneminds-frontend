import React from "react";
import { FiDollarSign, FiCreditCard } from "react-icons/fi";

const BillingSettings: React.FC = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Billing & Subscription</h1>
        <p className="text-gray-600">Manage subscription and billing settings</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-3 mb-4">
          <FiDollarSign className="text-[#1ecab8]" size={24} />
          <h2 className="text-lg font-semibold text-gray-900">Current Subscription</h2>
        </div>
        <div className="p-4 bg-[#1ecab8] bg-opacity-10 rounded-lg">
          <div className="text-lg font-bold text-gray-900 mb-1">Premium Plan</div>
          <div className="text-sm text-gray-600">Active until 2024-12-31</div>
        </div>
      </div>
    </div>
  );
};

export default BillingSettings;



