import React, { useState } from "react";
import { FiTrendingUp, FiCalendar, FiBarChart2 } from "react-icons/fi";
import "./Student.css";

const MoodOverview = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("week"); // week | month | year

  // Static overview data
  const overviewStats = {
    totalMoods: 45,
    averageImpact: 5.2,
    averageJoyfulness: 5.8,
    mostCommonZone: "Green Zone",
    mostCommonEmotion: "Happy",
    streakDays: 12,
    totalDays: 30,
  };

  const zoneDistribution = [
    { zone: "Green Zone", count: 28, percentage: 62, color: "#2ecc71" },
    { zone: "Yellow Zone", count: 10, percentage: 22, color: "#f39c12" },
    { zone: "Orange Zone", count: 5, percentage: 11, color: "#e67e22" },
    { zone: "Red Zone", count: 2, percentage: 5, color: "#e74c3c" },
  ];

  const emotionDistribution = [
    { emotion: "Happy", count: 18, percentage: 40, icon: "😊", color: "#2ecc71" },
    { emotion: "Calm", count: 12, percentage: 27, icon: "😌", color: "#1abc9c" },
    { emotion: "Anxious", count: 8, percentage: 18, icon: "😰", color: "#f39c12" },
    { emotion: "Sad", count: 4, percentage: 9, icon: "😢", color: "#3498db" },
    { emotion: "Angry", count: 3, percentage: 6, icon: "😠", color: "#e74c3c" },
  ];

  const weeklyTrend = [
    { day: "Mon", moods: 3, avgImpact: 5.5, avgJoyfulness: 6.0 },
    { day: "Tue", moods: 2, avgImpact: 4.5, avgJoyfulness: 5.5 },
    { day: "Wed", moods: 4, avgImpact: 6.0, avgJoyfulness: 6.5 },
    { day: "Thu", moods: 3, avgImpact: 5.0, avgJoyfulness: 5.0 },
    { day: "Fri", moods: 5, avgImpact: 5.8, avgJoyfulness: 6.2 },
    { day: "Sat", moods: 2, avgImpact: 4.5, avgJoyfulness: 5.5 },
    { day: "Sun", moods: 3, avgImpact: 5.2, avgJoyfulness: 5.8 },
  ];

  const insights = [
    {
      type: "positive",
      title: "Great Consistency!",
      message: "You've logged moods for 12 consecutive days. Keep it up!",
      icon: "🔥",
    },
    {
      type: "positive",
      title: "Mostly Green Zone",
      message: "You've been in the Green Zone 62% of the time this month.",
      icon: "😊",
    },
    {
      type: "info",
      title: "Happy is Your Top Emotion",
      message: "Happy emotions account for 40% of your logged moods.",
      icon: "❤️",
    },
  ];

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
            Mood Overview
          </h2>
          <p style={{ color: "#888", marginTop: "6px", fontSize: "14px" }}>
            Comprehensive insights into your emotional patterns
          </p>
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          {["week", "month", "year"].map((period) => (
            <button
              key={period}
              className={`btn ${
                selectedPeriod === period ? "btn-primary" : "btn-secondary"
              }`}
              onClick={() => setSelectedPeriod(period)}
              style={{ textTransform: "capitalize" }}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      {/* Key Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-card-title">Total Moods</span>
            <div
              className="stat-card-icon"
              style={{ background: "#74b9ff" }}
            >
              <FiBarChart2 />
            </div>
          </div>
          <div className="stat-card-value">{overviewStats.totalMoods}</div>
          <div className="stat-card-subtitle">logged this {selectedPeriod}</div>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-card-title">Avg Impact</span>
            <div
              className="stat-card-icon"
              style={{ background: "#00b894" }}
            >
              <FiTrendingUp />
            </div>
          </div>
          <div className="stat-card-value">
            {overviewStats.averageImpact.toFixed(1)}
          </div>
          <div className="stat-card-subtitle">out of 7</div>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-card-title">Avg Joyfulness</span>
            <div
              className="stat-card-icon"
              style={{ background: "#feca57" }}
            >
              ❤️
            </div>
          </div>
          <div className="stat-card-value">
            {overviewStats.averageJoyfulness.toFixed(1)}
          </div>
          <div className="stat-card-subtitle">out of 7</div>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-card-title">Most Common Zone</span>
            <div
              className="stat-card-icon"
              style={{ background: "#a29bfe" }}
            >
              🎯
            </div>
          </div>
          <div className="stat-card-value" style={{ fontSize: "20px" }}>
            {overviewStats.mostCommonZone}
          </div>
          <div className="stat-card-subtitle">this {selectedPeriod}</div>
        </div>
      </div>

      {/* Zone Distribution */}
      <div
        style={{
          background: "#fff",
          borderRadius: "14px",
          padding: "28px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
          marginBottom: "24px",
        }}
      >
        <div className="section-title" style={{ marginBottom: "24px" }}>
          <FiBarChart2 />
          Zone Distribution
        </div>
        <div style={{ display: "grid", gap: "16px" }}>
          {zoneDistribution.map((item) => (
            <div key={item.zone}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "8px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div
                    style={{
                      width: "12px",
                      height: "12px",
                      borderRadius: "50%",
                      background: item.color,
                    }}
                  />
                  <span style={{ fontWeight: "600", fontSize: "15px" }}>
                    {item.zone}
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={{ fontSize: "14px", color: "#666" }}>
                    {item.count} moods
                  </span>
                  <span
                    style={{
                      fontWeight: "700",
                      fontSize: "16px",
                      color: item.color,
                    }}
                  >
                    {item.percentage}%
                  </span>
                </div>
              </div>
              <div
                style={{
                  width: "100%",
                  height: "8px",
                  background: "#f0f0f0",
                  borderRadius: "4px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${item.percentage}%`,
                    height: "100%",
                    background: item.color,
                    transition: "width 0.3s",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Emotion Distribution */}
      <div
        style={{
          background: "#fff",
          borderRadius: "14px",
          padding: "28px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
          marginBottom: "24px",
        }}
      >
        <div className="section-title" style={{ marginBottom: "24px" }}>
          <FiTrendingUp />
          Emotion Distribution
        </div>
        <div style={{ display: "grid", gap: "16px" }}>
          {emotionDistribution.map((item) => (
            <div key={item.emotion}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "8px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={{ fontSize: "24px" }}>{item.icon}</span>
                  <span style={{ fontWeight: "600", fontSize: "15px" }}>
                    {item.emotion}
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={{ fontSize: "14px", color: "#666" }}>
                    {item.count} times
                  </span>
                  <span
                    style={{
                      fontWeight: "700",
                      fontSize: "16px",
                      color: item.color,
                    }}
                  >
                    {item.percentage}%
                  </span>
                </div>
              </div>
              <div
                style={{
                  width: "100%",
                  height: "8px",
                  background: "#f0f0f0",
                  borderRadius: "4px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${item.percentage}%`,
                    height: "100%",
                    background: item.color,
                    transition: "width 0.3s",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Trend */}
      <div
        style={{
          background: "#fff",
          borderRadius: "14px",
          padding: "28px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
          marginBottom: "24px",
        }}
      >
        <div className="section-title" style={{ marginBottom: "24px" }}>
          <FiCalendar />
          Weekly Trend
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "12px" }}>
          {weeklyTrend.map((day) => (
            <div
              key={day.day}
              style={{
                textAlign: "center",
                padding: "16px",
                background: "#f9f9f9",
                borderRadius: "10px",
              }}
            >
              <div style={{ fontSize: "12px", color: "#888", marginBottom: "8px" }}>
                {day.day}
              </div>
              <div style={{ fontSize: "20px", fontWeight: "700", marginBottom: "4px" }}>
                {day.moods}
              </div>
              <div style={{ fontSize: "11px", color: "#666" }}>moods</div>
              <div
                style={{
                  marginTop: "8px",
                  padding: "6px",
                  background: "#fff",
                  borderRadius: "6px",
                  fontSize: "11px",
                }}
              >
                <div>I: {day.avgImpact}</div>
                <div>J: {day.avgJoyfulness}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Insights */}
      <div
        style={{
          background: "#fff",
          borderRadius: "14px",
          padding: "28px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
        }}
      >
        <div className="section-title" style={{ marginBottom: "24px" }}>
          💡 Insights
        </div>
        <div style={{ display: "grid", gap: "16px" }}>
          {insights.map((insight, index) => (
            <div
              key={index}
              style={{
                padding: "20px",
                background:
                  insight.type === "positive"
                    ? "#f0f9ff"
                    : insight.type === "negative"
                    ? "#fff5f5"
                    : "#f9f9f9",
                borderRadius: "12px",
                border:
                  insight.type === "positive"
                    ? "2px solid #00c7b7"
                    : insight.type === "negative"
                    ? "2px solid #e74c3c"
                    : "2px solid #e0e0e0",
                display: "flex",
                alignItems: "center",
                gap: "16px",
              }}
            >
              <div style={{ fontSize: "32px" }}>{insight.icon}</div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: "16px",
                    fontWeight: "700",
                    marginBottom: "4px",
                    color: "#222",
                  }}
                >
                  {insight.title}
                </div>
                <div style={{ fontSize: "14px", color: "#666", lineHeight: "1.6" }}>
                  {insight.message}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoodOverview;

