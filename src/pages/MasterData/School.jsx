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
  FiUpload,
  FiX,
  FiClock,
  FiDollarSign,
  FiFileText,
  FiCreditCard,
  FiBell,
} from "react-icons/fi";
import "./Styles/School.css";
import axios from "axios";
import API_BASE_URL from "../../config/api";

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

const overviewTabs = [
  { label: "Overview", icon: FiClock },
  { label: "Security", icon: FiClock },
  { label: "Statics", icon: FiClock },
  { label: "Students", icon: FiClock },
  { label: "Plans", icon: FiDollarSign },
  { label: "Invoice", icon: FiFileText },
  { label: "Bill", icon: FiCreditCard },
  { label: "History", icon: FiClock },
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
  boardId: null,
  phone: "",
  email: "",
  telephone: "",
  website: "",
  logo: null,
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
  const [institutes, setInstitutes] = useState([]);
  const [branches, setBranches] = useState([]);
  const [boards, setBoards] = useState([]);

  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [cities, setCities] = useState([]);

  // Filter states
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    instituteCode: "",
    instituteName: "",
    branchCode: "",
    branchName: "",
    boardId: "",
    schoolType: "",
    schoolCode: "",
    schoolName: "",
    status: "",
  });

  // Overview tab state
  const [activeTab, setActiveTab] = useState("Overview");

  const SERVER_URL = `${API_BASE_URL}/schools`;
  const SERVER_URL_INSTITUTES = `${API_BASE_URL}/institutes`;
  const SERVER_URL_BRANCHES = `${API_BASE_URL}/branches`;
  const SERVER_URL_BOARDS = `${API_BASE_URL}/boards`;
  const SERVER_URL_STATES = `${API_BASE_URL}/states`;
  const SERVER_URL_CITIES = `${API_BASE_URL}/cities`;

  const fetchInstitutes = async () => {
    try {
      const response = await axios.get(`${SERVER_URL_INSTITUTES}`);
      setInstitutes(response.data);
    } catch (error) {
      console.error("Error fetching institutes:", error);
    }
  };

  const fetchBranches = async () => {
    try {
      const response = await axios.get(`${SERVER_URL_BRANCHES}`);
      setBranches(response.data);
    } catch (error) {
      console.error("Error fetching branches:", error);
    }
  };

  const fetchBoards = async () => {
    try {
      const response = await axios.get(`${SERVER_URL_BOARDS}`);
      setBoards(response.data);
    } catch (error) {
      console.error("Error fetching boards:", error);
    }
  };

  const fetchStates = async () => {
    try {
      const response = await axios.get(`${SERVER_URL_STATES}`);
      const data = await response.data;
      console.log("Fetched states:", data);
      setStates(data);
    } catch (error) {
      console.error("Error fetching states:", error);
      // setError("Failed to fetch states");
    }
  };

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
  };

  // Fetch schools from API
  const fetchSchools = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${SERVER_URL}`);
      console.log(response.data);

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
    fetchInstitutes();
    fetchBranches();
    fetchBoards();
  }, []);

  // Toggle status (optimistic)
  const toggleStatus = async (id) => {
    try {
      const response = await axios.patch(`${SERVER_URL}/${id}/toggle-status`);

      const data = response.data;

      setSchools(
        (
          prev // for smooth update
        ) => prev.map((p) => (p.id === id ? data : p))
      );
      console.log(data);

      if (!response.status) throw new Error("Failed to toggle status");
      // fetchSchools(); // revert
    } catch (err) {
      setError(err.message);
    }
  };

  // Advanced filtering
  const filteredSchools = schools.filter((school) => {
    // Basic search
    const matchesSearch =
      !searchTerm ||
      school.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      school.code?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      school.instituteName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      school.instituteCode?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      school.branchName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      school.branchCode?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      school.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      school.phone?.includes(searchTerm);

    // Advanced filters
    const matchesFilters =
      (!filters.instituteCode ||
        school.instituteCode
          ?.toLowerCase()
          .includes(filters.instituteCode.toLowerCase())) &&
      (!filters.instituteName ||
        school.instituteName
          ?.toLowerCase()
          .includes(filters.instituteName.toLowerCase())) &&
      (!filters.branchCode ||
        school.branchCode
          ?.toLowerCase()
          .includes(filters.branchCode.toLowerCase())) &&
      (!filters.branchName ||
        school.branchName
          ?.toLowerCase()
          .includes(filters.branchName.toLowerCase())) &&
      (!filters.boardId || school.boardId === Number(filters.boardId)) &&
      (!filters.schoolType || school.schoolType === filters.schoolType) &&
      (!filters.schoolCode ||
        school.code
          ?.toLowerCase()
          .includes(filters.schoolCode.toLowerCase())) &&
      (!filters.schoolName ||
        school.name
          ?.toLowerCase()
          .includes(filters.schoolName.toLowerCase())) &&
      (filters.status === "" ||
        (filters.status === "active" && school.status) ||
        (filters.status === "inactive" && !school.status));

    return matchesSearch && matchesFilters;
  });
  const total = filteredSchools.length;
  const totalPages = Math.ceil(total / pageSize);
  const startIdx = (page - 1) * pageSize;
  const endIdx = Math.min(startIdx + pageSize, total);
  const paginated = filteredSchools.slice(startIdx, endIdx);

  const handleFormChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 800 * 1024) {
        setError("Logo size must be less than 800KB");
        return;
      }
      if (!file.type.startsWith("image/")) {
        setError("Please upload an image file");
        return;
      }
      setForm({ ...form, logo: file });
      setError("");
    }
  };

  // Validation
  const validateForm = () => {
    if (!form.code || form.code.trim() === "") {
      setError("School Code is required");
      return false;
    }
    if (!form.email || form.email.trim() === "") {
      setError("Email is required");
      return false;
    }
    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError("Please enter a valid email address");
      return false;
    }
    // Phone validation
    if (form.phone && !/^\d{10}$/.test(form.phone.replace(/\D/g, ""))) {
      setError("Please enter a valid 10-digit phone number");
      return false;
    }
    // Check for duplicate school code (if creating new)
    if (!isEdit) {
      const duplicateCode = schools.find(
        (s) => s.code.toLowerCase() === form.code.toLowerCase()
      );
      if (duplicateCode) {
        setError("School Code already exists. Please use a unique code.");
        return false;
      }
      // Check for duplicate email
      const duplicateEmail = schools.find(
        (s) => s.email.toLowerCase() === form.email.toLowerCase()
      );
      if (duplicateEmail) {
        setError("Email already exists. Please use a unique email.");
        return false;
      }
    }
    return true;
  };

  // Export functionality
  const handleExport = () => {
    const csvContent = [
      [
        "School Code",
        "School Name",
        "Institute Code",
        "Institute Name",
        "Branch Code",
        "Branch Name",
        "Board",
        "School Type",
        "Email",
        "Phone",
        "Address",
        "City",
        "State",
        "Pincode",
        "Status",
      ],
      ...filteredSchools.map((school) => [
        school.code || "",
        school.name || "",
        school.instituteCode || "",
        school.instituteName || "",
        school.branchCode || "",
        school.branchName || "",
        school.board?.name || "",
        school.schoolType || "",
        school.email || "",
        school.phone || "",
        school.address1 || "",
        school.city?.city || "",
        school.state?.state || "",
        school.pincode || "",
        school.status ? "Active" : "Inactive",
      ]),
    ]
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `schools_export_${new Date().getTime()}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Import functionality
  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const text = event.target.result;
        // Simple CSV parsing (you may want to use a library like papaparse)
        const lines = text.split("\n");
        const headers = lines[0]
          .split(",")
          .map((h) => h.trim().replace(/"/g, ""));

        // This is a basic implementation - you'd need proper CSV parsing
        setError(
          "Import functionality requires CSV parsing library. Please implement using papaparse or similar."
        );
      } catch (err) {
        setError("Failed to import file: " + err.message);
      }
    };
    reader.readAsText(file);
  };

  // Create or Edit
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validate form
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    const submitForm = { ...form };
    submitForm.stateId = Number(submitForm.stateId);
    submitForm.cityId = Number(submitForm.cityId);
    if (submitForm.boardId) {
      submitForm.boardId = Number(submitForm.boardId);
    }

    // Create FormData if logo is present
    const formData = new FormData();
    Object.keys(submitForm).forEach((key) => {
      if (key === "logo" && submitForm[key]) {
        formData.append("logo", submitForm[key]);
      } else if (submitForm[key] !== null && submitForm[key] !== undefined) {
        formData.append(key, submitForm[key]);
      }
    });

    try {
      if (isEdit && editId) {
        const response = await axios.put(
          `${SERVER_URL}/${editId}`,
          submitForm.logo ? formData : submitForm,
          submitForm.logo
            ? {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            : {}
        );
        if (!response.status) throw new Error("Failed to update school");
        fetchSchools();
      } else {
        const response = await axios.post(
          `${SERVER_URL}`,
          submitForm.logo ? formData : submitForm,
          submitForm.logo
            ? {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            : {}
        );
        if (!response.status) throw new Error("Failed to create school");
        const data = await response.data;
        fetchSchools();
      }
      setForm(initialFormState);
      setIsEdit(false);
      setEditId(null);
      setViewMode("list");
    } catch (err) {
      setError(
        err.response?.data?.error || err.message || "Failed to save school"
      );
    } finally {
      setLoading(false);
    }
  };

  // Edit
  const handleEdit = (school) => {
    setForm({
      ...school,
      boardId: school.boardId || school.board?.id || null,
    });
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
            School <span style={{ color: "#888" }}>&gt;</span>{" "}
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
            {/* Logo Upload Section */}
            <div
              style={{
                marginBottom: 24,
                padding: 20,
                border: "2px dashed #e0e0e0",
                borderRadius: 8,
                textAlign: "center",
              }}
            >
              <div style={{ marginBottom: 12 }}>
                {form.logo ? (
                  <div
                    style={{ position: "relative", display: "inline-block" }}
                  >
                    <img
                      src={
                        typeof form.logo === "string"
                          ? form.logo
                          : URL.createObjectURL(form.logo)
                      }
                      alt="School Logo"
                      style={{
                        maxWidth: 120,
                        maxHeight: 120,
                        borderRadius: 8,
                        objectFit: "cover",
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, logo: null })}
                      style={{
                        position: "absolute",
                        top: -8,
                        right: -8,
                        background: "#e74c3c",
                        color: "white",
                        border: "none",
                        borderRadius: "50%",
                        width: 24,
                        height: 24,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <FiX size={14} />
                    </button>
                  </div>
                ) : (
                  <div
                    style={{
                      width: 120,
                      height: 120,
                      margin: "0 auto",
                      background: "#f5f5f5",
                      borderRadius: 8,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#888",
                    }}
                  >
                    <FiUpload size={32} />
                  </div>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "none" }}
                id="logo-upload"
              />
              <label
                htmlFor="logo-upload"
                style={{
                  display: "inline-block",
                  padding: "8px 16px",
                  background: "#1ecab8",
                  color: "white",
                  borderRadius: 6,
                  cursor: "pointer",
                  fontSize: 14,
                  fontWeight: 500,
                }}
              >
                {form.logo ? "Change Logo" : "Upload Logo"}
              </label>
              <p style={{ fontSize: 12, color: "#888", marginTop: 8 }}>
                Allowed JPG, GIF or PNG. Max size of 800kB
              </p>
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
                    onChange={(e) =>
                      handleFormChange(e.target.name, e.target.value)
                    }
                    required
                  />
                </div>
                <div style={fieldWrapper}>
                  <label style={labelStyle}>
                    Institute Code
                    {isEdit && (
                      <span
                        style={{ color: "#888", fontSize: 11, marginLeft: 4 }}
                      >
                        (Read Only)
                      </span>
                    )}
                  </label>
                  <input
                    style={{
                      ...inputStyle,
                      ...(isEdit
                        ? { background: "#f5f5f5", cursor: "not-allowed" }
                        : {}),
                    }}
                    placeholder="Institute Code"
                    name="instituteCode"
                    value={form.instituteCode}
                    onChange={(e) =>
                      handleFormChange(e.target.name, e.target.value)
                    }
                    disabled={isEdit}
                    required
                  />
                </div>
                <div style={fieldWrapper}>
                  <label style={labelStyle}>
                    Branch Code
                    {isEdit && (
                      <span
                        style={{ color: "#888", fontSize: 11, marginLeft: 4 }}
                      >
                        (Read Only)
                      </span>
                    )}
                  </label>
                  <input
                    style={{
                      ...inputStyle,
                      ...(isEdit
                        ? { background: "#f5f5f5", cursor: "not-allowed" }
                        : {}),
                    }}
                    placeholder="Branch Code"
                    name="branchCode"
                    value={form.branchCode}
                    onChange={(e) =>
                      handleFormChange(e.target.name, e.target.value)
                    }
                    disabled={isEdit}
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
                    onChange={(e) =>
                      handleFormChange(e.target.name, e.target.value)
                    }
                    required
                  />
                </div>
                <div style={fieldWrapper}>
                  <label style={labelStyle}>City</label>
                  <select
                    // className="institute-input"
                    style={inputStyle}
                    name="cityId"
                    value={Number(form.cityId)}
                    onChange={(e) =>
                      handleFormChange(e.target.name, e.target.value)
                    }
                    disabled={!form.stateId}
                  >
                    <option value="">Select</option>
                    {cities
                      .filter(
                        (city) => String(city.state) === String(selectedState)
                      )
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
                  <label style={labelStyle}>
                    School Code
                    {isEdit && (
                      <span
                        style={{ color: "#888", fontSize: 11, marginLeft: 4 }}
                      >
                        (Read Only)
                      </span>
                    )}
                  </label>
                  <input
                    style={{
                      ...inputStyle,
                      ...(isEdit
                        ? { background: "#f5f5f5", cursor: "not-allowed" }
                        : {}),
                    }}
                    placeholder="School Code"
                    name="code"
                    value={form.code}
                    onChange={(e) =>
                      handleFormChange(e.target.name, e.target.value)
                    }
                    disabled={isEdit}
                    required
                  />
                </div>
                <div style={fieldWrapper}>
                  <label style={labelStyle}>
                    Institute Name
                    {isEdit && (
                      <span
                        style={{ color: "#888", fontSize: 11, marginLeft: 4 }}
                      >
                        (Read Only)
                      </span>
                    )}
                  </label>
                  <input
                    style={{
                      ...inputStyle,
                      ...(isEdit
                        ? { background: "#f5f5f5", cursor: "not-allowed" }
                        : {}),
                    }}
                    placeholder="Institute Name"
                    name="instituteName"
                    value={form.instituteName}
                    onChange={(e) =>
                      handleFormChange(e.target.name, e.target.value)
                    }
                    disabled={isEdit}
                    required
                  />
                </div>
                <div style={fieldWrapper}>
                  <label style={labelStyle}>
                    Branch Name
                    {isEdit && (
                      <span
                        style={{ color: "#888", fontSize: 11, marginLeft: 4 }}
                      >
                        (Read Only)
                      </span>
                    )}
                  </label>
                  <input
                    style={{
                      ...inputStyle,
                      ...(isEdit
                        ? { background: "#f5f5f5", cursor: "not-allowed" }
                        : {}),
                    }}
                    placeholder="Branch Name"
                    name="branchName"
                    value={form.branchName}
                    onChange={(e) =>
                      handleFormChange(e.target.name, e.target.value)
                    }
                    disabled={isEdit}
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
                    onChange={(e) =>
                      handleFormChange(e.target.name, e.target.value)
                    }
                  />
                </div>
                <div style={fieldWrapper}>
                  <label style={labelStyle}>State</label>
                  <select
                    style={inputStyle}
                    value={Number(form.stateId)}
                    name="stateId"
                    onChange={(e) => {
                      handleFormChange("stateId", e.target.value);
                      const selected = states.find(
                        (state) => String(state.id) === String(e.target.value)
                      );
                      setSelectedState(selected ? selected.state : null);
                      console.log(
                        "Selected state:",
                        selected ? selected.state : ""
                      );
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
                  <label style={labelStyle}>
                    Board
                    {isEdit && (
                      <span
                        style={{ color: "#888", fontSize: 11, marginLeft: 4 }}
                      >
                        (Read Only)
                      </span>
                    )}
                  </label>
                  <select
                    style={{
                      ...inputStyle,
                      ...(isEdit
                        ? { background: "#f5f5f5", cursor: "not-allowed" }
                        : {}),
                    }}
                    name="boardId"
                    value={form.boardId || ""}
                    onChange={(e) =>
                      handleFormChange("boardId", e.target.value)
                    }
                    disabled={isEdit}
                    required
                  >
                    <option value="">Select Board</option>
                    {boards.map((board) => (
                      <option key={board.id} value={board.id}>
                        {board.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div style={fieldWrapper}>
                  <label style={labelStyle}>
                    School Type
                    {isEdit && (
                      <span
                        style={{ color: "#888", fontSize: 11, marginLeft: 4 }}
                      >
                        (Read Only)
                      </span>
                    )}
                  </label>
                  <select
                    style={{
                      ...inputStyle,
                      ...(isEdit
                        ? { background: "#f5f5f5", cursor: "not-allowed" }
                        : {}),
                    }}
                    name="schoolType"
                    value={form.schoolType}
                    onChange={(e) =>
                      handleFormChange(e.target.name, e.target.value)
                    }
                    disabled={isEdit}
                    required
                  >
                    <option value="">Select School Type</option>
                    <option value="Primary">Primary</option>
                    <option value="Secondary">Secondary</option>
                    <option value="HigherSecondary">Higher Secondary</option>
                    <option value="Private">Private</option>
                    <option value="Government">Government</option>
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
                    onChange={(e) =>
                      handleFormChange(e.target.name, e.target.value)
                    }
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
                    onChange={(e) =>
                      handleFormChange(e.target.name, e.target.value)
                    }
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
                    onChange={(e) =>
                      handleFormChange(e.target.name, e.target.value)
                    }
                  />
                </div>
                <div style={fieldWrapper}>
                  <label style={labelStyle}>Website Link</label>
                  <input
                    style={inputStyle}
                    placeholder="Website Link"
                    name="website"
                    value={form.website}
                    onChange={(e) =>
                      handleFormChange(e.target.name, e.target.value)
                    }
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
    // Mock data for financial/admin features
    const subscriptionData = {
      planName: "Premium Plan",
      startDate: "2024-01-01",
      expiryDate: "2024-12-31",
      renewalDate: "2024-12-15",
      cost: "$999/year",
      status: "Active",
    };

    const invoices = [
      {
        id: 1,
        invoiceDate: "2024-01-01",
        totalAmount: 999,
        taxes: 99,
        paymentStatus: "Paid",
      },
      {
        id: 2,
        invoiceDate: "2023-01-01",
        totalAmount: 999,
        taxes: 99,
        paymentStatus: "Paid",
      },
    ];

    const payments = [
      {
        id: 1,
        transactionId: "TXN123456",
        amount: 999,
        paymentMethod: "Credit Card",
        status: "Completed",
        date: "2024-01-01",
      },
    ];

    const notifications = [
      {
        id: 1,
        message: "Subscription renewal due in 15 days",
        date: "2024-12-01",
        read: false,
      },
      {
        id: 2,
        message: "Payment received successfully",
        date: "2024-01-02",
        read: true,
      },
    ];

    const activityLogs = [
      {
        id: 1,
        action: "Created",
        user: "Admin User",
        timestamp: "2024-01-01 10:00:00",
        details: "School created successfully",
      },
      {
        id: 2,
        action: "Updated",
        user: "Admin User",
        timestamp: "2024-01-15 14:30:00",
        details: "School profile updated",
      },
      {
        id: 3,
        action: "Viewed",
        user: "Admin User",
        timestamp: "2024-01-20 09:15:00",
        details: "School overview accessed",
      },
    ];

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
            School <FiChevronRight size={14} /> Overview
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

        {/* Sub-navigation Tabs */}
        <div
          style={{
            display: "flex",
            gap: 8,
            marginBottom: 24,
            overflowX: "auto",
          }}
        >
          {overviewTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.label;
            return (
              <button
                key={tab.label}
                onClick={() => setActiveTab(tab.label)}
                style={{
                  background: isActive ? "#eaeaea" : "transparent",
                  color: isActive ? "#555" : "#888",
                  border: "none",
                  borderRadius: 8,
                  padding: "8px 22px",
                  fontWeight: 500,
                  fontSize: 15,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  whiteSpace: "nowrap",
                  boxShadow: isActive ? "0 1px 2px rgba(0,0,0,0.03)" : "none",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.target.style.background = "#f5f5f5";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.target.style.background = "transparent";
                  }
                }}
              >
                <Icon size={16} /> {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        {activeTab === "Overview" && (
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
                    : {s.state?.state}
                  </span>
                </div>
                <div style={{ marginBottom: 12, color: "#888", fontSize: 15 }}>
                  Board{" "}
                  <span style={{ color: "#222", fontWeight: 500 }}>
                    : {s.board?.name || "N/A"}
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
        )}

        {/* Plans/Subscription Tab */}
        {activeTab === "Plans" && (
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
              Subscription Plan
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 0 }}>
              <div style={{ flex: 1, minWidth: 260 }}>
                <div style={{ marginBottom: 12, color: "#888", fontSize: 15 }}>
                  Plan Name{" "}
                  <span style={{ color: "#222", fontWeight: 500 }}>
                    : {subscriptionData.planName}
                  </span>
                </div>
                <div style={{ marginBottom: 12, color: "#888", fontSize: 15 }}>
                  Start Date{" "}
                  <span style={{ color: "#222", fontWeight: 500 }}>
                    : {subscriptionData.startDate}
                  </span>
                </div>
                <div style={{ marginBottom: 12, color: "#888", fontSize: 15 }}>
                  Renewal Date{" "}
                  <span style={{ color: "#222", fontWeight: 500 }}>
                    : {subscriptionData.renewalDate}
                  </span>
                </div>
              </div>
              <div style={{ flex: 1, minWidth: 260 }}>
                <div style={{ marginBottom: 12, color: "#888", fontSize: 15 }}>
                  Expiry Date{" "}
                  <span style={{ color: "#222", fontWeight: 500 }}>
                    : {subscriptionData.expiryDate}
                  </span>
                </div>
                <div style={{ marginBottom: 12, color: "#888", fontSize: 15 }}>
                  Cost{" "}
                  <span style={{ color: "#222", fontWeight: 500 }}>
                    : {subscriptionData.cost}
                  </span>
                </div>
                <div style={{ marginBottom: 12, color: "#888", fontSize: 15 }}>
                  Status{" "}
                  <span style={{ color: "#222", fontWeight: 500 }}>
                    : {subscriptionData.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Invoice Tab */}
        {activeTab === "Invoice" && (
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
              Billing History
            </div>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
              }}
            >
              <thead>
                <tr style={{ borderBottom: "2px solid #f0f0f0" }}>
                  <th
                    style={{
                      padding: "12px",
                      textAlign: "left",
                      color: "#888",
                    }}
                  >
                    Invoice Date
                  </th>
                  <th
                    style={{
                      padding: "12px",
                      textAlign: "left",
                      color: "#888",
                    }}
                  >
                    Total Amount
                  </th>
                  <th
                    style={{
                      padding: "12px",
                      textAlign: "left",
                      color: "#888",
                    }}
                  >
                    Taxes
                  </th>
                  <th
                    style={{
                      padding: "12px",
                      textAlign: "left",
                      color: "#888",
                    }}
                  >
                    Payment Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => (
                  <tr
                    key={invoice.id}
                    style={{ borderBottom: "1px solid #f0f0f0" }}
                  >
                    <td style={{ padding: "12px" }}>{invoice.invoiceDate}</td>
                    <td style={{ padding: "12px" }}>${invoice.totalAmount}</td>
                    <td style={{ padding: "12px" }}>${invoice.taxes}</td>
                    <td style={{ padding: "12px" }}>
                      <span
                        style={{
                          padding: "4px 12px",
                          borderRadius: 12,
                          background:
                            invoice.paymentStatus === "Paid"
                              ? "#d4edda"
                              : "#f8d7da",
                          color:
                            invoice.paymentStatus === "Paid"
                              ? "#155724"
                              : "#721c24",
                          fontSize: 13,
                        }}
                      >
                        {invoice.paymentStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Payments Tab */}
        {activeTab === "Bill" && (
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
              Payment Transactions
            </div>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
              }}
            >
              <thead>
                <tr style={{ borderBottom: "2px solid #f0f0f0" }}>
                  <th
                    style={{
                      padding: "12px",
                      textAlign: "left",
                      color: "#888",
                    }}
                  >
                    Transaction ID
                  </th>
                  <th
                    style={{
                      padding: "12px",
                      textAlign: "left",
                      color: "#888",
                    }}
                  >
                    Amount
                  </th>
                  <th
                    style={{
                      padding: "12px",
                      textAlign: "left",
                      color: "#888",
                    }}
                  >
                    Payment Method
                  </th>
                  <th
                    style={{
                      padding: "12px",
                      textAlign: "left",
                      color: "#888",
                    }}
                  >
                    Status
                  </th>
                  <th
                    style={{
                      padding: "12px",
                      textAlign: "left",
                      color: "#888",
                    }}
                  >
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr
                    key={payment.id}
                    style={{ borderBottom: "1px solid #f0f0f0" }}
                  >
                    <td style={{ padding: "12px" }}>{payment.transactionId}</td>
                    <td style={{ padding: "12px" }}>${payment.amount}</td>
                    <td style={{ padding: "12px" }}>{payment.paymentMethod}</td>
                    <td style={{ padding: "12px" }}>
                      <span
                        style={{
                          padding: "4px 12px",
                          borderRadius: 12,
                          background: "#d4edda",
                          color: "#155724",
                          fontSize: 13,
                        }}
                      >
                        {payment.status}
                      </span>
                    </td>
                    <td style={{ padding: "12px" }}>{payment.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === "Security" && (
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
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <FiBell /> Notifications
              {notifications.filter((n) => !n.read).length > 0 && (
                <span
                  style={{
                    background: "#e74c3c",
                    color: "white",
                    borderRadius: "50%",
                    width: 20,
                    height: 20,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                >
                  {notifications.filter((n) => !n.read).length}
                </span>
              )}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  style={{
                    padding: 16,
                    background: notification.read ? "#fff" : "#f8f9fa",
                    borderRadius: 8,
                    borderLeft: notification.read
                      ? "none"
                      : "3px solid #1ecab8",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "start",
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          fontWeight: notification.read ? 400 : 600,
                          color: "#222",
                          marginBottom: 4,
                        }}
                      >
                        {notification.message}
                      </div>
                      <div style={{ fontSize: 13, color: "#888" }}>
                        {notification.date}
                      </div>
                    </div>
                    {!notification.read && (
                      <span
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          background: "#1ecab8",
                        }}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Activity Logs/History Tab */}
        {activeTab === "History" && (
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
              Activity Logs (Audit Trail)
            </div>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
              }}
            >
              <thead>
                <tr style={{ borderBottom: "2px solid #f0f0f0" }}>
                  <th
                    style={{
                      padding: "12px",
                      textAlign: "left",
                      color: "#888",
                    }}
                  >
                    Action
                  </th>
                  <th
                    style={{
                      padding: "12px",
                      textAlign: "left",
                      color: "#888",
                    }}
                  >
                    User
                  </th>
                  <th
                    style={{
                      padding: "12px",
                      textAlign: "left",
                      color: "#888",
                    }}
                  >
                    Timestamp
                  </th>
                  <th
                    style={{
                      padding: "12px",
                      textAlign: "left",
                      color: "#888",
                    }}
                  >
                    Details
                  </th>
                </tr>
              </thead>
              <tbody>
                {activityLogs.map((log) => (
                  <tr
                    key={log.id}
                    style={{ borderBottom: "1px solid #f0f0f0" }}
                  >
                    <td style={{ padding: "12px" }}>
                      <span
                        style={{
                          padding: "4px 12px",
                          borderRadius: 12,
                          background: "#e3f2fd",
                          color: "#1976d2",
                          fontSize: 13,
                          fontWeight: 500,
                        }}
                      >
                        {log.action}
                      </span>
                    </td>
                    <td style={{ padding: "12px" }}>{log.user}</td>
                    <td style={{ padding: "12px", color: "#888" }}>
                      {log.timestamp}
                    </td>
                    <td style={{ padding: "12px", color: "#666" }}>
                      {log.details}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Placeholder tabs */}
        {(activeTab === "Statics" || activeTab === "Students") && (
          <div
            style={{
              background: "#fff",
              borderRadius: 12,
              padding: 32,
              boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
              textAlign: "center",
              color: "#888",
            }}
          >
            <div style={{ fontSize: 16, marginBottom: 8 }}>
              {activeTab} feature coming soon
            </div>
            <div style={{ fontSize: 14 }}>
              This section will display {activeTab.toLowerCase()} information
            </div>
          </div>
        )}
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
          <button className="icon-btn" onClick={handleExport} title="Export">
            <FiDownload />
          </button>
          <label
            className="icon-btn"
            title="Import"
            style={{ position: "relative", cursor: "pointer" }}
          >
            <FiUpload />
            <input
              type="file"
              accept=".csv"
              onChange={handleImport}
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                top: 0,
                left: 0,
                opacity: 0,
                cursor: "pointer",
              }}
            />
          </label>
          <button
            className="icon-btn"
            onClick={() => setShowFilters(!showFilters)}
            title="Filter"
            style={{
              background: showFilters ? "#1ecab8" : "white",
              color: showFilters ? "white" : "#555",
            }}
          >
            <FiFilter />
          </button>
        </div>
      </div>

      {/* Advanced Filters Panel */}
      {showFilters && (
        <div
          style={{
            background: "#fff",
            borderRadius: 12,
            padding: 20,
            marginBottom: 20,
            boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <h3 style={{ fontSize: 16, fontWeight: 600, color: "#222" }}>
              Advanced Filters
            </h3>
            <button
              onClick={() => {
                setFilters({
                  instituteCode: "",
                  instituteName: "",
                  branchCode: "",
                  branchName: "",
                  boardId: "",
                  schoolType: "",
                  schoolCode: "",
                  schoolName: "",
                  status: "",
                });
              }}
              style={{
                background: "transparent",
                border: "1px solid #e0e0e0",
                borderRadius: 6,
                padding: "6px 12px",
                fontSize: 13,
                cursor: "pointer",
                color: "#888",
              }}
            >
              Clear All
            </button>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 16,
            }}
          >
            <div>
              <label style={{ ...labelStyle, marginBottom: 6 }}>
                Institute Code
              </label>
              <input
                style={inputStyle}
                placeholder="Institute Code"
                value={filters.instituteCode}
                onChange={(e) =>
                  setFilters({ ...filters, instituteCode: e.target.value })
                }
              />
            </div>
            <div>
              <label style={{ ...labelStyle, marginBottom: 6 }}>
                Institute Name
              </label>
              <input
                style={inputStyle}
                placeholder="Institute Name"
                value={filters.instituteName}
                onChange={(e) =>
                  setFilters({ ...filters, instituteName: e.target.value })
                }
              />
            </div>
            <div>
              <label style={{ ...labelStyle, marginBottom: 6 }}>
                Branch Code
              </label>
              <input
                style={inputStyle}
                placeholder="Branch Code"
                value={filters.branchCode}
                onChange={(e) =>
                  setFilters({ ...filters, branchCode: e.target.value })
                }
              />
            </div>
            <div>
              <label style={{ ...labelStyle, marginBottom: 6 }}>
                Branch Name
              </label>
              <input
                style={inputStyle}
                placeholder="Branch Name"
                value={filters.branchName}
                onChange={(e) =>
                  setFilters({ ...filters, branchName: e.target.value })
                }
              />
            </div>
            <div>
              <label style={{ ...labelStyle, marginBottom: 6 }}>Board</label>
              <select
                style={inputStyle}
                value={filters.boardId}
                onChange={(e) =>
                  setFilters({ ...filters, boardId: e.target.value })
                }
              >
                <option value="">All Boards</option>
                {boards.map((board) => (
                  <option key={board.id} value={board.id}>
                    {board.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label style={{ ...labelStyle, marginBottom: 6 }}>
                School Type
              </label>
              <select
                style={inputStyle}
                value={filters.schoolType}
                onChange={(e) =>
                  setFilters({ ...filters, schoolType: e.target.value })
                }
              >
                <option value="">All Types</option>
                <option value="Primary">Primary</option>
                <option value="Secondary">Secondary</option>
                <option value="HigherSecondary">Higher Secondary</option>
                <option value="Private">Private</option>
                <option value="Government">Government</option>
              </select>
            </div>
            <div>
              <label style={{ ...labelStyle, marginBottom: 6 }}>
                School Code
              </label>
              <input
                style={inputStyle}
                placeholder="School Code"
                value={filters.schoolCode}
                onChange={(e) =>
                  setFilters({ ...filters, schoolCode: e.target.value })
                }
              />
            </div>
            <div>
              <label style={{ ...labelStyle, marginBottom: 6 }}>
                School Name
              </label>
              <input
                style={inputStyle}
                placeholder="School Name"
                value={filters.schoolName}
                onChange={(e) =>
                  setFilters({ ...filters, schoolName: e.target.value })
                }
              />
            </div>
            <div>
              <label style={{ ...labelStyle, marginBottom: 6 }}>Status</label>
              <select
                style={inputStyle}
                value={filters.status}
                onChange={(e) =>
                  setFilters({ ...filters, status: e.target.value })
                }
              >
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>
      )}

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
                <th>Board</th>
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
                    <div className="branch-name">
                      {school.board?.name || "N/A"}
                    </div>
                  </td>
                  <td>
                    <div className="branch-name">{school.schoolType}</div>
                  </td>
                  <td>
                    <label className="school-switch">
                      <input
                        type="checkbox"
                        checked={school.status}
                        onChange={() => toggleStatus(school.id)}
                      />
                      <span className="school-slider round"></span>
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
