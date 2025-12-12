import React from "react";
import { FiDollarSign, FiCreditCard, FiFileText, FiCheckCircle } from "react-icons/fi";

const Billing: React.FC = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Billing & Payments</h1>
        <p className="text-gray-600">Manage subscriptions and payments</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-[#1ecab8] bg-opacity-10 flex items-center justify-center">
              <FiDollarSign className="text-[#1ecab8]" size={24} />
            </div>
            <div>
              <div className="text-sm text-gray-600">Current Plan</div>
              <div className="text-xl font-bold text-gray-900">Premium</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <FiCheckCircle className="text-green-600" size={24} />
            </div>
            <div>
              <div className="text-sm text-gray-600">Status</div>
              <div className="text-xl font-bold text-green-600">Active</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <FiCreditCard className="text-blue-600" size={24} />
            </div>
            <div>
              <div className="text-sm text-gray-600">Next Billing</div>
              <div className="text-xl font-bold text-gray-900">2024-02-01</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment History</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-3">
              <FiFileText className="text-[#1ecab8]" />
              <div>
                <div className="font-medium text-gray-900">Premium Plan - January 2024</div>
                <div className="text-sm text-gray-500">Paid on 2024-01-01</div>
              </div>
            </div>
            <div className="text-lg font-bold text-gray-900">$999.00</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billing;



