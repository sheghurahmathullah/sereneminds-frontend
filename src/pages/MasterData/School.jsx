import React, { useState, useEffect } from "react";
import {
  FiEdit,
  FiFilter,
  FiDownload,
  FiMaximize2,
  FiMail,
  FiPhone,
  FiGlobe,
  FiChevronRight,
  FiTrash2,
  FiEye,
} from "react-icons/fi";
import "./Styles/School.css";
import axios from "axios";

const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

const labelStyle = {
  fontSize: 13,
  color: "#888",
  marginBottom: 4,
  display: "block",
  fontWeight: 500,
};

const inputStyle = {
  width: "100%",
  padding: "8px 10px",
  border: "1px solid #e0e0e0",
  borderRadius: 6,
  fontSize: 15,
  marginBottom: 0,
  background: "#fafbfc",
  outline: "none",
};

const fieldWrapper = {
  marginBottom: 18,
};

const tabs = [
  { label: "Overview" },
  { label: "Security" },
  { label: "Statics" },
  { label: "Students" },
  { label: "Plans" },
  { label: "Invoice" },
  { label: "Bill" },
  { label: "History" },
];

const initialFormState = {
  name: "",
  code: "",
  instituteCode: "",
  instituteName: "",
  branchCode: "",
  branchName: "",
  address1: "",
  address2: "",
  cityId: null,
  stateId: null,
  pincode: "",
  schoolType: "",
  phone: "",
  email: "",
  telephone: "",
  website: "",
  status: true,
};

