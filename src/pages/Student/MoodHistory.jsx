import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiFilter, FiEye, FiPlus } from "react-icons/fi";
import "./Student.css";

const MoodHistory = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedMood, setSelectedMood] = useState(null);
  const [filters, setFilters] = useState({
    dateFrom: "",
    dateTo: "",
    category: "",
    impactMin: "",
    impactMax: "",
    joyfulnessMin: "",
    joyfulnessMax: "",
  });

  // Static mood history data
  const moodHistory = [
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
              <th>Actions</th>
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
                    <button
                      onClick={() => setSelectedMood(mood)}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#00c7b7",
                        cursor: "pointer",
                        fontSize: "14px",
                        fontWeight: "600",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "6px 12px",
                        borderRadius: "8px",
                        transition: "background 0.2s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background = "#f9f9f9")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = "none")
                      }
                    >
                      <FiEye /> View
                    </button>
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

      {/* Overview Modal */}
      {selectedMood && (
        <div className="modal-overlay" onClick={() => setSelectedMood(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Mood Details</h3>
              <button
                className="modal-close"
                onClick={() => setSelectedMood(null)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              {/* Emotion Header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  padding: "20px",
                  background: `${selectedMood.color}15`,
                  borderRadius: "12px",
                  marginBottom: "24px",
                  border: `2px solid ${selectedMood.color}`,
                }}
              >
                <div style={{ fontSize: "48px" }}>{selectedMood.icon}</div>
                <div>
                  <div
                    style={{
                      fontSize: "24px",
                      fontWeight: "700",
                      color: selectedMood.color,
                      marginBottom: "4px",
                    }}
                  >
                    {selectedMood.category}
                  </div>
                  <div style={{ fontSize: "16px", color: "#666" }}>
                    {selectedMood.subcategory}
                  </div>
                </div>
              </div>

              {/* Details Grid */}
              <div style={{ display: "grid", gap: "20px" }}>
                <div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#888",
                      marginBottom: "6px",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Date & Time
                  </div>
                  <div style={{ fontSize: "16px", fontWeight: "600" }}>
                    {selectedMood.date} at {selectedMood.time}
                  </div>
                </div>

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
                      }}
                    >
                      Impact Level
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
                      }}
                    >
                      Joyfulness Level
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

                <div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#888",
                      marginBottom: "6px",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Calculated Zone
                  </div>
                  <div
                    style={{
                      display: "inline-block",
                      padding: "8px 18px",
                      background: `${selectedMood.zoneColor}15`,
                      borderRadius: "20px",
                      fontWeight: "700",
                      fontSize: "16px",
                      color: selectedMood.zoneColor,
                      border: `2px solid ${selectedMood.zoneColor}`,
                    }}
                  >
                    {selectedMood.zone}
                  </div>
                </div>

                {selectedMood.note && (
                  <div>
                    <div
                      style={{
                        fontSize: "12px",
                        color: "#888",
                        marginBottom: "6px",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                      }}
                    >
                      Your Note
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
    </div>
  );
};

export default MoodHistory;


