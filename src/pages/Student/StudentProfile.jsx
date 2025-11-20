import React, { useState } from "react";
import { FiEdit, FiSave, FiX } from "react-icons/fi";
import "./Student.css";

const StudentProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "Sarah",
    middleName: "Marie",
    lastName: "Johnson",
    dob: "2008-05-15",
    gender: "Female",
    mobile: "+1 (555) 123-4567",
    email: "sarah.johnson@email.com",
    address: "123 Maple Street, Springfield, IL 62701",
    city: "Springfield",
    state: "Illinois",
    country: "United States",
    zipCode: "62701",
  });

  const guardianData = {
    primary: {
      name: "Michael Johnson",
      relationship: "Father",
      mobile: "+1 (555) 987-6543",
      email: "michael.johnson@email.com",
      occupation: "Software Engineer",
    },
    secondary: {
      name: "Emily Johnson",
      relationship: "Mother",
      mobile: "+1 (555) 876-5432",
      email: "emily.johnson@email.com",
      occupation: "Teacher",
    },
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // Save logic here
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data to original values
  };

  return (
    <div className="student-container">
      {/* Profile Header */}
      <div className="profile-header">
        <div className="profile-avatar">
          {formData.firstName.charAt(0)}
          {formData.lastName.charAt(0)}
        </div>
        <div className="profile-info" style={{ flex: 1 }}>
          <h2>
            {formData.firstName} {formData.middleName} {formData.lastName}
          </h2>
          <p>{formData.email}</p>
          <p style={{ marginTop: "4px" }}>
            Student ID: <strong>STU-2024-0156</strong>
          </p>
        </div>
        {!isEditing ? (
          <button
            className="btn btn-primary"
            onClick={() => setIsEditing(true)}
            style={{ display: "flex", alignItems: "center", gap: "8px" }}
          >
            <FiEdit /> Edit Profile
          </button>
        ) : (
          <div style={{ display: "flex", gap: "12px" }}>
            <button
              className="btn btn-primary"
              onClick={handleSave}
              style={{ display: "flex", alignItems: "center", gap: "8px" }}
            >
              <FiSave /> Save
            </button>
            <button
              className="btn btn-secondary"
              onClick={handleCancel}
              style={{ display: "flex", alignItems: "center", gap: "8px" }}
            >
              <FiX /> Cancel
            </button>
          </div>
        )}
      </div>

      {/* Personal Information */}
      <div className="profile-details">
        <div className="section-title">Personal Information</div>
        {isEditing ? (
          <div className="detail-grid">
            <div className="form-group">
              <label className="form-label">First Name</label>
              <input
                type="text"
                className="form-input"
                value={formData.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Middle Name</label>
              <input
                type="text"
                className="form-input"
                value={formData.middleName}
                onChange={(e) => handleChange("middleName", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Last Name</label>
              <input
                type="text"
                className="form-input"
                value={formData.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Date of Birth</label>
              <input
                type="date"
                className="form-input"
                value={formData.dob}
                onChange={(e) => handleChange("dob", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Gender</label>
              <select
                className="form-select"
                value={formData.gender}
                onChange={(e) => handleChange("gender", e.target.value)}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Mobile Number</label>
              <input
                type="tel"
                className="form-input"
                value={formData.mobile}
                onChange={(e) => handleChange("mobile", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-input"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Address</label>
              <input
                type="text"
                className="form-input"
                value={formData.address}
                onChange={(e) => handleChange("address", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">City</label>
              <input
                type="text"
                className="form-input"
                value={formData.city}
                onChange={(e) => handleChange("city", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">State</label>
              <input
                type="text"
                className="form-input"
                value={formData.state}
                onChange={(e) => handleChange("state", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Country</label>
              <input
                type="text"
                className="form-input"
                value={formData.country}
                onChange={(e) => handleChange("country", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Zip Code</label>
              <input
                type="text"
                className="form-input"
                value={formData.zipCode}
                onChange={(e) => handleChange("zipCode", e.target.value)}
              />
            </div>
          </div>
        ) : (
          <div className="detail-grid">
            <div className="detail-item">
              <span className="detail-label">First Name</span>
              <span className="detail-value">{formData.firstName}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Middle Name</span>
              <span className="detail-value">{formData.middleName}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Last Name</span>
              <span className="detail-value">{formData.lastName}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Date of Birth</span>
              <span className="detail-value">{formData.dob}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Gender</span>
              <span className="detail-value">{formData.gender}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Mobile Number</span>
              <span className="detail-value">{formData.mobile}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Email Address</span>
              <span className="detail-value">{formData.email}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Address</span>
              <span className="detail-value">{formData.address}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">City</span>
              <span className="detail-value">{formData.city}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">State</span>
              <span className="detail-value">{formData.state}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Country</span>
              <span className="detail-value">{formData.country}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Zip Code</span>
              <span className="detail-value">{formData.zipCode}</span>
            </div>
          </div>
        )}
      </div>

      {/* Guardian Information - Primary */}
      <div className="profile-details">
        <div className="section-title">Primary Guardian / Parent Contact</div>
        <div className="detail-grid">
          <div className="detail-item">
            <span className="detail-label">Name</span>
            <span className="detail-value">{guardianData.primary.name}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Relationship</span>
            <span className="detail-value">
              {guardianData.primary.relationship}
            </span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Mobile Number</span>
            <span className="detail-value">{guardianData.primary.mobile}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Email Address</span>
            <span className="detail-value">{guardianData.primary.email}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Occupation</span>
            <span className="detail-value">
              {guardianData.primary.occupation}
            </span>
          </div>
        </div>
      </div>

      {/* Guardian Information - Secondary */}
      <div className="profile-details">
        <div className="section-title">Secondary Guardian / Parent Contact</div>
        <div className="detail-grid">
          <div className="detail-item">
            <span className="detail-label">Name</span>
            <span className="detail-value">{guardianData.secondary.name}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Relationship</span>
            <span className="detail-value">
              {guardianData.secondary.relationship}
            </span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Mobile Number</span>
            <span className="detail-value">
              {guardianData.secondary.mobile}
            </span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Email Address</span>
            <span className="detail-value">{guardianData.secondary.email}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Occupation</span>
            <span className="detail-value">
              {guardianData.secondary.occupation}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;


