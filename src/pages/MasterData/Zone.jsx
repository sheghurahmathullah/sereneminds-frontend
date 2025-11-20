import React, { useState, useEffect } from "react";
import "./Zone.css";
import { FiMoreVertical, FiEdit, FiTrash2, FiEye } from "react-icons/fi";
import axios from "axios";

const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

const Zone = () => {
  const [zones, setZones] = useState([]);
  const [emotions, setEmotions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("create"); // 'create' or 'edit' or 'overview'
  const [modalForm, setModalForm] = useState({
    code: "",
    name: "",
    description: "",
    emotionId: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [overviewZone, setOverviewZone] = useState(null);

  const SERVER_URL = "https://sereneminds-backend-oucl.onrender.com/api/zones";
  const SERVER_URL_EMOTIONS = "https://sereneminds-backend-oucl.onrender.com/api/emotions"  


  // Fetch zones from API
  const fetchZones = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${SERVER_URL}`
      );
      if (!response.status) {
        throw new Error("Failed to fetch zones");
      }
      const data = await response.data;
      setZones(data);

    } catch (err) {
      setError(err.message);
      console.error("Error fetching zones:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch emotions from API
  const fetchEmotions = async () => {
    try {
      const response = await axios.get(
        `${SERVER_URL_EMOTIONS}`
      );

      if (!response.status) {
        throw new Error("Failed to fetch emotions");
      }
      const data = await response.data;
      setEmotions(data);

    } catch (err) {
      console.error("Error fetching emotions:", err);
    }
  };

  // Load data on component mount
  useEffect(() => {
    fetchZones();
    fetchEmotions();
  }, []);

  const toggleStatus = async (id) => {
    try {
      const response = await axios.patch(
        `${SERVER_URL}/${id}/toggle-status`);
      
        if (!response.status) {
        throw new Error("Failed to toggle status");
      }

      // fetchZones();
      const data = await response.data;
      setZones((prev) => // for updating the state
        prev.map((p) => (p.id === id ? data : p))
      );

    } catch (err) {
      setError(err.message);
      console.error("Error toggling status:", err);
    }
  };

  const openCreate = () => {
    setModalType("create");
    setModalForm({ code: "", name: "", description: "", emotionId: "" });
    setEditingId(null);
    setShowModal(true);
  };

  const openEdit = (id) => {
    const zone = zones.find((z) => z.id === id);
    setModalType("edit");
    setModalForm({
      code: zone ? zone.code : "",
      name: zone ? zone.name : "",
      description: zone ? zone.description : "",
      emotionId: zone ? zone.emotionId : "",
    });
    setEditingId(id);
    setShowModal(true);
  };

  const handleModalChange = (e) => {
    setModalForm({ ...modalForm, [e.target.name]: e.target.value });
  };

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    if (!modalForm.name.trim() || !modalForm.emotionId) return;

    try {
      setLoading(true);

      if(editingId){
        const res = await axios.put(`${SERVER_URL}/${editingId}`, {
          name: modalForm.name,
          description: modalForm.description,
          emotionId: Number(modalForm.emotionId),
        });

        if (!res.status) {
        throw new Error(`Failed to update zone`);
      }
        fetchZones();
      }else {

        
      const res = await axios.post (`${SERVER_URL}`, {
          name: modalForm.name,
          description: modalForm.description,
          emotionId: Number(modalForm.emotionId),
      });
      
      
      console.log(res.data)
      fetchZones();

      if (!res.status) {
        throw new Error(`Failed to create zone`);
      }
      }
        
      
      setShowModal(false);
      setModalForm({ code: "", name: "", description: "", emotionId: "" });
      setEditingId(null);
    } catch (err) {
      setError(err.message);
      console.error(`Error creating a zone:`, err);
    } finally {
      setLoading(false);
    }
  };

  const handleModalCancel = () => {
    setShowModal(false);
    setModalForm({ code: "", name: "", description: "", emotionId: "" });
    setEditingId(null);
  };

  const filteredZones = zones.filter((z) =>
    z.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const total = filteredZones.length;
  const totalPages = Math.ceil(total / pageSize);
  const startIdx = (page - 1) * pageSize;
  const endIdx = Math.min(startIdx + pageSize, total);
  const paginated = filteredZones.slice(startIdx, endIdx);

  // DELETE zone
  const handleDelete = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${SERVER_URL}/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete zone");
      }

      fetchZones();
      setDeleteConfirmId(null);
      if (overviewZone && overviewZone.id === id) setOverviewZone(null);
    } catch (err) {
      setError(err.message);
      console.error("Error deleting zone:", err);
    } finally {
      setLoading(false);
    }
  };

  // Overview
  const handleOverview = (zone) => {
    setOverviewZone(zone);
  };

  if (overviewZone) {
    return (
      <div className="zone-modal-overlay">
        <div className="zone-modal">
          <h3
            style={{
              marginBottom: 24,
              fontWeight: 600,
              fontSize: 20,
              color: "#222",
            }}
          >
            Zone Overview
          </h3>
          <div style={{ marginBottom: 16 }}>
            <strong>Zone Name:</strong> {overviewZone.name}
          </div>
          <div style={{ marginBottom: 16 }}>
            <strong>Zone Description:</strong> {overviewZone.description}
          </div>
          <div style={{ marginBottom: 16 }}>
            <strong>Emotion:</strong>{" "}
            {overviewZone.emotion ? overviewZone.emotion.name : ""}
          </div>
          <div style={{ marginBottom: 16 }}>
            <strong>Status:</strong>{" "}
            {overviewZone.status ? "Active" : "Inactive"}
          </div>
          <div style={{ display: "flex", gap: 16, justifyContent: "flex-end" }}>
            <button
              className="cancel-btn"
              onClick={() => setOverviewZone(null)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="zone-container">
      <div className="zone-header">
        <select
          className="zone-dropdown"
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
          className="zone-search-input"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(1);
          }}
        />
        <div className="zone-actions">
          <button className="zone-create-btn" onClick={openCreate}>
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
          Loading zones...
        </div>
      ) : (
        <div className="zone-table-scroll">
          <table className="zone-table">
            <thead>
              <tr>
                <th>Zone Name</th>
                <th>Emotion</th>
                <th>Zone Description</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((z) => {
                const emotion = z.emotion; // Emotion data comes from API
                return (
                  <tr key={z.id}>
                    <td>
                      <div className="zone-name">{z.name}</div>
                      <div className="zone-code">{z.code}</div>
                    </td>
                    <td>
                      <div className="zone-name">
                        {emotion ? emotion.name : ""}
                      </div>
                      <div className="zone-code">
                        {emotion ? emotion.code : ""}
                      </div>
                    </td>
                    <td style={{ fontWeight: 500, fontSize: 15 }}>
                      {z.description}
                    </td>
                    <td>
                      <label className="zone-switch">
                        <input
                          type="checkbox"
                          checked={z.status}
                          onChange={() => toggleStatus(z.id)}
                        />
                        <span className="zone-slider round"></span>
                      </label>
                    </td>
                    <td style={{ display: "flex", gap: 8 }}>
                      <button
                        className="zone-edit-btn"
                        onClick={() => openEdit(z.id)}
                      >
                        <FiEdit size={16} />
                      </button>
                      <button
                        className="zone-edit-btn"
                        title="Overview"
                        onClick={() => handleOverview(z)}
                      >
                        <FiEye size={16} />
                      </button>
                      <button
                        className="zone-edit-btn"
                        title="Delete"
                        onClick={() => setDeleteConfirmId(z.id)}
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
      <div className="zone-footer">
        <div className="footer-text">
          Showing {total === 0 ? 0 : startIdx + 1} to {endIdx} of {total}{" "}
          entries
        </div>
        <div className="zone-pagination">
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
        <div className="zone-modal-overlay">
          <div className="zone-modal">
            <h3
              style={{
                marginBottom: 24,
                fontWeight: 600,
                fontSize: 20,
                color: "#222",
              }}
            >
              {modalType === "edit" ? "Edit Zone" : "Add New Zone"}
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
                    Zone Code
                  </label>
                  <input
                    className="zone-input readonly"
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
                  Zone Name
                </label>
                <input
                  className="zone-input"
                  value={modalForm.name}
                  name="name"
                  onChange={handleModalChange}
                  placeholder="Zone Name"
                  autoFocus
                />
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
                  Zone Description
                </label>
                <input
                  className="zone-input"
                  value={modalForm.description}
                  name="description"
                  onChange={handleModalChange}
                  placeholder="Zone Description"
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
                  Emotion Name
                </label>
                <select
                  className="zone-input"
                  value={modalForm.emotionId}
                  name="emotionId"
                  onChange={handleModalChange}
                >
                  <option value="">Emotion Name</option>
                  {emotions.map((e) => (
                    <option key={e.id} value={e.id}>
                      {e.name}
                    </option>
                  ))}
                </select>
              </div>
              <div
                style={{ display: "flex", gap: 16, justifyContent: "flex-end" }}
              >
                {modalType === "edit" && (
                  <button
                    type="button"
                    className="cancel-btn"
                    style={{
                      background: "#f5f5f5",
                      color: "#aaa",
                      cursor: "not-allowed",
                    }}
                    disabled
                  >
                    Description
                  </button>
                )}
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={handleModalCancel}
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
        <div className="zone-modal-overlay">
          <div className="zone-modal">
            <div>Are you sure you want to delete this zone?</div>
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

export default Zone;
