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
  FiActivity,
  FiTarget,
  FiBarChart2,
  FiArrowUp,
  FiArrowDown,
  FiChevronRight,
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
    weeklyProgress: 78,
    monthlyGoal: 30,
    monthlyProgress: 22,
  };

  const notifications = [
    {
      id: 1,
      icon: "🎉",
      iconBg: "#ffeaa7",
      title: "New Reward Unlocked!",
      message: "Congratulations! You've earned the '7-Day Streak' reward.",
      time: "5 minutes ago",
      type: "reward",
    },
    {
      id: 2,
      icon: "😊",
      iconBg: "#74b9ff",
      title: "Mood Subcategory Added",
      message: "A new emotion 'Grateful' has been added to the Happy category.",
      time: "1 hour ago",
      type: "update",
    },
    {
      id: 3,
      icon: "✨",
      iconBg: "#a29bfe",
      title: "Account Activated",
      message: "Your premium features are now active. Enjoy!",
      time: "3 hours ago",
      type: "system",
    },
  ];

  const quickStats = [
    {
      title: "Login Streak",
      value: studentData.loginStreak,
      subtitle: "days in a row",
      icon: "🔥",
      iconBg: "#ff6b6b",
      trend: "+2",
      trendUp: true,
    },
    {
      title: "Mood Logs",
      value: studentData.totalMoods,
      subtitle: "total entries",
      icon: "❤️",
      iconBg: "#ee5a6f",
      trend: "+5",
      trendUp: true,
    },
    {
      title: "Mood Streak",
      value: studentData.moodLogStreak,
      subtitle: "days logged",
      icon: "⚡",
      iconBg: "#feca57",
      trend: "+1",
      trendUp: true,
    },
    {
      title: "Rewards",
      value: "5",
      subtitle: "earned",
      icon: "🏆",
      iconBg: "#48dbfb",
      trend: "+1",
      trendUp: true,
    },
  ];

  const moodTrends = [
    { day: "Mon", zone: "green", value: 85 },
    { day: "Tue", zone: "green", value: 82 },
    { day: "Wed", zone: "yellow", value: 65 },
    { day: "Thu", zone: "green", value: 88 },
    { day: "Fri", zone: "green", value: 90 },
    { day: "Sat", zone: "green", value: 87 },
    { day: "Sun", zone: "green", value: 85 },
  ];

  const recentActivities = [
    {
      id: 1,
      type: "mood",
      action: "Logged mood",
      details: "Happy - Joyful",
      time: "2 hours ago",
      icon: "😊",
      color: "#2ecc71",
    },
    {
      id: 2,
      type: "reward",
      action: "Earned reward",
      details: "7-Day Login Streak",
      time: "5 hours ago",
      icon: "🏆",
      color: "#feca57",
    },
    {
      id: 3,
      type: "community",
      action: "Posted in",
      details: "Student Wellness Hub",
      time: "1 day ago",
      icon: "💬",
      color: "#74b9ff",
    },
    {
      id: 4,
      type: "streak",
      action: "Maintained streak",
      details: "12 days mood logging",
      time: "1 day ago",
      icon: "🔥",
      color: "#ff6b6b",
    },
  ];

  const weeklyInsights = [
    {
      title: "Most Common Zone",
      value: "Green Zone",
      percentage: 72,
      color: "#2ecc71",
      icon: "😊",
    },
    {
      title: "Average Mood Score",
      value: "8.2/10",
      percentage: 82,
      color: "#00c7b7",
      icon: "📊",
    },
    {
      title: "Consistency Score",
      value: "Excellent",
      percentage: 95,
      color: "#a29bfe",
      icon: "⭐",
    },
  ];

  const getZoneColor = (zone) => {
    const colors = {
      green: "#2ecc71",
      yellow: "#f39c12",
      orange: "#e67e22",
      red: "#e74c3c",
    };
    return colors[zone] || "#ccc";
  };

  return (
    <div className="student-container">
      {/* Enhanced Greeting Section */}
      <div className="student-greeting-enhanced">
        <div className="greeting-content">
          <div className="greeting-text">
            <h1>Welcome back, {studentData.name}! 👋</h1>
            <p>
              You're in the <strong>{studentData.currentZone}</strong> today.
              Current mood: <strong>{studentData.currentMood}</strong> (logged{" "}
              {studentData.lastLogged})
            </p>
            <div className="greeting-stats">
              <div className="greeting-stat-item">
                <span className="greeting-stat-label">This Week</span>
                <span className="greeting-stat-value">
                  {studentData.weeklyProgress}%
                </span>
              </div>
              <div className="greeting-stat-item">
                <span className="greeting-stat-label">Monthly Goal</span>
                <span className="greeting-stat-value">
                  {studentData.monthlyProgress}/{studentData.monthlyGoal}
                </span>
              </div>
            </div>
          </div>
          <div className="greeting-visual">
            <div className="mood-zone-badge-enhanced zone-green">
              <div className="zone-icon">😊</div>
              <div className="zone-info">
                <div className="zone-label">Current Zone</div>
                <div className="zone-name">{studentData.currentZone}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Quick Stats */}
      <div className="stats-grid-enhanced">
        {quickStats.map((stat, index) => (
          <div key={index} className="stat-card-enhanced">
            <div className="stat-card-header-enhanced">
              <span className="stat-card-title-enhanced">{stat.title}</span>
              <div
                className="stat-card-icon-enhanced"
                style={{ background: stat.iconBg }}
              >
                {stat.icon}
              </div>
            </div>
            <div className="stat-card-body-enhanced">
              <div className="stat-card-value-enhanced">{stat.value}</div>
              <div className="stat-card-footer-enhanced">
                <span className="stat-card-subtitle-enhanced">
                  {stat.subtitle}
                </span>
                <span
                  className={`stat-card-trend ${
                    stat.trendUp ? "trend-up" : "trend-down"
                  }`}
                >
                  {stat.trendUp ? (
                    <FiArrowUp size={14} />
                  ) : (
                    <FiArrowDown size={14} />
                  )}
                  {stat.trend}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="dashboard-grid">
        {/* Left Column */}
        <div className="dashboard-left">
          {/* Mood Trends Chart */}
          <div className="dashboard-card">
            <div className="dashboard-card-header">
              <div className="dashboard-card-title">
                <FiBarChart2 />
                <span>Weekly Mood Trends</span>
              </div>
              <Link to="/student/mood-overview" className="view-all-link">
                View Details <FiChevronRight />
              </Link>
            </div>
            <div className="mood-trends-chart">
              {moodTrends.map((trend, index) => (
                <div key={index} className="trend-bar-container">
                  <div className="trend-bar-wrapper">
                    <div
                      className="trend-bar"
                      style={{
                        height: `${trend.value}%`,
                        background: getZoneColor(trend.zone),
                      }}
                      title={`${trend.day}: ${trend.value}%`}
                    />
                  </div>
                  <span className="trend-day">{trend.day}</span>
                </div>
              ))}
            </div>
            <div className="trend-summary">
              <div className="trend-summary-item">
                <span className="trend-label">Avg. Score</span>
                <span className="trend-value">8.2/10</span>
              </div>
              <div className="trend-summary-item">
                <span className="trend-label">Best Day</span>
                <span className="trend-value">Friday</span>
              </div>
              <div className="trend-summary-item">
                <span className="trend-label">Consistency</span>
                <span className="trend-value">95%</span>
              </div>
            </div>
          </div>

          {/* Weekly Insights */}
          <div className="dashboard-card">
            <div className="dashboard-card-header">
              <div className="dashboard-card-title">
                <FiTarget />
                <span>Weekly Insights</span>
              </div>
            </div>
            <div className="insights-grid">
              {weeklyInsights.map((insight, index) => (
                <div key={index} className="insight-card">
                  <div className="insight-header">
                    <span className="insight-icon">{insight.icon}</span>
                    <span className="insight-title">{insight.title}</span>
                  </div>
                  <div className="insight-value">{insight.value}</div>
                  <div className="insight-progress">
                    <div className="insight-progress-bar">
                      <div
                        className="insight-progress-fill"
                        style={{
                          width: `${insight.percentage}%`,
                          background: insight.color,
                        }}
                      />
                    </div>
                    <span className="insight-percentage">
                      {insight.percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="dashboard-right">
          {/* Quick Actions */}
          <div className="dashboard-card">
            <div className="dashboard-card-header">
              <div className="dashboard-card-title">
                <FiBook />
                <span>Quick Actions</span>
              </div>
            </div>
            <div className="shortcuts-grid-enhanced">
              <Link to="/student/log-mood" className="shortcut-btn-enhanced">
                <div
                  className="shortcut-icon-enhanced"
                  style={{
                    background:
                      "linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)",
                  }}
                >
                  <FiHeart />
                </div>
                <span className="shortcut-label-enhanced">Log Mood</span>
              </Link>

              <Link
                to="/student/mood-history"
                className="shortcut-btn-enhanced"
              >
                <div
                  className="shortcut-icon-enhanced"
                  style={{
                    background:
                      "linear-gradient(135deg, #00c7b7 0%, #009e8e 100%)",
                  }}
                >
                  <FiTrendingUp />
                </div>
                <span className="shortcut-label-enhanced">Mood History</span>
              </Link>

              <Link to="/student/calendar" className="shortcut-btn-enhanced">
                <div
                  className="shortcut-icon-enhanced"
                  style={{
                    background:
                      "linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)",
                  }}
                >
                  <FiCalendar />
                </div>
                <span className="shortcut-label-enhanced">Calendar</span>
              </Link>

              <Link
                to="/student/streaks-rewards"
                className="shortcut-btn-enhanced"
              >
                <div
                  className="shortcut-icon-enhanced"
                  style={{
                    background:
                      "linear-gradient(135deg, #feca57 0%, #ff9ff3 100%)",
                  }}
                >
                  <FiAward />
                </div>
                <span className="shortcut-label-enhanced">Rewards</span>
              </Link>

              <Link to="/student/community" className="shortcut-btn-enhanced">
                <div
                  className="shortcut-icon-enhanced"
                  style={{
                    background:
                      "linear-gradient(135deg, #a29bfe 0%, #6c5ce7 100%)",
                  }}
                >
                  <FiUsers />
                </div>
                <span className="shortcut-label-enhanced">Community</span>
              </Link>

              <Link to="/student/referrals" className="shortcut-btn-enhanced">
                <div
                  className="shortcut-icon-enhanced"
                  style={{
                    background:
                      "linear-gradient(135deg, #48dbfb 0%, #0abde3 100%)",
                  }}
                >
                  <FiSend />
                </div>
                <span className="shortcut-label-enhanced">Invite Friends</span>
              </Link>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="dashboard-card">
            <div className="dashboard-card-header">
              <div className="dashboard-card-title">
                <FiActivity />
                <span>Recent Activity</span>
              </div>
              <Link to="/student/mood-history" className="view-all-link">
                View All <FiChevronRight />
              </Link>
            </div>
            <div className="activity-list">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="activity-item">
                  <div
                    className="activity-icon-wrapper"
                    style={{ background: `${activity.color}15` }}
                  >
                    <span className="activity-icon">{activity.icon}</span>
                  </div>
                  <div className="activity-content">
                    <div className="activity-action">{activity.action}</div>
                    <div className="activity-details">{activity.details}</div>
                    <div className="activity-time">{activity.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notifications */}
          <div className="dashboard-card">
            <div className="dashboard-card-header">
              <div className="dashboard-card-title">
                <FiBell />
                <span>Recent Notifications</span>
              </div>
              <Link to="/student/notifications" className="view-all-link">
                View All <FiChevronRight />
              </Link>
            </div>
            <div className="notifications-list-enhanced">
              {notifications.map((notif) => (
                <div key={notif.id} className="notification-item-enhanced">
                  <div
                    className="notification-icon-enhanced"
                    style={{ background: notif.iconBg }}
                  >
                    {notif.icon}
                  </div>
                  <div className="notification-content-enhanced">
                    <div className="notification-title-enhanced">
                      {notif.title}
                    </div>
                    <div className="notification-message-enhanced">
                      {notif.message}
                    </div>
                    <div className="notification-time-enhanced">
                      {notif.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Link
              to="/student/notifications"
              className="notifications-footer-link"
            >
              View All Notifications →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
