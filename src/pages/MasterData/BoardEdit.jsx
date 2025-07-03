import React from "react";
import "./Branch.css";

const BoardEdit = () => {
  return (
    <div
      className="branch-container"
      style={{ background: "#fafbfc", minHeight: "100vh" }}
    >
      {/* Breadcrumb */}
      <div
        style={{
          fontSize: 13,
          color: "#b0b0b0",
          marginBottom: 16,
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <span style={{ fontSize: 16 }}>🏠</span> Board{" "}
          <span style={{ color: "#888" }}>&gt;</span> Edit
        </span>
      </div>
      {/* Form */}
      <form>
        <div
          style={{
            background: "#fff",
            borderRadius: 12,
            padding: 32,
            boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
            marginBottom: 24,
          }}
        >
          <div
            style={{
              fontWeight: 600,
              fontSize: 18,
              color: "#444",
              marginBottom: 18,
            }}
          >
            Board
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
            <div style={{ flex: 1, minWidth: 220 }}>
              <div style={{ marginBottom: 12 }}>
                <input
                  className="search-input"
                  style={{ width: "100%" }}
                  placeholder="Board Name"
                />
              </div>
              <div style={{ marginBottom: 12 }}>
                <input
                  className="search-input"
                  style={{ width: "100%" }}
                  placeholder="Email Address"
                />
              </div>
            </div>
            <div style={{ flex: 1, minWidth: 220 }}>
              <div style={{ marginBottom: 12 }}>
                <input
                  className="search-input"
                  style={{ width: "100%" }}
                  placeholder="Board Code"
                  readOnly
                />
              </div>
              <div style={{ marginBottom: 12 }}>
                <select className="dropdown" style={{ width: "100%" }}>
                  <option>Select Board Type</option>
                  <option>National</option>
                  <option>CBSC</option>
                  <option>State</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <button
            type="submit"
            style={{
              background: "#b0b0b0",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              padding: "8px 28px",
              fontWeight: 500,
              fontSize: 15,
              cursor: "pointer",
            }}
          >
            Update
          </button>
          <button
            type="button"
            style={{
              background: "#f0f0f0",
              color: "#888",
              border: "none",
              borderRadius: 6,
              padding: "8px 28px",
              fontWeight: 500,
              fontSize: 15,
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default BoardEdit;
