import React from "react";
import "./Styles/Branch.css";

const ClassEdit = () => {
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="17"
            height="17"
            viewBox="0 0 24 24"
          >
            <path d="M 12 2.0996094 L 1 12 L 4 12 L 4 21 L 11 21 L 11 15 L 13 15 L 13 21 L 20 21 L 20 12 L 23 12 L 12 2.0996094 z M 12 4.7910156 L 18 10.191406 L 18 11 L 18 19 L 15 19 L 15 13 L 9 13 L 9 19 L 6 19 L 6 10.191406 L 12 4.7910156 z"></path>
          </svg>{" "}
          Class <span style={{ color: "#888" }}>&gt;</span> Edit
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
            Class
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
            <div style={{ flex: 1, minWidth: 220 }}>
              <div style={{ marginBottom: 12 }}>
                <input
                  className="search-input"
                  style={{ width: "100%" }}
                  placeholder="Class Name"
                />
              </div>
              <div style={{ marginBottom: 12 }}>
                <input
                  className="search-input"
                  style={{ width: "100%" }}
                  placeholder="School Name"
                  readOnly
                />
              </div>
            </div>
            <div style={{ flex: 1, minWidth: 220 }}>
              <div style={{ marginBottom: 12 }}>
                <input
                  className="search-input"
                  style={{ width: "100%" }}
                  placeholder="Class Code"
                  readOnly
                />
              </div>
              <div style={{ marginBottom: 12 }}>
                <input
                  className="search-input"
                  style={{ width: "100%" }}
                  placeholder="School Code"
                  readOnly
                />
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

export default ClassEdit;
