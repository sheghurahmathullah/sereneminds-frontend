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

  return (
    <div className="student-container">
      {/* Header */}
      <div
        style={{
          background: "#fff",
          borderRadius: "14px",
          padding: "28px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
          marginBottom: "24px",
        }}
      >
        <h2 style={{ fontSize: "24px", fontWeight: "700", margin: 0 }}>
          Mood Calendar
        </h2>
        <p style={{ color: "#888", marginTop: "6px", fontSize: "14px" }}>
          View your mood patterns across the month
        </p>
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
                style={{
                  cursor: dayMood ? "pointer" : "default",
                }}
              >
                {day && (
                  <>
                    <div className="calendar-day-number">{day}</div>
                    {dayMood && (
                      <div
                        className="mood-indicator"
                        style={{ background: dayMood.color }}
                        title={dayMood.zone}
                      />
                    )}
                    {dayMood && dayMood.moods.length > 1 && (
                      <div
                        style={{
                          fontSize: "10px",
                          color: "#999",
                          marginTop: "2px",
                          fontWeight: "600",
                        }}
                      >
                        {dayMood.moods.length} logs
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div
          style={{
            display: "flex",
            gap: "24px",
            marginTop: "24px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                background: "#2ecc71",
              }}
            />
            <span style={{ fontSize: "13px", color: "#666" }}>Green Zone</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                background: "#f39c12",
              }}
            />
            <span style={{ fontSize: "13px", color: "#666" }}>Yellow Zone</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                background: "#e67e22",
              }}
            />
            <span style={{ fontSize: "13px", color: "#666" }}>Orange Zone</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                background: "#e74c3c",
              }}
            />
            <span style={{ fontSize: "13px", color: "#666" }}>Red Zone</span>
          </div>
        </div>
      </div>

      {/* Day Details Modal */}
      {selectedDay && (
        <div className="modal-overlay" onClick={() => setSelectedDay(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
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
            <div className="modal-body">
              {/* Zone Badge */}
              <div
                style={{
                  display: "inline-block",
                  padding: "10px 20px",
                  background: `${selectedDay.data.color}15`,
                  borderRadius: "20px",
                  fontWeight: "700",
                  fontSize: "16px",
                  color: selectedDay.data.color,
                  border: `2px solid ${selectedDay.data.color}`,
                  marginBottom: "24px",
                }}
              >
                {selectedDay.data.zone}
              </div>

              {/* Mood Entries */}
              <div style={{ display: "grid", gap: "16px" }}>
                {selectedDay.data.moods.map((mood, index) => (
                  <div
                    key={index}
                    style={{
                      padding: "20px",
                      background: "#f9f9f9",
                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                    }}
                  >
                    <div style={{ fontSize: "36px" }}>{mood.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          fontSize: "12px",
                          color: "#888",
                          marginBottom: "4px",
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                        }}
                      >
                        {mood.time}
                      </div>
                      <div
                        style={{
                          fontSize: "16px",
                          fontWeight: "600",
                          color: "#222",
                        }}
                      >
                        {mood.emotion}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {selectedDay.data.moods.length > 1 && (
                <div
                  style={{
                    marginTop: "16px",
                    padding: "16px",
                    background: "#f0f9ff",
                    borderRadius: "10px",
                    fontSize: "14px",
                    color: "#0369a1",
                  }}
                >
                  💡 You logged {selectedDay.data.moods.length} moods on this
                  day. Great job tracking your emotions!
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


