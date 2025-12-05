import React, { useState, useEffect } from "react";
import "./Styles/LogMood.css";
import { FiEdit, FiTrash2, FiEye } from "react-icons/fi";
import axios from "axios";
import API_BASE_URL from "../../config/api";

const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

const LogMood = () => {
  const [moods, setMoods] = useState([]);
  const [emotions, setEmotions] = useState([]);
  const [zones, setZones] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("create");
  const [modalForm, setModalForm] = useState({
    code: "",
    name: "",
    emotionId: "",
    zoneId: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [overviewMood, setOverviewMood] = useState(null);

  const SERVER_URL = `${API_BASE_URL}/moods`;
  const SERVER_URL_EMOTIONS = `${API_BASE_URL}/emotions`;
  const SERVER_URL_ZONES = `${API_BASE_URL}/zones`;

  // Fetch moods from API
  const fetchMoods = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${SERVER_URL}`);
      if (!response.status) {
        throw new Error("Failed to fetch moods");
      }
      const data = await response.data;
      setMoods(data);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching moods:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch emotions from API
  const fetchEmotions = async () => {
    try {
      const response = await axios.get(`${SERVER_URL_EMOTIONS}`);
      if (!response.status) {
        throw new Error("Failed to fetch emotions");
      }
      const data = await response.data;
      setEmotions(data);
    } catch (err) {
      console.error("Error fetching emotions:", err);
    }
  };

  // Fetch zones from API
  const fetchZones = async () => {
    try {
      const response = await axios.get(`${SERVER_URL_ZONES}`);
      if (!response.status) {
        throw new Error("Failed to fetch zones");
      }
      const data = await response.data;
      setZones(data);
    } catch (err) {
      console.error("Error fetching zones:", err);
    }
  };

  // Load data on component mount
  useEffect(() => {
    fetchMoods();
    fetchEmotions();
    fetchZones();
  }, []);

  const toggleStatus = async (id) => {
    try {
      const response = await axios.patch(`${SERVER_URL}/${id}/toggle-status`);
      if (!response.status) {
        throw new Error("Failed to toggle status");
      }
      const data = await response.data;
      setMoods((prev) => prev.map((p) => (p.id === id ? data : p)));
    } catch (err) {
      setError(err.message);
      console.error("Error toggling status:", err);
    }
  };

  const openCreate = () => {
    setModalType("create");
    setModalForm({ code: "", name: "", emotionId: "", zoneId: "" });
    setEditingId(null);
    setShowModal(true);
  };

  const openEdit = (id) => {
    const mood = moods.find((m) => m.id === id);
    setModalType("edit");
    setModalForm({
      code: mood ? mood.code : "",
      name: mood ? mood.name : "",
      emotionId: mood ? mood.emotionId : "",
      zoneId: mood ? mood.zoneId : "",
    });
    setEditingId(id);
    setShowModal(true);
  };

  const handleModalChange = (e) => {
    const updatedForm = { ...modalForm, [e.target.name]: e.target.value };
    
    // Auto-generate name when emotion and zone are selected
    if (e.target.name === "emotionId" || e.target.name === "zoneId") {
      const emotionId = e.target.name === "emotionId" ? e.target.value : updatedForm.emotionId;
      const zoneId = e.target.name === "zoneId" ? e.target.value : updatedForm.zoneId;
      
      if (emotionId && zoneId) {
        const selectedEmotion = emotions.find((em) => em.id === Number(emotionId));
        const selectedZone = zones.find((z) => z.id === Number(zoneId));
        if (selectedEmotion && selectedZone) {
          const zoneDisplay = selectedZone.description || selectedZone.name;
          updatedForm.name = `${selectedEmotion.name} - ${zoneDisplay}`;
        }
      }
    }
    
    setModalForm(updatedForm);
  };

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    if (!modalForm.name.trim() || !modalForm.emotionId || !modalForm.zoneId) return;

    try {
      setLoading(true);
      setError("");

      if (editingId) {
        const res = await axios.put(`${SERVER_URL}/${editingId}`, {
          name: modalForm.name,
          emotionId: Number(modalForm.emotionId),
          zoneId: Number(modalForm.zoneId),
        });

        if (!res.status) {
          throw new Error(`Failed to update mood`);
        }
        fetchMoods();
      } else {
        const res = await axios.post(`${SERVER_URL}`, {
          name: modalForm.name,
          emotionId: Number(modalForm.emotionId),
          zoneId: Number(modalForm.zoneId),
        });

        console.log(res.data);
        fetchMoods();

        if (!res.status) {
          throw new Error(`Failed to create mood`);
        }
      }

      setShowModal(false);
      setModalForm({ code: "", name: "", emotionId: "", zoneId: "" });
      setEditingId(null);
    } catch (err) {
      setError(err.message);
      console.error(`Error saving mood:`, err);
    } finally {
      setLoading(false);
    }
  };

  const handleModalCancel = () => {
    setShowModal(false);
    setModalForm({ code: "", name: "", emotionId: "", zoneId: "" });
    setEditingId(null);
  };

  const filteredMoods = moods.filter((m) =>
    m.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.emotion?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.zone?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const total = filteredMoods.length;
  const totalPages = Math.ceil(total / pageSize);
  const startIdx = (page - 1) * pageSize;
  const endIdx = Math.min(startIdx + pageSize, total);
  const paginated = filteredMoods.slice(startIdx, endIdx);

  // DELETE mood
  const handleDelete = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(`${SERVER_URL}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete mood");
      }

      fetchMoods();
      setDeleteConfirmId(null);
      if (overviewMood && overviewMood.id === id) setOverviewMood(null);
    } catch (err) {
      setError(err.message);
      console.error("Error deleting mood:", err);
    } finally {
      setLoading(false);
    }
  };

  // Overview
  const handleOverview = (mood) => {
    setOverviewMood(mood);
  };

  if (overviewMood) {
    return (
      <div className="logmood-modal-overlay">
        <div className="logmood-modal">
          <h3
            style={{
              marginBottom: 24,
              fontWeight: 600,
              fontSize: 20,
              color: "#222",
            }}
          >
            Mood Overview
          </h3>
          <div style={{ marginBottom: 16 }}>
            <strong>Mood Name:</strong> {overviewMood.name}
          </div>
          <div style={{ marginBottom: 16 }}>
            <strong>Mood Code:</strong> {overviewMood.code}
          </div>
          <div style={{ marginBottom: 16 }}>
            <strong>Emotion:</strong>{" "}
            {overviewMood.emotion ? overviewMood.emotion.name : ""}
          </div>
          <div style={{ marginBottom: 16 }}>
            <strong>Zone:</strong>{" "}
            {overviewMood.zone ? overviewMood.zone.name : ""}
          </div>
          <div style={{ marginBottom: 16 }}>
            <strong>Status:</strong>{" "}
            {overviewMood.status ? "Active" : "Inactive"}
          </div>
          <div style={{ display: "flex", gap: 16, justifyContent: "flex-end" }}>
            <button
              className="cancel-btn"
              onClick={() => setOverviewMood(null)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="logmood-container">
      <div className="logmood-header">
        <select
          className="logmood-dropdown"
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
          className="logmood-search-input"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(1);
          }}
        />
        <div className="logmood-actions">
          <button className="logmood-create-btn" onClick={openCreate}>
            + Create
          </button>
        </div>
      </div>
      {error && (
        <div style={{ color: "red", textAlign: "center", marginBottom: 16 }}>
          {error}
        </div>
      )}
      {loading ? (
        <div style={{ textAlign: "center", padding: "50px" }}>
          Loading moods...
        </div>
      ) : (
        <div className="logmood-table-scroll">
          <table className="logmood-table">
            <thead>
              <tr>
                <th>Mood Name</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((m) => {
                return (
                  <tr key={m.id}>
                    <td>
                      <div className="logmood-name">{m.name}</div>
                      <div className="logmood-code">{m.code}</div>
                    </td>
                    <td>
                      <label className="logmood-switch">
                        <input
                          type="checkbox"
                          checked={m.status}
                          onChange={() => toggleStatus(m.id)}
                        />
                        <span className="logmood-slider round"></span>
                      </label>
                    </td>
                    <td style={{ display: "flex", gap: 8 }}>
                      <button
                        className="logmood-edit-btn"
                        onClick={() => openEdit(m.id)}
                      >
                        <FiEdit size={16} />
                      </button>
                      <button
                        className="logmood-edit-btn"
                        title="Overview"
                        onClick={() => handleOverview(m)}
                      >
                        <FiEye size={16} />
                      </button>
                      <button
                        className="logmood-edit-btn"
                        title="Delete"
                        onClick={() => setDeleteConfirmId(m.id)}
                      >
                        <FiTrash2 size={16} style={{ color: "#e74c3c" }} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      <div className="logmood-footer">
        <div className="footer-text">
          Showing {total === 0 ? 0 : startIdx + 1} to {endIdx} of {total}{" "}
          entries
        </div>
        <div className="logmood-pagination">
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
        <div className="logmood-modal-overlay">
          <div className="logmood-modal">
            <h3
              style={{
                marginBottom: 24,
                fontWeight: 600,
                fontSize: 20,
                color: "#222",
              }}
            >
              {modalType === "edit" ? "Edit Mood" : "Add New Mood"}
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
                    Mood Code
                  </label>
                  <input
                    className="logmood-input readonly"
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
                  Emotion Name <span style={{ color: "red" }}>*</span>
                </label>
                <select
                  className="logmood-input"
                  value={modalForm.emotionId}
                  name="emotionId"
                  onChange={handleModalChange}
                  required
                >
                  <option value="">Select Emotion</option>
                  {emotions.map((e) => (
                    <option key={e.id} value={e.id}>
                      {e.name}
                    </option>
                  ))}
                </select>
              </div>
              <div style={{ marginBottom: 18 }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: 8,
                    color: "#888",
                    fontSize: 15,
                  }}
                >
                  Zone Description <span style={{ color: "red" }}>*</span>
                </label>
                <select
                  className="logmood-input"
                  value={modalForm.zoneId}
                  name="zoneId"
                  onChange={handleModalChange}
                  required
                >
                  <option value="">Select Zone</option>
                  {zones.map((z) => (
                    <option key={z.id} value={z.id}>
                      {z.description || z.name}
                    </option>
                  ))}
                </select>
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
                  Mood Name <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  className="logmood-input"
                  value={modalForm.name}
                  name="name"
                  onChange={handleModalChange}
                  placeholder="Mood Name (Auto-generated from Emotion and Zone)"
                  required
                />
              </div>
              <div
                style={{ display: "flex", gap: 16, justifyContent: "flex-end" }}
              >
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={handleModalCancel}
                  disabled={loading}
                >
                  Cancel
                </button>
                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading
                    ? "Processing..."
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
        <div className="logmood-modal-overlay">
          <div className="logmood-modal">
            <div>Are you sure you want to delete this mood?</div>
            <div className="modal-actions">
              <button
                className="cancel-btn"
                onClick={() => setDeleteConfirmId(null)}
              >
                Cancel
              </button>
              <button
                className="submit-btn"
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

export default LogMood;

