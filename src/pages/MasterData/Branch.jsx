import React, { useEffect, useState } from "react";
import {
  FiEdit,
  FiFilter,
  FiDownload,
  FiMaximize2,
  FiTrash2,
  FiEye,
} from "react-icons/fi";
import "./Branch.css";
import "./BranchForm.css";
import axios from "axios";

const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

const defaultForm = {
  instituteCode: "INS001",
  instituteId: null,
  cityId: null,
  stateId: null,
  branchCode: "",
  branchName: "",
  address1: "",
  address2: "",
  pincode: "",
  phone: "",
  telephone: "",
  email: "",
  website: "",
  status: true,
};

const initialBranches = [
  {
    id: 1,
    name: "Example Branch Name",
    code: "951203",
    institute: "Example Institute Name",
    instituteCode: "951203",
    address1: "Ashok Nagar",
    address2: "1st Avenue",
    city: "Chennai",
    state: "Tamil Nadu",
    pincode: "600106",
    phone: "9876543210",
    telephone: "0442345678",
    email: "branch@example.com",
    website: "www.branch.com",
    status: true,
  },
];

// const BranchForm = ({
//   isEdit,
//   form,
//   onChange,
//   onSubmit,
//   onCancel,
//   loading,
//   cities
// }) => (
//   <div className="branch-form-container">
//     <h3 className="branch-form-title">{isEdit ? "Edit" : "Create"} Branch</h3>
//     <form onSubmit={onSubmit} noValidate>
//       <fieldset className="form-section">
//         <legend>Institute Details</legend>
//         <div className="branch-form-grid">
//           <div className="branch-form-input">
//             <label>Institute Code</label>
//             <input type="text" value={form.instituteCode} disabled />
//           </div>
//           <div className="branch-form-input">

//             <label>Institute Name</label>
//             {/* <input type="text" value={form.instituteName} disabled /> */}
//             <select
//                     className="branch-form-input"
//                     value={form.cityId}
//                     onChange={(e) => onChange("cityId", e.target.value)}
//                     disabled={!form.stateId}
//                   >
//                     <option value="">Select</option>
//                     {cities
//                       .filter((city) => String(city.state) === String(selectedState))
//                       .map((city) => (
//                         <option key={city.id} value={city.id}>
//                           {city.city}
//                         </option>
//                       ))}
//                   </select>


//           </div>

//         </div>
//       </fieldset>
//       <fieldset className="form-section">
//         <legend>Branch Details</legend>
//         <div className="branch-form-grid">
//           {isEdit && (
//             <div className="branch-form-input">
//               <label>Branch Code</label>
//               <input type="text" value={form.branchCode} disabled />
//             </div>
//           )}
//           <div className="branch-form-input">
//             <label>Branch Name</label>
//             <input
//               type="text"
//               value={form.branchName}
//               onChange={(e) => onChange("branchName", e.target.value)}
//               required
//             />
//           </div>
//           <div className="branch-form-input">
//             <label>Address Line 1</label>
//             <input
//               type="text"
//               value={form.address1}
//               onChange={(e) => onChange("address1", e.target.value)}
//               required
//             />
//           </div>
//           <div className="branch-form-input">
//             <label>Address Line 2</label>
//             <input
//               type="text"
//               value={form.address2}
//               onChange={(e) => onChange("address2", e.target.value)}
//             />
//           </div>
//           <div className="branch-form-input">
//             <label>State</label>
//             <select
//               value={form.state}
//               onChange={(e) => onChange("state", e.target.value)}
//               required
//             >
//               <option value="" disabled>
//                 Select State
//               </option>
//               <option>Tamil Nadu</option>
//               <option>Kerala</option>
//             </select>
//           </div>
//           <div className="branch-form-input">
//             <label>City</label>
//             <select
//               value={form.city}
//               onChange={(e) => onChange("city", e.target.value)}
//               required
//             >
//               <option value="" disabled>
//                 Select City
//               </option>
//               <option>Chennai</option>
//               <option>Coimbatore</option>
//             </select>
//           </div>
//           <div className="branch-form-input">
//             <label>Pin Code</label>
//             <input
//               type="text"
//               pattern="\d{6}"
//               value={form.pincode}
//               onChange={(e) => onChange("pincode", e.target.value)}
//               required
//             />
//           </div>
//         </div>
//       </fieldset>
//       <fieldset className="form-section">
//         <legend>Contact Details</legend>
//         <div className="branch-form-grid">
//           <div className="branch-form-input">
//             <label>Phone Number</label>
//             <input
//               type="tel"
//               pattern="\d{10}"
//               value={form.phone}
//               onChange={(e) => onChange("phone", e.target.value)}
//               required
//             />
//           </div>
//           <div className="branch-form-input">
//             <label>Telephone Number</label>
//             <input
//               type="tel"
//               value={form.telephone}
//               onChange={(e) => onChange("telephone", e.target.value)}
//             />
//           </div>
//           <div className="branch-form-input">
//             <label>Email ID</label>
//             <input
//               type="email"
//               value={form.email}
//               onChange={(e) => onChange("email", e.target.value)}
//               required
//             />
//           </div>
//           <div className="branch-form-input">
//             <label>Website Link</label>
//             <input
//               type="url"
//               value={form.website}
//               onChange={(e) => onChange("website", e.target.value)}
//             />
//           </div>
//         </div>
//       </fieldset>
//       <div className="branch-form-actions">
//         <button type="submit" className="submit-btn" disabled={loading}>
//           {loading ? "Submitting..." : isEdit ? "Update" : "Submit"}
//         </button>
//         <button type="button" className="cancel-btn" onClick={onCancel}>
//           Cancel
//         </button>
//       </div>
//     </form>
//   </div>
// );

