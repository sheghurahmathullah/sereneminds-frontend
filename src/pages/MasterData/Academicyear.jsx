import React, { useState, useEffect } from "react";
import "./Academicyear.css";
import { FiEdit, FiTrash2, FiEye } from "react-icons/fi";
import axios from "axios";
import { API_ENDPOINTS } from "../../config/api";

const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

const Academicyear = () => {
  const [years, setYears] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalValue, setModalValue] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [overviewYear, setOverviewYear] = useState(null); 


  // Fetch academic years from API
  const fetchAcademicYears = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_ENDPOINTS.ACADEMIC_YEARS);
      setYears(response.data);
     
      if (!response.status) {
        throw new Error("Failed to fetch academic years");
      }
    } catch (err) {
      setError(err.message);
      console.error("Error fetching academic years:", err);
    } finally {
      setLoading(false);
    }
  };

  // Load academic years on component mount
  useEffect(() => {
    fetchAcademicYears();
  }, []);

  const toggleStatus = async (id) => {
    try {
      const response = await fetch(
        `${API_ENDPOINTS.ACADEMIC_YEARS}/${id}/toggle-status`,
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
      const updatedYear = await response.json();
      setYears((prev) => prev.map((y) => (y.id === id ? updatedYear : y)));
    } catch (err) {
      setError(err.message);
      console.error("Error toggling status:", err);
    }
  };

  const openCreate = () => {
    setEditingId(null);
    setModalValue("");
    setShowModal(true);
  };

  const openEdit = (id) => {
    const year = years.find((y) => y.id === id);
    setEditingId(id);
    setModalValue(year ? year.year : "");
    setShowModal(true);
  };

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    if (modalValue.trim() === "") return;

    const payload ={
      year : modalValue
    }

    try {
      setLoading(true);
      if (editingId) {
        // Update existing academic year
        const response = await axios.put(
          `${API_ENDPOINTS.ACADEMIC_YEARS}/${editingId}`, payload);
        
          if (!response.status) {
          throw new Error("Failed to update academic year");
        }

        fetchAcademicYears();
      } else {
        // Create new academic year
        const response = await axios.post(
          API_ENDPOINTS.ACADEMIC_YEARS, payload);
          console.log(response.data);
        if (!response.status) {
          throw new Error("Failed to create academic year");
        }


      }
      setShowModal(false);
      setModalValue("");
      fetchAcademicYears();
      setEditingId(null);
    } catch (err) {
      setError(err.message);
      console.error("Error saving academic year:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleModalCancel = () => {
    setShowModal(false);
    setModalValue("");
    setEditingId(null);
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      const response = await axios.delete(
        `${API_ENDPOINTS.ACADEMIC_YEARS}/${id}`,
      
      );

      if (!response.status) {
        throw new Error("Failed to delete academic year");
      }
      setDeleteConfirmId(null);
      fetchAcademicYears();

    } catch (err) {
      setError(err.message);
      console.error("Error deleting academic year:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleOverview = (year) => {
    setOverviewYear(year);
  };

  const filteredYears = years.filter((y) =>
    y.year.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const total = filteredYears.length;
  const totalPages = Math.ceil(total / pageSize);
  const startIdx = (page - 1) * pageSize;
  const endIdx = Math.min(startIdx + pageSize, total);
  const paginated = filteredYears.slice(startIdx, endIdx);

  if (overviewYear) {
    return (
      <div className="academicyear-modal-overlay">
        <div className="academicyear-modal">
          <h3
            style={{
              marginBottom: 24,
              fontWeight: 600,
              fontSize: 20,
              color: "#222",
            }}
          >
            Academic Year Overview
          </h3>
          <div style={{ marginBottom: 16 }}>
            <strong>Academic Year:</strong> {overviewYear.year}
          </div>
          <div style={{ marginBottom: 16 }}>
            <strong>Status:</strong>{" "}
            {overviewYear.status ? "Active" : "Inactive"}
          </div>
          <div style={{ display: "flex", gap: 16, justifyContent: "flex-end" }}>
            <button
              className="cancel-btn"
              onClick={() => setOverviewYear(null)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="academicyear-container">
      <div className="academicyear-header">
        <select
          className="academicyear-dropdown"
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
          className="academicyear-search-input"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(1);
          }}
        />
        <div className="academicyear-actions">
          <button className="academicyear-create-btn" onClick={openCreate}>
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
          Loading academic years...
        </div>
      ) : (
        <div className="academicyear-table-scroll">
          <table className="academicyear-table">
            <thead>
              <tr>
                <th>Academic Year</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((y) => (
                <tr key={y.id}>
                  <td>
                    <div className="academicyear-name">{y.year}</div>
                  </td>
                  <td>
                    <label className="academicyear-switch">
                      <input
                        type="checkbox"
                        checked={y.status}
                        onChange={() => toggleStatus(y.id)}
                      />
                      <span className="academicyear-slider round"></span>
                    </label>
                  </td>
                  <td style={{ display: "flex", gap: 8 }}>
                    <button
                      className="academicyear-edit-btn"
                      onClick={() => openEdit(y.id)}
                    >
                      <FiEdit size={16} />
                    </button>
                    <button
                      className="academicyear-edit-btn"
                      title="Overview"
                      onClick={() => handleOverview(y)}
                    >
                      <FiEye size={16} />
                    </button>
                    <button
                      className="academicyear-edit-btn"
                      title="Delete"
                      onClick={() => setDeleteConfirmId(y.id)}
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
      <div className="academicyear-footer">
        <div className="footer-text">
          Showing {total === 0 ? 0 : startIdx + 1} to {endIdx} of {total}{" "}
          entries
        </div>
        <div className="academicyear-pagination">
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
        <div className="academicyear-modal-overlay">
          <div className="academicyear-modal">
            <h3
              style={{
                marginBottom: 24,
                fontWeight: 600,
                fontSize: 20,
                color: "#222",
              }}
            >
              {editingId ? "Edit Academic Year" : "Add New Academic Year"}
            </h3>
            <form onSubmit={handleModalSubmit}>
              <div style={{ marginBottom: 24 }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: 8,
                    color: "#888",
                    fontSize: 15,
                  }}
                >
                  Academic Year
                </label>
                <input
                  className="academicyear-input"
                  value={modalValue}
                  onChange={(e) => setModalValue(e.target.value)}
                  placeholder="e.g. June - April"
                  autoFocus
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
                  {loading ? "Saving..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {deleteConfirmId && (
        <div className="academicyear-modal-overlay">
          <div className="academicyear-modal">
            <div>Are you sure you want to delete this academic year?</div>
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

export default Academicyear;