const School = () => {
  const [schools, setSchools] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useState("list"); // 'list' | 'form' | 'overview'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState(initialFormState);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const [selectedInstitute, setSelectedInstitute] = useState(null);
  
  const [states, setStates] =useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [cities, setCities] = useState([]);

  const SERVER_URL = "https://sereneminds-backend-oucl.onrender.com/api/schools"; 
  const SERVER_URL_INSTITUTES = "https://sereneminds-backend-oucl.onrender.com/api/institutes";
  const SERVER_URL_STATES = "https://sereneminds-backend-oucl.onrender.com/api/states";
  const SERVER_URL_CITIES = "https://sereneminds-backend-oucl.onrender.com/api/cities";
  

    const fetchStates = async () => {
    try { 
    const response = await axios.get(`${SERVER_URL_STATES}`);
    const data = await response.data;
    console.log("Fetched states:", data);
    setStates(data);
    }
    catch (error) {
      console.error("Error fetching states:", error);
      // setError("Failed to fetch states");
    }
  }


  const fetchCities = async () => {
    try {
      const response = await axios.get(`${SERVER_URL_CITIES}`);
      const data = await response.data;
      setCities(data);
      console.log("Fetched cities:", data);
    } catch (error) { 
      console.error("Error fetching cities:", error);
      // setError("Failed to fetch cities");
    }
  }


  // Fetch schools from API
  const fetchSchools = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${SERVER_URL}`);  
      console.log(response.data)
      
      if (!response.status) throw new Error("Failed to fetch schools");

      const data = await response.data;
      setSchools(data);

    } catch (err) {
      setError(err.message);
      console.error("Error fetching schools:", err);
    } finally {
      setLoading(false);
    }
  };

 

  useEffect(() => {
    fetchSchools();
    fetchCities();
    fetchStates();
  }, []);

  // Toggle status (optimistic)
  const toggleStatus = async (id) => {
    try {
      const response = await axios.patch(`${SERVER_URL}/${id}/toggle-status`);

      const data = response.data;

      setSchools((prev) => // for smooth update
        prev.map((p) => (p.id === id ? data : p))
      );
      console.log(data);

      if (!response.status) throw new Error("Failed to toggle status");
      // fetchSchools(); // revert
      
    } catch (err) {
      setError(err.message);
    }
  };

  // Filtered and paginated
  const filteredSchools = schools.filter(
    (school) =>
      school.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      school.instituteName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      school.branchName?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const total = filteredSchools.length;
  const totalPages = Math.ceil(total / pageSize);
  const startIdx = (page - 1) * pageSize;
  const endIdx = Math.min(startIdx + pageSize, total);
  const paginated = filteredSchools.slice(startIdx, endIdx);



  const handleFormChange = (field, value) => {
  setForm({ ...form, [field]: value });
}



  // Create or Edit
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
        
    form.stateId = Number (form.stateId);
    form.cityId = Number (form.cityId);

    try {
      if (isEdit && editId) {
        const response = await axios.put(`${SERVER_URL}/${editId}`, form);       
        if (!response.status) throw new Error("Failed to update school");
        fetchSchools(); 

      } else {

        const response = await axios.post(`${SERVER_URL}`, form);
        if (!response.status) throw new Error("Failed to create school");
        const data = await response.data;
        fetchSchools(); 


      }
      setForm(initialFormState);
      setIsEdit(false);
      setEditId(null);
      setViewMode("list");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Edit
  const handleEdit = (school) => {
    setForm(school);
    setIsEdit(true);
    setEditId(school.id);
    setViewMode("form");
  };

  // Overview
  const handleOverview = (school) => {
    setSelectedSchool(school);
    setViewMode("overview");
  };

  // Delete
  const handleDelete = async (id) => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.delete(`${SERVER_URL}/${id}`);
          setViewMode("list");


      // if (!response.status) throw new Error("Failed to delete school");

      setDeleteConfirmId(null);
      setViewMode("list");
      setSelectedSchool(null);
      fetchSchools();
      
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Cancel
  const handleCancel = () => {
    setForm(initialFormState);
    setIsEdit(false);
    setEditId(null);
    setSelectedSchool(null);
    setViewMode("list");
  };

  // --- FORM VIEW ---
  if (viewMode === "form") {
    return (
      <div
        className="school-container"
        style={{ background: "#fafbfc", minHeight: "100vh" }}
      >
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
            <span style={{ fontSize: 16 }}>🏠</span> School{" "}
            <span style={{ color: "#888" }}>&gt;</span>{" "}
            {isEdit ? "Edit" : "Create"}
          </span>
        </div>
        <form onSubmit={handleFormSubmit}>
          {/* School Details */}
          <div
            style={{
              background: "#fff",
              borderRadius: 12,
              padding: 32,
              boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
              marginBottom: 24,
              maxWidth: 950,
              margin: "0 auto 24px auto",
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
              School Details
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 32,
                justifyContent: "space-between",
              }}
            >
              <div style={{ flex: 1, minWidth: 260 }}>
                {/* Left column fields */}
                <div style={fieldWrapper}>
                  <label style={labelStyle}>School Name</label>
                  <input
                    style={inputStyle}
                    placeholder="School Name"
                    name="name"
                    value={form.name} 
                    onChange={ (e) =>  handleFormChange(e.target.name, e.target.value)}
                    required
                  />
                </div>
                <div style={fieldWrapper}>
                  <label style={labelStyle}>Institute Code</label>
                  <input
                    style={inputStyle}
                    placeholder="Institute Code"
                    name="instituteCode"
                    value={form.instituteCode}
                    onChange={(e)  => handleFormChange(e.target.name, e.target.value)}
                    required
                  />
                </div>
                <div style={fieldWrapper}>
                  <label style={labelStyle}>Branch Code</label>
                  <input
                    style={inputStyle}
                    placeholder="Branch Code"
                    name="branchCode"
                    value={form.branchCode}
                    onChange={(e)  => handleFormChange(e.target.name, e.target.value)}

                    required
                  />
                </div>
                <div style={fieldWrapper}>
                  <label style={labelStyle}>Address Line 1</label>
                  <input
                    style={inputStyle}
                    placeholder="Address Line 1"
                    name="address1"
                    value={form.address1}
                    onChange={ (e) =>  handleFormChange(e.target.name, e.target.value)}
                    required
                  />
                </div>
                <div style={fieldWrapper}>
                  <label style={labelStyle}>City</label>
                  <select
                    // className="institute-input"
                    style={inputStyle}
                    name="cityId"
                    value={ Number (form.cityId)}
                    onChange={ (e) =>  handleFormChange(e.target.name, e.target.value)}
                    disabled={!form.stateId}
                  >
                    <option value="">Select</option>
                    {cities
                      .filter((city) => String(city.state) === String(selectedState))
                      .map((city) => (
                        <option key={city.id} value={city.id}>
                          {city.city}
                        </option>
                      ))}
                  </select>
                  
                </div>
                <div style={fieldWrapper}>
                  <label style={labelStyle}>Pin Code</label>
                  <input
                    style={inputStyle}
                    placeholder="Pin Code"
                    name="pincode"
                    value={form.pincode}
                    maxLength={6}
                     onChange={(e) => {
                      const onlyNums = e.target.value.replace(/\D/g, ""); // remove non-digits
                      handleFormChange(e.target.name, onlyNums);
                    }}

                    // onChange={ (e) =>  handleFormChange(e.target.name, e.target.value)}

                    required
                  />
                </div>
              </div>
              <div style={{ flex: 1, minWidth: 260 }}>
                {/* Right column fields */}
                <div style={fieldWrapper}>
                  <label style={labelStyle}>School Code</label>
                  <input
                    style={inputStyle}
                    placeholder="School Code"
                    name="code"
                    value={form.code}
                    onChange={ (e) =>  handleFormChange(e.target.name, e.target.value)}
                    required
                  />
                </div>
                <div style={fieldWrapper}>
                  <label style={labelStyle}>Institute Name</label>
                   <input
                    style={inputStyle}
                    placeholder="Institute Name"
                    name="instituteName"
                    value={form.instituteName}
                    onChange={ (e) =>  handleFormChange(e.target.name, e.target.value)}
                    required
                  />


                  
                </div>
                <div style={fieldWrapper}>
                  <label style={labelStyle}>Branch Name</label>
                  <input
                    style={inputStyle}
                    placeholder="Branch Name"
                    name="branchName"
                    value={form.branchName}
                    onChange={ (e) =>  handleFormChange(e.target.name, e.target.value)}

                    required
                  />

                </div>
                <div style={fieldWrapper}>
                  <label style={labelStyle}>Address Line 2</label>
                  <input
                    style={inputStyle}
                    placeholder="Address Line 2"
                    name="address2"
                    value={form.address2}
                    onChange={ (e) =>  handleFormChange(e.target.name, e.target.value)}

                  />
                </div>
                <div style={fieldWrapper}>
                  <label style={labelStyle}>State</label>
                   <select
                   style={inputStyle}
                    value={Number (form.stateId)}
                    name="stateId"
                    onChange={(e) =>  {
                    handleFormChange("stateId", e.target.value);
                  const selected = states.find((state) => String(state.id) === String(e.target.value));
                  setSelectedState(selected ? selected.state : null);
                  console.log("Selected state:", selected ? selected.state : "");
                    }}
                    
                  >
                    <option value="">Select</option>
                    {states.map((state) => (
                      <option key={state.id} value={state.id}>
                        {state.state}
                      </option>
                    ))}
                  </select>
                  
                </div>
                <div style={fieldWrapper}>
                  <label style={labelStyle}>School Type</label>
                    <select
                      style={inputStyle}
                      name="schoolType"
                      value={form.schoolType}
                      onChange={(e) => handleFormChange(e.target.name, e.target.value)}
                      required
                    >
                      <option value="">Select School Type</option>
                      <option value="Primary">Primary</option>
                      <option value="Secondary">Secondary</option>
                      <option value="HigherSecondary">Higher Secondary</option>
                    </select>

                </div>
              </div>
            </div>
          </div>
          {/* Contact Details */}
          <div
            style={{
              background: "#fff",
              borderRadius: 12,
              padding: 32,
              boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
              marginBottom: 24,
              maxWidth: 950,
              margin: "0 auto 24px auto",
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
              Contact Details
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 32,
                justifyContent: "space-between",
              }}
            >
              <div style={{ flex: 1, minWidth: 260 }}>
                <div style={fieldWrapper}>
                  <label style={labelStyle}>Phone Number</label>
                  <input
                    style={inputStyle}
                    placeholder="Phone Number"
                    name="phone"
                    value={form.phone}
                    onChange={ (e) =>  handleFormChange(e.target.name, e.target.value)}

                    required
                  />
                </div>
                <div style={fieldWrapper}>
                  <label style={labelStyle}>Email ID</label>
                  <input
                    style={inputStyle}
                    placeholder="Email ID"
                    name="email"
                    value={form.email}
                    onChange={ (e) =>  handleFormChange(e.target.name, e.target.value)}

                    required
                  />
                </div>
              </div>
              <div style={{ flex: 1, minWidth: 260 }}>
                <div style={fieldWrapper}>
                  <label style={labelStyle}>Telephone Number</label>
                  <input
                    style={inputStyle}
                    placeholder="Telephone Number"
                    name="telephone"
                    value={form.telephone}
                    onChange={ (e) =>  handleFormChange(e.target.name, e.target.value)}

                  />
                </div>
                <div style={fieldWrapper}>
                  <label style={labelStyle}>Website Link</label>
                  <input
                    style={inputStyle}
                    placeholder="Website Link"
                    name="website"
                    value={form.website}
                    onChange={ (e) =>  handleFormChange(e.target.name, e.target.value)}

                  />
                </div>
              </div>
            </div>
          </div>
          {error && (
            <div
              style={{ color: "red", textAlign: "center", marginBottom: 16 }}
            >
              {error}
            </div>
          )}
          <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
            <button
              type="submit"
              disabled={loading}
              style={{
                background: loading ? "#ccc" : "#4a90e2",
                color: "#fff",
                border: "none",
                borderRadius: 6,
                padding: "10px 36px",
                fontWeight: 600,
                fontSize: 16,
                cursor: loading ? "not-allowed" : "pointer",
                letterSpacing: 1,
              }}
            >
              {loading
                ? isEdit
                  ? "Updating..."
                  : "Creating..."
                : isEdit
                ? "Update"
                : "Submit"}
            </button>
            <button
              type="button"
              style={{
                background: "#f0f0f0",
                color: "#888",
                border: "none",
                borderRadius: 6,
                padding: "10px 36px",
                fontWeight: 500,
                fontSize: 16,
                cursor: "pointer",
              }}
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }

  // --- OVERVIEW VIEW ---
  if (viewMode === "overview" && selectedSchool) {
    const s = selectedSchool;
    return (
      <div
        className="school-container"
        style={{ background: "#f7f7f7", minHeight: "100vh" }}
      >
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
            <span style={{ fontSize: 16 }}>🏠</span> School{" "}
            <FiChevronRight size={14} /> Overview
          </span>
        </div>
        <div
          style={{
            background: "#fff",
            borderRadius: 14,
            padding: 28,
            display: "flex",
            alignItems: "center",
            marginBottom: 24,
            boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
          }}
        >
          <div
            style={{
              width: 70,
              height: 70,
              borderRadius: "50%",
              background: "#eaeaea",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 38,
              color: "#b0b0b0",
              marginRight: 28,
            }}
          >
            <span>👤</span>
          </div>
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontWeight: 600,
                fontSize: 20,
                color: "#222",
                marginBottom: 6,
              }}
            >
              {s.name}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 24,
                color: "#888",
                fontSize: 15,
              }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <FiMail /> {s.email}
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <FiPhone /> {s.phone}
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <FiGlobe /> {s.website}
              </span>
            </div>
          </div>
          <button
            style={{
              background: "#f5f5f5",
              border: "none",
              borderRadius: 8,
              padding: "8px 18px",
              color: "#555",
              fontWeight: 500,
              fontSize: 15,
              display: "flex",
              alignItems: "center",
              gap: 6,
              cursor: "pointer",
            }}
            onClick={() => handleEdit(s)}
          >
            <FiEdit /> Edit
          </button>
        </div>
        {/* Details Card */}
        <div
          style={{
            background: "#fff",
            borderRadius: 12,
            padding: 32,
            boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
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
            Details
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 0 }}>
            <div style={{ flex: 1, minWidth: 260 }}>
              <div style={{ marginBottom: 12, color: "#888", fontSize: 15 }}>
                School Name{" "}
                <span style={{ color: "#222", fontWeight: 500 }}>
                  : {s.name}
                </span>
              </div>
              <div style={{ marginBottom: 12, color: "#888", fontSize: 15 }}>
                Institute Name{" "}
                <span style={{ color: "#222", fontWeight: 500 }}>
                  : {s.instituteName}
                </span>
              </div>
              <div style={{ marginBottom: 12, color: "#888", fontSize: 15 }}>
                Branch Name{" "}
                <span style={{ color: "#222", fontWeight: 500 }}>
                  : {s.branchName}
                </span>
              </div>
              <div style={{ marginBottom: 12, color: "#888", fontSize: 15 }}>
                Phone Number{" "}
                <span style={{ color: "#222", fontWeight: 500 }}>
                  : {s.phone}
                </span>
              </div>
              <div style={{ marginBottom: 12, color: "#888", fontSize: 15 }}>
                Address Line 1{" "}
                <span style={{ color: "#222", fontWeight: 500 }}>
                  : {s.address1}
                </span>
              </div>
              <div style={{ marginBottom: 12, color: "#888", fontSize: 15 }}>
                City{" "}
                <span style={{ color: "#222", fontWeight: 500 }}>
                  : {s.city.city}
                </span>
              </div>
              <div style={{ marginBottom: 12, color: "#888", fontSize: 15 }}>
                Pin Code{" "}
                <span style={{ color: "#222", fontWeight: 500 }}>
                  : {s.pincode}
                </span>
              </div>
            </div>
            <div style={{ flex: 1, minWidth: 260 }}>
              <div style={{ marginBottom: 12, color: "#888", fontSize: 15 }}>
                School Code{" "}
                <span style={{ color: "#222", fontWeight: 500 }}>
                  : {s.code}
                </span>
              </div>
              <div style={{ marginBottom: 12, color: "#888", fontSize: 15 }}>
                Institute Code{" "}
                <span style={{ color: "#222", fontWeight: 500 }}>
                  : {s.instituteCode}
                </span>
              </div>
              <div style={{ marginBottom: 12, color: "#888", fontSize: 15 }}>
                Branch Code{" "}
                <span style={{ color: "#222", fontWeight: 500 }}>
                  : {s.branchCode}
                </span>
              </div>
              <div style={{ marginBottom: 12, color: "#888", fontSize: 15 }}>
                Email Address{" "}
                <span style={{ color: "#222", fontWeight: 500 }}>
                  : {s.email}
                </span>
              </div>
              <div style={{ marginBottom: 12, color: "#888", fontSize: 15 }}>
                Address Line 2{" "}
                <span style={{ color: "#222", fontWeight: 500 }}>
                  : {s.address2}
                </span>
              </div>
              <div style={{ marginBottom: 12, color: "#888", fontSize: 15 }}>
                State{" "}
                <span style={{ color: "#222", fontWeight: 500 }}>
                  : {s.state.state}
                </span>
              </div>
              <div style={{ marginBottom: 12, color: "#888", fontSize: 15 }}>
                Website{" "}
                <span style={{ color: "#b0b0b0", fontWeight: 400 }}>
                  {s.website}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div style={{ marginTop: 24, textAlign: "center" }}>
          <button
            style={{
              background: "#f0f0f0",
              color: "#888",
              border: "none",
              borderRadius: 6,
              padding: "10px 36px",
              fontWeight: 500,
              fontSize: 16,
              cursor: "pointer",
            }}
            onClick={handleCancel}
          >
            Back to List
          </button>
        </div>
      </div>
    );
  }

  // --- LIST VIEW ---
  return (
    <div className="school-container">
      <div className="school-header">
        <select
          className="dropdown"
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
          className="search-input"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(1);
          }}
        />
        <div className="actions">
          <button
            className="create-btn"
            onClick={() => {
              setViewMode("form");
              setIsEdit(false);
              setForm(initialFormState);
              setEditId(null);
            }}
          >
            + Create
          </button>
          <button className="icon-btn">
            <FiDownload />
          </button>
          <button className="icon-btn">
            <FiMaximize2 />
          </button>
          <button className="icon-btn">
            <FiFilter />
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
          Loading schools...
        </div>
      ) : (
        <div className="school-table-scroll">
          <table className="school-table">
            <thead>
              <tr>
                <th>School Name</th>
                <th>Institute</th>
                <th>Branch</th>
                <th>School Type</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((school) => (
                <tr key={school.id}>
                  <td>
                    <div className="branch-name">{school.name}</div>
                    <div className="branch-code">{school.code}</div>
                  </td>
                  <td>
                    <div className="institute-name">{school.instituteName}</div>
                    <div className="institute-code">{school.instituteCode}</div>
                  </td>
                  <td>
                    <div className="branch-name">{school.branchName}</div>
                    <div className="branch-code">{school.branchCode}</div>
                  </td>
                  <td>
                    <div className="branch-name">{school.schoolType}</div>
                  </td>
                  <td>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={school.status}
                        onChange={() => toggleStatus(school.id)}
                      />
                      <span className="slider round"></span>
                    </label>
                  </td>
                  <td style={{ display: "flex", gap: 8 }}>
                    <button
                      className="edit-btn"
                      title="Overview"
                      onClick={() => handleOverview(school)}
                    >
                      <FiEye size={16} />
                    </button>
                    <button
                      className="edit-btn"
                      title="Edit"
                      onClick={() => handleEdit(school)}
                    >
                      <FiEdit size={16} />
                    </button>
                    <button
                      className="edit-btn"
                      title="Delete"
                      onClick={() => setDeleteConfirmId(school.id)}
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
      <div className="school-footer">
        <div className="footer-text">
          Showing {total === 0 ? 0 : startIdx + 1} to {endIdx} of {total}{" "}
          entries
        </div>
        <div className="pagination">
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
      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="modal-overlay">
          <div className="modal">
            <div>Are you sure you want to delete this school?</div>
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

export default School;
