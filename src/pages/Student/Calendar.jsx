import React, { useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight, FiSearch } from "react-icons/fi";
import axios from "axios";
import API_BASE_URL from "../../config/api";
import "./Student.css";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedMoodLog, setSelectedMoodLog] = useState(null);
  const [moodLogs, setMoodLogs] = useState([]);
  const [moodData, setMoodData] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

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
      Green: "#10b981",
      Yellow: "#f59e0b",
      Brown: "#8b4513",
      "Light Red": "#ff6b6b",
      "Dark Red": "#dc2626",
      Blue: "#3b82f6",
    };
    return zoneColors[zone] || "#6b7280";
  };

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
        // TODO: Replace studentId=1 with actual logged-in student ID from auth context
        const response = await axios.get(`${API_BASE_URL}/student-mood-logs`, {
          params: {
            studentId: 1,
            status: true,
          },
        });

        if (response.data) {
          setMoodLogs(response.data);
          // Transform API data to calendar format (group by date)
          const dataByDate = {};
          response.data.forEach((log) => {
            const dateKey = log.date; // YYYY-MM-DD format
            if (!dataByDate[dateKey]) {
              dataByDate[dateKey] = {
                zone: log.calculatedZone || "N/A",
                color: getZoneColor(log.calculatedZone),
                moods: [],
              };
            }
            dataByDate[dateKey].moods.push({
              id: log.id,
              time: log.time.substring(0, 5), // HH:MM
              emotion: log.calculatedEmotion || "N/A",
              icon: getEmotionIcon(log.calculatedEmotion),
              category: log.category?.name || "N/A",
              subcategory: log.subCategory?.name || log.addNote || "N/A",
              impact: log.impact,
              joyfulness: log.joyfulness,
              note: log.addNote || "",
              feelingDescription: log.feelingDescription || "",
              fullData: log,
            });
          });
          setMoodData(dataByDate);
        }
      } catch (err) {
        console.error("Error fetching mood logs:", err);
        setMoodData({});
      } finally {
        setLoading(false);
      }
    };

    fetchMoodLogs();
  }, []);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  const formatDate = (year, month, day) => {
    const m = String(month + 1).padStart(2, "0");
    const d = String(day).padStart(2, "0");
    return `${year}-${m}-${d}`;
  };

  const previousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
    setSelectedDay(null);
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
    setSelectedDay(null);
  };

  const handleDayClick = (day) => {
    if (!day) return;
    const dateStr = formatDate(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    if (moodData[dateStr]) {
      setSelectedDay({ day, dateStr, data: moodData[dateStr] });
      setSelectedMoodLog(null); // Reset individual mood selection
    }
  };

  const handleMoodLogClick = (moodLog) => {
    setSelectedMoodLog(moodLog);
  };

  const handleDatePickerChange = (e) => {
    const selectedDateValue = e.target.value;
    setSelectedDate(selectedDateValue);
    
    if (selectedDateValue && moodData[selectedDateValue]) {
      // Parse the date to set currentDate to that month
      const [year, month, day] = selectedDateValue.split('-').map(Number);
      setCurrentDate(new Date(year, month - 1, 1));
      setSelectedDay({ 
        day: day, 
        dateStr: selectedDateValue, 
        data: moodData[selectedDateValue] 
      });
    }
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    
    // Filter mood logs based on search query
    const filtered = moodLogs.filter((log) => {
      const searchLower = searchQuery.toLowerCase();
      return (
        log.feelingDescription?.toLowerCase().includes(searchLower) ||
        log.calculatedEmotion?.toLowerCase().includes(searchLower) ||
        log.category?.name?.toLowerCase().includes(searchLower) ||
        log.subCategory?.name?.toLowerCase().includes(searchLower) ||
        log.addNote?.toLowerCase().includes(searchLower)
      );
    });

    if (filtered.length > 0) {
      // Show first result in calendar
      const firstResult = filtered[0];
      const [year, month, day] = firstResult.date.split('-').map(Number);
      setCurrentDate(new Date(year, month - 1, 1));
      setSelectedDay({
        day: day,
        dateStr: firstResult.date,
        data: moodData[firstResult.date]
      });
    } else {
      alert("No mood logs found matching your search.");
    }
  };

  const isToday = (day) => {
    if (!day) return false;
    const today = new Date();
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  const days = getDaysInMonth(currentDate);

  // Loading state
  if (loading) {
    return (
      <div className="student-container">
        <div style={{ 
          display: "flex", 
          justifyContent: "center", 
          alignItems: "center", 
          minHeight: "400px" 
        }}>
          Loading calendar...
        </div>
      </div>
    );
  }

  // Calculate monthly stats
  const getMonthlyStats = () => {
    const stats = {
      Green: 0,
      Yellow: 0,
      Brown: 0,
      "Light Red": 0,
      "Dark Red": 0,
      Blue: 0
    };
    
    Object.values(moodData).forEach(data => {
      if (stats[data.zone] !== undefined) {
        stats[data.zone]++;
      }
    });
    
    // Find most common zone
    let mostCommonZone = "Green";
    let maxCount = 0;
    Object.entries(stats).forEach(([zone, count]) => {
      if (count > maxCount) {
        maxCount = count;
        mostCommonZone = zone;
      }
    });
    
    return { ...stats, mostCommon: { zone: mostCommonZone, count: maxCount } };
  };

  const monthlyStats = getMonthlyStats();

  // Get wellness tip based on zone
  const getWellnessTip = (zone) => {
    switch(zone) {
      case "Green":
        return {
          title: "Keep the Momentum!",
          text: "You're in a great headspace. Use this energy to tackle your most challenging subjects or help a friend study.",
          icon: "🌟",
          color: "#10b981",
          bg: "#f0fff4",
          border: "#c6f6d5"
        };
      case "Yellow":
        return {
          title: "Pause and Reset",
          text: "Feeling a bit jittery? Try the 4-7-8 breathing technique before your next study session to regain focus.",
          icon: "🧘",
          color: "#f59e0b",
          bg: "#fffaf0",
          border: "#feebc8"
        };
      case "Brown":
        return {
          title: "Stay Balanced",
          text: "You're in a neutral zone. Take this opportunity to reflect on your feelings and maintain your emotional balance.",
          icon: "⚖️",
          color: "#8b4513",
          bg: "#faf5f0",
          border: "#e8d4bf"
        };
      case "Light Red":
        return {
          title: "Be Gentle with Yourself",
          text: "It's okay to not be okay. Take a short walk, listen to calming music, or talk to a friend. Your mental health comes first.",
          icon: "🧡",
          color: "#ff6b6b",
          bg: "#fff5f5",
          border: "#fed7d7"
        };
      case "Dark Red":
        return {
          title: "Stop and Seek Support",
          text: "High stress can block learning. Please step away from your books and reach out to a counselor or trusted adult.",
          icon: "🛑",
          color: "#dc2626",
          bg: "#fff5f5",
          border: "#feb2b2"
        };
      case "Blue":
        return {
          title: "Embrace the Positive Energy!",
          text: "You're feeling great! This is a perfect time for learning and creative work. Keep up the positive momentum!",
          icon: "💙",
          color: "#3b82f6",
          bg: "#eff6ff",
          border: "#bfdbfe"
        };
      default:
        return null;
    }
  };

  // Mock study impact data
  const getStudyImpact = (zone) => {
    switch(zone) {
      case "Green": return { level: 90, label: "High Focus", color: "#10b981" };
      case "Yellow": return { level: 60, label: "Moderate Focus", color: "#f59e0b" };
      case "Brown": return { level: 50, label: "Neutral Focus", color: "#8b4513" };
      case "Light Red": return { level: 40, label: "Low Focus", color: "#ff6b6b" };
      case "Dark Red": return { level: 20, label: "Distracted", color: "#dc2626" };
      case "Blue": return { level: 85, label: "Excellent Focus", color: "#3b82f6" };
      default: return { level: 0, label: "Unknown", color: "#ccc" };
    }
  };

  return (
    <div className="student-container">
      {/* Header */}
      <div
        style={{
          background: "#fff",
          borderRadius: "24px",
          padding: "32px",
          boxShadow: "0 10px 40px rgba(0,0,0,0.04)",
          marginBottom: "24px",
          border: "1px solid rgba(0,0,0,0.02)"
        }}
      >
        <h2 style={{ fontSize: "28px", fontWeight: "800", margin: "0 0 8px 0", letterSpacing: "-0.5px", color: "#1a202c" }}>
          Mood Calendar
        </h2>
        <p style={{ color: "#718096", margin: 0, fontSize: "16px" }}>
          View your mood patterns across the month
        </p>
      </div>

      {/* Search and Date Picker Section */}
      <div style={{ 
        background: "#fff", 
        borderRadius: "14px", 
        padding: "20px", 
        marginBottom: "24px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.03)"
      }}>
        <div style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: "250px" }}>
            <div style={{ position: "relative" }}>
              <input
                type="text"
                placeholder="Search by mood, category, subcategory, or notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                style={{
                  width: "100%",
                  padding: "10px 40px 10px 16px",
                  border: "1px solid #e0e0e0",
                  borderRadius: "8px",
                  fontSize: "14px"
                }}
              />
              <button
                onClick={handleSearch}
                style={{
                  position: "absolute",
                  right: "8px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  color: "#00c7b7",
                  cursor: "pointer",
                  padding: "4px 8px",
                  display: "flex",
                  alignItems: "center"
                }}
              >
                <FiSearch size={20} />
              </button>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <label style={{ fontSize: "14px", color: "#666", whiteSpace: "nowrap" }}>
              Jump to date:
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={handleDatePickerChange}
              style={{
                padding: "10px 16px",
                border: "1px solid #e0e0e0",
                borderRadius: "8px",
                fontSize: "14px"
              }}
            />
          </div>
        </div>
      </div>

      {/* Monthly Stats Summary */}
      <div className="stats-summary-container">
        <div className="stat-pill">
          <div className="stat-pill-dot" style={{ background: "#10b981" }} />
          <div className="stat-pill-content">
            <span className="stat-pill-label">Green Days</span>
            <span className="stat-pill-value">{monthlyStats["Green"]}</span>
          </div>
        </div>
        <div className="stat-pill">
          <div className="stat-pill-dot" style={{ background: "#f59e0b" }} />
          <div className="stat-pill-content">
            <span className="stat-pill-label">Yellow Days</span>
            <span className="stat-pill-value">{monthlyStats["Yellow"]}</span>
          </div>
        </div>
        <div className="stat-pill">
          <div className="stat-pill-dot" style={{ background: "#8b4513" }} />
          <div className="stat-pill-content">
            <span className="stat-pill-label">Brown Days</span>
            <span className="stat-pill-value">{monthlyStats["Brown"]}</span>
          </div>
        </div>
        <div className="stat-pill">
          <div className="stat-pill-dot" style={{ background: "#ff6b6b" }} />
          <div className="stat-pill-content">
            <span className="stat-pill-label">Light Red Days</span>
            <span className="stat-pill-value">{monthlyStats["Light Red"]}</span>
          </div>
        </div>
        <div className="stat-pill">
          <div className="stat-pill-dot" style={{ background: "#dc2626" }} />
          <div className="stat-pill-content">
            <span className="stat-pill-label">Dark Red Days</span>
            <span className="stat-pill-value">{monthlyStats["Dark Red"]}</span>
          </div>
        </div>
        <div className="stat-pill">
          <div className="stat-pill-dot" style={{ background: "#3b82f6" }} />
          <div className="stat-pill-content">
            <span className="stat-pill-label">Blue Days</span>
            <span className="stat-pill-value">{monthlyStats["Blue"]}</span>
          </div>
        </div>
      </div>

      {/* Calendar */}
      <div className="calendar-container">
        <div className="calendar-header">
          <div className="calendar-month">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </div>
          <div className="calendar-nav">
            <button onClick={previousMonth}>
              <FiChevronLeft /> Previous
            </button>
            <button onClick={nextMonth}>
              Next <FiChevronRight />
            </button>
          </div>
        </div>

        {/* Day Headers */}
        <div className="calendar-grid">
          {dayNames.map((dayName) => (
            <div key={dayName} className="calendar-day-header">
              {dayName}
            </div>
          ))}

          {/* Calendar Days */}
          {days.map((day, index) => {
            const dateStr = day
              ? formatDate(
                  currentDate.getFullYear(),
                  currentDate.getMonth(),
                  day
                )
              : null;
            const dayMood = dateStr ? moodData[dateStr] : null;

            return (
              <div
                key={index}
                className={`calendar-day ${!day ? "empty" : ""} ${
                  isToday(day) ? "today" : ""
                }`}
                onClick={() => handleDayClick(day)}
              >
                {day && (
                  <>
                    <div className="calendar-day-number">{day}</div>
                    {dayMood && (
                      <>
                        <div
                          className="mood-indicator"
                          style={{ background: dayMood.color }}
                          title={dayMood.zone}
                        />
                        {dayMood.moods.length > 1 && (
                          <div className="mood-count">
                            {dayMood.moods.length} logs
                          </div>
                        )}
                      </>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="calendar-legend">
          <div className="legend-item">
            <div className="legend-dot" style={{ background: "#10b981" }} />
            <span className="legend-text">Green</span>
          </div>
          <div className="legend-item">
            <div className="legend-dot" style={{ background: "#f59e0b" }} />
            <span className="legend-text">Yellow</span>
          </div>
          <div className="legend-item">
            <div className="legend-dot" style={{ background: "#8b4513" }} />
            <span className="legend-text">Brown</span>
          </div>
          <div className="legend-item">
            <div className="legend-dot" style={{ background: "#ff6b6b" }} />
            <span className="legend-text">Light Red</span>
          </div>
          <div className="legend-item">
            <div className="legend-dot" style={{ background: "#dc2626" }} />
            <span className="legend-text">Dark Red</span>
          </div>
          <div className="legend-item">
            <div className="legend-dot" style={{ background: "#3b82f6" }} />
            <span className="legend-text">Blue</span>
          </div>
        </div>
      </div>

      {/* Day Details Modal */}
      {selectedDay && (
        <div className="modal-overlay" onClick={() => setSelectedDay(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h3 className="modal-title">
                  Moods on {selectedDay.dateStr}
                </h3>
                <button
                  className="modal-close"
                  onClick={() => setSelectedDay(null)}
                >
                  ×
                </button>
              </div>
              <div className="mood-zone-badge" style={{ 
                background: `${selectedDay.data.color}15`,
                color: selectedDay.data.color,
                marginTop: "16px"
              }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: selectedDay.data.color }} />
                {selectedDay.data.zone}
              </div>
            </div>
            
            <div className="modal-body">
              <div style={{ display: "grid", gap: "16px" }}>
                {selectedDay.data.moods.map((mood, index) => (
                  <div 
                    key={index} 
                    className="mood-entry-card"
                    onClick={() => handleMoodLogClick(mood)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="mood-entry-icon">{mood.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div className="mood-entry-time">
                        {mood.time}
                      </div>
                      <div className="mood-entry-emotion">
                        {mood.emotion}
                      </div>
                      <div style={{ fontSize: "12px", color: "#666", marginTop: "4px" }}>
                        Click to view details
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Study Impact Section */}
              <div className="study-impact-section">
                <div className="study-impact-title">Academic Impact</div>
                {(() => {
                  const impact = getStudyImpact(selectedDay.data.zone);
                  return (
                    <div>
                      <div className="impact-meter">
                        <div 
                          className="impact-fill" 
                          style={{ width: `${impact.level}%`, background: impact.color }} 
                        />
                      </div>
                      <div className="impact-label">
                        <span>Focus Level</span>
                        <span style={{ color: impact.color, fontWeight: "700" }}>{impact.label}</span>
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Wellness Tip */}
              {(() => {
                const tip = getWellnessTip(selectedDay.data.zone);
                if (tip) {
                  return (
                    <div className="wellness-tip-card" style={{ 
                      background: tip.bg, 
                      borderColor: tip.border 
                    }}>
                      <div className="wellness-tip-icon" style={{ color: tip.color }}>
                        {tip.icon}
                      </div>
                      <div className="wellness-tip-content">
                        <h4 style={{ color: tip.color }}>{tip.title}</h4>
                        <p style={{ color: "#4a5568" }}>{tip.text}</p>
                      </div>
                    </div>
                  );
                }
              })()}

              {selectedDay.data.moods.length > 1 && (
                <div className="daily-summary">
                  <span style={{ fontSize: "20px" }}>💡</span>
                  <div>
                    You logged <strong>{selectedDay.data.moods.length} moods</strong> on this
                    day. Great job tracking your emotions!
                  </div>
                </div>
              )}
            </div>
            <div className="modal-actions">
              <button
                className="btn btn-secondary"
                onClick={() => setSelectedDay(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Individual Mood Log Detail Modal */}
      {selectedMoodLog && (
        <div className="modal-overlay" onClick={() => setSelectedMoodLog(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">View Mood Details</h3>
              <button
                className="modal-close"
                onClick={() => setSelectedMoodLog(null)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div style={{ display: "grid", gap: "20px" }}>
                {/* Date (Logged Date) */}
                <div>
                  <div style={{
                    fontSize: "12px",
                    color: "#888",
                    marginBottom: "6px",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    fontWeight: "600"
                  }}>
                    Date (Logged Date)
                  </div>
                  <div style={{ fontSize: "16px", fontWeight: "600", color: "#222" }}>
                    {selectedMoodLog.fullData.date}
                  </div>
                </div>

                {/* Time (Logged Time) */}
                <div>
                  <div style={{
                    fontSize: "12px",
                    color: "#888",
                    marginBottom: "6px",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    fontWeight: "600"
                  }}>
                    Time (Logged Time)
                  </div>
                  <div style={{ fontSize: "16px", fontWeight: "600", color: "#222" }}>
                    {selectedMoodLog.time}
                  </div>
                </div>

                {/* Past Mood (Logged Mood) */}
                <div>
                  <div style={{
                    fontSize: "12px",
                    color: "#888",
                    marginBottom: "8px",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    fontWeight: "600"
                  }}>
                    Past Mood (Logged Mood)
                  </div>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px"
                  }}>
                    <div style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      backgroundColor: getEmotionColor(selectedMoodLog.emotion),
                      border: "2px solid #fff",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                    }} />
                    <span style={{ fontSize: "16px", fontWeight: "600", color: getEmotionColor(selectedMoodLog.emotion) }}>
                      {selectedMoodLog.feelingDescription || selectedMoodLog.emotion}
                    </span>
                  </div>
                </div>

                {/* Category */}
                <div>
                  <div style={{
                    fontSize: "12px",
                    color: "#888",
                    marginBottom: "6px",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    fontWeight: "600"
                  }}>
                    Category
                  </div>
                  <div style={{ fontSize: "16px", fontWeight: "600", color: "#222" }}>
                    {selectedMoodLog.category}
                  </div>
                </div>

                {/* Sub Category */}
                <div>
                  <div style={{
                    fontSize: "12px",
                    color: "#888",
                    marginBottom: "6px",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    fontWeight: "600"
                  }}>
                    Sub Category
                  </div>
                  <div style={{ fontSize: "16px", fontWeight: "600", color: "#222" }}>
                    {selectedMoodLog.subcategory}
                  </div>
                </div>

                {/* Impact & Joyfulness */}
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "16px"
                }}>
                  <div>
                    <div style={{
                      fontSize: "12px",
                      color: "#888",
                      marginBottom: "6px",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      fontWeight: "600"
                    }}>
                      Impact
                    </div>
                    <div style={{
                      fontSize: "24px",
                      fontWeight: "700",
                      color: "#00c7b7"
                    }}>
                      {selectedMoodLog.impact}/7
                    </div>
                  </div>
                  <div>
                    <div style={{
                      fontSize: "12px",
                      color: "#888",
                      marginBottom: "6px",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      fontWeight: "600"
                    }}>
                      Joyfulness
                    </div>
                    <div style={{
                      fontSize: "24px",
                      fontWeight: "700",
                      color: "#00c7b7"
                    }}>
                      {selectedMoodLog.joyfulness}/7
                    </div>
                  </div>
                </div>

                {/* Calculated Emotion & Zone */}
                <div>
                  <div style={{
                    fontSize: "12px",
                    color: "#888",
                    marginBottom: "10px",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    fontWeight: "600"
                  }}>
                    Calculated Emotion & Zone
                  </div>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    flexWrap: "wrap"
                  }}>
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px"
                    }}>
                      <div style={{
                        width: "28px",
                        height: "28px",
                        borderRadius: "50%",
                        backgroundColor: getEmotionColor(selectedMoodLog.emotion),
                        border: "2px solid #fff",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                      }} />
                      <span style={{ fontWeight: "600", fontSize: "16px", color: "#222" }}>
                        {selectedMoodLog.emotion}
                      </span>
                    </div>
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px"
                    }}>
                      <div style={{
                        width: "28px",
                        height: "28px",
                        borderRadius: "50%",
                        backgroundColor: getZoneColor(selectedMoodLog.fullData.calculatedZone),
                        border: "2px solid #fff",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                      }} />
                      <span style={{ fontWeight: "600", fontSize: "16px", color: "#222" }}>
                        {selectedMoodLog.fullData.calculatedZone}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Note (Added Note) */}
                {selectedMoodLog.note && (
                  <div>
                    <div style={{
                      fontSize: "12px",
                      color: "#888",
                      marginBottom: "6px",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      fontWeight: "600"
                    }}>
                      Note (Added Note)
                    </div>
                    <div style={{
                      fontSize: "15px",
                      color: "#444",
                      lineHeight: "1.6",
                      padding: "16px",
                      background: "#f9f9f9",
                      borderRadius: "10px"
                    }}>
                      {selectedMoodLog.note}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="modal-actions">
              <button
                className="btn btn-secondary"
                onClick={() => setSelectedMoodLog(null)}
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

export default Calendar;


