import React, { useState, useEffect } from "react";
import "./Emotion.css";
import { FiMoreVertical, FiEdit, FiTrash2, FiEye } from "react-icons/fi";

const EMOTION_SCORES = [50, 60, 70, 75, 80, 90, 100];
const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

const Emotion = () => {
  const [emotions, setEmotions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("create"); // 'create' or 'edit'
  const [modalForm, setModalForm] = useState({ code: "", name: "", score: "" });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [overviewEmotion, setOverviewEmotion] = useState(null);

  // Fetch emotions from API
  const fetchEmotions = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://sereneminds-backend.onrender.com/api/emotions"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch emotions");
      }
      const data = await response.json();
      setEmotions(data);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching emotions:", err);
    } finally {
      setLoading(false);
    }
  };

  // Load emotions on component mount
  useEffect(() => {
    fetchEmotions();
  }, []);

  const toggleStatus = async (id) => {
    try {
      const response = await fetch(
        `https://sereneminds-backend.onrender.com/api/emotions/${id}/toggle-status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to toggle status");
      }
      const updatedEmotion = await response.json();
      setEmotions((prev) =>
        prev.map((e) => (e.id === id ? updatedEmotion : e))
      );
    } catch (err) {
      setError(err.message);
      console.error("Error toggling status:", err);
    }
  };

  const openCreate = () => {
    setModalType("create");
    setModalForm({ code: "", name: "", score: "" });
    setEditingId(null);
    setShowModal(true);
  };

  const openEdit = (id) => {
    const emotion = emotions.find((e) => e.id === id);
    setModalType("edit");
    setModalForm({
      code: emotion ? emotion.code : "",
      name: emotion ? emotion.name : "",
      score: emotion ? emotion.score : "",
    });
    setEditingId(id);
    setShowModal(true);
  };

  const handleModalChange = (e) => {
    setModalForm({ ...modalForm, [e.target.name]: e.target.value });
  };

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    if (!modalForm.name.trim() || !modalForm.score) return;

    try {
      setLoading(true);
      setError("");

      if (modalType === "edit" && editingId) {
        // Update existing emotion
        const response = await fetch(
          `https://sereneminds-backend.onrender.com/api/emotions/${editingId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: modalForm.name,
              score: Number(modalForm.score),
            }),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to update emotion");
        }
        const updatedEmotion = await response.json();
        setEmotions((prev) =>
          prev.map((e) => (e.id === editingId ? updatedEmotion : e))
        );
      } else {
        // Create new emotion
        const response = await fetch(
          "https://sereneminds-backend.onrender.com/api/emotions",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: modalForm.name,
              code: (
                Math.floor(Math.random() * 90000000) + 10000000
              ).toString(),
              score: Number(modalForm.score),
            }),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to create emotion");
        }
        const newEmotion = await response.json();
        setEmotions([newEmotion, ...emotions]);
      }
      setShowModal(false);
      setModalForm({ code: "", name: "", score: "" });
      setEditingId(null);
    } catch (err) {
      setError(err.message);
      console.error("Error saving emotion:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleModalCancel = () => {
    setShowModal(false);
    setModalForm({ code: "", name: "", score: "" });
    setEditingId(null);
  };

  const filteredEmotions = emotions.filter((e) =>
    e.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const total = filteredEmotions.length;
  const totalPages = Math.ceil(total / pageSize);
  const startIdx = (page - 1) * pageSize;
  const endIdx = Math.min(startIdx + pageSize, total);
  const paginated = filteredEmotions.slice(startIdx, endIdx);

  // DELETE emotion
  const handleDelete = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://sereneminds-backend.onrender.com/api/emotions/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete emotion");
      }
      setEmotions((prev) => prev.filter((e) => e.id !== id));
      setDeleteConfirmId(null);
      if (overviewEmotion && overviewEmotion.id === id)
        setOverviewEmotion(null);
    } catch (err) {
      setError(err.message);
      console.error("Error deleting emotion:", err);
    } finally {
      setLoading(false);
    }
  };

  // Overview
  const handleOverview = (emotion) => {
    setOverviewEmotion(emotion);
  };

  if (overviewEmotion) {
    return (
      <div className="emotion-modal-overlay">
        <div className="emotion-modal">
          <h3
            style={{
              marginBottom: 24,
              fontWeight: 600,
              fontSize: 20,
              color: "#222",
            }}
          >
            Emotion Overview
          </h3>
          <div style={{ marginBottom: 16 }}>
            <strong>Emotion Name:</strong> {overviewEmotion.name}
          </div>
          <div style={{ marginBottom: 16 }}>
            <strong>Emotion Score:</strong> {overviewEmotion.score}
          </div>
          <div style={{ marginBottom: 16 }}>
            <strong>Status:</strong>{" "}
            {overviewEmotion.status ? "Active" : "Inactive"}
          </div>
          <div style={{ display: "flex", gap: 16, justifyContent: "flex-end" }}>
            <button
              className="emotion-cancel-btn"
              onClick={() => setOverviewEmotion(null)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="emotion-container">
      <div className="emotion-header">
        <select
          className="emotion-dropdown"
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            setPage(1);
          }}
        >
          {PAGE_SIZE_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Search"
          className="emotion-search-input"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(1);
          }}
        />
        <div className="emotion-actions">
          <button className="emotion-create-btn" onClick={openCreate}>
            + Create
          </button>
        </div>
      </div>
      {error && (
        <div style={{ color: "red", textAlign: "center", marginBottom: 16 }}>
          {error}
        </div>
      )}
      {loading && !showModal ? (
        <div style={{ textAlign: "center", padding: "50px" }}>
          Loading emotions...
        </div>
      ) : (
        <div className="emotion-table-scroll">
          <table className="emotion-table">
            <thead>
              <tr>
                <th>Emotion Name</th>
                <th>Emotion Score</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((e) => (
                <tr key={e.id}>
                  <td>
                    <div className="emotion-name">{e.name}</div>
                    <div className="emotion-code">{e.code}</div>
                  </td>
                  <td style={{ fontWeight: 600, fontSize: 15 }}>{e.score}</td>
                  <td>
                    <label className="emotion-switch">
                      <input
                        type="checkbox"
                        checked={e.status}
                        onChange={() => toggleStatus(e.id)}
                      />
                      <span className="emotion-slider round"></span>
                    </label>
                  </td>
                  <td style={{ display: "flex", gap: 8 }}>
                    <button
                      className="emotion-edit-btn"
                      onClick={() => openEdit(e.id)}
                    >
                      <FiEdit size={16} />
                    </button>
                    <button
                      className="emotion-edit-btn"
                      title="Overview"
                      onClick={() => handleOverview(e)}
                    >
                      <FiEye size={16} />
                    </button>
                    <button
                      className="emotion-edit-btn"
                      title="Delete"
                      onClick={() => setDeleteConfirmId(e.id)}
                    >
                      <FiTrash2 size={16} style={{ color: "#e74c3c" }} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="emotion-footer">
        <div className="footer-text">
          Showing {total === 0 ? 0 : startIdx + 1} to {endIdx} of {total}{" "}
          entries
        </div>
        <div className="emotion-pagination">
          <button disabled={page === 1} onClick={() => setPage(page - 1)}>
            &lt;
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              className={page === i + 1 ? "active" : ""}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            disabled={page === totalPages || totalPages === 0}
            onClick={() => setPage(page + 1)}
          >
            &gt;
          </button>
        </div>
      </div>
      {showModal && (
        <div className="emotion-modal-overlay">
          <div className="emotion-modal">
            <h3
              style={{
                marginBottom: 24,
                fontWeight: 600,
                fontSize: 20,
                color: "#222",
              }}
            >
              {modalType === "edit" ? "Edit Emotion" : "Add New Emotion"}
            </h3>
            <form onSubmit={handleModalSubmit}>
              {modalType === "edit" && (
                <div style={{ marginBottom: 18 }}>
                  <label
                    style={{
                      display: "block",
                      marginBottom: 8,
                      color: "#888",
                      fontSize: 15,
                    }}
                  >
                    Emotion Code
                  </label>
                  <input
                    className="emotion-input readonly"
                    value={modalForm.code}
                    name="code"
                    readOnly
                  />
                </div>
              )}
              <div style={{ marginBottom: 18 }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: 8,
                    color: "#888",
                    fontSize: 15,
                  }}
                >
                  Emotion Name
                </label>
                <input
                  className="emotion-input"
                  value={modalForm.name}
                  name="name"
                  onChange={handleModalChange}
                  placeholder="Emotion Name"
                  autoFocus
                />
              </div>
              <div style={{ marginBottom: 24 }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: 8,
                    color: "#888",
                    fontSize: 15,
                  }}
                >
                  Emotion Score
                </label>
                <select
                  className="emotion-input"
                  value={modalForm.score}
                  name="score"
                  onChange={handleModalChange}
                >
                  <option value="">Select Emotion Score</option>
                  {EMOTION_SCORES.map((score) => (
                    <option key={score} value={score}>
                      {score}
                    </option>
                  ))}
                </select>
              </div>
              <div
                style={{ display: "flex", gap: 16, justifyContent: "flex-end" }}
              >
                <button
                  type="button"
                  className="emotion-cancel-btn"
                  onClick={handleModalCancel}
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="emotion-submit-btn"
                  disabled={loading}
                >
                  {loading
                    ? "Saving..."
                    : modalType === "edit"
                    ? "Update"
                    : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="emotion-modal-overlay">
          <div className="emotion-modal">
            <div>Are you sure you want to delete this emotion?</div>
            <div className="emotion-actions">
              <button
                className="emotion-cancel-btn"
                onClick={() => setDeleteConfirmId(null)}
              >
                Cancel
              </button>
              <button
                className="emotion-submit-btn"
                onClick={() => handleDelete(deleteConfirmId)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Emotion;