const BranchOverview = ({ branch, onEdit, onBack }) => {
  const tabs = [
    { label: "Overview" },
    { label: "Security" },
    { label: "History" },
  ];
  return (
    <div
      className="branch-container"
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
          <span style={{ fontSize: 16 }}>🏠</span> Branch Overview
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
            { branch.name}
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
          onClick={onEdit}
        >
          <FiEdit /> Edit
        </button>
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
            marginLeft: 12,
          }}
          onClick={onBack}
        >
          Back
        </button>
      </div>
      <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
        {tabs.map((tab, idx) => (
          <button
            key={tab.label}
            style={{
              background: idx === 0 ? "#eaeaea" : "transparent",
              color: idx === 0 ? "#555" : "#888",
              border: "none",
              borderRadius: 8,
              padding: "8px 22px",
              fontWeight: 500,
              fontSize: 15,
              display: "flex",
              alignItems: "center",
              gap: 8,
              cursor: "pointer",
              boxShadow: idx === 0 ? "0 1px 2px rgba(0,0,0,0.03)" : "none",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div
        className="branch-overview-details"
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
        <div
          className="branch-overview-details-row"
          style={{ display: "flex", flexWrap: "wrap", gap: 0 }}
        >
          <div style={{ flex: 1, minWidth: 260 }}>
            <div style={{ marginBottom: 12, color: "#888", fontSize: 15 }}>
              Branch Name{" "}
              <span style={{ color: "#222", fontWeight: 500 }}>
                : {branch.branchName || branch.name}
              </span>
            </div>
            <div style={{ marginBottom: 12, color: "#888", fontSize: 15 }}>
              Institute Name{" "}
              <span style={{ color: "#222", fontWeight: 500 }}>
                : {branch.institute.name}
              </span>
            </div>
            <div style={{ marginBottom: 12, color: "#888", fontSize: 15 }}>
              Phone Number{" "}
              <span style={{ color: "#222", fontWeight: 500 }}>
                : {branch.phone}
              </span>
            </div>
            <div style={{ marginBottom: 12, color: "#888", fontSize: 15 }}>
              Address Line 1{" "}
              <span style={{ color: "#222", fontWeight: 500 }}>
                : {branch.address1}
              </span>
            </div>
            <div style={{ marginBottom: 12, color: "#888", fontSize: 15 }}>
              City{" "}
              <span style={{ color: "#222", fontWeight: 500 }}>
                : {branch.city.city}
              </span>
            </div>
            <div style={{ marginBottom: 12, color: "#888", fontSize: 15 }}>
              Pin Code{" "}
              <span style={{ color: "#222", fontWeight: 500 }}>
                : {branch.pincode}
              </span>
            </div>
          </div>
          <div style={{ flex: 1, minWidth: 260 }}>
            <div style={{ marginBottom: 12, color: "#888", fontSize: 15 }}>
              Branch Code{" "}
              <span style={{ color: "#222", fontWeight: 500 }}>
                : {branch.branchCode || branch.code}
              </span>
            </div>
            <div style={{ marginBottom: 12, color: "#888", fontSize: 15 }}>
              Institute Code{" "}
              <span style={{ color: "#222", fontWeight: 500 }}>
                : {branch.instituteCode}
              </span>
            </div>
            <div style={{ marginBottom: 12, color: "#888", fontSize: 15 }}>
              Email Address{" "}
              <span style={{ color: "#222", fontWeight: 500 }}>
                : {branch.email}
              </span>
            </div>
            <div style={{ marginBottom: 12, color: "#888", fontSize: 15 }}>
              Address Line 2{" "}
              <span style={{ color: "#222", fontWeight: 500 }}>
                : {branch.address2}
              </span>
            </div>
            <div style={{ marginBottom: 12, color: "#888", fontSize: 15 }}>
              State{" "}
              <span style={{ color: "#222", fontWeight: 500 }}>
                : {branch.state.state}
              </span>
            </div>
            <div style={{ marginBottom: 12, color: "#888", fontSize: 15 }}>
              Website{" "}
              <span style={{ color: "#b0b0b0", fontWeight: 400 }}>
                {branch.website}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Branch = () => {
  const [branches, setBranches] = useState(initialBranches);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);

  // CRUD state
  const [viewMode, setViewMode] = useState("list"); // list | form | overview
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState([]);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  
  
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);
  const [institutes, setInstitutes] = useState([]); 
  
  
  
  const [selectedState, setSelectedState] = useState("");
  const [selectedInstitute, setSelectedInstitute] = useState("");
  const [selectedCity, setInstituteId] = useState("");
  
  const [form, setForm] = useState({
        name: "",
        code: "", // unique 
        instituteCode: null,
        instituteId: null,
        cityId: null,
        stateId: null,
        address1: "",
        address2: "",
        pincode: "",
        phone: "",
        telephone: "",
        email: "",
        website: "",
        status: true,
  });


  const fetchInstitutes = async () => {
    try { 
      const res = await axios.get("http://localhost:5000/api/institutes");
      console.log("Fetched institutes:", res.data);
      setInstitutes(res.data);
    }
    catch (error) {
      console.error("Error fetching institutes:", error);
      setError("Failed to fetch institutes");
    }
  }

  const fetchCities = async () => {
    try {  
      const res = await axios.get("http://localhost:5000/api/cities");
      console.log("Fetched cities:", res.data);
      setCities(res.data);
    }
    catch (error) {
      console.error("Error fetching cities:", error);
      setError("Failed to fetch cities");
    }
  };


  const fetchStates = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/states");
      console.log("Fetched states:", res.data);
      setStates(res.data);
    } catch (error) {
      console.error("Error fetching states:", error);
      setError("Failed to fetch states");
    }
  };

  const fetchAllBranches = async () => {
    const res = await axios.get("http://localhost:5000/api/branches");
    setBranches(res.data);
    console.log("Fetched branches:", res.data);

  }


  useEffect(() => {
    const fetchData = async () => {
    fetchCities()
    fetchStates();
    fetchInstitutes();
    fetchAllBranches()
    }
    fetchData();
  }, []);

  // Fetch initial data 

  // Toggle status
  const toggleStatus =  async (id) => {
    const res = await axios.patch(`http://localhost:5000/api/branches/${id}/toggle-status`, {
      status: !branches.find((branch) => branch.id === id).status,
    });
    const updatedBranch = res.data;
    console.log("Toggled status for branch:", updatedBranch);

    fetchAllBranches();
  };

  // Form handlers
  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!form.instituteId) {
      setError("Institute is required");
    }
    if (!form.name) {
      setError("Branch name is required");
      return;
    }

      form.code = selectedInstitute.code;
    const payload =  { 
        name: form.name,
        code: "1", // form demo purpose 
        instituteCode: form.instituteCode,
        instituteId: Number (form.instituteId),
        cityId: Number (form.cityId),
        stateId: Number (form.stateId),
        address1: form.address1,
        address2: form.address2,
        pincode: form.pincode,
        phone: form.phone,
        telephone: form.telephone,
        email: form.email,
        website: form.website,
        status: true,
      };

    
    if (isEdit && editId) {
      
      // form.code = selectedInstitute.code;
      console.log("Created branch:", payload);
      const res = await axios .put(`http://localhost:5000/api/branches/${editId}`, payload);
      const data = res.data;
      
    } else {
      
      
      const res = await axios.post("http://localhost:5000/api/branches", payload);
      const data = res.data;
      console.log("Created branch:", data);
      
      
    }

    // Reset form and state
    fetchAllBranches();
    
    setViewMode("list");
    setForm(defaultForm);
    setIsEdit(false);
    setEditId(null);
    setSelectedBranch(null);
  };

  const handleEdit = (branch) => {
    setForm({
      instituteCode: branch.instituteCode,
      instituteName: branch.institute,
      branchCode: branch.code,
      branchName: branch.name,
      address1: branch.address1,
      address2: branch.address2,
      city: branch.city,
      state: branch.state,
      pincode: branch.pincode,
      phone: branch.phone,
      telephone: branch.telephone,
      email: branch.email,
      website: branch.website,
      status: branch.status,
    });
    setIsEdit(true);
    setEditId(branch.id);
    setViewMode("form");
  };

  const handleOverview = (branch) => {
    setSelectedBranch(branch);
    console.log("Selected branch for overview:", branch);
    setViewMode("overview");
  };

  const handleCancel = () => {
    setViewMode("list");
    setForm(defaultForm);
    setIsEdit(false);
    setEditId(null);
    setSelectedBranch(null);
  };

  // Delete
  const handleDelete = (id) => {
    try {
      axios.delete(`http://localhost:5000/api/branches/${id}`);
    } catch (error) {
      console.error("Error deleting branch:", error);
      setError("Failed to delete branch");
    }
    
    fetchAllBranches();
    setDeleteConfirmId(null);
    // Reset form and state
    setForm(defaultForm);
    setViewMode("list");
    
  };

  // Filter and paginate
  const filteredBranches = branches.filter(
    (branch) =>
      branch.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      branch.institute?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const total = filteredBranches.length;
  const totalPages = Math.ceil(total / pageSize);
  const startIdx = (page - 1) * pageSize;
  const endIdx = Math.min(startIdx + pageSize, total);
  const paginated = filteredBranches.slice(startIdx, endIdx);

  // --- FORM VIEW ---
  if (viewMode === "form") {
    return (
      <div className="branch-form-wrapper">
        <div className="breadcrumb">
          <span>Branch</span>
          <span style={{ color: "#888" }}>&gt;</span>
          <span>{isEdit ? "Edit" : "Create"}</span>
        </div>
        
        {/* <BranchForm
          isEdit={isEdit}
          form={form}
          onChange={handleChange}
          onSubmit={handleFormSubmit}
          onCancel={handleCancel}
          loading={loading}
          cities={cities}
        /> */}


         {/* BranchForm component */}
         <div className="branch-form-container">
    <h3 className="branch-form-title">{isEdit ? "Edit" : "Create"} Branch</h3>
    <form onSubmit={handleFormSubmit} noValidate>
      <fieldset className="form-section">
        <legend>Institute Details</legend>
        <div className="branch-form-grid">
          <div className="branch-form-input">
            <label>Institute Code</label>
            <input type="text" value={selectedInstitute.code ?? "" } disabled />
          </div>
          <div className="branch-form-input">

            <label>Institute Name</label>
            {/* <input type="text" value={form.instituteName} disabled /> */}
            <select
                    className="branch-form-input"
                    value={form.instituteId}
                     
                    onChange={(e) => { 
                      handleChange("instituteId", e.target.value)
                      const selected = institutes.find((institute) => String(institute.id) === String(e.target.value));
                      setSelectedInstitute(selected);
                      console.log("Selected institute:", selected ? selected.name : "");
                    }
                    }
                    
                  >
                    <option value="">Select</option>
                    {institutes
                      .map((institute) => (
                        <option key={institute.id} value={institute.id}>
                          {institute.name}
                        </option>
                      ))}
                  </select>


          </div>

        </div>
      </fieldset>
      <fieldset className="form-section">
        <legend>Branch Details</legend>
        <div className="branch-form-grid">
          {isEdit && (
            <div className="branch-form-input">
              <label>Branch Code</label>
              <input type="text" value={form.code} disabled />
            </div>
          )}
          <div className="branch-form-input">
            <label>Branch Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              required
            />
          </div>
          <div className="branch-form-input">
            <label>Address Line 1</label>
            <input
              type="text"
              value={form.address1}
              onChange={(e) => handleChange("address1", e.target.value)}
              required
            />
          </div>
          <div className="branch-form-input">
            <label>Address Line 2</label>
            <input
              type="text"
              value={form.address2}
              onChange={(e) => handleChange("address2", e.target.value)}
            />
          </div>
          <div className="branch-form-input">
            <label>State</label>

               <select
                    className="branch-form-input"
                    value={form.stateId}
                    onChange={(e) =>  {
                    handleChange("stateId", e.target.value);
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
          <div className="branch-form-input">
            <label>City</label>
            <select
                    className="branch-form-input"
                    value={form.cityId}
                    onChange={(e) => handleChange("cityId", e.target.value)}
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
          <div className="branch-form-input">
            <label>Pin Code</label>
            <input
              type="text"
              pattern="\d{6}"
              value={form.pincode}
              onChange={(e) => handleChange("pincode", e.target.value)}
              required
            />
          </div>
        </div>
      </fieldset>
      <fieldset className="form-section">
        <legend>Contact Details</legend>
        <div className="branch-form-grid">
          <div className="branch-form-input">
            <label>Phone Number</label>
            <input
              type="tel"
              pattern="\d{10}"
              value={form.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              required
            />
          </div>
          <div className="branch-form-input">
            <label>Telephone Number</label>
            <input
              type="tel"
              value={form.telephone}
              onChange={(e) => handleChange("telephone", e.target.value)}
            />
          </div>
          <div className="branch-form-input">
            <label>Email ID</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              required
            />
          </div>
          <div className="branch-form-input">
            <label>Website Link</label>
            <input
              type="url"
              value={form.website}
              onChange={(e) => handleChange("website", e.target.value)}
            />
          </div>
        </div>
      </fieldset>
      <div className="branch-form-actions">
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Submitting..." : isEdit ? "Update" : "Submit"}
        </button>
        <button type="button" className="cancel-btn" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </form>
  </div>


        {error && <div className="error">{error}</div>}
      </div>
    );
  }

  // --- OVERVIEW VIEW ---
  if (viewMode === "overview" && selectedBranch) {
    return (
      <BranchOverview
        branch={selectedBranch}
        onEdit={() => handleEdit(selectedBranch)}
        onBack={handleCancel}
      />
    );
  }

  // --- LIST VIEW ---
  return (
    <div className="branch-container">
      <div className="branch-header">
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
          placeholder="Search by branch or institute..."
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
              setForm(defaultForm);
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
      <div className="branch-table-scroll">
        <table className="branch-table">
          <thead>
            <tr>
              <th>Branch Name</th>
              <th>Institute</th>
              <th>Phone Number</th>
              <th>Address</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((branch) => (
              <tr key={branch.id}>
                <td>
                  <div className="branch-name">{branch.name}</div>
                  <div className="branch-code">{branch.code}</div>
                </td>
                <td>
                  <div className="institute-name">{branch.institute.name}</div>
                  <div className="institute-code">{branch.instituteCode}</div>
                </td>
                <td>
                  <div>{branch.phone}</div>
                  <div className="branch-code">{branch.phone}</div>
                </td>
                <td style={{ whiteSpace: "pre-line" }}>
                  {[
                    branch.address1,
                    branch.address2,
                    branch.city.name,
                    branch.state.name,
                    branch.pincode,
                  ]
                    .filter(Boolean)
                    .join(", ")}
                </td>
                <td>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={branch.status}
                      onChange={() => toggleStatus(branch.id)}
                    />
                    <span className="slider round"></span>
                  </label>
                </td>
                <td style={{ display: "flex", gap: 8 }}>
                  <button
                    className="edit-btn"
                    title="Edit"
                    onClick={() => handleEdit(branch)}
                  >
                    <FiEdit size={16} />
                  </button>
                  <button
                    className="edit-btn"
                    title="Overview"
                    onClick={() => handleOverview(branch)}
                  >
                    <FiEye size={16} />
                  </button>
                  <button
                    className="edit-btn"
                    title="Delete"
                    onClick={() => setDeleteConfirmId(branch.id)}
                  >
                    <FiTrash2 size={16} style={{ color: "#e74c3c" }} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="branch-footer">
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
            <div>Are you sure you want to delete this branch?</div>
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

export default Branch;
