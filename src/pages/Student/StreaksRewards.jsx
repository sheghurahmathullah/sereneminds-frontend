import React, { useState } from "react";
import { FiAward, FiTrendingUp } from "react-icons/fi";
import "./Student.css";

const StreaksRewards = () => {
  const [selectedReward, setSelectedReward] = useState(null);

  // Static streak data
  const streakData = {
    loginStreak: 15,
    loginGoal: 30,
    moodLogStreak: 12,
    moodLogGoal: 21,
  };

  // Static rewards data
  const rewards = [
    {
      id: 1,
      title: "7-Day Login Streak",
      description:
        "Congratulations on maintaining a 7-day login streak! Keep up the great work.",
      icon: "🔥",
      status: "claimed",
      startDate: "2024-01-08",
      expiryDate: "2024-02-08",
      claimedDate: "2024-01-15",
      points: 100,
      type: "Login Milestone",
    },
    {
      id: 2,
      title: "First Mood Log",
      description:
        "You've logged your first mood! This is the beginning of your emotional wellness journey.",
      icon: "❤️",
      status: "claimed",
      startDate: "2024-01-01",
      expiryDate: "2024-02-01",
      claimedDate: "2024-01-02",
      points: 50,
      type: "Achievement",
    },
    {
      id: 3,
      title: "10 Moods Logged",
      description:
        "You've successfully logged 10 moods! You're building a great habit.",
      icon: "⚡",
      status: "claimed",
      startDate: "2024-01-05",
      expiryDate: "2024-02-05",
      claimedDate: "2024-01-10",
      points: 150,
      type: "Mood Milestone",
    },
    {
      id: 4,
      title: "15-Day Login Streak",
      description:
        "Amazing! You've logged in for 15 consecutive days. You're on fire!",
      icon: "🏆",
      status: "pending",
      startDate: "2024-01-15",
      expiryDate: "2024-02-15",
      claimedDate: null,
      points: 200,
      type: "Login Milestone",
    },
    {
      id: 5,
      title: "Green Zone Champion",
      description:
        "You've spent 7 consecutive days in the Green Zone! Excellent emotional balance.",
      icon: "🌟",
      status: "pending",
      startDate: "2024-01-12",
      expiryDate: "2024-02-12",
      claimedDate: null,
      points: 250,
      type: "Special Achievement",
    },
    {
      id: 6,
      title: "Early Adopter",
      description:
        "You were one of the first to join Serene Minds. Thank you for being part of our community!",
      icon: "🎉",
      status: "expired",
      startDate: "2023-12-01",
      expiryDate: "2024-01-01",
      claimedDate: null,
      points: 300,
      type: "Special Achievement",
    },
  ];

  const handleClaimReward = (rewardId) => {
    // Claim logic here
    alert(`Reward claimed successfully! Points added to your account.`);
    // In real implementation, this would update the backend
  };

  const loginProgress = (streakData.loginStreak / streakData.loginGoal) * 100;
  const moodLogProgress =
    (streakData.moodLogStreak / streakData.moodLogGoal) * 100;

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
          Streaks & Rewards
        </h2>
        <p style={{ color: "#888", marginTop: "6px", fontSize: "14px" }}>
          Track your progress and earn rewards for staying consistent
        </p>
      </div>

      {/* Streak Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "20px",
          marginBottom: "32px",
        }}
      >
        {/* Login Streak */}
        <div className="streak-card">
          <div className="streak-header">
            <div className="streak-title">Login Streak</div>
            <div className="streak-icon">🔥</div>
          </div>
          <div className="streak-value">{streakData.loginStreak}</div>
          <div className="streak-subtitle">consecutive days</div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${loginProgress}%` }}
            />
          </div>
          <div
            style={{
              marginTop: "12px",
              fontSize: "13px",
              opacity: 0.9,
            }}
          >
            {streakData.loginStreak}/{streakData.loginGoal} days to next reward
          </div>
        </div>

        {/* Mood Log Streak */}
        <div
          className="streak-card"
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          }}
        >
          <div className="streak-header">
            <div className="streak-title">Mood Log Streak</div>
            <div className="streak-icon">⚡</div>
          </div>
          <div className="streak-value">{streakData.moodLogStreak}</div>
          <div className="streak-subtitle">consecutive days logged</div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${moodLogProgress}%` }}
            />
          </div>
          <div
            style={{
              marginTop: "12px",
              fontSize: "13px",
              opacity: 0.9,
            }}
          >
            {streakData.moodLogStreak}/{streakData.moodLogGoal} days to next
            reward
          </div>
        </div>
      </div>

      {/* Rewards Section */}
      <div
        style={{
          background: "#fff",
          borderRadius: "14px",
          padding: "28px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
          marginBottom: "24px",
        }}
      >
        <div
          className="section-title"
          style={{ marginBottom: "24px" }}
        >
          <FiAward />
          Your Rewards
        </div>

        {/* Filter Tabs */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            marginBottom: "24px",
            flexWrap: "wrap",
          }}
        >
          {["All", "Claimed", "Pending", "Expired"].map((filter) => (
            <button
              key={filter}
              style={{
                padding: "8px 20px",
                borderRadius: "20px",
                border: "2px solid #e0e0e0",
                background: filter === "All" ? "#00c7b7" : "#fff",
                color: filter === "All" ? "#fff" : "#666",
                fontWeight: "600",
                fontSize: "14px",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Rewards Grid */}
        <div className="rewards-grid">
          {rewards.map((reward) => (
            <div key={reward.id} className="reward-card">
              <div className="reward-header">
                <div style={{ fontSize: "40px" }}>{reward.icon}</div>
                <span className={`reward-badge ${reward.status}`}>
                  {reward.status}
                </span>
              </div>
              <div className="reward-title">{reward.title}</div>
              <div
                style={{
                  fontSize: "12px",
                  color: "#00c7b7",
                  fontWeight: "600",
                  marginBottom: "12px",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                {reward.type}
              </div>
              <div className="reward-description">{reward.description}</div>
              <div className="reward-dates">
                <div>Start: {reward.startDate}</div>
                <div>Expires: {reward.expiryDate}</div>
                {reward.claimedDate && (
                  <div>Claimed: {reward.claimedDate}</div>
                )}
              </div>
              <div
                style={{
                  fontSize: "18px",
                  fontWeight: "700",
                  color: "#00c7b7",
                  marginBottom: "16px",
                }}
              >
                {reward.points} Points
              </div>
              {reward.status === "pending" && (
                <button
                  className="btn btn-primary"
                  style={{ width: "100%" }}
                  onClick={() => handleClaimReward(reward.id)}
                >
                  Claim Reward
                </button>
              )}
              {reward.status === "claimed" && (
                <button
                  className="btn btn-secondary"
                  style={{ width: "100%", cursor: "default" }}
                  onClick={() => setSelectedReward(reward)}
                >
                  View Details
                </button>
              )}
              {reward.status === "expired" && (
                <button
                  className="btn btn-secondary"
                  style={{
                    width: "100%",
                    opacity: 0.6,
                    cursor: "not-allowed",
                  }}
                  disabled
                >
                  Expired
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Motivational Section */}
      <div
        style={{
          background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
          borderRadius: "16px",
          padding: "32px",
          color: "#fff",
          textAlign: "center",
          boxShadow: "0 4px 20px rgba(245, 87, 108, 0.2)",
        }}
      >
        <div style={{ fontSize: "48px", marginBottom: "16px" }}>🎯</div>
        <h3
          style={{
            fontSize: "24px",
            fontWeight: "700",
            marginBottom: "12px",
          }}
        >
          Keep Up the Great Work!
        </h3>
        <p style={{ fontSize: "16px", opacity: 0.95, lineHeight: "1.6" }}>
          You're doing an amazing job tracking your emotions and maintaining
          your streaks. Remember, consistency is key to emotional wellness.
          Keep logging your moods and watch your progress grow!
        </p>
      </div>

      {/* Reward Details Modal */}
      {selectedReward && (
        <div className="modal-overlay" onClick={() => setSelectedReward(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Reward Details</h3>
              <button
                className="modal-close"
                onClick={() => setSelectedReward(null)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div
                style={{
                  textAlign: "center",
                  padding: "32px",
                  background: "#f9f9f9",
                  borderRadius: "12px",
                  marginBottom: "24px",
                }}
              >
                <div style={{ fontSize: "72px", marginBottom: "16px" }}>
                  {selectedReward.icon}
                </div>
                <div
                  style={{
                    fontSize: "24px",
                    fontWeight: "700",
                    color: "#222",
                    marginBottom: "8px",
                  }}
                >
                  {selectedReward.title}
                </div>
                <span className={`reward-badge ${selectedReward.status}`}>
                  {selectedReward.status}
                </span>
              </div>

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
                    Type
                  </div>
                  <div style={{ fontSize: "16px", fontWeight: "600" }}>
                    {selectedReward.type}
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
                    Description
                  </div>
                  <div
                    style={{
                      fontSize: "15px",
                      color: "#444",
                      lineHeight: "1.6",
                    }}
                  >
                    {selectedReward.description}
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
                      Start Date
                    </div>
                    <div style={{ fontSize: "15px", fontWeight: "600" }}>
                      {selectedReward.startDate}
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
                      Expiry Date
                    </div>
                    <div style={{ fontSize: "15px", fontWeight: "600" }}>
                      {selectedReward.expiryDate}
                    </div>
                  </div>
                </div>

                {selectedReward.claimedDate && (
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
                      Claimed Date
                    </div>
                    <div style={{ fontSize: "15px", fontWeight: "600" }}>
                      {selectedReward.claimedDate}
                    </div>
                  </div>
                )}

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
                    Points Earned
                  </div>
                  <div
                    style={{
                      fontSize: "32px",
                      fontWeight: "700",
                      color: "#00c7b7",
                    }}
                  >
                    {selectedReward.points}
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-actions">
              <button
                className="btn btn-secondary"
                onClick={() => setSelectedReward(null)}
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

export default StreaksRewards;


