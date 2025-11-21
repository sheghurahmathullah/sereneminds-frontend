import React, { useState } from "react";
import { FiMail, FiMessageCircle, FiSend, FiCopy, FiCheck, FiEdit, FiEye } from "react-icons/fi";
import "./Student.css";

const Referrals = () => {
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showOverview, setShowOverview] = useState(false);
  const [inviteMethod, setInviteMethod] = useState("");
  const [editingInvite, setEditingInvite] = useState(null);
  const [inviteForm, setInviteForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [copied, setCopied] = useState(false);

  // Static referral data
  const referralCode = "SERENE-SJ2024";
  const referralLink = "https://sereneminds.app/join?ref=SERENE-SJ2024";

  const inviteStats = {
    totalSent: 12,
    accepted: 5,
    pending: 4,
    declined: 3,
    pointsEarned: 500,
  };

  const sentInvites = [
    {
      id: 1,
      name: "Emily Chen",
      email: "emily.chen@email.com",
      method: "Email",
      status: "accepted",
      sentDate: "2024-01-10",
      acceptedDate: "2024-01-12",
    },
    {
      id: 2,
      name: "Marcus Johnson",
      email: "marcus.j@email.com",
      method: "Email",
      status: "accepted",
      sentDate: "2024-01-08",
      acceptedDate: "2024-01-09",
    },
    {
      id: 3,
      name: "Sarah Williams",
      phone: "+1 (555) 234-5678",
      method: "SMS",
      status: "pending",
      sentDate: "2024-01-14",
      acceptedDate: null,
    },
    {
      id: 4,
      name: "David Lee",
      email: "david.lee@email.com",
      method: "Email",
      status: "accepted",
      sentDate: "2024-01-05",
      acceptedDate: "2024-01-07",
    },
    {
      id: 5,
      name: "Jessica Brown",
      phone: "+1 (555) 345-6789",
      method: "WhatsApp",
      status: "pending",
      sentDate: "2024-01-13",
      acceptedDate: null,
    },
    {
      id: 6,
      name: "Alex Martinez",
      email: "alex.m@email.com",
      method: "Email",
      status: "declined",
      sentDate: "2024-01-03",
      acceptedDate: null,
    },
    {
      id: 7,
      name: "Olivia Taylor",
      email: "olivia.t@email.com",
      method: "Email",
      status: "accepted",
      sentDate: "2024-01-02",
      acceptedDate: "2024-01-04",
    },
    {
      id: 8,
      name: "Ryan Anderson",
      phone: "+1 (555) 456-7890",
      method: "SMS",
      status: "pending",
      sentDate: "2024-01-15",
      acceptedDate: null,
    },
  ];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleInviteSubmit = (e) => {
    e.preventDefault();
    if (editingInvite) {
      alert(`Invite updated successfully!`);
      setEditingInvite(null);
    } else {
      alert(`Invite sent via ${inviteMethod}!`);
    }
    setShowInviteModal(false);
    setInviteForm({ name: "", email: "", phone: "", message: "" });
    setInviteMethod("");
  };

  const getStatusBadge = (status) => {
    const styles = {
      accepted: { bg: "rgba(46, 213, 115, 0.15)", color: "#27ae60" },
      pending: { bg: "rgba(241, 196, 15, 0.15)", color: "#f39c12" },
      declined: { bg: "rgba(149, 165, 166, 0.15)", color: "#7f8c8d" },
    };
    const style = styles[status];
    return (
      <span
        style={{
          padding: "6px 14px",
          borderRadius: "20px",
          fontSize: "12px",
          fontWeight: "600",
          textTransform: "uppercase",
          letterSpacing: "0.5px",
          background: style.bg,
          color: style.color,
        }}
      >
        {status}
      </span>
    );
  };

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
          Invite Friends
        </h2>
        <p style={{ color: "#888", marginTop: "6px", fontSize: "14px" }}>
          Share Serene Minds with friends and earn rewards together
        </p>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-card-title">Total Sent</span>
            <div
              className="stat-card-icon"
              style={{ background: "#74b9ff" }}
            >
              📤
            </div>
          </div>
          <div className="stat-card-value">{inviteStats.totalSent}</div>
          <div className="stat-card-subtitle">invitations</div>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-card-title">Accepted</span>
            <div
              className="stat-card-icon"
              style={{ background: "#00b894" }}
            >
              ✅
            </div>
          </div>
          <div className="stat-card-value">{inviteStats.accepted}</div>
          <div className="stat-card-subtitle">friends joined</div>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-card-title">Pending</span>
            <div
              className="stat-card-icon"
              style={{ background: "#fdcb6e" }}
            >
              ⏳
            </div>
          </div>
          <div className="stat-card-value">{inviteStats.pending}</div>
          <div className="stat-card-subtitle">awaiting response</div>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-card-title">Points Earned</span>
            <div
              className="stat-card-icon"
              style={{ background: "#a29bfe" }}
            >
              ⭐
            </div>
          </div>
          <div className="stat-card-value">{inviteStats.pointsEarned}</div>
          <div className="stat-card-subtitle">reward points</div>
        </div>
      </div>

      {/* Referral Code Section */}
      <div
        style={{
          background: "linear-gradient(135deg, #00c7b7 0%, #009e8e 100%)",
          borderRadius: "16px",
          padding: "32px",
          color: "#fff",
          marginBottom: "24px",
          boxShadow: "0 4px 20px rgba(0, 199, 183, 0.2)",
        }}
      >
        <h3
          style={{
            fontSize: "20px",
            fontWeight: "700",
            marginBottom: "16px",
          }}
        >
          Your Personal Referral Code
        </h3>
        <div
          style={{
            background: "rgba(255, 255, 255, 0.2)",
            borderRadius: "12px",
            padding: "20px",
            marginBottom: "20px",
          }}
        >
          <div style={{ fontSize: "14px", opacity: 0.9, marginBottom: "8px" }}>
            Referral Code
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "16px",
            }}
          >
            <div
              style={{
                fontSize: "24px",
                fontWeight: "700",
                letterSpacing: "2px",
              }}
            >
              {referralCode}
            </div>
            <button
              onClick={handleCopyCode}
              style={{
                background: "#fff",
                color: "#00c7b7",
                border: "none",
                borderRadius: "10px",
                padding: "10px 20px",
                fontWeight: "600",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                transition: "all 0.2s",
              }}
            >
              {copied ? <FiCheck /> : <FiCopy />}
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>

        <div
          style={{
            background: "rgba(255, 255, 255, 0.2)",
            borderRadius: "12px",
            padding: "20px",
          }}
        >
          <div style={{ fontSize: "14px", opacity: 0.9, marginBottom: "8px" }}>
            Referral Link
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "16px",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                fontSize: "14px",
                fontWeight: "600",
                wordBreak: "break-all",
                flex: 1,
              }}
            >
              {referralLink}
            </div>
            <button
              onClick={handleCopyLink}
              style={{
                background: "#fff",
                color: "#00c7b7",
                border: "none",
                borderRadius: "10px",
                padding: "10px 20px",
                fontWeight: "600",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                transition: "all 0.2s",
              }}
            >
              {copied ? <FiCheck /> : <FiCopy />}
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      </div>

      {/* Invite Methods */}
      <div
        style={{
          background: "#fff",
          borderRadius: "14px",
          padding: "28px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
          marginBottom: "24px",
        }}
      >
        <h3
          style={{
            fontSize: "18px",
            fontWeight: "700",
            marginBottom: "20px",
            color: "#222",
          }}
        >
          Send an Invite
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "16px",
          }}
        >
          <button
            onClick={() => {
              setInviteMethod("email");
              setShowInviteModal(true);
            }}
            style={{
              background: "#f9f9f9",
              border: "2px solid #e0e0e0",
              borderRadius: "12px",
              padding: "24px",
              cursor: "pointer",
              transition: "all 0.2s",
              textAlign: "center",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#00c7b7";
              e.currentTarget.style.background = "#fff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#e0e0e0";
              e.currentTarget.style.background = "#f9f9f9";
            }}
          >
            <FiMail size={32} color="#00c7b7" style={{ marginBottom: "12px" }} />
            <div style={{ fontWeight: "600", fontSize: "16px", color: "#222" }}>
              Email
            </div>
            <div style={{ fontSize: "13px", color: "#888", marginTop: "4px" }}>
              Send via email
            </div>
          </button>

          <button
            onClick={() => {
              setInviteMethod("whatsapp");
              setShowInviteModal(true);
            }}
            style={{
              background: "#f9f9f9",
              border: "2px solid #e0e0e0",
              borderRadius: "12px",
              padding: "24px",
              cursor: "pointer",
              transition: "all 0.2s",
              textAlign: "center",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#00c7b7";
              e.currentTarget.style.background = "#fff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#e0e0e0";
              e.currentTarget.style.background = "#f9f9f9";
            }}
          >
            <FiMessageCircle
              size={32}
              color="#00c7b7"
              style={{ marginBottom: "12px" }}
            />
            <div style={{ fontWeight: "600", fontSize: "16px", color: "#222" }}>
              WhatsApp
            </div>
            <div style={{ fontSize: "13px", color: "#888", marginTop: "4px" }}>
              Share on WhatsApp
            </div>
          </button>

          <button
            onClick={() => {
              setInviteMethod("sms");
              setShowInviteModal(true);
            }}
            style={{
              background: "#f9f9f9",
              border: "2px solid #e0e0e0",
              borderRadius: "12px",
              padding: "24px",
              cursor: "pointer",
              transition: "all 0.2s",
              textAlign: "center",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#00c7b7";
              e.currentTarget.style.background = "#fff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#e0e0e0";
              e.currentTarget.style.background = "#f9f9f9";
            }}
          >
            <FiSend size={32} color="#00c7b7" style={{ marginBottom: "12px" }} />
            <div style={{ fontWeight: "600", fontSize: "16px", color: "#222" }}>
              SMS
            </div>
            <div style={{ fontSize: "13px", color: "#888", marginTop: "4px" }}>
              Send text message
            </div>
          </button>
        </div>
      </div>

      {/* Sent Invites */}
      <div
        style={{
          background: "#fff",
          borderRadius: "14px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
          overflow: "hidden",
        }}
      >
        <div style={{ padding: "24px 28px" }}>
          <h3
            style={{
              fontSize: "18px",
              fontWeight: "700",
              margin: 0,
              color: "#222",
            }}
          >
            Sent Invitations
          </h3>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Contact</th>
              <th>Method</th>
              <th>Sent Date</th>
              <th>Status</th>
              <th>Accepted Date</th>
              <th className="action-cell" style={{ width: "80px" }}>Edit</th>
              <th className="action-cell" style={{ width: "80px" }}>Overview</th>
            </tr>
          </thead>
          <tbody>
            {sentInvites.map((invite) => (
              <tr key={invite.id}>
                <td style={{ fontWeight: "600", color: "#222" }}>
                  {invite.name}
                </td>
                <td style={{ fontSize: "14px", color: "#666" }}>
                  {invite.email || invite.phone}
                </td>
                <td>
                  <span
                    style={{
                      padding: "6px 12px",
                      background: "#f9f9f9",
                      borderRadius: "8px",
                      fontSize: "13px",
                      fontWeight: "600",
                    }}
                  >
                    {invite.method}
                  </span>
                </td>
                <td style={{ fontSize: "14px", color: "#666" }}>
                  {invite.sentDate}
                </td>
                <td>{getStatusBadge(invite.status)}</td>
                <td style={{ fontSize: "14px", color: "#666" }}>
                  {invite.acceptedDate || "—"}
                </td>
                <td className="action-cell">
                  {invite.status === "pending" ? (
                    <button
                      onClick={() => {
                        setEditingInvite(invite);
                        setInviteMethod(invite.method.toLowerCase());
                        setInviteForm({
                          name: invite.name,
                          email: invite.email || "",
                          phone: invite.phone || "",
                          message: "",
                        });
                        setShowInviteModal(true);
                      }}
                      title="Edit Invite"
                      style={{
                        background: "none",
                        border: "none",
                        color: "#f39c12",
                        cursor: "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "0",
                        borderRadius: "6px",
                        transition: "all 0.2s",
                        width: "32px",
                        height: "32px",
                        minWidth: "32px",
                        minHeight: "32px",
                        margin: "0 auto",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#fff5e6";
                        e.currentTarget.style.transform = "scale(1.1)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "none";
                        e.currentTarget.style.transform = "scale(1)";
                      }}
                    >
                      <FiEdit size={18} style={{ display: "block" }} />
                    </button>
                  ) : (
                    <span style={{ color: "#ccc" }}>—</span>
                  )}
                </td>
                <td className="action-cell">
                  <button
                    onClick={() => setShowOverview(true)}
                    title="View Overview"
                    style={{
                      background: "none",
                      border: "none",
                      color: "#00c7b7",
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "0",
                      borderRadius: "6px",
                      transition: "all 0.2s",
                      width: "32px",
                      height: "32px",
                      minWidth: "32px",
                      minHeight: "32px",
                      margin: "0 auto",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#e6fffa";
                      e.currentTarget.style.transform = "scale(1.1)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "none";
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  >
                    <FiEye size={18} style={{ display: "block" }} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="modal-overlay" onClick={() => setShowInviteModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">
                {editingInvite ? "Edit Invite" : `Send Invite via ${inviteMethod === "email" ? "Email" : inviteMethod === "whatsapp" ? "WhatsApp" : "SMS"}`}
              </h3>
              <button
                className="modal-close"
                onClick={() => setShowInviteModal(false)}
              >
                ×
              </button>
            </div>
            <form onSubmit={handleInviteSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Friend's Name *</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Enter name"
                    value={inviteForm.name}
                    onChange={(e) =>
                      setInviteForm({ ...inviteForm, name: e.target.value })
                    }
                    required
                  />
                </div>

                {inviteMethod === "email" && (
                  <div className="form-group">
                    <label className="form-label">Email Address *</label>
                    <input
                      type="email"
                      className="form-input"
                      placeholder="friend@email.com"
                      value={inviteForm.email}
                      onChange={(e) =>
                        setInviteForm({ ...inviteForm, email: e.target.value })
                      }
                      required
                    />
                  </div>
                )}

                {(inviteMethod === "sms" || inviteMethod === "whatsapp") && (
                  <div className="form-group">
                    <label className="form-label">Phone Number *</label>
                    <input
                      type="tel"
                      className="form-input"
                      placeholder="+1 (555) 123-4567"
                      value={inviteForm.phone}
                      onChange={(e) =>
                        setInviteForm({ ...inviteForm, phone: e.target.value })
                      }
                      required
                    />
                  </div>
                )}

                <div className="form-group">
                  <label className="form-label">
                    Personal Message (optional)
                  </label>
                  <textarea
                    className="form-textarea"
                    placeholder="Add a personal note to your invitation..."
                    value={inviteForm.message}
                    onChange={(e) =>
                      setInviteForm({ ...inviteForm, message: e.target.value })
                    }
                  />
                </div>

                <div
                  style={{
                    padding: "16px",
                    background: "#f9f9f9",
                    borderRadius: "10px",
                    fontSize: "14px",
                    color: "#666",
                    lineHeight: "1.6",
                  }}
                >
                  Your referral link will be automatically included in the
                  invitation message.
                </div>
              </div>
              <div className="modal-actions">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowInviteModal(false);
                    setEditingInvite(null);
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <FiSend /> {editingInvite ? "Update Invite" : "Send Invite"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Overview Modal */}
      {showOverview && (
        <div className="modal-overlay" onClick={() => setShowOverview(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "700px" }}>
            <div className="modal-header">
              <h3 className="modal-title">Referrals Overview</h3>
              <button
                className="modal-close"
                onClick={() => setShowOverview(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div style={{ display: "grid", gap: "24px" }}>
                {/* Stats Grid */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }}>
                  <div style={{ padding: "20px", background: "#f9f9f9", borderRadius: "12px" }}>
                    <div style={{ fontSize: "12px", color: "#888", marginBottom: "8px" }}>Total Sent</div>
                    <div style={{ fontSize: "32px", fontWeight: "700", color: "#00c7b7" }}>
                      {inviteStats.totalSent}
                    </div>
                  </div>
                  <div style={{ padding: "20px", background: "#f9f9f9", borderRadius: "12px" }}>
                    <div style={{ fontSize: "12px", color: "#888", marginBottom: "8px" }}>Accepted</div>
                    <div style={{ fontSize: "32px", fontWeight: "700", color: "#00b894" }}>
                      {inviteStats.accepted}
                    </div>
                  </div>
                  <div style={{ padding: "20px", background: "#f9f9f9", borderRadius: "12px" }}>
                    <div style={{ fontSize: "12px", color: "#888", marginBottom: "8px" }}>Pending</div>
                    <div style={{ fontSize: "32px", fontWeight: "700", color: "#f39c12" }}>
                      {inviteStats.pending}
                    </div>
                  </div>
                  <div style={{ padding: "20px", background: "#f9f9f9", borderRadius: "12px" }}>
                    <div style={{ fontSize: "12px", color: "#888", marginBottom: "8px" }}>Points Earned</div>
                    <div style={{ fontSize: "32px", fontWeight: "700", color: "#a29bfe" }}>
                      {inviteStats.pointsEarned}
                    </div>
                  </div>
                </div>

                {/* Success Rate */}
                <div style={{ padding: "20px", background: "#f0f9ff", borderRadius: "12px", border: "2px solid #00c7b7" }}>
                  <div style={{ fontSize: "14px", color: "#666", marginBottom: "8px" }}>Acceptance Rate</div>
                  <div style={{ fontSize: "24px", fontWeight: "700", color: "#00c7b7" }}>
                    {Math.round((inviteStats.accepted / inviteStats.totalSent) * 100)}%
                  </div>
                  <div style={{ marginTop: "12px", fontSize: "13px", color: "#888" }}>
                    {inviteStats.accepted} out of {inviteStats.totalSent} invites accepted
                  </div>
                </div>

                {/* Recent Activity */}
                <div>
                  <div style={{ fontSize: "16px", fontWeight: "600", marginBottom: "16px" }}>Recent Activity</div>
                  <div style={{ display: "grid", gap: "12px" }}>
                    {sentInvites.slice(0, 5).map((invite) => (
                      <div
                        key={invite.id}
                        style={{
                          padding: "16px",
                          background: "#f9f9f9",
                          borderRadius: "10px",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <div>
                          <div style={{ fontWeight: "600", fontSize: "15px" }}>{invite.name}</div>
                          <div style={{ fontSize: "13px", color: "#888" }}>
                            {invite.method} · {invite.sentDate}
                          </div>
                        </div>
                        {getStatusBadge(invite.status)}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-actions">
              <button
                className="btn btn-secondary"
                onClick={() => setShowOverview(false)}
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

export default Referrals;


