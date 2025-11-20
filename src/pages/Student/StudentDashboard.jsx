import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiCalendar,
  FiHeart,
  FiTrendingUp,
  FiAward,
  FiUsers,
  FiSend,
  FiBell,
  FiBook,
} from "react-icons/fi";
import "./Student.css";

const StudentDashboard = () => {
  // Static data for demo
  const studentData = {
    name: "Sarah Johnson",
    currentMood: "Happy",
    currentZone: "Green Zone",
    lastLogged: "2 hours ago",
    loginStreak: 15,
    moodLogStreak: 12,
    totalMoods: 45,
    upcomingEvents: 3,
  };

  const notifications = [
    {
      id: 1,
      icon: "🎉",
      iconBg: "#ffeaa7",
      title: "New Reward Unlocked!",
      message: "Congratulations! You've earned the '7-Day Streak' reward.",
      time: "5 minutes ago",
    },
    {
      id: 2,
      icon: "😊",
      iconBg: "#74b9ff",
      title: "Mood Subcategory Added",
      message: "A new emotion 'Grateful' has been added to the Happy category.",
      time: "1 hour ago",
    },
    {
      id: 3,
      icon: "✨",
      iconBg: "#a29bfe",
      title: "Account Activated",
      message: "Your premium features are now active. Enjoy!",
      time: "3 hours ago",
    },
  ];

  const quickStats = [
    {
      title: "Login Streak",
      value: studentData.loginStreak,
      subtitle: "days in a row",
      icon: "🔥",
      iconBg: "#ff6b6b",
    },
    {
      title: "Mood Logs",
      value: studentData.totalMoods,
      subtitle: "total entries",
      icon: "❤️",
      iconBg: "#ee5a6f",
    },
    {
      title: "Mood Streak",
      value: studentData.moodLogStreak,
      subtitle: "days logged",
      icon: "⚡",
      iconBg: "#feca57",
    },
    {
      title: "Rewards",
      value: "5",
      subtitle: "earned",
      icon: "🏆",
      iconBg: "#48dbfb",
    },
  ];

  return (
    <div className="student-container">
      {/* Greeting Section */}
      <div className="student-greeting">
        <h1>Welcome back, {studentData.name}! 👋</h1>
        <p>
          You're in the {studentData.currentZone} today. Current mood:{" "}
          {studentData.currentMood} (logged {studentData.lastLogged})
        </p>
        <div className="mood-zone-badge zone-green">
          <span>😊</span>
          <span>{studentData.currentZone}</span>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="stats-grid">
        {quickStats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-card-header">
              <span className="stat-card-title">{stat.title}</span>
              <div
                className="stat-card-icon"
                style={{ background: stat.iconBg }}
              >
                {stat.icon}
              </div>
            </div>
            <div className="stat-card-value">{stat.value}</div>
            <div className="stat-card-subtitle">{stat.subtitle}</div>
          </div>
        ))}
      </div>

      {/* Quick Shortcuts */}
      <div className="shortcuts-section">
        <div className="section-title">
          <FiBook />
          Quick Actions
        </div>
        <div className="shortcuts-grid">
          <Link to="/student/log-mood" className="shortcut-btn">
            <div className="shortcut-icon">
              <FiHeart />
            </div>
            <span className="shortcut-label">Log Mood</span>
          </Link>

          <Link to="/student/mood-history" className="shortcut-btn">
            <div className="shortcut-icon">
              <FiTrendingUp />
            </div>
            <span className="shortcut-label">Mood History</span>
          </Link>

          {/* <Link to="/student/calendar" className="shortcut-btn"> */}
          <Link to="/student/dashboard" className="shortcut-btn">
            <div className="shortcut-icon">
              <FiCalendar />
            </div>
            <span className="shortcut-label">Calendar</span>
          </Link>

          {/* <Link to="/student/streaks-rewards" className="shortcut-btn"> */}
          <Link to="/student/dashboard" className="shortcut-btn">
            <div className="shortcut-icon">
              <FiAward />
            </div>
            <span className="shortcut-label">Rewards</span>
          </Link>

          {/* <Link to="/student/community" className="shortcut-btn"> */}
          <Link to="/student/dashboard" className="shortcut-btn">
            <div className="shortcut-icon">
              <FiUsers />
            </div>
            <span className="shortcut-label">Community</span>
          </Link>

          {/* <Link to="/student/referrals" className="shortcut-btn"> */}
          <Link to="/student/dashboard" className="shortcut-btn">
            <div className="shortcut-icon">
              <FiSend />
            </div>
            <span className="shortcut-label">Invite Friends</span>
          </Link>
        </div>
      </div>

      {/* Notifications */}
      <div className="notifications-panel">
        <div className="section-title">
          <FiBell />
          Recent Notifications
        </div>
        {notifications.map((notif) => (
          <div key={notif.id} className="notification-item">
            <div
              className="notification-icon"
              style={{ background: notif.iconBg }}
            >
              {notif.icon}
            </div>
            <div className="notification-content">
              <div className="notification-title">{notif.title}</div>
              <div className="notification-message">{notif.message}</div>
              <div className="notification-time">{notif.time}</div>
            </div>
          </div>
        ))}
        <Link
          to="/student/notifications"
          style={{
            display: "inline-block",
            marginTop: "12px",
            color: "#00c7b7",
            fontWeight: "600",
            textDecoration: "none",
          }}
        >
          View All Notifications →
        </Link>
      </div>
    </div>
  );
};

export default StudentDashboard;
