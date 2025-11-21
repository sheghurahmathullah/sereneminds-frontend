import React, { useState } from "react";
import {
  FiList,
  FiPlus,
  FiEdit,
  FiEye,
  FiTrash2,
  FiFilter,
} from "react-icons/fi";
import "./Student.css";

const PredefinedList = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showOverview, setShowOverview] = useState(false);
  const [selectedList, setSelectedList] = useState(null);
  const [editingList, setEditingList] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    items: [],
  });
  const [newItem, setNewItem] = useState("");

  // Static predefined lists data
  const predefinedLists = [
    {
      id: 1,
      name: "Gratitude List",
      description: "Things I'm grateful for today",
      category: "Wellness",
      itemCount: 5,
      createdDate: "2024-01-10",
      lastUpdated: "2024-01-15",
      items: [
        "Family support",
        "Good health",
        "Friends",
        "Education",
        "Nature",
      ],
      status: "active",
    },
    {
      id: 2,
      name: "Coping Strategies",
      description: "Strategies that help me manage stress",
      category: "Mental Health",
      itemCount: 8,
      createdDate: "2024-01-05",
      lastUpdated: "2024-01-14",
      items: [
        "Deep breathing",
        "Meditation",
        "Exercise",
        "Talking to friends",
        "Listening to music",
        "Reading",
        "Journaling",
        "Taking breaks",
      ],
      status: "active",
    },
    {
      id: 3,
      name: "Daily Affirmations",
      description: "Positive affirmations for daily use",
      category: "Self-Care",
      itemCount: 10,
      createdDate: "2024-01-01",
      lastUpdated: "2024-01-12",
      items: [
        "I am capable",
        "I am worthy",
        "I am resilient",
        "I am growing",
        "I am enough",
        "I am strong",
        "I am loved",
        "I am valued",
        "I am creative",
        "I am at peace",
      ],
      status: "active",
    },
    {
      id: 4,
      name: "Self-Care Activities",
      description: "Activities that help me recharge",
      category: "Self-Care",
      itemCount: 6,
      createdDate: "2024-01-08",
      lastUpdated: "2024-01-13",
      items: [
        "Take a warm bath",
        "Read a book",
        "Go for a walk",
        "Practice yoga",
        "Listen to podcasts",
        "Cook a favorite meal",
      ],
      status: "active",
    },
  ];

  const categories = ["Wellness", "Mental Health", "Self-Care", "Goals", "Other"];

  const handleCreateList = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;
    alert("Predefined list created successfully!");
    setShowCreateModal(false);
    setFormData({ name: "", description: "", category: "", items: [] });
  };

  const handleEditList = (list) => {
    setEditingList(list);
    setFormData({
      name: list.name,
      description: list.description,
      category: list.category,
      items: list.items,
    });
    setShowEditModal(true);
  };

  const handleUpdateList = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;
    alert("Predefined list updated successfully!");
    setShowEditModal(false);
    setEditingList(null);
    setFormData({ name: "", description: "", category: "", items: [] });
  };

  const handleAddItem = () => {
    if (newItem.trim()) {
      setFormData({
        ...formData,
        items: [...formData.items, newItem.trim()],
      });
      setNewItem("");
    }
  };

  const handleRemoveItem = (index) => {
    setFormData({
      ...formData,
      items: formData.items.filter((_, i) => i !== index),
    });
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
            Predefined Lists
          </h2>
          <p style={{ color: "#888", marginTop: "6px", fontSize: "14px" }}>
            Manage your predefined lists for quick access
          </p>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <button
            className="btn btn-secondary"
            onClick={() => setShowFilters(!showFilters)}
            style={{ display: "flex", alignItems: "center", gap: "8px" }}
          >
            <FiFilter /> Filters
          </button>
          <button
            className="btn btn-primary"
            onClick={() => {
              setFormData({ name: "", description: "", category: "", items: [] });
              setShowCreateModal(true);
            }}
            style={{ display: "flex", alignItems: "center", gap: "8px" }}
          >
            <FiPlus /> Create List
          </button>
        </div>
      </div>

      {/* Filter Section */}
      {showFilters && (
        <div className="filter-section">
          <div
            style={{
              fontSize: "16px",
              fontWeight: "600",
              marginBottom: "16px",
              color: "#444",
            }}
          >
            Filter Lists
          </div>
          <div className="filter-row">
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Category</label>
              <select className="form-select">
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Status</label>
              <select className="form-select">
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>
          <div className="filter-actions">
            <button className="btn btn-primary">Apply Filters</button>
            <button
              className="btn btn-secondary"
              onClick={() => setShowFilters(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Lists Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: "20px",
        }}
      >
        {predefinedLists.map((list) => (
          <div
            key={list.id}
            style={{
              background: "#fff",
              borderRadius: "14px",
              padding: "24px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ marginBottom: "16px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "8px",
                }}
              >
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: "700",
                    margin: 0,
                    color: "#222",
                  }}
                >
                  {list.name}
                </h3>
                <span
                  style={{
                    padding: "4px 12px",
                    background: "#00c7b715",
                    borderRadius: "20px",
                    fontSize: "11px",
                    fontWeight: "600",
                    color: "#00c7b7",
                    textTransform: "uppercase",
                  }}
                >
                  {list.status}
                </span>
              </div>
              <p
                style={{
                  fontSize: "14px",
                  color: "#666",
                  marginBottom: "8px",
                  lineHeight: "1.5",
                }}
              >
                {list.description}
              </p>
              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  fontSize: "12px",
                  color: "#888",
                }}
              >
                <span>{list.category}</span>
                <span>•</span>
                <span>{list.itemCount} items</span>
              </div>
            </div>

            {/* Preview Items */}
            <div
              style={{
                flex: 1,
                marginBottom: "16px",
                padding: "12px",
                background: "#f9f9f9",
                borderRadius: "10px",
                maxHeight: "120px",
                overflowY: "auto",
              }}
            >
              <div style={{ fontSize: "12px", color: "#888", marginBottom: "8px" }}>
                Items:
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {list.items.slice(0, 3).map((item, index) => (
                  <span
                    key={index}
                    style={{
                      padding: "4px 10px",
                      background: "#fff",
                      borderRadius: "6px",
                      fontSize: "12px",
                      color: "#666",
                    }}
                  >
                    {item}
                  </span>
                ))}
                {list.items.length > 3 && (
                  <span
                    style={{
                      padding: "4px 10px",
                      background: "#fff",
                      borderRadius: "6px",
                      fontSize: "12px",
                      color: "#666",
                    }}
                  >
                    +{list.items.length - 3} more
                  </span>
                )}
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: "flex", gap: "8px" }}>
              <button
                onClick={() => {
                  setSelectedList(list);
                  setShowOverview(true);
                }}
                className="btn btn-secondary"
                style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}
              >
                <FiEye /> View
              </button>
              <button
                onClick={() => handleEditList(list)}
                className="btn btn-secondary"
                style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}
              >
                <FiEdit /> Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "600px" }}>
            <div className="modal-header">
              <h3 className="modal-title">Create Predefined List</h3>
              <button
                className="modal-close"
                onClick={() => setShowCreateModal(false)}
              >
                ×
              </button>
            </div>
            <form onSubmit={handleCreateList}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">List Name *</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="e.g., Gratitude List"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-textarea"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Describe the purpose of this list..."
                    style={{ minHeight: "80px" }}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Category *</label>
                  <select
                    className="form-select"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Items *</label>
                  <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
                    <input
                      type="text"
                      className="form-input"
                      value={newItem}
                      onChange={(e) => setNewItem(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddItem();
                        }
                      }}
                      placeholder="Add an item..."
                    />
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={handleAddItem}
                    >
                      Add
                    </button>
                  </div>
                  <div style={{ display: "grid", gap: "8px" }}>
                    {formData.items.map((item, index) => (
                      <div
                        key={index}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "10px",
                          background: "#f9f9f9",
                          borderRadius: "8px",
                        }}
                      >
                        <span>{item}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveItem(index)}
                          style={{
                            background: "none",
                            border: "none",
                            color: "#e74c3c",
                            cursor: "pointer",
                            fontSize: "18px",
                          }}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                  {formData.items.length === 0 && (
                    <div style={{ fontSize: "13px", color: "#888", fontStyle: "italic" }}>
                      No items added yet. Add at least one item.
                    </div>
                  )}
                </div>
              </div>
              <div className="modal-actions">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={formData.items.length === 0}
                >
                  Create List
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && editingList && (
        <div className="modal-overlay" onClick={() => {
          setShowEditModal(false);
          setEditingList(null);
        }}>
          <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "600px" }}>
            <div className="modal-header">
              <h3 className="modal-title">Edit Predefined List</h3>
              <button
                className="modal-close"
                onClick={() => {
                  setShowEditModal(false);
                  setEditingList(null);
                }}
              >
                ×
              </button>
            </div>
            <form onSubmit={handleUpdateList}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">List Name *</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-textarea"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    style={{ minHeight: "80px" }}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Category *</label>
                  <select
                    className="form-select"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    required
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Items *</label>
                  <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
                    <input
                      type="text"
                      className="form-input"
                      value={newItem}
                      onChange={(e) => setNewItem(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddItem();
                        }
                      }}
                      placeholder="Add an item..."
                    />
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={handleAddItem}
                    >
                      Add
                    </button>
                  </div>
                  <div style={{ display: "grid", gap: "8px" }}>
                    {formData.items.map((item, index) => (
                      <div
                        key={index}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "10px",
                          background: "#f9f9f9",
                          borderRadius: "8px",
                        }}
                      >
                        <span>{item}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveItem(index)}
                          style={{
                            background: "none",
                            border: "none",
                            color: "#e74c3c",
                            cursor: "pointer",
                            fontSize: "18px",
                          }}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="modal-actions">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowEditModal(false);
                    setEditingList(null);
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={formData.items.length === 0}
                >
                  Update List
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Overview Modal */}
      {showOverview && selectedList && (
        <div className="modal-overlay" onClick={() => {
          setShowOverview(false);
          setSelectedList(null);
        }}>
          <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "700px" }}>
            <div className="modal-header">
              <h3 className="modal-title">{selectedList.name} - Overview</h3>
              <button
                className="modal-close"
                onClick={() => {
                  setShowOverview(false);
                  setSelectedList(null);
                }}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div style={{ display: "grid", gap: "24px" }}>
                {/* Basic Info */}
                <div>
                  <div style={{ fontSize: "12px", color: "#888", marginBottom: "8px", textTransform: "uppercase" }}>
                    Description
                  </div>
                  <div style={{ fontSize: "15px", color: "#444", lineHeight: "1.6" }}>
                    {selectedList.description}
                  </div>
                </div>

                {/* Stats */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
                  <div style={{ padding: "16px", background: "#f9f9f9", borderRadius: "10px", textAlign: "center" }}>
                    <div style={{ fontSize: "12px", color: "#888", marginBottom: "4px" }}>Category</div>
                    <div style={{ fontSize: "16px", fontWeight: "700", color: "#00c7b7" }}>
                      {selectedList.category}
                    </div>
                  </div>
                  <div style={{ padding: "16px", background: "#f9f9f9", borderRadius: "10px", textAlign: "center" }}>
                    <div style={{ fontSize: "12px", color: "#888", marginBottom: "4px" }}>Items</div>
                    <div style={{ fontSize: "16px", fontWeight: "700", color: "#00c7b7" }}>
                      {selectedList.itemCount}
                    </div>
                  </div>
                  <div style={{ padding: "16px", background: "#f9f9f9", borderRadius: "10px", textAlign: "center" }}>
                    <div style={{ fontSize: "12px", color: "#888", marginBottom: "4px" }}>Status</div>
                    <div style={{ fontSize: "16px", fontWeight: "700", color: "#00c7b7", textTransform: "capitalize" }}>
                      {selectedList.status}
                    </div>
                  </div>
                </div>

                {/* Dates */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div>
                    <div style={{ fontSize: "12px", color: "#888", marginBottom: "4px" }}>Created</div>
                    <div style={{ fontSize: "15px", fontWeight: "600" }}>{selectedList.createdDate}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: "12px", color: "#888", marginBottom: "4px" }}>Last Updated</div>
                    <div style={{ fontSize: "15px", fontWeight: "600" }}>{selectedList.lastUpdated}</div>
                  </div>
                </div>

                {/* Items List */}
                <div>
                  <div style={{ fontSize: "16px", fontWeight: "600", marginBottom: "12px" }}>
                    All Items ({selectedList.items.length})
                  </div>
                  <div style={{ display: "grid", gap: "8px" }}>
                    {selectedList.items.map((item, index) => (
                      <div
                        key={index}
                        style={{
                          padding: "12px",
                          background: "#f9f9f9",
                          borderRadius: "8px",
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                        }}
                      >
                        <span
                          style={{
                            width: "24px",
                            height: "24px",
                            borderRadius: "50%",
                            background: "#00c7b7",
                            color: "#fff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "12px",
                            fontWeight: "700",
                          }}
                        >
                          {index + 1}
                        </span>
                        <span style={{ fontSize: "15px", color: "#444" }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-actions">
              <button
                className="btn btn-secondary"
                onClick={() => {
                  setShowOverview(false);
                  setSelectedList(null);
                }}
              >
                Close
              </button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setShowOverview(false);
                  handleEditList(selectedList);
                }}
              >
                Edit List
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PredefinedList;

