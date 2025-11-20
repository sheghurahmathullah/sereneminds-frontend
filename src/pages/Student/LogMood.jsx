import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiCheck } from "react-icons/fi";
import "./Student.css";

const LogMood = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Category, 2: Details, 3: Confirmation
  const [formData, setFormData] = useState({
    category: "",
    subcategory: "",
    note: "",
    impact: 4,
    joyfulness: 4,
    date: new Date().toISOString().split("T")[0],
    time: new Date().toTimeString().slice(0, 5),
  });
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Static data for categories and subcategories
  const categories = [
    {
      id: "happy",
      name: "Happy",
      icon: "😊",
      color: "#2ecc71",
      subcategories: [
        "Joyful",
        "Excited",
        "Content",
        "Grateful",
        "Peaceful",
        "Playful",
      ],
    },
    {
      id: "sad",
      name: "Sad",
      icon: "😢",
      color: "#3498db",
      subcategories: [
        "Lonely",
        "Disappointed",
        "Hurt",
        "Grief",
        "Melancholy",
        "Homesick",
      ],
    },
    {
      id: "angry",
      name: "Angry",
      icon: "😠",
      color: "#e74c3c",
      subcategories: [
        "Frustrated",
        "Irritated",
        "Furious",
        "Resentful",
        "Annoyed",
        "Bitter",
      ],
    },
    {
      id: "anxious",
      name: "Anxious",
      icon: "😰",
      color: "#f39c12",
      subcategories: [
        "Worried",
        "Nervous",
        "Stressed",
        "Overwhelmed",
        "Tense",
        "Fearful",
      ],
    },
    {
      id: "surprised",
      name: "Surprised",
      icon: "😲",
      color: "#9b59b6",
      subcategories: [
        "Amazed",
        "Shocked",
        "Astonished",
        "Startled",
        "Confused",
        "Curious",
      ],
    },
    {
      id: "calm",
      name: "Calm",
      icon: "😌",
      color: "#1abc9c",
      subcategories: [
        "Relaxed",
        "Serene",
        "Tranquil",
        "Balanced",
        "Centered",
        "At ease",
      ],
    },
  ];

  const calculateZone = (impact, joyfulness) => {
    const total = impact + joyfulness;
    if (total >= 11) return { name: "Green Zone", color: "#2ecc71" };
    if (total >= 8) return { name: "Yellow Zone", color: "#f39c12" };
    if (total >= 5) return { name: "Orange Zone", color: "#e67e22" };
    return { name: "Red Zone", color: "#e74c3c" };
  };

  const handleCategorySelect = (category) => {
    setFormData({ ...formData, category: category.name });
    setStep(2);
  };

  const handleSubcategorySelect = (subcategory) => {
    setFormData({ ...formData, subcategory });
  };

  const handleSubmit = () => {
    if (!formData.subcategory) {
      alert("Please select a subcategory");
      return;
    }
    setShowConfirmModal(true);
  };

  const handleConfirm = () => {
    // Submit logic here
    alert("Mood logged successfully!");
    navigate("/student/mood-history");
  };

  const selectedCategory = categories.find((c) => c.name === formData.category);
  const zone = calculateZone(formData.impact, formData.joyfulness);

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
          How are you feeling right now?
        </h2>
        <p style={{ color: "#888", marginTop: "8px", fontSize: "15px" }}>
          Take a moment to check in with yourself
        </p>
      </div>

      {/* Step 1: Select Category */}
      {step === 1 && (
        <div>
          <div
            style={{
              fontSize: "16px",
              fontWeight: "600",
              color: "#444",
              marginBottom: "20px",
            }}
          >
            Select your primary emotion:
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "16px",
            }}
          >
            {categories.map((category) => (
              <div
                key={category.id}
                onClick={() => handleCategorySelect(category)}
                style={{
                  background: "#fff",
                  borderRadius: "14px",
                  padding: "32px 24px",
                  textAlign: "center",
                  cursor: "pointer",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
                  border: "2px solid transparent",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = category.color;
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 20px rgba(0,0,0,0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "transparent";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 2px 8px rgba(0,0,0,0.03)";
                }}
              >
                <div style={{ fontSize: "48px", marginBottom: "12px" }}>
                  {category.icon}
                </div>
                <div
                  style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    color: "#222",
                  }}
                >
                  {category.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Details */}
      {step === 2 && selectedCategory && (
        <div
          style={{
            background: "#fff",
            borderRadius: "14px",
            padding: "32px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
          }}
        >
          <button
            onClick={() => setStep(1)}
            style={{
              background: "none",
              border: "none",
              color: "#00c7b7",
              cursor: "pointer",
              fontSize: "14px",
              marginBottom: "20px",
              fontWeight: "600",
            }}
          >
            ← Change emotion
          </button>

          {/* Selected Category Display */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              padding: "16px",
              background: "#f9f9f9",
              borderRadius: "12px",
              marginBottom: "28px",
            }}
          >
            <div style={{ fontSize: "40px" }}>{selectedCategory.icon}</div>
            <div>
              <div
                style={{
                  fontSize: "12px",
                  color: "#888",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  marginBottom: "4px",
                }}
              >
                Selected Emotion
              </div>
              <div
                style={{
                  fontSize: "20px",
                  fontWeight: "700",
                  color: selectedCategory.color,
                }}
              >
                {selectedCategory.name}
              </div>
            </div>
          </div>

          {/* Subcategory Selection */}
          <div className="form-group">
            <label className="form-label">
              What specific feeling best describes your current state? *
            </label>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
                gap: "12px",
              }}
            >
              {selectedCategory.subcategories.map((sub) => (
                <div
                  key={sub}
                  onClick={() => handleSubcategorySelect(sub)}
                  style={{
                    padding: "14px 20px",
                    borderRadius: "10px",
                    border: `2px solid ${
                      formData.subcategory === sub
                        ? selectedCategory.color
                        : "#e0e0e0"
                    }`,
                    background:
                      formData.subcategory === sub
                        ? `${selectedCategory.color}15`
                        : "#fff",
                    cursor: "pointer",
                    textAlign: "center",
                    fontWeight: formData.subcategory === sub ? "600" : "500",
                    fontSize: "14px",
                    color: formData.subcategory === sub ? "#222" : "#666",
                    transition: "all 0.2s",
                  }}
                >
                  {sub}
                </div>
              ))}
            </div>
          </div>

          {/* Date and Time */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div className="form-group">
              <label className="form-label">Date *</label>
              <input
                type="date"
                className="form-input"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Time *</label>
              <input
                type="time"
                className="form-input"
                value={formData.time}
                onChange={(e) =>
                  setFormData({ ...formData, time: e.target.value })
                }
                required
              />
            </div>
          </div>

          {/* Impact Slider */}
          <div className="slider-group">
            <div className="slider-label">
              <label className="form-label">Impact Level (1-7) *</label>
              <span className="slider-value">{formData.impact}</span>
            </div>
            <input
              type="range"
              min="1"
              max="7"
              value={formData.impact}
              onChange={(e) =>
                setFormData({ ...formData, impact: parseInt(e.target.value) })
              }
              className="slider"
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "12px",
                color: "#999",
                marginTop: "8px",
              }}
            >
              <span>Low Impact</span>
              <span>High Impact</span>
            </div>
          </div>

          {/* Joyfulness Slider */}
          <div className="slider-group">
            <div className="slider-label">
              <label className="form-label">Joyfulness Level (1-7) *</label>
              <span className="slider-value">{formData.joyfulness}</span>
            </div>
            <input
              type="range"
              min="1"
              max="7"
              value={formData.joyfulness}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  joyfulness: parseInt(e.target.value),
                })
              }
              className="slider"
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "12px",
                color: "#999",
                marginTop: "8px",
              }}
            >
              <span>Less Joyful</span>
              <span>Very Joyful</span>
            </div>
          </div>

          {/* Calculated Zone */}
          <div
            style={{
              padding: "20px",
              background: `${zone.color}15`,
              borderRadius: "12px",
              border: `2px solid ${zone.color}`,
              marginBottom: "24px",
            }}
          >
            <div
              style={{
                fontSize: "14px",
                color: "#666",
                marginBottom: "8px",
              }}
            >
              Your calculated mood zone:
            </div>
            <div
              style={{
                fontSize: "24px",
                fontWeight: "700",
                color: zone.color,
              }}
            >
              {zone.name}
            </div>
          </div>

          {/* Optional Note */}
          <div className="form-group">
            <label className="form-label">
              Additional notes (optional)
            </label>
            <textarea
              className="form-textarea"
              placeholder="What's on your mind? Any context you'd like to add..."
              value={formData.note}
              onChange={(e) =>
                setFormData({ ...formData, note: e.target.value })
              }
            />
          </div>

          {/* Actions */}
          <div className="modal-actions">
            <button
              className="btn btn-secondary"
              onClick={() => navigate("/student/dashboard")}
            >
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleSubmit}>
              Submit Mood Log
            </button>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3 className="modal-title">Confirm Mood Log</h3>
              <button
                className="modal-close"
                onClick={() => setShowConfirmModal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div
                style={{
                  background: "#f9f9f9",
                  padding: "20px",
                  borderRadius: "12px",
                  marginBottom: "20px",
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gap: "16px",
                  }}
                >
                  <div>
                    <div
                      style={{ fontSize: "12px", color: "#888", marginBottom: "4px" }}
                    >
                      Date & Time
                    </div>
                    <div style={{ fontWeight: "600" }}>
                      {formData.date} at {formData.time}
                    </div>
                  </div>
                  <div>
                    <div
                      style={{ fontSize: "12px", color: "#888", marginBottom: "4px" }}
                    >
                      Emotion
                    </div>
                    <div style={{ fontWeight: "600" }}>
                      {formData.category} - {formData.subcategory}
                    </div>
                  </div>
                  <div>
                    <div
                      style={{ fontSize: "12px", color: "#888", marginBottom: "4px" }}
                    >
                      Impact & Joyfulness
                    </div>
                    <div style={{ fontWeight: "600" }}>
                      Impact: {formData.impact}/7 | Joyfulness:{" "}
                      {formData.joyfulness}/7
                    </div>
                  </div>
                  <div>
                    <div
                      style={{ fontSize: "12px", color: "#888", marginBottom: "4px" }}
                    >
                      Calculated Zone
                    </div>
                    <div style={{ fontWeight: "600", color: zone.color }}>
                      {zone.name}
                    </div>
                  </div>
                  {formData.note && (
                    <div>
                      <div
                        style={{
                          fontSize: "12px",
                          color: "#888",
                          marginBottom: "4px",
                        }}
                      >
                        Note
                      </div>
                      <div style={{ fontWeight: "500" }}>{formData.note}</div>
                    </div>
                  )}
                </div>
              </div>
              <p style={{ color: "#666", fontSize: "14px" }}>
                Please review your mood log details before submitting.
              </p>
            </div>
            <div className="modal-actions">
              <button
                className="btn btn-secondary"
                onClick={() => setShowConfirmModal(false)}
              >
                Go Back
              </button>
              <button
                className="btn btn-primary"
                onClick={handleConfirm}
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <FiCheck /> Confirm & Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogMood;


