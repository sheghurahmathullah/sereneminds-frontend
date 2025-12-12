import React, { useState } from "react";
import { FiUpload, FiFileText, FiDownload, FiTrash2, FiSearch } from "react-icons/fi";

interface Document {
  id: number;
  name: string;
  type: string;
  size: string;
  uploadedDate: string;
  uploadedBy: string;
}

const Documents: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const documents: Document[] = [
    {
      id: 1,
      name: "School Policy Document.pdf",
      type: "PDF",
      size: "2.5 MB",
      uploadedDate: "2024-01-10",
      uploadedBy: "Admin",
    },
    {
      id: 2,
      name: "Student Handbook.pdf",
      type: "PDF",
      size: "5.1 MB",
      uploadedDate: "2024-01-08",
      uploadedBy: "Principal",
    },
    {
      id: 3,
      name: "Academic Calendar.xlsx",
      type: "Excel",
      size: "1.2 MB",
      uploadedDate: "2024-01-05",
      uploadedBy: "Admin",
    },
  ];

  const filteredDocuments = documents.filter((doc) =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Documents</h1>
          <p className="text-gray-600">Manage school documents and files</p>
        </div>
        <button className="px-4 py-2 bg-[#1ecab8] text-white rounded-lg hover:bg-[#1bb8a6] flex items-center gap-2">
          <FiUpload size={18} />
          Upload Document
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search documents..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1ecab8]/20 focus:border-[#1ecab8]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="text-left p-4 text-sm font-semibold text-gray-700">Document Name</th>
              <th className="text-left p-4 text-sm font-semibold text-gray-700">Type</th>
              <th className="text-left p-4 text-sm font-semibold text-gray-700">Size</th>
              <th className="text-left p-4 text-sm font-semibold text-gray-700">Uploaded Date</th>
              <th className="text-left p-4 text-sm font-semibold text-gray-700">Uploaded By</th>
              <th className="text-left p-4 text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDocuments.map((doc) => (
              <tr key={doc.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#1ecab8] bg-opacity-10 flex items-center justify-center">
                      <FiFileText className="text-[#1ecab8]" />
                    </div>
                    <div className="font-medium text-gray-900">{doc.name}</div>
                  </div>
                </td>
                <td className="p-4 text-sm text-gray-600">{doc.type}</td>
                <td className="p-4 text-sm text-gray-600">{doc.size}</td>
                <td className="p-4 text-sm text-gray-600">{doc.uploadedDate}</td>
                <td className="p-4 text-sm text-gray-600">{doc.uploadedBy}</td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-[#1ecab8] hover:bg-[#1ecab8] hover:bg-opacity-10 rounded-lg">
                      <FiDownload size={16} />
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

export default Documents;



