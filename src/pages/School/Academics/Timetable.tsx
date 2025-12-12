import React, { useState } from "react";
import { FiCalendar, FiEdit, FiDownload, FiFilter } from "react-icons/fi";

interface TimeSlot {
  time: string;
  periods: { [key: string]: string };
}

const Timetable: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState("10");
  const [selectedDivision, setSelectedDivision] = useState("A");

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const timetable: TimeSlot[] = [
    {
      time: "08:00 - 08:45",
      periods: {
        Monday: "Mathematics",
        Tuesday: "Science",
        Wednesday: "English",
        Thursday: "Mathematics",
        Friday: "Science",
        Saturday: "English",
      },
    },
    {
      time: "08:45 - 09:30",
      periods: {
        Monday: "Science",
        Tuesday: "Mathematics",
        Wednesday: "Social Studies",
        Thursday: "English",
        Friday: "Mathematics",
        Saturday: "Science",
      },
    },
    {
      time: "09:30 - 09:45",
      periods: {
        Monday: "Break",
        Tuesday: "Break",
        Wednesday: "Break",
        Thursday: "Break",
        Friday: "Break",
        Saturday: "Break",
      },
    },
    {
      time: "09:45 - 10:30",
      periods: {
        Monday: "English",
        Tuesday: "Social Studies",
        Wednesday: "Mathematics",
        Thursday: "Science",
        Friday: "English",
        Saturday: "Physical Education",
      },
    },
    {
      time: "10:30 - 11:15",
      periods: {
        Monday: "Social Studies",
        Tuesday: "English",
        Wednesday: "Science",
        Thursday: "Social Studies",
        Friday: "Social Studies",
        Saturday: "Art",
      },
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Timetable</h1>
        <p className="text-gray-600">View and manage class timetables</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-end">
          <div className="flex gap-4 flex-1">
            <div className="flex-1">
              <label className="block text-sm text-gray-600 mb-2">Class</label>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1ecab8]/20 focus:border-[#1ecab8]"
              >
                <option value="9">Class 9</option>
                <option value="10">Class 10</option>
                <option value="11">Class 11</option>
                <option value="12">Class 12</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm text-gray-600 mb-2">Division</label>
              <select
                value={selectedDivision}
                onChange={(e) => setSelectedDivision(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1ecab8]/20 focus:border-[#1ecab8]"
              >
                <option value="A">Division A</option>
                <option value="B">Division B</option>
                <option value="C">Division C</option>
              </select>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
              <FiFilter size={18} />
              Filter
            </button>
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
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left p-4 text-sm font-semibold text-gray-700">Time</th>
                {days.map((day) => (
                  <th key={day} className="text-center p-4 text-sm font-semibold text-gray-700">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timetable.map((slot, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-4 text-sm font-medium text-gray-900">{slot.time}</td>
                  {days.map((day) => (
                    <td key={day} className="p-4 text-center">
                      <div
                        className={`px-3 py-2 rounded-lg text-sm ${
                          slot.periods[day] === "Break"
                            ? "bg-gray-100 text-gray-600"
                            : "bg-[#1ecab8] bg-opacity-10 text-[#1ecab8] font-medium"
                        }`}
                      >
                        {slot.periods[day]}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Timetable;

