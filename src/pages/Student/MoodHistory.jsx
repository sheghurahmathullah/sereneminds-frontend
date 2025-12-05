import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiFilter, FiEye, FiPlus, FiEdit } from "react-icons/fi";
import axios from "axios";
import API_BASE_URL from "../../config/api";
import "./Student.css";

const MoodHistory = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedMood, setSelectedMood] = useState(null);
  const [editingMood, setEditingMood] = useState(null);
  const [editForm, setEditForm] = useState(null);
  const [moodHistory, setMoodHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [filters, setFilters] = useState({
    dateFrom: "",
    dateTo: "",
    category: "",
    impactMin: "",
    impactMax: "",
    joyfulnessMin: "",
    joyfulnessMax: "",
  });

  // Update current time every minute for countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  // Check if mood log can be edited (within 24 hours)
  const canEdit = (moodLog) => {
    if (!moodLog.createdAt) return false;

    const createdAt = new Date(moodLog.createdAt);
    const now = new Date();
    const hoursSinceCreation = (now - createdAt) / (1000 * 60 * 60);

    return hoursSinceCreation < 24;
  };

  // Get remaining edit time
  const getRemainingEditTime = (moodLog) => {
    if (!moodLog.createdAt) return null;

    const createdAt = new Date(moodLog.createdAt);
    const now = new Date();
    const hoursRemaining = 24 - (now - createdAt) / (1000 * 60 * 60);

    if (hoursRemaining <= 0) return "Edit time expired";

    const hours = Math.floor(hoursRemaining);
    const minutes = Math.floor((hoursRemaining - hours) * 60);

    if (hours > 0) {
      return `${hours}h ${minutes}m left to edit`;
    } else {
      return `${minutes}m left to edit`;
    }
  };

  // Helper function to get emotion color
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

  // Helper function to get zone color
  const getZoneColor = (zone) => {
    const zoneColors = {
      Green: "#10b981",
      Yellow: "#f59e0b",
      Brown: "#8b4513",
      "Light Red": "#ff6b6b",
      "Dark Red": "#dc2626",
      Blue: "#3b82f6",
    };
    return zoneColors[zone] || "#6b7280";
  };

  // Helper function to get emoji for emotion
  const getEmotionIcon = (emotion) => {
    const emotionIcons = {
      Sad: "😢",
      Calm: "😌",
      Angry: "😠",
      Joy: "😊",
      Complacent: "😐",
      Neutral: "😐",
      Happy: "😊",
      Anxious: "😰",
      Stressed: "😰",
      Excited: "🤩",
    };
    return emotionIcons[emotion] || "😐";
  };

  // Fetch mood logs from API
  useEffect(() => {
    const fetchMoodLogs = async () => {
      try {
        setLoading(true);
        setError(null);

        // TODO: Replace studentId=1 with actual logged-in student ID from auth context
        const response = await axios.get(`${API_BASE_URL}/student-mood-logs`, {
          params: {
            studentId: 1,
            status: true,
          },
        });

        if (response.data) {
          // Transform API data to match the component's expected format
          const transformedData = response.data.map((log) => ({
            id: log.id,
            date: log.date,
            time: log.time.substring(0, 5), // Extract HH:MM from HH:MM:SS
            category: log.calculatedEmotion || "N/A",
            subcategory: log.subCategory?.name || log.addNote || "N/A",
            icon: getEmotionIcon(log.calculatedEmotion),
            color: getEmotionColor(log.calculatedEmotion),
            impact: log.impact,
            joyfulness: log.joyfulness,
            zone: log.calculatedZone || "N/A",
            zoneColor: getZoneColor(log.calculatedZone),
            note: log.addNote || "",
            feelingDescription: log.feelingDescription || "",
            categoryName: log.category?.name || "",
            createdAt: log.createdAt, // Include creation timestamp
          }));

          setMoodHistory(transformedData);
        }
      } catch (err) {
        console.error("Error fetching mood logs:", err);
        setError("Failed to load mood history. Please try again.");
        // Fallback to empty array
        setMoodHistory([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMoodLogs();
  }, []);

  // Static mood history data (fallback - now replaced by API data)
  const staticMoodHistory = [
    {
      id: 1,
      date: "2024-01-15",
      time: "14:30",
      category: "Happy",
      subcategory: "Joyful",
      icon: "😊",
      color: "#2ecc71",
      impact: 6,
      joyfulness: 7,
      zone: "Green Zone",
      zoneColor: "#2ecc71",
      note: "Had a great day at school! Aced my math test and spent time with friends.",
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    },
    {
      id: 2,
      date: "2024-01-15",
      time: "09:15",
      category: "Anxious",
      subcategory: "Nervous",
      icon: "😰",
      color: "#f39c12",
      impact: 5,
      joyfulness: 3,
      zone: "Yellow Zone",
      zoneColor: "#f39c12",
      note: "Feeling nervous about the upcoming presentation in class.",
      createdAt: new Date(Date.now() - 30 * 60 * 60 * 1000).toISOString(), // 30 hours ago (expired)
    },
    {
      id: 3,
      date: "2024-01-14",
      time: "18:45",
      category: "Calm",
      subcategory: "Relaxed",
      icon: "😌",
      color: "#1abc9c",
      impact: 5,
      joyfulness: 6,
      zone: "Green Zone",
      zoneColor: "#2ecc71",
      note: "Evening meditation session was very peaceful.",
      createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
    },
    {
      id: 4,
      date: "2024-01-14",
      time: "12:20",
      category: "Sad",
      subcategory: "Disappointed",
      icon: "😢",
      color: "#3498db",
      impact: 4,
      joyfulness: 2,
      zone: "Orange Zone",
      zoneColor: "#e67e22",
      note: "Didn't make it to the soccer team. Feeling let down.",
      createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(), // 48 hours ago (expired)
    },
    {
      id: 5,
      date: "2024-01-13",
      time: "16:00",
      category: "Excited",
      subcategory: "Enthusiastic",
      icon: "🤩",
      color: "#9b59b6",
      impact: 7,
      joyfulness: 7,
      zone: "Green Zone",
      zoneColor: "#2ecc71",
      note: "Got accepted into the school drama club! Can't wait to start rehearsals.",
      createdAt: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString(), // 20 hours ago
    },
    {
      id: 6,
      date: "2024-01-13",
      time: "10:30",
      category: "Angry",
      subcategory: "Frustrated",
      icon: "😠",
      color: "#e74c3c",
      impact: 6,
      joyfulness: 2,
      zone: "Yellow Zone",
      zoneColor: "#f39c12",
      note: "Got into an argument with my friend over something silly.",
      createdAt: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(), // 72 hours ago (expired)
    },
    {
      id: 7,
      date: "2024-01-12",
      time: "20:15",
      category: "Happy",
      subcategory: "Content",
      icon: "😊",
      color: "#2ecc71",
      impact: 5,
      joyfulness: 6,
      zone: "Green Zone",
      zoneColor: "#2ecc71",
      note: "Family movie night was fun. Feeling grateful for quality time together.",
      createdAt: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(), // 10 hours ago
    },
    {
      id: 8,
      date: "2024-01-12",
      time: "14:00",
      category: "Anxious",
      subcategory: "Stressed",
      icon: "😰",
      color: "#f39c12",
      impact: 6,
      joyfulness: 3,
      zone: "Yellow Zone",
      zoneColor: "#f39c12",
      note: "Lots of homework to catch up on. Feeling overwhelmed.",
      createdAt: new Date(Date.now() - 96 * 60 * 60 * 1000).toISOString(), // 96 hours ago (expired)
    },
  ];

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const clearFilters = () => {
    setFilters({
      dateFrom: "",
      dateTo: "",
      category: "",
      impactMin: "",
      impactMax: "",
      joyfulnessMin: "",
      joyfulnessMax: "",
    });
  };

  const filteredHistory = moodHistory.filter((mood) => {
    if (filters.dateFrom && mood.date < filters.dateFrom) return false;
    if (filters.dateTo && mood.date > filters.dateTo) return false;
    if (filters.category && mood.category !== filters.category) return false;
    if (filters.impactMin && mood.impact < parseInt(filters.impactMin))
      return false;
    if (filters.impactMax && mood.impact > parseInt(filters.impactMax))
      return false;
    if (
      filters.joyfulnessMin &&
      mood.joyfulness < parseInt(filters.joyfulnessMin)
    )
      return false;
    if (
      filters.joyfulnessMax &&
      mood.joyfulness > parseInt(filters.joyfulnessMax)
    )
      return false;
    return true;
  });

  // Loading state
  if (loading) {
    return (
      <div className="student-container">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "400px",
            fontSize: "18px",
            color: "#666",
          }}
        >
          Loading mood history...
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="student-container">
        <div
          style={{
            background: "#fff",
            borderRadius: "14px",
            padding: "32px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
            textAlign: "center",
          }}
        >
          <div
            style={{ color: "#ef4444", fontSize: "18px", marginBottom: "16px" }}
          >
            {error}
          </div>
          <button
            className="btn btn-primary"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="student-container">
      {/* Header */}
      <div
        style={{
          background: "#fff",
          borderRadius: "14px",
          padding: "24px 28px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
          marginBottom: "24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <div>
          <h2 style={{ fontSize: "24px", fontWeight: "700", margin: 0 }}>
            Mood History
          </h2>
          <p style={{ color: "#888", marginTop: "6px", fontSize: "14px" }}>
            Track your emotional journey over time
          </p>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <button
            className="btn btn-secondary"
            onClick={() => setShowFilters(!showFilters)}
            style={{ display: "flex", alignItems: "center", gap: "8px" }}
          >
            <FiFilter /> Filters
          </button>
          <Link
            to="/student/log-mood"
            className="btn btn-primary"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              textDecoration: "none",
            }}
          >
            <FiPlus /> Log New Mood
          </Link>
        </div>
      </div>

      {/* Filter Section */}
      {showFilters && (
        <div className="filter-section">
          <div
            style={{
              fontSize: "16px",
              fontWeight: "600",
              marginBottom: "16px",
              color: "#444",
            }}
          >
            Filter Mood Logs
          </div>
          <div className="filter-row">
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">From Date</label>
              <input
                type="date"
                className="form-input"
                value={filters.dateFrom}
                onChange={(e) => handleFilterChange("dateFrom", e.target.value)}
              />
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">To Date</label>
              <input
                type="date"
                className="form-input"
                value={filters.dateTo}
                onChange={(e) => handleFilterChange("dateTo", e.target.value)}
              />
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Category</label>
              <select
                className="form-select"
                value={filters.category}
                onChange={(e) => handleFilterChange("category", e.target.value)}
              >
                <option value="">All Categories</option>
                <option value="Happy">Happy</option>
                <option value="Sad">Sad</option>
                <option value="Angry">Angry</option>
                <option value="Anxious">Anxious</option>
                <option value="Surprised">Surprised</option>
                <option value="Calm">Calm</option>
              </select>
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Impact (Min-Max)</label>
              <div style={{ display: "flex", gap: "8px" }}>
                <input
                  type="number"
                  min="1"
                  max="7"
                  className="form-input"
                  placeholder="Min"
                  value={filters.impactMin}
                  onChange={(e) =>
                    handleFilterChange("impactMin", e.target.value)
                  }
                />
                <input
                  type="number"
                  min="1"
                  max="7"
                  className="form-input"
                  placeholder="Max"
                  value={filters.impactMax}
                  onChange={(e) =>
                    handleFilterChange("impactMax", e.target.value)
                  }
                />
              </div>
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Joyfulness (Min-Max)</label>
              <div style={{ display: "flex", gap: "8px" }}>
                <input
                  type="number"
                  min="1"
                  max="7"
                  className="form-input"
                  placeholder="Min"
                  value={filters.joyfulnessMin}
                  onChange={(e) =>
                    handleFilterChange("joyfulnessMin", e.target.value)
                  }
                />
                <input
                  type="number"
                  min="1"
                  max="7"
                  className="form-input"
                  placeholder="Max"
                  value={filters.joyfulnessMax}
                  onChange={(e) =>
                    handleFilterChange("joyfulnessMax", e.target.value)
                  }
                />
              </div>
            </div>
          </div>
          <div className="filter-actions">
            <button className="btn btn-primary">Apply Filters</button>
            <button className="btn btn-secondary" onClick={clearFilters}>
              Clear All
            </button>
          </div>
        </div>
      )}

      {/* Mood History Table */}
      <div
        style={{
          background: "#fff",
          borderRadius: "14px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
          overflow: "hidden",
        }}
      >
        <table className="data-table">
          <thead>
            <tr>
              <th>Date & Time</th>
              <th>Emotion</th>
              <th>Impact</th>
              <th>Joyfulness</th>
              <th>Zone</th>
              <th style={{ width: "150px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredHistory.length > 0 ? (
              filteredHistory.map((mood) => (
                <tr key={mood.id}>
                  <td>
                    <div style={{ fontWeight: "600", color: "#222" }}>
                      {mood.date}
                    </div>
                    <div style={{ fontSize: "13px", color: "#999" }}>
                      {mood.time}
                    </div>
                  </td>
                  <td>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <span style={{ fontSize: "24px" }}>{mood.icon}</span>
                      <div>
                        <div
                          style={{
                            fontWeight: "600",
                            color: mood.color,
                            fontSize: "15px",
                          }}
                        >
                          {mood.category}
                        </div>
                        <div style={{ fontSize: "13px", color: "#888" }}>
                          {mood.subcategory}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div
                      style={{
                        display: "inline-block",
                        padding: "6px 14px",
                        background: "#f9f9f9",
                        borderRadius: "8px",
                        fontWeight: "600",
                        fontSize: "14px",
                      }}
                    >
                      {mood.impact}/7
                    </div>
                  </td>
                  <td>
                    <div
                      style={{
                        display: "inline-block",
                        padding: "6px 14px",
                        background: "#f9f9f9",
                        borderRadius: "8px",
                        fontWeight: "600",
                        fontSize: "14px",
                      }}
                    >
                      {mood.joyfulness}/7
                    </div>
                  </td>
                  <td>
                    <div
                      style={{
                        display: "inline-block",
                        padding: "6px 14px",
                        background: `${mood.zoneColor}15`,
                        borderRadius: "20px",
                        fontWeight: "600",
                        fontSize: "13px",
                        color: mood.zoneColor,
                      }}
                    >
                      {mood.zone}
                    </div>
                  </td>
                  <td>
                    <div
                      style={{
                        display: "flex",
                        gap: "16px",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        paddingLeft: "12px",
                      }}
                    >
                      {/* Overview Icon */}
                      <button
                        onClick={() => setSelectedMood(mood)}
                        style={{
                          background: "none",
                          border: "none",
                          color: "#00c7b7",
                          cursor: "pointer",
                          fontSize: "18px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: "8px",
                          borderRadius: "6px",
                          transition: "all 0.2s",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "#e0f7f5";
                          e.currentTarget.style.transform = "scale(1.1)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "none";
                          e.currentTarget.style.transform = "scale(1)";
                        }}
                        title="Overview Mood"
                      >
                        <FiEye />
                      </button>

                      {/* Edit Icon with Timer */}
                      <div
                        style={{
                          position: "relative",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        {canEdit(mood) ? (
                          <>
                            <button
                              onClick={() => {
                                setEditingMood(mood);
                                setEditForm({
                                  date: mood.date,
                                  time: mood.time,
                                  category: mood.category,
                                  subcategory: mood.subcategory,
                                  impact: mood.impact,
                                  joyfulness: mood.joyfulness,
                                  note: mood.note || "",
                                });
                              }}
                              style={{
                                background: "none",
                                border: "none",
                                color: "#f39c12",
                                cursor: "pointer",
                                fontSize: "18px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                padding: "8px",
                                borderRadius: "6px",
                                transition: "all 0.2s",
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = "#fff8e1";
                                e.currentTarget.style.transform = "scale(1.1)";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background = "none";
                                e.currentTarget.style.transform = "scale(1)";
                              }}
                              title={`Edit - ${getRemainingEditTime(mood)}`}
                            >
                              <FiEdit />
                            </button>
                            {mood.createdAt && (
                              <div
                                style={{
                                  fontSize: "10px",
                                  color: "#f39c12",
                                  fontWeight: "700",
                                  marginTop: "2px",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {(() => {
                                  const createdAt = new Date(mood.createdAt);
                                  const hoursRemaining =
                                    24 -
                                    (currentTime - createdAt) /
                                      (1000 * 60 * 60);
                                  const hours = Math.floor(hoursRemaining);
                                  const minutes = Math.floor(
                                    (hoursRemaining - hours) * 60
                                  );
                                  return hours > 0
                                    ? `${hours}h ${minutes}m`
                                    : `${minutes}m`;
                                })()}
                              </div>
                            )}
                          </>
                        ) : (
                          <>
                            <button
                              disabled
                              style={{
                                background: "none",
                                border: "none",
                                color: "#d0d0d0",
                                cursor: "not-allowed",
                                fontSize: "18px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                padding: "8px",
                                borderRadius: "6px",
                              }}
                              title="Edit time expired (24 hours)"
                            >
                              <FiEdit />
                            </button>
                            <div
                              style={{
                                fontSize: "10px",
                                color: "#999",
                                fontWeight: "600",
                                marginTop: "2px",
                              }}
                            >
                              🔒
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">
                  <div className="empty-state">
                    <div className="empty-state-icon">😊</div>
                    <div className="empty-state-title">No mood logs found</div>
                    <div className="empty-state-message">
                      Try adjusting your filters or log your first mood
                    </div>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Overview Mood Modal */}
      {selectedMood && (
        <div className="modal-overlay" onClick={() => setSelectedMood(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Overview Mood</h3>
              <button
                className="modal-close"
                onClick={() => setSelectedMood(null)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              {/* Details Grid */}
              <div style={{ display: "grid", gap: "20px" }}>
                {/* Date */}
                <div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#888",
                      marginBottom: "6px",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      fontWeight: "600",
                    }}
                  >
                    Date (Logged Date)
                  </div>
                  <div
                    style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#222",
                    }}
                  >
                    {selectedMood.date}
                  </div>
                </div>

                {/* Time */}
                <div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#888",
                      marginBottom: "6px",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      fontWeight: "600",
                    }}
                  >
                    Time (Logged Time)
                  </div>
                  <div
                    style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#222",
                    }}
                  >
                    {selectedMood.time}
                  </div>
                </div>

                {/* Current Mood */}
                <div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#888",
                      marginBottom: "8px",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      fontWeight: "600",
                    }}
                  >
                    Current Mood (Logged Mood)
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    <div
                      style={{
                        width: "28px",
                        height: "28px",
                        borderRadius: "50%",
                        backgroundColor: selectedMood.color,
                        border: "2px solid #fff",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                      }}
                    />
                    <span
                      style={{
                        fontSize: "16px",
                        fontWeight: "600",
                        color: selectedMood.color,
                      }}
                    >
                      {selectedMood.category}
                    </span>
                  </div>
                </div>

                {/* Category */}
                <div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#888",
                      marginBottom: "6px",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      fontWeight: "600",
                    }}
                  >
                    Category
                  </div>
                  <div
                    style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#222",
                    }}
                  >
                    {selectedMood.category}
                  </div>
                </div>

                {/* Sub Category */}
                <div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#888",
                      marginBottom: "6px",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      fontWeight: "600",
                    }}
                  >
                    Sub Category
                  </div>
                  <div
                    style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#222",
                    }}
                  >
                    {selectedMood.subcategory}
                  </div>
                </div>

                {/* Impact & Joyfulness */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "16px",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: "12px",
                        color: "#888",
                        marginBottom: "6px",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                        fontWeight: "600",
                      }}
                    >
                      Impact
                    </div>
                    <div
                      style={{
                        fontSize: "24px",
                        fontWeight: "700",
                        color: "#00c7b7",
                      }}
                    >
                      {selectedMood.impact}/7
                    </div>
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "12px",
                        color: "#888",
                        marginBottom: "6px",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                        fontWeight: "600",
                      }}
                    >
                      Joyfulness
                    </div>
                    <div
                      style={{
                        fontSize: "24px",
                        fontWeight: "700",
                        color: "#00c7b7",
                      }}
                    >
                      {selectedMood.joyfulness}/7
                    </div>
                  </div>
                </div>

                {/* Calculated Emotion & Zone */}
                <div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#888",
                      marginBottom: "10px",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      fontWeight: "600",
                    }}
                  >
                    Calculated Emotion & Zone
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                      flexWrap: "wrap",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <div
                        style={{
                          width: "28px",
                          height: "28px",
                          borderRadius: "50%",
                          backgroundColor: selectedMood.color,
                          border: "2px solid #fff",
                          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                        }}
                      />
                      <span
                        style={{
                          fontWeight: "600",
                          fontSize: "16px",
                          color: "#222",
                        }}
                      >
                        {selectedMood.category}
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <div
                        style={{
                          width: "28px",
                          height: "28px",
                          borderRadius: "50%",
                          backgroundColor: selectedMood.zoneColor,
                          border: "2px solid #fff",
                          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                        }}
                      />
                      <span
                        style={{
                          fontWeight: "600",
                          fontSize: "16px",
                          color: "#222",
                        }}
                      >
                        {selectedMood.zone}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Note */}
                {selectedMood.note && (
                  <div>
                    <div
                      style={{
                        fontSize: "12px",
                        color: "#888",
                        marginBottom: "6px",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                        fontWeight: "600",
                      }}
                    >
                      Note (Added Note)
                    </div>
                    <div
                      style={{
                        fontSize: "15px",
                        color: "#444",
                        lineHeight: "1.6",
                        padding: "16px",
                        background: "#f9f9f9",
                        borderRadius: "10px",
                      }}
                    >
                      {selectedMood.note}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="modal-actions">
              <button
                className="btn btn-secondary"
                onClick={() => setSelectedMood(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Mood Modal */}
      {editingMood && editForm && (
        <div
          className="modal-overlay"
          onClick={() => {
            setEditingMood(null);
            setEditForm(null);
          }}
        >
          <div
            className="modal"
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: "600px",
              maxHeight: "90vh",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            <div
              className="modal-header"
              style={{ position: "relative", zIndex: 10, flexShrink: 0 }}
            >
              <h3 className="modal-title">Edit Mood Log</h3>
              <button
                className="modal-close"
                onClick={() => {
                  setEditingMood(null);
                  setEditForm(null);
                }}
              >
                ×
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Mood updated successfully!");
                setEditingMood(null);
                setEditForm(null);
              }}
              style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                overflow: "hidden",
              }}
            >
              <div
                className="modal-body"
                style={{
                  padding: "24px",
                  overflowY: "auto",
                  flex: 1,
                  position: "relative",
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "16px",
                    marginBottom: "20px",
                  }}
                >
                  <div style={{ marginBottom: 0 }}>
                    <label className="form-label">Date *</label>
                    <input
                      type="date"
                      className="form-input"
                      value={editForm.date}
                      onChange={(e) =>
                        setEditForm({ ...editForm, date: e.target.value })
                      }
                      required
                      style={{ border: "1px solid #e0e0e0" }}
                    />
                  </div>
                  <div style={{ marginBottom: 0 }}>
                    <label className="form-label">Time *</label>
                    <input
                      type="time"
                      className="form-input"
                      value={editForm.time}
                      onChange={(e) =>
                        setEditForm({ ...editForm, time: e.target.value })
                      }
                      required
                      style={{ border: "1px solid #e0e0e0" }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: "20px" }}>
                  <label className="form-label">Category *</label>
                  <select
                    className="form-select"
                    value={editForm.category}
                    onChange={(e) =>
                      setEditForm({ ...editForm, category: e.target.value })
                    }
                    required
                    style={{ border: "1px solid #e0e0e0" }}
                  >
                    <option value="">Select Category</option>
                    <option value="Happy">Happy</option>
                    <option value="Sad">Sad</option>
                    <option value="Angry">Angry</option>
                    <option value="Anxious">Anxious</option>
                    <option value="Surprised">Surprised</option>
                    <option value="Calm">Calm</option>
                  </select>
                </div>

                <div style={{ marginBottom: "20px" }}>
                  <label className="form-label">Subcategory *</label>
                  <input
                    type="text"
                    className="form-input"
                    value={editForm.subcategory}
                    onChange={(e) =>
                      setEditForm({ ...editForm, subcategory: e.target.value })
                    }
                    required
                    style={{ border: "1px solid #e0e0e0" }}
                  />
                </div>

                <div
                  style={{
                    marginBottom: "20px",
                    paddingBottom: 0,
                    borderBottom: "none",
                    position: "relative",
                    overflow: "visible",
                  }}
                >
                  <div className="slider-label">
                    <label className="form-label">Impact Level (1-7) *</label>
                    <span className="slider-value">{editForm.impact}</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="7"
                    value={editForm.impact}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        impact: parseInt(e.target.value),
                      })
                    }
                    className="slider"
                    style={{ position: "relative", zIndex: 1 }}
                  />
                </div>

                <div
                  style={{
                    marginBottom: "20px",
                    paddingBottom: 0,
                    borderBottom: "none",
                    position: "relative",
                    overflow: "visible",
                  }}
                >
                  <div className="slider-label">
                    <label className="form-label">
                      Joyfulness Level (1-7) *
                    </label>
                    <span className="slider-value">{editForm.joyfulness}</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="7"
                    value={editForm.joyfulness}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        joyfulness: parseInt(e.target.value),
                      })
                    }
                    className="slider"
                    style={{ position: "relative", zIndex: 1 }}
                  />
                </div>

                <div style={{ marginBottom: 0 }}>
                  <label className="form-label">Note</label>
                  <textarea
                    className="form-textarea"
                    value={editForm.note}
                    onChange={(e) =>
                      setEditForm({ ...editForm, note: e.target.value })
                    }
                    placeholder="Add any additional notes..."
                    style={{ border: "1px solid #e0e0e0" }}
                  />
                </div>
              </div>
              <div
                className="modal-actions"
                style={{ flexShrink: 0, position: "relative", zIndex: 10 }}
              >
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setEditingMood(null);
                    setEditForm(null);
                  }}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MoodHistory;
