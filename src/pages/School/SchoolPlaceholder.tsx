import React from "react";
import { useLocation, Link } from "react-router-dom";
import { FiArrowLeft, FiSettings, FiBarChart2, FiUsers, FiBook } from "react-icons/fi";

const SchoolPlaceholder: React.FC = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const pageName = pathSegments[pathSegments.length - 1] || "Page";

  // Format page name for display
  const formatPageName = (name: string): string => {
    return name
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const displayName = formatPageName(pageName);

  // Get icon based on path
  const getIcon = () => {
    if (location.pathname.includes("students")) return <FiUsers size={48} />;
    if (location.pathname.includes("academics")) return <FiBook size={48} />;
    if (location.pathname.includes("reports")) return <FiBarChart2 size={48} />;
    if (location.pathname.includes("settings")) return <FiSettings size={48} />;
    return <FiSettings size={48} />;
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-xl p-8 max-w-2xl w-full shadow-lg text-center">
        <div className="mb-6 flex justify-center">
          <div className="p-4 bg-[#1ecab8] bg-opacity-10 rounded-full">
            <div className="text-[#1ecab8]">{getIcon()}</div>
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{displayName}</h1>
        <p className="text-gray-600 mb-8 text-lg">
          This feature is coming soon! We're working hard to bring you the best school management experience.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            to="/school/dashboard"
            className="px-6 py-3 bg-[#1ecab8] text-white rounded-lg font-medium hover:bg-[#1bb8a6] transition-colors flex items-center gap-2"
          >
            <FiArrowLeft size={18} />
            Back to Dashboard
          </Link>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Need help? Contact support or check our documentation for more information.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SchoolPlaceholder;

