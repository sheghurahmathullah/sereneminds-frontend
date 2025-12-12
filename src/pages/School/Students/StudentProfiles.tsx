import React, { useState } from "react";
import { FiUser, FiMail, FiPhone, FiCalendar, FiMapPin, FiEdit, FiDownload } from "react-icons/fi";

interface StudentProfile {
  id: number;
  name: string;
  studentId: string;
  class: string;
  division: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  enrollmentDate: string;
  status: string;
  avatar?: string;
}

const StudentProfiles: React.FC = () => {
  const [selectedStudent, setSelectedStudent] = useState<StudentProfile | null>(null);

  const students: StudentProfile[] = [
    {
      id: 1,
      name: "John Doe",
      studentId: "STU001",
      class: "10",
      division: "A",
      email: "john.doe@example.com",
      phone: "+1234567890",
      dateOfBirth: "2008-05-15",
      address: "123 Main St, City, State 12345",
      parentName: "Robert Doe",
      parentPhone: "+1234567899",
      parentEmail: "robert.doe@example.com",
      enrollmentDate: "2023-06-01",
      status: "active",
    },
    {
      id: 2,
      name: "Jane Smith",
      studentId: "STU002",
      class: "10",
      division: "B",
      email: "jane.smith@example.com",
      phone: "+1234567891",
      dateOfBirth: "2008-08-20",
      address: "456 Oak Ave, City, State 12345",
      parentName: "Mary Smith",
      parentPhone: "+1234567898",
      parentEmail: "mary.smith@example.com",
      enrollmentDate: "2023-06-01",
      status: "active",
    },
  ];

  const selected = selectedStudent || students[0];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Student Profiles</h1>
        <p className="text-gray-600">View detailed student profile information</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Student List */}
        <div className="lg:col-span-1 bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Students</h2>
          <div className="space-y-2">
            {students.map((student) => (
              <div
                key={student.id}
                onClick={() => setSelectedStudent(student)}
                className={`p-4 rounded-lg cursor-pointer transition-colors ${
                  selected?.id === student.id
                    ? "bg-[#1ecab8] bg-opacity-10 border-2 border-[#1ecab8]"
                    : "bg-gray-50 hover:bg-gray-100"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#1ecab8] bg-opacity-10 flex items-center justify-center">
                    <FiUser className="text-[#1ecab8]" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{student.name}</div>
                    <div className="text-sm text-gray-500">{student.studentId}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Profile Details */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Profile Details</h2>
            <div className="flex gap-2">
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
                <FiDownload size={18} />
                Export
              </button>
              <button className="px-4 py-2 bg-[#1ecab8] text-white rounded-lg hover:bg-[#1bb8a6] flex items-center gap-2">
                <FiEdit size={18} />
                Edit
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {/* Basic Info */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-600">Full Name</label>
                  <div className="text-gray-900 font-medium">{selected.name}</div>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Student ID</label>
                  <div className="text-gray-900 font-medium">{selected.studentId}</div>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Class & Division</label>
                  <div className="text-gray-900 font-medium">
                    Class {selected.class} - Division {selected.division}
                  </div>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Date of Birth</label>
                  <div className="text-gray-900 font-medium">{selected.dateOfBirth}</div>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Enrollment Date</label>
                  <div className="text-gray-900 font-medium">{selected.enrollmentDate}</div>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Status</label>
                  <div>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                      {selected.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-600 flex items-center gap-2">
                    <FiMail size={14} />
                    Email
                  </label>
                  <div className="text-gray-900 font-medium">{selected.email}</div>
                </div>
                <div>
                  <label className="text-sm text-gray-600 flex items-center gap-2">
                    <FiPhone size={14} />
                    Phone
                  </label>
                  <div className="text-gray-900 font-medium">{selected.phone}</div>
                </div>
                <div>
                  <label className="text-sm text-gray-600 flex items-center gap-2">
                    <FiMapPin size={14} />
                    Address
                  </label>
                  <div className="text-gray-900 font-medium">{selected.address}</div>
                </div>
              </div>
            </div>

            {/* Parent/Guardian Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Parent/Guardian Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-600">Parent Name</label>
                  <div className="text-gray-900 font-medium">{selected.parentName}</div>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Parent Phone</label>
                  <div className="text-gray-900 font-medium">{selected.parentPhone}</div>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Parent Email</label>
                  <div className="text-gray-900 font-medium">{selected.parentEmail}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfiles;



