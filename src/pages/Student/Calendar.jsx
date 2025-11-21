import React, { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import "./Student.css";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);

  // Static mood data for calendar
  const moodData = {
    "2024-01-01": { zone: "Green Zone", color: "#2ecc71", moods: [{ time: "14:30", emotion: "Happy - Joyful", icon: "😊" }] },
    "2024-01-02": { zone: "Yellow Zone", color: "#f39c12", moods: [{ time: "10:00", emotion: "Anxious - Nervous", icon: "😰" }] },
    "2024-01-03": { zone: "Green Zone", color: "#2ecc71", moods: [{ time: "16:45", emotion: "Calm - Relaxed", icon: "😌" }] },
    "2024-01-05": { zone: "Orange Zone", color: "#e67e22", moods: [{ time: "11:20", emotion: "Sad - Disappointed", icon: "😢" }] },
    "2024-01-08": { zone: "Green Zone", color: "#2ecc71", moods: [{ time: "09:15", emotion: "Happy - Excited", icon: "🤩" }] },
    "2024-01-10": { zone: "Yellow Zone", color: "#f39c12", moods: [{ time: "13:00", emotion: "Angry - Frustrated", icon: "😠" }, { time: "19:00", emotion: "Calm - Peaceful", icon: "😌" }] },
    "2024-01-12": { zone: "Green Zone", color: "#2ecc71", moods: [{ time: "20:15", emotion: "Happy - Content", icon: "😊" }, { time: "14:00", emotion: "Anxious - Stressed", icon: "😰" }] },
    "2024-01-13": { zone: "Green Zone", color: "#2ecc71", moods: [{ time: "16:00", emotion: "Excited - Enthusiastic", icon: "🤩" }, { time: "10:30", emotion: "Angry - Frustrated", icon: "😠" }] },
    "2024-01-14": { zone: "Green Zone", color: "#2ecc71", moods: [{ time: "18:45", emotion: "Calm - Relaxed", icon: "😌" }, { time: "12:20", emotion: "Sad - Disappointed", icon: "😢" }] },
    "2024-01-15": { zone: "Green Zone", color: "#2ecc71", moods: [{ time: "14:30", emotion: "Happy - Joyful", icon: "😊" }, { time: "09:15", emotion: "Anxious - Nervous", icon: "😰" }] },
  };

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

  // Calculate monthly stats
  const getMonthlyStats = () => {
    const stats = {
      "Green Zone": 0,
      "Yellow Zone": 0,
      "Orange Zone": 0,
      "Red Zone": 0
    };
    
    Object.values(moodData).forEach(data => {
      if (stats[data.zone] !== undefined) {
        stats[data.zone]++;
      }
    });
    return stats;
  };

  const stats = getMonthlyStats();

  // Get wellness tip based on zone
  const getWellnessTip = (zone) => {
    switch(zone) {
      case "Green Zone":
        return {
          title: "Keep the Momentum!",
          text: "You're in a great headspace. Use this energy to tackle your most challenging subjects or help a friend study.",
          icon: "🌟",
          color: "#2ecc71",
          bg: "#f0fff4",
          border: "#c6f6d5"
        };
      case "Yellow Zone":
        return {
          title: "Pause and Reset",
          text: "Feeling a bit jittery? Try the 4-7-8 breathing technique before your next study session to regain focus.",
          icon: "🧘",
          color: "#f39c12",
          bg: "#fffaf0",
          border: "#feebc8"
        };
      case "Orange Zone":
        return {
          title: "Be Gentle with Yourself",
          text: "It's okay to not be okay. Take a short walk, listen to calming music, or talk to a friend. Your mental health comes first.",
          icon: "🧡",
          color: "#e67e22",
          bg: "#fff5f5",
          border: "#fed7d7"
        };
      case "Red Zone":
        return {
          title: "Stop and Seek Support",
          text: "High stress can block learning. Please step away from your books and reach out to a counselor or trusted adult.",
          icon: "🛑",
          color: "#e74c3c",
          bg: "#fff5f5",
          border: "#feb2b2"
        };
      default:
        return null;
    }
  };

  // Mock study impact data
  const getStudyImpact = (zone) => {
    switch(zone) {
      case "Green Zone": return { level: 90, label: "High Focus", color: "#2ecc71" };
      case "Yellow Zone": return { level: 60, label: "Moderate Focus", color: "#f39c12" };
      case "Orange Zone": return { level: 40, label: "Low Focus", color: "#e67e22" };
      case "Red Zone": return { level: 20, label: "Distracted", color: "#e74c3c" };
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

      {/* Monthly Stats Summary */}
      <div className="stats-summary-container">
        <div className="stat-pill">
          <div className="stat-pill-dot" style={{ background: "#2ecc71" }} />
          <div className="stat-pill-content">
            <span className="stat-pill-label">Green Days</span>
            <span className="stat-pill-value">{stats["Green Zone"]}</span>
          </div>
        </div>
        <div className="stat-pill">
          <div className="stat-pill-dot" style={{ background: "#f39c12" }} />
          <div className="stat-pill-content">
            <span className="stat-pill-label">Yellow Days</span>
            <span className="stat-pill-value">{stats["Yellow Zone"]}</span>
          </div>
        </div>
        <div className="stat-pill">
          <div className="stat-pill-dot" style={{ background: "#e67e22" }} />
          <div className="stat-pill-content">
            <span className="stat-pill-label">Orange Days</span>
            <span className="stat-pill-value">{stats["Orange Zone"]}</span>
          </div>
        </div>
        <div className="stat-pill">
          <div className="stat-pill-dot" style={{ background: "#e74c3c" }} />
          <div className="stat-pill-content">
            <span className="stat-pill-label">Red Days</span>
            <span className="stat-pill-value">{stats["Red Zone"]}</span>
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
            <div className="legend-dot" style={{ background: "#2ecc71" }} />
            <span className="legend-text">Green Zone</span>
          </div>
          <div className="legend-item">
            <div className="legend-dot" style={{ background: "#f39c12" }} />
            <span className="legend-text">Yellow Zone</span>
          </div>
          <div className="legend-item">
            <div className="legend-dot" style={{ background: "#e67e22" }} />
            <span className="legend-text">Orange Zone</span>
          </div>
          <div className="legend-item">
            <div className="legend-dot" style={{ background: "#e74c3c" }} />
            <span className="legend-text">Red Zone</span>
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
                  <div key={index} className="mood-entry-card">
                    <div className="mood-entry-icon">{mood.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div className="mood-entry-time">
                        {mood.time}
                      </div>
                      <div className="mood-entry-emotion">
                        {mood.emotion}
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
    </div>
  );
};

export default Calendar;


