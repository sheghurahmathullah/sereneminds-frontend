import React, { useState, useEffect } from "react";
import { FiSearch, FiEye, FiFilter, FiDownload, FiCalendar } from "react-icons/fi";
import axios from "axios";
import API_BASE_URL from "../config/api";

const Reports = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [studentMoodLogs, setStudentMoodLogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [dateFilter, setDateFilter] = useState({
    from: "",
    to: ""
  });

  // Helper functions for colors
  const getEmotionColor = (emotion) => {
    const emotionColors = {
      Sad: "#3b82f6",
      Calm: "#10b981",
      Angry: "#ef4444",
      Joy: "#10b981",
      Complacent: "#f59e0b",
      Neutral: "#f59e0b",
      Happy: "#10b981",
      Anxious: "#f59e0b",
      Stressed: "#f97316",
      Excited: "#9b59b6",
    };
    return emotionColors[emotion] || "#6b7280";
  };

  const getZoneColor = (zone) => {
    const zoneColors = {
      "Green Zone": "#10b981",
      "Yellow Zone": "#f59e0b",
      "Orange Zone": "#f97316",
      "Red Zone": "#ef4444",
      "Blue Zone": "#3b82f6",
    };
    return zoneColors[zone] || "#6b7280";
  };

  // Static student data for now (TODO: Replace with API call when student management is ready)
  const staticStudents = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      grade: "Grade 10",
      division: "A",
      school: "Springfield High School",
      enrollmentDate: "2023-09-01",
      status: "Active",
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "michael.chen@email.com",
      grade: "Grade 9",
      division: "B",
      school: "Springfield High School",
      enrollmentDate: "2023-09-01",
      status: "Active",
    },
    {
      id: 3,
      name: "Emma Williams",
      email: "emma.williams@email.com",
      grade: "Grade 11",
      division: "A",
      school: "Springfield High School",
      enrollmentDate: "2022-09-01",
      status: "Active",
    },
  ];

  useEffect(() => {
    // For now, use static students
    // TODO: Fetch from /api/students when endpoint is ready
    setStudents(staticStudents);
    setLoading(false);
  }, []);

  // Fetch mood logs for selected student
  const fetchStudentMoodLogs = async (studentId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/student-mood-logs`, {
        params: {
          studentId: studentId,
          status: true,
        },
      });
      
      if (response.data) {
        setStudentMoodLogs(response.data);
      }
    } catch (err) {
      console.error("Error fetching student mood logs:", err);
      setStudentMoodLogs([]);
    }
  };

  const handleViewStudent = (student) => {
    setSelectedStudent(student);
    fetchStudentMoodLogs(student.id);
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.grade.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate student statistics
  const calculateStats = () => {
    if (!studentMoodLogs.length) {
      return {
        totalMoods: 0,
        avgImpact: 0,
        avgJoyfulness: 0,
        mostCommonEmotion: "N/A",
        mostCommonZone: "N/A",
        zoneDistribution: {},
      };
    }

    const zoneCount = {};
    const emotionCount = {};
    let totalImpact = 0;
    let totalJoyfulness = 0;

    studentMoodLogs.forEach((log) => {
      // Zone distribution
      const zone = log.calculatedZone || "N/A";
      zoneCount[zone] = (zoneCount[zone] || 0) + 1;

      // Emotion distribution
      const emotion = log.calculatedEmotion || "N/A";
      emotionCount[emotion] = (emotionCount[emotion] || 0) + 1;

      // Averages
      totalImpact += log.impact;
      totalJoyfulness += log.joyfulness;
    });

    // Find most common
    const mostCommonZone = Object.keys(zoneCount).reduce((a, b) =>
      zoneCount[a] > zoneCount[b] ? a : b
    );
    const mostCommonEmotion = Object.keys(emotionCount).reduce((a, b) =>
      emotionCount[a] > emotionCount[b] ? a : b
    );

    return {
      totalMoods: studentMoodLogs.length,
      avgImpact: (totalImpact / studentMoodLogs.length).toFixed(1),
      avgJoyfulness: (totalJoyfulness / studentMoodLogs.length).toFixed(1),
      mostCommonEmotion,
      mostCommonZone,
      zoneDistribution: zoneCount,
    };
  };

  const stats = selectedStudent ? calculateStats() : null;

  if (loading) {
    return (
      <div style={{ padding: "32px", textAlign: "center" }}>
        Loading students...
      </div>
    );
  }

  return (
    <div style={{ padding: "32px", maxWidth: "1400px", margin: "0 auto" }}>
      {/* Header */}
      <div style={{
        background: "#fff",
        borderRadius: "14px",
        padding: "24px 28px",
        marginBottom: "24px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.03)"
      }}>
        <h2 style={{ fontSize: "28px", fontWeight: "700", margin: "0 0 8px 0" }}>
          Student Report
        </h2>
        <p style={{ color: "#888", margin: 0, fontSize: "14px" }}>
          View comprehensive student data and mood analytics
        </p>
      </div>

      {/* Search and Filters */}
      <div style={{
        background: "#fff",
        borderRadius: "14px",
        padding: "20px",
        marginBottom: "24px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.03)"
      }}>
        <div style={{ display: "flex", gap: "12px", alignItems: "stretch" }}>
          <div style={{ flex: 1, position: "relative", display: "flex", alignItems: "center" }}>
            <input
              type="text"
              placeholder="Search students by name, email, or grade..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 40px 12px 16px",
                border: "1px solid #e0e0e0",
                borderRadius: "8px",
                fontSize: "14px",
                outline: "none",
                transition: "border-color 0.2s"
              }}
              onFocus={(e) => e.target.style.borderColor = "#00c7b7"}
              onBlur={(e) => e.target.style.borderColor = "#e0e0e0"}
            />
            <FiSearch
              style={{
                position: "absolute",
                right: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#999",
                fontSize: "18px"
              }}
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 20px",
              background: "#f5f5f5",
              border: "1px solid #e0e0e0",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "600",
              color: "#444",
              transition: "all 0.2s",
              whiteSpace: "nowrap"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#00c7b7";
              e.currentTarget.style.color = "#fff";
              e.currentTarget.style.borderColor = "#00c7b7";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#f5f5f5";
              e.currentTarget.style.color = "#444";
              e.currentTarget.style.borderColor = "#e0e0e0";
            }}
          >
            <FiFilter /> Filters
          </button>
        </div>

        {showFilters && (
          <div style={{ 
            marginTop: "16px", 
            paddingTop: "16px", 
            borderTop: "1px solid #f0f0f0",
            display: "flex",
            gap: "12px",
            flexWrap: "wrap"
          }}>
            <div>
              <label style={{ fontSize: "13px", color: "#666", marginBottom: "4px", display: "block" }}>
                From Date
              </label>
              <input
                type="date"
                value={dateFilter.from}
                onChange={(e) => setDateFilter({ ...dateFilter, from: e.target.value })}
                style={{
                  padding: "8px 12px",
                  border: "1px solid #e0e0e0",
                  borderRadius: "6px",
                  fontSize: "14px"
                }}
              />
            </div>
            <div>
              <label style={{ fontSize: "13px", color: "#666", marginBottom: "4px", display: "block" }}>
                To Date
              </label>
              <input
                type="date"
                value={dateFilter.to}
                onChange={(e) => setDateFilter({ ...dateFilter, to: e.target.value })}
                style={{
                  padding: "8px 12px",
                  border: "1px solid #e0e0e0",
                  borderRadius: "6px",
                  fontSize: "14px"
                }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Two Column Layout */}
      <div style={{ display: "grid", gridTemplateColumns: selectedStudent ? "400px 1fr" : "1fr", gap: "24px" }}>
        {/* Student List */}
        <div style={{
          background: "#fff",
          borderRadius: "14px",
          padding: "20px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
          height: "fit-content",
          maxHeight: "calc(100vh - 300px)",
          overflowY: "auto"
        }}>
          <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "16px" }}>
            Students ({filteredStudents.length})
          </h3>
          <div style={{ display: "grid", gap: "12px" }}>
            {filteredStudents.map((student) => (
              <div
                key={student.id}
                onClick={() => handleViewStudent(student)}
                style={{
                  padding: "16px",
                  border: selectedStudent?.id === student.id ? "2px solid #00c7b7" : "1px solid #e0e0e0",
                  borderRadius: "10px",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  background: selectedStudent?.id === student.id ? "#f0fffd" : "#fff"
                }}
                onMouseEnter={(e) => {
                  if (selectedStudent?.id !== student.id) {
                    e.currentTarget.style.borderColor = "#00c7b7";
                    e.currentTarget.style.background = "#fafafa";
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedStudent?.id !== student.id) {
                    e.currentTarget.style.borderColor = "#e0e0e0";
                    e.currentTarget.style.background = "#fff";
                  }
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                  <div>
                    <div style={{ fontWeight: "600", fontSize: "15px", color: "#222" }}>
                      {student.name}
                    </div>
                    <div style={{ fontSize: "13px", color: "#666", marginTop: "4px" }}>
                      {student.grade} - Division {student.division}
                    </div>
                    <div style={{ fontSize: "12px", color: "#999", marginTop: "2px" }}>
                      {student.email}
                    </div>
                  </div>
                  <span style={{
                    padding: "4px 10px",
                    background: "#e8f5e9",
                    color: "#2e7d32",
                    borderRadius: "6px",
                    fontSize: "11px",
                    fontWeight: "600"
                  }}>
                    {student.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Student Details */}
        {selectedStudent && (
          <div style={{ display: "grid", gap: "24px" }}>
            {/* Student Info Card */}
            <div style={{
              background: "#fff",
              borderRadius: "14px",
              padding: "24px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.03)"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "24px" }}>
                <div>
                  <h3 style={{ fontSize: "24px", fontWeight: "700", margin: "0 0 8px 0" }}>
                    {selectedStudent.name}
                  </h3>
                  <div style={{ fontSize: "14px", color: "#666" }}>
                    {selectedStudent.email}
                  </div>
                </div>
                <button
                  className="btn btn-primary"
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <FiDownload /> Export Report
                </button>
              </div>

              <div style={{ 
                display: "grid", 
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", 
                gap: "16px",
                padding: "20px",
                background: "#f9f9f9",
                borderRadius: "10px"
              }}>
                <div>
                  <div style={{ fontSize: "12px", color: "#888", marginBottom: "4px" }}>
                    Grade & Division
                  </div>
                  <div style={{ fontSize: "16px", fontWeight: "600" }}>
                    {selectedStudent.grade} - {selectedStudent.division}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: "12px", color: "#888", marginBottom: "4px" }}>
                    School
                  </div>
                  <div style={{ fontSize: "16px", fontWeight: "600" }}>
                    {selectedStudent.school}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: "12px", color: "#888", marginBottom: "4px" }}>
                    Enrollment Date
                  </div>
                  <div style={{ fontSize: "16px", fontWeight: "600" }}>
                    {selectedStudent.enrollmentDate}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: "12px", color: "#888", marginBottom: "4px" }}>
                    Status
                  </div>
                  <div style={{ fontSize: "16px", fontWeight: "600", color: "#2e7d32" }}>
                    {selectedStudent.status}
                  </div>
                </div>
              </div>
            </div>

            {/* Mood Statistics */}
            {stats && (
              <div style={{
                background: "#fff",
                borderRadius: "14px",
                padding: "24px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.03)"
              }}>
                <h4 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "20px" }}>
                  Mood Analytics
                </h4>
                <div style={{ 
                  display: "grid", 
                  gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", 
                  gap: "16px" 
                }}>
                  <div style={{
                    padding: "16px",
                    background: "#f0f9ff",
                    borderRadius: "10px",
                    border: "1px solid #bfdbfe"
                  }}>
                    <div style={{ fontSize: "12px", color: "#1e40af", marginBottom: "4px" }}>
                      Total Mood Logs
                    </div>
                    <div style={{ fontSize: "24px", fontWeight: "700", color: "#1e40af" }}>
                      {stats.totalMoods}
                    </div>
                  </div>
                  <div style={{
                    padding: "16px",
                    background: "#f0fdf4",
                    borderRadius: "10px",
                    border: "1px solid #bbf7d0"
                  }}>
                    <div style={{ fontSize: "12px", color: "#166534", marginBottom: "4px" }}>
                      Avg Impact
                    </div>
                    <div style={{ fontSize: "24px", fontWeight: "700", color: "#166534" }}>
                      {stats.avgImpact}/7
                    </div>
                  </div>
                  <div style={{
                    padding: "16px",
                    background: "#fef9c3",
                    borderRadius: "10px",
                    border: "1px solid #fde047"
                  }}>
                    <div style={{ fontSize: "12px", color: "#854d0e", marginBottom: "4px" }}>
                      Avg Joyfulness
                    </div>
                    <div style={{ fontSize: "24px", fontWeight: "700", color: "#854d0e" }}>
                      {stats.avgJoyfulness}/7
                    </div>
                  </div>
                  <div style={{
                    padding: "16px",
                    background: "#fef2f2",
                    borderRadius: "10px",
                    border: "1px solid #fecaca"
                  }}>
                    <div style={{ fontSize: "12px", color: "#991b1b", marginBottom: "4px" }}>
                      Most Common Zone
                    </div>
                    <div style={{ 
                      fontSize: "14px", 
                      fontWeight: "700",
                      color: getZoneColor(stats.mostCommonZone),
                      display: "flex",
                      alignItems: "center",
                      gap: "6px"
                    }}>
                      <div style={{
                        width: "12px",
                        height: "12px",
                        borderRadius: "50%",
                        backgroundColor: getZoneColor(stats.mostCommonZone)
                      }} />
                      {stats.mostCommonZone}
                    </div>
                  </div>
                </div>

                {/* Zone Distribution */}
                <div style={{ marginTop: "24px" }}>
                  <h5 style={{ fontSize: "14px", fontWeight: "600", marginBottom: "12px", color: "#444" }}>
                    Zone Distribution
                  </h5>
                  <div style={{ display: "grid", gap: "8px" }}>
                    {Object.entries(stats.zoneDistribution).map(([zone, count]) => (
                      <div key={zone} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <div style={{
                          width: "100px",
                          fontSize: "13px",
                          fontWeight: "600",
                          color: "#444",
                          display: "flex",
                          alignItems: "center",
                          gap: "6px"
                        }}>
                          <div style={{
                            width: "10px",
                            height: "10px",
                            borderRadius: "50%",
                            backgroundColor: getZoneColor(zone)
                          }} />
                          {zone}
                        </div>
                        <div style={{ flex: 1, position: "relative", height: "24px", background: "#f0f0f0", borderRadius: "12px", overflow: "hidden" }}>
                          <div style={{
                            position: "absolute",
                            left: 0,
                            top: 0,
                            height: "100%",
                            width: `${(count / stats.totalMoods) * 100}%`,
                            background: getZoneColor(zone),
                            borderRadius: "12px",
                            transition: "width 0.3s"
                          }} />
                        </div>
                        <div style={{ width: "60px", textAlign: "right", fontSize: "13px", fontWeight: "600" }}>
                          {count} ({((count / stats.totalMoods) * 100).toFixed(0)}%)
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Mood Logs Table */}
            <div style={{
              background: "#fff",
              borderRadius: "14px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
              overflow: "hidden"
            }}>
              <div style={{ padding: "20px 24px", borderBottom: "1px solid #f0f0f0" }}>
                <h4 style={{ fontSize: "18px", fontWeight: "600", margin: 0 }}>
                  Mood History ({studentMoodLogs.length} entries)
                </h4>
              </div>
              
              {studentMoodLogs.length > 0 ? (
                <div style={{ overflowX: "auto" }}>
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Date & Time</th>
                        <th>Feeling Description</th>
                        <th>Category</th>
                        <th>Sub Category</th>
                        <th>Impact</th>
                        <th>Joyfulness</th>
                        <th>Emotion</th>
                        <th>Zone</th>
                      </tr>
                    </thead>
                    <tbody>
                      {studentMoodLogs.map((log) => (
                        <tr key={log.id}>
                          <td>
                            <div style={{ fontWeight: "600", color: "#222" }}>
                              {log.date}
                            </div>
                            <div style={{ fontSize: "13px", color: "#999" }}>
                              {log.time.substring(0, 5)}
                            </div>
                          </td>
                          <td>
                            <div style={{ 
                              maxWidth: "250px", 
                              overflow: "hidden", 
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap"
                            }}>
                              {log.feelingDescription || "—"}
                            </div>
                          </td>
                          <td>
                            <div style={{ fontSize: "14px", fontWeight: "600" }}>
                              {log.category?.name || "—"}
                            </div>
                          </td>
                          <td>
                            <div style={{ fontSize: "14px" }}>
                              {log.subCategory?.name || log.addNote || "—"}
                            </div>
                          </td>
                          <td>
                            <div style={{
                              display: "inline-block",
                              padding: "4px 10px",
                              background: "#f0f9ff",
                              borderRadius: "6px",
                              fontWeight: "600",
                              fontSize: "13px",
                              color: "#0369a1"
                            }}>
                              {log.impact}/7
                            </div>
                          </td>
                          <td>
                            <div style={{
                              display: "inline-block",
                              padding: "4px 10px",
                              background: "#fef3c7",
                              borderRadius: "6px",
                              fontWeight: "600",
                              fontSize: "13px",
                              color: "#92400e"
                            }}>
                              {log.joyfulness}/7
                            </div>
                          </td>
                          <td>
                            <div style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "6px"
                            }}>
                              <div style={{
                                width: "16px",
                                height: "16px",
                                borderRadius: "50%",
                                backgroundColor: getEmotionColor(log.calculatedEmotion),
                                border: "1px solid #fff",
                                boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
                              }} />
                              <span style={{ fontSize: "13px", fontWeight: "600" }}>
                                {log.calculatedEmotion || "—"}
                              </span>
                            </div>
                          </td>
                          <td>
                            <div style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "6px"
                            }}>
                              <div style={{
                                width: "16px",
                                height: "16px",
                                borderRadius: "50%",
                                backgroundColor: getZoneColor(log.calculatedZone),
                                border: "1px solid #fff",
                                boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
                              }} />
                              <span style={{ fontSize: "13px", fontWeight: "600" }}>
                                {log.calculatedZone || "—"}
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div style={{ padding: "40px", textAlign: "center", color: "#999" }}>
                  <div style={{ fontSize: "48px", marginBottom: "12px" }}>📊</div>
                  <div style={{ fontSize: "16px", fontWeight: "600", marginBottom: "4px" }}>
                    No mood logs yet
                  </div>
                  <div style={{ fontSize: "14px" }}>
                    This student hasn't logged any moods yet
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;
