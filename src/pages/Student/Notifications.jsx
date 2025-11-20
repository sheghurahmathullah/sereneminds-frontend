import React, { useState } from "react";
import { FiBell, FiFilter, FiCheck, FiTrash2 } from "react-icons/fi";
import "./Student.css";

const Notifications = () => {
  const [filter, setFilter] = useState("all"); // all, unread, rewards, system
  const [selectedNotifications, setSelectedNotifications] = useState([]);

  // Static notifications data
  const allNotifications = [
    {
      id: 1,
      type: "reward",
      icon: "🎉",
      iconBg: "#ffeaa7",
      title: "New Reward Unlocked!",
      message:
        "Congratulations! You've earned the '7-Day Streak' reward. Claim it now to get 100 bonus points!",
      time: "5 minutes ago",
      read: false,
      date: "2024-01-15T14:55:00",
    },
    {
      id: 2,
      type: "system",
      icon: "😊",
      iconBg: "#74b9ff",
      title: "New Emotion Subcategory Added",
      message:
        "A new emotion 'Grateful' has been added to the Happy category. Try logging it in your next mood entry!",
      time: "1 hour ago",
      read: false,
      date: "2024-01-15T14:00:00",
    },
    {
      id: 3,
      type: "account",
      icon: "✨",
      iconBg: "#a29bfe",
      title: "Account Activated",
      message:
        "Your premium features are now active. Explore advanced analytics and exclusive content!",
      time: "3 hours ago",
      read: true,
      date: "2024-01-15T12:00:00",
    },
    {
      id: 4,
      type: "reward",
      icon: "🏆",
      iconBg: "#ffeaa7",
      title: "Milestone Achievement",
      message:
        "You've logged 50 moods! This is a significant milestone in your emotional wellness journey.",
      time: "5 hours ago",
      read: true,
      date: "2024-01-15T10:00:00",
    },
    {
      id: 5,
      type: "community",
      icon: "💬",
      iconBg: "#81ecec",
      title: "New Comment on Your Post",
      message:
        "Sarah Williams commented on your post in the Student Wellness Hub community.",
      time: "8 hours ago",
      read: true,
      date: "2024-01-15T07:00:00",
    },
    {
      id: 6,
      type: "reminder",
      icon: "⏰",
      iconBg: "#fab1a0",
      title: "Daily Mood Log Reminder",
      message:
        "Don't forget to log your mood today! You're on a 12-day streak - keep it going!",
      time: "12 hours ago",
      read: true,
      date: "2024-01-15T03:00:00",
    },
    {
      id: 7,
      type: "reward",
      icon: "⚡",
      iconBg: "#ffeaa7",
      title: "Reward Expiring Soon",
      message:
        "Your '10 Moods Logged' reward will expire in 3 days. Make sure to claim it before it's too late!",
      time: "1 day ago",
      read: true,
      date: "2024-01-14T15:00:00",
    },
    {
      id: 8,
      type: "system",
      icon: "🔔",
      iconBg: "#74b9ff",
      title: "New Feature Available",
      message:
        "Check out our new mood insights feature! Get personalized recommendations based on your emotional patterns.",
      time: "2 days ago",
      read: true,
      date: "2024-01-13T10:00:00",
    },
    {
      id: 9,
      type: "community",
      icon: "👥",
      iconBg: "#81ecec",
      title: "New Community Joined",
      message:
        "Welcome to the Mindfulness & Meditation community! Start connecting with like-minded members.",
      time: "3 days ago",
      read: true,
      date: "2024-01-12T14:00:00",
    },
    {
      id: 10,
      type: "account",
      icon: "🎯",
      iconBg: "#a29bfe",
      title: "Profile Completion",
      message:
        "Your profile is 90% complete! Add your interests to help us provide better recommendations.",
      time: "4 days ago",
      read: true,
      date: "2024-01-11T09:00:00",
    },
    {
      id: 11,
      type: "reward",
      icon: "🌟",
      iconBg: "#ffeaa7",
      title: "Green Zone Champion",
      message:
        "Amazing! You've stayed in the Green Zone for 5 consecutive days. Your 250 points reward is ready to claim!",
      time: "5 days ago",
      read: true,
      date: "2024-01-10T16:00:00",
    },
    {
      id: 12,
      type: "system",
      icon: "📊",
      iconBg: "#74b9ff",
      title: "Monthly Report Available",
      message:
        "Your January mood report is ready! View insights about your emotional patterns this month.",
      time: "6 days ago",
      read: true,
      date: "2024-01-09T08:00:00",
    },
  ];

  const filteredNotifications = allNotifications.filter((notif) => {
    if (filter === "all") return true;
    if (filter === "unread") return !notif.read;
    if (filter === "rewards") return notif.type === "reward";
    if (filter === "system")
      return notif.type === "system" || notif.type === "account";
    return true;
  });

  const unreadCount = allNotifications.filter((n) => !n.read).length;

  const handleSelectNotification = (id) => {
    if (selectedNotifications.includes(id)) {
      setSelectedNotifications(selectedNotifications.filter((nId) => nId !== id));
    } else {
      setSelectedNotifications([...selectedNotifications, id]);
    }
  };

  const handleMarkAllAsRead = () => {
    alert("All notifications marked as read!");
    // In real implementation, update backend
  };

  const handleDeleteSelected = () => {
    if (selectedNotifications.length === 0) {
      alert("Please select notifications to delete");
      return;
    }
    if (
      window.confirm(
        `Are you sure you want to delete ${selectedNotifications.length} notification(s)?`
      )
    ) {
      alert("Selected notifications deleted!");
      setSelectedNotifications([]);
    }
  };

  const handleSelectAll = () => {
    if (selectedNotifications.length === filteredNotifications.length) {
      setSelectedNotifications([]);
    } else {
      setSelectedNotifications(filteredNotifications.map((n) => n.id));
    }
  };

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
            Notifications
          </h2>
          <p style={{ color: "#888", marginTop: "6px", fontSize: "14px" }}>
            Stay updated with your activity and important alerts
            {unreadCount > 0 && (
              <span
                style={{
                  marginLeft: "8px",
                  padding: "4px 10px",
                  background: "#ff6b6b",
                  color: "#fff",
                  borderRadius: "12px",
                  fontSize: "12px",
                  fontWeight: "600",
                }}
              >
                {unreadCount} unread
              </span>
            )}
          </p>
        </div>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          {selectedNotifications.length > 0 && (
            <button
              className="btn btn-secondary"
              onClick={handleDeleteSelected}
              style={{ display: "flex", alignItems: "center", gap: "8px" }}
            >
              <FiTrash2 /> Delete ({selectedNotifications.length})
            </button>
          )}
          <button
            className="btn btn-primary"
            onClick={handleMarkAllAsRead}
            style={{ display: "flex", alignItems: "center", gap: "8px" }}
          >
            <FiCheck /> Mark All Read
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div
        style={{
          background: "#fff",
          borderRadius: "14px",
          padding: "20px 28px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
          marginBottom: "24px",
          display: "flex",
          gap: "12px",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <FiFilter style={{ color: "#888" }} />
        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            flex: 1,
          }}
        >
          {[
            { value: "all", label: "All" },
            { value: "unread", label: "Unread" },
            { value: "rewards", label: "Rewards" },
            { value: "system", label: "System" },
          ].map((filterOption) => (
            <button
              key={filterOption.value}
              onClick={() => setFilter(filterOption.value)}
              style={{
                padding: "8px 20px",
                borderRadius: "20px",
                border: "2px solid #e0e0e0",
                background:
                  filter === filterOption.value ? "#00c7b7" : "#fff",
                color: filter === filterOption.value ? "#fff" : "#666",
                fontWeight: "600",
                fontSize: "14px",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {filterOption.label}
            </button>
          ))}
        </div>
        <button
          className="btn btn-secondary"
          onClick={handleSelectAll}
          style={{ fontSize: "14px" }}
        >
          {selectedNotifications.length === filteredNotifications.length
            ? "Deselect All"
            : "Select All"}
        </button>
      </div>

      {/* Notifications List */}
      <div
        style={{
          background: "#fff",
          borderRadius: "14px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
          overflow: "hidden",
        }}
      >
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notif, index) => (
            <div
              key={notif.id}
              style={{
                display: "flex",
                gap: "16px",
                padding: "20px 28px",
                borderBottom:
                  index < filteredNotifications.length - 1
                    ? "1px solid #f0f0f0"
                    : "none",
                background: notif.read ? "#fff" : "#f9fbff",
                cursor: "pointer",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#f9f9f9")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = notif.read
                  ? "#fff"
                  : "#f9fbff")
              }
            >
              {/* Checkbox */}
              <input
                type="checkbox"
                checked={selectedNotifications.includes(notif.id)}
                onChange={() => handleSelectNotification(notif.id)}
                style={{
                  width: "18px",
                  height: "18px",
                  cursor: "pointer",
                  marginTop: "2px",
                }}
                onClick={(e) => e.stopPropagation()}
              />

              {/* Icon */}
              <div
                className="notification-icon"
                style={{ background: notif.iconBg }}
              >
                {notif.icon}
              </div>

              {/* Content */}
              <div className="notification-content" style={{ flex: 1 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "4px",
                  }}
                >
                  <div className="notification-title">{notif.title}</div>
                  {!notif.read && (
                    <span
                      style={{
                        width: "8px",
                        height: "8px",
                        background: "#00c7b7",
                        borderRadius: "50%",
                        flexShrink: 0,
                        marginLeft: "12px",
                        marginTop: "6px",
                      }}
                    />
                  )}
                </div>
                <div className="notification-message">{notif.message}</div>
                <div className="notification-time">{notif.time}</div>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">🔔</div>
            <div className="empty-state-title">No notifications</div>
            <div className="empty-state-message">
              You're all caught up! Check back later for updates.
            </div>
          </div>
        )}
      </div>

      {/* Notification Settings Info */}
      <div
        style={{
          background: "#f0f9ff",
          borderRadius: "14px",
          padding: "24px",
          marginTop: "24px",
          display: "flex",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <div style={{ fontSize: "32px" }}>💡</div>
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontSize: "16px",
              fontWeight: "600",
              color: "#0369a1",
              marginBottom: "6px",
            }}
          >
            Manage Your Notification Preferences
          </div>
          <div style={{ fontSize: "14px", color: "#0284c7", lineHeight: "1.6" }}>
            You can customize which notifications you receive by going to your
            profile settings. Choose what's most important to you!
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;


